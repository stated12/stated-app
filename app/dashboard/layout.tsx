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

      /* PROFILE */

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      /* COMPANY MEMBERSHIP */

      const { data: membership } = await supabase
        .from("company_members")
        .select("company_id")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (membership) {

        const { data: companyData } = await supabase
          .from("companies")
          .select("*")
          .eq("id", membership.company_id)
          .single();

        setCompany(companyData);

      }

    }

    load();

  }, [router]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!profile) return null;

  const isCompany = !!company;

  const PRO_PLANS = [
    "ind_499",
    "ind_899",
    "ind_1299",
    "comp_1999",
    "comp_2999",
    "comp_4999",
  ];

  const isPro = PRO_PLANS.includes(profile.plan_key);

  const createLink = isCompany
    ? "/dashboard/company/new"
    : "/dashboard/create";

  const linkClass = (href: string) => {
    return `flex items-center gap-3 px-5 py-3 rounded-lg text-[17px] font-bold transition ${
      pathname === href
        ? "bg-blue-100 text-blue-700"
        : "text-gray-900 hover:bg-gray-100"
    }`;
  };

  const avatar =
    isCompany
      ? company?.logo_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(company?.name)}`
      : profile?.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.username)}`;

  const displayName =
    isCompany
      ? company?.name
      : profile?.display_name || profile?.username;

  const username =
    isCompany
      ? company?.username
      : profile?.username;

  return (
    <div className="min-h-screen flex bg-gray-50">

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed md:static top-0 left-0 h-[100dvh] w-72 bg-white border-r flex flex-col overflow-y-auto transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >

        {/* PROFILE */}

        <div className="px-6 pt-8 pb-5 border-b">

          <div className="flex items-center gap-3">

            <img
              src={avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>

              <div className="flex items-center gap-2 font-semibold text-gray-900">

                {displayName}

                {isPro && (
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-[2px] rounded">
                    PRO
                  </span>
                )}

              </div>

              <div className="text-xs text-gray-500">
                @{username}
              </div>

            </div>

          </div>

          <Link
            href={
              isCompany
                ? `/c/${company.username}`
                : `/u/${profile.username}`
            }
            className="block mt-3 text-xs text-blue-600 hover:underline"
          >
            View Profile
          </Link>

        </div>

        {/* NAVIGATION */}

        <nav className="px-4 py-6 space-y-2">

          {isCompany && (
            <>
              <Link href="/dashboard/company" className={linkClass("/dashboard/company")}>
                📌 Company Commitments
              </Link>

              <Link href="/dashboard/company/insights" className={linkClass("/dashboard/company/insights")}>
                📊 Insights
              </Link>

              <Link href="/dashboard/company/invite" className={linkClass("/dashboard/company/invite")}>
                👥 Invite Members
              </Link>

              <Link href="/dashboard/company/settings" className={linkClass("/dashboard/company/settings")}>
                ⚙️ Account Settings
              </Link>

              <Link href="/upgrade" className={linkClass("/upgrade")}>
                🚀 Upgrade
              </Link>

              <Link href="/dashboard/support" className={linkClass("/dashboard/support")}>
                🛟 Support
              </Link>
            </>
          )}

          {!isCompany && (
            <>
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

              {!isPro && (
                <Link href="/upgrade" className={linkClass("/upgrade")}>
                  🚀 Upgrade
                </Link>
              )}

              {isPro && (
                <Link href="/upgrade" className={linkClass("/upgrade")}>
                  💳 Buy Credits
                </Link>
              )}

              <Link href="/dashboard/support" className={linkClass("/dashboard/support")}>
                🛟 Support
              </Link>
            </>
          )}

          <button
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              router.push("/");
            }}
            className="flex items-center gap-3 px-5 py-3 rounded-lg text-[17px] font-bold text-red-600 hover:bg-red-50 w-full text-left"
          >
            🚪 Logout
          </button>

        </nav>

      </aside>

      {/* MAIN */}

      <main className="flex-1 flex flex-col pb-24">

        {/* MOBILE HEADER */}

        <div className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">

          <button onClick={() => setOpen(!open)}>
            ☰
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Stated" width={48} height={48} />
            <span className="font-bold text-blue-600 text-xl">
              Stated
            </span>
          </Link>

          <NotificationBell />

        </div>

        {/* DESKTOP HEADER */}

        <div className="hidden md:flex justify-between items-center bg-white border-b px-8 py-4">

          <Link href="/dashboard" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Stated" width={50} height={50} />
            <span className="font-bold text-blue-600 text-xl">
              Stated
            </span>
          </Link>

          <NotificationBell />

        </div>

        <div className="px-6 py-8 max-w-4xl mx-auto w-full">
          {children}
        </div>

        {/* MOBILE BOTTOM NAV */}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden flex justify-around items-center py-3">

          <Link href="/dashboard">
            🏠
          </Link>

          <Link href="/dashboard/search">
            🔍
          </Link>

          <Link
            href={createLink}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
          >
            + Create
          </Link>

        </div>

      </main>

    </div>
  );
}
