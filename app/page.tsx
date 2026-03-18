export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";

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
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition"
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
          className="object-cover -z-10 hidden md:block"
        />

        <Image
          src="/hero-mobile.png"
          alt="Background"
          fill
          priority
          className="object-cover -z-10 md:hidden"
        />

        <Image
          src="/logo.png"
          alt="Stated Logo"
          width={180}
          height={180}
          className="mb-6"
        />

        <h2 className="text-4xl font-semibold text-blue-400 tracking-wide mb-6">
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
          className="mt-10 bg-blue-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl"
        >
          Start with 5 Free Commitments
        </Link>

        <p className="mt-3 text-sm text-green-300">
          ✓ No signup needed to browse or share
        </p>

        <p className="mt-2 text-sm text-gray-300">
          2 updates per commitment • Public profile included
        </p>

      </section>

      {/* RECENT COMMITMENTS (MOVED UP) */}
      <section className="bg-white text-black py-24 px-6">

        <div className="max-w-5xl mx-auto">

          <p className="text-center text-gray-500 mb-3 text-sm">
            People on record, right now
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
            Commitments from people & companies
          </h2>

          {commitments.length > 0 ? (

            <div className="grid md:grid-cols-2 gap-6">

              {commitments.map((c: any) => {

                let avatar = c.identity?.avatar_url;

                if (
                  !avatar ||
                  avatar === "" ||
                  avatar.includes("undefined") ||
                  avatar.includes("avatar") ||
                  !avatar.startsWith("http")
                ) {
                  avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    c.identity?.display_name || "User"
                  )}&background=2563eb&color=fff`;
                }

                const isUpdate = c.type === "update";

                const link =
                  isUpdate && c.parent_commitment_id
                    ? `/commitment/${c.parent_commitment_id}`
                    : `/commitment/${c.id}`;

                return (

                  <Link
                    key={c.id}
                    href={link}
                    className={`block rounded-2xl p-6 transition duration-200 hover:-translate-y-[2px] ${
                      isUpdate
                        ? "bg-white border border-gray-200 shadow-sm hover:shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                    }`}
                  >

                    {isUpdate && (
                      <div className="text-xs text-blue-600 mb-2">
                        🔄 Update
                      </div>
                    )}

                    <div className="flex items-start gap-4">

                      <Image
                        src={avatar}
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />

                      <div className="flex-1">

                        <div className="flex items-center gap-2 font-semibold text-gray-900 mb-1">

                          {c.identity?.display_name}

                          {c.identity?.type === "company" && (
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                              COMPANY
                            </span>
                          )}

                        </div>

                        {isUpdate && (
                          <div className="text-xs text-gray-500 mb-1">
                            updated a commitment
                          </div>
                        )}

                        <div className="text-gray-800 mb-3 leading-relaxed">
                          {c.text}
                        </div>

                        <div className="text-xs text-gray-500 flex gap-4">
                          <span>👁 {c.views ?? 0}</span>

                          {!isUpdate && (
                            <span>🔁 {c.shares ?? 0}</span>
                          )}

                        </div>

                      </div>

                    </div>

                  </Link>

                );

              })}

            </div>

          ) : (

            <div className="text-center text-gray-500">
              No commitments yet.
            </div>

          )}

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

      {/* WHY STATED WORKS */}
      <section className="bg-gray-50 py-28 px-6">
        <div className="max-w-5xl mx-auto">

          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-3">
            Why Stated Works
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
            Most platforms reward{" "}
            <span className="italic text-orange-500">performance.</span>
            <br />
            We reward follow-through.
          </h2>

          <p className="text-gray-500 max-w-xl mb-12">
            You can post about your goals anywhere. But nowhere does your word
            actually live on the line — until stated.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">📌</div>
              <h3 className="font-semibold text-gray-900 mb-2">Your word, on record</h3>
              <p className="text-sm text-gray-500">
                A commitment on Stated isn't a tweet. It's timestamped, public,
                and attached to your name with a deadline.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-semibold text-gray-900 mb-2">Real audience, real pressure</h3>
              <p className="text-sm text-gray-500">
                Social accountability is the oldest productivity hack — now built in.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Credibility compounds</h3>
              <p className="text-sm text-gray-500">
                Every commitment builds a public track record of follow-through.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gray-950 text-white py-32 px-6 text-center">
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
            Stop saving goals for private notes. Say it where it counts.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">

            <Link
              href="/signup"
              className="bg-blue-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl"
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
