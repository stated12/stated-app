import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "angelos-tsavdaris";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Angelos Tsavdaris — Honour People's Trust";
const DESCRIPTION =
  "Leadership, trust and human dignity. Thirteen principles from the President of the Hellenic-Indian Chamber of Commerce and Economy on international cooperation, institutional leadership and creating opportunities across borders.";
const IMAGE = "https://app.stated.in/tsavdaris-portrait.jpg";
const TOTAL = 13;

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
    images: [{ url: IMAGE, width: 844, height: 844, alt: "Angelos Tsavdaris" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

type Seg = string | { b: string } | { i: string };
type Para = string | Seg[];
type Principle = {
  number: string;
  title: string;
  quote: Para[];
  whatThisMeans: string;
  whyItMatters: string;
  reflect: string;
};

function renderSeg(s: Seg, i: number) {
  if (typeof s === "string") return <span key={i}>{s}</span>;
  if ("b" in s)
    return (
      <strong key={i} className="font-semibold text-neutral-900">
        {s.b}
      </strong>
    );
  return <em key={i}>{s.i}</em>;
}

function PrincipleCard({ p, showCta }: { p: Principle; showCta?: boolean }) {
  return (
    <article className="border-t border-neutral-200 pt-10">
      <p className="text-sm text-neutral-400">
        {p.number} of {TOTAL}
      </p>
      <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

      <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
        {p.quote.map((para, i) => (
          <p key={i} className="leading-relaxed">
            {typeof para === "string" ? para : para.map(renderSeg)}
          </p>
        ))}
      </blockquote>
      <p className="mt-3 text-sm text-neutral-500">— Angelos Tsavdaris, stated directly</p>

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

      {showCta && (
        <a
          href="https://app.stated.in/signup"
          className="mt-8 inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:border-neutral-900"
        >
          Create a Commitment inspired by this
        </a>
      )}
    </article>
  );
}

const principles: Principle[] = [
  {
    "number": "01",
    "title": "Can I Honestly Explain My Decision to the People It Affects?",
    "quote": [
      "The principles I consider non-negotiable are respect for human dignity, integrity, and consistency between words and actions. When a decision affects people, I feel responsible for considering its real consequences and being honest about what we can achieve. I believe we must create opportunities responsibly, without raising expectations that we cannot substantiate.",
      "In my dealings with institutions, I am guided by transparency, respect for rules, and a commitment to the purpose we serve. Trust is built gradually through consistency and the willingness to take responsibility, particularly when difficulties arise.",
      "In international partnerships, I consider mutual respect, an understanding of cultural differences, and mutual benefit essential. A partnership endures when each side feels heard, is treated as an equal, and sees commitments translated into action.",
      "The question I return to is simple: can I honestly explain my decision to the people it affects and take responsibility for it?"
    ],
    "whatThisMeans": "He names three non-negotiables: respect for human dignity, integrity, and consistency between words and actions. He applies them to people, to institutions and to international partnerships, each in turn, and reduces them to a single question he keeps returning to.",
    "whyItMatters": "For him, trust is built gradually through consistency and the willingness to take responsibility, particularly when difficulties arise. He also insists that opportunities be created responsibly, without raising expectations that cannot be substantiated.",
    "reflect": "Could you honestly explain your last significant decision to the people it affected, and take responsibility for it?"
  },
  {
    "number": "02",
    "title": "Trust Is Reinforced Every Day",
    "quote": [
      "I believe lasting trust begins with a willingness to listen to and understand others. In international partnerships, we need to understand each party’s priorities, way of thinking, and operating context, without assuming that our own approach is the only right one.",
      "Clarity is equally essential: explaining from the outset what we seek to achieve, what we can offer, and where our limitations lie. Different expectations can be discussed and brought into alignment, provided there is honesty and room for meaningful dialogue.",
      "Trust is reinforced every day when we honour our commitments, communicate difficulties promptly, and take responsibility when something does not proceed as agreed. The way we handle a disagreement reveals the strength of our relationship.",
      "In cooperation between Greece and India, I consider it particularly important that each side feels its identity, contribution, and aspirations are respected. When this reciprocity is accompanied by consistent action, we can build relationships that stand the test of time."
    ],
    "whatThisMeans": "He begins with listening: understanding each party's priorities, way of thinking and operating context, without assuming that one's own approach is the only right one. Clarity from the outset about what we seek, what we can offer and where our limitations lie comes next.",
    "whyItMatters": "In his view, trust is reinforced daily by honouring commitments, communicating difficulties promptly and taking responsibility when something does not proceed as agreed. The way a disagreement is handled reveals the strength of the relationship.",
    "reflect": "In a partnership you are part of, when did you last communicate a difficulty promptly instead of waiting?"
  },
  {
    "number": "03",
    "title": "Human Dignity Sets a Firm Boundary for Our Choices",
    "quote": [
      "For me, responsible leadership means understanding that every decision has consequences for people and that an institutional role carries an obligation to listen, exercise fair judgement, and be accountable. It also requires making difficult decisions and being able to explain clearly the reasons behind them.",
      "As President of the Hellenic-Indian Chamber of Commerce & Economy, I consider it my duty to seek common ground among different aspirations. This requires all parties to be heard, including those with less influence, and transparent, consistent criteria to be applied. An institution’s mission must be served with independent judgement and a focus on long-term benefit.",
      "When considering an initiative, I am concerned both with the outcome we seek and with how we will achieve it: who benefits, who bears the cost or risk, and whether the people affected understand what it truly means for them. For me, human dignity sets a firm boundary for our choices.",
      "I believe the quality of leadership becomes particularly evident when one must reconsider a decision, acknowledge a mistake, or decline an opportunity that conflicts with one’s principles. My aim is to contribute to partnerships that deliver meaningful results and leave behind greater trust, fair opportunities, and lasting relationships."
    ],
    "whatThisMeans": "He describes responsible leadership as an obligation to listen, exercise fair judgement and be accountable, and to explain clearly the reasons behind difficult decisions. As President of the Hellenic-Indian Chamber of Commerce & Economy, he sees it as his duty to seek common ground among different aspirations.",
    "whyItMatters": "He asks of every initiative both what outcome is sought and how it will be achieved: who benefits, who bears the cost or risk, and whether the people affected understand what it means for them. He locates the quality of leadership in the moments when one must reconsider a decision, acknowledge a mistake or decline a conflicting opportunity.",
    "reflect": "For a decision you are considering now, who bears the cost or risk, and do they know it?"
  },
  {
    "number": "04",
    "title": "Respect for the Person Who Decides to Work in Another Country",
    "quote": [
      "For me, the starting point is respect for the person who decides to work in another country. Behind that decision lie expectations, family responsibilities, and often significant personal sacrifices. We have a responsibility to take that trust seriously.",
      "The first principle is honest, understandable information. Every worker should know in advance the nature of the job, pay, working hours, accommodation conditions, any costs they will bear, and their rights and obligations. They should also understand which stages depend on an employer’s selection and decisions by the competent authorities, without misleading promises of employment or a visa.",
      "The second principle is fair treatment, supported by clear contracts, safe working conditions, respect for occupational skills, and protection against discrimination and exploitation. Skills assessment and certification can help improve the match between people and jobs. Responsible, lawfully operating partners, protection of personal data, and accessible ways to report problems without fear of retaliation are also necessary.",
      "These are the principles I believe EUTOPIA should serve. Our responsibility also extends to taking an interest in what happens after arrival: smooth integration, communication, and the timely identification of difficulties. The success of such an effort is measured by its ability to create real opportunities for workers and meet business needs on the basis of fairness and mutual respect."
    ],
    "whatThisMeans": "Speaking about the EUTOPIA programme, he starts from the person behind the decision to work abroad: their expectations, family responsibilities and often significant personal sacrifices. He treats that trust as a responsibility to be taken seriously.",
    "whyItMatters": "He sets out two principles: honest, understandable information about the job, pay, hours, accommodation, costs, rights and obligations, without misleading promises of employment or a visa; and fair treatment, through clear contracts, safe conditions, protection from discrimination and exploitation, and accessible ways to report problems without fear of retaliation. Success is measured by real opportunities for workers and by meeting business needs on the basis of fairness and mutual respect.",
    "reflect": "If someone built a major life decision on what you told them, would they have the full picture?"
  }
];

const principlesPart2: Principle[] = [
  {
    "number": "05",
    "title": "What a Partnership Leaves Behind",
    "quote": [
      "I believe cooperation between two countries acquires meaningful value when its benefits are felt in people’s everyday lives: when it creates opportunities for young people, broadens access to knowledge, strengthens skills, and enables more individuals and small businesses to participate in progress.",
      "Human interaction is equally important. Through education, culture, tourism, and professional cooperation, people get to know one another, move beyond stereotypes, and learn to appreciate different ways of thinking and living. This mutual understanding gives depth and resilience to relations between countries.",
      "In the relationship between Greece and India, I see particular value in the opportunity to connect our historical and cultural heritage with the needs of today’s societies. We can build links among universities, businesses, professionals, and young people, allowing cooperation to gain continuity through their participation.",
      "For me, a meaningful measure of success is what a partnership leaves behind: more knowledge, greater trust, fair opportunities, and people who want to continue creating together. That is where its long-term value for both peoples lies."
    ],
    "whatThisMeans": "He measures cooperation between two countries by whether its benefits are felt in people's everyday lives: opportunities for young people, access to knowledge, strengthened skills, and wider participation by individuals and small businesses.",
    "whyItMatters": "Human interaction, through education, culture, tourism and professional cooperation, moves people beyond stereotypes and gives relations depth and resilience. For Greece and India, he sees value in connecting historical and cultural heritage with the needs of today's societies, through links among universities, businesses, professionals and young people.",
    "reflect": "What will your current partnership leave behind: knowledge, trust, fair opportunities, and people who want to keep creating together?"
  },
  {
    "number": "06",
    "title": "Ask Before Judging",
    "quote": [
      "My involvement in cooperation between Greece and India has led me to place particular value on listening and personal interaction. To understand someone from a different cultural background, you need to give them space to explain how they think, what matters to them, and what they expect from your relationship. You must also be willing to reconsider your own assumptions.",
      "Differences in communication, working pace, or decision-making require patience, clarity, and a willingness to adapt. A delay or a different approach can easily be misinterpreted if we do not first seek to understand its reasons. That is why I consider it valuable to ask before judging and to confirm that we have understood one another.",
      "Through this process, we can discover shared values: care for family, respect for knowledge, hospitality, and the desire to offer better prospects to the next generation. These values are expressed differently in each society and become meaningful when we recognise them in people’s actions, beyond generalisations and stereotypes.",
      "I believe bridges between cultures are built when people feel they can cooperate while preserving their identity. For me, this is one of the most important possibilities in the relationship between Greece and India: to know one another more deeply, learn from each other, and translate mutual respect into shared work."
    ],
    "whatThisMeans": "He places listening and personal interaction at the centre of cooperation between Greece and India. To understand someone from a different cultural background, he says, you need to give them space to explain how they think and what they expect, and be willing to reconsider your own assumptions.",
    "whyItMatters": "Differences in communication, working pace or decision-making call for patience, clarity and a willingness to adapt. A delay or a different approach can be misinterpreted if we do not first seek to understand its reasons, which is why he values asking before judging and confirming that we have understood one another.",
    "reflect": "Where have you interpreted a delay or a different approach without first asking the reason for it?"
  },
  {
    "number": "07",
    "title": "Preserving Our Credibility Is a Responsibility We Owe",
    "quote": [
      "I believe that when interests conflict, we must first clarify our responsibilities, to whom we are accountable, and the capacity in which we are making a decision. Particularly when representing an institution, we must distinguish personal or commercial benefit from the mission entrusted to us.",
      "For me, the guiding criteria are lawfulness, honesty, fair treatment, and respect for human dignity. Before making a difficult decision, I consider it essential to examine the facts, listen to those affected, and ask who will bear the consequences, especially when they have less ability to defend their interests.",
      "Integrity also requires concrete action: disclosing a conflict of interest, seeking independent judgement, and, where necessary, stepping aside from the decision-making process. It also requires the courage to set boundaries or decline a partnership when its terms undermine trust and our principles.",
      "One personal test I find useful is this: could I openly explain this decision to everyone it affects, using the same reasoning? The more difficult path may carry an immediate cost. Preserving our credibility, however, is a responsibility we owe to the people who trust us and to the partnerships we want to endure."
    ],
    "whatThisMeans": "When interests conflict, he begins by clarifying responsibilities: to whom we are accountable, and in what capacity we are deciding. Representing an institution means separating personal or commercial benefit from the mission entrusted to us.",
    "whyItMatters": "His criteria are lawfulness, honesty, fair treatment and respect for human dignity. Integrity also requires concrete action: disclosing a conflict of interest, seeking independent judgement, stepping aside where necessary, and having the courage to set boundaries or decline a partnership whose terms undermine trust and principles.",
    "reflect": "Which of your current decisions would you be comfortable explaining to everyone it affects, using the same reasoning?"
  },
  {
    "number": "08",
    "title": "Responsibility Continues After an Initiative Begins",
    "quote": [
      "I believe responsible opportunity creation begins with how we define success. Alongside financial returns, we need to consider the quality of jobs, the knowledge and skills people gain, and an initiative’s contribution to the local community.",
      "Leaders must incorporate this responsibility into the design of every partnership. This means realistic goals, transparent terms, careful selection of partners, and meaningful discussion with those affected. It also means considering whether infrastructure and available resources can support the growth being pursued, and how benefits, costs, and risks are distributed.",
      "I consider investment in people’s capabilities particularly important. Education, the transfer of expertise, and support for local entrepreneurship give a partnership value that continues over time. A person who gains meaningful skills can broaden their choices and contribute more to their community.",
      "Responsibility continues after an initiative begins. We need to monitor results, listen to participants’ experiences, and correct what is not working. For me, an opportunity is worth developing when there are sound grounds to believe it will improve people’s lives, together with a commitment to assess whether it is fulfilling that purpose in practice."
    ],
    "whatThisMeans": "He begins by redefining success: alongside financial returns, the quality of jobs, the knowledge and skills people gain, and an initiative's contribution to the local community. Responsibility is built into the design of every partnership through realistic goals, transparent terms, careful selection of partners and meaningful discussion with those affected.",
    "whyItMatters": "Investment in people's capabilities, through education, transfer of expertise and support for local entrepreneurship, gives a partnership value over time. Responsibility does not end when the initiative begins: results must be monitored, participants' experiences heard and what is not working corrected.",
    "reflect": "How would you know whether an initiative of yours is fulfilling its purpose in practice, and who would you ask?"
  }
];

const principlesPart3: Principle[] = [
  {
    "number": "09",
    "title": "Taking Responsibility for the Expectations You Create",
    "quote": [
      "One experience that has shaped my understanding of responsibility is the effort to develop the EUTOPIA programme. International labour mobility brings together different needs: businesses seeking staff and people hoping for better professional prospects. Between these needs lie procedures, uncertainties, and decisions that have a profound effect on human lives.",
      "The greatest challenge is to create prospects while remaining absolutely clear about what you can actually offer. Preparing candidates and strengthening their skills is valuable, but selection by an employer and decisions by the competent authorities follow their own processes. These limitations must be explained from the outset, even when more optimistic wording would be easier or more appealing.",
      "This effort has led me to pay closer attention to how others understand what we tell them. Something we say may become the basis on which a person plans the next steps in their life. That is why providing accurate information is a substantial responsibility.",
      "The lesson I take from this is that leadership also requires taking responsibility for the expectations you create. It means working persistently to develop an opportunity, explaining its conditions honestly, and remaining available to listen to the concerns of the people who trust you."
    ],
    "whatThisMeans": "He names the effort to develop the EUTOPIA programme as the experience that shaped his understanding of responsibility. Between businesses seeking staff and people hoping for better prospects lie procedures, uncertainties and decisions that profoundly affect human lives.",
    "whyItMatters": "The greatest challenge, he says, is to create prospects while remaining absolutely clear about what can actually be offered, even when more optimistic wording would be easier. Something we say may become the basis on which a person plans the next steps in their life, so accurate information is a substantial responsibility.",
    "reflect": "What have you said that someone may be planning their life around, and is it exactly what you can deliver?"
  },
  {
    "number": "10",
    "title": "Cultivate Your Credibility First",
    "quote": [
      "I would encourage young people to cultivate their credibility first. To honour their commitments, prepare thoroughly, and have the courage to say “I do not know” when necessary. A willingness to learn and ask for help is an important asset in any professional career.",
      "I would also advise them to remain curious about the world: to learn about other cultures, listen to different views, and work with people whose experiences differ from their own. Particularly in international relations, meaningful understanding requires the ability to consider an issue through another person’s eyes.",
      "Ambition needs to be accompanied by patience and ethical judgement. Before accepting a proposal or making a decision, it is worth asking whether they can openly stand behind their choice and what consequences it will have for others. They should treat every person with the same respect, regardless of their position or whether they can be useful to them.",
      "Finally, I would encourage them to find ways to share what they learn and create opportunities for others as well. Professional success acquires deeper meaning when it is connected to a useful contribution to society. They should move forward boldly, correct their mistakes, and build a career they can be proud of, both for what they achieved and for how they achieved it."
    ],
    "whatThisMeans": "His first advice to young people is to cultivate credibility: to honour commitments, prepare thoroughly, and have the courage to say “I do not know” when necessary. He also asks them to remain curious about the world and to consider an issue through another person's eyes.",
    "whyItMatters": "Ambition, he says, needs patience and ethical judgement, and every person deserves the same respect regardless of position or usefulness. He encourages them to share what they learn and create opportunities for others, and to build a career they can be proud of for what they achieved and how they achieved it.",
    "reflect": "Which of your habits would a younger colleague learn credibility from, and which would they not?"
  },
  {
    "number": "11",
    "title": "Translate Trust Into Work of Meaningful Value for Both Peoples",
    "quote": [
      "I believe the next generation of leaders should approach the relationship between Greece and India with mutual respect, equality, and long-term commitment. Each country has different capabilities, needs, and priorities. Meaningful cooperation requires understanding these differences and developing proposals in which each side recognises a clear and fair benefit.",
      "Consistency between intentions and implementation is particularly important. Initiatives need specific goals, clear responsibilities, and continuity, even when the people who launched them change. I consider it a responsibility of leaders to build institutional relationships that can evolve and support the next generation of partnerships.",
      "At the same time, we need to broaden participation. Small and medium-sized enterprises, universities, young professionals, and local communities must have a place in, and access to, the opportunities being created. Knowledge exchange and skills development can strengthen this participation and help benefits endure.",
      "For me, fairness and sustainability must be criteria for every joint initiative: how people are treated, how natural resources are used, and what prospects we leave to future generations. I would like tomorrow’s leaders to see the relationship between Greece and India as an ongoing responsibility to create together, learn from one another, and translate trust into work of meaningful value for both peoples."
    ],
    "whatThisMeans": "For the next generation of leaders in the Greece–India relationship, he asks for mutual respect, equality and long-term commitment, with proposals in which each side recognises a clear and fair benefit. Consistency between intentions and implementation matters, as do specific goals, clear responsibilities and continuity beyond the people who launched an initiative.",
    "whyItMatters": "He wants participation broadened to include small and medium-sized enterprises, universities, young professionals and local communities, supported by knowledge exchange and skills development. Fairness and sustainability, covering how people are treated, how natural resources are used and what prospects are left to future generations, should be criteria for every joint initiative.",
    "reflect": "Who is not yet part of the opportunities you are creating, and what would it take to include them?"
  },
  {
    "number": "12",
    "title": "A Clear Conscience Is What Gives an Achievement Meaning",
    "quote": [
      "For me, success means being able to recognise meaningful value in what I create and feeling that the way I have worked is consistent with my principles. A professional achievement acquires particular meaning when it benefits people, strengthens trust, and creates prospects that endure.",
      "Over time, my attention has shifted more towards the durability and quality of results. Achieving a goal remains important, but I am equally interested in what follows: whether a partnership develops, whether commitments are honoured, and whether the people involved feel their trust was justified.",
      "In my institutional role, I consider it particularly meaningful to help create relationships and opportunities that can continue beyond my own involvement. To enable partners to move forward together, open paths for younger people, and allow an effort to become the foundation for what comes next.",
      "Ultimately, what gives an achievement meaning is being able to look back with a clear conscience: to have worked honestly, taken responsibility for my choices, and contributed something useful. The esteem of the people with whom we have worked and the continuing value of our shared work are, for me, among the most meaningful measures of success."
    ],
    "whatThisMeans": "He defines success as recognising meaningful value in what he creates and feeling that the way he worked is consistent with his principles. Over time his attention has shifted towards the durability and quality of results: whether a partnership develops, commitments are honoured and the people involved feel their trust was justified.",
    "whyItMatters": "In his institutional role, he finds it most meaningful to help create relationships and opportunities that continue beyond his own involvement. His final measure is looking back with a clear conscience, having worked honestly, taken responsibility and contributed something useful.",
    "reflect": "Looking back on your work so far, what has endured beyond your own involvement?"
  }
];

const principlesPart4: Principle[] = [
  {
    "number": "13",
    "title": "Honour People's Trust Through Actions for Which You Are Prepared to Take Responsibility",
    "quote": [
      "The principle I would like to leave to future generations is this: “Honour people’s trust through actions for which you are prepared to take responsibility.”",
      "When someone trusts us, they give us the ability to influence a part of their life. This requires honesty of intention, consistency in our commitments, and the courage to acknowledge our mistakes. It also requires us to consider the consequences of our decisions for people who may lack the power to make their voices heard.",
      "In every relationship, institution, or partnership across borders, trust enables us to move forward together, even when we differ. If we nurture it with respect and responsibility, we leave future generations something valuable: the ability to continue building on what we have created."
    ],
    "whatThisMeans": "Asked for one principle to leave to future generations, he gives this sentence, and then explains it: when someone trusts us, they give us the ability to influence a part of their life.",
    "whyItMatters": "That trust requires honesty of intention, consistency in our commitments and the courage to acknowledge our mistakes, together with attention to people who may lack the power to make their voices heard. Across borders, trust is what allows people to move forward together, even when they differ, and it is what future generations can continue to build on.",
    "reflect": "Whose trust have you been given, and what are you doing to deserve it?"
  }
];

const takeaways = [
  {
    "title": "Honour people's trust through actions for which you are prepared to take responsibility.",
    "body": "When someone trusts us, they give us the ability to influence a part of their life."
  },
  {
    "title": "Can I honestly explain my decision to the people it affects?",
    "body": "The question he returns to, and takes responsibility for the answer."
  },
  {
    "title": "Trust is reinforced every day.",
    "body": "By honouring commitments, communicating difficulties promptly and taking responsibility when something does not proceed as agreed."
  },
  {
    "title": "Human dignity sets a firm boundary for our choices.",
    "body": "Ask who benefits, who bears the cost or risk, and whether the people affected understand what it truly means for them."
  },
  {
    "title": "Take responsibility for the expectations you create.",
    "body": "Explain the conditions honestly, even when more optimistic wording would be easier."
  },
  {
    "title": "Ask before judging.",
    "body": "Confirm that we have understood one another before interpreting a delay or a different approach."
  },
  {
    "title": "A meaningful measure of success is what a partnership leaves behind.",
    "body": "More knowledge, greater trust, fair opportunities, and people who want to continue creating together."
  }
];

const tags = [
  "Leadership & Trust",
  "Human Dignity",
  "International Cooperation",
  "Responsible Opportunity",
  "Greece\u2013India Relations",
];

const toExplore = [
  "Trust and transparency",
  "Dignity of work",
  "Responsible leadership",
  "Cooperation across cultures",
];

const bridge = [
  "Institutional and economic cooperation",
  "Lawful and organised worker mobility",
  "Opportunity, integration and responsibility",
];

function PullQuote({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <p className="text-3xl font-serif leading-snug">{children}</p>
      <p className="mt-4 text-sm text-neutral-500">Angelos Tsavdaris — {label}, Stated</p>
    </section>
  );
}

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
        / Angelos Tsavdaris
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/tsavdaris-portrait.jpg"
            alt="Angelos Tsavdaris"
            width={844}
            height={844}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Angelos Tsavdaris · President, Hellenic-Indian Chamber of Commerce and Economy
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 026
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Angelos <em>Tsavdaris</em>
        </h1>

        <p className="mt-3 text-base font-medium">Leadership, Trust &amp; Human Dignity</p>
        <p className="mt-1 text-sm text-neutral-500">
          International cooperation · Institutional leadership · Opportunities across borders
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Honour people&apos;s trust through actions for which you are prepared to take
          responsibility.&rdquo;
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
          <p className="font-medium">16 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">13 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">October 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-600">
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
        <p className="mt-4 leading-relaxed text-neutral-700">
          Angelos Tsavdaris is President of the Hellenic-Indian Chamber of Commerce and Economy.
          His work includes strengthening Greece&ndash;India relations, promoting institutional and
          economic cooperation, and advancing the EUTOPIA programme, which promotes lawful,
          transparent and socially responsible mobility of skilled workers from India to Greece.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          His principles explore the thinking behind international cooperation, institutional
          leadership and creating opportunities across borders.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Principles to explore
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
              {toExplore.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-neutral-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              A bridge between Greece &amp; India
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
              {bridge.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <blockquote className="mt-6 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Angelos Tsavdaris twelve questions, and one final reflection. He answered
          from his work in Greece&ndash;India cooperation, institutional leadership and the EUTOPIA
          programme.&rdquo;
        </blockquote>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-4 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Thirteen principles · Stated by Angelos Tsavdaris
        </p>
        <h2 className="mt-3 text-3xl font-serif">What he stands for — in his own words.</h2>
        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle III">
        &ldquo;Human dignity sets a firm
        <br />
        <em>boundary for our choices.</em>&rdquo;
      </PullQuote>

      {/* Principles 5-8 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle VII">
        &ldquo;Could I openly explain this decision
        <br />
        <em>to everyone it affects, using the same reasoning?</em>&rdquo;
      </PullQuote>

      {/* Principles 9-12 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle XIII">
        &ldquo;Trust enables us to move forward together,
        <br />
        <em>even when we differ.</em>&rdquo;
      </PullQuote>

      {/* Principle 13 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart4.map((p) => (
            <PrincipleCard key={p.number} p={p} showCta />
          ))}
        </div>
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
          Post a commitment inspired by Angelos Tsavdaris&apos;s principles. State it publicly — and
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
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(URL)}&text=${encodeURIComponent(DESCRIPTION)}`}
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
        <p className="mt-4 text-sm text-neutral-500">16 min read · 13 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
