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
    .from("companies").select("id,name,username")
    .eq("owner_user_id", user.id).maybeSingle();

  if (ownerCompany) {
    company = ownerCompany;
  } else {
    const { data: membership } = await supabase
      .from("company_members").select("company_id")
      .eq("user_id", user.id).maybeSingle();
    if (!membership) redirect("/dashboard");
    const { data: memberCompany } = await supabase
      .from("companies").select("id,name,username")
      .eq("id", membership.company_id).single();
    company = memberCompany;
  }

  if (!company) redirect("/dashboard");

  /* COMMITMENTS */
  const { data: commitments } = await supabase
    .from("commitments").select("id,text,status,views")
    .eq("company_id", company.id);

  const total     = commitments?.length ?? 0;
  const active    = commitments?.filter((c) => c.status === "active").length ?? 0;
  const completed = commitments?.filter((c) => c.status === "completed").length ?? 0;
  const paused    = commitments?.filter((c) => c.status === "paused" || c.status === "withdrawn").length ?? 0;
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
    { num: active,    label: "Active",             color: "#10b981" },
    { num: completed, label: "Completed",           color: "#4338ca" },
    { num: paused,    label: "Paused/Withdrawn",    color: "#9ca3af" },
  ];

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh", paddingBottom: 32 }}>

      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>{company.name} Insights</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>@{company.username}</div>
        </div>
        <Link href={`/c/${company.username}`} style={{ fontSize: 11, fontWeight: 600, color: "#0891b2", background: "#e0f2fe", padding: "5px 12px", borderRadius: 20, textDecoration: "none" }}>
          View Profile →
        </Link>
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
