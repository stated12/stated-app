import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, role } = await request.json();
  if (!email || !role) {
    return NextResponse.json({ error: "Email and role required" }, { status: 400 });
  }

  // Find company -- column is owner_user_id not owner_id
  const { data: company } = await supabase
    .from("companies")
    .select("id, name, member_limit")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (!company) {
    return NextResponse.json({ error: "Only company owner can invite members" }, { status: 403 });
  }

  // Member limit check
  const { count } = await supabase
    .from("company_members")
    .select("*", { count: "exact", head: true })
    .eq("company_id", company.id);

  if ((count ?? 0) >= (company.member_limit ?? 10)) {
    return NextResponse.json({ error: "Member limit reached" }, { status: 400 });
  }

  // Duplicate invite check
  const { data: existingInvite } = await supabase
    .from("company_invites")
    .select("id")
    .eq("company_id", company.id)
    .eq("email", email)
    .eq("status", "pending")
    .maybeSingle();

  if (existingInvite) {
    return NextResponse.json({ error: "Invite already sent to this email" }, { status: 400 });
  }

  // Generate token and expiry
  const token = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Insert invite -- only columns that exist in your schema
  const { error: insertError } = await supabase
    .from("company_invites")
    .insert({
      company_id: company.id,
      email,
      role,
      token,
      status: "pending",
      expires_at: expiresAt.toISOString(),
    });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // Send email
  const inviteUrl = process.env.NEXT_PUBLIC_SITE_URL + "/invite/" + token;

  await resend.emails.send({
    from: "Stated <hello@stated.in>",
    to: email,
    subject: company.name + " invited you to manage their profile on Stated",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
        <h2 style="color:#0f0c29;margin-bottom:8px">You've been invited</h2>
        <p style="color:#374151;margin-bottom:16px">
          <strong>${company.name}</strong> invited you to help manage their profile on <strong>Stated</strong>.
        </p>
        <p style="color:#374151;margin-bottom:24px">Your role: <strong>${role}</strong></p>
        <a href="${inviteUrl}"
           style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px">
          Accept Invitation
        </a>
        <p style="color:#9ca3af;font-size:12px;margin-top:24px">
          If the button does not work, copy this link:<br/>
          <a href="${inviteUrl}" style="color:#4338ca">${inviteUrl}</a>
        </p>
        <p style="color:#9ca3af;font-size:11px;margin-top:16px">
          This link expires in 7 days.
        </p>
      </div>
    `,
  });

  return NextResponse.json({ success: true, message: "Invitation sent" });
}
