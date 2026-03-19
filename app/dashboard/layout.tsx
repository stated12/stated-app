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
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) { router.push("/login"); return; }

      const { data: profileData } = await supabase
        .from("profiles").select("*").eq("id", user.id).single();
      if (mounted) setProfile(profileData);

      const { data: companyData } = await supabase
        .from("companies").select("*").eq("owner_user_id", user.id).maybeSingle();
      if (mounted) setCompany(companyData);

      const { count: followersCount } = await supabase
        .from("follows").select("*", { count: "exact", head: true })
        .eq("following_user_id", user.id);
      const { count: followingCount } = await supabase
        .from("follows").select("*", { count: "exact", head: true })
        .eq("follower_user_id", user.id);

      if (mounted) {
        setFollowers(followersCount || 0);
        setFollowing(followingCount || 0);
      }
      setLoading(false);
    }

    load();
    return () => { mounted = false; };
  }, [router]);

  useEffect(() => { setOpen(false); }, [pathname]);

  if (loading) return null;

  const isCompanyWorkspace = pathname.startsWith("/dashboard/company");
  const homeLink = isCompanyWorkspace ? "/dashboard/company" : "/dashboard";
  const createLink = "/create";

  const avatar = isCompanyWorkspace ? company?.logo_url : profile?.avatar_url;
  const displayName = isCompanyWorkspace
    ? company?.name
    : profile?.display_name || profile?.username;
  const username = isCompanyWorkspace ? company?.username : profile?.username;
  const credits = profile?.credits ?? 0;

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    return (
      <Link
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px",
          borderRadius: 12,
          textDecoration: "none",
          background: active ? "#eef2ff" : "transparent",
          color: active ? "#4338ca" : "#374151",
          fontWeight: active ? 600 : 500,
          fontSize: 14,
          transition: "background 0.15s",
        }}
      >
        <span style={{ color: active ? "#4338ca" : "#9ca3af", display: "flex", flexShrink: 0 }}>
          {icon}
        </span>
        {label}
      </Link>
    );
  };

  const icons = {
    commitments: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5h12M3 9h8M3 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    insights:    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 14V9M7 14V6M11 14V10M15 14V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    billing:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h14" stroke="currentColor" strokeWidth="1.5"/></svg>,
    settings:    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.1 4.1l1.4 1.4M12.5 12.5l1.4 1.4M4.1 13.9l1.4-1.4M12.5 5.5l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    upgrade:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l2 5h5l-4 3 1.5 5L9 12l-4.5 3L6 10 2 7h5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
    credits:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5v1m0 6v1M6.5 9a2.5 2.5 0 005 0 2.5 2.5 0 00-5 0z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    support:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 10.5v.5M9 7a2 2 0 011.5 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    invite:      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M1 16c0-3.3 2.7-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 11v6M10 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    company:     <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M6 6V4a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    logout:      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 16H3a1 1 0 01-1-1V3a1 1 0 011-1h4M12 13l4-4-4-4M16 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    home:        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 9L10 2l8 7v8a1 1 0 01-1 1H3a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 20v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    search:      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 left-0 h-[100dvh] w-68 bg-white border-r flex flex-col z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ width: 260 }}
      >
        {/* PROFILE HEADER */}
        <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #f3f4f8" }}>
          <Link href="/profile/edit" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#4338ca,#7c3aed,#ec4899)",
                  padding: 2,
                  flexShrink: 0,
                }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#4338ca", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>
                    {displayName?.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29" }}>{displayName}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>@{username}</div>
                <div style={{ fontSize: 11, color: "#d97706", fontWeight: 600, marginTop: 2 }}>
                  ⭐ {credits} credits
                </div>
              </div>
            </div>
          </Link>

          {/* Followers / Following */}
          {username && (
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
              <Link href={`/u/${username}/followers`} style={{ textDecoration: "none", textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f0c29" }}>{followers}</div>
                <div style={{ fontSize: 10, color: "#9ca3af" }}>Followers</div>
              </Link>
              <div style={{ width: 1, height: 24, background: "#f3f4f8" }} />
              <Link href={`/u/${username}/following`} style={{ textDecoration: "none", textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f0c29" }}>{following}</div>
                <div style={{ fontSize: 10, color: "#9ca3af" }}>Following</div>
              </Link>
            </div>
          )}

          <Link
            href={isCompanyWorkspace ? `/c/${username}` : `/u/${username}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              fontWeight: 600,
              color: "#4338ca",
              textDecoration: "none",
              background: "#eef2ff",
              padding: "5px 12px",
              borderRadius: 20,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4.5" r="2" stroke="#4338ca" strokeWidth="1.2"/><path d="M1 11c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#4338ca" strokeWidth="1.2" strokeLinecap="round"/></svg>
            View Profile
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav style={{ padding: "12px 12px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
          {isCompanyWorkspace ? (
            <>
              <NavItem href="/dashboard/company"          icon={icons.company}     label="Company Commitments" />
              <NavItem href="/dashboard/company/insights" icon={icons.insights}    label="Insights" />
              <NavItem href="/dashboard/company/invite"   icon={icons.invite}      label="Invite Members" />
              <NavItem href="/dashboard/company/settings" icon={icons.settings}    label="Company Settings" />
            </>
          ) : (
            <>
              <NavItem href="/dashboard/my"       icon={icons.commitments} label="My Commitments" />
              <NavItem href="/dashboard/insights" icon={icons.insights}    label="Insights" />
              <NavItem href="/billing"            icon={icons.billing}     label="Billing" />
              <NavItem href="/account"            icon={icons.settings}    label="Account Settings" />
            </>
          )}
          <NavItem href="/upgrade"          icon={icons.upgrade} label="Upgrade" />
          <NavItem href="/upgrade"          icon={icons.credits} label="Buy Credits" />
          <NavItem href="/dashboard/support" icon={icons.support} label="Support" />
        </nav>

        {/* LOGOUT */}
        <div style={{ padding: "12px 12px 24px" }}>
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 12,
              border: "none",
              background: "#fff5f5",
              color: "#dc2626",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              width: "100%",
              fontFamily: "inherit",
            }}
          >
            <span style={{ color: "#dc2626", display: "flex" }}>{icons.logout}</span>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col pb-24">

        {/* MOBILE HEADER */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 4 }}
          >
            <span style={{ display: "block", width: 18, height: 2, background: "#374151", borderRadius: 2 }} />
            <span style={{ display: "block", width: 18, height: 2, background: "#374151", borderRadius: 2 }} />
            <span style={{ display: "block", width: 18, height: 2, background: "#374151", borderRadius: 2 }} />
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={28} height={28} />
            <span style={{ fontWeight: 800, color: "#4338ca", fontSize: 16 }}>Stated</span>
          </Link>

          <NotificationBell />
        </div>

        {/* DESKTOP HEADER */}
        <div className="hidden md:flex justify-between items-center bg-white border-b px-8 py-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={32} height={32} />
            <span style={{ fontWeight: 800, color: "#4338ca", fontSize: 18 }}>Stated</span>
          </Link>
          <NotificationBell />
        </div>

        {/* PAGE CONTENT */}
        <div className="px-6 py-8 max-w-4xl mx-auto w-full">
          {children}
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div
          className="fixed bottom-0 left-0 right-0 bg-white md:hidden"
          style={{ borderTop: "1px solid #ebebf2" }}
        >
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "8px 24px 14px" }}>
            <Link href={homeLink} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textDecoration: "none", color: pathname === homeLink ? "#4338ca" : "#9ca3af" }}>
              {icons.home}
              <span style={{ fontSize: 9, fontWeight: 600 }}>Home</span>
            </Link>
            <Link href="/search" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textDecoration: "none", color: pathname === "/search" ? "#4338ca" : "#9ca3af" }}>
              {icons.search}
              <span style={{ fontSize: 9, fontWeight: 500 }}>Search</span>
            </Link>
            <Link
              href={createLink}
              style={{
                background: "linear-gradient(135deg,#4338ca,#6366f1)",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: 22,
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 5,
                textDecoration: "none",
                boxShadow: "0 3px 10px rgba(67,56,202,0.3)",
              }}
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
