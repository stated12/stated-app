export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ReputationCard from "@/components/ReputationCard";
import Link from "next/link";

export default async function InsightsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const PRO_PLANS = ["ind_499","ind_899","ind_1299","comp_1999","comp_2999","comp_4999"];
  const isPro = PRO_PLANS.includes(profile?.plan_key);

  const { count: followers } = await supabase
    .from("follows").select("*", { count: "exact", head: true })
    .eq("following_user_id", user.id);

  const { count: following } = await supabase
    .from("follows").select("*", { count: "exact", head: true })
    .eq("follower_user_id", user.id);

  const { data: commitments } = await supabase
    .from("commitments").select("id,status,shares")
    .eq("user_id", user.id).is("company_id", null);

  const commitmentIds = commitments?.map((c) => c.id) || [];

  const { count: profileViews } = await supabase
    .from("profile_views").select("*", { count: "exact", head: true })
    .eq("profile_id", user.id);

  let commitmentViews = 0;
  if (commitmentIds.length > 0) {
    const { data } = await supabase
      .from("commitment_views").select("commitment_id")
      .in("commitment_id", commitmentIds);
    commitmentViews = data?.length ?? 0;
  }

  // ✅ Total cheers across all user commitments
  let totalCheers = 0;
  if (commitmentIds.length > 0) {
    const { count } = await supabase
      .from("commitment_cheers").select("*", { count: "exact", head: true })
      .in("commitment_id", commitmentIds);
    totalCheers = count ?? 0;
  }

  // ✅ Who cheered — only fetched for pro users (name + avatar + commitment)
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

  const total     = commitments?.length ?? 0;
  const active    = commitments?.filter((c) => c.status === "active").length ?? 0;
  const completed = commitments?.filter((c) => c.status === "completed").length ?? 0;
  const paused    = commitments?.filter((c) => c.status === "paused" || c.status === "withdrawn").length ?? 0;
  const totalShares = commitments?.reduce((sum, c) => sum + (c.shares ?? 0), 0) ?? 0;

  const stats = [
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#4338ca" strokeWidth="1.3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#4338ca" strokeWidth="1.3" strokeLinecap="round"/></svg>, label: "Profile Views",      num: profileViews ?? 0, bg: "#eef2ff", color: "#4338ca" },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="8" rx="7" ry="4.5" stroke="#0891b2" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" stroke="#0891b2" strokeWidth="1.3"/></svg>, label: "Commitment Views", num: commitmentViews,   bg: "#e0f2fe", color: "#0891b2" },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="6" r="2.5" stroke="#10b981" strokeWidth="1.3"/><circle cx="11" cy="6" r="2.5" stroke="#10b981" strokeWidth="1.3"/><path d="M1 14c0-2.8 2.2-5 5-5h4c2.8 0 5 2.2 5 5" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round"/></svg>, label: "Followers",         num: followers ?? 0,    bg: "#dcfce7", color: "#10b981" },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Following",         num: following ?? 0,    bg: "#fef3c7", color: "#d97706" },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 2l3 3-3 3" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 5H7a5 5 0 00-5 5v1" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round"/></svg>, label: "Total Shares",      num: totalShares,       bg: "#fff7ed", color: "#f97316" },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h9M2 12h6" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round"/></svg>, label: "Total Commitments", num: total,             bg: "#f5f3ff", color: "#7c3aed" },
    // ✅ Cheers stat card
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 6v4a.5.5 0 00.5.5H4L6.5 13V3L4 5.5H2.5A.5.5 0 002 6z" stroke="#ea580c" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6.5 3.5L12 1.5v13l-5.5-2" stroke="#ea580c" strokeWidth="1.3" strokeLinejoin="round"/><path d="M13.5 5.5c.6.6.8 1.5.8 2.5s-.2 1.9-.8 2.5" stroke="#ea580c" strokeWidth="1.3" strokeLinecap="round"/></svg>, label: "Total Cheers",      num: totalCheers,       bg: "#fff7ed", color: "#ea580c" },
  ];

  const statusStats = [
    { num: active,    label: "Active",             color: "#10b981", bg: "#dcfce7" },
    { num: completed, label: "Completed",           color: "#4338ca", bg: "#eef2ff" },
    { num: paused,    label: "Paused / Withdrawn",  color: "#9ca3af", bg: "#f3f4f6" },
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
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>Insights</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>@{profile?.username}</div>
        </div>
        {isPro && (
          <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#4338ca,#6366f1)", padding: "3px 10px", borderRadius: 20 }}>PRO</span>
        )}
      </div>

      <div style={{ padding: 16, position: "relative" }}>

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

        {/* Status strip */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", border: "1px solid #f0f1f6", marginBottom: 12, display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {statusStats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", borderLeft: i > 0 ? "1px solid #f3f4f8" : "none", padding: "0 8px" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.num}</div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ✅ WHO CHEERED SECTION */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f1f6", overflow: "hidden", marginBottom: 12 }}>
          {/* Section header */}
          <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #f3f4f8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 6v4a.5.5 0 00.5.5H4L6.5 13V3L4 5.5H2.5A.5.5 0 002 6z" stroke="#ea580c" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M6.5 3.5L12 1.5v13l-5.5-2" stroke="#ea580c" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M13.5 5.5c.6.6.8 1.5.8 2.5s-.2 1.9-.8 2.5" stroke="#ea580c" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f0c29" }}>Who cheered you</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#ea580c", background: "#fff7ed", padding: "2px 8px", borderRadius: 20 }}>
              {totalCheers} total
            </span>
          </div>

          {/* Free plan — blurred placeholder rows */}
          {!isPro && (
            <div style={{ position: "relative" }}>
              {/* Fake blurred rows */}
              {[1,2,3].map((i) => (
                <div key={i} style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f8", display: "flex", alignItems: "center", gap: 10, filter: "blur(5px)", userSelect: "none", pointerEvents: "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e5e7eb", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: 100, height: 10, background: "#e5e7eb", borderRadius: 4, marginBottom: 6 }} />
                    <div style={{ width: 160, height: 8, background: "#f3f4f6", borderRadius: 4 }} />
                  </div>
                </div>
              ))}
              {/* Lock overlay */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(2px)" }}>
                <div style={{ fontSize: 22 }}>🔒</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f0c29" }}>PRO feature</div>
                <div style={{ fontSize: 11, color: "#6b7280", textAlign: "center", maxWidth: 200, lineHeight: 1.5 }}>
                  See exactly who cheered your commitments
                </div>
                <Link
                  href="/upgrade"
                  style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: "8px 20px", borderRadius: 20, fontSize: 12, fontWeight: 700, textDecoration: "none" }}
                >
                  Upgrade to PRO →
                </Link>
              </div>
            </div>
          )}

          {/* Pro plan — real cheerleaders */}
          {isPro && cheerLeaders.length === 0 && (
            <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 13, color: "#9ca3af" }}>
              No cheers yet — share your commitments to get cheered!
            </div>
          )}

          {isPro && cheerLeaders.length > 0 && (
            <div>
              {cheerLeaders.map((cl, i) => {
                const avatar = cl.avatar_url?.trim()
                  ? cl.avatar_url
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(cl.display_name || cl.username)}&background=4338ca&color=fff`;
                return (
                  <div
                    key={i}
                    style={{ padding: "12px 16px", borderBottom: i < cheerLeaders.length - 1 ? "1px solid #f3f4f8" : "none", display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Link href={`/u/${cl.username}`}>
                      <img
                        src={avatar}
                        style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                      />
                    </Link>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f0c29" }}>
                        <Link href={`/u/${cl.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                          {cl.display_name || cl.username}
                        </Link>
                        <span style={{ fontWeight: 400, color: "#6b7280" }}> cheered</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        "{cl.commitment_text.length > 50 ? cl.commitment_text.slice(0, 50) + "…" : cl.commitment_text}"
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: "#9ca3af", flexShrink: 0 }}>
                      {timeAgo(cl.cheered_at)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Lock overlay for free users — covers stats grid */}
        {!isPro && (
          <div style={{ position: "absolute", inset: 16, background: "rgba(242,243,247,0.85)", backdropFilter: "blur(6px)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
            <div style={{ textAlign: "center", padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29", marginBottom: 6 }}>Insights on PRO</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
                Unlock detailed analytics — profile views, commitment views, follower details and more
              </div>
              <Link
                href="/upgrade"
                style={{ display: "inline-block", background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: "11px 28px", borderRadius: 22, fontSize: 13, fontWeight: 700, textDecoration: "none", boxShadow: "0 3px 12px rgba(67,56,202,0.3)" }}
              >
                Upgrade to PRO →
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Reputation card */}
      <div style={{ padding: "0 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Reputation</div>
        <ReputationCard userId={user.id} />
      </div>

    </div>
  );
}
