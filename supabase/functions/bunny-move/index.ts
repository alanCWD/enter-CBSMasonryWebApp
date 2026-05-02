import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const { sourceCdnUrl, sourceFolder, fileName, targetFolder } = await req.json();

    if (!sourceCdnUrl || !fileName || targetFolder === undefined) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Fetch the file content from Bunny CDN
    const fileRes = await fetch(sourceCdnUrl);
    if (!fileRes.ok) {
      return new Response(JSON.stringify({ error: "Could not fetch source file" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const fileBuffer = await fileRes.arrayBuffer();
    const contentType = fileRes.headers.get("content-type") || "application/octet-stream";

    // 2. Upload to new folder
    const targetPath = targetFolder ? `${targetFolder}/${fileName}` : fileName;
    const uploadRes = await fetch(
      `https://storage.bunnycdn.com/${BUNNY_ZONE}/${targetPath}`,
      {
        method: "PUT",
        headers: { AccessKey: BUNNY_API_KEY, "Content-Type": contentType },
        body: fileBuffer,
      }
    );
    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      return new Response(JSON.stringify({ error: `Upload to new folder failed: ${errText}` }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Delete from old folder
    const sourcePath = sourceFolder ? `${sourceFolder}/${fileName}` : fileName;
    await fetch(
      `https://storage.bunnycdn.com/${BUNNY_ZONE}/${sourcePath}`,
      { method: "DELETE", headers: { AccessKey: BUNNY_API_KEY } }
    );

    // 4. Update media_files record
    const cdnBase = BUNNY_CDN.replace(/\/$/, "");
    const newCdnUrl = `${cdnBase}/${targetPath}`;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
    await supabase
      .from("media_files")
      .update({ cdn_url: newCdnUrl, folder: targetFolder })
      .eq("cdn_url", sourceCdnUrl);

    // 5. Update any media_slots that referenced the old URL
    await supabase
      .from("media_slots")
      .update({ cdn_url: newCdnUrl })
      .eq("cdn_url", sourceCdnUrl);

    return new Response(JSON.stringify({ success: true, newCdnUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
