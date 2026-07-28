import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "deacon-kennedy-sserugo";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Deacon Kennedy Sserugo — Ending Period Poverty, One Girl at a Time";
const DESCRIPTION =
  "Everything spoken of being wrong should be formalized for the masses to learn. Six principles from the founder of Kennedy Development Foundation and Pad Aid Uganda.";
const IMAGE = "https://app.stated.in/kennedy-portrait.jpg";

export const metadata: Metadata = {
  title: `${TITLE} | Stated Principles`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Stated",
    type: "article",
    images: [{ url: IMAGE, width: 896, height: 1195, alt: "Deacon Kennedy Sserugo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

const principles = [
  {
    number: "01",
    title: "Stand With the One in Need",
    quote: [
      "The fact that the world is full of conflicts, life imbalances, and a few concerned persons made me stand out. And yet, looking at all this, everything targets the woman and child, more so the girl child.",
    ],
    whatThisMeans:
      "He traces his life's work back to a simple observation: in a world full of conflict and imbalance, it's women and children — especially the girl child — who bear the weight of it. That observation became a calling.",
    whyItMatters:
      "Most missions start with a grievance or an ambition. His started with noticing who was left carrying the imbalance, and deciding to stand there instead of looking away.",
    reflect:
      "Where have you noticed an imbalance that everyone accepts as normal, simply because no one is standing there to challenge it?",
  },
  {
    number: "02",
    title: "Understand Life, Then Empathize, Then Serve",
    quote: [
      "Stephen King's principle — get busy living, or get busy dying — has always given me sleepless nights. Along with that, I've always observed: first, understanding the reality of life. After understanding life deeply, then empathy comes in. Then, serving with integrity. And lastly, adaptability.",
    ],
    whatThisMeans:
      "He lays out a deliberate sequence, not a list to pick from — understanding comes before empathy, empathy before service, and adaptability holds the whole thing together when circumstances change. Skip a step, and the ones after it don't hold.",
    whyItMatters:
      "It's easy to lead with good intentions and skip straight to \"serving.\" His order insists that real service is built on first understanding the reality someone is actually living in — not the reality you assume they're living in.",
    reflect:
      "The next time you want to help someone, which step are you tempted to skip — understanding their reality, or genuine empathy — on the way to just doing something?",
  },
  {
    number: "03",
    title: "From Teaching ABCs to Breaking the Silence on Menstruation",
    quote: [
      "My work spans from teaching ABC to the most feared subject: menstruation. Kennedy Development Foundation (KDF) was birthed in 2016. In 2024, KDF birthed Pad Aid Uganda (PAU), specifically for Water, Sanitation and Hygiene (WASH), and Sexual and Reproductive Health and Rights (SRHR) programs.",
      "In 2022, KDF rescued two teenage girls from child traffickers.",
      "In 2024, KDF with PAU launched efforts to end period poverty in Uganda's primary schools. Ten primary schools and two NGOs were reached with sanitary pads and menstrual health education (MHE). A total of over 1,000 girls and boys were impacted. As a result, the efforts were recognized by a Swiss organization, One Million Youth Action Challenge (1MYAC) — our End Period Poverty/Shame initiative was named the Best Action of the Month for January 2025 by 1MYAC, and a blog about it was published on the 1MYAC website.",
      "In 2025, PAU, through its project Mitigation of Period Poverty Among Female Inmates, reached 50 female inmates in Sembabule District Central Prison with its services.",
      "Also in 2025, KDF opened a Skilling Center as part of its youth development work, offering TVET courses to youth who are out of school.",
      "My community service has also opened international doors for me. I am happy — though not proud — to be affiliated with sound international organizations, and it's still going on.",
    ],
    whatThisMeans:
      "He deliberately calls menstruation \"the most feared subject\" — naming, directly, the silence his work has had to push against. From that starting point, KDF and PAU grew into rescue work, WASH and SRHR programs, prison outreach, and vocational skilling — each one a response to a gap he saw.",
    whyItMatters:
      "The phrase \"happy, though not proud\" is worth sitting with. He separates satisfaction in the work from ego about it — recognition became a byproduct of the mission, not the point of it.",
    reflect:
      "Is there a subject in your own community that's treated as too awkward or too feared to talk about openly — one that's quietly costing people because of the silence around it?",
  },
  {
    number: "04",
    title: "Naming What's Wrongly Called Wrong, and What's Wrongly Called Right",
    quote: [
      "First: stereotypes — things believed to be wrong, bad, or disgusting, yet in reality they are not. A good example is menstruation.",
      "Second is the opposite of the first: things taken to be right, yet in reality they're wrong. A good example is war — a common game played by superpowers.",
      "Third: climate change. Millions of people around the world practice agriculture, but because of unbalanced weather, almost all their hard work ends up in outcries.",
      "Fourth: food insecurity. My grandparents never rode or drove — they were simple, ordinary people. But because they had enough food, they lived a good life, beyond everyone's expectations.",
      "Fifth: disease.",
      "On how individuals can contribute to lasting positive change: like the ancient writers, everyone should stand with the one in need. Everything spoken of as wrong should be formalized for the masses to learn. Everyone must engage in the food production process. And regarding war — like the ancient writers, everyone should make peace with their neighbor.",
    ],
    whatThisMeans:
      "He splits the world's biggest problems into two uncomfortable categories: things we've wrongly stigmatized (like menstruation), and things we've wrongly normalized (like war) — alongside climate change, food insecurity, and disease as the practical crises layered on top.",
    whyItMatters:
      "His answer for what to do about it stays grounded rather than abstract: stand with whoever needs it, teach openly instead of staying silent, grow food instead of just consuming it, and make peace with the neighbor in front of you rather than waiting for peace at a global scale.",
    reflect:
      "Which of his five — stereotypes, normalized wrongs, climate change, food insecurity, or disease — shows up most directly in your own community, and what's one honest thing you could do about it this year?",
  },
  {
    number: "05",
    title: "Love, Confidence, Character",
    quote: [
      "Love: love does everything, and it also avoids everything. \"Wisdom tells me I am nothing. Love tells me I am everything. Between the two, my life flows.\" — Nisargadatta Maharaj",
      "Confidence: for purposes of self-expression and facing new challenges, a youth must embrace confidence.",
      "Character: this shapes one's actions and choices. It also helps one live a peaceful life.",
    ],
    whatThisMeans:
      "Asked for three guiding principles he'd give every young person, he chose love, confidence, and character — one about how you relate to others, one about how you carry yourself, and one about who you are when no one's watching.",
    whyItMatters:
      "None of the three are achievements — they're daily practices. That's consistent with everything else he's stated: the work is in the doing, repeated, not in arriving somewhere and being done.",
    reflect:
      "Of the three — love, confidence, character — which one do you most need to practice deliberately right now, rather than assume you already have?",
  },
  {
    number: "06",
    title: "Building the Infrastructure of Dignity",
    quote: [
      "We target infrastructure development. We shall put in place schools, hospitals, rehabilitation centers, and safe spaces for children, women and youths. The efforts will eradicate poverty, illiteracy, gender-based violence, mental health illnesses, premature deaths, school dropout, unemployment, uninformed choices, malnutrition, gender discrimination, teenage motherhood, juvenile crime, child trafficking, economic disparity, and period poverty and shame.",
    ],
    whatThisMeans:
      "Asked about legacy, he answers in concrete structures, not abstractions — schools, hospitals, rehab centers, safe spaces. The long list of what those structures are meant to address is the honest scale of what he's taken on.",
    whyItMatters:
      "A legacy stated as buildings and services, rather than as a name or an award, is a legacy that can be checked — did the school get built, did the girls stay in school, did the shame around periods lift. That's accountability built into the vision itself.",
    reflect:
      "If your own legacy had to be measured in something concrete — a place, a service, a structure that outlasts you — what would you want it to be?",
  },
];

const takeaways = [
  {
    title: "Notice who's carrying the imbalance, then stand there.",
    body: "His mission began with noticing that the world's conflicts land hardest on women and the girl child — and choosing not to look away.",
  },
  {
    title: "Understand before you empathize; empathize before you serve.",
    body: "Service without first understanding someone's actual reality is service aimed at the wrong problem.",
  },
  {
    title: "Name the silence, then break it.",
    body: "Calling menstruation \"the most feared subject\" was the first step to building programs that address it directly.",
  },
  {
    title: "Separate what's wrongly stigmatized from what's wrongly normalized.",
    body: "Some things treated as shameful aren't. Some things treated as acceptable — like war — are. Telling the two apart is the starting point for change.",
  },
  {
    title: "Love, confidence, and character are daily practices, not destinations.",
    body: "The three things he'd hand to every young person are things you keep choosing, not things you eventually finish acquiring.",
  },
  {
    title: "Measure legacy in structures you can point to.",
    body: "Schools, hospitals, rehab centers, safe spaces — a legacy stated concretely is a legacy that can be held accountable.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-3xl px-6 pt-8 text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/principles" className="hover:text-neutral-900">
          Stated Principles
        </Link>{" "}
        / Deacon Kennedy Sserugo
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/kennedy-portrait.jpg"
            alt="Deacon Kennedy Sserugo"
            width={896}
            height={1195}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Deacon Kennedy Sserugo · Founder, Kennedy Development Foundation &amp; Pad Aid Uganda
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 004
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Deacon Kennedy <em>Sserugo</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Ending Period Poverty, One Girl at a Time
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Founder, Kennedy Development Foundation (KDF) &amp; Pad Aid Uganda (PAU) ·{" "}
          <a
            href="https://my-site-u99ufrtb-comradehew.wix-vibe-site.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-900"
          >
            Website
            <span className="sr-only"> (opens in new window)</span>
          </a>
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Everything spoken of being wrong should be formalized for the masses to
          learn.&rdquo;
        </blockquote>
      </header>

      {/* Stats row */}
      <section className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 border-y border-neutral-200 px-6 py-6 text-sm sm:grid-cols-4">
        <div>
          <p className="text-neutral-400">Format</p>
          <p className="font-medium">Leadership Principles</p>
        </div>
        <div>
          <p className="text-neutral-400">Read time</p>
          <p className="font-medium">8 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">6 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">July 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Community Builder",
          "Founder, KDF & PAU",
          "Period Poverty Advocate",
          "Child Protection",
          "Youth Development",
          "Palliative Care",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <a
          href="#principles"
          className="inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Read the principles
        </a>
      </div>

      {/* About */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs uppercase tracking-wide text-neutral-400">About this feature</p>
        <blockquote className="mt-4 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Deacon Kennedy Sserugo six questions. He gave us a decade of answers —
          from teaching ABCs to breaking the silence on menstruation.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Deacon Kennedy Sserugo founded the Kennedy Development Foundation (KDF) in 2016, and in
          2024 launched Pad Aid Uganda (PAU) to focus on Water, Sanitation and Hygiene (WASH) and
          Sexual and Reproductive Health and Rights (SRHR) programs. His work spans rescuing
          trafficking survivors, ending period poverty across Uganda's primary schools, reaching
          female inmates with menstrual health support, and running a Skilling Center offering
          TVET courses to out-of-school youth. His End Period Poverty/Shame initiative was named
          Best Action of the Month for January 2025 by the Swiss-based One Million Youth Action
          Challenge (1MYAC).
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Six principles · Stated by Deacon Kennedy Sserugo
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 06</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Deacon Kennedy Sserugo, stated directly
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">What this means</p>
                  <p className="mt-1 leading-relaxed text-neutral-700">{p.whatThisMeans}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Why it matters</p>
                  <p className="mt-1 leading-relaxed text-neutral-700">{p.whyItMatters}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Reflect on this</p>
                  <p className="mt-1 leading-relaxed text-neutral-700">{p.reflect}</p>
                </div>
              </div>

              <a
                href="https://app.stated.in/signup"
                className="mt-8 inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:border-neutral-900"
              >
                Create a Commitment inspired by this
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;Wisdom tells me I am nothing.
          <br />
          <em>Love tells me I am everything.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Deacon Kennedy Sserugo — Principle V, Stated
        </p>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs uppercase tracking-wide text-neutral-400">Key takeaways</p>
        <h2 className="mt-3 text-3xl font-serif">Six ideas worth carrying forward</h2>

        <ol className="mt-8 space-y-6">
          {takeaways.map((t, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-lg font-serif text-neutral-400">{i + 1}</span>
              <p className="leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{t.title}</span> {t.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h3 className="text-xl font-serif">Which principle resonates with you?</h3>
        <p className="mt-2 text-neutral-700">
          Post a commitment inspired by Deacon Kennedy Sserugo&apos;s principles. State it publicly
          — and make it real.
        </p>
        <a
          href="https://app.stated.in/signup"
          className="mt-5 inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Create a Commitment
        </a>
      </section>

      {/* Share */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-xs uppercase tracking-wide text-neutral-400">Share this feature</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            LinkedIn
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              URL
            )}&text=${encodeURIComponent(DESCRIPTION)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Twitter / X
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${DESCRIPTION} ${URL}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            WhatsApp
          </a>
        </div>
        <p className="mt-4 text-sm text-neutral-500">8 min read · 6 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-3xl px-6 py-10 text-xs text-neutral-400">
        <div className="flex flex-wrap gap-4">
          <Link href="/">Home</Link>
          <a href="https://stated.in/privacy">Privacy Policy</a>
          <a href="https://stated.in/terms">Terms of Service</a>
          <a href="https://stated.in/refund">Refund Policy</a>
        </div>
        <p className="mt-4">© 2026 Stated • Built in India for the World</p>
      </footer>
    </main>
  );
}
