export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import CommitmentFeed from "@/components/CommitmentFeed";

export default async function CompanyDashboardPage() {
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

  const { count: activeCount } = await supabase
    .from("commitments").select("*", { count: "exact", head: true })
    .eq("company_id", company.id).eq("status", "active");

  const { count: memberCount } = await supabase
    .from("company_members").select("*", { count: "exact", head: true })
    .eq("company_id", company.id);

  const { data: commitmentRows } = await supabase
    .from("commitments").select("id").eq("company_id", company.id);

  let totalViews = 0;
  if (commitmentRows && commitmentRows.length > 0) {
    for (const c of commitmentRows) {
      const { count } = await supabase
        .from("commitment_views").select("*", { count: "exact", head: true })
        .eq("commitment_id", c.id);
      totalViews += count || 0;
    }
  }

  const formatNum = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  const logoUrl = company.logo_url?.trim()
    ? company.logo_url.trim()
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=0891b2&color=fff&size=128`;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const stats = [
    { num: activeCount ?? 0,       label: "Active",  color: "#10b981" },
    { num: formatNum(totalViews),  label: "Views",   color: "#0f0c29" },
    { num: (memberCount ?? 0) + 1, label: "Members", color: "#0891b2" },
  ];

  return (
    <div style={{ margin: "-32px -24px" }}>

      <div style={{ background: "#fff", padding: "14px 16px 12px", borderBottom: "1px solid #f0f1f6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 2 }}>{greeting},</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29" }}>{company.name}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
              {activeCount ?? 0} active {(activeCount ?? 0) === 1 ? "commitment" : "commitments"} · Company workspace
            </div>
          </div>
          <Link href={`/c/${company.username}`}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: 2.5, flexShrink: 0 }}>
              <img
                src={logoUrl}
                alt={company.name}
                style={{ width: "100%", height: "100%", borderRadius: 10, objectFit: "cover", border: "2px solid #fff" }}
              />
            </div>
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: "10px 16px", background: "#f2f3f7" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "10px 6px", textAlign: "center", border: "1px solid #f0f1f6" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.num}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 16px 24px", background: "#f2f3f7" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 10px" }}>
          <h1 style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Discover commitments
          </h1>
          {(userRole === "owner" || userRole === "admin" || userRole === "member") && (
            <Link
              href="/dashboard/create?workspace=company"
              style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: "6px 14px", borderRadius: 20, textDecoration: "none" }}
            >
              + Create
            </Link>
          )}
        </div>
        <CommitmentFeed endpoint="https://app.stated.in/api/feed" showFilters={true} />
      </div>

    </div>
  );
}
