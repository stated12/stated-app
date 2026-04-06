export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CommitmentFeed from "@/components/CommitmentFeed";

export const metadata: Metadata = {
  title: "Stated — Turn Commitments into Credibility",
  description:
    "Stated is the public accountability platform where individuals and companies post commitments, track progress, and build a verifiable reputation. Browse free — no signup required. First 5 commitments free.",
  metadataBase: new URL("https://app.stated.in"),
  openGraph: {
    title: "Stated — Turn Commitments into Credibility",
    description:
      "Post commitments publicly. Build credibility over time. Every promise you keep raises your reputation score. Free to browse — no signup needed.",
    url: "https://app.stated.in",
    siteName: "Stated",
    images: [
      {
        url: "/og-image.png",
        width: 1270,
        height: 760,
        alt: "Stated — Turn Commitments into Credibility",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stated — Turn Commitments into Credibility",
    description:
      "Post commitments publicly. Build credibility over time. Free to browse — no signup needed.",
    images: ["/og-image.png"],
  },
  keywords: [
    "public accountability",
    "commitments",
    "credibility",
    "follow-through",
    "reputation",
    "goal tracking",
    "public goals",
    "accountability platform",
  ],
  alternates: {
    canonical: "https://app.stated.in",
  },
};

export default async function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-20 flex justify-center gap-8 py-6 text-white text-base font-semibold">
        <Link href="/explore" className="hover:text-blue-400 transition">Explore</Link>
        <Link href="/login" className="hover:text-blue-400 transition">Login</Link>
        <Link href="/signup" className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md">Sign up</Link>
      </header>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center text-white px-6 pt-36 pb-32 min-h-[90vh]">
        <Image src="/hero-desktop.png" alt="Background" fill priority className="object-cover -z-20 hidden md:block"/>
        <Image src="/hero-mobile.png" alt="Background" fill priority className="object-cover -z-20 md:hidden"/>
        <div className="absolute inset-0 bg-black/40 -z-10" />
        <Image src="/logo.png" alt="Stated Logo" width={140} height={140} className="mb-4"/>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">Stated</h2>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Say it publicly.<br />Do it publicly.
        </h1>
        <p className="mt-6 text-gray-300 max-w-lg text-lg">Build credibility. Track progress. Stay accountable.</p>
        <form action="/search" method="GET" className="mt-8 flex w-full max-w-xl bg-white rounded-2xl overflow-hidden shadow-lg">
          <input type="text" name="q" placeholder="Search commitments, people or companies" className="flex-1 px-4 py-3 text-black outline-none"/>
          <button type="submit" className="bg-blue-600 px-6 text-white font-medium hover:bg-blue-700 transition">Search</button>
        </form>
        <Link href="/signup" className="mt-10 bg-blue-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl hover:scale-[1.02]">
          Start with 5 Free Commitments
        </Link>
        <div className="mt-5 bg-green-500/10 border border-green-400/30 px-4 py-2 rounded-full text-sm text-green-300 font-medium">
          No signup needed to browse or share
        </div>
        <p className="mt-2 text-sm text-gray-300">2 updates per commitment • Public profile included</p>
      </section>

      {/* FEED */}
      <section className="bg-white text-black py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-500 mb-3 text-sm">People on record, right now</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Commitments from people &amp; companies</h2>
          <CommitmentFeed endpoint="/api/feed?limit=6" showFilters={false} />
          <div className="text-center mt-10">
            <Link href="/explore" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md hover:scale-[1.02]">
              Explore all commitments
            </Link>
          </div>
        </div>
      </section>

      {/* WHY STATED WORKS */}
      <section className="bg-gray-50 py-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-3">Why Stated Works</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Most platforms reward{" "}<span className="italic text-orange-500">performance.</span><br />We reward follow-through.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📌</div>
              <h3 className="font-semibold mb-2">Your word, on record</h3>
              <p className="text-sm text-gray-500">Public, timestamped, tied to your name.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-semibold mb-2">Real accountability</h3>
              <p className="text-sm text-gray-500">Social pressure that actually works.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="font-semibold mb-2">Credibility compounds</h3>
              <p className="text-sm text-gray-500">A public track record of follow-through.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gray-950 text-white py-36 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4">Your Turn</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Put your word<br />on the <span className="italic text-orange-400">line.</span>
          </h2>
          <p className="text-gray-400 mb-10">Say it where it counts.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup" className="bg-blue-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl hover:scale-[1.02]">Commit publicly</Link>
            <Link href="/explore" className="border border-gray-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:border-gray-400 transition">Browse first</Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">Free to start. No credit card required.</p>
        </div>
      </section>

    </div>
  );
}
