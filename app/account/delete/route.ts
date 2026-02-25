import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔐 Admin client using service role key
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Delete user-owned data
    await supabase.from("commitment_updates").delete().eq("user_id", user.id);
    await supabase.from("commitments").delete().eq("user_id", user.id);
    await supabase.from("profiles").delete().eq("id", user.id);
    await supabase.from("profile_views").delete().eq("profile_id", user.id);

    // 🔥 Actually delete auth user
    const { error } = await admin.auth.admin.deleteUser(user.id);

    if (error) {
      console.error("Auth delete failed:", error);
    }
  } catch (err) {
    console.error("Delete error:", err);
  }

  return NextResponse.redirect(new URL("/", request.url));
}
