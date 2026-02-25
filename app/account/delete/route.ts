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

  // Delete related data
  await supabase.from("commitment_updates").delete().eq("user_id", user.id);
  await supabase.from("commitments").delete().eq("user_id", user.id);
  await supabase.from("profiles").delete().eq("id", user.id);
  await supabase.from("profile_views").delete().eq("profile_id", user.id);

  // Delete auth user
  await supabase.auth.admin.deleteUser(user.id);

  return NextResponse.redirect(new URL("/", request.url));
}
