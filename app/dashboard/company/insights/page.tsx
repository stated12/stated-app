export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ReputationCard from "@/components/ReputationCard";

export default async function CompanyInsightsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  /* FIND COMPANY */
  let company: any = null;

  const { data: ownerCompany } = await supabase
    .from("companies").select("id,name,username,plan_key") // ✅ added plan_key
    .eq("owner_user_id", user.id).maybeSingle();

  if (ownerCompany) {
    company = ownerCompany;
  } else {
    const { data: membership } = await supabase
      .from("company_members").select("company_id")
      .eq("user_id", user.id).maybeSingle();
    if (!membership) redirect("/dashboard");
    const { data: memberCompany } = await supabase
      .from("companies").select("id,name,username,plan_key") // ✅ added plan_key
      .eq("id", membership.company_id).single();
    company = memberCompany;
  }

  if (!company) redirect("/dashboard");

  const PRO_PLANS = ["comp_1999","comp_2999","comp_4999"];
  const isPro = PRO_PLANS.includes(company?.plan_key);

  /* COMMITMENTS */
  const { data: commitments } = await supabase
    .from("commitments").select("id,text,status,views")
    .eq("company_id", company.id);

  const commitmentIds = commitments?.map((c) => c.id) || [];

  const total      = commitments?.length ?? 0;
  const active     = commitments?.filter((c) => c.status === "active").length ?? 0;
  const completed  = commitments?.filter((c) => c.status === "completed").length ?? 0;
  const paused     = commitments?.filter((c) => c.status === "paused" || c.status === "withdrawn").length ?? 0;
  const totalViews = commitments?.reduce((sum, c) => sum + (c.views ?? 0), 0) ?? 0;
  const topCommitment = commitments?.sort((a, b) => (b.views ?? 0) - (a.views ?? 0))[0] ?? null;

  /* MEMBERS */
  const { count: memberCount } = await supabase
    .from("company_members").select("*", { count: "exact", head: true })
    .eq("company_id", company.id);

  /* FOLLOWERS */
  const { count: followers } = await supabase
    .from("follows").select("*", { count: "exact", head: true })
    .eq("following_company_id", company.id);

  /* ✅ CHEERS — total count across all company commitments */
  let totalCheers = 0;
  if (commitmentIds.length > 0) {
    const { count } = await supabase
      .from("commitment_cheers").select("*", { count: "exact", head: true })
      .in("commitment_id", commitmentIds);
    totalCheers = count ?? 0;
  }

  /* ✅ WHO CHEERED — pro only */
  let cheerLeaders: {
    display_name: string | null;
    username: string;
    avatar_url: string | null;
    commitment_id: string;
    commitment_text: string;
    cheered_at: string;
  }[] = [];

  if (isPro && commitmentIds.length > 0) {
    const { data: cheerRows } = await supabase
      .from("commitment_cheers")
      .select("user_id, commitment_id, created_at")
      .in("commitment_id", commitmentIds)
      .order("created_at", { ascending: false })
      .limit(20);

    if (cheerRows && cheerRows.length > 0) {
      const cheererIds = [...new Set(cheerRows.map((r) => r.user_id))];
      const { data: cheererProfiles } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .in("id", cheererIds);

      const { data: cheeredCommitments } = await supabase
        .from("commitments")
        .select("id, text")
        .in("id", commitmentIds);

      cheerLeaders = cheerRows.map((row) => {
        const p = cheererProfiles?.find((p) => p.id === row.user_id);
        const c = cheeredCommitments?.find((c) => c.id === row.commitment_id);
        return {
          display_name: p?.display_name ?? null,
          username: p?.username ?? "unknown",
          avatar_url: p?.avatar_url ?? null,
          commitment_id: row.commitment_id,
          commitment_text: c?.text ?? "a commitment",
          cheered_at: row.created_at,
        };
      });
    }
  }

  const stats = [
    { label: "Total Commitments", num: total,      color: "#7c3aed", bg: "#f5f3ff",
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h9M2 12h6" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { label: "Active",            num: active,     color: "#10b981", bg: "#dcfce7",
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#10b981" strokeWidth="1.3"/><path d="M5 8l2 2 4-4" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: "Completed",         num: completed,  color: "#4338ca", bg: "#eef2ff",
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="#4338ca" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: "Total Views",       num: totalViews, color: "#0891b2", bg: "#e0f2fe",
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="8" rx="7" ry="4" stroke="#0891b2" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="#0891b2" strokeWidth="1.3"/></svg> },
    { label: "Members",           num: (memberCount ?? 0) + 1, color: "#f59e0b", bg: "#fef3c7",
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="#f59e0b" strokeWidth="1.3"/><circle cx="11" cy="5" r="2.5" stroke="#f59e0b" strokeWidth="1.3"/><path d="M1 13c0-2.8 2.2-5 5-5h4c2.8 0 5 2.2 5 5" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { label: "Followers",         num: followers ?? 0, color: "#ec4899", bg: "#fdf2f8",
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="#ec4899" strokeWidth="1.3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#ec4899" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  ];

  const statusStats = [
    { num: active,    label: "Active",          color: "#10b981" },
    { num: completed, label: "Completed",        color: "#4338ca" },
    { num: paused,    label: "Paused/Withdrawn", color: "#9ca3af" },
  ];

  function timeAgo(date: string) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh", paddingBottom: 32 }}>

      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>{company.name} Insights</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>@{company.username}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isPro && (
            <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#4338ca,#6366f1)", padding: "3px 10px", borderRadius: 20 }}>PRO</span>
          )}
          <Link href={`/c/${company.username}`} style={{ fontSize: 11, fontWeight: 600, color: "#0891b2", background: "#e0f2fe", padding: "5px 12px", borderRadius: 20, textDecoration: "none" }}>
            View Profile →
          </Link>
        </div>
      </div>

      <div style={{ padding: 16 }}>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", border: "1px solid #f0f1f6", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.num}</div>
            </div>
          ))}
        </div>

        {/* ✅ CHEERS ROW — full width between grid and status strip */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f1f6", overflow: "hidden", marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>

          {/* Count row */}
          <div style={{ padding: "14px 16px 12px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 6v4a.5.5 0 00.5.5H4L6.5 13V3L4 5.5H2.5A.5.5 0 002 6z" stroke="#ea580c" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M6.5 3.5L12 1.5v13l-5.5-2" stroke="#ea580c" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M13.5 5.5c.6.6.8 1.5.8 2.5s-.2 1.9-.8 2.5" stroke="#ea580c" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, marginBottom: 2 }}>Total Cheers</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#ea580c", lineHeight: 1 }}>{totalCheers}</div>
            </div>
            {!isPro && (
              <Link
                href="/upgrade"
                style={{ fontSize: 11, fontWeight: 700, color: "#4338ca", background: "#eef2ff", padding: "5px 12px", borderRadius: 12, textDecoration: "none", whiteSpace: "nowrap" }}
              >
                See who →
              </Link>
            )}
            {isPro && cheerLeaders.length > 0 && (
              <span style={{ fontSize: 11, color: "#ea580c", fontWeight: 600 }}>
                {cheerLeaders.length} recent
              </span>
            )}
          </div>

          {/* Pro: real cheerleader list */}
          {isPro && cheerLeaders.length > 0 && (
            <div style={{ borderTop: "1px solid #f3f4f8" }}>
              {cheerLeaders.slice(0, 5).map((cl, i) => {
                const avatar = cl.avatar_url?.trim()
                  ? cl.avatar_url
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(cl.display_name || cl.username)}&background=4338ca&color=fff`;
                return (
                  <div key={i} style={{ padding: "10px 16px", borderBottom: i < Math.min(cheerLeaders.length, 5) - 1 ? "1px solid #f3f4f8" : "none", display: "flex", alignItems: "center", gap: 10 }}>
                    <Link href={`/u/${cl.username}`}>
                      <img src={avatar} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    </Link>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#0f0c29" }}>
                        <Link href={`/u/${cl.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                          {cl.display_name || cl.username}
                        </Link>
                      </span>
                      <span style={{ fontSize: 12, color: "#6b7280" }}> cheered </span>
                      <span style={{ fontSize: 12, color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block", maxWidth: 120, verticalAlign: "bottom" }}>
                        "{cl.commitment_text.length > 30 ? cl.commitment_text.slice(0, 30) + "…" : cl.commitment_text}"
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: "#9ca3af", flexShrink: 0 }}>{timeAgo(cl.cheered_at)}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pro: no cheers yet */}
          {isPro && cheerLeaders.length === 0 && (
            <div style={{ borderTop: "1px solid #f3f4f8", padding: "14px 16px", fontSize: 12, color: "#9ca3af", textAlign: "center" }}>
              No cheers yet — share your commitments!
            </div>
          )}

          {/* Free: blurred rows + lock */}
          {!isPro && (
            <div style={{ position: "relative", borderTop: "1px solid #f3f4f8" }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ padding: "10px 16px", borderBottom: "1px solid #f3f4f8", display: "flex", alignItems: "center", gap: 10, filter: "blur(4px)", userSelect: "none", pointerEvents: "none" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#e5e7eb", flexShrink: 0 }} />
                  <div>
                    <div style={{ width: 90, height: 9, background: "#e5e7eb", borderRadius: 4, marginBottom: 5 }} />
                    <div style={{ width: 140, height: 8, background: "#f3f4f6", borderRadius: 4 }} />
                  </div>
                </div>
              ))}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "rgba(255,255,255,0.75)", backdropFilter: "blur(2px)" }}>
                <span style={{ fontSize: 15 }}>🔒</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0f0c29" }}>See who cheered on PRO</span>
                <Link href="/upgrade" style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#4338ca,#6366f1)", padding: "5px 12px", borderRadius: 12, textDecoration: "none" }}>
                  Upgrade →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Status strip */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", border: "1px solid #f0f1f6", marginBottom: 12, display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {statusStats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", borderLeft: i > 0 ? "1px solid #f3f4f8" : "none" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.num}</div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Top commitment */}
        {topCommitment && (
          <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", border: "1px solid #f0f1f6", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Top Commitment</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f0c29", marginBottom: 8, lineHeight: 1.5 }}>{topCommitment.text}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#0891b2" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><ellipse cx="6" cy="6" rx="5" ry="3" stroke="#0891b2" strokeWidth="1.1"/><circle cx="6" cy="6" r="1.5" stroke="#0891b2" strokeWidth="1.1"/></svg>
              {topCommitment.views ?? 0} views
            </div>
          </div>
        )}

        {/* Reputation */}
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
          Reputation
        </div>
        <ReputationCard companyId={company.id} />

      </div>
    </div>
  );
}
