export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ReputationCard from "@/components/ReputationCard";
import ViewTracker from "@/components/ViewTracker";
import CommitmentList from "@/components/CommitmentList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();
  const { data: company } = await supabase
    .from("companies")
    .select("name, username, description, logo_url")
    .eq("username", username)
    .single();

  if (!company) return { title: "Stated" };

  const logoUrl = company.logo_url?.trim()
    ? company.logo_url.trim()
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=0891b2&color=fff&size=256`;

  const title = `${company.name} (@${company.username}) — Stated`;
  const description = company.description
    ? `${company.description} | Public commitments on Stated`
    : `Follow ${company.name}'s public commitments on Stated`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: logoUrl, width: 256, height: 256, alt: company.name }],
      url: `https://app.stated.in/c/${company.username}`,
      siteName: "Stated",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [logoUrl],
    },
  };
}

export default async function CompanyPublicPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: { user: currentUser } } = await supabase.auth.getUser();

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("username", username)
    .single();

  if (!company) return notFound();

  const { count: followersCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_company_id", company.id);

  const { count: membersCount } = await supabase
    .from("company_members")
    .select("*", { count: "exact", head: true })
    .eq("company_id", company.id);

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at, completed_at, end_date")
    .eq("company_id", company.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  const enrichedCommitments = commitments && commitments.length > 0
    ? await Promise.all(commitments.map(async (c) => {
        const { count: views } = await supabase
          .from("commitment_views")
          .select("*", { count: "exact", head: true })
          .eq("commitment_id", c.id);

        const { count: updateCount } = await supabase
          .from("commitment_updates")
          .select("*", { count: "exact", head: true })
          .eq("commitment_id", c.id);

        const { count: sharesCount } = await supabase
          .from("commitment_shares")
          .select("*", { count: "exact", head: true })
          .eq("commitment_id", c.id);

        const { data: update } = await supabase
          .from("commitment_updates")
          .select("content, created_at")
          .eq("commitment_id", c.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        return {
          ...c,
          views: views || 0,
          update_count: updateCount || 0,
          shares_count: sharesCount || 0,
          latest_update: update?.content || null,
          latest_update_created_at: update?.created_at || null,
        };
      }))
    : [];

  const totalViews = enrichedCommitments.reduce((sum, c) => sum + c.views, 0);
  const formatViews = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  const logoUrl = company.logo_url?.trim()
    ? company.logo_url.trim()
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=0891b2&color=fff&size=256`;

  const isOwner = currentUser?.id === company.owner_user_id;

  const socialLinks = [
    { href: company.website, label: "Website", icon: <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 0c1.5 2 1.5 8 0 10M1 6h10" stroke="#0891b2" strokeWidth="1.1" strokeLinecap="round"/></svg> },
    { href: company.twitter,  label: "Twitter",  icon: <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M11 1.5L6.8 6.3M11 1.5H8M11 1.5V5M1 10.5l4.2-4.8m0 0L1 1.5h3.5l6.5 9H7.5L5.2 5.7z" stroke="#0891b2" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { href: company.linkedin, label: "LinkedIn", icon: <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 1h8a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm4 8V5m0 0V3m0 2H4m2 0h2" stroke="#0891b2" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { href: company.github,   label: "GitHub",   icon: <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1a5 5 0 00-1.58 9.74c.25.05.34-.11.34-.24v-.85C3.16 9.9 2.87 9 2.87 9c-.23-.58-.56-.74-.56-.74-.46-.31.03-.3.03-.3.5.03.77.52.77.52.45.77 1.18.55 1.47.42.05-.33.18-.55.32-.68C3.43 8.1 2.37 7.7 2.37 5.9c0-.52.19-.95.5-1.28-.05-.12-.22-.61.05-1.27 0 0 .4-.13 1.32.49a4.6 4.6 0 012.4 0c.91-.62 1.31-.49 1.31-.49.27.66.1 1.15.05 1.27.31.33.5.76.5 1.28 0 1.81-1.1 2.2-2.15 2.32.17.15.32.44.32.89v1.31c0 .13.09.29.34.24A5 5 0 006 1z" stroke="#0891b2" strokeWidth="0.8"/></svg> },
  ].filter((s) => !!s.href);

  const stats = [
    { num: followersCount ?? 0,           label: "Followers"    },
    { num: (membersCount ?? 0) + 1,       label: "Members"      },
    { num: enrichedCommitments.length,    label: "Commitments"  },
    { num: formatViews(totalViews),       label: "Total Views"  },
  ];

  return (
    <div className="min-h-screen pb-16" style={{ background: "#f2f3f7" }}>
      <ViewTracker type="profile" entityId={company.id} />

      {/* NAV */}
      <nav className="flex items-center justify-between px-5 py-3 bg-white" style={{ borderBottom: "1px solid #ebebf2" }}>
        <Link href="/" className="flex items-center gap-1 text-xs font-medium" style={{ color: "#0891b2" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>
        <span className="font-extrabold text-base" style={{ color: "#1e1b4b" }}>
          St<span style={{ color: "#4f46e5" }}>a</span>ted
        </span>
        <div className="flex items-center gap-1">
          {[0,1,2].map((i) => <div key={i} className="w-1 h-1 rounded-full" style={{ background: "#9ca3af" }} />)}
        </div>
      </nav>

      {/* BANNER */}
      <div className="relative overflow-hidden" style={{ height: 152, background: "#0d1829" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#0c4a6e 0%,#0891b2 40%,#0e7490 70%,#164e63 100%)" }} />
        <div className="absolute rounded-full" style={{ width: 180, height: 180, top: -60, right: -30, background: "radial-gradient(circle,rgba(56,189,248,0.5) 0%,transparent 70%)" }} />
        <div className="absolute rounded-full" style={{ width: 140, height: 140, bottom: -50, left: 20, background: "radial-gradient(circle,rgba(14,116,144,0.4) 0%,transparent 70%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(1.5px 1.5px at 8% 20%,#fff 0%,transparent 100%),radial-gradient(1px 1px at 20% 70%,rgba(255,255,255,0.8) 0%,transparent 100%),radial-gradient(1px 1px at 72% 25%,rgba(255,255,255,0.85) 0%,transparent 100%),radial-gradient(1px 1px at 85% 65%,rgba(255,255,255,0.7) 0%,transparent 100%)" }} />

        <div className="absolute inset-0 flex items-center justify-between z-10 px-5" style={{ paddingBottom: 32 }}>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Stated" width={30} height={30} style={{ objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(56,189,248,0.9))" }} />
              <span className="font-extrabold text-white text-lg tracking-wide">Stated</span>
            </div>
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>Company Profile</span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {["Your word is your brand.", "Stated publicly.", "Follow-through is everything."].map((line, i) => (
              <span key={i} className="font-bold text-right" style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{line}</span>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10" style={{ background: "rgba(0,0,0,0.28)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "5px 20px" }}>
          {[
            { dot: "#38bdf8", label: "Commit", color: "rgba(56,189,248,0.9)" },
            { dot: "#7dd3fc", label: "Track",  color: "rgba(125,211,252,0.9)" },
            { dot: "#34d399", label: "Achieve",color: "rgba(52,211,153,0.9)"  },
          ].map((s, i) => (
            <div key={i} className="flex items-center flex-1 justify-center gap-1.5">
              {i > 0 && <div className="self-stretch w-px mx-2" style={{ background: "rgba(255,255,255,0.1)" }} />}
              <div className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: s.dot, boxShadow: `0 0 6px ${s.dot}` }} />
              <span className="font-bold uppercase tracking-widest" style={{ fontSize: 9, color: s.color }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Logo avatar */}
        <div className="absolute" style={{ bottom: -50, left: 20, zIndex: 30 }}>
          <div className="rounded-xl" style={{ background: "linear-gradient(135deg,#0891b2,#38bdf8)", padding: 3, width: 86, height: 86, boxShadow: "0 4px 20px rgba(8,145,178,0.45)", borderRadius: 16 }}>
            <img src={logoUrl} alt={company.name} style={{ width: "100%", height: "100%", border: "3px solid #fff", borderRadius: 13, objectFit: "cover" }} />
          </div>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white" style={{ paddingTop: 60, borderBottom: "1px solid #f0f1f6" }}>
        <div className="px-5 pb-5">

          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-xl" style={{ color: "#0f0c29", letterSpacing: "-0.3px" }}>{company.name}</h1>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#0891b2", background: "#e0f2fe", padding: "2px 8px", borderRadius: 20 }}>COMPANY</span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>@{company.username}</div>
            </div>
            {isOwner && (
              <Link href="/dashboard/company" style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#0891b2,#0e7490)", padding: "7px 14px", borderRadius: 20, textDecoration: "none" }}>
                Dashboard
              </Link>
            )}
          </div>

          {company.description && (
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#4b5563" }}>{company.description}</p>
          )}

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href!} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5"
                  style={{ background: "#f0f9ff", border: "1px solid #bae6fd", color: "#0891b2" }}>
                  {s.icon}{s.label}
                </a>
              ))}
            </div>
          )}

          <div className="flex pt-4" style={{ borderTop: "1px solid #f3f4f8" }}>
            {stats.map((s, i) => (
              <div key={i} className="flex-1 text-center" style={{ borderLeft: i > 0 ? "1px solid #f3f4f8" : "none" }}>
                <div className="font-extrabold text-lg" style={{ color: "#0f0c29" }}>{s.num}</div>
                <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REPUTATION */}
      <div className="px-3.5 mt-3">
        <div className="flex items-center gap-1.5 text-sm font-bold mb-2" style={{ color: "#0f0c29" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1l1.6 3.3 3.6.52-2.6 2.54.62 3.6L7 9.2l-3.22 1.76.62-3.6L1.8 4.82l3.6-.52z" stroke="#f59e0b" strokeWidth="1.2" strokeLinejoin="round" fill="#fef3c7"/>
          </svg>
          Reputation
        </div>
        <ReputationCard companyId={company.id} />
      </div>

      {/* COMMITMENTS */}
      <div className="px-3.5 mt-3 pb-8">
        <div className="flex items-center gap-1.5 text-sm font-bold mb-2" style={{ color: "#0f0c29" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4h10M2 7.5h7M2 11h5" stroke="#0891b2" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Public Commitments
        </div>
        {enrichedCommitments.length > 0 ? (
          <CommitmentList commitments={enrichedCommitments} />
        ) : (
          <div className="rounded-2xl p-8 text-center text-sm" style={{ background: "#fff", border: "1px solid #f0f1f6", color: "#9ca3af" }}>
            No public commitments yet
          </div>
        )}
      </div>

    </div>
  );
}
