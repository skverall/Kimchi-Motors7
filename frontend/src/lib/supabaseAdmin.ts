import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

export function getServiceSupabase(): SupabaseClient {
  if (adminClient) return adminClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase service key or URL is not configured");
  }

  adminClient = createClient(supabaseUrl, supabaseServiceKey);
  return adminClient;
}
