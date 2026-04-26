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
    <div className="min-h-screen flex flex-col bg-[#060c1a]">

      {/* ── HEADER ───────────────────────────────────── */}
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 md:px-10 py-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold">✓</div>
          <span className="text-white font-bold text-base tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>stated</span>
        </div>
        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link href="/explore" className="text-white/60 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/8 transition">Explore</Link>
          <Link href="/login"   className="text-white/60 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/8 transition">Login</Link>
          <Link href="/signup"  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition shadow-lg shadow-blue-900/40">Sign up</Link>
        </nav>
      </header>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center text-white px-5 pt-36 pb-28 min-h-screen overflow-hidden">

        {/* Background images — unchanged from original */}
        <Image src="/hero-desktop.png" alt="Background" fill priority className="object-cover -z-20 hidden md:block" />
        <Image src="/hero-mobile.png"  alt="Background" fill priority className="object-cover -z-20 md:hidden" />

        {/* Overlay — slightly deeper than original for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70 -z-10" />

        {/* Challenge badge — creates urgency */}
        <div className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          🚀 Execution Challenge — Live Now
        </div>

        {/* Logo + brand name */}
        <Image src="/logo.png" alt="Stated Logo" width={120} height={120} className="mb-3 drop-shadow-2xl" />
        <p className="text-blue-400 font-semibold text-base tracking-wider mb-4">Stated</p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.07] tracking-tight max-w-2xl">
          Say it publicly.<br />
          <span className="text-blue-400">Do it</span> publicly.
        </h1>

        {/* Sub */}
        <p className="mt-5 text-white/60 max-w-md text-base md:text-lg leading-relaxed font-light">
          Build credibility. Track progress. Stay accountable.<br />
          Turn your commitments into visible outcomes.
        </p>

        {/* 4-step strip */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-7 mb-8">
          {[
            { icon: "📝", label: "Commit" },
            { icon: "📈", label: "Track"  },
            { icon: "📸", label: "Prove"  },
            { icon: "🏆", label: "Complete" },
          ].map(({ icon, label }, i, arr) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-white/75 text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded-md">
                <span>{icon}</span> {label}
              </div>
              {i < arr.length - 1 && <span className="text-white/20 text-sm">→</span>}
            </div>
          ))}
        </div>

        {/* Search */}
        <form action="/search" method="GET" className="w-full max-w-lg flex bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl overflow-hidden shadow-xl mb-5">
          <input
            type="text"
            name="q"
            placeholder="Search commitments, people or companies"
            className="flex-1 px-4 py-3.5 bg-transparent text-white placeholder-white/35 text-sm outline-none"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 text-white text-sm font-medium transition shrink-0">
            Search
          </button>
        </form>

        {/* Primary CTA */}
        <Link
          href="/signup"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base px-10 py-4 rounded-xl shadow-2xl shadow-blue-900/60 transition hover:-translate-y-0.5 hover:shadow-blue-800/70 w-full max-w-sm text-center"
        >
          🚀 Start with 5 Free Commitments
        </Link>

        {/* Secondary CTA */}
        <Link
          href="/explore"
          className="mt-3 text-white/50 hover:text-white text-sm border border-white/12 hover:border-white/30 rounded-xl px-10 py-3 w-full max-w-sm text-center transition"
        >
          Browse first — no signup needed
        </Link>

        <p className="mt-4 text-xs text-white/30">
          Free to start · No credit card · 2 updates per commitment · Public profile included
        </p>
      </section>

      {/* ── SOCIAL PROOF TICKER ──────────────────────── */}
      <div className="border-y border-white/6 bg-white/[0.03] py-3.5 overflow-hidden">
        <div
          className="flex gap-12 w-max"
          style={{ animation: "ticker 32s linear infinite" }}
        >
          {[
            { name: "@posivity",      text: "I will end each day with one visible outcome I can point to." },
            { name: "Credorium Labs", text: "We commit to building strong interpretation tools for founders." },
            { name: "@rishi_dev",     text: "Shipping 3 features this week — publicly tracked." },
            { name: "@meenakshi",     text: "Read 20 pages every morning before 8 AM." },
            { name: "@buildinpublic", text: "Post a build update every single Monday." },
            // duplicate for seamless loop
            { name: "@posivity",      text: "I will end each day with one visible outcome I can point to." },
            { name: "Credorium Labs", text: "We commit to building strong interpretation tools for founders." },
            { name: "@rishi_dev",     text: "Shipping 3 features this week — publicly tracked." },
            { name: "@meenakshi",     text: "Read 20 pages every morning before 8 AM." },
            { name: "@buildinpublic", text: "Post a build update every single Monday." },
          ].map(({ name, text }, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-white/40 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              <span className="text-white/70 font-medium">{name}</span>
              — {text}
            </div>
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      {/* ── COMMITMENT FEED ───────────────────────────── */}
      <section className="bg-white text-black py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-400 mb-2 text-sm tracking-wide uppercase font-medium">People on record, right now</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center tracking-tight">
            Commitments from people &amp; companies
          </h2>
          <CommitmentFeed endpoint="/api/feed?limit=6" showFilters={false} />
          <div className="text-center mt-10">
            <Link
              href="/explore"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md hover:scale-[1.02]"
            >
              Explore all commitments
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className="bg-[#080f20] py-24 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3 text-center">How it works</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight leading-tight mb-3">
            Commit. Track. Prove. Complete.
          </h2>
          <p className="text-white/45 text-center text-sm mb-12 max-w-md mx-auto">
            Four steps to turn your word into a public record of execution.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "01", icon: "📝", name: "Commit",   desc: "Create commitments publicly. Your word, timestamped, on record." },
              { num: "02", icon: "📈", name: "Track",    desc: "Log updates and milestones. Show the world you're moving." },
              { num: "03", icon: "📸", name: "Prove",    desc: "Add proof. Share results. Real outcomes, not just intentions." },
              { num: "04", icon: "🏆", name: "Complete", desc: "Finish strong. Get recognized. Credibility compounds." },
            ].map(({ num, icon, name, desc }) => (
              <div
                key={name}
                className="bg-white/[0.04] border border-white/8 rounded-2xl p-5 hover:border-blue-500/40 hover:-translate-y-1 transition-all group"
              >
                <div className="text-white/6 font-extrabold text-3xl leading-none mb-2">{num}</div>
                <div className="text-2xl mb-3">{icon}</div>
                <div className="text-blue-400 font-bold text-sm mb-1.5">{name}</div>
                <div className="text-white/45 text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY STATED WORKS ─────────────────────────── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-3">Why Stated Works</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
            Most platforms reward{" "}
            <span className="italic text-orange-500">performance.</span>
            <br />We reward follow-through.
          </h2>
          <p className="text-gray-400 text-sm mb-14 max-w-sm mx-auto">
            The accountability layer the internet was missing.
          </p>
          <div className="grid md:grid-cols-3 gap-5 text-left">
            {[
              { icon: "📌", title: "Your word, on record",   body: "Public, timestamped, tied to your name. No escaping it — and that's exactly the point." },
              { icon: "👥", title: "Real accountability",    body: "Social pressure that actually works. When others can see it, you follow through." },
              { icon: "📈", title: "Credibility compounds",  body: "A public track record of follow-through. Every completion makes the next one more credible." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXECUTION CHALLENGE REWARDS ──────────────── */}
      <section className="bg-[#060c1a] py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3 text-center">Execution Challenge</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight mb-3">
            Win for doing what you said.
          </h2>
          <p className="text-white/40 text-center text-sm mb-12 max-w-sm mx-auto">
            Top executors get more than recognition — they get a platform.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🛡️", title: "No Cost",           body: "Completely free to join. No credit card required." },
              { icon: "🎁", title: "Credits",            body: "Get credits to create up to 5 commitments free." },
              { icon: "📣", title: "Recognition",        body: "Top executors get featured, PR distribution & premium upgrade." },
              { icon: "👥", title: "Teams Welcome",      body: "Work solo or with your team. Build a shared credibility score." },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="bg-white/[0.04] border border-white/8 rounded-2xl p-5 text-center hover:border-amber-400/30 hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <div className="text-amber-400 font-bold text-sm mb-1.5">{title}</div>
                <div className="text-white/40 text-xs leading-relaxed">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="bg-gray-950 text-white py-32 px-6 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-700/20 blur-[80px] rounded-full" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-4">Your Turn</p>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
            Put your word<br />on the{" "}
            <span className="italic text-orange-400">line.</span>
          </h2>
          <p className="text-gray-400 mb-10 text-base leading-relaxed">
            Say it where it counts. Join the Execution Challenge — free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-xl text-base font-semibold transition shadow-xl shadow-blue-900/50 hover:scale-[1.02]"
            >
              Commit publicly
            </Link>
            <Link
              href="/explore"
              className="border border-gray-700 hover:border-gray-400 px-10 py-4 rounded-xl text-base font-semibold transition hover:scale-[1.02]"
            >
              Browse first
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">Free to start. No credit card required.</p>
        </div>
      </section>

    </div>
  );
}
