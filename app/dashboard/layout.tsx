"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import NotificationBell from "@/components/NotificationBell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen]                   = useState(false);
  const [profile, setProfile]             = useState<any>(null);
  const [company, setCompany]             = useState<any>(null);
  const [memberCompany, setMemberCompany] = useState<any>(null);
  const [loading, setLoading]             = useState(true);
  const [followers, setFollowers]         = useState(0);
  const [following, setFollowing]         = useState(0);

  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    let mounted = true;

    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profileData } = await supabase
        .from("profiles").select("*").eq("id", user.id).single();
      if (mounted) setProfile(profileData);

      const { data: ownedCompany } = await supabase
        .from("companies").select("*").eq("owner_user_id", user.id).maybeSingle();
      if (mounted && ownedCompany) setCompany(ownedCompany);

      const { data: membership } = await supabase
        .from("company_members").select("company_id")
        .eq("user_id", user.id).maybeSingle();
      if (membership) {
        const { data: mc } = await supabase
          .from("companies").select("*").eq("id", membership.company_id).maybeSingle();
        if (mounted && mc) setMemberCompany(mc);
      }

      const { count: followersCount } = await supabase
        .from("follows").select("*", { count: "exact", head: true })
        .eq("following_user_id", user.id);
      const { count: followingCount } = await supabase
        .from("follows").select("*", { count: "exact", head: true })
        .eq("follower_user_id", user.id);

      if (mounted) {
        setFollowers(followersCount || 0);
        setFollowing(followingCount || 0);
        setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [router]);

  useEffect(() => { setOpen(false); }, [pathname]);

  if (loading) return null;

  const activeCompany = company || memberCompany;

  // Workspace detected purely from pathname -- no useSearchParams required.
  const isCompanyWorkspace = !!activeCompany && pathname.startsWith("/dashboard/company");

  const homeLink   = isCompanyWorkspace ? "/dashboard/company" : "/dashboard";
  const createLink = isCompanyWorkspace ? "/dashboard/company/create" : "/dashboard/create";
  const upgradeLink = isCompanyWorkspace ? "/dashboard/company/upgrade" : "/upgrade";
  const billingLink = isCompanyWorkspace ? "/dashboard/company/billing" : "/billing";

  const avatar = isCompanyWorkspace
    ? activeCompany?.logo_url?.trim() || null
    : profile?.avatar_url?.trim() || null;
  const displayName = isCompanyWorkspace
    ? activeCompany?.name
    : profile?.display_name || profile?.username;
  const username = isCompanyWorkspace ? activeCompany?.username : profile?.username;

  const credits = isCompanyWorkspace ? (activeCompany?.credits ?? 0) : (profile?.credits ?? 0);

  const PRO_INDIVIDUAL = ["ind_499", "ind_899", "ind_1299"];
  const PRO_COMPANY    = ["comp_1999", "comp_2999", "comp_4999"];
  const isOnPlan = isCompanyWorkspace
    ? PRO_COMPANY.includes(activeCompany?.plan_key)
    : PRO_INDIVIDUAL.includes(profile?.plan_key);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  const creditBg     = credits <= 0 ? "#fef2f2" : credits <= 2 ? "#fef3c7" : isCompanyWorkspace ? "#e0f2fe" : "#eef2ff";
  const creditBorder = credits <= 0 ? "#fecaca" : credits <= 2 ? "#fde68a" : isCompanyWorkspace ? "#bae6fd" : "#c7d2fe";
  const creditColor  = credits <= 0 ? "#dc2626" : credits <= 2 ? "#92400e" : isCompanyWorkspace ? "#0369a1" : "#4338ca";
  const creditLabel  = credits <= 0 ? "0 credits" : credits + " left";

  const ac   = isCompanyWorkspace ? "#0891b2" : "#4338ca";
  const bgAc = isCompanyWorkspace ? "#e0f2fe" : "#eef2ff";

  const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    return (
      <Link
        href={href}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, textDecoration: "none", background: active ? bgAc : "transparent", color: active ? ac : "#374151", fontWeight: active ? 600 : 500, fontSize: 14, transition: "background 0.15s" }}
      >
        <span style={{ color: active ? ac : "#9ca3af", display: "flex", flexShrink: 0 }}>{icon}</span>
        {label}
      </Link>
    );
  };

  const I = {
    commitments: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5h12M3 9h8M3 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    insights:    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 14V9M7 14V6M11 14V10M15 14V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    billing:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h14" stroke="currentColor" strokeWidth="1.5"/></svg>,
    settings:    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.1 4.1l1.4 1.4M12.5 12.5l1.4 1.4M4.1 13.9l1.4-1.4M12.5 5.5l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    upgrade:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l2 5h5l-4 3 1.5 5L9 12l-4.5 3L6 10 2 7h5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
    credits:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5v1m0 6v1M6.5 9a2.5 2.5 0 005 0 2.5 2.5 0 00-5 0z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    support:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 10.5v.5M9 7a2 2 0 011.5 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    invite:      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M1 16c0-3.3 2.7-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 11v6M10 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    company:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 6V4a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    members:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M1 15c0-2.8 2.2-5 5-5h6c2.8 0 5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    sw:          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    logout:      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 16H3a1 1 0 01-1-1V3a1 1 0 011-1h4M12 13l4-4-4-4M16 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    home:        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 9L10 2l8 7v8a1 1 0 01-1 1H3a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 20v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    search:      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-[100dvh] bg-white border-r flex flex-col z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ width: 260 }}
      >
        <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #f3f4f8" }}>
          <Link href={isCompanyWorkspace ? "/dashboard/company/settings" : "/profile/edit"} style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: isCompanyWorkspace ? 10 : "50%", background: isCompanyWorkspace ? "linear-gradient(135deg,#0891b2,#0e7490)" : "linear-gradient(135deg,#4338ca,#7c3aed,#ec4899)", padding: 2, flexShrink: 0 }}>
                {avatar ? (
                  <img src={avatar} style={{ width: "100%", height: "100%", borderRadius: isCompanyWorkspace ? 8 : "50%", objectFit: "cover", border: "2px solid #fff" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", borderRadius: isCompanyWorkspace ? 8 : "50%", background: isCompanyWorkspace ? "#0891b2" : "#4338ca", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>
                    {displayName?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29" }}>{displayName}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>@{username}</div>
                <div
                  style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, background: creditBg, border: "1px solid " + creditBorder, borderRadius: 20, padding: "2px 8px", cursor: credits <= 0 ? "pointer" : "default" }}
                  onClick={() => { if (credits <= 0) router.push(upgradeLink); }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: creditColor }}>
                    {credits <= 0 ? "No credits" : credits + " credits"}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {!isCompanyWorkspace && username && (
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
              <Link href={"/u/" + username + "/followers"} style={{ textDecoration: "none", textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f0c29" }}>{followers}</div>
                <div style={{ fontSize: 10, color: "#9ca3af" }}>Followers</div>
              </Link>
              <div style={{ width: 1, height: 24, background: "#f3f4f8" }} />
              <Link href={"/u/" + username + "/following"} style={{ textDecoration: "none", textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f0c29" }}>{following}</div>
                <div style={{ fontSize: 10, color: "#9ca3af" }}>Following</div>
              </Link>
            </div>
          )}

          <Link
            href={isCompanyWorkspace ? "/c/" + username : "/u/" + username}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: ac, textDecoration: "none", background: bgAc, padding: "5px 12px", borderRadius: 20 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1 11c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            View Profile
          </Link>
        </div>

        <nav style={{ padding: "12px 12px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
          {isCompanyWorkspace ? (
            <>
              <NavItem href="/dashboard/company/commitments" icon={I.company}  label="Company Commitments" />
              <NavItem href="/dashboard/company/members"     icon={I.members}  label="Members" />
              <NavItem href="/dashboard/company/insights"    icon={I.insights} label="Insights" />
              <NavItem href="/dashboard/company/invite"      icon={I.invite}   label="Invite Members" />
              <NavItem href="/dashboard/company/settings"    icon={I.settings} label="Company Settings" />
              <NavItem href={billingLink}                    icon={I.billing}  label="Billing" />
              {isOnPlan
                ? <NavItem href={billingLink}  icon={I.credits} label="Buy Credits" />
                : <NavItem href={upgradeLink}  icon={I.upgrade} label="Upgrade" />
              }
              <NavItem href="/dashboard/company/support" icon={I.support} label="Support" />
              {/* Switch to individual -- only shown for invited members, not owners */}
              {!company && memberCompany && (
                <Link
                  href="/dashboard"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, textDecoration: "none", color: "#6b7280", fontWeight: 500, fontSize: 14, marginTop: 4 }}
                >
                  <span style={{ color: "#9ca3af", display: "flex", flexShrink: 0 }}>{I.sw}</span>
                  My Dashboard
                </Link>
              )}

            </>
          ) : (
            <>
              <NavItem href="/dashboard/my"       icon={I.commitments} label="My Commitments" />
              <NavItem href="/dashboard/insights" icon={I.insights}    label="Insights" />
              <NavItem href="/billing"            icon={I.billing}     label="Billing" />
              <NavItem href="/account"            icon={I.settings}    label="Account Settings" />
              {isOnPlan
                ? <NavItem href="/billing"  icon={I.credits} label="Buy Credits" />
                : <NavItem href="/upgrade"  icon={I.upgrade} label="Upgrade" />
              }
              <NavItem href="/dashboard/support" icon={I.support} label="Support" />
              {(company || memberCompany) && (
                <Link
                  href="/dashboard/company"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, textDecoration: "none", color: "#0891b2", fontWeight: 600, fontSize: 14, background: "#f0f9ff", marginTop: 4 }}
                >
                  <span style={{ color: "#0891b2", display: "flex", flexShrink: 0 }}>{I.sw}</span>
                  {(company || memberCompany)?.name} workspace
                </Link>
              )}
            </>
          )}
        </nav>

        <div style={{ padding: "12px 12px 24px" }}>
          <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, border: "none", background: "#fff5f5", color: "#dc2626", fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
            <span style={{ color: "#dc2626", display: "flex" }}>{I.logout}</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col pb-24">

        <div className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ display: "block", width: 18, height: 2, background: "#374151", borderRadius: 2 }} />
            <span style={{ display: "block", width: 18, height: 2, background: "#374151", borderRadius: 2 }} />
            <span style={{ display: "block", width: 18, height: 2, background: "#374151", borderRadius: 2 }} />
          </button>
          <Link href={homeLink} className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={28} height={28} />
            <span style={{ fontWeight: 800, color: "#4338ca", fontSize: 16 }}>Stated</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{ display: "flex", alignItems: "center", background: creditBg, border: "1px solid " + creditBorder, borderRadius: 20, padding: "4px 10px", cursor: credits <= 0 ? "pointer" : "default" }}
              onClick={() => { if (credits <= 0) router.push(upgradeLink); }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: creditColor }}>{creditLabel}</span>
            </div>
            <NotificationBell />
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center bg-white border-b px-8 py-4">
          <Link href={homeLink} className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={32} height={32} />
            <span style={{ fontWeight: 800, color: "#4338ca", fontSize: 18 }}>Stated</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{ display: "flex", alignItems: "center", background: creditBg, border: "1px solid " + creditBorder, borderRadius: 20, padding: "5px 12px", cursor: credits <= 0 ? "pointer" : "default" }}
              onClick={() => { if (credits <= 0) router.push(upgradeLink); }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: creditColor }}>{creditLabel}</span>
            </div>
            <NotificationBell />
          </div>
        </div>

        <div className="px-6 py-8 max-w-4xl mx-auto w-full">
          {children}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white md:hidden" style={{ borderTop: "1px solid #ebebf2" }}>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "8px 24px 14px" }}>
            <Link href={homeLink} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textDecoration: "none", color: pathname === homeLink ? "#4338ca" : "#9ca3af" }}>
              {I.home}
              <span style={{ fontSize: 9, fontWeight: 600 }}>Home</span>
            </Link>
            <Link href="/search" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textDecoration: "none", color: pathname === "/search" ? "#4338ca" : "#9ca3af" }}>
              {I.search}
              <span style={{ fontSize: 9, fontWeight: 500 }}>Search</span>
            </Link>
            <Link
              href={createLink}
              style={{ background: isCompanyWorkspace ? "linear-gradient(135deg,#0891b2,#0e7490)" : "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", padding: "8px 20px", borderRadius: 22, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, textDecoration: "none", boxShadow: isCompanyWorkspace ? "0 3px 10px rgba(8,145,178,0.3)" : "0 3px 10px rgba(67,56,202,0.3)" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
              Create
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
