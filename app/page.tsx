export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";

async function getCommitments() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/feed?type=latest`,
      { cache: "no-store" }
    );

    const data = await res.json();

    return data.slice(0, 6);
  } catch {
    return [];
  }
}

export default async function HomePage() {

  const commitments = await getCommitments();

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

      <section className="relative flex flex-col items-center justify-center text-center text-white px-6 pt-28 pb-24">

        <Image
          src="/nature-bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover -z-10"
        />

        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" />

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

        <h1 className="text-4xl md:text-5xl font-bold leading-snug">
          Public commitments.
          <br />
          Public outcomes.
        </h1>

        <p className="mt-5 text-gray-300 max-w-xl">
          Build credibility. Track progress. Stay accountable.
        </p>

        <form
          action="/search"
          method="GET"
          className="mt-8 flex w-full max-w-xl bg-white rounded-xl overflow-hidden shadow-lg"
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
          className="mt-8 bg-blue-600 px-10 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
        >
          Start with 2 Free Credits
        </Link>

        <p className="mt-3 text-sm text-gray-300">
          No credit card required
        </p>

      </section>

      {/* RECENT COMMITMENTS */}

      <section className="bg-white text-black py-16 px-6">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-2xl font-semibold mb-10 text-center">
            Recent Commitments
          </h2>

          {commitments.length > 0 ? (

            <div className="grid md:grid-cols-2 gap-6">

              {commitments.map((c: any) => {

                const avatar =
                  c.avatar_url?.trim()
                    ? c.avatar_url
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        c.display_name || c.username || "User"
                      )}&background=2563eb&color=fff`;

                const profileLink =
                  c.identity?.type === "company"
                    ? `/c/${c.identity.username}`
                    : `/u/${c.identity.username}`;

                return (

                  <Link
                    key={c.id}
                    href={`/commitment/${c.id}`}
                    className="block bg-gray-100 rounded-xl p-6 hover:bg-gray-200 hover:shadow-md transition"
                  >

                    <div className="flex items-start gap-4">

                      <Image
                        src={avatar}
                        alt="avatar"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />

                      <div className="flex-1">

                        <div className="flex items-center gap-2 font-semibold mb-1">

                          {c.display_name || c.username}

                          {c.identity?.type === "company" && (
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                              COMPANY
                            </span>
                          )}

                        </div>

                        <div className="text-gray-800 mb-2">
                          {c.text}
                        </div>

                        <div className="text-xs text-gray-500">
                          👁 {c.views || 0} views
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

          <div className="text-center mt-10">

            <Link
              href="/explore"
              className="text-blue-600 hover:underline font-medium"
            >
              Explore more commitments →
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}
