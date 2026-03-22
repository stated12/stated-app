export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

type Commitment = {
  id: string;
  text: string;
  status: "active" | "paused" | "completed" | "withdrawn" | "expired";
  created_at: string;
  completed_at?: string | null;
  end_date?: string | null;
  views?: number;
  shares?: number;
};

type CommitmentUpdate = {
  commitment_id: string;
  content: string;
  created_at: string;
};

function statusStyle(status: string): { color: string; bg: string } {
  switch (status) {
    case "active":    return { color: "#15803d", bg: "#dcfce7" };
    case "completed": return { color: "#1d4ed8", bg: "#dbeafe" };
    case "paused":    return { color: "#92400e", bg: "#fef3c7" };
    case "withdrawn": return { color: "#6b7280", bg: "#f3f4f6" };
    case "expired":   return { color: "#b91c1c", bg: "#fee2e2" };
    default:          return { color: "#6b7280", bg: "#f3f4f6" };
  }
}

function accentColor(status: string) {
  switch (status) {
    case "active":    return "linear-gradient(180deg,#0891b2,#22d3ee)";
    case "completed": return "linear-gradient(180deg,#10b981,#34d399)";
    case "paused":    return "linear-gradient(180deg,#f59e0b,#fcd34d)";
    case "withdrawn": return "linear-gradient(180deg,#9ca3af,#d1d5db)";
    case "expired":   return "linear-gradient(180deg,#ef4444,#fca5a5)";
    default:          return "linear-gradient(180deg,#9ca3af,#d1d5db)";
  }
}

const btnBase = {
  fontSize: 12,
  fontWeight: 600,
  padding: "7px 14px",
  borderRadius: 20,
  border: "1.5px solid #e8eaf2",
  background: "#fff",
  color: "#374151",
  cursor: "pointer",
  fontFamily: "inherit",
  textDecoration: "none",
  display: "inline-block",
} as const;

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

  const { data: commitmentsData } = await supabase
    .from("commitments")
    .select("id, text, status, created_at, completed_at, end_date, views, shares, user_id")
    .eq("company_id", company.id)
    .order("created_at", { ascending: false });

  const commitments = (commitmentsData ?? []) as Commitment[];
  const commitmentIds = commitments.map((c) => c.id);

  // Cheers
  let cheerMap: Record<string, number> = {};
  if (commitmentIds.length > 0) {
    const { data: cheerData } = await supabase
      .from("commitment_cheers").select("commitment_id")
      .in("commitment_id", commitmentIds);
    cheerData?.forEach((row) => {
      cheerMap[row.commitment_id] = (cheerMap[row.commitment_id] || 0) + 1;
    });
  }

  // Updates — fetch full list so we can show latest 2 per commitment
  let updatesData: CommitmentUpdate[] = [];
  if (commitmentIds.length > 0) {
    const { data: updates } = await supabase
      .from("commitment_updates")
      .select("commitment_id, content, created_at")
      .in("commitment_id", commitmentIds)
      .order("created_at", { ascending: false });
    updatesData = (updates ?? []) as CommitmentUpdate[];
  }

  const total     = commitments.length;
  const active    = commitments.filter((c) => c.status === "active").length;
  const completed = commitments.filter((c) => c.status === "completed").length;

  const canManage = userRole === "owner" || userRole === "admin" || userRole === "member";

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ background: "#fff", padding: "14px 16px 12px", borderBottom: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>Company Commitments</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>@{company.username}</div>
        </div>
        {canManage && (
          <Link
            href="/dashboard/create?workspace=company"
            style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: "7px 16px", borderRadius: 20, textDecoration: "none" }}
          >
            + Create
          </Link>
        )}
      </div>

      {/* Stats */}
      <div style={{ padding: "10px 16px 0", background: "#f2f3f7" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
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
      </div>

      {/* Commitments list */}
      <div style={{ padding: "0 16px 24px" }}>
        {commitments.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 14, padding: "40px 20px", textAlign: "center", border: "1px solid #f0f1f6" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>📋</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f0c29", marginBottom: 6 }}>No commitments yet</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 20, lineHeight: 1.5 }}>
              Create your first public company commitment and build trust publicly.
            </div>
            {canManage && (
              <Link
                href="/dashboard/create?workspace=company"
                style={{ display: "inline-block", background: "linear-gradient(135deg,#0891b2,#0e7490)", color: "#fff", padding: "10px 24px", borderRadius: 20, fontSize: 12, fontWeight: 700, textDecoration: "none" }}
              >
                + Create commitment
              </Link>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {commitments.map((c) => {
              const commitmentUpdates = updatesData.filter((u) => u.commitment_id === c.id);
              const st = statusStyle(c.status);
              const cheers = cheerMap[c.id] ?? 0;

              return (
                <div key={c.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #f0f1f6", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                  {/* Accent bar */}
                  <div style={{ height: 3, background: accentColor(c.status) }} />

                  <div style={{ padding: "14px 16px" }}>
                    {/* Status + date */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: st.color, background: st.bg, padding: "3px 10px", borderRadius: 20 }}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                      <span style={{ fontSize: 10, color: "#9ca3af" }}>
                        {new Date(c.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Commitment text */}
                    <Link href={`/commitment/${c.id}`} style={{ textDecoration: "none" }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#0f0c29", lineHeight: 1.5, marginBottom: 10 }}>
                        {c.text}
                      </div>
                    </Link>

                    {/* Latest updates (up to 2) */}
                    {commitmentUpdates.length > 0 && (
                      <div style={{ borderTop: "1px solid #f3f4f8", paddingTop: 10, marginBottom: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                        {commitmentUpdates.slice(0, 2).map((u, idx) => (
                          <div key={idx} style={{ background: "#f8f9fc", borderRadius: 10, padding: "8px 12px" }}>
                            <div style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.5 }}>{u.content}</div>
                            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 3 }}>
                              {new Date(u.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stats row (cheers / views) */}
                    {(cheers > 0 || (c.views ?? 0) > 0) && (
                      <div style={{ display: "flex", gap: 12, marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #f3f4f8" }}>
                        {cheers > 0 && (
                          <span style={{ fontSize: 11, color: "#9ca3af" }}>👏 {cheers}</span>
                        )}
                        {(c.views ?? 0) > 0 && (
                          <span style={{ fontSize: 11, color: "#9ca3af" }}>👁 {c.views}</span>
                        )}
                      </div>
                    )}

                    {/* ── Action buttons (only for members who can manage) ── */}
                    {canManage && (
                      <>
                        {c.status === "active" && (
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 8, borderTop: "1px solid #f3f4f8" }}>
                            <Link href={`/commitment/${c.id}/update`}   style={{ ...btnBase, color: "#0891b2", borderColor: "#a5f3fc" }}>+ Update</Link>
                            <Link href={`/commitment/${c.id}/complete`} style={{ ...btnBase, color: "#10b981", borderColor: "#a7f3d0" }}>Complete</Link>
                            <Link href={`/commitment/${c.id}/pause`}    style={{ ...btnBase, color: "#d97706", borderColor: "#fde68a" }}>Pause</Link>
                            <Link href={`/commitment/${c.id}/withdraw`} style={{ ...btnBase, color: "#9ca3af", borderColor: "#e5e7eb" }}>Withdraw</Link>
                          </div>
                        )}

                        {c.status === "paused" && (
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 8, borderTop: "1px solid #f3f4f8" }}>
                            <Link href={`/commitment/${c.id}/resume`}   style={{ ...btnBase, color: "#10b981", borderColor: "#a7f3d0" }}>Resume</Link>
                            <Link href={`/commitment/${c.id}/withdraw`} style={{ ...btnBase, color: "#9ca3af", borderColor: "#e5e7eb" }}>Withdraw</Link>
                          </div>
                        )}

                        {(c.status === "completed" || c.status === "withdrawn" || c.status === "expired") && (
                          <div style={{ paddingTop: 8, borderTop: "1px solid #f3f4f8" }}>
                            <Link href={`/commitment/${c.id}`} style={{ fontSize: 12, color: "#9ca3af", textDecoration: "none" }}>
                              View commitment →
                            </Link>
                          </div>
                        )}
                      </>
                    )}

                    {/* Viewer: always show link */}
                    {!canManage && (
                      <div style={{ paddingTop: 8, borderTop: "1px solid #f3f4f8" }}>
                        <Link href={`/commitment/${c.id}`} style={{ fontSize: 12, color: "#9ca3af", textDecoration: "none" }}>
                          View commitment →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
