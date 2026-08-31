import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "anil-swarup";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Shri Anil Swarup — Work for What You Need, Not for Your Greed";
const DESCRIPTION =
  "Good can happen because good is happening. Eight principles from a career spanning the Coal and School Education secretaryships, and the Nexus of Good.";
const IMAGE = "https://app.stated.in/swarup-portrait.jpg";

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
    images: [{ url: IMAGE, width: 870, height: 870, alt: "Shri Anil Swarup" }],
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
    title: "Leadership Always Reduces to Managing People",
    quote: [
      "Though the situations were different, the fundamental principles of administration and leadership remained the same, because ultimately it boils down to managing men and women. That is a principle applicable whichever assignment you are in, especially if you are occupying leadership positions, which I incidentally did as Secretary, School Education and Secretary, Coal.",
      "Trust: first was to gain the confidence of the people that you are working with, and demonstrating to them that you are there to protect them, especially in the coal sector, if there was any bona fide mistake. The context was that, on account of the CAG report, there were officers who were not willing to take decisions on files or even recommend allocations that were supposed to be done. So that was a principle that I cherished during my career: working with a team, trying to convey to them this mutual trust, which was very important.",
      "Delegation: second was to delegate whatever I could to these people, and that was an extension of the trust that I had in them. Such delegation of decision-making left me with a lot of time to plan, and that is another aspect that came in handy, to plan for a variety of activities that were to be taken in the organization, whether as Secretary, Coal or Secretary, Education.",
      "Empowerment: your team had to be empowered so that they could take decisions.",
      "Leading by example: apart from these three, trust, delegation, empowerment, I always believed in leading by example. If I couldn't do something, I could not expect my team members to do that. These are principles that are applicable across the board in whichever assignment that you do.",
    ],
    whatThisMeans:
      "He collapses two very different jobs, running Coal and running School Education, into a single underlying discipline: leadership is always about managing people, regardless of the domain. His four pillars build on each other in order, trust makes delegation possible, delegation requires empowerment, and none of it holds if he isn't willing to do himself what he asks of his team.",
    whyItMatters:
      "The coal sector detail is specific and telling: after the CAG report, officers had become afraid to even sign off on routine allocations. His response wasn't a new procedure first, it was restoring the belief that a bona fide mistake would be protected. Trust came before process.",
    reflect:
      "In your own team or organization, has fear of blame quietly made people stop making ordinary decisions, the way it did with coal allocations after the CAG report?",
  },
  {
    number: "02",
    title: "Eight Things an Idea Needs to Survive Contact With Reality",
    quote: [
      "One is implementing an idea, and the other is sustaining that implementation. They are two different parts, but interrelated. For implementation, as I have mentioned in the book, you have to make that idea politically acceptable, meaning thereby that the decision-maker has to accept the idea that you have. Socially desirable, meaning thereby that the people for whom you are trying to implement that idea find it beneficial to them. Technologically feasible: any idea cannot work on the ground unless there is appropriate technology available to make it happen.",
      "Financially viable, meaning thereby that there has to be a sufficient amount of money to back the idea that you have. If you don't have it immediately, you should be able to demonstrate the efficacy of the idea so that money comes in and it happens. If you can demonstrate the efficacy, money follows it. Administratively doable: you must have the human resources to make that idea happen and to sustain it. Judicially tenable, meaning thereby that it should not violate any rule or law, because if it does, then it won't last for long.",
      "Emotionally relatable: this is a very important aspect, you have to make your idea acceptable to the people with whom you are implementing, that is, the stakeholders. They should buy into the idea that you're doing. Finally, the idea has to be environmentally sustainable.",
      "Now, this is what is required to make the idea happen. For the idea to sustain, all these eight factors are important, but more important is to create a value around the idea that you have, so that all the stakeholders start believing in your idea. Then, they manage to sustain the idea. You don't have to do much; they take over and they do it because they deem it beneficial to them, and hence they sustain it.",
    ],
    whatThisMeans:
      "He splits turning an idea into lasting change into two distinct problems most people treat as one: implementing it, which requires satisfying all eight criteria at once, political, social, technological, financial, administrative, judicial, emotional, and environmental, and sustaining it, which depends on something different entirely, stakeholders coming to believe the idea is theirs.",
    whyItMatters:
      "The sequencing at the end is the real insight: once stakeholders believe an idea benefits them, \"you don't have to do much; they take over.\" Sustainability isn't a ninth criterion added to the list. It's what happens when the other eight actually land.",
    reflect:
      "Think of an idea you're currently trying to implement. Which of his eight criteria, political, social, technological, financial, administrative, judicial, emotional, environmental, have you not yet honestly tested it against?",
  },
  {
    number: "03",
    title: "Stakeholders Sustain What They Believe Is Fair",
    quote: [
      "The coal system had totally crashed consequent to the report of the CAG. So it had to be built from scratch, in the context of putting in place an auction process that was transparent through the use of technology, so that people had faith in the process that was put in place. They didn't question the allocation of coal blocks, which was done on a very objective basis using technology. So that was important, and that was done.",
      "Sustaining it, as I had mentioned earlier, was necessary, and it could be done by making the stakeholders believe that what one had put in place was good and useful to them. There would be no bias against anybody, and there would be no favor given to anybody else. The decision-making was totally objective in nature. That helped, because stakeholders started believing that what was put in place was not in favor of anybody, the bidder who deserved to get the bid got it. That belief enabled the system not only to work, but to sustain over a period of time. It's been more than a decade since this system was put in place, and it's doing very well.",
    ],
    whatThisMeans:
      "Rebuilding the coal allocation system from a total collapse wasn't primarily a technology project, in his account, though technology was the tool. The actual fix was removing bias from the decision entirely, so objectively that stakeholders stopped questioning the outcome, even when they didn't win a particular bid.",
    whyItMatters:
      "\"It's been more than a decade since this system was put in place, and it's doing very well\" is his own evidence for Principle 2's claim about sustainability. A system stakeholders believe is fair keeps working long after the person who built it has moved on.",
    reflect:
      "Is there a process in your own organization that people still question the fairness of, even when the outcome is technically correct?",
  },
  {
    number: "04",
    title: "You Cannot Talk of Ethics on an Empty Stomach",
    quote: [
      "There are two parts to it. Employability: making education in a manner that people who get educated get employed. That's very important, because you can't talk of morality or ethics if you don't have your stomach to feed. So it's important to see that the children who are getting educated are employable, and to that extent, I think the National Education Policy that has come about addresses some of these issues.",
      "Equally important, or perhaps more important, is making the child ethically sound, meaning thereby that he or she conducts herself or himself in a manner that they contribute to society ethically as well as materially. Now, this is a very difficult part, because, given the consumer culture that has evolved over a period of time, children of the day are primarily concerned about material comforts. There's nothing wrong in aspiring for material comforts, but totally overlooking the ethical part is a dangerous development that can impact us adversely.",
      "This can be done not by teaching morality in the class, but by demonstrating that ethical conduct pays. This is important because usually children are told to behave in a particular manner which is considered to be correct, but the children don't perceive it as beneficial to them. All around them, people who are adopting dishonest means are thriving; if they get to believe that, then they would have no incentive to remain ethical. Hence, it is important for those who are teaching them or around them to demonstrate that ethical conduct works and pays, because there are many people who have succeeded in life, are doing very well, and had ethical conduct.",
      "This needs to be demonstrated through people now, how people who have been honest and efficient have thrived and are happy in life. Once the child starts seeing it for himself, seeing is believing. If the role models they have in mind are people who were ethical in nature and have succeeded in life, they will also start believing that ethics pays, and hence they will start adopting those means. Telling them or making them understand morality, maybe they'll agree, but to adopt it, they must find value in that adoption.",
    ],
    whatThisMeans:
      "He refuses to separate employability from ethics, arguing plainly that you can't talk of morality to someone who doesn't have their stomach to feed. But he's equally clear that skills alone aren't the goal, ethical grounding matters just as much, or more.",
    whyItMatters:
      "His method for building that ethical grounding isn't classroom instruction. It's visible proof, real role models children can see who were both honest and successful, because \"seeing is believing\" does what moral instruction alone can't.",
    reflect:
      "Who is a role model in your own life, or in the life of someone younger than you, who demonstrates that ethical conduct actually pays, rather than just being told it should?",
  },
  {
    number: "05",
    title: "Demonstrate That Ethical Conduct Pays",
    quote: [
      "Ethical conduct can be sustained over a period of time if there is a belief that such a conduct will be helpful to the person who has that conduct. This can be demonstrated, as I said earlier, by people who have been ethical and successful in life. That's very important.",
      "People do ask me: you talk about ethics, but despite the fact that most people agree with you, they don't follow an ethical conduct. Why? The reason is very simple: because of the consumer culture that has evolved, most of us believe in immediate gratification and are not worried about the consequences of such indulgences. For example, if you have sugar sitting in front of you, you would like to consume that sugar immediately and be oblivious to the consequences of having too much sugar and developing diabetes. You don't want to sacrifice the present for a better future, and that's what happens. You have an option, you can give up sugar and remain healthy, but then you are giving up something available for immediate gratification.",
      "That's the issue here, and that needs to be conveyed to youngsters: that you can consume sugar at this point in time, but there could be a cost to it subsequently. That does not get conveyed effectively to these children, and they start consuming now, oblivious of the consequence of the consumption that they undertake at this point in time.",
    ],
    whatThisMeans:
      "Asked why people agree with ethical conduct in principle but don't practise it, he reaches for a deliberately ordinary example, sugar, rather than a grand moral failing. The problem isn't that people disagree with ethics; it's that immediate gratification always feels more real than a distant consequence.",
    whyItMatters:
      "The sugar analogy makes an abstract ethical dilemma concrete and personal. Nearly everyone recognizes the pull of choosing present comfort over future cost, which makes his point land as observation rather than lecture.",
    reflect:
      "Where in your own life are you currently choosing the sugar, immediate comfort, over a cost you know is coming later?",
  },
  {
    number: "06",
    title: "Good Can Happen Because Good Is Happening",
    quote: [
      "That's the whole objective of Nexus of Good: to identify, understand, appreciate, replicate, and scale good work. Our usual tendency is for masala, so we enjoy negative news; we don't relish positive news. That needs to change, and this will happen if we continue to demonstrate good work that is happening around us, roadshow them, and provide platforms, which Nexus of Good does, for them to display the good work and the consequences thereof.",
      "It's very important if people start believing that good work also pays and it is happening around them. So one of the principles of Nexus of Good is: good can happen because good is happening. It is not merely people saying that good should happen, in any case it should happen, but if we demonstrate that good is already happening and those that are performing good work are also being appreciated by society, then everyone yearns for appreciation and they would also try and do some good work. It may entail a bit of sacrifice in the present, but in the future, they would come to perceive that good work will be appreciated over a period of time. That appreciation helps, and that's what Nexus of Good is all about: creating platforms for appreciating good work.",
    ],
    whatThisMeans:
      "He names our collective appetite for negative news, \"masala\", as the actual obstacle to social change, not a lack of good work happening. The Nexus of Good's method is to make existing good work visible enough that appreciation itself becomes the incentive for more of it.",
    whyItMatters:
      "\"Good can happen because good is happening\" reframes moral exhortation, people saying good should happen, as far weaker than demonstration. Showing people that good work is already real and already rewarded does more than telling them it ought to be.",
    reflect:
      "When did you last actively look for and share a piece of good news, rather than let negative news claim your attention by default?",
  },
  {
    number: "07",
    title: "Work for What You Need, Not for Your Greed",
    quote: [
      "First of all, they should believe that good work is possible. They should also believe that good work or ethical conduct pays. If they believe in that, then they will work out a strategy through which they can perform, sustain good work, and continue to perform ethically. If they start believing in this, they will find a way to do that.",
      "To do that, the first thing they should do is to discipline their lives. Given the environment in which they work, there is a lot of yearning for acquiring materialistic comfort. This has been there all through the centuries, but now it is more so because it is visible on social media and on television. The acquisitive nature gets the better of a human being, so he wants to acquire more and more things, little realizing that over a period of time, what really matters is not these materialistic things, which are necessary in the sense of basic comforts. If you get into this rat race of acquiring more and more, there is no end to it, and it leads to an unhappy existence.",
      "If they work for what they need, not for their greed, then they would be contented in life. Contentment is a great virtue that they should develop over a period of time.",
    ],
    whatThisMeans:
      "His advice to young professionals starts with belief, that good work is possible and that it pays, before it gets to discipline. Belief comes first because, without it, there's no reason to build the strategy that follows.",
    whyItMatters:
      "He's careful not to condemn material comfort itself, calling basic comforts necessary. The danger he names is specific: the rat race that has no natural end, driven by visibility on social media and television, rather than material need itself.",
    reflect:
      "Honestly, is what you're currently chasing something you need, or something the rat race has convinced you to want?",
  },
  {
    number: "08",
    title: "Enjoy Every Moment That You Are In",
    quote: [
      "Enjoy every moment that you are in.",
    ],
    whatThisMeans:
      "Given the chance to leave one single principle behind, after seven answers about trust, systems, ethics, and discipline, he chooses something disarmingly simple rather than a summary of everything that came before it.",
    whyItMatters:
      "Paired with Principle 7, work for what you need, not your greed, this closing line completes the thought: contentment isn't only about resisting the rat race, it's about actually being present for the life that discipline makes possible.",
    reflect:
      "When did you last genuinely enjoy the moment you were in, rather than already thinking about the next thing you needed to acquire or achieve?",
  },
];

const takeaways = [
  {
    title: "Leadership always reduces to managing people.",
    body: "Trust, delegation, empowerment, and leading by example, in that order. Trust makes delegation possible; delegation requires empowerment; none of it holds without leading by example.",
  },
  {
    title: "An idea needs eight things to survive contact with reality.",
    body: "Politically acceptable, socially desirable, technologically feasible, financially viable, administratively doable, judicially tenable, emotionally relatable, environmentally sustainable.",
  },
  {
    title: "Stakeholders sustain what they believe is fair.",
    body: "A system stakeholders trust keeps working long after the person who built it has moved on. More than a decade later, the coal auction system he rebuilt is still doing well.",
  },
  {
    title: "You cannot talk of ethics on an empty stomach.",
    body: "Employability and ethical grounding both matter, but skills without ethics, or ethics preached to someone without a livelihood, both fall short.",
  },
  {
    title: "Demonstrate that ethical conduct pays; don't just teach it.",
    body: "Seeing is believing. Role models who were honest and successful teach more than moral instruction alone.",
  },
  {
    title: "Good can happen because good is happening.",
    body: "Demonstrating that good work is real and appreciated does more to spread it than simply saying good should happen.",
  },
  {
    title: "Work for what you need, not for your greed.",
    body: "The rat race has no natural end. Contentment comes from discipline, not from winning a race that was never going to finish.",
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
        / Shri Anil Swarup
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/swarup-portrait.jpg"
            alt="Shri Anil Swarup"
            width={870}
            height={870}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Shri Anil Swarup · Founder Chairman, Nexus of Good · Former Secretary, School Education
          (2016&ndash;18) &amp; Coal (2014&ndash;16), Govt. of India · Author
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 012
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Shri Anil <em>Swarup</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Work for What You Need, Not for Your Greed
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Former Secretary, School Education &amp; Literacy · Former Secretary, Coal · Author,{" "}
          <em>You Can Make It Happen</em> · Founder Chairman, Nexus of Good
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Good can happen because good is happening.&rdquo;
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
          "Public Service",
          "Governance Reform",
          "Education Policy",
          "Ethics",
          "Nexus of Good",
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
          &ldquo;We asked Shri Anil Swarup eight questions. He answered from decades of rebuilding
          a broken system, and from what came after.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Shri Anil Swarup served as Secretary, Coal (2014&ndash;16) and Secretary, School
          Education &amp; Literacy (2016&ndash;18), Government of India, leading the rebuild of
          the coal block allocation system after it collapsed under the CAG report, and later
          working on reform at the heart of India&apos;s school education system. He is the
          author of <em>You Can Make It Happen</em> and the Founder Chairman of Nexus of Good, an
          initiative built around identifying, appreciating, and scaling good work happening
          across India.
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
          Eight principles · Stated by Shri Anil Swarup
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
                  — Shri Anil Swarup, stated directly
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
                    &ldquo;The bidder who deserved
                    <br />
                    <em>to get the bid, got it.</em>&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    Shri Anil Swarup — Principle III, Stated
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
          &ldquo;If they work for what they need,
          <br />
          <em>not for their greed, they would be contented in life.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Shri Anil Swarup — Principle VII, Stated
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
          Post a commitment inspired by Shri Anil Swarup&apos;s principles. State it publicly —
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
        <p className="mt-4 text-sm text-neutral-500">8 min read · 8 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
