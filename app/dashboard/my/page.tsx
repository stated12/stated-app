export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

type Commitment = {
  id: string;
  text: string;
  status: "active" | "paused" | "completed" | "withdrawn" | "expired";
  created_at: string;
};

type CommitmentUpdate = {
  id: string;
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
    case "active":    return "linear-gradient(180deg,#4338ca,#818cf8)";
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

export default async function MyCommitmentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profileData } = await supabase
    .from("profiles").select("*").eq("id", user.id).single();

  const profile = profileData;

  const { data: commitmentsData } = await supabase
    .from("commitments")
    .select("*")
    .eq("user_id", user.id)
    .is("company_id", null)
    .order("created_at", { ascending: false });

  const commitments = (commitmentsData ?? []) as Commitment[];
  const commitmentIds = commitments.map((c) => c.id);

  const { data: updatesData } = commitmentIds.length > 0
    ? await supabase
        .from("commitment_updates")
        .select("*")
        .in("commitment_id", commitmentIds)
        .order("created_at", { ascending: false })
    : { data: [] };

  const updates = (updatesData ?? []) as CommitmentUpdate[];

  const avatar = profile?.avatar_url?.trim()
    ? profile.avatar_url.trim()
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile?.display_name || profile?.username || "User"
      )}&background=4338ca&color=fff`;

  const active    = commitments.filter((c) => c.status === "active").length;
  const completed = commitments.filter((c) => c.status === "completed").length;

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh", paddingBottom: 40 }}>

      {/* Profile header */}
      <div style={{ background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#7c3aed,#ec4899)", padding: 2.5, flexShrink: 0 }}>
            <img src={avatar} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>{profile?.display_name || profile?.username}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>@{profile?.username}</div>
          </div>
        </div>
        <Link href={`/u/${profile?.username}`} style={{ fontSize: 11, fontWeight: 600, color: "#4338ca", background: "#eef2ff", padding: "5px 12px", borderRadius: 20, textDecoration: "none" }}>
          View Profile
        </Link>
      </div>

      {/* Stats + Create */}
      <div style={{ padding: "12px 16px 0", background: "#f2f3f7" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { num: commitments.length, label: "Total",     color: "#7c3aed" },
            { num: active,             label: "Active",    color: "#10b981" },
            { num: completed,          label: "Completed", color: "#4338ca" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "10px 6px", textAlign: "center", border: "1px solid #f0f1f6" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.num}</div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <Link
          href="/dashboard/create"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: "13px", borderRadius: 14, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 3px 12px rgba(67,56,202,0.3)", marginBottom: 16 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          Create Commitment
        </Link>
      </div>

      {/* Commitments list */}
      <div style={{ padding: "0 16px 24px" }}>
        {commitments.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 14, padding: "40px 20px", textAlign: "center", border: "1px solid #f0f1f6" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>📋</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f0c29", marginBottom: 6 }}>No commitments yet</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>Create your first public commitment</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {commitments.map((c) => {
            const commitmentUpdates = updates.filter((u) => u.commitment_id === c.id);
            const st = statusStyle(c.status);

            return (
              <div key={c.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #f0f1f6", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                {/* Accent bar */}
                <div style={{ height: 3, background: accentColor(c.status) }} />

                <div style={{ padding: "14px 16px" }}>
                  {/* Status badge */}
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

                  {/* Updates */}
                  {commitmentUpdates.length > 0 && (
                    <div style={{ borderTop: "1px solid #f3f4f8", paddingTop: 10, marginBottom: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                      {commitmentUpdates.slice(0, 2).map((u) => (
                        <div key={u.id} style={{ background: "#f8f9fc", borderRadius: 10, padding: "8px 12px" }}>
                          <div style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.5 }}>{u.content}</div>
                          <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 3 }}>
                            {new Date(u.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  {c.status === "active" && (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 8, borderTop: "1px solid #f3f4f8" }}>
                      <Link href={`/commitment/${c.id}/update`} style={{ ...btnBase, color: "#4338ca", borderColor: "#c7d2fe" }}>+ Update</Link>
                      <Link href={`/commitment/${c.id}/complete`} style={{ ...btnBase, color: "#10b981", borderColor: "#a7f3d0" }}>Complete</Link>
                      <Link href={`/commitment/${c.id}/pause`} style={{ ...btnBase, color: "#d97706", borderColor: "#fde68a" }}>Pause</Link>
                      <Link href={`/commitment/${c.id}/withdraw`} style={{ ...btnBase, color: "#9ca3af", borderColor: "#e5e7eb" }}>Withdraw</Link>
                    </div>
                  )}

                  {c.status === "paused" && (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 8, borderTop: "1px solid #f3f4f8" }}>
                      <Link href={`/commitment/${c.id}/resume`} style={{ ...btnBase, color: "#10b981", borderColor: "#a7f3d0" }}>Resume</Link>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
