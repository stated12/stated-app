export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import LiveFeed from "@/components/LiveFeed";

export default async function HomePage() {

  let feed: any[] = [];

  try {
    const res = await fetch(
      "https://app.stated.in/api/feed?type=latest",
      { cache: "no-store" }
    );

    if (res.ok) {
      feed = await res.json();
    }

  } catch (e) {
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

        <Image
          src="/hero-desktop.png"
          alt="Background"
          fill
          priority
          className="object-cover -z-20 hidden md:block"
        />

        <Image
          src="/hero-mobile.png"
          alt="Background"
          fill
          priority
          className="object-cover -z-20 md:hidden"
        />

        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 -z-10" />

        <Image
          src="/logo.png"
          alt="Stated Logo"
          width={140}
          height={140}
          className="mb-4"
        />

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
          className="mt-10 bg-blue-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl hover:shadow-2xl hover:scale-[1.02]"
        >
          Start with 5 Free Commitments
        </Link>

        {/* 🔥 STRONG TRUST LINE */}
        <div className="mt-5 bg-green-500/10 border border-green-400/30 px-4 py-2 rounded-full text-sm text-green-300 font-medium">
          ✓ No signup needed to browse or share
        </div>

        <p className="mt-2 text-sm text-gray-300">
          2 updates per commitment • Public profile included
        </p>

      </section>

      {/* LIVE FEED */}
      <section className="bg-white text-black py-28 px-6">

        <div className="max-w-5xl mx-auto">

          <p className="text-center text-gray-500 mb-3 text-sm flex justify-center items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live commitments happening now
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight">
            Commitments from people & companies
          </h2>

          <LiveFeed initialData={commitments} />

          <div className="text-center mt-12">

            <Link
              href="/explore"
              className="text-blue-600 hover:underline font-medium"
            >
              Explore commitments from people & companies →
            </Link>

          </div>

        </div>

      </section>

      {/* WHY STATED */}
      <section className="bg-gray-50 py-32 px-6">
        <div className="max-w-5xl mx-auto">

          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-3">
            Why Stated Works
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Most platforms reward{" "}
            <span className="italic text-orange-500">performance.</span>
            <br />
            We reward follow-through.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">📌</div>
              <h3 className="font-semibold text-gray-900 mb-2">Your word, on record</h3>
              <p className="text-sm text-gray-500">
                Public, timestamped, tied to your name.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-semibold text-gray-900 mb-2">Real audience</h3>
              <p className="text-sm text-gray-500">
                Social pressure that actually works.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Credibility compounds</h3>
              <p className="text-sm text-gray-500">
                A public track record of follow-through.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gray-950 text-white py-36 px-6 text-center">
        <div className="max-w-2xl mx-auto">

          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4">
            Your Turn
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Put your word
            <br />
            on the <span className="italic text-orange-400">line.</span>
          </h2>

          <p className="text-gray-400 mb-10">
            Say it where it counts.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">

            <Link
              href="/signup"
              className="bg-blue-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl hover:shadow-2xl hover:scale-[1.02]"
            >
              Commit publicly →
            </Link>

            <Link
              href="/explore"
              className="border border-gray-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:border-gray-400 transition"
            >
              Browse first
            </Link>

          </div>

          <p className="mt-6 text-sm text-gray-500">
            Free to start. No credit card.
          </p>

        </div>
      </section>

    </div>

  );
}
