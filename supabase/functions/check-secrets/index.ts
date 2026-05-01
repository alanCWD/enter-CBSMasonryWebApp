Deno.serve(async () => {
  const key = Deno.env.get("BUNNY_STORAGE_API_KEY");
  const zone = Deno.env.get("BUNNY_STORAGE_ZONE_NAME");
  const cdn = Deno.env.get("BUNNY_CDN_HOSTNAME");

  return new Response(JSON.stringify({
    BUNNY_STORAGE_API_KEY: key ? `✓ set (${key.length} chars)` : "✗ missing",
    BUNNY_STORAGE_ZONE_NAME: zone ? `✓ set → "${zone}"` : "✗ missing",
    BUNNY_CDN_HOSTNAME: cdn ? `✓ set → "${cdn}"` : "✗ missing",
  }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
});
