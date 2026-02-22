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

  const { data: people } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="min-h-screen text-white relative">

      {/* BACKGROUND IMAGE */}
      <Image
        src="/nature-bg.jpg"
        alt="background"
        fill
        priority
        className="object-cover"
      />

      {/* DARK OVERLAY — FIXED */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <header className="flex justify-between items-center px-6 py-4">

          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <span className="text-xl font-semibold">Stated</span>
          </div>

          <div className="flex items-center gap-4">
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

        {/* HERO */}
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

        </section>

        {/* RECENT COMMITMENTS */}
        <section className="max-w-4xl mx-auto px-4 pb-16">

          <h2 className="text-xl font-semibold mb-4">
            Recent Commitments
          </h2>

          <div className="space-y-3">

            {recent?.map((c) => {
              const profile = normalizeProfile(c.profiles);

              const avatar =
                profile?.avatar_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile?.display_name || profile?.username || "User"
                )}`;

              return (
                <div
                  key={c.id}
                  className="bg-white/10 backdrop-blur rounded-lg p-4 flex items-center gap-3"
                >
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
              );
            })}

          </div>

        </section>

        {/* FOOTER — SINGLE CLEAN VERSION */}
        <footer className="text-center text-gray-300 pb-10">

          <div className="space-x-6 text-sm">

            <a
              href="https://stated.in/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Privacy Policy
            </a>

            <a
              href="https://stated.in/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Terms of Service
            </a>

            <a
              href="https://stated.in/refund"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Refund Policy
            </a>

          </div>

          <div className="mt-3 text-sm">
            support@stated.in
          </div>

          <div className="mt-2 text-xs text-gray-400">
            © 2026 Stated
          </div>

        </footer>

      </div>
    </div>
  );
}
