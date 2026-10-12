import type { Metadata } from "next";
import Link from "next/link";

const URL = "https://app.stated.in/business";
const EMAIL = "hello@stated.in";
const TITLE = "Stated Business Series | Business Leadership, Entrepreneurship & Insights";
const DESCRIPTION =
  "Explore the Stated Business Series featuring business leaders, founders, entrepreneurs, investors, and experts sharing practical insights on leadership, innovation, strategy, and decision-making.";
const IMAGE = "https://app.stated.in/business-series.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Stated",
    type: "website",
    images: [{ url: IMAGE, width: 1024, height: 1536, alt: "Stated Business Series" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [IMAGE] },
};

/* ---------- Email workflow (mailto only: no backend, no database) ---------- */
function mailto(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body.replace(/\n/g, "\r\n")
  )}`;
}

const NOMINATION_SUBJECT = "Stated Business Series — Nomination / Participation Enquiry";
const nominationBody = (intro: string, type: string) =>
  `Hello Stated Team,

${intro}

Enquiry type: ${type}

Name:
Designation:
Organisation:
Website or LinkedIn profile:
Industry:
Brief reason for nomination or participation:

Additional information:

Thank you.`;

const nominationOptions = [
  {
    label: "Nominate a Business Leader",
    href: mailto(
      NOMINATION_SUBJECT,
      nominationBody(
        "I would like to nominate a business leader for the Stated Business Series.",
        "Nomination"
      )
    ),
  },
  {
    label: "Nominate Myself",
    href: mailto(
      NOMINATION_SUBJECT,
      nominationBody(
        "I would like to nominate myself for the Stated Business Series.",
        "Self-nomination"
      )
    ),
  },
  {
    label: "Express Interest in Participating",
    href: mailto(
      NOMINATION_SUBJECT,
      nominationBody(
        "I would like to express my interest in participating in the Stated Business Series.",
        "Participation"
      )
    ),
  },
];

const SPONSOR_SUBJECT = "Stated Business Series — Sponsorship Enquiry";
const sponsorHref = mailto(
  SPONSOR_SUBJECT,
  `Hello Stated Team,

I am interested in exploring a sponsorship or partnership opportunity with the Stated Business Series.

Name:
Designation:
Organisation:
Website:
Industry:
Type of partnership or sponsorship:
Brief description of our objectives:

Additional information:

I look forward to discussing the possibilities.

Thank you.`
);

/* ---------- Content ---------- */
const themes = [
  {
    title: "Entrepreneurship & Founder Journeys",
    body: "The realities of starting, building, scaling, and sustaining a business.",
    icon: "flag",
  },
  {
    title: "Leadership & Decision-Making",
    body: "How leaders navigate uncertainty, make difficult decisions, build teams, and take responsibility.",
    icon: "compass",
  },
  {
    title: "Innovation & Emerging Technologies",
    body: "New ideas, AI, technology adoption, changing markets, and the future of business.",
    icon: "bulb",
  },
  {
    title: "Strategy, Growth & Investment",
    body: "Business models, market expansion, capital, partnerships, and sustainable growth.",
    icon: "trend",
  },
  {
    title: "Culture, Ethics & Business Impact",
    body: "Trust, organisational culture, accountability, responsible business, and long-term value creation.",
    icon: "shield",
  },
];

const contributors = [
  "Entrepreneurs and startup founders",
  "CEOs, directors, and senior executives",
  "Investors and venture capital professionals",
  "Business consultants and industry specialists",
  "Technology and innovation leaders",
  "Family business owners and next-generation leaders",
  "Researchers, educators, and subject-matter experts",
  "Professionals with valuable experiences in business, leadership, and organisational development",
];

const readerExpect = [
  "Decisions that changed a business's direction",
  "Lessons learned from failures and setbacks",
  "Building teams and organisational cultures",
  "Approaching growth, innovation, and uncertainty",
  "Creating trust and maintaining accountability",
  "Turning ideas into practical action",
  "Lessons other founders and professionals can apply",
];

function Icon({ name }: { name: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "flag":
      return (
        <svg {...common}>
          <path d="M5 21V4" />
          <path d="M5 4h11l-2 4 2 4H5" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2 5-5 2 2-5z" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M15 7h6v6" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
  }
}

function HeroIllustration() {
  // Conceptual network: decisions (nodes) connected around a central question.
  const nodes = [
    [60, 55],
    [300, 45],
    [345, 170],
    [250, 290],
    [70, 270],
    [30, 160],
  ];
  return (
    <svg
      viewBox="0 0 380 340"
      role="img"
      aria-label="Illustration of connected business decisions around a central idea"
      className="h-auto w-full"
    >
      <rect x="0" y="0" width="380" height="340" rx="20" fill="#F3EDE0" />
      {nodes.map(([x, y], i) => (
        <line key={`l${i}`} x1="190" y1="165" x2={x} y2={y} stroke="#14213D" strokeOpacity="0.25" strokeWidth="1.5" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`r${i}`}
          x1={nodes[i][0]}
          y1={nodes[i][1]}
          x2={nodes[i + 1][0]}
          y2={nodes[i + 1][1]}
          stroke="#B8862B"
          strokeOpacity="0.55"
          strokeWidth="1.2"
          strokeDasharray="4 5"
        />
      ))}
      <circle cx="190" cy="165" r="62" fill="#14213D" />
      <circle cx="190" cy="165" r="74" fill="none" stroke="#B8862B" strokeOpacity="0.5" />
      <text x="190" y="160" textAnchor="middle" fontSize="15" fill="#FBF8F2" fontFamily="Georgia, serif">
        Every
      </text>
      <text x="190" y="182" textAnchor="middle" fontSize="15" fill="#FBF8F2" fontFamily="Georgia, serif">
        decision
      </text>
      {nodes.map(([x, y], i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy={y} r="22" fill="#FBF8F2" stroke="#14213D" strokeOpacity="0.5" />
          <circle cx={x} cy={y} r="6" fill={i % 2 ? "#14213D" : "#B8862B"} />
        </g>
      ))}
    </svg>
  );
}

const btnPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-md bg-[#14213D] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0c1428] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8862B] focus-visible:ring-offset-2";
const btnSecondary =
  "inline-flex min-h-12 items-center justify-center rounded-md border border-[#14213D] px-6 py-3 text-base font-semibold text-[#14213D] transition-colors hover:bg-[#14213D] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8862B] focus-visible:ring-offset-2";

function NominateMenu({ align = "left" }: { align?: "left" | "center" }) {
  return (
    <details className={`group relative ${align === "center" ? "mx-auto" : ""} w-full max-w-sm`}>
      <summary
        className={`${btnPrimary} w-full cursor-pointer list-none justify-between gap-3 [&::-webkit-details-marker]:hidden`}
      >
        <span>Nominate or Participate</span>
        <span aria-hidden className="transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <ul className="mt-2 overflow-hidden rounded-md border border-[#E3DAC7] bg-white shadow-sm">
        {nominationOptions.map((o) => (
          <li key={o.label} className="border-b border-[#EFE8D8] last:border-0">
            <a
              href={o.href}
              className="block min-h-12 px-4 py-3 text-left text-base text-[#14213D] hover:bg-[#F3EDE0]"
            >
              {o.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-neutral-600">
        Opens your email app with a draft to {EMAIL}. Nothing is sent until you send it.
      </p>
    </details>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FBF8F2] text-[#14213D]">
      {/* Top bar */}
      <header className="border-b border-[#E3DAC7]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Stated
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-6 text-sm text-neutral-700">
            <Link href="/principles" className="hover:text-[#14213D]">
              Stated Principles
            </Link>
            <span className="font-semibold text-[#14213D]">Business Series</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-[1.15fr_1fr] md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6420]">
            Stated | Business Series
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            Business Is Built on Decisions. Learn From the People Who Make Them.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700">
            Every business journey brings decisions, challenges, turning points, and lessons worth
            sharing.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-neutral-700">
            The Stated Business Series brings together entrepreneurs, founders, business leaders,
            investors, and industry experts to explore the thinking and experiences behind building
            businesses, leading people, navigating uncertainty, and creating lasting impact.
          </p>
          <p className="mt-5 text-base font-semibold text-[#8A6420]">
            Real Conversations. Practical Insights. Better Business Decisions.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
            <a href="#readers" className={btnPrimary}>
              Explore Business Stories
            </a>
            <a href="#participate" className={btnSecondary}>
              Nominate a Business Leader
            </a>
          </div>

          <p className="mt-8 text-sm text-neutral-600">
            In Association with{" "}
            <a
              href="https://www.credorium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#14213D] underline underline-offset-2"
            >
              Credorium
            </a>
          </p>
        </div>

        <div className="mx-auto w-full max-w-md md:max-w-none">
          <HeroIllustration />
        </div>
      </section>

      {/* What the series explores */}
      <section id="explores" className="border-y border-[#E3DAC7] bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="max-w-2xl font-serif text-3xl leading-snug">
            More Than Business Stories. Lessons That Move Business Forward.
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {themes.map((t) => (
              <li key={t.title}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E3DAC7] bg-[#FBF8F2] text-[#8A6420]">
                  <Icon name={t.icon} />
                </span>
                <h3 className="mt-4 text-base font-semibold leading-snug">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Participate + readers */}
      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-16 lg:grid-cols-2">
        <div id="participate">
          <h2 className="font-serif text-3xl leading-snug">
            Perspectives From People Building What Comes Next.
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-700">
            We welcome nominations and participation from people whose experiences, ideas, and
            decisions offer meaningful lessons for the wider business community.
          </p>
          <ul className="mt-6 space-y-2.5">
            {contributors.map((c) => (
              <li key={c} className="flex gap-3 text-neutral-800">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#B8862B]" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-l-2 border-[#B8862B] pl-4 text-sm leading-relaxed text-neutral-700">
            Participation is subject to editorial review and suitability for the series. Not every
            nomination will be selected, and payment does not guarantee editorial participation.
          </p>
        </div>

        <div id="readers">
          <h2 className="font-serif text-3xl leading-snug">Insights Grounded in Real Experience.</h2>
          <p className="mt-4 leading-relaxed text-neutral-700">
            The series aims to publish meaningful perspectives on:
          </p>
          <ul className="mt-6 space-y-2.5">
            {readerExpect.map((c) => (
              <li key={c} className="flex gap-3 text-neutral-800">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#B8862B]" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-neutral-700">
            The emphasis is on learning and useful insights, not on promoting individuals or
            companies. Conversations will be published here as they are ready.
          </p>
        </div>
      </section>

      {/* Commercial */}
      <section id="partner" className="border-y border-[#E3DAC7] bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-serif text-3xl leading-snug">Partner With the Stated Business Series.</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-neutral-700">
            The Stated Business Series offers opportunities for organisations to support meaningful
            business conversations, contribute to relevant industry discussions, and connect their
            brands with content focused on entrepreneurship, leadership, innovation, and business
            learning.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="flex flex-col rounded-xl border border-[#E3DAC7] bg-[#FBF8F2] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6420]">
                Series sponsorship
              </p>
              <h3 className="mt-2 text-2xl font-semibold">Sponsor the Series</h3>
              <p className="mt-4 leading-relaxed text-neutral-700">
                Partner with the Stated Business Series to support conversations and content
                exploring business leadership, entrepreneurship, innovation, and decision-making.
              </p>
              <p className="mt-3 leading-relaxed text-neutral-700">
                Sponsorship opportunities may include clearly identified sponsor acknowledgements,
                agreed promotional placements, and association with selected series content.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                All sponsorship opportunities are subject to discussion, audience fit, availability,
                and mutually agreed deliverables.
              </p>
              <div className="mt-auto pt-6">
                <a href={sponsorHref} className={`${btnPrimary} w-full sm:w-auto`}>
                  Discuss Sponsorship
                </a>
              </div>
            </article>

            <article className="flex flex-col rounded-xl border border-[#E3DAC7] bg-[#FBF8F2] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6420]">
                Business participation
              </p>
              <h3 className="mt-2 text-2xl font-semibold">Share Your Business Story</h3>
              <p className="mt-4 leading-relaxed text-neutral-700">
                Are you a founder, business leader, entrepreneur, or industry expert with
                experiences and insights worth sharing?
              </p>
              <p className="mt-3 leading-relaxed text-neutral-700">
                Express your interest in contributing a business story, leadership perspective,
                expert conversation, or company-focused feature. Submissions are reviewed for
                relevance, originality, and suitability.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Where applicable, separately agreed paid promotional features may be offered with
                clear disclosure. Payment does not guarantee independent editorial coverage or a
                favourable assessment.
              </p>
              <div className="mt-auto pt-6">
                <NominateMenu />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Association */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid items-center gap-6 rounded-xl border border-[#E3DAC7] bg-white/70 p-7 md:grid-cols-[auto_1fr] md:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              In Association With
            </p>
            <a
              href="https://www.credorium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-2xl font-bold tracking-tight hover:text-[#8A6420]"
            >
              Credorium
            </a>
          </div>
          <div>
            <p className="leading-relaxed text-neutral-700">
              The Stated Business Series brings forward business experiences, leadership
              perspectives, and practical insights. Its association with Credorium connects these
              conversations with a broader interest in understanding the context behind decisions.
            </p>
            <a
              href="https://www.credorium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold underline underline-offset-2"
            >
              Learn more about Credorium
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#E3DAC7] bg-[#14213D] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="font-serif text-3xl leading-snug md:text-4xl">
            Every Business Has a Story. Every Decision Has a Context.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Help bring valuable business experiences and perspectives to a wider audience.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-start">
            <div className="w-full sm:w-auto sm:min-w-[18rem]">
              <details className="group relative text-left">
                <summary className="inline-flex min-h-12 w-full cursor-pointer list-none items-center justify-between gap-3 rounded-md bg-white px-6 py-3 text-base font-semibold text-[#14213D] hover:bg-[#F3EDE0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8862B] [&::-webkit-details-marker]:hidden">
                  <span>Nominate or Participate</span>
                  <span aria-hidden className="transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <ul className="mt-2 overflow-hidden rounded-md bg-white text-[#14213D]">
                  {nominationOptions.map((o) => (
                    <li key={o.label} className="border-b border-[#EFE8D8] last:border-0">
                      <a href={o.href} className="block min-h-12 px-4 py-3 hover:bg-[#F3EDE0]">
                        {o.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
            <a
              href={sponsorHref}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white px-6 py-3 text-base font-semibold text-white hover:bg-white hover:text-[#14213D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8862B]"
            >
              Discuss Sponsorship
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-sm text-white/75">
            These buttons open a pre-written email to{" "}
            <a href={`mailto:${EMAIL}`} className="underline">
              {EMAIL}
            </a>
            . If your email app does not open, write to us at {EMAIL} and mention the subject: “
            {NOMINATION_SUBJECT}” or “{SPONSOR_SUBJECT}”. An enquiry is received only once you send
            the email.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FBF8F2]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 text-sm text-neutral-700 md:grid-cols-3">
          <div>
            <p className="text-base font-bold text-[#14213D]">Stated Business Series</p>
            <p className="mt-1">In Association With Credorium</p>
            <p className="mt-3 italic">
              Real Conversations. Practical Insights. Better Business Decisions.
            </p>
          </div>
          <ul className="space-y-2">
            <li>
              Credorium:{" "}
              <a
                href="https://www.credorium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                www.credorium.com
              </a>
            </li>
            <li>
              Business Series:{" "}
              <a href={URL} className="underline">
                app.stated.in/business
              </a>
            </li>
            <li>
              Enquiries:{" "}
              <a href={`mailto:${EMAIL}`} className="underline">
                {EMAIL}
              </a>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="underline">
                Stated home
              </Link>
            </li>
            <li>
              <Link href="/principles" className="underline">
                Stated Principles
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
