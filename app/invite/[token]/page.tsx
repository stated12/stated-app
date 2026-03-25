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
  const token = decodeURIComponent(params.token).trim();

  const { data: adminRow, error: adminError } = await supabaseAdmin
    .from("company_invites")
    .select("id, email, status, expires_at, company_id, role, token")
    .eq("token", token)
    .maybeSingle();

  const supabase = await createClient();
  const { data: anonRow, error: anonError } = await supabase
    .from("company_invites")
    .select("id, email, status, expires_at, company_id, role, token")
    .eq("token", token)
    .maybeSingle();

  if (!adminRow && !anonRow) {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, maxWidth: 520, width: "100%", fontFamily: "monospace", fontSize: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#dc2626", marginBottom: 16 }}>Debug: Invite Lookup Failed</h2>
          <div style={{ marginBottom: 12 }}>
            <strong>Token:</strong>
            <div style={{ background: "#f3f4f6", padding: 8, borderRadius: 6, marginTop: 4, wordBreak: "break-all" as const }}>{token}</div>
          </div>
          <div style={{ marginBottom: 12 }}><strong>Token length:</strong> {token.length}</div>
          <div style={{ marginBottom: 12 }}>
            <strong>Admin error:</strong>
            <div style={{ background: "#fef2f2", padding: 8, borderRadius: 6, marginTop: 4 }}>
              {adminError ? adminError.message + " code:" + adminError.code : "null -- row not found"}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Anon error:</strong>
            <div style={{ background: "#fef2f2", padding: 8, borderRadius: 6, marginTop: 4 }}>
              {anonError ? anonError.message + " code:" + anonError.code : "null -- row not found"}
            </div>
          </div>
          <Link href="/" style={{ color: "#4338ca", fontWeight: 600, textDecoration: "none" }}>Go to Stated</Link>
        </div>
      </div>
    );
  }

  const inviteRow = adminRow || anonRow;
  if (!inviteRow) return null;

  if (inviteRow.expires_at && new Date(inviteRow.expires_at) < new Date()) {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", textAlign: "center" as const, maxWidth: 400, width: "100%" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29", marginBottom: 10 }}>Invitation Expired</h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>Ask the company owner to send a new invite.</p>
          <Link href="/" style={{ color: "#4338ca", fontWeight: 600, textDecoration: "none" }}>Go to Stated</Link>
        </div>
      </div>
    );
  }

  if (inviteRow.status === "accepted") {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", textAlign: "center" as const, maxWidth: 400, width: "100%" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29", marginBottom: 10 }}>Already Accepted</h1>
          <Link href="/dashboard/company" style={{ display: "inline-block", background: "linear-gradient(135deg,#0891b2,#0e7490)", color: "#fff", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Go to Company Dashboard</Link>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?invite=" + token);

  const { data: existingProfile } = await supabase
    .from("profiles").select("id").eq("id", user.id).maybeSingle();

  if (!existingProfile) {
    const emailUsername =
      user.email?.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20) || "user" + Date.now();
    await supabase.from("profiles").insert({
      id: user.id, username: emailUsername, display_name: emailUsername,
      account_type: "individual", credits: 5, plan_key: "free",
    });
  }

  const { data: existingMember } = await supabaseAdmin
    .from("company_members").select("id")
    .eq("company_id", inviteRow.company_id).eq("user_id", user.id).maybeSingle();

  if (!existingMember) {
    await supabaseAdmin.from("company_members").insert({
      company_id: inviteRow.company_id, user_id: user.id, role: inviteRow.role,
    });
  }

  await supabaseAdmin.from("company_invites")
    .update({ status: "accepted", accepted_at: new Date().toISOString() })
    .eq("id", inviteRow.id);

  redirect("/dashboard/company");
}
