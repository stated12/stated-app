import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Authenticated server client (uses cookies)
 * Use ONLY in route handlers or protected areas
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) =>
          cookieStore.set(name, value, options),
        remove: (name: string, options: any) =>
          cookieStore.set(name, "", { ...options, maxAge: 0 }),
      },
    }
  );
}

/**
 * Public server client (NO cookies, NO auth)
 * Safe for public pages like /u/[username]
 */
export function createPublicServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
