export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import CommitmentList from "@/components/CommitmentList";

export default async function CompanyCommitmentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let company: any = null;
  let userRole = "viewer";

  const { data: ownedCompany } = await supabase
    .from("companies").select("*").eq("owner_user_id", user.id).maybeSingle();

  if (ownedCompany) {
    company = ownedCompany;
    userRole = "owner";
  } else {
    const { data: membership } = await supabase
      .from("company_members").select("role, company_id")
      .eq("user_id", user.id).maybeSingle();
    if (membership) {
      const { data: memberCompany } = await supabase
        .from("companies").select("*").eq("id", membership.company_id).maybeSingle();
      if (memberCompany) {
        company = memberCompany;
        userRole = membership.role;
      }
    }
  }

  if (!company) redirect("/dashboard");

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at, completed_at, end_date, views, shares, user_id")
    .eq("company_id", company.id)
    .order("created_at", { ascending: false });

  const commitmentIds = commitments?.map((c) => c.id) || [];

  let cheerMap: Record<string, number> = {};
  if (commitmentIds.length > 0) {
    const { data: cheerData } = await supabase
      .from("commitment_cheers").select("commitment_id")
      .in("commitment_id", commitmentIds);
    cheerData?.forEach((row) => {
      cheerMap[row.commitment_id] = (cheerMap[row.commitment_id] || 0) + 1;
    });
  }

  let updateMap: Record<string, string> = {};
  let updateCountMap: Record<string, number> = {};
  if (commitmentIds.length > 0) {
    const { data: updates } = await supabase
      .from("commitment_updates")
      .select("commitment_id, content, created_at")
      .in("commitment_id", commitmentIds)
      .order("created_at", { ascending: false });
    updates?.forEach((u) => {
      if (!updateMap[u.commitment_id]) updateMap[u.commitment_id] = u.content;
      updateCountMap[u.commitment_id] = (updateCountMap[u.commitment_id] || 0) + 1;
    });
  }

  const listCommitments = (commitments || []).map((c) => ({
    id: c.id,
    text: c.text,
    status: c.status,
    created_at: c.created_at,
    completed_at: c.completed_at,
    end_date: c.end_date,
    views: c.views ?? 0,
    cheers: cheerMap[c.id] ?? 0,
    shares_count: c.shares ?? 0,
    update_count: updateCountMap[c.id] ?? 0,
    latest_update: updateMap[c.id] ?? null,
  }));

  const total     = listCommitments.length;
  const active    = listCommitments.filter((c) => c.status === "active").length;
  const completed = listCommitments.filter((c) => c.status === "completed").length;

  return (
    <div style={{ margin: "-32px -24px" }}>
      <div style={{ background: "#fff", padding: "14px 16px 12px", borderBottom: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>Company Commitments</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>@{company.username}</div>
        </div>
        {(userRole === "owner" || userRole === "admin" || userRole === "member") && (
          <Link href="/dashboard/create?workspace=company" style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: "7px 16px", borderRadius: 20, textDecoration: "none" }}>
            + Create
          </Link>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: "#f2f3f7", padding: "10px 16px", gap: 8 }}>
        {[
          { num: total,     label: "Total",     color: "#7c3aed" },
          { num: active,    label: "Active",    color: "#10b981" },
          { num: completed, label: "Completed", color: "#4338ca" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "10px 6px", textAlign: "center", border: "1px solid #f0f1f6" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.num}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 16px 32px", background: "#f2f3f7" }}>
        {listCommitments.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 14, padding: "40px 20px", textAlign: "center", border: "1px solid #f0f1f6" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>📋</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f0c29", marginBottom: 6 }}>No commitments yet</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 20, lineHeight: 1.5 }}>Create your first public company commitment and build trust publicly.</div>
            <Link href="/dashboard/create?workspace=company" style={{ display: "inline-block", background: "linear-gradient(135deg,#0891b2,#0e7490)", color: "#fff", padding: "10px 24px", borderRadius: 20, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
              + Create commitment
            </Link>
          </div>
        ) : (
          <CommitmentList commitments={listCommitments} />
        )}
      </div>
    </div>
  );
}
