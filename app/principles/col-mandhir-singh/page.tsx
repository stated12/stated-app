import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "col-mandhir-singh";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Colonel Mandhir Singh — Soldier. Patriot. Nation First.";
const DESCRIPTION =
  "Army was never a career for me. It was a way of life. Six principles from a 35-year Indian Army veteran on duty, patriotism, accountability, and putting the nation above all.";
const IMAGE = "https://app.stated.in/mandhir-portrait.jpg";

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
    images: [{ url: IMAGE, width: 1080, height: 1091, alt: "Colonel Mandhir Singh" }],
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
    title: "Duty Was Never a 9-to-5",
    quote: [
      "Army was NEVER a career for me. It was a Way of Life; it was Patriotism; it was Love for my Nation and all my Indian Brethren, it was providing Natural Justice to my countrymen, it was the safety and well being of our Nation and its inhabitants, who were all my Brother & Sisters. Every Act, every Operation or Activity I carried out so long as I was in the Army, I felt I was contributing to making my Nation more secure and conducive for growth in some way.",
      "\"Duty\" meant doing what was required to be done and expected out of you, sincerely, honestly and with the sole view of achieving the objective in whatever we did; it was never an eight-hour, 9-to-5 concept. It was the fulfilment of the task entrusted to you and taking it to its logical conclusion; it was clearing my desk before I left office; it was doing the task allocated to me within the time period allotted to me.",
      "Duty to me was Commitment; to me it was Life or Death; to me it was the well being of my Nation and its citizens and the troops under my Command. To that extent, an order was only a mission; how I had to execute it was for me to decide, the sole aim was to achieve the objective, whatever it may be — Administrative or Operational. I was a Committed and Serious Soldier and I always took my task very seriously and to the best of my abilities, keeping in view the tenets of the Chetwodian Motto.",
      "People, seniors, bosses NEVER mattered to me, because to me none was more important than the Nation and the men I commanded. The fulfilment and proper planned execution of the task at hand was always paramount. It was Nation above all, always and every time. Honour, integrity and setting the right examples for my subordinates to follow was always paramount. I always focused on training my men, because loss of lives of my men was not acceptable to me, and I always believed in leading by example from the front.",
    ],
    whatThisMeans:
      "For Colonel Singh, duty was never about the clock or the chain of command — it was a personal commitment that outlasted any single order. An order gave him the mission; how to execute it, and how seriously to take it, was his own to decide.",
    whyItMatters:
      "This is a definition of duty built on ownership, not obedience. Finishing what's entrusted to you, training the people under you so they come home safe, and closing the loop before you walk away — that standard translates far beyond a uniform.",
    reflect:
      "Where in your own work do you treat a task as \"finished\" the moment it's handed off, rather than seeing it through to its logical conclusion?",
  },
  {
    number: "02",
    title: "A Patriot Acts, Doesn't Show",
    quote: [
      "Patriotism is a FEELING. It is something which is beyond slogans, symbolism or political allegiance; these have nothing to do with it. In fact a patriot will ACT, not SHOW.",
      "You get goosebumps when the National Anthem is sung and you spring to attention. You get agitated when anyone talks ill about your Nation. You get irritated by illegal, immoral or unethical activities. When you see injustice in any form and stand with the RIGHT rather than the STRONG — a true patriot will stand with the underdog, if the underdog is right.",
      "Patriotism is not being a conformist but having the courage of conviction to stand for what is right. It is having the ability to think out of the box for the growth, progress and prosperity of the nation.",
      "A true patriot will work towards uniting the nation rather than dividing it on any lines, because he understands that united we stand, divided we fall. A true patriot will consider all his countrymen to be equal and will work to help the poor, needy and the weaker sections of society, so as to enable them to get their legitimate rights. Be a SERVER, not a RULER.",
      "A true patriot will be a disciplined, law-abiding citizen who respects the law of the land, and should be prepared to contest wrong wherever it is found. Genuine love for the Nation is when you place Nation above all and are prepared to stand for what is right for the Nation.",
    ],
    whatThisMeans:
      "He draws a hard line between patriotism as a public performance and patriotism as a private, daily discipline. The test he offers isn't what you say on a particular day — it's what irritates you, what you're willing to stand up for, and who you're willing to stand beside.",
    whyItMatters:
      "\"Be a server, not a ruler\" and the choice to stand with the right rather than the strong are the same idea from two directions — patriotism, in his account, is measured by how you treat the people with the least power, not by how loudly you display loyalty to the nation.",
    reflect:
      "By his test — reacting to injustice, standing with the underdog when they're right, refusing to just conform — where does your own patriotism show up in action rather than symbolism?",
  },
  {
    number: "03",
    title: "Conscience Over Convenience",
    quote: [
      "My upbringing, prioritization, ideology and outlook towards life was so aligned that my priorities were clear and my family understood it; so I did not really have to face a major conflict of that kind. I always followed the dictum that \"Right is Right & Wrong is Wrong, and one must have the courage of conviction to stand for what is right and true, whatever be the consequences.\"",
      "Yes, there were situations when I did rub seniors the wrong way. But I have no regrets, for my conscience was clear, and I always ignored the implications and moved on. It became my reputation in the units and places I served. I always followed the principles of hard work, sincerity and doing what is right rather than making compromises that would be against my conscience.",
      "I was goal-oriented, and the focus was always towards the attainment of the task entrusted to me. Conscientiousness was my trademark, and I follow it till date. I always gave the advice I felt was right and once the matter was thrashed out, I let the Commander on the spot take the decision at his peril — but I always gave the advice my conscience told me was right, whether someone liked it or accepted it or not, because that was not my prerogative. My prerogative was to always give unbiased, true, conscientious advice that I could justify.",
    ],
    whatThisMeans:
      "He separates two things many leaders blur together: giving the right advice, and being obeyed. His job, as he saw it, was to say what his conscience told him was true — not to control what happened after. That distinction let him speak plainly to seniors without needing to win the argument.",
    whyItMatters:
      "Reputation built on conscientiousness rather than compliance is slower to build and harder to shake. He describes carrying no regrets from the moments that cost him standing with a senior — because the measure he used wasn't whether he was liked, but whether he was honest.",
    reflect:
      "Is there advice you're currently holding back because you're focused on whether it will be accepted, rather than whether it's true?",
  },
  {
    number: "04",
    title: "Worried for the Next Generation, Hopeful in Them Too",
    quote: [
      "What concerns me is that my generation has faltered and failed in passing the right set of values and principles to the younger generation. We failed in setting the right standards and examples for them. Our generation came up the hard way, and in our quest to save them the torture of that hard life, we gave them softer options — and in doing so, we left many of them directionless.",
      "I sometimes wonder where we are headed. Even the smallest daily transactions today run purely on demand and supply, with little regard for anything beyond self-interest. So where does this lead us? Where is the ray of hope?",
      "It is the student community — Gen Next. The future belongs to them. Episodes like the NEET examination controversy have put their futures at risk, but they are also the only hope of the Nation, if they genuinely organize themselves, demand accountability from those who have failed them, and refuse to accept corruption as normal.",
      "If that happens, we can have a totally new perspective — a new hope. We have to undo, to redo. A system this deeply entrenched does not change gradually on its own; it needs the current generation to decide, collectively and decisively, that they will no longer accept it, and to build a new, cleaner standard of governance in its place.",
    ],
    whatThisMeans:
      "He holds two things at once without contradiction: real concern that his own generation softened the next one by shielding them from hardship, and genuine hope that the same generation has the conviction to build something better.",
    whyItMatters:
      "This is a rare kind of humility from someone of his rank and generation — the willingness to say \"we failed to pass this on\" rather than simply criticizing the young. The hope he places in them is earned by that honesty, not despite it.",
    reflect:
      "Where have you, without meaning to, made things easier for someone in a way that left them less prepared rather than more?",
  },
  {
    number: "05",
    title: "A Nation Weakened From Within, and How to Rebuild It",
    quote: [
      "To answer what ordinary citizens can do to strengthen morality and love for the nation, you first have to ask: what ails India? And to answer that, you have to go back to the roots of our history.",
      "India's recorded history spans over 5,000 years — from the Indus Valley Civilization, through the Vedic period, the Mauryan and Gupta empires, into the medieval era of regional kingdoms, the Delhi Sultanate, and the Mughal Empire, through nearly two centuries of British colonial rule, to Independence in 1947. Through much of that history, especially after the Gupta Empire — India's Golden Age — the subcontinent came under repeated invasion.",
      "What stands out, if you study that history honestly, is a recurring pattern: at several points where a foreign power gained a real foothold in India, it was assisted by an Indian acting out of personal or regional rivalry rather than loyalty to the wider nation — King Ambhi of Taxila submitting to Alexander, Jaichand's rivalry with Prithviraj Chauhan, Mir Jafar at Plassey, Mir Sadiq at Srirangapatna, Omichund's dealings with Robert Clive. This is not ancient history alone; the pattern of placing personal gain above national interest has continued in different forms into the modern era.",
      "I say this not to dwell on the past, but because I believe unless the current generation honestly confronts this weakness in our national character, we will keep being self-defeating, no matter how blessed our land is. Slavery, treason and corruption cannot be undone by pretending they were never part of our story.",
      "So what can ordinary citizens actually do? I believe the answer lies substantially in three priority areas: education, agriculture, and governance reform. On education — it must be treated as a true national priority, with the highest standards and the most respected, highest-integrity teachers a society can produce, so that no child's future depends only on their family's ability to pay for quality. On agriculture — India's roots are agrarian, and the farmer who feeds the nation deserves real support: the highest standards of farming, and proper cooperative systems so produce reaches customers fairly, from village to city, without the farmer being exploited along the way. This alone could resolve much of the nation's unemployment problem.",
      "On governance — the biggest change needed is making every institution answerable to the people it exists to serve, within a fixed, transparent timeframe, rather than people having to wait indefinitely on the goodwill of officials. That means political reform, so that money and individual clout matter less than public debate and merit. It means administrative reform, so that bureaucrats see their loyalty as being to the public, not only to the politicians they advise. It means judicial reform, with time-bound disposal of cases and transparent appointment of judges. And it means police reform — moving from a system built around protecting VIPs to a system built around protecting ordinary citizens, with FIRs citizens can file online rather than having to plead with a station to register their complaint.",
      "On accountability specifically: I believe even a serious accusation against someone holding public office should trigger an immediate, impartial inquiry, completed within a fixed period — no more than fifteen days — to establish whether there is a genuine case to answer. If the person is found guilty, they should be barred for life from holding public office again. But if they are found innocent, the person who made a false accusation should equally face serious consequences for the damage done to that person's character and reputation. Accountability has to run in both directions, or it isn't accountability at all — it's just a weapon.",
      "Alongside this, I believe every citizen has a role in instilling morality at a personal level — teaching children from a young age to treat every fellow Indian as family, being genuinely intolerant of corruption and adulteration in the food and essentials we all depend on, and favouring reform over pure punishment when someone does go wrong, so that a person who has erred can still return to society as a productive, contributing member rather than being written off.",
      "None of this is a quick fix. There is no set-piece solution to something as complex as nationhood. But if we are honest about where our weaknesses actually come from, and if ordinary citizens — starting with how we raise our own children, and extending to how seriously we hold our institutions to their word — decide that morality and accountability matter more than convenience, that is how a nation rebuilds its character.",
    ],
    whatThisMeans:
      "He traces India's historical vulnerability not to the strength of its invaders alone, but to a recurring pattern of individuals choosing personal or regional gain over national interest — and argues that same pattern, in modern form, is still the country's central weakness.",
    whyItMatters:
      "His proposed remedy is deliberately unglamorous: prioritise education and agriculture properly, and make every institution genuinely answerable to the people within a fixed timeframe — with accountability that protects the innocent as seriously as it punishes the guilty. No shortcuts, no single villain to blame.",
    reflect:
      "Where in your own community or workplace does the wait for accountability have no real end date? What would change if it did?",
  },
  {
    number: "06",
    title: "Serve the People, Don't Rule Them",
    quote: [
      "Every leader in any field needs to actually understand that in a democratic set-up, there is nothing known as \"a leader\" above the people. Everything starts and ends with the Nation and its Constitution.",
      "The Preamble of the Indian Constitution starts with \"We the People of India\" — which means it is the People of India who have come together to form our social set-up, and it is the People of India who are the actual owners of this Nation. It is the People who elect and select others to serve them and fulfil their aspirations. That is why every candidate and every party puts forward a manifesto — it carries the aspirations of the people they are meant to serve.",
      "The greatest tragedy is that people who are elected or selected to serve the People of India, and then empowered by the Constitution to do so, too often end up ruling the same people instead. That single reversal — service turning into rule — is, to my mind, the deepest flaw in our system, and the one most in need of correction.",
      "The lesson every civilian leader — in business, government or society — should take from military life is this: the moment you are elected or selected to serve, your duty is to the people and the mission, not to your own position or your own aspirations. Beyond a manifesto, anyone who seeks to serve the public should be willing to be held to a time-bound roadmap for what they promised, reviewed honestly and regularly by the people they serve — with real consequence if that promise is abandoned, and real credit if it's kept.",
      "NATION FIRST — ALWAYS AND EVERY TIME. No politician, no political party, no ideology and no religion matters more than that. Anything that divides the Nation must be put aside. Honesty, integrity and character should be the foundation, the bedrock, of any strong society, any nation. We must keep the highest level of integrity and treat every Indian as our parent, brother, sister or our own child, and deal with them accordingly. Corruption and the misuse of public trust should be treated with the utmost seriousness the law allows. Everyone must take their job seriously and contribute towards the growth of Indian society.",
      "Make education, healthcare and social security for citizens beyond 65 years of age a genuine national priority. Jai Hind.",
    ],
    whatThisMeans:
      "His central lesson for civilian leadership is a redefinition of the word \"leader\" itself — in a democracy, he argues, there is no one above the people; there are only those selected to serve them. The Constitution's opening words, \"We the People,\" are the whole argument.",
    whyItMatters:
      "This is the same thread running through every principle he's stated — duty as service, patriotism as action, conscience over convenience, accountability that runs both ways — brought to a single closing line: Nation First, always and every time, with honesty and integrity as its foundation.",
    reflect:
      "In whatever you lead — a team, a family, a community — do the people you're responsible for experience you as someone who serves them, or someone who rules over them?",
  },
];

const takeaways = [
  {
    title: "Duty outlasts the clock.",
    body: "Finish what's entrusted to you and take it to its logical conclusion — that standard doesn't end at 5 p.m.",
  },
  {
    title: "Patriotism is measured in action, not display.",
    body: "Slogans and symbolism are easy. Standing with the right rather than the strong, especially when it costs you, is the real test.",
  },
  {
    title: "Give honest advice; let go of whether it's accepted.",
    body: "Your prerogative is to speak the truth your conscience tells you. What happens after that isn't yours to control.",
  },
  {
    title: "Name your generation's failures honestly — then hope anyway.",
    body: "Real hope in the next generation is only credible alongside honesty about what wasn't passed down to them.",
  },
  {
    title: "Accountability has to run in both directions.",
    body: "Punish real wrongdoing swiftly — but protect the innocent from false accusations just as seriously. One without the other isn't accountability.",
  },
  {
    title: "Serve the people you lead; never rule them.",
    body: "\"We the People\" is the whole argument. Anyone entrusted with responsibility over others is there to serve them, not command them.",
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
        / Colonel Mandhir Singh
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/mandhir-portrait.jpg"
            alt="Colonel Mandhir Singh"
            width={1080}
            height={1091}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Colonel Mandhir Singh (Retd.) · Indian Army · 35+ Years of Service
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 003
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Colonel Mandhir <em>Singh</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Soldier. Patriot. Nation First.
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Second-generation Army Officer · Madras Regiment · Commando Instructor · Counter
          Terrorist &amp; Counter Insurgency Operations · Independent Director, MDI Gurgaon
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Army was NEVER a career for me. It was a Way of Life.&rdquo;
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
          <p className="font-medium">13 minutes</p>
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
          "Indian Army Veteran",
          "National Level Cricketer",
          "Commando Instructor",
          "Nation First",
          "Leadership",
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
          &ldquo;We asked Colonel Mandhir Singh five questions. He gave us thirty-five and a half
          years of answers.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          A second-generation Army officer and alumnus of a Rashtriya Military School, Colonel
          Mandhir Singh served as a frontline infantry soldier in the Madras Regiment for over 35
          years — commanding troops in operational areas across the North East and Jammu &amp;
          Kashmir, and later qualifying as a Commando Instructor in Counter Terrorist and Counter
          Insurgency Operations. A National-level cricketer in his youth, he is today also a
          Qualified Independent Director from MDI, Gurgaon.
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
          Six principles · Stated by Colonel Mandhir Singh
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
                — Colonel Mandhir Singh, stated directly
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
          &ldquo;NATION FIRST —
          <br />
          <em>ALWAYS &amp; EVERY TIME.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Colonel Mandhir Singh — Principle VI, Stated
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
          Post a commitment inspired by Colonel Mandhir Singh&apos;s principles. State it publicly
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
        <p className="mt-4 text-sm text-neutral-500">13 min read · 6 principles</p>
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
