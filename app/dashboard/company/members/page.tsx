export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import MembersClient from "./MembersClient";

export default async function MembersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let company: any = null;
  let userRole = "viewer";

  const { data: ownedCompany } = await supabase
    .from("companies")
    .select("id, name, username, owner_user_id, member_limit")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (ownedCompany) {
    company = ownedCompany;
    userRole = "owner";
  } else {
    // Use admin to bypass RLS for membership lookup
    const { data: membership } = await supabaseAdmin
      .from("company_members")
      .select("role, company_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (membership) {
      const { data: memberCompany } = await supabaseAdmin
        .from("companies")
        .select("id, name, username, owner_user_id, member_limit")
        .eq("id", membership.company_id)
        .maybeSingle();

      if (memberCompany) {
        company = memberCompany;
        userRole = membership.role;
      }
    }
  }

  if (!company) redirect("/dashboard/company");

  // Use admin client to bypass RLS -- owner needs to see all members
  const { data: membersData } = await supabaseAdmin
    .from("company_members")
    .select("id, role, user_id, created_at")
    .eq("company_id", company.id)
    .order("created_at", { ascending: true });

  // Fetch profiles for each member
  const memberIds = (membersData ?? []).map((m: any) => m.user_id);
  const { data: profilesData } = memberIds.length > 0
    ? await supabaseAdmin
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .in("id", memberIds)
    : { data: [] };

  const profileMap = Object.fromEntries(
    (profilesData ?? []).map((p: any) => [p.id, p])
  );

  // Fetch invites -- only pending ones
  const { data: invites } = await supabaseAdmin
    .from("company_invites")
    .select("id, email, role, status, created_at, expires_at")
    .eq("company_id", company.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  const members = (membersData ?? []).map((m: any) => ({
    id: String(m.id),
    role: String(m.role),
    user_id: String(m.user_id),
    created_at: String(m.created_at),
    isOwner: m.user_id === company.owner_user_id,
    isSelf: m.user_id === user.id,
    profile: profileMap[m.user_id] ? {
      id: String(profileMap[m.user_id].id),
      username: profileMap[m.user_id].username ?? "",
      display_name: profileMap[m.user_id].display_name ?? null,
      avatar_url: profileMap[m.user_id].avatar_url ?? null,
    } : null,
  }));

  const canManage = userRole === "owner" || userRole === "admin";
  const totalShown = members.length + 1; // +1 for owner

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh" }}>

      <div style={{ background: "#fff", padding: "14px 16px", borderBottom: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>Members</div>
          <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>
            {company.name} - {totalShown} of {company.member_limit ?? 10}
          </div>
        </div>
        {canManage && (
          <Link
            href="/dashboard/company/invite"
            style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: "7px 16px", borderRadius: 20, textDecoration: "none" }}
          >
            + Invite
          </Link>
        )}
      </div>

      <div style={{ padding: 16 }}>

        <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 10 }}>
          Active Members
        </div>

        {/* Owner row */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f0f1f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: 2, flexShrink: 0 }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#0891b2", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>
                {company.name.charAt(0)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f0c29" }}>{company.name}</div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>@{company.username}</div>
            </div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#92400e", background: "#fef3c7", padding: "3px 10px", borderRadius: 20 }}>Owner</div>
        </div>

        {/* Member rows */}
        {members.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px 16px", textAlign: "center" as const, border: "1px solid #f0f1f6", color: "#9ca3af", fontSize: 13 }}>
            No members yet - invite someone to get started
          </div>
        ) : (
          <MembersClient
            members={members}
            canManage={canManage}
            currentUserId={user.id}
          />
        )}

        {/* Pending invites */}
        {invites && invites.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase" as const, margin: "20px 0 10px" }}>
              Pending Invites
            </div>
            {invites.map((invite: any) => {
              const expired = invite.expires_at && new Date(invite.expires_at) < new Date();
              return (
                <div key={invite.id} style={{ background: "#fff", borderRadius: 14, padding: "12px 16px", marginBottom: 8, border: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0f0c29" }}>{invite.email}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#0891b2", background: "#e0f2fe", padding: "2px 8px", borderRadius: 20, textTransform: "capitalize" as const }}>{invite.role}</span>
                      <span style={{ fontSize: 10, color: expired ? "#ef4444" : "#9ca3af" }}>{expired ? "Expired" : "Pending"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

      </div>
    </div>
  );
}
