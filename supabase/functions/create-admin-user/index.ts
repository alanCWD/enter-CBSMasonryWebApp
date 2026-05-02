import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Delete existing user first if any
  const { data: existing } = await supabaseAdmin.auth.admin.listUsers();
  const found = existing?.users?.find((u) => u.email === "alan@citywidedigital.ca");
  if (found) {
    await supabaseAdmin.auth.admin.deleteUser(found.id);
  }

  // Create fresh with correct password
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: "alan@citywidedigital.ca",
    password: "87654321",
    email_confirm: true,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true, user: data.user?.email }), {
    headers: { "Content-Type": "application/json" },
  });
});
