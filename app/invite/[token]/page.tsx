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

  const token = decodeURIComponent(params.token).trim();

  // Use eq (exact match) not ilike -- ilike is pattern match, wrong tool for UUIDs
  const { data: inviteRow, error } = await supabaseAdmin
    .from("company_invites")
    .select("*")
    .eq("token", token)
    .maybeSingle();

  if (error) {
    console.error("Invite lookup error:", error.message);
  }

  if (!inviteRow) {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", textAlign: "center" as const, maxWidth: 400, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24 }}>!</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29", marginBottom: 10 }}>Invalid Invitation</h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>This invitation link is not valid or has already been used.</p>
          <Link href="/" style={{ display: "inline-block", background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            Go to Stated
          </Link>
        </div>
      </div>
    );
  }

  // Expired
  if (inviteRow.expires_at && new Date(inviteRow.expires_at) < new Date()) {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", textAlign: "center" as const, maxWidth: 400, width: "100%" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29", marginBottom: 10 }}>Invitation Expired</h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>This invitation link has expired. Ask the company owner to send a new one.</p>
          <Link href="/" style={{ color: "#4338ca", fontWeight: 600, textDecoration: "none" }}>Go to Stated</Link>
        </div>
      </div>
    );
  }

  // Already accepted
  if (inviteRow.status === "accepted") {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f3f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", textAlign: "center" as const, maxWidth: 400, width: "100%" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29", marginBottom: 10 }}>Already Accepted</h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>This invitation has already been accepted.</p>
          <Link href="/dashboard/company" style={{ display: "inline-block", background: "linear-gradient(135deg,#0891b2,#0e7490)", color: "#fff", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            Go to Company Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Check login -- redirect to login with invite token so we come back here after
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?invite=" + token);

  // Create individual profile if this is their first login
  // (invited members get an individual profile so they can use the platform)
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
        .slice(0, 20) || "user" + Date.now();

    await supabase.from("profiles").insert({
      id: user.id,
      username: emailUsername,
      display_name: emailUsername,
      account_type: "individual",
      credits: 5,
      plan_key: "free",
    });
  }

  // Add to company_members if not already there
  const { data: existingMember } = await supabaseAdmin
    .from("company_members")
    .select("id")
    .eq("company_id", inviteRow.company_id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!existingMember) {
    const { error: memberError } = await supabaseAdmin
      .from("company_members")
      .insert({
        company_id: inviteRow.company_id,
        user_id: user.id,
        role: inviteRow.role,
      });
    if (memberError) {
      console.error("Member insert error:", memberError.message);
    }
  }

  // Mark invite as accepted
  await supabaseAdmin
    .from("company_invites")
    .update({
      status: "accepted",
      accepted_at: new Date().toISOString(),
    })
    .eq("id", inviteRow.id);

  // Redirect to company dashboard
  redirect("/dashboard/company");
}
