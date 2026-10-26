import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MediaRecord {
  cdnUrl: string;
  fileName: string;
  folder: string;
  featuredHome: boolean;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const BUNNY_API_KEY = Deno.env.get("BUNNY_STORAGE_API_KEY");
    const BUNNY_ZONE = Deno.env.get("BUNNY_STORAGE_ZONE_NAME");
    const BUNNY_CDN = Deno.env.get("BUNNY_CDN_HOSTNAME");

    if (!BUNNY_API_KEY || !BUNNY_ZONE || !BUNNY_CDN) {
      return new Response(JSON.stringify({ error: "Missing Bunny.net config" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Load categories from DB
    const { data: categories } = await supabase
      .from("media_categories")
      .select("value")
      .order("created_at");

    const folders = (categories ?? []).map((c: { value: string }) => c.value);
    const cdnBase = BUNNY_CDN.replace(/\/$/, "");

    // Also load files from media_files table as fallback/supplement
    const { data: dbFiles } = await supabase
      .from("media_files")
      .select("cdn_url, file_name, folder, featured_home")
      .order("uploaded_at", { ascending: false });

    const dbMap = new Map<string, MediaRecord>();
    for (const f of dbFiles ?? []) {
      dbMap.set(f.cdn_url, {
        cdnUrl: f.cdn_url,
        fileName: f.file_name,
        folder: f.folder,
        featuredHome: f.featured_home === true,
      });
    }

    // Fetch from Bunny.net for each folder
    const results: MediaRecord[] = [];
    const seen = new Set<string>();

    const pushBunnyItem = (folder: string, objectName: string) => {
      const cdnUrl = folder ? `${cdnBase}/${folder}/${objectName}` : `${cdnBase}/${objectName}`;
      if (seen.has(cdnUrl)) return;
      seen.add(cdnUrl);
      const known = dbMap.get(cdnUrl);
      results.push({
        cdnUrl,
        fileName: objectName,
        folder: known?.folder ?? folder,
        featuredHome: known?.featuredHome ?? false,
      });
    };

    for (const folder of folders) {
      try {
        const res = await fetch(
          `https://storage.bunnycdn.com/${BUNNY_ZONE}/${folder}/`,
          { headers: { AccessKey: BUNNY_API_KEY } }
        );
        if (!res.ok) continue;
        const items: Array<{ ObjectName: string; IsDirectory: boolean }> = await res.json();
        for (const item of items) {
          if (item.IsDirectory) continue;
          pushBunnyItem(folder, item.ObjectName);
        }
      } catch {
        // skip folder on error
      }
    }

    // Also include root-level files
    try {
      const res = await fetch(
        `https://storage.bunnycdn.com/${BUNNY_ZONE}/`,
        { headers: { AccessKey: BUNNY_API_KEY } }
      );
      if (res.ok) {
        const items: Array<{ ObjectName: string; IsDirectory: boolean }> = await res.json();
        for (const item of items) {
          if (item.IsDirectory) continue;
          pushBunnyItem("", item.ObjectName);
        }
      }
    } catch { /* skip */ }

    // Merge in DB files that weren't found in Bunny listing
    for (const [url, f] of dbMap) {
      if (!seen.has(url)) {
        results.push(f);
      }
    }

    return new Response(JSON.stringify({ files: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
