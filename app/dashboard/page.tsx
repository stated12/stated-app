export const dynamic = "force-dynamic";

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CommitmentFeed from "@/components/CommitmentFeed";

export default async function DashboardPage() {

  const supabase = await createClient();

  let user = null;

  try {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    user = currentUser;

  } catch (e) {
    user = null;
  }

  return (

    <div className="min-h-screen flex flex-col bg-gray-50 pb-20">

      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-10">

        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Stated</span>
        </div>

        {!user ? (
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Sign up
          </Link>
        ) : (
          <Link
            href="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Create
          </Link>
        )}

      </header>

      {/* FEED */}
      <main className="flex-1 px-4 py-6">

        <CommitmentFeed
          endpoint="https://app.stated.in/api/feed"
          showFilters={false}
        />

      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-3">

        <Link href="/dashboard" className="text-xl">
          🏠
        </Link>

        <Link href="/search" className="text-xl">
          🔍
        </Link>

        <Link
          href="/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium"
        >
          + Create
        </Link>

      </nav>

    </div>
  );
}
