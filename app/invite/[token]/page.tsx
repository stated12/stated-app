export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const supabase = await createClient();
  const token = params.token;

  /* ── FIND INVITE (ADMIN - BYPASS RLS) ── */
  const { data: invite, error } = await supabaseAdmin
    .from("company_invites")
    .select("*")
    .eq("token", token)
    .maybeSingle();

  console.log("TOKEN:", token);
  console.log("INVITE:", invite);
  console.log("ERROR:", error);

  if (!invite) {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", textAlign: "center", maxWidth: 400, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29", marginBottom: 8 }}>Invalid Invitation</h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24, lineHeight: 1.6 }}>
            This invitation link is not valid or has already been used.
          </p>
          <Link href="/" style={{ display: "inline-block", background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: "11px 28px", borderRadius: 22, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            Go to Stated →
          </Link>
        </div>
      </div>
    );
  }

  /* ── EXPIRED ── */
  if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", textAlign: "center", maxWidth: 400, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>Invite Expired</h1>
          <p>This invitation has expired.</p>
        </div>
      </div>
    );
  }

  /* ── ALREADY ACCEPTED ── */
  if (invite.status === "accepted") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>
          <h1>Already Accepted</h1>
          <Link href="/dashboard/company">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  /* ── GET COMPANY ── */
  const { data: company } = await supabase
    .from("companies")
    .select("name, username, logo_url")
    .eq("id", invite.company_id)
    .single();

  /* ── CHECK LOGIN ── */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?invite=${token}`);

  /* ── CREATE PROFILE IF NOT EXISTS ── */
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!existingProfile) {
    const emailUsername =
      user.email
        ?.split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "")
        .slice(0, 20) || `user${Date.now()}`;

    await supabase.from("profiles").insert({
      id: user.id,
      username: emailUsername,
      display_name: emailUsername,
      account_type: "individual",
      credits: 5,
      plan_key: "free",
    });
  }

  /* ── ADD TO COMPANY ── */
  const { data: existing } = await supabase
    .from("company_members")
    .select("id")
    .eq("company_id", invite.company_id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!existing) {
    await supabase.from("company_members").insert({
      company_id: invite.company_id,
      user_id: user.id,
      role: invite.role,
    });
  }

  /* ── MARK ACCEPTED ── */
  await supabaseAdmin
    .from("company_invites")
    .update({
      status: "accepted",
      accepted_at: new Date().toISOString(),
    })
    .eq("id", invite.id);

  /* ── REDIRECT ── */
  redirect("/dashboard/company");
}
