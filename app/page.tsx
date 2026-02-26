import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("commitments")
    .select(`
      id,
      text,
      status,
      views,
      created_at,
      user_id,
      company_id,
      profiles:user_id (
        username,
        display_name,
        avatar_url
      ),
      companies:company_id (
        username,
        name,
        logo_url
      )
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  const commitments =
    data?.map((c: any) => {
      if (c.company_id && c.companies) {
        return {
          id: c.id,
          text: c.text,
          status: c.status,
          views: c.views ?? 0,
          username: c.companies.username,
          display_name: c.companies.name,
          avatar: c.companies.logo_url,
          type: "company",
        };
      }

      return {
        id: c.id,
        text: c.text,
        status: c.status,
        views: c.views ?? 0,
        username: c.profiles?.username,
        display_name: c.profiles?.display_name,
        avatar: c.profiles?.avatar_url,
        type: "user",
      };
    }) || [];

  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-20 flex justify-center gap-16 py-6 text-white text-sm font-medium tracking-wide">
        <Link href="/search" className="hover:text-blue-400 transition">
          Explore
        </Link>
        <Link href="/login" className="hover:text-blue-400 transition">
          Login
        </Link>
      </header>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center text-white px-6 pt-32 pb-28">

        <Image
          src="/nature-bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover -z-10"
        />

        <div className="absolute inset-0 bg-black/70 -z-10" />

        <Image
          src="/logo.png"
          alt="Stated Logo"
          width={220}
          height={220}
          className="mb-6"
        />

        <h2 className="text-4xl font-semibold text-blue-500 mb-6">
          Stated
        </h2>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Public commitments.
          <br />
          Public outcomes.
        </h1>

        <p className="mt-5 text-gray-300 max-w-xl">
          Build credibility. Show progress. Stay accountable.
        </p>

        <form
          action="/search"
          className="mt-8 flex w-full max-w-xl bg-white rounded-xl overflow-hidden shadow-lg"
        >
          <input
            type="text"
            name="q"
            placeholder="Search people, companies, commitments"
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
          Get 2 Free Credits – Start Now
        </Link>

        <p className="mt-3 text-sm text-gray-300">
          No credit card required
        </p>
      </section>

      {/* RECENT COMMITMENTS */}
      <section className="bg-white text-black py-16 px-6">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-2xl font-semibold mb-10 text-center">
            Recent Active Commitments
          </h2>

          {commitments.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {commitments.map((c: any) => {

                const avatar =
                  c.avatar?.trim()
                    ? c.avatar
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        c.display_name || "User"
                      )}&background=2563eb&color=fff`;

                const profileLink =
                  c.type === "company"
                    ? `/c/${c.username}`
                    : `/u/${c.username}`;

                return (
                  <Link
                    key={c.id}
                    href={profileLink}
                    className="block bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition"
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
                          {c.display_name}
                          {c.type === "company" && (
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                              COMPANY
                            </span>
                          )}
                        </div>

                        <div className="text-gray-800 mb-2">
                          {c.text}
                        </div>

                        <div className="text-xs text-gray-500">
                          👁 {c.views} views
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

        </div>
      </section>

    </div>
  );
}
