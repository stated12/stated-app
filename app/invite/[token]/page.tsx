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

  /* ✅ FIX: CLEAN TOKEN */
  const token = decodeURIComponent(params.token).trim();

  /* ── FIND INVITE (ADMIN - BYPASS RLS) ── */
  const { data: invite, error } = await supabaseAdmin
    .from("company_invites")
    .select("*")
    .ilike("token", token); // ✅ FIX: ilike instead of eq

  console.log("TOKEN:", token);
  console.log("INVITE ARRAY:", invite);
  console.log("ERROR:", error);

  /* ✅ FIX: HANDLE ARRAY RESULT */
  const inviteRow = invite?.[0];

  if (!inviteRow) {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", textAlign: "center", maxWidth: 400, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>Invalid Invitation</h1>
          <p>This invitation link is not valid or has already been used.</p>
          <Link href="/">Go to Stated →</Link>
        </div>
      </div>
    );
  }

  /* ── EXPIRED ── */
  if (inviteRow.expires_at && new Date(inviteRow.expires_at) < new Date()) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>
          <h1>Invite Expired</h1>
        </div>
      </div>
    );
  }

  /* ── ALREADY ACCEPTED ── */
  if (inviteRow.status === "accepted") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>
          <h1>Already Accepted</h1>
          <Link href="/dashboard/company">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

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
    .eq("company_id", inviteRow.company_id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!existing) {
    await supabase.from("company_members").insert({
      company_id: inviteRow.company_id,
      user_id: user.id,
      role: inviteRow.role,
    });
  }

  /* ── MARK ACCEPTED ── */
  await supabaseAdmin
    .from("company_invites")
    .update({
      status: "accepted",
      accepted_at: new Date().toISOString(),
    })
    .eq("id", inviteRow.id);

  /* ── REDIRECT ── */
  redirect("/dashboard/company");
}
