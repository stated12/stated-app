import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

function normalizeProfile(profileData: any) {
  if (!profileData) return null;
  if (Array.isArray(profileData)) return profileData[0] ?? null;
  return profileData;
}

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If logged in → show dashboard button
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Link
          href="/dashboard"
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  // Recent commitments
  const { data: recent } = await supabase
    .from("commitments")
    .select(`
      id,
      text,
      status,
      created_at,
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
    <div className="min-h-screen text-white relative">

      {/* Background */}
      <Image
        src="/nature-bg.jpg"
        alt="background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay (click-safe) */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4">

          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-semibold">
              Stated
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/explore">Explore</Link>
            <Link href="/login">Login</Link>
            <Link
              href="/signup"
              className="bg-blue-600 px-4 py-2 rounded-lg"
            >
              Get Started
            </Link>
          </div>

        </header>

        {/* Hero */}
        <section className="text-center py-20 px-4">

          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />

          <h1 className="text-5xl font-bold mb-4">
            Stated
          </h1>

          <p className="text-lg text-gray-200 mb-8">
            Public commitments. Public outcomes.
          </p>

          <Link
            href="/signup"
            className="inline-block bg-blue-600 px-8 py-4 rounded-lg text-lg font-semibold"
          >
            Get 2 Free Credits – Start Now
          </Link>

          <p className="text-sm text-gray-300 mt-3">
            No credit card required
          </p>

        </section>

        {/* Recent Commitments */}
        <section className="max-w-4xl mx-auto px-4 pb-16">

          <h2 className="text-xl font-semibold mb-6">
            Recent Commitments
          </h2>

          <div className="space-y-4">

            {recent?.map((c) => {
              const profile = normalizeProfile(c.profiles);

              const avatar =
                profile?.avatar_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile?.display_name || profile?.username || "User"
                )}&background=2563eb&color=fff`;

              return (
                <Link
                  key={c.id}
                  href={`/commitment/${c.id}`}
                  className="block bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition"
                >

                  <div className="flex items-center gap-3">

                    <Image
                      src={avatar}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />

                    <div>
                      <div className="font-semibold">
                        {profile?.display_name || profile?.username}
                      </div>
                      <div className="text-sm text-gray-300">
                        {c.text}
                      </div>
                    </div>

                  </div>

                </Link>
              );
            })}

            {!recent?.length && (
              <div className="text-gray-300">
                No public commitments yet.
              </div>
            )}

          </div>

        </section>

      </div>
    </div>
  );
}
