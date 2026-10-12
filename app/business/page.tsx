import type { Metadata } from "next";
import Link from "next/link";

const URL = "https://app.stated.in/business";
const TITLE = "The Business Series — People. Ideas. Action. Impact.";
const DESCRIPTION =
  "Conversations with entrepreneurs, business leaders, investors and changemakers about what it really takes to build, grow and create meaningful impact. Presented by Stated in association with Credorium.";
const IMAGE = "https://app.stated.in/business-series.jpg";

export const metadata: Metadata = {
  title: `${TITLE} | Stated`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Stated",
    type: "website",
    images: [{ url: IMAGE, width: 1024, height: 1536, alt: "The Business Series by Stated, in association with Credorium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

const pillars = [
  {
    title: "Business Leaders",
    body: "Real journeys from founders, CEOs and industry leaders.",
    tint: "bg-sky-50 text-sky-700",
  },
  {
    title: "Ideas & Innovation",
    body: "Exploring ideas that solve real problems.",
    tint: "bg-amber-50 text-amber-700",
  },
  {
    title: "Strategy & Growth",
    body: "Lessons on building, scaling and staying resilient.",
    tint: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "People & Culture",
    body: "Leadership, teams and the human side of business.",
    tint: "bg-rose-50 text-rose-700",
  },
  {
    title: "Impact & Beyond",
    body: "Businesses that create value for society and the world.",
    tint: "bg-violet-50 text-violet-700",
  },
];

const expect = [
  { title: "In-depth Conversations", body: "With entrepreneurs, investors and experts." },
  { title: "Real Business Stories", body: "Challenges, failures and turning points." },
  { title: "Practical Insights", body: "Strategy, growth, innovation and leadership lessons." },
  { title: "Diverse Perspectives", body: "Across industries, geographies and stages of business." },
  { title: "Actionable Takeaways", body: "Ideas you can apply in your own journey." },
];

const features = [
  "Founders & Entrepreneurs",
  "CEOs & Business Leaders",
  "Investors & Ecosystem Builders",
  "Experts & Practitioners",
  "Purpose-Driven Organisations",
];

const themes = ["Ideas", "People", "Strategies", "Stories", "Leadership", "Growth", "Impact"];

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-5xl px-6 pt-8 text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">
          Home
        </Link>{" "}
        / The Business Series
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-5xl px-6 pt-8">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-neutral-200 pb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              Business Series
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Real Conversations. Real Lessons. Real Impact.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">In association with</p>
            <a
              href="https://www.credorium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-2xl font-bold tracking-tight text-neutral-900 hover:text-amber-700"
            >
              Credorium
            </a>
            <p className="text-xs text-neutral-500">Decision Context for Better Decisions</p>
          </div>
        </div>

        <div className="grid items-end gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              The
              <br />
              <span className="text-amber-600">Business</span>
              <br />
              Series
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-amber-500" />
            <p className="mt-6 text-2xl font-semibold">People. Ideas. Action. Impact.</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-neutral-700">
              Conversations with entrepreneurs, business leaders, investors and changemakers about
              what it really takes to build, grow and create meaningful impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#what-to-expect"
                className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
              >
                What to expect
              </a>
              <Link
                href="/principles"
                className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:border-neutral-900"
              >
                Explore Stated Principles
              </Link>
            </div>
          </div>

          <ul className="space-y-3 border-l-2 border-amber-300 pl-6 text-sm uppercase tracking-[0.25em] text-neutral-500">
            {themes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </header>

      {/* Pillars */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <div key={p.title}>
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${p.tint}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-sm font-bold uppercase tracking-wide">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to expect */}
      <section id="what-to-expect" className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold uppercase tracking-wide">What to expect</h2>
          <span className="h-0.5 w-8 bg-amber-500" />
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {expect.map((e) => (
            <div key={e.title} className="border-t border-neutral-200 pt-4">
              <h3 className="font-semibold">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we feature */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold uppercase tracking-wide">Who we feature</h2>
          <span className="h-0.5 w-8 bg-amber-500" />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Purpose & audience */}
      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-2">
        <div className="rounded-2xl bg-amber-50 p-8">
          <h2 className="text-lg font-bold uppercase tracking-wide text-amber-800">Our purpose</h2>
          <div className="mt-2 h-0.5 w-8 bg-amber-500" />
          <p className="mt-4 text-lg leading-relaxed text-neutral-800">
            To share authentic business journeys, meaningful insights and practical lessons for
            entrepreneurs, professionals and future leaders.
          </p>
        </div>
        <div className="rounded-2xl bg-sky-50 p-8">
          <h2 className="text-lg font-bold uppercase tracking-wide text-sky-900">Our audience</h2>
          <div className="mt-2 h-0.5 w-8 bg-sky-400" />
          <p className="mt-4 text-lg leading-relaxed text-neutral-800">
            Entrepreneurs, professionals, students, investors and anyone curious about real-world
            business experiences.
          </p>
        </div>
      </section>

      {/* Conversations */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center">
          <p className="text-xs uppercase tracking-wide text-neutral-400">Conversations</p>
          <h2 className="mt-2 text-2xl font-serif">Featured conversations will appear here</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-neutral-600">
            Each conversation will be published on Stated as it is ready. In the meantime, read the
            published Stated Principles from leaders across public service, business and society.
          </p>
          <Link
            href="/principles"
            className="mt-5 inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Explore published Principles
          </Link>
        </div>
      </section>

      {/* Closing band */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-6 py-10">
          <div>
            <p className="text-sm text-neutral-500">Explore the Business Series</p>
            <p className="mt-1 text-lg font-semibold">app.stated.in/business</p>
          </div>
          <p className="text-lg font-semibold leading-snug">
            Inspiring Conversations.
            <br />
            <span className="text-amber-700">Bigger Possibilities.</span>
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 pb-12 text-center text-sm text-neutral-500">
        <p>
          Stated Business Series is presented by Stated in association with{" "}
          <a
            href="https://www.credorium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-800 underline"
          >
            Credorium
          </a>
          .
        </p>
        <p className="mt-1">
          Credorium: Decision Context for Better Decisions ·{" "}
          <a
            href="https://www.credorium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            www.credorium.com
          </a>
        </p>
      </footer>
    </main>
  );
}
