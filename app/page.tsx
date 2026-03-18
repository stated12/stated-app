export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { getSafeAvatar } from "@/lib/avatar";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {

  const supabase = await createClient();

  let feed: any[] = [];

  try {

    const { data } = await supabase
      .from("commitments")
      .select(`
        id,
        text,
        created_at,
        user_id,
        company_id,
        shares
      `)
      .eq("status", "active")
      .eq("visibility", "public")
      .order("created_at", { ascending: false })
      .limit(6);

    feed = data || [];

  } catch (e) {
    feed = [];
  }

  // ✅ SAFE fallback
  if (!Array.isArray(feed)) {
    feed = [];
  }

  const commitments = feed.slice(0, 6);

  return (

    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-20 flex justify-center gap-8 py-6 text-white text-base font-semibold">
        <Link href="/explore" className="hover:text-blue-400 transition">
          Explore
        </Link>

        <Link href="/login" className="hover:text-blue-400 transition">
          Login
        </Link>

        <Link
          href="/signup"
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Sign up
        </Link>
      </header>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center text-white px-6 pt-36 pb-32 min-h-[90vh]">

        <Image src="/hero-desktop.png" alt="Background" fill priority className="object-cover -z-20 hidden md:block"/>
        <Image src="/hero-mobile.png" alt="Background" fill priority className="object-cover -z-20 md:hidden"/>

        <div className="absolute inset-0 bg-black/40 -z-10" />

        <Image src="/logo.png" alt="Stated Logo" width={140} height={140} className="mb-4"/>

        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Stated
        </h2>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Say it publicly.
          <br />
          Do it publicly.
        </h1>

        <p className="mt-6 text-gray-300 max-w-lg text-lg">
          Build credibility. Track progress. Stay accountable.
        </p>

        <form
          action="/search"
          method="GET"
          className="mt-8 flex w-full max-w-xl bg-white rounded-2xl overflow-hidden shadow-lg"
        >
          <input
            type="text"
            name="q"
            placeholder="Search commitments, people or companies"
            className="flex-1 px-4 py-3 text-black outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 px-6 text-white font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        <Link
          href="/signup"
          className="mt-10 bg-blue-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl hover:scale-[1.02]"
        >
          Start with 5 Free Commitments
        </Link>

        {/* TRUST LINE */}
        <div className="mt-5 bg-green-500/10 border border-green-400/30 px-4 py-2 rounded-full text-sm text-green-300 font-medium">
          ✓ No signup needed to browse or share
        </div>

        <p className="mt-2 text-sm text-gray-300">
          2 updates per commitment • Public profile included
        </p>

      </section>

      {/* FEED */}
      <section className="bg-white text-black py-28 px-6">

        <div className="max-w-5xl mx-auto">

          <p className="text-center text-gray-500 mb-3 text-sm">
            People on record, right now
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Commitments from people & companies
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {commitments.map((c) => {

              const identity = {}; // simplified safe fallback
              const avatar = getSafeAvatar(identity);

              return (
                <Link
                  key={c.id}
                  href={`/commitment/${c.id}`}
                  className="block rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition"
                >

                  <div className="flex items-start gap-4">

                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-1">

                      <div className="font-semibold text-gray-900 mb-1">
                        User
                      </div>

                      <div className="text-gray-800 mb-3">
                        {c?.text || ""}
                      </div>

                      <div className="text-xs text-gray-500">
                        👁 {c?.views ?? 0}
                      </div>

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/explore"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Explore commitments from people & companies
            </Link>
          </div>

        </div>

      </section>

      {/* WHY STATED WORKS */}
      <section className="bg-gray-50 py-28 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-sm font-semibold text-orange-500 uppercase mb-3">
            Why Stated Works
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Most platforms reward{" "}
            <span className="italic text-orange-500">performance.</span>
            <br />
            We reward follow-through.
          </h2>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gray-950 text-white py-36 px-6 text-center">

        <div className="max-w-2xl mx-auto">

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Put your word on the line.
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">

            <Link
              href="/signup"
              className="bg-blue-600 px-12 py-5 rounded-2xl text-lg font-semibold"
            >
              Commit publicly →
            </Link>

            <Link
              href="/explore"
              className="border border-gray-600 px-12 py-5 rounded-2xl text-lg font-semibold"
            >
              Browse first
            </Link>

          </div>

          <p className="mt-6 text-sm text-gray-400">
            Free to start. No credit card required.
          </p>

        </div>

      </section>

    </div>
  );
}
