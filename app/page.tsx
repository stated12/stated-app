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
    `
    )
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(12);

  const individuals =
    commitments?.filter(
      (c: any) => c.profiles?.account_type === "individual"
    ) || [];

  const companies =
    commitments?.filter(
      (c: any) => c.profiles?.account_type === "company"
    ) || [];

  function daysRemaining(end: string) {
    const diff =
      new Date(end).getTime() - new Date().getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  }

  return (
    <div className="min-h-screen">

      {/* HERO WITH BACKGROUND */}
      <div className="relative h-[80vh] flex flex-col text-white">

        <Image
          src="/nature-bg.jpg"
          alt="background"
          fill
          priority
          className="object-cover -z-10"
        />

        <div className="absolute inset-0 bg-black/60 -z-10" />

        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-8 py-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <span className="text-2xl font-bold tracking-tight">
              Stated
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/search">Explore</Link>
            <Link href="/login">Login</Link>
            <Link
              href="/signup"
              className="bg-blue-600 px-5 py-2 rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Public commitments.
            <br />
            Real accountability.
          </h1>

          <p className="text-lg text-gray-200 mb-10 max-w-2xl">
            Track goals. Build credibility. Show progress —
            as an individual or a company.
          </p>

          {/* SEARCH BAR */}
          <form action="/search" className="w-full max-w-2xl">
            <input
              name="q"
              placeholder="Search commitments, people, companies or goals"
              className="w-full px-6 py-4 rounded-2xl text-black text-lg shadow-xl outline-none"
            />
          </form>

          <div className="mt-10 flex gap-4">
            <Link
              href="/signup"
              className="bg-blue-600 px-8 py-3 rounded-xl font-semibold"
            >
              Get Started
            </Link>

            <Link
              href="/search"
              className="border border-white px-8 py-3 rounded-xl"
            >
              Explore Commitments
            </Link>
          </div>
        </div>
      </div>

      {/* WHITE CONTENT SECTION */}
      <div className="bg-white text-black rounded-t-3xl pt-16 pb-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* INDIVIDUALS */}
          {individuals.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-8">
                🔥 Individual Commitments
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {individuals.slice(0, 3).map((c: any) => (
                  <Link
                    key={c.id}
                    href={`/u/${c.profiles?.username}`}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                  >
                    <div className="flex items-center gap-4 mb-4">
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
                      <div>
                        <div className="font-semibold">
                          {c.profiles?.display_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          @{c.profiles?.username}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 text-gray-800 font-medium">
                      {c.text}
                    </div>

                    <div className="text-sm text-gray-500 flex justify-between">
                      <span>👁 {c.view_count ?? 0}</span>
                      <span>
                        {c.end_date
                          ? `${daysRemaining(c.end_date)} days left`
                          : ""}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* COMPANIES */}
          {companies.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-8">
                🏢 Company Commitments
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companies.slice(0, 3).map((c: any) => (
                  <Link
                    key={c.id}
                    href={`/u/${c.profiles?.username}`}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={
                          c.profiles?.avatar_url ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            c.profiles?.display_name || "Company"
                          )}`
                        }
                        alt="avatar"
                        width={45}
                        height={45}
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

                    <div className="mb-4 text-gray-800 font-medium">
                      {c.text}
                    </div>

                    <div className="text-sm text-gray-500 flex justify-between">
                      <span>👁 {c.view_count ?? 0}</span>
                      <span>
                        {c.end_date
                          ? `${daysRemaining(c.end_date)} days left`
                          : ""}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
