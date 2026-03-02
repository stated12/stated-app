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

  // Auto close sidebar on route change
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
    `px-2 py-1 rounded transition ${
      pathname === href
        ? "bg-blue-50 text-blue-600 font-medium"
        : "text-gray-700 hover:bg-gray-100"
    }`;

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
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r p-6 flex flex-col transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <Image src="/logo.png" alt="Stated" width={32} height={32} />
          <span className="text-xl font-bold text-blue-600">Stated</span>
        </div>

        {/* PROFILE (avatar now uses <img>) */}
        <Link href="/profile/edit" className="flex items-center gap-3 mb-6">
          <img
            src={avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
          />
          <div>
            <div className="font-medium">
              {profile.display_name || profile.username}
            </div>
            {isPro && (
              <div className="text-xs text-blue-600 font-medium">
                PRO
              </div>
            )}
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2 text-sm">

          {isCompany ? (
            <>
              <Link href="/dashboard/company" className={linkClass("/dashboard/company")}>
                Public Page
              </Link>

              <Link href="/dashboard/company/insights" className={linkClass("/dashboard/company/insights")}>
                Company Analytics
              </Link>

              <Link href="/dashboard/company/settings" className={linkClass("/dashboard/company/settings")}>
                Company Settings
              </Link>

              <Link href="/dashboard/company/invite" className={linkClass("/dashboard/company/invite")}>
                Invite Members
              </Link>
            </>
          ) : (
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
          )}

          <Link href="/logout" className="mt-4 text-red-500 hover:text-red-600">
            Logout
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col w-full">

        {/* DESKTOP TOP BAR */}
        <div className="hidden md:flex justify-end items-center bg-white border-b px-6 py-4">
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

          <Image src="/logo.png" alt="Stated" width={28} height={28} />

          <NotificationBell />
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </main>
    </div>
  );
}
