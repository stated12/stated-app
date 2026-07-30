import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "pop-sudhir-aggarwal";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "PoP Sudhir Aggarwal — Success Lies in Making Yourself Dispensable";
const DESCRIPTION =
  "One and only one can work upon and build one's own attitude. Six principles from a CHRO whose career has spanned Sales, ERP, government business, and Deloitte.";
const IMAGE = "https://app.stated.in/sudhir-portrait.jpg";

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
    images: [{ url: IMAGE, width: 1200, height: 800, alt: "PoP Sudhir Aggarwal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pop-sudhir-aggarwal-2467964/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.11 20.45H3.56V9h3.55v11.45z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/sudhir.aggarwal.7503",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/sud_agg",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M18.9 2.25h3.3l-7.2 8.22 8.47 11.28h-6.63l-5.2-6.8-5.94 6.8H2.4l7.7-8.8L2 2.25h6.8l4.7 6.22 5.4-6.22zm-1.16 17.52h1.83L7.34 4.14H5.38l12.36 15.63z" />
      </svg>
    ),
  },
];

const principles = [
  {
    number: "01",
    title: "One and Only One Can Build One's Own Attitude",
    quote: [
      "Let me start with a disclaimer. Principles, values, and leadership are never available in the market for anyone to simply go and buy. The best and greatest institution on earth doesn't necessarily deliver people with good principles, values, and leadership. None of it has anything to do with a person's socio-economic or geo-political status.",
      "There is a saying that it is the environment in which one is born and brought up. That describes, sufficiently and elaborately, how principles, values, and leadership are built and extensively influenced by the many things happening around and across the various facets of one's life and situations.",
      "To me, a good combination of being honest to yourself, holding a positive attitude, building mutual trust and mutual respect, and being aspirational without carrying unrealistic or unreasonable expectations, is a good mantra for a successful career as a natural evolution. Still, if I need to define it in one word, I will say attitude.",
      "With a good, positive, and forward-looking attitude, one can achieve the world and make a real impact. I can work on building the skill of the people around me, not their attitude. One and only one can work upon and build one's own attitude.",
      "In my own context, trust in my leadership helped me embrace altogether out of the box, newer opportunities in my life, where every time I experienced and stepped into newer career choices to shape my journey.",
      "Likewise, trusting and mentoring the people around me, and I am deliberately avoiding the term reportee or team member, and giving them the opportunity to make decisions, has helped me build teams and organizations with a focus on continuing to work and grow irrespective of me. Success lies in making oneself dispensable rather than remaining a power center artificially.",
      "This can be seen visibly in my professional and personal life, across every facet of it.",
    ],
    whatThisMeans:
      "He locates attitude as the one thing a person builds entirely alone. You can help someone build a skill, but no one else can build your attitude for you. This distinction runs quietly under everything else he says about leadership.",
    whyItMatters:
      "\"Success lies in making oneself dispensable rather than remaining a power center artificially\" is a genuinely unusual definition of career success from someone who reached CHRO. Most people spend a career trying to become indispensable. He built his around the opposite goal.",
    reflect:
      "Are you currently building your team's skill, your own attitude, or quietly trying to make yourself indispensable instead of dispensable?",
  },
  {
    number: "02",
    title: "The Three I's: Inclusive, Informed, and Independent",
    quote: [
      "To me, it is more of a notion than a burden. Senior leadership does often require making difficult choices, but it can be a relatively simple phenomenon. The three I's, an inclusive, informed, and independent mindset, is the mantra. No rocket science.",
      "More often than not, one will find one or more of those elements missing in the thought process behind a given situation. Sometimes the missing piece isn't visible at all; it can be deep rooted in one's thinking, quietly steering a situation in a particular direction. Each of the three I's is powerful and insightful in its own right. Unlearn, learn, relearn, as a continuous process, is a must, more so in these times of disruption and transformation. People who do not change with the situation they are in really struggle and suffer.",
      "It may be worth sharing two situations to make the point.",
      "One: let me share a personal experience of what leadership means. Very early in my career, going to the USA was every IT professional's dream. I had a friend there who wanted me to join him, and I would get almost daily calls urging me to send my papers for migration. I was getting restless to be in the USA as of yesterday.",
      "Somehow, my father was not getting convinced and remained uncomfortable about supporting me. Frankly, he didn't know much about the IT industry or these migration matters, despite being a fine government official. We went through this struggle daily with no end in sight.",
      "Then he found his answer. He had me meet a cousin, an uncle figure to me, who had lived in the USA and understood migration. He simply advised me to ask my friend to process my H1 visa. I followed that advice on the very next call, and the matter was resolved.",
      "My point is this: my father had the vision and the thought process to work through the situation by identifying and connecting me to a knowledgeable person whom we both trusted completely.",
      "Two: this was when I was with an Indian multinational, tasked with building the government business from negative, not zero. I was hired as Head of Government. My good luck was that we got an early window into a large, pan India opportunity. Within a few months we had come up to speed and needed to build Sales, Pre Sales, and System Integration Delivery teams for the government business.",
      "Given my background and position at the time, it would have been relatively easy for me to grab any of these roles to lead myself. But here is where it got interesting: I chose to be an individual contributor instead, and the three roles were performed by the three best people for the job.",
      "That did not mean I became hands off. I stayed very integral to everything happening with the government business, with a shared vision and shared purpose.",
      "Most of the time, it is extremely tough to stay quiet in a government business review with the Chairman of the company, but it came naturally to me, for two key reasons: I trusted my colleagues, and I trusted myself.",
    ],
    whatThisMeans:
      "Both stories he chooses to illustrate this principle are, at their core, about trust in someone else's judgement, first his father's, then his own team's. The three I's aren't a solo mental checklist; they're tested in moments where the harder choice is to step back and let someone else lead.",
    whyItMatters:
      "Choosing to be an individual contributor rather than leading the roles himself, in a high visibility, pan India government opportunity, is a genuinely counterintuitive career move. He explains exactly why it worked: staying integral to the outcome without needing to be the one holding the title.",
    reflect:
      "Think of a role or decision you're currently holding onto because it would be \"relatively easy\" for you to lead it yourself. Would someone else actually do it better if you stepped back?",
  },
  {
    number: "03",
    title: "A Change With a Difference Has Always Excited Me",
    quote: [
      "Let me respond to the second part of the question first. The future worries me the least, and that is precisely how I have never been anxious about it. I have never allowed myself to sit in a comfort zone. I have always challenged myself and thrown myself open to newer opportunities and possibilities, including the unconventional and the diverse. Let me share some of my career shifts.",
      "I accepted a Resource Manager role focused on hiring to serve global body-shopping opportunities in the mid 1990s. Almost all my peers discouraged me, and that move turned out to be among the best of my professional career, giving me a very different visibility and flavor of career options.",
      "I stepped into the role of ERP Practice Head, having never seen an ERP screen with my own eyes. Identifying and trusting the people around me, with empathy in spirit, helped me and my teams grow. We had some genuinely unconventional experiences and engagements.",
      "I worked on and successfully delivered the recovery of company money from bleeding projects, with zero background in those projects, and did this multiple times across the organization over years. It simply required my aligned heart and soul, in service of the company's purpose.",
      "At 58, I joined Deloitte, a consulting firm, in India.",
      "At 59, I became a faculty member teaching emerging technologies such as AI, GenAI, IoT, drones, and other emerging technologies to government officers, with the Wadhwani Foundation.",
      "At 62, I became a CHRO, a 360-degree shift from the business side to HR, with a purpose.",
      "Has it ever been difficult? Never. Some of these I chose, and a few came my way.",
      "A change with a difference has always excited me. It gives me a kick. More than competing with others, challenging myself and working through that challenge is positive, progressive, and growth oriented. It has broadened my skillset, experience, expertise, perspectives, and my ability to work with people of varied profiles and personalities.",
      "Let me make an acknowledgement here, in the spirit of gratitude. HCL, and the HCL Sales organization in particular, has been instrumental in making me whatever I am today. Working with multinationals like IBM and Oracle helped shape my career and personality, with a level of professional fine tuning and maturity I am grateful for.",
      "I have also developed a formula for myself that I believe applies to anyone: 10:20:70. In today's times especially, there is so much happening around us, at a pace never imagined before. This causes anxiety and discomfort. My belief, held with conviction, is that 70 percent of the innovations and developments happening around me simply don't concern me. 20 percent, I keep myself appropriately appraised of. 10 percent is what actually matters to me, and that is what I focus on and invest in. This simple approach helps me manage my insecurities and anxieties, and keeps me focused on my purpose to stay relevant.",
    ],
    whatThisMeans:
      "His six unconventional career shifts, listed one after another, aren't a resume flex; they're evidence for his central claim that comfort is the actual risk, not change. Joining Deloitte at 58 and becoming a CHRO at 62 are not late career slowdowns in his account; they're the same pattern he started in the mid 1990s.",
    whyItMatters:
      "The 10:20:70 formula turns \"don't worry about everything\" into an actual allocation you can use: 70 percent of what's happening around you genuinely doesn't need your attention, 20 percent needs awareness, and only 10 percent deserves your real investment.",
    reflect:
      "Honestly estimate your own split right now. How much of your attention goes to the 70 percent that doesn't concern you, versus the 10 percent that actually matters to your purpose?",
  },
  {
    number: "04",
    title: "Make Yourself Dispensable, Not a Control Freak",
    quote: [
      "A positive and forward-looking attitude makes the difference in every facet of life.",
      "Know yourself, with a focus on what you are not good at, and leverage PPT, people, process, and technology, to complement and supplement that in creating the big, complete, and comprehensive picture. I hold a copyright on the term WANG@, which stands for What Am I Not Good At.",
      "Learn to know and manage your insecurities. The more you know about and manage your insecurities, the deeper you get into what I call insecurity management, a term I also hold a copyright on. This can certainly make you a different person. I am not saying a better person, simply a person with a difference.",
      "Trust yourself. People don't delegate because they believe the people around them are incompetent. An honest, deeper self-introspection can produce a fairly scary outcome: it is often a lack of conviction, confidence, or belief in oneself that holds a person back from delegating. In a larger sense, insecurities may be the root cause. This is the let-go phenomenon, easier said than done.",
      "Make yourself dispensable rather than being a control freak. This is among the truest growth mantras there is, because it produces results and outcomes on multiple fronts. It creates growth for yourself, and it creates an environment where the people around you can grow too.",
      "Focus on horizontal and vertical growth for all round maturity. Horizontal growth orientation becomes a natural evolution as people grow. As people grow, with some exceptions, their soft and behavioral side plays an increasingly larger role. Look deeper, and you'll see that leadership is really about soft skills and behavior. A Manager – Always a CEO is another one of my copyrighted lines.",
      "Have the courage to own your mistakes, acknowledging them sooner rather than later, and give credit to your team. Never delay or shy away from acknowledging good work, because it helps build togetherness and a relationship built on trust. Never compete with your own team members in any manner; that can be among the biggest foul plays there is.",
      "Mutual trust, and mutual respect.",
    ],
    whatThisMeans:
      "This is the most concrete, almost checklist-like of his six answers, and deliberately so: know your own gaps (WANG@), manage your own insecurities, trust yourself enough to delegate, and make yourself dispensable rather than a control freak. Each step depends on the one before it.",
    whyItMatters:
      "His observation about delegation is sharp: people rarely fail to delegate because their team is incompetent. They fail to delegate because of their own lack of conviction or confidence, which he traces straight back to unmanaged insecurity. That reframes a common management complaint as a personal one.",
    reflect:
      "The next time you catch yourself not delegating something, ask honestly: is it really about your team's competence, or your own insecurity about letting go?",
  },
  {
    number: "05",
    title: "Find Your Guru and God in Your Parents",
    quote: [
      "My personal belief, one I have lived by throughout my life with zero exception, is this: find your guru and your god in your parents.",
      "Do what you like, love what you do, do what suits you, and be expressive without living under the influence of other people's opinions or points of view.",
      "Very humbly, and feeling even more humbled saying this, I am a family values person. All my life, I have tried working with the people around me, offering my two bits selflessly, whatever I could, in whatever manner I had to offer it. Any response otherwise has never discouraged me or diverted me from my fundamentals.",
      "Have gratitude in life towards anyone, everyone, and anything. Give credit to the people who have been kind to you, or who have done or delivered something for you in whichever way. It matters to name them when sharing their contribution, even if they are no longer around.",
      "Zero expectations. Lately in my life, I have been practicing, on a best effort basis. Engaging with zero expectations, meaning I don't expect that things will happen my way, or that people will follow my advice or suggestions. Life is not about my way or the highway. There may be many reasons behind people's actions and reactions in any given situation; I leave that to their own self-introspection and their own actions.",
      "I have always tried to give space to people, whether younger, elder, or peer, in various situations, by not struggling to be seen or visible, believing instead that your efforts speak louder than being seen.",
      "I have learned to extend my relationships to the people around me, as required or as I have wished to. This has helped me build a long-lasting legacy in an institutionalized way.",
      "More than a few people have told me that I am a blessed person, that nothing wrong happens to people like me who have not wronged anyone in their personal life. This despite having gone through professional redundancies twice, survived a brain stroke, and even delivered some genuinely tough decisions as part of my professional responsibilities.",
      "Be honest to yourself.",
    ],
    whatThisMeans:
      "Asked about legacy, he answers first with parents, not career. The line \"find your guru and your god in your parents\" is presented as something lived with zero exception, and everything else in this answer, gratitude, zero expectations, giving people space, flows from that same root.",
    whyItMatters:
      "He names his hardest chapters plainly, two redundancies and a brain stroke, immediately after describing himself as blessed. That's not a contradiction in his account; the resilience others noticed in him came alongside the hardship, not instead of it.",
    reflect:
      "Whose credit have you meant to name publicly but haven't gotten around to yet, especially someone who may no longer be around to hear it?",
  },
  {
    number: "06",
    title: "Be Yourself",
    quote: [
      "Be yourself.",
      "It is crucial and significant to know yourself and love yourself in an ever evolving, fast changing world like never before. It is good to be inspired by the people and events around you, but contextualise that inspiration for yourself, within your own abilities, capabilities, and competencies.",
      "Knowing yourself is among the biggest challenges there is, because people do not connect with themselves, do not speak with themselves, do not analyse themselves, and most of the time are not honest with themselves. Most times, people live in denial mode.",
      "Beware: don't be mad about yourself, and don't be self-obsessed.",
      "Those who know me, even a little, will vouch for everything I have articulated and narrated above.",
    ],
    whatThisMeans:
      "His one guiding principle for the world closes the loop on everything before it: attitude, the three I's, dispensability, gratitude, all of it depends on actually knowing yourself first, which he calls one of the hardest things a person can do.",
    whyItMatters:
      "He draws a careful line between self-knowledge and self-obsession. Knowing and loving yourself is the goal; being mad about yourself is the failure mode. The two are easy to confuse, and he names the difference explicitly rather than leaving it implied.",
    reflect:
      "When did you last actually speak honestly with yourself, rather than simply going along with your own assumptions about who you are?",
  },
];

const takeaways = [
  {
    title: "You can build someone's skill. Only they can build their own attitude.",
    body: "Attitude is the one thing that has to be self-authored. Everything else can be taught, mentored, or delegated.",
  },
  {
    title: "The three I's: inclusive, informed, independent.",
    body: "Difficult choices become simpler when you check whether your thinking is inclusive, informed, and independent, rather than missing one or more of the three without realizing it.",
  },
  {
    title: "Comfort is the real risk, not change.",
    body: "Six career shifts across four decades, including joining Deloitte at 58 and becoming a CHRO at 62, all came from the same instinct: never sit in the comfort zone.",
  },
  {
    title: "Make yourself dispensable, not a control freak.",
    body: "Failing to delegate is rarely about your team's competence. It's usually about your own unmanaged insecurity.",
  },
  {
    title: "Find your guru and your god in your parents.",
    body: "Legacy starts at home. Gratitude, zero expectations, and giving people space all flow from that same root.",
  },
  {
    title: "Know yourself without becoming obsessed with yourself.",
    body: "Self-knowledge and self-obsession look similar from a distance. He treats them as opposites, not neighbours.",
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
        / PoP Sudhir Aggarwal
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/sudhir-portrait.jpg"
            alt="PoP Sudhir Aggarwal"
            width={1200}
            height={800}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          PoP Sudhir Aggarwal · CHRO and Director, Digital Transformation · Orbit Techsol India
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 007
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          PoP Sudhir <em>Aggarwal</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Success Lies in Making Yourself Dispensable
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          CHRO and Director, Digital Transformation, Orbit Techsol India · Formerly HCL, IBM,
          Oracle, Sify Technologies, Thomson Reuters, Microsoft, Deloitte, and Wadhwani Foundation
        </p>

        {/* Social links - standout treatment */}
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
            >
              {s.icon}
              {s.label}
              <span className="sr-only"> (opens in new window)</span>
            </a>
          ))}
        </div>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;One and only one can work upon and build one&apos;s own attitude.&rdquo;
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
          <p className="font-medium">10 minutes</p>
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
          "CHRO",
          "Digital Transformation",
          "Insecurity Management™",
          "People Leadership",
          "Attitude",
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
          &ldquo;We asked PoP Sudhir Aggarwal six questions. He gave us a career built on
          becoming dispensable, on purpose.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          PoP Sudhir Aggarwal is CHRO and Director, Digital Transformation at Orbit Techsol
          India. His career has moved through HCL, IBM, Oracle, Sify Technologies, Thomson
          Reuters, Microsoft, Deloitte, and Wadhwani Foundation, across roles as varied as
          Resource Manager, ERP Practice Head, Head of Government business, faculty member
          teaching emerging technologies with the Wadhwani Foundation, and finally CHRO, a shift
          he took on at 62. He holds copyrights on the terms WANG@ (What Am I Not Good At),
          Insecurity Management, Soft Skills Leads to Wisdom, and A Manager – Always a CEO.
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
          Six principles · Stated by PoP Sudhir Aggarwal
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p, idx) => (
            <div key={p.number}>
              <article className="border-t border-neutral-200 pt-10">
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
                  — PoP Sudhir Aggarwal, stated directly
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

              {idx === 2 && (
                <div className="mt-20 border-t border-neutral-200 pt-16 text-center">
                  <p className="text-3xl font-serif leading-snug">
                    &ldquo;A change with a difference
                    <br />
                    <em>has always excited me.</em>&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    PoP Sudhir Aggarwal — Principle III, Stated
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;Find your guru
          <br />
          <em>and your god,</em>
          <br />
          in your parents.&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          PoP Sudhir Aggarwal — Principle V, Stated
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
          Post a commitment inspired by PoP Sudhir Aggarwal&apos;s principles. State it publicly
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
        <p className="text-xs uppercase tracking-wide text-neutral-400">Connect with him</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
            >
              {s.icon}
              {s.label}
              <span className="sr-only"> (opens in new window)</span>
            </a>
          ))}
        </div>

        <p className="mt-8 text-xs uppercase tracking-wide text-neutral-400">
          Share this feature
        </p>
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
        <p className="mt-4 text-sm text-neutral-500">10 min read · 6 principles</p>
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
