import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stated Principles — What Remarkable People Stand For",
  description:
    "A living archive of principles, beliefs, and lessons from founders, investors, policymakers, creators, and leaders — stated publicly, in their own words.",
  metadataBase: new URL("https://app.stated.in"),
  openGraph: {
    title: "Stated Principles — What Remarkable People Stand For",
    description:
      "Principles, beliefs, and lessons from leaders — stated publicly, in their own words.",
    url: "https://app.stated.in/principles",
    siteName: "Stated",
    images: [{ url: "/shilpa-portrait.jpg", width: 600, height: 960, alt: "Stated Principles" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stated Principles",
    description: "What remarkable people stand for — stated publicly.",
    images: ["/shilpa-portrait.jpg"],
  },
  alternates: { canonical: "https://app.stated.in/principles" },
};

const published = [
  {
    slug: "shilpa-s",
    name: "Shilpa S",
    role: "CMD, SheRocks India · Startup Ecosystem Enabler · Investor for MSMEs",
    issue: "001",
    date: "June 2026",
    photo: "/shilpa-portrait.jpg",
    photoSquare: "/shilpa-square.jpg",
    tagline:
      "We finish what we start. Not for the applause — but for the integrity of the promise.",
    tags: ["Leadership", "Execution", "Integrity"],
    principles: 5,
    readTime: 6,
    statedCount: 1181,
  },
];

const comingSoon = [
  {
    title: "The Founder Who Builds in Public",
    desc: "On transparency, accountability, and why public building is a strategic advantage.",
  },
  {
    title: "The Investor Who Backs Execution",
    desc: "What separates fundable founders from everyone else. Hint: it is not the pitch.",
  },
  {
    title: "The Policymaker Who Thinks Long",
    desc: "On patience, systems thinking, and why most initiatives fail before they start.",
  },
];

const formatSteps = [
  { n: "1", title: "We ask five questions", desc: "Curated to reveal principles, not opinions. Designed for depth, not headlines." },
  { n: "2", title: "They state what they stand for", desc: "In their own words. Unfiltered. Publicly attributed. On record." },
  { n: "3", title: "We add context and interpretation", desc: "What it means, why it matters, and how readers can apply it." },
  { n: "4", title: "Readers state, save, and act", desc: "Follow a principle, save it, or create a commitment inspired by it." },
];

export default function PrinciplesIndexPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@300;400&display=swap');
        .font-serif-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-mono-sm { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* -- HERO -------------------------------------------------------- */}
      <section className="border-b border-gray-200 px-6 py-20" style={{ background: "linear-gradient(180deg,#fafaf8 0%,#ffffff 100%)" }}>
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="font-mono-sm text-amber-600 text-xs tracking-widest uppercase">Stated Principles</span>
          </div>

          <h1 className="font-serif-display text-5xl md:text-7xl font-light text-gray-900 leading-none tracking-tight mb-5">
            What remarkable<br />people{" "}
            <em className="italic text-amber-600">stand for.</em>
          </h1>

          <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-xl mb-8">
            A living archive of principles, beliefs, and lessons from founders, investors, policymakers, creators, and leaders — stated publicly, in their own words.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all">
              Submit someone for a feature
            </button>
            <button className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg transition-all">
              Get notified of new issues
            </button>
          </div>

          <div className="flex flex-wrap gap-0 border-t border-gray-200 pt-6 divide-x divide-gray-200">
            {[
              { v: "1",     l: "Feature published" },
              { v: "5",     l: "Principles stated" },
              { v: "1,181", l: "Times stated by readers" },
              { v: "Weekly", l: "New issues" },
            ].map(({ v, l }) => (
              <div key={l} className="px-6 first:pl-0">
                <div className="font-serif-display text-3xl font-light text-gray-900 leading-none mb-1">{v}</div>
                <div className="text-xs text-gray-400 font-light tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- FEATURES GRID ---------------------------------------------- */}
      <section className="px-6 py-16" style={{ background: "#fafaf8" }}>
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-2 mb-8">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="font-mono-sm text-amber-600 text-xs tracking-widest uppercase">All features</span>
          </div>

          {/* Featured card — Shilpa */}
          {published.map((f) => (
            <Link
              key={f.slug}
              href={`/principles/${f.slug}`}
              className="block mb-5 rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline"
            >
              <div className="grid md:grid-cols-[280px_1fr]">
                {/* Photo */}
                <div className="relative overflow-hidden bg-stone-100" style={{ minHeight: 280 }}>
                  <Image
                    src={f.photo}
                    alt={f.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                    <span className="font-mono-sm text-xs tracking-wider uppercase">Latest issue</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-px bg-amber-600 inline-block" />
                    <span className="font-mono-sm text-amber-600 text-xs tracking-widest uppercase">
                      Stated Principles · Issue {f.issue}
                    </span>
                  </div>

                  <h2 className="font-serif-display text-4xl font-light text-gray-900 leading-none tracking-tight mb-2">
                    {f.name}
                  </h2>
                  <p className="text-sm text-gray-400 font-light mb-4 leading-relaxed">{f.role}</p>

                  <blockquote className="font-serif-display text-lg font-light text-gray-700 italic leading-relaxed mb-4 pl-3 border-l-2 border-amber-300">
                    "{f.tagline}"
                  </blockquote>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {f.tags.map((t) => (
                      <span key={t} className="font-mono-sm text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded uppercase tracking-wider">{t}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-wrap gap-3">
                    <span className="text-xs text-gray-400 font-light">
                      {f.principles} principles · {f.readTime} min read · {f.statedCount.toLocaleString()} readers stated a principle
                    </span>
                    <span className="bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-lg">
                      Read feature
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Coming soon cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            {comingSoon.map((c) => (
              <div key={c.title} className="bg-white border border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center" style={{ minHeight: 200 }}>
                <div className="text-2xl mb-3 opacity-30">✦</div>
                <h4 className="font-serif-display text-lg font-light text-gray-400 mb-2 leading-tight">{c.title}</h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">{c.desc}</p>
                <button className="text-xs font-semibold text-amber-600 border border-amber-200 bg-amber-50 px-4 py-1.5 rounded-full hover:bg-amber-100 transition-all">
                  Notify me
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- ABOUT THE FORMAT -------------------------------------------- */}
      <section className="bg-white border-t border-gray-200 px-6 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-5 h-px bg-amber-600 inline-block" />
              <span className="font-mono-sm text-amber-600 text-xs tracking-widest uppercase">About the format</span>
            </div>
            <h2 className="font-serif-display text-4xl font-light text-gray-900 leading-tight tracking-tight mb-5">
              Not an interview.<br />A public record of<br />
              <em className="italic text-amber-600">what someone stands for.</em>
            </h2>
            <div className="text-sm text-gray-500 font-light leading-relaxed space-y-3">
              <p>Most interviews are forgotten the day after they are published. Stated Principles is designed to last — because it captures beliefs and principles, not opinions about current events.</p>
              <p>Every feature is archived permanently. Every principle can be adopted by readers. Every quote becomes a public record tied to the person who stated it.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {formatSteps.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-4 items-start bg-gray-50 border border-gray-200 rounded-xl p-4">
                <span className="font-serif-display text-xl font-light text-amber-600 flex-shrink-0 leading-none mt-0.5">{n}</span>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- NOMINATE ---------------------------------------------------- */}
      <section className="px-6 py-16 border-t border-amber-100" style={{ background: "#fffbeb" }}>
        <div className="max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="font-mono-sm text-amber-600 text-xs tracking-widest uppercase">Nominate someone</span>
            <span className="w-5 h-px bg-amber-600 inline-block" />
          </div>
          <h2 className="font-serif-display text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
            Know someone whose principles deserve to be stated?
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed mb-7">
            We feature founders, investors, policymakers, creators, executives, and professionals who have something worth standing for. Nominate someone — or yourself.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-7 py-3 rounded-lg transition-all">
              Submit a nomination
            </button>
            <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium px-7 py-3 rounded-lg transition-all">
              Learn about the process
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
