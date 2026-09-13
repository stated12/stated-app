import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "dr-mariam-shaikh";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Dr. Mariam Shaikh — How Many Lives Become Better Because You Chose to Move Forward";
const DESCRIPTION =
  "Success is not only about how far you go. It is also about how many lives become better because you chose to move forward. Twelve principles on education, mentorship, and women's empowerment.";
const IMAGE = "https://app.stated.in/mariam-portrait.jpg";

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
    images: [{ url: IMAGE, width: 880, height: 880, alt: "Dr. Mariam Shaikh" }],
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
    title: "See the Person Before the Student",
    quote: [
      "Over the years, I have realised that guiding a student is never just about academics; it is about understanding their fears, dreams and the pressure they silently carry.",
      "One principle I return to again and again is this: see the person before the student. When you understand what truly drives someone, your guidance becomes far more meaningful.",
      "I also believe in being honest, even when the truth is uncomfortable, because false reassurance helps no one in the long run.",
      "And most importantly, I remind myself that every student's journey is different; there is no single formula for success. My role is not to direct their life, but to help them discover clarity so they can choose their own path with confidence.",
    ],
    whatThisMeans:
      "She names honesty even when uncomfortable as a deliberate counterweight to a natural instinct to reassure. False comfort, in her account, helps no one, even when it feels kinder in the moment.",
    whyItMatters:
      "\"My role is not to direct their life, but to help them discover clarity so they can choose their own path\" draws a clear line between guiding someone and deciding for them, a distinction easy to blur when you genuinely want the best for someone.",
    reflect:
      "When advising someone younger than you, are you helping them find their own clarity, or quietly directing them toward the path you'd choose for them?",
  },
  {
    number: "02",
    title: "Make Decisions Based on Fit, Not Comparison",
    quote: [
      "Every family that walks into my office carries a mix of hope, anxiety and high expectations, and rightly so, because a child's education is one of the most important decisions a parent will ever make.",
      "What I have learned is that families are not just looking for information; they are looking for reassurance that someone genuinely understands their child.",
      "I always encourage parents and students to think beyond rankings and prestige, and instead focus on where the student will genuinely grow, both academically and personally.",
      "I remind them that the right environment matters more than a famous name, and that success is not about choosing the most popular option, but the one that aligns with the student's strengths, personality and long-term goals.",
      "When families understand this, the anxiety reduces significantly, because they begin to make decisions based on fit, not comparison.",
    ],
    whatThisMeans:
      "She identifies what families are actually seeking beneath their questions about universities and options: not more information, but reassurance that someone genuinely understands their specific child, not a generic applicant.",
    whyItMatters:
      "\"The right environment matters more than a famous name\" directly challenges the instinct to chase prestige, replacing it with a more specific and harder question: where will this particular student actually grow.",
    reflect:
      "In a major decision you're currently facing, are you evaluating options by their reputation, or by genuine fit with who you actually are?",
  },
  {
    number: "03",
    title: "Meaningful Partnerships Are Built on Trust Before Transactions",
    quote: [
      "Working with universities, schools and organisations across different countries has taught me that meaningful partnerships are built on trust, not transactions.",
      "I have learned to listen more than I speak in the beginning of any collaboration, because understanding someone's goals, culture and constraints is essential before offering solutions.",
      "I also believe strongly in transparency; if something is not going to work, I say so clearly rather than giving vague answers to keep a relationship comfortable.",
      "Cross-border collaboration also taught me patience and cultural sensitivity, because what works in one country may not work the same way in another.",
      "Ultimately, my guiding principle is simple: build relationships with integrity, and long-term success will follow naturally.",
    ],
    whatThisMeans:
      "Listening more than speaking at the start of any collaboration, before offering solutions, is presented as a discipline rather than a personality trait, one she applies deliberately because it's necessary, not because it comes naturally to hold back.",
    whyItMatters:
      "Choosing clear honesty over vague reassurance, even when it makes a relationship less comfortable in the short term, is the same principle from her first answer applied at the institutional level rather than the individual one.",
    reflect:
      "In your own professional relationships, do you tend to give vague answers to preserve comfort, or clear ones that might create short-term friction but protect long-term trust?",
  },
  {
    number: "04",
    title: "A Degree Should Be a Beginning, Not the Destination",
    quote: [
      "The biggest shift I try to instil in students is moving from a mindset of \"getting a degree\" to \"building a future.\"",
      "Many students focus only on grades and admissions, but true success comes from developing skills, adaptability and self-awareness alongside academic achievement.",
      "I encourage students to see education as a foundation, not a finish line, and to constantly ask themselves how their learning connects to real-world impact.",
      "I also emphasise resilience, because setbacks, whether academic or personal, are part of every meaningful journey.",
      "When students internalise this mindset, they stop chasing shortcuts and start building genuine, long-term capability, which ultimately leads to real and lasting success.",
    ],
    whatThisMeans:
      "She names a specific mental shift, from \"getting a degree\" to \"building a future\", as the actual work of education, treating grades and admissions as necessary but insufficient markers of what the process is really for.",
    whyItMatters:
      "\"Stop chasing shortcuts and start building genuine, long-term capability\" ties directly back to fit over prestige in Principle 2. Both reject the faster, more impressive-looking option in favor of the one that actually builds something durable.",
    reflect:
      "In your own current pursuit, whether education, career, or a project, are you chasing a credential or building an actual capability?",
  },
  {
    number: "05",
    title: "Education Gives Women Something Powerful: Choice",
    quote: [
      "Education gives women something incredibly powerful: choice.",
      "When a woman is educated, she gains the confidence to make informed decisions about her career, her finances and her future, rather than depending entirely on circumstances or other people.",
      "I have seen firsthand how education transforms not just individual women, but entire families and communities, because empowered mothers raise empowered children.",
      "Education also breaks cycles of dependency and opens doors to leadership roles that were previously inaccessible.",
      "My belief is simple: when you educate a woman, you are not just building her future, you are building a stronger, more equal society.",
    ],
    whatThisMeans:
      "She locates the core value of education for women not in credentials or career advancement alone, but in choice itself, the ability to decide rather than depend on circumstance or other people.",
    whyItMatters:
      "\"Empowered mothers raise empowered children\" extends the impact of a single woman's education beyond her own life, treating it as a mechanism that compounds across generations rather than stopping with the person who received it.",
    reflect:
      "Think of a woman whose education changed the trajectory of her family, not just her own life. What specifically did that choice make possible for the people around her?",
  },
  {
    number: "06",
    title: "Do Not Allow Doubt to Become a Permanent Address",
    quote: [
      "There have been moments in my career when I doubted whether I was making the right choices, especially during times of major transition.",
      "What kept me going was reminding myself of my \"why\", the deep purpose behind my work, which is helping people unlock opportunities they didn't think were possible.",
      "I also leaned on mentors and peers who reminded me of my strengths when I could not see them myself.",
      "I have learned that self-doubt is normal, but it should never be allowed to become a permanent address. It is simply a signal to pause, reflect and realign, not a reason to give up.",
      "Every challenge I overcame added a layer of resilience that I now pass on to the people I mentor.",
    ],
    whatThisMeans:
      "She doesn't claim to have been free of self-doubt during major transitions. She names two specific things that carried her through it: returning to her underlying purpose, and mentors who could see her strengths when she temporarily couldn't.",
    whyItMatters:
      "\"Self-doubt... is simply a signal to pause, reflect and realign, not a reason to give up\" reframes doubt as useful information rather than a verdict on capability, a distinction that changes what doubt is actually for.",
    reflect:
      "The next time self-doubt shows up, will you treat it as a signal to pause and realign, or let it settle in as a permanent address?",
  },
  {
    number: "07",
    title: "Perseverance and Reinvention Are Not Opposites",
    quote: [
      "One thing I know for certain is that perseverance and reinvention are not opposites; they actually go hand in hand.",
      "There were times I had to completely rethink my strategies, whether due to changing industry trends, global challenges or shifting client needs.",
      "But the reason I never gave up was simple: I always believed in the impact of my work.",
      "I also learned to view failures not as endpoints but as data points, information that helps refine the next step.",
      "Staying adaptable while holding onto my core purpose is what allowed me to continue moving forward, even when circumstances required significant change.",
    ],
    whatThisMeans:
      "She resists the common framing that persistence means staying the same course no matter what. In her account, perseverance sometimes requires completely rethinking strategy, while the actual constant is belief in the underlying purpose, not the method.",
    whyItMatters:
      "Treating failures as \"data points\" rather than endpoints is a small reframe with a large practical effect: a data point demands you ask what it tells you, while an endpoint just demands you stop.",
    reflect:
      "Is there a strategy or method you're clinging to out of a sense of perseverance, when the actual perseverance you need is toward the purpose, not the method?",
  },
  {
    number: "08",
    title: "Every Chapter Teaches You Something the Next Chapter Will Need",
    quote: [
      "My career has moved through very different worlds, education consulting, entrepreneurship, mentorship and community leadership, and each one taught me something essential.",
      "From education, I learned the importance of patience and personalised guidance. From entrepreneurship, I learned resilience, risk-taking and the courage to make bold decisions.",
      "From mentorship, I learned the value of empathy and long-term relationship-building. And from community leadership, I learned that real impact comes from collaboration, not individual effort alone.",
      "Each chapter of my journey added a new dimension to how I lead today, and I believe every experience, whether smooth or difficult, becomes a building block for future growth.",
    ],
    whatThisMeans:
      "She assigns each distinct chapter of her career, education, entrepreneurship, mentorship, community leadership, a specific and different lesson, rather than describing her career as one continuous skill accumulating in a straight line.",
    whyItMatters:
      "\"Real impact comes from collaboration, not individual effort alone\" is the lesson she credits specifically to community leadership, suggesting it's something the earlier, more individually-driven chapters of her career couldn't have taught her.",
    reflect:
      "Looking at the distinct chapters of your own path so far, what specific lesson did each one teach you that the others couldn't have?",
  },
  {
    number: "09",
    title: "A Transformative Mentor Helps You See Possibilities in Yourself",
    quote: [
      "Yes, absolutely. There was a mentor early in my career who believed in my potential even when I was unsure of my own path.",
      "She taught me that leadership is not about having all the answers, but about asking the right questions and empowering others to find their own solutions.",
      "That principle has stayed with me throughout my career and shapes how I mentor others today.",
      "I try to give the people I guide the same gift I was given: belief, encouragement and the freedom to grow at their own pace.",
      "A truly transformative mentor does not just guide you; they help you see possibilities in yourself that you hadn't recognised before.",
    ],
    whatThisMeans:
      "The specific lesson she credits to her own mentor, that leadership means asking the right questions rather than having all the answers, is the same principle she applies as a mentor herself in Principle 1, helping students discover their own clarity rather than directing them.",
    whyItMatters:
      "\"I try to give the people I guide the same gift I was given\" makes mentorship an act of passing something forward rather than an isolated skill she developed independently. The chain of influence is named explicitly, not left implicit.",
    reflect:
      "Who believed in your potential before you believed in it yourself, and are you currently passing that same gift to someone else?",
  },
  {
    number: "10",
    title: "Growth and Purpose Should Strengthen Each Other, Not Compete",
    quote: [
      "Balancing professional growth with a deeper purpose is something I think about often, but for me, they are not separate; they are intertwined.",
      "Every business decision I make is guided by one question: how does this help someone move forward in life?",
      "When your growth is aligned with impact, ambition and purpose stop competing with each other and start strengthening each other.",
      "I also make it a priority to stay connected with the human side of my work, meeting students, hearing their stories and celebrating their achievements, because that keeps my purpose alive even as my responsibilities grow.",
    ],
    whatThisMeans:
      "She rejects the premise that professional growth and deeper purpose are two competing priorities requiring balance. Her single guiding question, \"how does this help someone move forward in life\", makes them the same evaluation rather than a trade-off.",
    whyItMatters:
      "Deliberately staying connected to individual students' stories even as her responsibilities and scale grow is a specific practice against a common failure mode, where leaders lose touch with the human-level impact of their work as their role expands.",
    reflect:
      "As your own responsibilities have grown, have you maintained deliberate contact with the human-level impact of your work, or has it become more abstract with scale?",
  },
  {
    number: "11",
    title: "The Future Belongs to People Who Combine Technological Confidence With Human Wisdom",
    quote: [
      "The world is evolving rapidly, and today's students face pressures that previous generations never experienced, technology, social media, global competition and rapidly changing career landscapes.",
      "What I want them to understand is that success is not just about technical skills; it is equally about emotional intelligence, adaptability and ethical decision-making.",
      "The future belongs to those who can combine technological confidence with human wisdom, and who focus on creating value, not just chasing achievements.",
      "I also want the next generation to know that it is okay to take unconventional paths. There is no single formula for success, and their unique journey is exactly what will set them apart.",
    ],
    whatThisMeans:
      "She names the specific pressures facing today's students, technology, social media, global competition, rapidly changing career landscapes, as genuinely new rather than dismissing them as generational complaint, before offering guidance built for that actual environment.",
    whyItMatters:
      "\"Combine technological confidence with human wisdom\" refuses to frame the future as a choice between technical skill and human judgment. Both are named as necessary, with neither substituting for the other.",
    reflect:
      "Are you currently developing technological confidence and human wisdom together, or has one gotten far more of your attention than the other?",
  },
  {
    number: "12",
    title: "How Many Lives Become Better Because You Chose to Move Forward",
    quote: [
      "To a student, I would say: focus on learning, not just scoring. Your curiosity and character will take you further than your grades alone.",
      "To a young woman starting her career, I would say: believe in your capabilities, take up space, and never shrink yourself to make others comfortable.",
      "To an aspiring entrepreneur, I would say: build something meaningful, not just something profitable. Impact and income can absolutely go hand in hand.",
      "And to all of them, I would add this: success is not only about how far you go. It is also about how many lives become better because you chose to move forward.",
    ],
    whatThisMeans:
      "She gives three genuinely distinct pieces of advice, to a student, a young woman starting her career, and an aspiring entrepreneur, rather than one generic message repeated three times, each tailored to the specific pressure that role actually faces.",
    whyItMatters:
      "The closing line ties every earlier principle together: fit over prestige, capability over shortcuts, collaboration over individual effort, all converge on the same final measure, how many lives became better because you moved forward.",
    reflect:
      "By her closing measure, how many lives have become better specifically because you chose to move forward, not just because you achieved something for yourself?",
  },
];

const takeaways = [
  {
    title: "See the person before the student, or the role.",
    body: "Understanding what truly drives someone makes guidance far more meaningful than generic advice ever could.",
  },
  {
    title: "Make decisions based on fit, not comparison.",
    body: "The right environment matters more than a famous name. Success comes from alignment with your own strengths and goals, not prestige.",
  },
  {
    title: "Build relationships on trust before transactions.",
    body: "Listen more than you speak at the start of any collaboration. Choose clear honesty over vague reassurance, even when it costs short-term comfort.",
  },
  {
    title: "Treat education, or any pursuit, as a foundation, not a finish line.",
    body: "Stop chasing shortcuts and start building genuine, long-term capability.",
  },
  {
    title: "Self-doubt is a signal to pause and realign, not a permanent address.",
    body: "It's simply information, not a verdict on your capability or a reason to give up.",
  },
  {
    title: "Perseverance and reinvention are not opposites.",
    body: "Stay adaptable in method while holding onto your core purpose. Treat failures as data points, not endpoints.",
  },
  {
    title: "Success means how many lives become better because you moved forward.",
    body: "Not only how far you personally go, but what became possible for the people around you along the way.",
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
        / Dr. Mariam Shaikh
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/mariam-portrait.jpg"
            alt="Dr. Mariam Shaikh"
            width={880}
            height={880}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Dr. Mariam Shaikh · Global 200 Women Power Leaders 2024 · Founder &amp; CEO, MS
          Education Consultants
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 018
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Dr. Mariam <em>Shaikh</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          How Many Lives Become Better Because You Chose to Move Forward
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Entrepreneur · Lifelong Advocate for Education · Student &amp; Women Empowerment
          Enthusiast · Co-Author, <em>Dubai Business Leaders</em>
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Education gives women something incredibly powerful: choice.&rdquo;
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
          <p className="font-medium">12 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">September 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Education Consulting",
          "Women's Empowerment",
          "Mentorship",
          "Entrepreneurship",
          "Global 200 Women Power Leaders",
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
        <p className="text-xs uppercase tracking-wide text-neutral-400">About her</p>
        <blockquote className="mt-4 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Dr. Mariam Shaikh twelve questions. She answered from a career spent
          helping students, families, and women find clarity in their own path forward.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Dr. Mariam Shaikh is Founder and CEO of MS Education Consultants, recognized among the
          Global 200 Women Power Leaders 2024. Her work spans education consulting,
          entrepreneurship, mentorship, and community leadership, with a consistent focus on
          student and women&apos;s empowerment. She is co-author of <em>Dubai Business
          Leaders</em>.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what she stands for, stated publicly,
          in her own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Twelve principles · Stated by Dr. Mariam Shaikh
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What she stands for — in her own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p, idx) => (
            <div key={p.number}>
              <article className="border-t border-neutral-200 pt-10">
                <p className="text-sm text-neutral-400">{p.number} of 12</p>
                <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

                <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                  {p.quote.map((para, i) => (
                    <p key={i} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </blockquote>
                <p className="mt-3 text-sm text-neutral-500">
                  — Dr. Mariam Shaikh, stated directly
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

              {idx === 4 && (
                <div className="mt-20 border-t border-neutral-200 pt-16 text-center">
                  <p className="text-3xl font-serif leading-snug">
                    &ldquo;When you educate a woman,
                    <br />
                    <em>you are building a stronger, more equal society.</em>&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    Dr. Mariam Shaikh — Principle V, Stated
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
          &ldquo;Success is not only about how far you go.
          <br />
          <em>It is also about how many lives become better.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Mariam Shaikh — Principle XII, Stated
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
          Post a commitment inspired by Dr. Mariam Shaikh&apos;s principles. State it publicly —
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
        <p className="mt-4 text-sm text-neutral-500">10 min read · 12 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
