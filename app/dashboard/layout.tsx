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

  const isPro = profile.plan_key === "pro";

  const linkClass = (href: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
      pathname === href
        ? "bg-blue-100 text-blue-700"
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
        className={`fixed md:static top-0 left-0 h-full w-72 bg-white border-r flex flex-col transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* PROFILE */}
        <div className="px-6 pt-8 pb-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {profile.display_name?.charAt(0) ||
                profile.username?.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {profile.display_name || profile.username}
              </div>
              <div className="text-xs text-gray-500">
                @{profile.username}
              </div>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          <Link href="/dashboard/my" className={linkClass("/dashboard/my")}>
            📌 My Commitments
          </Link>

          <Link href="/dashboard/insights" className={linkClass("/dashboard/insights")}>
            📊 Insights
          </Link>

          <Link href="/billing" className={linkClass("/billing")}>
            💳 Billing
          </Link>

          <Link href="/account" className={linkClass("/account")}>
            ⚙️ Account Settings
          </Link>

          <Link href="/dashboard/support" className={linkClass("/dashboard/support")}>
            🛟 Support
          </Link>

          {!isPro && (
            <Link href="/upgrade" className={linkClass("/upgrade")}>
              🚀 Upgrade
            </Link>
          )}

        </nav>

        {/* LOGOUT */}
        <div className="px-4 pb-6 border-t">
          <button
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              router.push("/");
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col pb-16">

        {/* MOBILE HEADER */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">

          <button onClick={() => setOpen(!open)}>
            ☰
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Stated"
              width={36}
              height={36}
            />
            <span className="font-bold text-blue-600 text-lg">
              Stated
            </span>
          </Link>

          <NotificationBell />
        </div>

        {/* DESKTOP HEADER */}
        <div className="hidden md:flex justify-between items-center bg-white border-b px-8 py-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Stated"
              width={40}
              height={40}
            />
            <span className="font-bold text-blue-600 text-xl">
              Stated
            </span>
          </Link>

          <NotificationBell />
        </div>

        {/* CONTENT */}
        <div className="px-6 py-8 max-w-4xl mx-auto w-full">
          {children}
        </div>

      </main>
    </div>
  );
}
