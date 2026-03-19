export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import CommitmentFeed from "@/components/CommitmentFeed";
import DashboardGreeting from "@/components/DashboardGreeting";

export default async function DashboardPage() {
  const supabase = await createClient();

  let user = null;
  let profile = null;
  let activeCount = 0;
  let totalViews = 0;
  let reputationScore = 0;

  try {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    user = currentUser;

    if (user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .eq("id", user.id)
        .single();

      profile = profileData;

      if (profile) {
        const { count: active } = await supabase
          .from("commitments")
          .select("*", { count: "exact", head: true })
          .eq("user_id", profile.id)
          .eq("status", "active");

        activeCount = active || 0;

        const { data: commitments } = await supabase
          .from("commitments")
          .select("id")
          .eq("user_id", profile.id);

        if (commitments && commitments.length > 0) {
          for (const c of commitments) {
            const { count } = await supabase
              .from("commitment_views")
              .select("*", { count: "exact", head: true })
              .eq("commitment_id", c.id);
            totalViews += count || 0;
          }
        }

        try {
          const repRes = await fetch(
            `https://app.stated.in/api/reputation?userId=${profile.id}`,
            { cache: "no-store" }
          );
          const repData = await repRes.json();
          reputationScore = repData?.score || 0;
        } catch {
          reputationScore = 0;
        }
      }
    }
  } catch (e) {
    user = null;
  }

  const avatarUrl =
    profile?.avatar_url && profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile?.display_name || profile?.username || "U"
        )}&background=4338ca&color=fff&size=128`;

  const displayName = profile?.display_name || profile?.username || "there";

  const formatNum = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  return (
    <div style={{ margin: "-32px -24px" }}>

      {/* GREETING + AVATAR BOTTOM SHEET — client component */}
      {user && profile && (
        <DashboardGreeting
          displayName={displayName}
          avatarUrl={avatarUrl}
          username={profile.username}
          activeCount={activeCount}
          reputationScore={reputationScore}
        />
      )}

      {/* STATS STRIP */}
      {user && profile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 8,
            padding: "10px 16px",
            background: "#f2f3f7",
          }}
        >
          {[
            { num: activeCount,             label: "Active",       color: "#10b981" },
            { num: formatNum(totalViews),   label: "Total views",  color: "#0f0c29" },
            { num: reputationScore,         label: "Reputation",   color: "#f97316" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "10px 6px",
                textAlign: "center",
                border: "1px solid #f0f1f6",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>
                {s.num}
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FEED SECTION */}
      <div style={{ padding: "0 16px 24px", background: "#f2f3f7" }}>

        <div style={{ padding: "14px 0 10px", textAlign: "center" }}>
          <h1 style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Discover commitments
          </h1>
        </div>

        <CommitmentFeed
          endpoint="https://app.stated.in/api/feed"
          showFilters={true}
        />

      </div>

    </div>
  );
}
