import type { Metadata } from "next";
import Image from "next/image";
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

const STUDENT_SUBJECT = "Stated Student Voices — Student Host Expression of Interest";
const studentHref = mailto(
  STUDENT_SUBJECT,
  `Hello Stated Team,

I would like to express my interest in becoming a student host for Stated Student Voices.

Full name:
College or university:
Course or area of study:
Year of study:
City and country:
LinkedIn profile or relevant link, if available:
Why would you like to host a business leader?
Which business topics interest you?
Have you hosted or participated in interviews before? (Optional)

I understand that this is an expression of interest and that participation will depend on the programme's requirements, suitability, and available opportunities.

Thank you for considering my interest.`
);

const INSTITUTION_SUBJECT = "Stated Student Voices — Institutional Collaboration";
const institutionHref = mailto(
  INSTITUTION_SUBJECT,
  `Hello Stated Team,

I am interested in exploring a potential collaboration between my institution and Stated Student Voices.

Name:
Designation:
Institution:
Institution website:
City and country:
Brief description of the collaboration you would like to explore:

Thank you.`
);

const firstGuests = [
  {
    name: "Dr. Heera Lal Patel, IAS",
    descriptor: "Good Governance Expert | Author | Change-Maker",
    headline: "People-Centred Governance. Practical Solutions. Lasting Impact.",
    body: "A conversation on good governance, rural transformation, water conservation, climate action and community-led development.",
    photo: "/patel-portrait.jpg",
    size: 750,
    principles: { href: "/principles/dr-heera-lal-patel-ias", label: "Read his Stated Principles" },
  },
  {
    name: "Kanika Bhutani",
    descriptor: "Ethics & Compliance Leader | Governance & Risk",
    headline: "Ethics. Integrity. Accountability.",
    body: "A conversation on ethical leadership, compliance culture, responsible decision-making and building trust in organisations.",
    photo: "/kanika-portrait.jpg",
    size: 844,
    principles: null as null | { href: string; label: string },
  },
  {
    name: "Yashovardhan Jha Azad, IPS (Retd.)",
    descriptor: "Security Leader | Intelligence Professional | Former Central Information Commissioner | Champion of Accountability",
    headline: "Leadership. Accountability. A Stronger, More Informed India.",
    body: "A student-led conversation with one of India\u2019s most respected security and governance leaders on leadership, national security, accountability and building a stronger, more informed India.",
    photo: "/yashovardhan-portrait.jpg",
    size: 844,
    principles: null as null | { href: string; label: string },
  },
];

const guestCategories = [
  "Military veterans",
  "Public service leaders",
  "Business leaders",
  "Academics & professors",
  "Doctors & healthcare professionals",
  "Entrepreneurs & founders",
  "Authors & creatives",
  "Investors & venture professionals",
  "Technology & innovation leaders",
  "Legal & judicial professionals",
  "Journalists & media leaders",
  "Social entrepreneurs & non-profit leaders",
];

const disciplines = [
  "Journalism & Mass Communication",
  "Business & MBA",
  "Engineering & Technology",
  "Law",
  "Social Sciences",
  "Humanities",
  "Medicine & Healthcare",
  "Science",
  "Arts & Design",
  "Economics & Public Policy",
  "Education",
  "Agriculture & Rural Development",
];

const studentGains = [
  { title: "Conduct one-on-one interviews", body: "Hold structured conversations with distinguished professionals." },
  { title: "Build core skills", body: "Develop research, communication, and critical-thinking skills." },
  { title: "Learn from real-world experience", body: "Understand the decisions and lessons behind professional journeys." },
  { title: "Gain hands-on experience", body: "Prepare, host, and reflect on a real conversation." },
  { title: "Possible remuneration", body: "Selected student hosts may be remunerated for funded sessions, subject to programme terms." },
];

const studentSteps = [
  {
    title: "Nominate or express interest",
    body: "Students can express their interest in becoming hosts, while educators and institutions can nominate students who would benefit from the opportunity.",
  },
  {
    title: "Prepare and meet",
    body: "Selected students will be guided through guest research, question preparation, and interview planning before the conversation.",
  },
  {
    title: "Host and learn",
    body: "Students will have the opportunity to host conversations with business leaders, explore practical experiences, and share key learning points with a wider audience.",
  },
];

const studentThemes = [
  {
    title: "Entrepreneurship",
    body: "How businesses begin, grow, overcome challenges, and adapt.",
    icon: "flag",
  },
  {
    title: "Leadership",
    body: "How leaders build teams, manage responsibilities, and make difficult decisions.",
    icon: "compass",
  },
  {
    title: "Innovation",
    body: "How new ideas, technologies, and changing markets shape business.",
    icon: "bulb",
  },
  {
    title: "Lessons from experience",
    body: "What professionals learn from setbacks, uncertainty, mistakes, and achievements.",
    icon: "book",
  },
];

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
    case "book":
      return (
        <svg {...common}>
          <path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2z" />
          <path d="M12 6v14" />
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

function StudentIllustration() {
  return (
    <svg
      viewBox="0 0 380 280"
      role="img"
      aria-label="Illustration of a student interviewing a business leader"
      className="h-auto w-full"
    >
      <rect width="380" height="280" rx="20" fill="#F3EDE0" />
      <rect x="20" y="228" width="340" height="3" rx="1.5" fill="#14213D" fillOpacity="0.15" />
      {/* student (left) */}
      <circle cx="105" cy="120" r="26" fill="#14213D" />
      <path d="M62 226c0-40 18-66 43-66s43 26 43 66z" fill="#14213D" />
      <rect x="86" y="188" width="40" height="30" rx="4" fill="#FBF8F2" stroke="#B8862B" strokeWidth="2" />
      <line x1="93" y1="198" x2="119" y2="198" stroke="#B8862B" strokeWidth="2" />
      <line x1="93" y1="206" x2="113" y2="206" stroke="#B8862B" strokeWidth="2" />
      {/* leader (right) */}
      <circle cx="275" cy="120" r="26" fill="#B8862B" />
      <path d="M232 226c0-40 18-66 43-66s43 26 43 66z" fill="#8A6420" />
      <path d="M262 160l13 22 13-22" fill="#FBF8F2" />
      {/* speech bubbles */}
      <rect x="82" y="40" width="74" height="42" rx="12" fill="#FBF8F2" stroke="#14213D" strokeOpacity="0.45" />
      <path d="M110 82l8 12 6-12z" fill="#FBF8F2" stroke="#14213D" strokeOpacity="0.45" />
      <text x="119" y="68" textAnchor="middle" fontSize="22" fill="#14213D" fontFamily="Georgia, serif">?</text>
      <rect x="224" y="40" width="74" height="42" rx="12" fill="#FBF8F2" stroke="#B8862B" />
      <path d="M262 82l-8 12-6-12z" fill="#FBF8F2" stroke="#B8862B" />
      <circle cx="248" cy="61" r="3.5" fill="#B8862B" />
      <circle cx="261" cy="61" r="3.5" fill="#B8862B" />
      <circle cx="274" cy="61" r="3.5" fill="#B8862B" />
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

      {/* Coming soon: first conversations */}
      <section id="coming-soon" className="border-t border-[#E3DAC7] bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6420]">Coming soon</p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">First Conversations</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-neutral-700">
            The first guests of the Stated Business Series. Each conversation will be published here
            as it is ready.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {firstGuests.map((g, i) => (
              <li
                key={g.name}
                className={i === 2 ? "md:col-span-2 md:mx-auto md:w-full md:max-w-[calc(50%-0.75rem)]" : undefined}
              >
                <article className="flex h-full flex-col gap-6 rounded-xl border border-[#E3DAC7] bg-[#FBF8F2] p-6 sm:flex-row sm:items-start">
                  <div className="relative h-32 w-32 flex-none overflow-hidden rounded-full ring-1 ring-[#E3DAC7]">
                    <Image
                      src={g.photo}
                      alt={g.name}
                      width={g.size}
                      height={g.size}
                      className="h-32 w-32 object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="self-start rounded-full border border-[#B8862B] px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#8A6420]">
                      Coming soon
                    </span>
                    <h3 className="mt-3 text-xl font-semibold leading-snug">{g.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-600">
                      {g.descriptor}
                    </p>
                    <p className="mt-3 font-serif text-lg leading-snug text-[#14213D]">{g.headline}</p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{g.body}</p>
                    {g.principles && (
                      <Link
                        href={g.principles.href}
                        className="mt-4 inline-block text-sm font-semibold underline underline-offset-2"
                      >
                        {g.principles.label}
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stated Student Voices */}
      <section id="student-voices" className="border-t border-[#E3DAC7]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6420]">
                A Student-Led Initiative
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-snug md:text-4xl">
                Stated Student Voices
              </h2>
              <p className="mt-2 text-lg font-semibold text-[#8A6420]">
                Students Ask. Business Leaders Share. Everyone Learns.
              </p>
              <p className="mt-5 leading-relaxed text-neutral-800">
                What if students could learn directly from the people building businesses, leading
                organisations, and making important decisions?
              </p>
              <p className="mt-3 leading-relaxed text-neutral-700">
                Stated Student Voices aims to bring students and business leaders together through
                thoughtful, student-led conversations. Students will have opportunities to explore
                real business journeys, ask meaningful questions, understand the thinking behind
                important decisions, and learn from experiences that extend beyond the classroom.
              </p>
              <p className="mt-3 leading-relaxed text-neutral-700">
                The goal is simple: help students become better thinkers, more confident
                communicators, and more informed future professionals.
              </p>
            </div>
            <div className="mx-auto w-full max-w-md md:max-w-none">
              <StudentIllustration />
            </div>
          </div>

          {/* How it works */}
          <h3 className="mt-14 text-xl font-semibold">How it works</h3>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {studentSteps.map((st, i) => (
              <li key={st.title} className="rounded-xl border border-[#E3DAC7] bg-white/70 p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#14213D] text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h4 className="mt-4 text-base font-semibold">{st.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{st.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-l-2 border-[#B8862B] pl-4 text-sm leading-relaxed text-neutral-700">
            Participation will depend on guest availability, programme suitability, and selection.
            An expression of interest does not guarantee selection or a hosting opportunity.
          </p>

          {/* What students could explore */}
          <h3 className="mt-14 text-xl font-semibold">What students could explore</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {studentThemes.map((t) => (
              <li key={t.title}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E3DAC7] bg-white text-[#8A6420]">
                  <Icon name={t.icon} />
                </span>
                <h4 className="mt-3 text-base font-semibold">{t.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">{t.body}</p>
              </li>
            ))}
          </ul>

          {/* Host + guests */}
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl leading-snug">Who Can Become a Student Host?</h3>
              <p className="mt-3 leading-relaxed text-neutral-700">
                We welcome expressions of interest from curious, motivated students who want to
                learn from business leaders and develop their communication, research,
                critical-thinking, and interviewing skills.
              </p>
              <p className="mt-3 leading-relaxed text-neutral-700">
                Students from universities, colleges, business schools, entrepreneurship
                programmes, and other educational institutions may express their interest.
              </p>
              <p className="mt-3 leading-relaxed text-neutral-700">
                Prior interviewing experience is not essential. Preparation, curiosity, thoughtful
                questions, and a willingness to learn are what matter. Educators and institutions
                may also recommend students for consideration.
              </p>
              <h4 className="mt-6 text-base font-semibold">Open to students from all disciplines</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {disciplines.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-[#E3DAC7] bg-white px-3 py-1 text-sm text-neutral-700"
                  >
                    {d}
                  </li>
                ))}
                <li className="rounded-full border border-dashed border-[#B8862B] px-3 py-1 text-sm text-[#8A6420]">
                  And many more
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl leading-snug">Learn Directly From Business Leaders</h3>
              <p className="mt-3 leading-relaxed text-neutral-700">
                Conversations may feature entrepreneurs, startup founders, CEOs, senior executives,
                investors, family business leaders, technology professionals, and experts from
                diverse industries.
              </p>
              <p className="mt-3 leading-relaxed text-neutral-700">
                Each conversation will offer students an opportunity to explore the experiences,
                decisions, challenges, and lessons behind a professional journey.
              </p>
              <p className="mt-3 leading-relaxed text-neutral-700">
                The programme will develop as suitable guests and opportunities become available.
              </p>
              <h4 className="mt-6 text-base font-semibold">Perspectives students may hear from</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {guestCategories.map((g) => (
                  <li
                    key={g}
                    className="rounded-full border border-[#E3DAC7] bg-white px-3 py-1 text-sm text-neutral-700"
                  >
                    {g}
                  </li>
                ))}
                <li className="rounded-full border border-dashed border-[#B8862B] px-3 py-1 text-sm text-[#8A6420]">
                  And many more
                </li>
              </ul>
              <p className="mt-3 text-xs text-neutral-500">
                These are the kinds of professionals the programme hopes to feature. Individual
                guests are confirmed and announced separately.
              </p>
            </div>
          </div>

          {/* What students will gain */}
          <h3 className="mt-14 text-xl font-semibold">What students will gain</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {studentGains.map((g, i) => (
              <li key={g.title} className="border-t border-[#E3DAC7] pt-4">
                <span className="text-sm font-semibold text-[#8A6420]">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-1 text-base font-semibold leading-snug">{g.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{g.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-neutral-500">
            Hosting opportunities depend on guest availability, programme suitability and selection.
            Participation does not imply internships, employment, certificates or academic credit.
          </p>

          {/* CTA */}
          <div className="mt-12 rounded-xl border border-[#E3DAC7] bg-white/70 p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="text-xl font-semibold">Ready to ask the questions?</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                  Your email application will open with a draft. Your expression of interest is
                  sent only when you send the email. There is no charge to express interest, and
                  student participation is separate from sponsorship: sponsors do not control
                  student questions, conclusions or selection.
                </p>
              </div>
              <a href={studentHref} className={`${btnPrimary} w-full flex-none md:w-auto`}>
                Become a Student Host
              </a>
            </div>
          </div>

          {/* Institutions */}
          <div className="mt-6 rounded-xl border border-dashed border-[#B8862B] p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="text-xl font-semibold">Bring Student Voices to Your Institution</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                  Are you an educator, university representative, or institutional leader interested
                  in creating opportunities for students to learn directly from business leaders?
                  We welcome conversations about potential institutional collaborations, student
                  participation, and online business-learning sessions.
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-neutral-800">
                  Please share this opportunity with your students, or nominate someone who would be
                  a great fit.
                </p>
              </div>
              <a href={institutionHref} className={`${btnSecondary} w-full flex-none md:w-auto`}>
                Discuss an Institutional Collaboration
              </a>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            If your email app does not open, write to {EMAIL} with the subject “{STUDENT_SUBJECT}”
            or “{INSTITUTION_SUBJECT}”.
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
