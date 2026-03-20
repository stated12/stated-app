export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import CommitmentFeed from "@/components/CommitmentFeed";
import DashboardGreeting from "@/components/DashboardGreeting";

export default async function CompanyDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Check ownership first
  let company: any = null;
  let userRole = "viewer";

  const { data: ownedCompany } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (ownedCompany) {
    company = ownedCompany;
    userRole = "owner";
  } else {
    // Check membership
    const { data: membership } = await supabase
      .from("company_members")
      .select("role, company_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (membership) {
      const { data: memberCompany } = await supabase
        .from("companies")
        .select("*")
        .eq("id", membership.company_id)
        .maybeSingle();

      if (memberCompany) {
        company = memberCompany;
        userRole = membership.role;
      }
    }
  }

  if (!company) redirect("/dashboard");

  // Stats
  const { count: activeCount } = await supabase
    .from("commitments")
    .select("*", { count: "exact", head: true })
    .eq("company_id", company.id)
    .eq("status", "active");

  const { count: memberCount } = await supabase
    .from("company_members")
    .select("*", { count: "exact", head: true })
    .eq("company_id", company.id);

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id")
    .eq("company_id", company.id);

  let totalViews = 0;
  if (commitments && commitments.length > 0) {
    for (const c of commitments) {
      const { count } = await supabase
        .from("commitment_views")
        .select("*", { count: "exact", head: true })
        .eq("commitment_id", c.id);
      totalViews += count || 0;
    }
  }

  const formatNum = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  const logoUrl = company.logo_url?.trim()
    ? company.logo_url.trim()
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=0891b2&color=fff&size=128`;

  const stats = [
    { num: activeCount ?? 0,        label: "Active",   color: "#10b981" },
    { num: formatNum(totalViews),   label: "Views",    color: "#0f0c29" },
    { num: (memberCount ?? 0) + 1,  label: "Members",  color: "#0891b2" },
  ];

  return (
    <div style={{ margin: "-32px -24px" }}>

      {/* Company greeting band */}
      <div style={{ background: "#fff", padding: "14px 16px 12px", borderBottom: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: 2, flexShrink: 0 }}>
            <img src={logoUrl} alt={company.name} style={{ width: "100%", height: "100%", borderRadius: 8, objectFit: "cover", border: "2px solid #fff" }} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0f0c29" }}>{company.name}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>@{company.username} · Company workspace</div>
          </div>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#0891b2", background: "#e0f2fe", padding: "3px 10px", borderRadius: 20, textTransform: "capitalize" }}>
          {userRole}
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: "10px 16px", background: "#f2f3f7" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "10px 6px", textAlign: "center", border: "1px solid #f0f1f6" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.num}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links — admin/owner only */}
      {(userRole === "owner" || userRole === "admin") && (
        <div style={{ display: "flex", gap: 8, padding: "0 16px 10px", background: "#f2f3f7", overflowX: "auto" }}>
          {[
            { href: `/c/${company.username}`, label: "View Profile" },
            { href: "/dashboard/company/members", label: "Members" },
            { href: "/dashboard/company/invite", label: "Invite" },
            { href: "/dashboard/company/insights", label: "Insights" },
            { href: "/dashboard/company/settings", label: "Settings" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 11, fontWeight: 600, color: "#0891b2", background: "#e0f2fe", padding: "6px 14px", borderRadius: 20, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      {/* Feed */}
      <div style={{ padding: "0 16px 24px", background: "#f2f3f7" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0 10px" }}>
          <h1 style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29" }}>Public commitments</h1>
          {(userRole === "owner" || userRole === "admin" || userRole === "member") && (
            <Link href="/dashboard/create" style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: "6px 14px", borderRadius: 20, textDecoration: "none" }}>
              + Create
            </Link>
          )}
        </div>
        <CommitmentFeed endpoint="https://app.stated.in/api/feed" showFilters={true} />
      </div>

    </div>
  );
}
