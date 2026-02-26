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

  const body = await request.json();
  const { email, role } = body;

  if (!email || !role) {
    return NextResponse.json(
      { error: "Email and role required" },
      { status: 400 }
    );
  }

  // Check if user is owner
  const { data: membership } = await supabase
    .from("company_members")
    .select("company_id, role")
    .eq("user_id", user.id)
    .eq("role", "owner")
    .single();

  if (!membership) {
    return NextResponse.json(
      { error: "Only owner can invite members" },
      { status: 403 }
    );
  }

  const companyId = membership.company_id;

  // Get company limits
  const { data: company } = await supabase
    .from("companies")
    .select("member_limit")
    .eq("id", companyId)
    .single();

  if (!company) {
    return NextResponse.json(
      { error: "Company not found" },
      { status: 404 }
    );
  }

  // Count current members
  const { count } = await supabase
    .from("company_members")
    .select("*", { count: "exact", head: true })
    .eq("company_id", companyId);

  if ((count || 0) >= company.member_limit) {
    return NextResponse.json(
      { error: "Member limit reached. Upgrade plan to add more members." },
      { status: 400 }
    );
  }

  // Prevent duplicate invite
  const { data: existingInvite } = await supabase
    .from("company_invites")
    .select("id")
    .eq("company_id", companyId)
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
    company_id: companyId,
    email,
    role,
    token,
  });

  return NextResponse.json({ success: true });
}
