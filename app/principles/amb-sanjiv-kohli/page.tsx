import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "amb-sanjiv-kohli";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Amb Sanjiv Kohli — The Capacity to Listen Is One of the Most Potent Tools of Diplomacy";
const DESCRIPTION =
  "Leadership is not about possessing authority. It will be tested around how that authority is exercised. Eight principles from nearly four decades in the Indian Foreign Service.";
const IMAGE = "https://app.stated.in/kohli-portrait.jpg";

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
    images: [{ url: IMAGE, width: 380, height: 380, alt: "Amb Sanjiv Kohli" }],
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
    title: "Value Systems Are Never Frozen",
    quote: [
      "I believe that our value systems are not frozen at any point of time. These are being continuously shaped by our experiences and learnings. There is, hence, continuous reshaping, reinforcing, and expansion of our basic personality traits. As for me, each of my assignments helped me to broaden my worldview through exposure to new environments and ideas.",
      "As an Indian diplomat, you are also representative of the idea and image of India, as perceived by the outside world. We, as Indians, are most admired when seen as a true representative of our country's cultural heritage that has always nurtured the concept of unity in diversity, as also of our civilizational values such as compassion, empathy, tolerance and human dignity.",
      "This belief has always stayed with me as a guiding principle. It is important that the conduct of every Indian reinforces the very positive perception of India.",
    ],
    whatThisMeans:
      "He starts from a premise many people resist admitting: that values aren't fixed early in life and then simply carried forward. Each posting, each new environment, kept reshaping and expanding his own worldview, not just adding to it.",
    whyItMatters:
      "His non-negotiable isn't a personal rule so much as a shared responsibility: he ties individual conduct directly to how India itself is perceived abroad, unity in diversity, compassion, tolerance, human dignity, treating every Indian representing the country, formally or not, as part of that same reputation.",
    reflect:
      "Which of your own values have genuinely been reshaped by experience, rather than simply reinforced by it?",
  },
  {
    number: "02",
    title: "The Capacity to Listen Is One of the Most Potent Tools of Diplomacy",
    quote: [
      "In my view, which can sound contrarian to many, the capacity to listen to others with patience and a constructive mindset is one of the most potent tools of diplomacy. And when it comes to dealing with diverse governments and people, our capacity to listen to them not only underlines our basic humility but also respect for their point of view, which may not be fully aligned to our own.",
      "Arrogance or indifference to the other side's sensitivities only leads to breakdown of negotiations, or at best to outcomes that will not sustain. Relationships are built through decades of hard work and incremental accumulation of goodwill. Listening to each other helps to build trust and strengthen mutual respect and understanding.",
      "In fact, all public servants need to listen more to provide the necessary level of comfort and reassurance to those who approach them for finding solutions to their grievances.",
    ],
    whatThisMeans:
      "He calls this view contrarian, which is itself worth noticing: in a field often associated with negotiating leverage and firm positions, he places patient listening, not persuasion, as the more potent tool. Respect for a viewpoint that doesn't align with your own is treated as a form of humility, not concession.",
    whyItMatters:
      "\"Relationships are built through decades of hard work and incremental accumulation of goodwill\" is a deliberately slow, unglamorous account of how trust actually forms between nations, and by extension between people, a position that resists the pull toward quick wins.",
    reflect:
      "In your own dealings with people who see things differently than you do, are you listening to understand their position, or listening for the gap where you can make your own case?",
  },
  {
    number: "03",
    title: "We Take Full Ownership of the Consequences",
    quote: [
      "We must realize that the practice of diplomacy is always confronted with challenges of all sorts, such as sovereignty and national interests, domestic political compulsions, geopolitical rivalries, shifts in alliances, ideological differences, and more. Modern media and a turbulent world order add further complexity to the tasks of diplomats.",
      "An ambassador also carries the responsibility to find a balance between the positions of the country he represents and the country he is posted in. His statements and conduct are, in a sense, under double scrutiny by the stakeholders and interest groups on both sides.",
      "India has the largest diaspora globally. The well-being and expectations of our nationals, particularly that of the most vulnerable category of unskilled and semi-skilled workers, have always been the most important part of our work. It usually is also one of the most sensitive aspects of our mandate. The embassy has no legal jurisdiction over the employer. The embassy is also generally constrained in approaching authorities other than the host foreign ministry directly.",
      "Given the multiplicity of challenges and the uncertainty that is integral to the environment in which a diplomat operates, we can all recall several instances where we had to take decisions based on our best judgement, knowing fully that we would also need to take full ownership of its consequences.",
      "Let me recall a rather recent instance. I was the High Commissioner to Tanzania during the COVID time. Tanzania was one of the many countries where a vaccination facility was not available, and there was mounting panic in the Indian diaspora. There was no direct flight to India, and transits were difficult due to different COVID-related restrictions.",
      "Our government subsequently decided to run special flights to some of these countries. However, Tanzania was not on that list, though we had over 50,000 registrations of people desperate to travel. Having been left with no official option, we decided to take upon ourselves the responsibility to negotiate sending chartered flights. We had to organize the community into groups, where the group leader would collect money directly, and the embassy would negotiate rates for booking chartered flights.",
      "We were finally able to facilitate the travel of all the registered people, at rates lower than what the government had charged for flights arranged by them directly.",
    ],
    whatThisMeans:
      "Rather than describe a single dramatic decision, he describes the structural condition every diplomat operates under: incomplete information, competing loyalties, no legal authority over the actual problem, and full ownership of whatever happens next regardless.",
    whyItMatters:
      "The Tanzania story is the clearest possible illustration of that condition. With no official pathway and 50,000 people registered, he and his team built one, organizing the diaspora into groups and negotiating charter rates directly, and it worked out cheaper than the government's own arranged flights.",
    reflect:
      "When you've been left with no official option for something that genuinely mattered, did you build an unofficial one, or wait for permission that wasn't coming?",
  },
  {
    number: "04",
    title: "The Letter of Credence Is a Privilege and an Enormous Responsibility",
    quote: [
      "There can certainly be no honour greater than representing the country in a foreign capital. The letter of credence that an ambassador carries is an official communication from the Hon'ble President to the Head of State of the receiving country, requesting the receiving government to trust everything the Ambassador says on behalf of his country, and confirming that the Ambassador has full power to speak for his home country.",
      "This document not only confers huge privilege but also entrusts you with the enormous responsibility to be the chief interlocutor for the national interests of your country. This sense of responsibility only grows with time.",
    ],
    whatThisMeans:
      "He explains the letter of credence not as a ceremonial formality but as a literal transfer of trust, a foreign government agrees, on paper, to believe whatever the ambassador says on India's behalf. That's the privilege and the weight in the same document.",
    whyItMatters:
      "\"This sense of responsibility only grows with time\" is a quiet but telling detail. He doesn't describe the weight of representing a nation as something that becomes routine with experience. It becomes heavier.",
    reflect:
      "Is there a form of trust placed in you that you've come to treat as routine, rather than as something that should still feel weighty?",
  },
  {
    number: "05",
    title: "Navigating These Challenges Requires Agility, Composure, Patience",
    quote: [
      "I touched upon the nature of challenges a diplomat needs to grapple with. I also spoke about the balance one needs to find between expectations from both sides, some of which can be competing in nature. The Ambassador needs to develop local constituencies of support in different circles, such as media, business, and think tanks.",
      "The nature and scope of these challenges also depend upon the state of bilateral relationships. Building and nurturing relationships always remains a work in progress. It is important to ensure that minor irritants are not allowed to get magnified into the possibility of a rupture of the relationship. At the same time, one cannot let noise or headlines become a distraction.",
      "Navigating these challenges requires agility, composure, patience, and laser-sharp focus on the body of shared interests and values that bind the two countries and their people. It also needs building a stake in each other's well-being, and a continuing effort to add more substance and ambition into bilateral engagement.",
    ],
    whatThisMeans:
      "Answering two questions together, on staying composed under pressure and on building trust across differences, he treats them as the same underlying skill: the discipline of not letting minor irritants become ruptures, and not letting headlines dictate the relationship's direction.",
    whyItMatters:
      "\"Building a stake in each other's well-being\" reframes bilateral relationships as something more durable than aligned interests. Interests shift with circumstance; a stake in the other side's well-being is a steadier foundation to build on.",
    reflect:
      "In a relationship, professional or personal, that matters to you, are you letting a minor irritant get magnified past its actual size right now?",
  },
  {
    number: "06",
    title: "We Are No Longer Part of the Problem. We Are Part of the Solution",
    quote: [
      "I started my diplomatic career about 38 years ago. Our country has made remarkable progress. Our increased strength and capabilities have obviously led to a qualitative change in the breadth and depth of our international engagement. Our interests extend much beyond our region.",
      "We are no longer considered as part of a problem. We are now seen as a part of the solution. The world pays attention to us because they see us as an economic powerhouse, a rising middle power with a significant military and technological muscle. This rise obviously gets reflected in the aspirations of our youth.",
      "At the same time, there are multiple headwinds and challenges that we need to overcome to achieve the goal of being a developed country. The increasing threat to world order posed by the coercive and transactional foreign policy approach of the Trump administration, the undermining of multilateralism, and the rise of China, among other factors, could seriously impact our national interests.",
      "While at the foreign policy level we are trying to safeguard our strategic autonomy by following a policy of issue-based multi-alignment, we need to build our national strength in areas of vulnerability and in sectors where we have critical dependency on other countries, particularly in areas of technology and critical inputs for our industry.",
    ],
    whatThisMeans:
      "Looking back across 38 years, he traces a shift in how the world positions India, from being treated as part of a problem to being treated as part of the solution, driven by economic weight, military and technological capability, and rising global attention.",
    whyItMatters:
      "He doesn't stop at the achievement. He names specific present-day headwinds, a more transactional and coercive global order, strained multilateralism, rising dependency in technology and critical industrial inputs, as the real work still ahead, rather than treating India's rise as a settled story.",
    reflect:
      "Where in your own field has real progress made you assume the hardest part is behind you, when the harder part may actually be what comes next?",
  },
  {
    number: "07",
    title: "Leadership Will Be Tested Around How Authority Is Exercised",
    quote: [
      "A leader needs to lead from the front. A good leader must be a team builder and an inspirational figure. Impactful leaders communicate clearly and openly. Accountability and integrity need to be their defining traits.",
      "Leadership is not about possessing authority. It will be tested around how that authority is exercised. Having said that, it is also true that leadership is a process of continuous learning and growth.",
    ],
    whatThisMeans:
      "He separates having authority from being a leader entirely. The first is a position; the second, in his account, is only proven by what someone actually does with the authority they've been given.",
    whyItMatters:
      "Ending on leadership as \"a process of continuous learning and growth,\" rather than a fixed set of traits someone either has or doesn't, keeps the definition open rather than treating leadership as something achieved once and then simply held.",
    reflect:
      "Think of the authority you currently hold, in whatever form. Would people around you say it's being tested well, based on how you're exercising it, not just on the fact that you have it?",
  },
  {
    number: "08",
    title: "Equipping India's Youth With the Knowledge, Skills and Character",
    quote: [
      "We are the most youthful nation in the world. The youth of India will have the global stage as their playfield. They will therefore be ideally placed to fulfil the unfinished agenda of securing for the country its rightful place.",
      "As a country, we need to introspect on whether we are creating the right conditions to equip them with the knowledge, skills and character to take up the responsibility that awaits them.",
    ],
    whatThisMeans:
      "Asked both for a principle to leave with young people and for a lesson he wishes he'd understood earlier, he answers with the same thought turned outward: the responsibility isn't only on the next generation to rise to the moment, it's on the current generation to ask honestly whether it's actually equipping them to.",
    whyItMatters:
      "\"Fulfil the unfinished agenda\" ties directly back to Principle 6, India seen as part of the solution rather than the problem, framing that shift as work still in progress, carried forward by the youth who inherit it rather than completed by the generation before them.",
    reflect:
      "If you're in any position to shape what the next generation inherits, whether at home, at work, or in your community, are you asking honestly whether you're equipping them, or simply expecting them to manage?",
  },
];

const takeaways = [
  {
    title: "Value systems are never frozen.",
    body: "Experience continuously reshapes, reinforces, and expands who you are. Every new environment is a chance to broaden your worldview, not just confirm it.",
  },
  {
    title: "Listening is one of the most potent tools of diplomacy.",
    body: "Respecting a viewpoint that doesn't align with your own is humility, not concession. Trust is built through decades of incremental goodwill, not single wins.",
  },
  {
    title: "Take full ownership of the consequences.",
    body: "When left with no official option, build one. With 50,000 people registered and no pathway home, that's exactly what happened.",
  },
  {
    title: "Responsibility should grow heavier with time, not lighter.",
    body: "The weight of representing something larger than yourself shouldn't become routine just because you've carried it for years.",
  },
  {
    title: "Leadership is tested by how authority is exercised, not by whether you have it.",
    body: "Possessing authority is a position. What you do with it is the actual test, repeated continuously, never finished.",
  },
  {
    title: "Ask whether you're equipping the next generation, not just expecting them to rise.",
    body: "The unfinished agenda belongs to those who inherit it, but the conditions that prepare them for it belong to those who came before.",
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
        / Amb Sanjiv Kohli
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/kohli-portrait.jpg"
            alt="Amb Sanjiv Kohli"
            width={380}
            height={380}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Amb Sanjiv Kohli, IFS · Nearly Four Decades in the Indian Foreign Service
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 010
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Amb Sanjiv <em>Kohli</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          The Capacity to Listen Is One of the Most Potent Tools of Diplomacy
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Former High Commissioner &amp; Ambassador · Indian Foreign Service, IFS
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Leadership is not about possessing authority. It will be tested around how that
          authority is exercised.&rdquo;
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
          <p className="font-medium">9 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">8 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">August 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Indian Foreign Service",
          "Diplomacy",
          "Former High Commissioner",
          "Former Ambassador",
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
          &ldquo;We asked Amb Sanjiv Kohli nine questions. He gave us nearly four decades of
          representing India across different capitals and circumstances.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Amb Sanjiv Kohli, IFS, began his diplomatic career about 38 years ago and has
          represented India in roles including High Commissioner and Ambassador, across regions
          and circumstances ranging from routine bilateral relationship-building to a pandemic
          that left tens of thousands of Indian nationals stranded with no direct way home.
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
          Eight principles · Stated by Amb Sanjiv Kohli
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p, idx) => (
            <div key={p.number}>
              <article className="border-t border-neutral-200 pt-10">
                <p className="text-sm text-neutral-400">{p.number} of 08</p>
                <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

                <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                  {p.quote.map((para, i) => (
                    <p key={i} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </blockquote>
                <p className="mt-3 text-sm text-neutral-500">
                  — Amb Sanjiv Kohli, stated directly
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
                    &ldquo;We decided to take upon ourselves
                    <br />
                    <em>the responsibility to negotiate.</em>&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    Amb Sanjiv Kohli — Principle III, Stated
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
          &ldquo;We are no longer considered as part of a problem.
          <br />
          <em>We are now seen as a part of the solution.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Amb Sanjiv Kohli — Principle VI, Stated
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
          Post a commitment inspired by Amb Sanjiv Kohli&apos;s principles. State it publicly —
          and make it real.
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
        <p className="mt-4 text-sm text-neutral-500">9 min read · 8 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
