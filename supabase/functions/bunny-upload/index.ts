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
      return new Response(JSON.stringify({ error: "Missing Bunny.net configuration" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string;
    const folder = (formData.get("folder") as string) || "";
    const featuredHome = (formData.get("featuredHome") as string) === "true";

    if (!file || !fileName) {
      return new Response(JSON.stringify({ error: "Missing file or fileName" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const filePath = folder ? `${folder}/${fileName}` : fileName;
    const bunnyUrl = `https://storage.bunnycdn.com/${BUNNY_ZONE}/${filePath}`;

    const fileBuffer = await file.arrayBuffer();

    const bunnyRes = await fetch(bunnyUrl, {
      method: "PUT",
      headers: {
        "AccessKey": BUNNY_API_KEY,
        "Content-Type": file.type || "application/octet-stream",
      },
      body: fileBuffer,
    });

    if (!bunnyRes.ok) {
      const errText = await bunnyRes.text();
      return new Response(JSON.stringify({ error: `Bunny.net upload failed: ${errText}` }), {
        status: bunnyRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cdnBase = BUNNY_CDN.replace(/\/$/, "");
    const cdnUrl = `${cdnBase}/${filePath}`;

    // Save to media_files table (featured_home controls the home page gallery pool)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
    await supabase
      .from("media_files")
      .upsert(
        { cdn_url: cdnUrl, file_name: fileName, folder, featured_home: featuredHome },
        { onConflict: "cdn_url" }
      )
      .select()
      .maybeSingle();

    return new Response(
      JSON.stringify({ success: true, cdnUrl, fileName, filePath, featuredHome }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
