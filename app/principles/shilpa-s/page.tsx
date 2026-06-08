import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const PAGE_URL = "https://app.stated.in/principles/shilpa-s";
const PAGE_DESC =
  "We finish what we start. Not for the applause — but for the integrity of the promise. Five principles from CMD of SheRocks India.";

export const metadata: Metadata = {
  title: "Shilpa S — 5 Principles, Stated | Stated Principles",
  description: PAGE_DESC,
  metadataBase: new URL("https://app.stated.in"),
  openGraph: {
    title: "Shilpa S — 5 Principles, Stated",
    description: PAGE_DESC,
    url: PAGE_URL,
    siteName: "Stated",
    images: [{ url: "/shilpa-portrait.jpg", width: 600, height: 960, alt: "Shilpa S" }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shilpa S — 5 Principles, Stated",
    description: PAGE_DESC,
    images: ["/shilpa-portrait.jpg"],
  },
  alternates: { canonical: PAGE_URL },
};

const shareLinks = {
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(PAGE_URL)}`,
  twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(PAGE_URL)}&text=${encodeURIComponent(PAGE_DESC)}`,
  whatsapp: `https://wa.me/?text=${encodeURIComponent(PAGE_DESC + " " + PAGE_URL)}`,
};

const principles = [
  {
    n: "01",
    name: "Decisiveness",
    quote:
      "No matter what your education, degree or skill — if you cannot take a calculative decision at the right time, you will be stuck always at the wrong point.",
    means:
      "Shilpa is not dismissing preparation. She is pointing to the gap between knowing and acting — the critical moment where credentials alone cannot substitute for the courage to decide. Paralysis dressed as prudence is still paralysis.",
    matters:
      "In ecosystem building and advisory work, the cost of a delayed decision is often higher than the cost of an imperfect one. Every stakeholder waits. Every window closes. Decisiveness is a compounding asset — the more you practise it, the more trusted you become.",
    reflect:
      "Where in your professional life are you gathering more information when what you actually need is a decision? What is the real cost of your current hesitation?",
    count: 247,
  },
  {
    n: "02",
    name: "Character over connections",
    quote:
      "You don't leave an impact with networking. No matter what you do, if you don't carry character with high standards, firm principles, ethics, dignity and integrity — you can never build a meaningful impact in today's world.",
    means:
      "Networking is a tool. Character is the foundation that makes the tool matter. Shilpa is distinguishing between accumulating relationships and building the kind of presence that people remember — because it is anchored in something real.",
    matters:
      "In an era where everyone is connected to everyone, scarcity has shifted to the rarest resource: integrity. The people who move through the world with consistent values become the ones others want to collaborate with, invest in, and advocate for.",
    reflect:
      "When you walk out of a room, what do people say about you? Is it about your network or your character? Which of these are you actively investing in?",
    count: 183,
  },
  {
    n: "03",
    name: "Risk-taking ability",
    quote:
      "If you cannot take risks in life, you can never build anything. An idea is just a pattern of creative imagination. Virtual reality can create an illusion — but that is not the real world.",
    means:
      "Ideas have no weight until they are tested against reality. Shilpa draws a sharp line between imagination and execution — and identifies the bridge between them as the willingness to risk. Staying safe is a choice with its own cost: nothing is built.",
    matters:
      "For founders and ecosystem builders, risk is not optional — it is the price of entry. Those who cannot distinguish calculated risk from recklessness build neither value nor trust.",
    reflect:
      "What is the one risk you keep deferring? What would you build or become if you took it seriously this month?",
    count: 312,
  },
  {
    n: "04",
    name: "Authenticity",
    quote:
      "Be a warrior. We finish what we start. Not for the applause — but for the integrity of the promise. That is the standard.",
    means:
      "Authenticity here is not about self-expression. It is about internal consistency — doing what you said you would do, even when the audience has left. Shilpa ties authenticity directly to completion: the promise kept in private is the truest measure of who you are.",
    matters:
      "In public life, there is constant pressure to perform for external validation. Shilpa reframes the source of motivation: integrity demands follow-through regardless of audience. This is also the founding logic of Stated.",
    reflect:
      "Which commitments have you made that you have not yet completed? Are you still in the game — or have you quietly moved on?",
    count: 198,
  },
  {
    n: "05",
    name: "Disciplined execution",
    quote:
      "Operate like a silent assassin: no distractions, no excuses, no mercy. This is where legends are built. You are either the hunter or the meal.",
    means:
      "Shilpa is describing the discipline required to become exceptional. Distraction, excuses, and self-mercy are the enemies of execution. Remove them, and you build at a different level entirely.",
    matters:
      "The gap between people who intend to build and those who actually do is often not talent — it is discipline. Consistent, silent, undramatic execution is what compounds over time. That gap is where the advantage lives.",
    reflect:
      "What is your single most important execution priority right now? Are you hunting it — or waiting for conditions to improve?",
    count: 441,
  },
];

const takeaways = [
  { title: "Decide, even imperfectly.", body: "Delayed decisions compound into missed opportunities. The cost of waiting is rarely calculated honestly." },
  { title: "Build character, not just contacts.", body: "In a connected world, the scarcest resource is integrity. Your reputation is built in private decisions, not public ones." },
  { title: "Ideas without risk are imagination.", body: "The bridge from concept to reality is always a calculated bet. Avoiding all risk is itself a risk." },
  { title: "Finish what you started.", body: "Authenticity is measured by completion, not intention. The promise you made deserves follow-through — regardless of applause." },
  { title: "Execute without excuses.", body: "Silent, disciplined execution is where real value is built. Most people talk about it. The ones who do it have the advantage." },
];

export default function ShilpaSPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@300;400&display=swap');
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .mono  { font-family: 'DM Mono', monospace; }
        .copy-btn:active { transform: scale(.97); }
      `}</style>

      {/* -- BREADCRUMB ------------------------------------------ */}
      <div className="border-b border-gray-100 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/principles" className="hover:text-gray-700 transition-colors">Stated Principles</Link>
          <span>/</span>
          <span className="text-gray-600">Shilpa S</span>
        </div>
      </div>

      {/* -- HERO SPLIT ------------------------------------------ */}
      <div className="grid md:grid-cols-2 border-b border-gray-200" style={{ minHeight: "calc(100vh - 108px)" }}>

        {/* Photo */}
        <div className="relative overflow-hidden bg-stone-100" style={{ minHeight: 400 }}>
          <Image
            src="/shilpa-portrait.jpg"
            alt="Shilpa S — CMD, SheRocks India"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute bottom-3 left-3 text-xs font-light text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
            Shilpa S &middot; CMD, SheRocks India
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-16 bg-white border-l border-gray-100">

          <div className="flex items-center gap-2 mb-7">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">
              Stated Principles &middot; Issue No. 001
            </span>
          </div>

          <h1
            className="serif font-light text-gray-900 leading-none tracking-tight mb-3"
            style={{ fontSize: "clamp(48px,6vw,80px)" }}
          >
            Shilpa<br />
            <em className="italic text-amber-600">S.</em>
          </h1>

          <div className="text-sm font-light text-gray-400 mb-6 leading-relaxed">
            <strong className="text-gray-900 font-semibold text-base block mb-1">CMD, SheRocks India</strong>
            Startup Ecosystem Enabler &middot; Investor for MSMEs<br />
            Strategic Advisor &middot; Political Consultant &middot; International Relations Specialist
          </div>

          <div className="w-10 h-0.5 bg-amber-600 mb-6" />

          <p className="serif text-xl font-light text-gray-700 italic leading-relaxed mb-7">
            "On what she stands for — five principles stated publicly, in her own words."
          </p>

          <div className="flex flex-wrap gap-5 mb-7">
            {[
              { label: "Format",     value: "Leadership Principles" },
              { label: "Read time",  value: "6 minutes"             },
              { label: "Principles", value: "5 stated"              },
              { label: "Published",  value: "June 2026"             },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="mono text-xs text-gray-400 uppercase tracking-wider mb-0.5">{label}</div>
                <div className="text-sm font-semibold text-gray-900">{value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Founder", "Investor", "Advisor", "Political Consultant", "International Relations"].map((t) => (
              <span key={t} className="mono text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>

          <a
            href="#principles"
            className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all w-fit"
          >
            Read the principles
          </a>
        </div>
      </div>

      {/* -- INTRO ---------------------------------------------- */}
      <section className="bg-white border-b border-gray-200 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">About this feature</span>
          </div>
          <blockquote className="serif text-2xl md:text-3xl font-light text-gray-900 leading-snug mb-6 pl-5 border-l-2 border-amber-300">
            "We asked Shilpa five questions. She gave us something better — five principles she lives by."
          </blockquote>
          <div className="text-sm text-gray-500 font-light leading-relaxed space-y-3">
            <p>Instead of a conventional interview, Shilpa S responded with the principles that have guided her across decades of work — from building startup ecosystems and advising MSMEs, to navigating the intersections of politics and international relations.</p>
            <p>What follows is not a Q&amp;A. It is a record of what she stands for, stated publicly, in her own words. This is how <em>Stated Principles</em> works: the person states their beliefs. We make them visible. You decide what to carry forward.</p>
          </div>
        </div>
      </section>

      {/* -- PRINCIPLES ----------------------------------------- */}
      <section id="principles" className="px-6 py-16" style={{ background: "#fafaf8" }}>
        <div className="max-w-3xl mx-auto">

          <div className="mb-12">
            <div className="mono text-xs text-gray-400 tracking-widest uppercase mb-3">
              Five principles &middot; Stated by Shilpa S
            </div>
            <h2 className="serif text-3xl md:text-4xl font-light text-gray-900 leading-tight tracking-tight">
              What she stands for —<br />in her own words.
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {principles.map((p) => (
              <div key={p.n} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                {/* Accent bar */}
                <div className="h-0.5 w-full bg-gradient-to-r from-amber-600 to-amber-400" />

                <div className="p-8">

                  {/* Number + Name */}
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="mono text-xs text-amber-600 italic flex-shrink-0">{p.n} of 05</span>
                    <h3 className="serif text-3xl md:text-4xl font-medium text-gray-900 leading-none tracking-tight">
                      {p.name}
                    </h3>
                  </div>

                  {/* Quote */}
                  <div className="bg-amber-50 border-l-2 border-amber-400 rounded-r-xl p-5 mb-6">
                    <p className="serif text-lg font-light text-gray-800 italic leading-relaxed">{p.quote}</p>
                    <div className="mono text-xs text-gray-400 uppercase tracking-wider mt-3">
                      — Shilpa S, stated directly
                    </div>
                  </div>

                  {/* What / Why */}
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <div className="mono text-xs text-gray-400 uppercase tracking-wider mb-2">What this means</div>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">{p.means}</p>
                    </div>
                    <div>
                      <div className="mono text-xs text-gray-400 uppercase tracking-wider mb-2">Why it matters</div>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">{p.matters}</p>
                    </div>
                  </div>

                  {/* Reflect */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
                    <div className="mono text-xs text-blue-600 uppercase tracking-wider mb-1.5">Reflect on this</div>
                    <p className="text-sm text-gray-500 font-light italic leading-relaxed">{p.reflect}</p>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-wrap gap-3">
                    <Link
                      href="/signup"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-gray-900 hover:bg-gray-700 px-4 py-2.5 rounded-lg transition-all no-underline"
                    >
                      Create a Commitment inspired by this
                    </Link>
                    <div className="mono text-xs text-gray-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                      {p.count.toLocaleString()} people found this meaningful
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- FEATURE QUOTE -------------------------------------- */}
      <section className="px-6 py-16 border-t border-amber-100" style={{ background: "#fffbeb" }}>
        <div className="max-w-2xl mx-auto">
          <div className="serif text-7xl font-light text-amber-300 leading-none mb-1">"</div>
          <p className="serif text-2xl md:text-3xl font-light text-gray-900 leading-snug mb-5">
            We finish what we start. Not for the applause —<br />
            but for <em className="italic text-amber-600">the integrity of the promise.</em><br />
            That is the standard.
          </p>
          <div className="flex items-center gap-2 mono text-xs text-gray-400 uppercase tracking-wider">
            <span className="w-4 h-px bg-amber-400 inline-block" />
            Shilpa S &mdash; Principle IV, Stated
          </div>
        </div>
      </section>

      {/* -- TAKEAWAYS ------------------------------------------ */}
      <section className="bg-white border-t border-gray-200 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">Key takeaways</span>
          </div>
          <h2 className="serif text-3xl font-light text-gray-900 tracking-tight mb-8">
            Five ideas worth carrying forward
          </h2>
          <div className="divide-y divide-gray-100">
            {takeaways.map((t, i) => (
              <div key={i} className="flex gap-4 py-4 items-start">
                <span className="serif text-xl font-light text-amber-500 flex-shrink-0 mt-0.5 leading-none">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  <strong className="text-gray-900 font-semibold">{t.title}</strong>{" "}{t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- COMMIT CTA ----------------------------------------- */}
      <section className="px-6 py-12" style={{ background: "#fafaf8" }}>
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
          <h3 className="serif text-2xl font-light text-gray-900 mb-3 leading-snug">
            Which principle resonates with you?
          </h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
            Post a commitment inspired by Shilpa's principles. State it publicly — and make it real.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-8 py-3.5 rounded-xl transition-all no-underline w-full sm:w-auto"
          >
            Create a Commitment
          </Link>
        </div>
      </section>

      
      {/* -- SHARE ---------------------------------------------- */}
      <div className="border-t border-gray-100 px-6 py-10">
        <div className="max-w-2xl mx-auto">

          <div className="mono text-xs text-gray-400 uppercase tracking-widest mb-4">
            Share this feature
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-600 border border-gray-200 hover:border-blue-600 hover:text-blue-600 bg-white px-4 py-2.5 rounded-lg transition-all no-underline"
            >
              LinkedIn
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900 bg-white px-4 py-2.5 rounded-lg transition-all no-underline"
            >
              Twitter / X
            </a>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-600 border border-gray-200 hover:border-green-600 hover:text-green-600 bg-white px-4 py-2.5 rounded-lg transition-all no-underline"
            >
              WhatsApp
            </a>
            {/* Copy link — inline script, no "use client" needed */}
            <button
              className="copy-btn text-xs font-medium text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900 bg-white px-4 py-2.5 rounded-lg transition-all cursor-pointer"
              onClick={
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                // @ts-expect-error inline handler
                undefined
              }
              data-url={PAGE_URL}
              suppressHydrationWarning
            >
              Copy link
            </button>
          </div>

          {/* Inline script for copy — runs on client, no hydration issue */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.querySelectorAll('.copy-btn').forEach(function(btn) {
                  btn.addEventListener('click', function() {
                    var url = btn.getAttribute('data-url');
                    navigator.clipboard.writeText(url).then(function() {
                      btn.textContent = 'Copied!';
                      setTimeout(function() { btn.textContent = 'Copy link'; }, 2000);
                    });
                  });
                });
              `,
            }}
          />

          <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-gray-100">
            <div className="mono text-xs text-gray-300">6 min read &middot; 5 principles</div>
            <div className="mono text-xs text-gray-300 italic">app.stated.in/principles/shilpa-s</div>
          </div>

        </div>
      </div>

      {/* -- BACK ----------------------------------------------- */}
      <div className="border-t border-gray-100 px-6 py-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/principles"
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors no-underline"
          >
            All Stated Principles features
          </Link>
        </div>
      </div>

    </div>
  );
}
  
