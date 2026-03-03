import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, role } = await request.json();

  if (!email || !role) {
    return NextResponse.json(
      { error: "Email and role required" },
      { status: 400 }
    );
  }

  // Must be owner
  const { data: company } = await supabase
    .from("companies")
    .select("id, member_limit")
    .eq("owner_id", user.id)
    .single();

  if (!company) {
    return NextResponse.json(
      { error: "Only owner can invite members" },
      { status: 403 }
    );
  }

  // Count current members
  const { count } = await supabase
    .from("company_members")
    .select("*", { count: "exact", head: true })
    .eq("company_id", company.id);

  if ((count ?? 0) >= company.member_limit) {
    return NextResponse.json(
      { error: "Member limit reached. Upgrade plan to add more members." },
      { status: 400 }
    );
  }

  // Prevent duplicate invite
  const { data: existingInvite } = await supabase
    .from("company_invites")
    .select("id")
    .eq("company_id", company.id)
    .eq("email", email)
    .maybeSingle();

  if (existingInvite) {
    return NextResponse.json(
      { error: "Invite already sent to this email" },
      { status: 400 }
    );
  }

  const token = crypto.randomBytes(32).toString("hex");

  await supabase.from("company_invites").insert({
    company_id: company.id,
    email,
    role,
    token,
  });

  return NextResponse.json({
    success: true,
    inviteUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/invite/${token}`,
  });
}
