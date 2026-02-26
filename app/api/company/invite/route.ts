import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { companyId, email, role } = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: ownerCheck } = await supabase
    .from("company_members")
    .select("*")
    .eq("company_id", companyId)
    .eq("user_id", user.id)
    .eq("role", "owner")
    .single();

  if (!ownerCheck) {
    return NextResponse.json({ error: "Only owner allowed" }, { status: 403 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { error } = await supabase
    .from("company_members")
    .insert({
      company_id: companyId,
      user_id: profile.id,
      role,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
