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

  // Individuals
  const { data: individualCommitments } = await supabase
    .from("commitments")
    .select(`
      id,
      text,
      status,
      created_at,
      end_date,
      view_count,
      profiles (
        username,
        display_name,
        avatar_url,
        account_type
      )
    `)
    .eq("visibility", "public")
    .eq("profiles.account_type", "individual")
    .order("created_at", { ascending: false })
    .limit(6);

  // Companies
  const { data: companyCommitments } = await supabase
    .from("commitments")
    .select(`
      id,
      text,
      status,
      created_at,
      end_date,
      view_count,
      profiles (
        username,
        display_name,
        avatar_url,
        account_type
      )
    `)
    .eq("visibility", "public")
    .eq("profiles.account_type", "company")
    .order("created_at", { ascending: false })
    .limit(6);

  function daysRemaining(end: string) {
    const diff =
      new Date(end).getTime() - new Date().getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">

        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <span className="text-xl font-semibold">Stated</span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/search">Explore</Link>
          <Link href="/login">Login</Link>
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>

      </nav>

      {/* HERO */}
      <section className="text-center py-16 px-4 max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">
          Public commitments. Real accountability.
        </h1>

        <p className="text-gray-600 mb-8">
          Track goals. Build credibility. Show progress —
          as an individual or a company.
        </p>

        <div className="flex gap-3 justify-center">

          <Link
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>

          <Link
            href="/search"
            className="border px-6 py-3 rounded-lg"
          >
            Explore Commitments
          </Link>

        </div>

      </section>

      {/* INDIVIDUAL SECTION */}
      <section className="max-w-6xl mx-auto px-4 pb-12">

        <h2 className="text-2xl font-semibold mb-6">
          🔥 Individual Commitments
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {individualCommitments?.map((c) => (

            <Link
              key={c.id}
              href={`/u/${c.profiles?.username}`}
              className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
            >

              <div className="flex items-center gap-3 mb-3">

                <Image
                  src={
                    c.profiles?.avatar_url ||
                    `https://ui-avatars.com/api/?name=${c.profiles?.display_name}`
                  }
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div>
                  <div className="font-semibold">
                    {c.profiles?.display_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    @{c.profiles?.username}
                  </div>
                </div>

              </div>

              <div className="mb-3 text-gray-800">
                {c.text}
              </div>

              <div className="text-xs text-gray-500 flex justify-between">
                <span>👁 {c.view_count ?? 0} views</span>
                <span>
                  {c.end_date && daysRemaining(c.end_date)} days left
                </span>
              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* COMPANY SECTION */}
      <section className="max-w-6xl mx-auto px-4 pb-16">

        <h2 className="text-2xl font-semibold mb-6">
          🏢 Company Commitments
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {companyCommitments?.map((c) => (

            <Link
              key={c.id}
              href={`/u/${c.profiles?.username}`}
              className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
            >

              <div className="flex items-center gap-3 mb-3">

                <Image
                  src={
                    c.profiles?.avatar_url ||
                    `https://ui-avatars.com/api/?name=${c.profiles?.display_name}`
                  }
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div>
                  <div className="font-semibold">
                    {c.profiles?.display_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Company
                  </div>
                </div>

              </div>

              <div className="mb-3 text-gray-800">
                {c.text}
              </div>

              <div className="text-xs text-gray-500 flex justify-between">
                <span>👁 {c.view_count ?? 0} views</span>
                <span>
                  {c.end_date && daysRemaining(c.end_date)} days left
                </span>
              </div>

            </Link>

          ))}

        </div>

      </section>

    </div>
  );
}
