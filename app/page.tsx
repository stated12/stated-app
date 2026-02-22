import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const { data: commitments } = await supabase
    .from("commitments")
    .select(
      `
      id,
      text,
      end_date,
      view_count,
      profiles (
        username,
        display_name,
        avatar_url
      )
    `
    )
    .eq("visibility", "public")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  function daysRemaining(end: string) {
    const diff =
      new Date(end).getTime() - new Date().getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  }

  return (
    <div className="min-h-screen text-white">

      {/* HERO */}
      <div className="relative min-h-[80vh] flex flex-col">

        <Image
          src="/nature-bg.jpg"
          alt="background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />

        {/* NAV */}
        <nav className="relative z-10 flex justify-between items-center px-6 py-5">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={36} height={36} />
            <span className="text-xl font-semibold">Stated</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/search">Explore</Link>
            <Link href="/login">Login</Link>
            <Link
              href="/signup"
              className="bg-blue-600 px-4 py-2 rounded-lg font-medium"
            >
              Get 2 Free Credits
            </Link>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Public commitments. Public outcomes.
          </h1>

          <p className="text-gray-300 mb-8">
            Build credibility. Show progress. Stay accountable.
          </p>

          {/* SEARCH */}
          <form
            action="/search"
            className="flex w-full max-w-xl"
          >
            <input
              name="q"
              placeholder="Search people, companies, commitments or goals"
              className="flex-1 px-4 py-3 rounded-l-xl text-black outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 px-5 py-3 rounded-r-xl"
            >
              Search
            </button>
          </form>

          <Link
            href="/signup"
            className="mt-8 bg-blue-600 px-8 py-4 rounded-xl font-semibold text-lg"
          >
            Get 2 Free Credits – Start Now
          </Link>

          <p className="mt-3 text-gray-300 text-sm">
            No credit card required
          </p>
        </div>
      </div>

      {/* RECENT COMMITMENTS */}
      <div className="bg-white text-black py-16 px-6 rounded-t-3xl">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-2xl font-semibold mb-8 text-center">
            Recent Commitments
          </h2>

          <div className="space-y-6">
            {commitments?.map((c: any) => (
              <Link
                key={c.id}
                href={`/u/${c.profiles?.username}`}
                className="block bg-gray-50 rounded-xl p-5 shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">

                  <Image
                    src={
                      c.profiles?.avatar_url ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        c.profiles?.display_name || "User"
                      )}`
                    }
                    alt="avatar"
                    width={45}
                    height={45}
                    className="rounded-full"
                  />

                  <div className="flex-1">
                    <div className="font-semibold">
                      {c.profiles?.display_name}
                    </div>
                    <div className="text-gray-700">
                      {c.text}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 text-right">
                    <div>👁 {c.view_count ?? 0}</div>
                    {c.end_date && (
                      <div>
                        {daysRemaining(c.end_date)} days left
                      </div>
                    )}
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
