import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: commitments } = await supabase
    .from("commitments")
    .select(`
      id,
      text,
      profiles (
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="relative min-h-screen text-white">

      {/* Background */}
      <Image
        src="/nature-bg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      {/* HERO */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24">

        <Image src="/logo.png" alt="Stated Logo" width={120} height={120} />

        <h1 className="text-4xl md:text-5xl font-bold mt-6">
          Public commitments.
          <br />
          Public outcomes.
        </h1>

        <p className="mt-4 text-gray-300 max-w-xl">
          Build credibility. Show progress. Stay accountable.
        </p>

        {/* SEARCH */}
        <form
          action="/search"
          className="mt-8 flex w-full max-w-xl bg-white rounded-xl overflow-hidden"
        >
          <input
            type="text"
            name="q"
            placeholder="Search people, companies, commitments or goals"
            className="flex-1 px-4 py-3 text-black outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 px-6 text-white font-medium"
          >
            Search
          </button>
        </form>

        {/* CTA */}
        <Link
          href="/signup"
          className="mt-8 bg-blue-600 px-8 py-4 rounded-xl text-lg font-medium"
        >
          Get 2 Free Credits – Start Now
        </Link>

        <p className="mt-3 text-sm text-gray-300">
          No credit card required
        </p>
      </div>

      {/* RECENT COMMITMENTS */}
      <div className="relative z-10 mt-24 bg-white text-black py-16 px-6">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-2xl font-semibold mb-8 text-center">
            Recent Commitments
          </h2>

          {commitments && commitments.length > 0 ? (
            <div className="space-y-6">
              {commitments.map((c: any) => (
                <Link
                  key={c.id}
                  href={`/u/${c.profiles?.username}`}
                  className="block p-6 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                >
                  <div className="font-semibold">
                    {c.profiles?.display_name}
                  </div>
                  <div className="text-gray-700 mt-1">
                    {c.text}
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
