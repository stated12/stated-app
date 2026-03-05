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
"flex items-center gap-3 px-4 py-3 rounded-lg text-[16px] font-semibold transition ${ pathname === href ? "bg-blue-100 text-blue-700" : "text-gray-800 hover:bg-gray-100" }";

const bottomActive = (href: string) =>
pathname === href ? "text-blue-600" : "text-gray-500";

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
    className={`fixed md:static top-0 left-0 h-[100dvh] w-72 bg-white border-r flex flex-col overflow-y-auto transition-transform duration-300 z-50
    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
  >

    {/* PROFILE */}
    <div className="px-6 pt-8 pb-5 border-b">

      <Link href="/profile/edit" className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-600 text-white flex items-center justify-center font-semibold">

          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt="avatar"
              width={48}
              height={48}
            />
          ) : (
            <span>
              {profile.display_name?.charAt(0) ||
                profile.username?.charAt(0)}
            </span>
          )}

        </div>

        <div>
          <div className="font-semibold text-gray-900">
            {profile.display_name || profile.username}
          </div>

          <div className="text-xs text-gray-500">
            @{profile.username}
          </div>
        </div>

      </Link>

      <Link
        href={`/u/${profile.username}`}
        className="block mt-3 text-xs text-blue-600 hover:underline"
      >
        View Profile
      </Link>

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
    <div className="px-4 py-6 border-t">

      <button
        onClick={async () => {
          const supabase = createClient();
          await supabase.auth.signOut();
          router.push("/");
        }}
        className="w-full text-left px-4 py-3 text-[16px] font-semibold text-red-600 hover:bg-red-50 rounded-lg"
      >
        🚪 Logout
      </button>

    </div>

  </aside>

  {/* MAIN */}
  <main className="flex-1 flex flex-col pb-24">

    {/* MOBILE HEADER */}
    <div className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">

      <button onClick={() => setOpen(!open)}>
        ☰
      </button>

      <Link href="/dashboard" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Stated"
          width={48}
          height={48}
        />
        <span className="font-bold text-blue-600 text-xl tracking-tight">
          Stated
        </span>
      </Link>

      <NotificationBell />

    </div>

    {/* DESKTOP HEADER */}
    <div className="hidden md:flex justify-between items-center bg-white border-b px-8 py-4">

      <Link href="/dashboard" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Stated"
          width={50}
          height={50}
        />
        <span className="font-bold text-blue-600 text-xl tracking-tight">
          Stated
        </span>
      </Link>

      <NotificationBell />

    </div>

    {/* CONTENT */}
    <div className="px-6 py-8 max-w-4xl mx-auto w-full">
      {children}
    </div>

    {/* MOBILE BOTTOM NAV */}
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden flex justify-around items-center py-3 z-50">

      <Link
        href="/dashboard"
        className={`flex flex-col items-center text-xs ${bottomActive("/dashboard")}`}
      >
        <span className="text-lg">🏠</span>
        Home
      </Link>

      <Link
        href="/dashboard/search"
        className={`flex flex-col items-center text-xs ${bottomActive("/dashboard/search")}`}
      >
        <span className="text-lg">🔍</span>
        Search
      </Link>

      <Link
        href="/dashboard/create"
        className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow"
      >
        + Create
      </Link>

    </div>

  </main>

</div>

);
}
