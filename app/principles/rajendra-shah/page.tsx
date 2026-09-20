import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "rajendra-shah";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Rajendra Shah — Creating Platforms. Building Leaders. Changing Lives.";
const DESCRIPTION =
  "The right people will have the right products and services, and not the reverse. Sixteen principles on education, mentorship, and building trust before transactions.";
const IMAGE = "https://app.stated.in/shah-portrait.jpg";

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
    images: [{ url: IMAGE, width: 1254, height: 1254, alt: "Rajendra Shah" }],
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
    title: "I Always Thought My Ideas Should Benefit Me Too",
    quote: [
      "In the corporate world, I was in the sales and marketing arena, working with national and international companies of repute. I was handling the dealer and distributor network across the locations I was entrusted with. I was designing schemes to enhance sales and market share.",
      "Because of my schemes, dealers and distributors were benefiting, financially and otherwise. So I always thought my ideas should benefit me too, financially and otherwise. Therefore, I decided to get into something of my own.",
    ],
    whatThisMeans:
      "He traces his move into entrepreneurship back to a straightforward observation: the schemes he designed were creating financial benefit for dealers and distributors, and he wanted the ideas he was generating to benefit him the same way.",
    whyItMatters:
      "He doesn't dress up the decision as a grand calling. It's a plain, honest account of someone recognising the value of their own thinking and deciding it deserved to build something of his own, rather than only building value for others.",
    reflect:
      "Are there ideas you're currently generating for someone else's benefit that you've never seriously considered building for yourself?",
  },
  {
    number: "02",
    title: "Everyone Was Entering Education, and I Saw My Opening",
    quote: [
      "Being in field sales, I was observing different industries in the year 2002. Around that time, so many corporates were entering the education space. They were setting up schools or colleges, helping them directly or indirectly.",
      "That's when I thought of getting into the education space.",
    ],
    whatThisMeans:
      "His entry into education wasn't built on a lifelong passion for teaching; it came from watching the market in 2002 and noticing where corporates were moving. He treats that observation as a legitimate and sufficient reason to act.",
    whyItMatters:
      "Being honest about a practical, market-driven entry point, rather than manufacturing a more inspirational origin story, is its own kind of transparency, especially in a field so often described in purely mission-driven terms.",
    reflect:
      "Is there a decision in your own path that you've quietly rewritten into a more inspiring story than the practical reason that actually drove it?",
  },
  {
    number: "03",
    title: "My Journey Has Built Me as a Person",
    quote: [
      "My entire journey has built me as a person, personally and professionally. In both my roles, I was virtually meeting people across different geographies. That has changed me completely as a person, in terms of my thoughts, attitude, personality, thinking, planning, and more.",
    ],
    whatThisMeans:
      "He credits the sheer breadth of people met across geographies, not a single mentor or event, as the actual mechanism of his own transformation, changing not just what he knows but how he thinks and plans.",
    whyItMatters:
      "Naming thoughts, attitude, personality, thinking, and planning separately suggests this wasn't one shift but many small, compounding ones across years of exposure to different people and places.",
    reflect:
      "Which of your own roles has exposed you to the widest range of people, and how has that breadth actually changed the way you think, not just what you know?",
  },
  {
    number: "04",
    title: "Education Finally Builds Character",
    quote: [
      "Education finally builds character in a person. It teaches life lessons to students. It creates personality and employability in a person. Finally, it prepares one for life and life's challenges.",
    ],
    whatThisMeans:
      "He lists character, life lessons, personality, and employability as a sequence, not a list of equal alternatives, treating employability as the last and most practical output of a process that starts with something deeper.",
    whyItMatters:
      "Placing character before employability pushes back against a purely transactional view of education as job preparation, while still taking employability seriously as a genuine and necessary outcome.",
    reflect:
      "In your own view of education, whether for yourself or someone you're raising or mentoring, which comes first in your actual priorities: character or employability?",
  },
  {
    number: "05",
    title: "A Child Who Performs Academically Does Not Necessarily Perform in Real Life",
    quote: [
      "A child who performs academically does not necessarily perform well in real life. Therefore, I have always done skills and competencies assessments that actually check the life skills that eventually matter after school or college.",
    ],
    whatThisMeans:
      "He separates academic performance from real-life performance as two genuinely different measures, and describes building his own assessment practice specifically to check for the second one, since the first doesn't reliably predict it.",
    whyItMatters:
      "Choosing to measure life skills rather than relying on academic results alone is a practical response to a gap he clearly believes is real and consequential, not just a passing observation.",
    reflect:
      "If you were assessed only on life skills rather than academic or professional credentials, would the picture of your own readiness for real life look different?",
  },
  {
    number: "06",
    title: "Prepare Children for Life, Not Just for Rank",
    quote: [
      "Ideally, the school system should prepare students with the life skills that help a child live life happily, cheerfully and joyfully.",
      "If a child does not win, he learns one of life's biggest secrets, and that's accepting failure. He learns how to feel failure and move on. I often advise parents not to pressurise their child into doing certain things. Rather than chasing ranks, they should prepare their children for life, which comes after school or college.",
    ],
    whatThisMeans:
      "He treats not winning as a genuine curriculum item, not an unfortunate outcome to be minimised, but a lesson in accepting failure and moving on that a child needs exposure to as much as any academic subject.",
    whyItMatters:
      "His advice to parents, to stop chasing ranks and instead prepare children for the life that comes after school, is a direct, practical instruction rather than an abstract philosophy, aimed at changing what parents actually pressure their children to do.",
    reflect:
      "Are you currently preparing the young people in your life for ranks and results, or for the life that comes after the ranks stop mattering?",
  },
  {
    number: "07",
    title: "Collaboration Is What Builds Nations",
    quote: [
      "It is always collaborations, networks and communities that can build a nation. When equally competent people work as a team, they create incredible results. Countries also work collaboratively, and that benefits all nations, weak or strong.",
    ],
    whatThisMeans:
      "He scales the same principle from a team of individuals up to nations, arguing that collaboration between equally competent parties produces results that benefit everyone involved, regardless of relative strength.",
    whyItMatters:
      "Explicitly including \"weak or strong\" nations in the benefit of collaboration rejects a purely competitive, zero-sum view of how organisations or countries succeed relative to one another.",
    reflect:
      "In a partnership or team you're currently part of, are you working from a genuinely collaborative mindset, or a competitive one dressed up as collaboration?",
  },
  {
    number: "08",
    title: "The Right People Will Have the Right Products, Not the Reverse",
    quote: [
      "Any partnership hinges on trust, understanding and empathy. I have always focused more on people and less on products. The right people will have the right products and services, and not the reverse.",
      "Being a connector is intelligent and diligent work. You get to know people as they are. In the process, you become a better version of yourself.",
    ],
    whatThisMeans:
      "He inverts the usual order of business thinking, where you find the right product and then the right people to deliver it. In his account, getting the people right comes first, and the right products follow from that, not the other way around.",
    whyItMatters:
      "Framing connecting people as \"intelligent and diligent work\" that changes the connector themselves treats matchmaking not as a passive service but as an active discipline with its own genuine skill and personal payoff.",
    reflect:
      "In your own work or partnerships, are you starting from the product and looking for people to fit it, or starting from the right people and letting the product follow?",
  },
  {
    number: "09",
    title: "Making the Mentee Better and Bigger Than You",
    quote: [
      "In one simple line, being a mentor means making the mentee a person better and bigger than you.",
    ],
    whatThisMeans:
      "Given the chance to define mentorship in full, he chooses a single sentence rather than an elaborated philosophy, with the explicit standard being that the mentee should surpass the mentor, not simply learn from them.",
    whyItMatters:
      "Setting the bar at \"bigger than you\" rather than simply competent or independent is a more demanding definition of mentorship than most people would offer, one that treats being surpassed as success rather than a threat.",
    reflect:
      "By his standard, has anyone you've mentored actually become bigger than you, or have you quietly been satisfied with them staying smaller?",
  },
  {
    number: "10",
    title: "Young Generations Teach Us New Ways to Live",
    quote: [
      "Young generations always teach us new lessons and methods of living life differently.",
    ],
    whatThisMeans:
      "He reverses the usual direction of the mentorship relationship implied elsewhere in his answers, stating plainly that younger generations are also teaching him, not simply receiving what he has to offer.",
    whyItMatters:
      "This is a small but genuine admission of ongoing learning from people younger than himself, consistent with his earlier point that being a good mentor means wanting the mentee to eventually exceed you.",
    reflect:
      "What is something a younger person has taught you recently that changed how you actually live, not just what you know?",
  },
  {
    number: "11",
    title: "Being Called a Wise Connector",
    quote: [
      "According to me, my biggest achievement is schools labelling me as a wise connector.",
    ],
    whatThisMeans:
      "Asked about his biggest achievement, he doesn't point to a business milestone or a specific deal. He points to a reputation, a label other people gave him, which is a form of achievement measured entirely by how others came to see him.",
    whyItMatters:
      "Choosing a reputation over a transaction as his defining achievement is consistent with everything else he's said about prioritising people and trust over products and results.",
    reflect:
      "If you had to name your own biggest achievement using only a label other people have given you, what would it be, and is it the one you'd want?",
  },
  {
    number: "12",
    title: "Failures Made Me Wiser and More Cautious",
    quote: [
      "Many of my collaborations with companies have not worked well; rather, they failed miserably. That has made me wiser and more cautious.",
    ],
    whatThisMeans:
      "He states his failures plainly, without minimising them as merely difficult or complicated, using the word \"miserably\" rather than softening the description, before naming exactly what he took from them: wisdom and caution.",
    whyItMatters:
      "Naming caution as a direct outcome of failure, not just wisdom in the abstract, suggests these collaborations changed how he actually screens future partnerships, not only how he thinks about the past ones.",
    reflect:
      "What is a failure you've had that made you genuinely more cautious in a specific, practical way, rather than just wiser in the abstract?",
  },
  {
    number: "13",
    title: "Every Relationship Evolves With Time",
    quote: [
      "There's nothing as such. Every business, network, partnership or relationship evolves with time.",
    ],
    whatThisMeans:
      "Asked whether a specific belief of his had changed over time, his answer reframes the question itself: change isn't the exception that needs explaining, it's the constant condition of every business relationship and partnership.",
    whyItMatters:
      "Treating evolution as the default state, rather than something that only happens to beliefs that turn out to be wrong, removes any embarrassment from the fact that his own views have shifted over the years.",
    reflect:
      "Which of your own long-standing business or personal relationships have you assumed were static, when they've actually been quietly evolving the whole time?",
  },
  {
    number: "14",
    title: "Value Education Should Be Free Across the Entire Chain",
    quote: [
      "Value education should not be charged to students. It should be free across the entire supply chain: the creators, publishers, distributors, schools, and so on.",
    ],
    whatThisMeans:
      "Asked what should never be reduced to a commercial transaction, he names value education specifically, and extends that principle across the entire chain that delivers it, not just the final point of contact with the student.",
    whyItMatters:
      "Naming creators, publishers, distributors, and schools all together treats commercialisation as a risk at every link in the chain, not only at the point where a parent or student might be charged directly.",
    reflect:
      "Is there something in your own field that you believe should never be commercialised, and are you certain that belief holds at every point in the chain, not just the most visible one?",
  },
  {
    number: "15",
    title: "Creating Platforms, Building Leaders, Changing Lives",
    quote: [
      "Creating platforms and communities builds more mentors and leaders, who eventually change the lives of the people connected. It's a spiral that always works.",
    ],
    whatThisMeans:
      "He describes a specific mechanism, not just a hope, for how impact compounds: platforms produce mentors and leaders, who then change the lives of people connected to them, creating a spiral rather than a one-time effect.",
    whyItMatters:
      "Calling it \"a spiral that always works\" is a strong, confident claim built from direct experience rather than theory, consistent with someone whose own achievement was other people's word of mouth rather than a personal title.",
    reflect:
      "Have you built or joined anything in your own life that functions as this kind of spiral, where the platform itself keeps producing new mentors and leaders beyond your direct involvement?",
  },
  {
    number: "16",
    title: "What I Wish Someone Had Shown Me Then",
    quote: [
      "If there was someone, either at school or at college level, who could show me a career path based on my own SWOT analysis, things could have been better and different today.",
    ],
    whatThisMeans:
      "Asked what he wishes he'd understood earlier, he doesn't point to a specific skill or decision. He points to the absence of a person, someone who could have used a genuine assessment of his own strengths and weaknesses to help him choose a path.",
    whyItMatters:
      "This closing reflection connects directly back to Principle 5, his belief in assessing real skills and competencies rather than relying on academic performance alone. His own career might have taken a different shape if that kind of assessment had been available to him personally.",
    reflect:
      "If you had access to a genuine SWOT analysis of yourself at school or college age, guided by someone who could act on it, what might you have done differently?",
  },
];

const takeaways = [
  {
    title: "The right people will have the right products, not the reverse.",
    body: "Any partnership hinges on trust, understanding and empathy. Focus more on people, less on products.",
  },
  {
    title: "A child who performs academically does not necessarily perform in real life.",
    body: "Assess the life skills that actually matter after school or college, not only academic results.",
  },
  {
    title: "Prepare children for life, not just for rank.",
    body: "Learning to accept failure and move on is one of the most important lessons a child can learn.",
  },
  {
    title: "Being a mentor means making the mentee better and bigger than you.",
    body: "That's the whole definition, in one line. Being surpassed by someone you mentored is success, not a threat.",
  },
  {
    title: "Every relationship evolves with time.",
    body: "That's not a sign something went wrong. It's the default condition of every business, network, and partnership.",
  },
  {
    title: "Failures made him wiser and more caution.",
    body: "Many collaborations failed miserably. He didn't minimise that, and he let it change how he screens future partnerships.",
  },
  {
    title: "Creating platforms builds more mentors and leaders, in a spiral that always works.",
    body: "Impact compounds when you build the platform, not just the individual relationship.",
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
        / Rajendra Shah
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/shah-portrait.jpg"
            alt="Rajendra Shah"
            width={1254}
            height={1254}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Rajendra Shah · Education Entrepreneur · Connector, Mentor &amp; Platform Builder
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 020
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Rajendra <em>Shah</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Creating Platforms. Building Leaders. Changing Lives.
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          From national and international sales and marketing to education, mentorship, and
          building trusted networks
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;The right people will have the right products and services, and not the
          reverse.&rdquo;
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
          <p className="font-medium">16 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">September 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Education Entrepreneur",
          "Mentorship",
          "Networks & Partnerships",
          "Life Skills",
          "Connector",
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
        <p className="text-xs uppercase tracking-wide text-neutral-400">About him</p>
        <blockquote className="mt-4 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Rajendra Shah twenty questions. He answered from a career that moved
          from national and international sales into education, mentorship, and connecting the
          right people to the right opportunities.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Rajendra Shah built his early career in sales and marketing with national and
          international companies before entering the education space in 2002. Since then, his
          work has centred on building trusted partnerships between schools, companies and
          individuals, mentoring emerging leaders, and creating platforms and communities that,
          in his words, build more mentors and leaders in a spiral that keeps compounding.
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
          Sixteen principles · Stated by Rajendra Shah
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p, idx) => (
            <div key={p.number}>
              <article className="border-t border-neutral-200 pt-10">
                <p className="text-sm text-neutral-400">{p.number} of 16</p>
                <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

                <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                  {p.quote.map((para, i) => (
                    <p key={i} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </blockquote>
                <p className="mt-3 text-sm text-neutral-500">
                  — Rajendra Shah, stated directly
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

              {idx === 7 && (
                <div className="mt-20 border-t border-neutral-200 pt-16 text-center">
                  <p className="text-3xl font-serif leading-snug">
                    &ldquo;Being a mentor means making the mentee
                    <br />
                    <em>a person better and bigger than you.</em>&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    Rajendra Shah — Principle IX, Stated
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
          &ldquo;Creating platforms and communities
          <br />
          <em>builds more mentors and leaders.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Rajendra Shah — Principle XV, Stated
        </p>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs uppercase tracking-wide text-neutral-400">Key takeaways</p>
        <h2 className="mt-3 text-3xl font-serif">Seven ideas worth carrying forward</h2>

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
          Post a commitment inspired by Rajendra Shah&apos;s principles. State it publicly — and
          make it real.
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
        <p className="mt-4 text-sm text-neutral-500">8 min read · 16 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
