import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const avatar =
    profile?.avatar_url?.trim()
      ? profile.avatar_url.trim()
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile?.display_name || profile?.username || "User"
        )}&background=2563eb&color=fff`;

  const isPro = !!profile?.plan_key;

  return (
    <div className="min-h-screen flex bg-gray-50">

      <aside className="w-64 bg-white border-r p-6 hidden md:flex flex-col">

        <div className="flex items-center gap-2 mb-8">
          <Image src="/logo.png" alt="Stated" width={32} height={32} />
          <span className="text-xl font-bold text-blue-600">Stated</span>
        </div>

        <Link href="/profile/edit" className="flex items-center gap-3 mb-6">
          <Image
            src={avatar}
            alt="avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <div className="font-medium">
              {profile?.display_name || profile?.username}
            </div>
            {isPro && (
              <div className="text-xs text-blue-600 font-medium">PRO</div>
            )}
          </div>
        </Link>

        <nav className="flex flex-col gap-3 text-sm">
          <Link href="/dashboard">Feed</Link>
          <Link href="/dashboard/my">My Commitments</Link>
          <Link href="/dashboard/insights">Insights</Link>
          <Link href="/billing">Billing</Link>
          <Link href="/account">Account Settings</Link>
          {!isPro && <Link href="/upgrade">Upgrade</Link>}
          <Link href="/logout">Logout</Link>
        </nav>

      </aside>

      <main className="flex-1 flex flex-col">

        <div className="bg-white border-b px-6 py-4">
          <input
            type="text"
            placeholder="Search people, companies or commitments"
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />
        </div>

        <div className="p-6">{children}</div>

      </main>

    </div>
  );
}
