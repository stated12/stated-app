import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stated Principles -- What Remarkable People Stand For",
  description:
    "A living archive of principles, beliefs, and lessons from founders, investors, policymakers, creators, and leaders -- stated publicly, in their own words.",
  metadataBase: new URL("https://app.stated.in"),
  openGraph: {
    title: "Stated Principles -- What Remarkable People Stand For",
    description:
      "Principles, beliefs, and lessons from leaders -- stated publicly, in their own words.",
    url: "https://app.stated.in/principles",
    siteName: "Stated",
    images: [{ url: "/shilpa-portrait.jpg", width: 600, height: 960, alt: "Stated Principles" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stated Principles",
    description: "What remarkable people stand for -- stated publicly.",
    images: ["/shilpa-portrait.jpg"],
  },
  alternates: { canonical: "https://app.stated.in/principles" },
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const published = [
  {
    slug:     "shilpa-s",
    name:     "Shilpa S",
    role:     "CMD, SheRocks India · Startup Ecosystem Enabler · Investor for MSMEs",
    issue:    "001",
    date:     "June 2026",
    photo:    "/shilpa-portrait.jpg",
    tagline:  "We finish what we start. Not for the applause -- but for the integrity of the promise.",
    tags:     ["Leadership", "Execution", "Integrity"],
    readTime: 6,
  },
];

const comingSoon = [
  {
    title: "The Founder Who Builds in Public",
    desc:  "On transparency, accountability, and why public building is a strategic advantage.",
  },
  {
    title: "The Investor Who Backs Execution",
    desc:  "What separates fundable founders from everyone else. Hint: it is not the pitch.",
  },
  {
    title: "The Policymaker Who Thinks Long",
    desc:  "On patience, systems thinking, and why most initiatives fail before they start.",
  },
];

const formatSteps = [
  { n: "1", title: "We ask five questions",           desc: "Curated to reveal principles, not opinions. Designed for depth, not headlines." },
  { n: "2", title: "They state what they stand for",  desc: "In their own words. Unfiltered. Publicly attributed. On record." },
  { n: "3", title: "We add context and interpretation", desc: "What it means, why it matters, and how readers can apply it." },
  { n: "4", title: "Readers reflect and act",         desc: "Create a commitment inspired by a principle. State it publicly on Stated." },
];

// ── MAILTO -- pre-filled nomination email ─────────────────────────────────────
const NOMINATION_EMAIL = "hello@stated.in";
const NOMINATION_SUBJECT = "Stated Principles -- Nomination";
const NOMINATION_BODY = `Hi Stated Team,

I would like to nominate someone for the Stated Principles series.

--- ABOUT THE PERSON BEING NOMINATED ---
Full Name: 
Current Role & Company: 
LinkedIn / Website: 
Why they should be featured (2-3 lines): 

--- ABOUT ME (THE PERSON NOMINATING) ---
My Full Name: 
My Email: 
My Phone / WhatsApp: 
My Company / Organisation: 

Note: If you are nominating yourself, fill the first section only and leave the second section blank.

Thank you,`;

const MAILTO_LINK = `mailto:${NOMINATION_EMAIL}?subject=${encodeURIComponent(
  NOMINATION_SUBJECT
)}&body=${encodeURIComponent(NOMINATION_BODY)}`;

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function PrinciplesIndexPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@300;400&display=swap');
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .mono  { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="border-b border-gray-200 px-6 py-20"
        style={{ background: "linear-gradient(180deg,#fafaf8 0%,#ffffff 100%)" }}
      >
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">
              Stated Principles
            </span>
          </div>

          <h1 className="serif text-5xl md:text-7xl font-light text-gray-900 leading-none tracking-tight mb-5">
            What remarkable<br />people{" "}
            <em className="italic text-amber-600">stand for.</em>
          </h1>

          <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10">
            A living archive of principles, beliefs, and lessons from founders, investors,
            policymakers, creators, and leaders -- stated publicly, in their own words.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={MAILTO_LINK}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline"
            >
              Nominate someone
            </a>
            <a
              href={MAILTO_LINK}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg transition-all no-underline"
            >
              Nominate yourself
            </a>
          </div>
        </div>
      </section>

      {/* ── PUBLISHED FEATURES ────────────────────────────────────────── */}
      <section className="px-6 py-16" style={{ background: "#fafaf8" }}>
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-2 mb-8">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">Features</span>
          </div>

          {published.map((f) => (
            <Link
              key={f.slug}
              href={`/principles/${f.slug}`}
              className="block mb-5 rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all no-underline"
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
                    <span className="mono text-xs tracking-wider uppercase">Issue {f.issue}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">

                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-px bg-amber-600 inline-block" />
                    <span className="mono text-amber-600 text-xs tracking-widest uppercase">
                      Stated Principles &middot; {f.date}
                    </span>
                  </div>

                  <h2 className="serif text-4xl font-light text-gray-900 leading-none tracking-tight mb-2">
                    {f.name}
                  </h2>

                  <p className="text-sm text-gray-400 font-light mb-4 leading-relaxed">{f.role}</p>

                  <blockquote className="serif text-lg font-light text-gray-600 italic leading-relaxed mb-5 pl-4 border-l-2 border-amber-300">
                    "{f.tagline}"
                  </blockquote>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {f.tags.map((t) => (
                      <span
                        key={t}
                        className="mono text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-wrap gap-3">
                    <span className="text-xs text-gray-400 font-light">
                      5 principles &middot; {f.readTime} min read
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
              <div
                key={c.title}
                className="bg-white border border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center"
                style={{ minHeight: 200 }}
              >
                <div className="text-2xl mb-3 opacity-25">✦</div>
                <h4 className="serif text-lg font-light text-gray-400 mb-2 leading-tight">
                  {c.title}
                </h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">{c.desc}</p>
                <a
                  href={MAILTO_LINK}
                  className="text-xs font-semibold text-amber-600 border border-amber-200 bg-amber-50 px-4 py-1.5 rounded-full hover:bg-amber-100 transition-all no-underline"
                >
                  Notify me
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── ABOUT THE FORMAT ──────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-200 px-6 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 items-start">

          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-5 h-px bg-amber-600 inline-block" />
              <span className="mono text-amber-600 text-xs tracking-widest uppercase">
                About the format
              </span>
            </div>
            <h2 className="serif text-4xl font-light text-gray-900 leading-tight tracking-tight mb-5">
              Not an interview.<br />A public record of<br />
              <em className="italic text-amber-600">what someone stands for.</em>
            </h2>
            <div className="text-sm text-gray-500 font-light leading-relaxed space-y-3">
              <p>
                Most interviews are forgotten the day after they are published.
                Stated Principles is designed to last -- because it captures beliefs and
                principles, not opinions about current events.
              </p>
              <p>
                Every feature is archived permanently. Every principle can inspire a
                commitment. Every quote becomes a public record tied to the person who stated it.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {formatSteps.map(({ n, title, desc }) => (
              <div
                key={n}
                className="flex gap-4 items-start bg-gray-50 border border-gray-200 rounded-xl p-4"
              >
                <span className="serif text-xl font-light text-amber-600 flex-shrink-0 leading-none mt-0.5">
                  {n}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── NOMINATE ──────────────────────────────────────────────────── */}
      <section
        className="px-6 py-16 border-t border-amber-100"
        style={{ background: "#fffbeb" }}
      >
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">
              Nominate someone
            </span>
          </div>

          <h2 className="serif text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
            Know someone whose principles deserve to be stated?
          </h2>

          <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
            We feature founders, investors, policymakers, creators, executives, and professionals
            who have something worth standing for. Click below to send us a nomination -- we will
            reach out within 5 working days.
          </p>

          {/* What happens when you click */}
          <div className="bg-white border border-amber-200 rounded-xl p-5 mb-7">
            <div className="mono text-xs text-amber-600 uppercase tracking-wider mb-3">
              What you will be asked
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {[
                "Full name of the person",
                "Their current role and company",
                "LinkedIn or website",
                "Why they should be featured",
                "Your name and contact",
                "Your email and phone",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-gray-500 font-light">
                  <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 font-light mt-3 italic">
              Nominating yourself? Just fill in your own details and leave the nominator section blank.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={MAILTO_LINK}
              className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-7 py-3.5 rounded-lg transition-all no-underline"
            >
              Nominate via email
            </a>
            <a
              href={MAILTO_LINK}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium px-7 py-3.5 rounded-lg transition-all no-underline"
            >
              Nominate yourself
            </a>
          </div>

          <p className="text-xs text-gray-400 font-light mt-4">
            Or write directly to{" "}
            <a
              href="mailto:hello@stated.in"
              className="text-amber-600 hover:underline"
            >
              hello@stated.in
            </a>
          </p>

        </div>
      </section>

    </div>
  );
}
