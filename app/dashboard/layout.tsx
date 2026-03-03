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
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    }

    load();
  }, [router]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!profile) return null;

  const avatar =
    profile.avatar_url?.trim()
      ? profile.avatar_url.trim()
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.display_name || profile.username
        )}&background=2563eb&color=fff`;

  const isPro = profile.plan_key === "pro";
  const isCompany = profile.account_type === "company";

  const linkClass = (href: string) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      pathname === href
        ? "bg-blue-100 text-blue-700"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const bottomActive = (href: string) =>
    pathname === href
      ? "text-blue-600"
      : "text-gray-500";

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
        className={`fixed md:static top-0 left-0 h-full w-72 bg-white border-r flex flex-col transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* HEADER */}
        <div className="px-6 pt-8 pb-6 border-b">

          <Link href="/" className="flex flex-col items-center gap-2 mb-6">
            <Image src="/logo.png" alt="Stated" width={48} height={48} />
            <span className="text-2xl font-bold text-blue-600 tracking-tight">
              Stated
            </span>
          </Link>

          <Link href="/profile/edit" className="flex items-center gap-3">
            <img
              src={avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900">
                {profile.display_name || profile.username}
              </div>
              <div className="text-xs text-gray-500">
                @{profile.username}
              </div>
              {isPro && (
                <div className="text-xs text-blue-600 font-medium mt-1">
                  PRO
                </div>
              )}
            </div>
          </Link>

          {!isCompany && (
            <Link
              href="/dashboard/create"
              className="block mt-6 bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 rounded-lg font-medium transition"
            >
              + Create Commitment
            </Link>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-6 py-6 space-y-2 overflow-y-auto">

          {!isCompany ? (
            <>
              <Link href="/dashboard" className={linkClass("/dashboard")}>
                Feed
              </Link>

              <Link href="/dashboard/my" className={linkClass("/dashboard/my")}>
                My Commitments
              </Link>

              <Link href="/dashboard/insights" className={linkClass("/dashboard/insights")}>
                Insights
              </Link>

              <Link href="/billing" className={linkClass("/billing")}>
                Billing
              </Link>

              <Link href="/account" className={linkClass("/account")}>
                Account Settings
              </Link>

              <Link href="/dashboard/support" className={linkClass("/dashboard/support")}>
                Support
              </Link>

              {!isPro && (
                <Link href="/upgrade" className={linkClass("/upgrade")}>
                  Upgrade
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/dashboard/company" className={linkClass("/dashboard/company")}>
                Public Page
              </Link>

              <Link href="/dashboard/company/insights" className={linkClass("/dashboard/company/insights")}>
                Analytics
              </Link>

              <Link href="/dashboard/company/settings" className={linkClass("/dashboard/company/settings")}>
                Settings
              </Link>

              <Link href="/dashboard/company/invite" className={linkClass("/dashboard/company/invite")}>
                Invite Members
              </Link>
            </>
          )}

        </nav>

        {/* LOGOUT */}
        <div className="px-6 pb-6 border-t">
          <Link
            href="/logout"
            className="block mt-4 text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </Link>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col pb-20 md:pb-0">

        {/* DESKTOP TOP BAR */}
        <div className="hidden md:flex justify-end items-center bg-white border-b px-8 py-4">
          <NotificationBell />
        </div>

        {/* MOBILE TOP BAR */}
        <div className="bg-white border-b px-4 py-4 flex items-center justify-between md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-xl font-bold"
          >
            ☰
          </button>

          <Link href="/">
            <Image src="/logo.png" alt="Stated" width={36} height={36} />
          </Link>

          <NotificationBell />
        </div>

        {/* CONTENT */}
        <div className="px-6 py-8 max-w-4xl mx-auto w-full">
          {children}
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden flex justify-around items-center py-3 z-50">

          <Link href="/dashboard" className={`flex flex-col items-center text-xs ${bottomActive("/dashboard")}`}>
            <span className="text-lg">🏠</span>
            Home
          </Link>

          <Link href="/dashboard/search" className={`flex flex-col items-center text-xs ${bottomActive("/dashboard/search")}`}>
            <span className="text-lg">🔍</span>
            Search
          </Link>

          <Link
            href="/dashboard/create"
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow"
          >
            + Create
          </Link>

        </div>

      </main>
    </div>
  );
}
