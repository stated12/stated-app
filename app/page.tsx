import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: commitments } = await supabase
    .from("commitments")
    .select(
      `
      id,
      text,
      category,
      end_date,
      view_count,
      profiles (
        username,
        full_name,
        avatar_url,
        account_type
      )
    `
    )
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  const individuals =
    commitments?.filter(
      (c: any) => c.profiles?.account_type === "individual"
    ) || [];

  const companies =
    commitments?.filter(
      (c: any) => c.profiles?.account_type === "company"
    ) || [];

  return (
    <div className="relative min-h-screen text-white">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/nature-bg.jpg"
          className="w-full h-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navbar */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10" alt="logo" />
          <span className="text-2xl font-bold">Stated</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/explore" className="hover:text-gray-300">
            Explore
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-24">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Public commitments.
          <br />
          Real accountability.
        </h1>

        <p className="mt-6 text-lg text-gray-200">
          Track goals. Build credibility. Show progress — as an individual or a company.
        </p>

        <div className="mt-10">
          <form action="/search">
            <input
              name="q"
              placeholder="Search commitments, people, companies or goals"
              className="w-full max-w-2xl px-6 py-4 rounded-2xl text-black text-lg shadow-lg outline-none"
            />
          </form>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            Get Started
          </Link>

          <Link
            href="/explore"
            className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Explore Commitments
          </Link>
        </div>
      </section>

      {/* White Section */}
      <div className="bg-white text-black py-16 px-6 rounded-t-3xl">
        <div className="max-w-6xl mx-auto space-y-20">

          {individuals.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">
                🔥 Individual Commitments
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {individuals.slice(0, 3).map((c: any) => (
                  <Link
                    key={c.id}
                    href={`/u/${c.profiles.username}`}
                    className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition border"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        {c.profiles.avatar_url && (
                          <img
                            src={c.profiles.avatar_url}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">
                          {c.profiles.full_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{c.profiles.username}
                        </div>
                      </div>
                    </div>

                    <div className="font-medium mb-3">
                      {c.text}
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded-md">
                        {c.category}
                      </span>
                      <span>👁 {c.view_count ?? 0}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {companies.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">
                🏢 Company Commitments
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {companies.slice(0, 3).map((c: any) => (
                  <Link
                    key={c.id}
                    href={`/u/${c.profiles.username}`}
                    className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition border"
                  >
                    {/* Same card content */}
                    <div className="font-medium">{c.text}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
