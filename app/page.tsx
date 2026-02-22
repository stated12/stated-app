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
      view_count,
      profiles (
        username,
        display_name,
        avatar_url
      )
    `
    )
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen flex flex-col">

      {/* HERO */}
      <div className="relative min-h-screen flex flex-col text-white">

        <Image
          src="/nature-bg.jpg"
          alt="background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        {/* HEADER (ONLY LINKS) */}
        <nav className="relative z-10 flex justify-end items-center px-6 py-6 gap-8 text-sm">
          <Link href="/search" className="hover:opacity-80">
            Explore
          </Link>
          <Link href="/login" className="hover:opacity-80">
            Login
          </Link>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">

          {/* CENTERED LOGO + NAME */}
          <div className="flex flex-col items-center mb-6">
            <Image src="/logo.png" alt="logo" width={60} height={60} />
            <h2 className="text-2xl font-semibold mt-3">Stated</h2>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Public commitments. Public outcomes.
          </h1>

          <p className="text-gray-300 mb-8 max-w-xl">
            Build credibility. Show progress. Stay accountable.
          </p>

          {/* SEARCH BAR */}
          <form
            action="/search"
            className="flex w-full max-w-xl shadow-lg rounded-xl overflow-hidden mb-8"
          >
            <input
              type="text"
              name="q"
              placeholder="Search people, companies, commitments or goals"
              className="flex-1 px-4 py-3 text-black bg-white placeholder-gray-500 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {/* SINGLE CTA ONLY */}
          <Link
            href="/signup"
            className="bg-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
          >
            Get 2 Free Credits – Start Now
          </Link>

          <p className="mt-3 text-gray-300 text-sm">
            No credit card required
          </p>

        </div>
      </div>

      {/* RECENT COMMITMENTS */}
      <div className="bg-white text-black py-16 px-6">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-2xl font-semibold mb-8 text-center">
            Recent Commitments
          </h2>

          {commitments && commitments.length > 0 ? (
            <div className="space-y-6">
              {commitments.map((c: any) => (
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

                    <div className="text-sm text-gray-500">
                      👁 {c.view_count ?? 0}
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No public commitments yet.
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
