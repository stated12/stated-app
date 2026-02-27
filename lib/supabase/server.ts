import { createClient } from "@supabase/supabase-js";

/**
 * Public server client (NO cookies, NO auth session)
 * Safe for Server Components
 */
export function createPublicServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
