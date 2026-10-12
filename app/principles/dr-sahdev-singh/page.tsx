import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "dr-sahdev-singh";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Dr. Sahdev Singh — Learn Continuously, Serve with Integrity";
const DESCRIPTION =
  "A career in public service is not defined by where you begin, but by how much you continue to learn, serve and contribute. Seventeen principles from a Deputy Secretary, Government of India, on governance, law, institutions and agriculture.";
const IMAGE = "https://app.stated.in/sahdev-portrait.jpg";
const TOTAL = 17;

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
    images: [{ url: IMAGE, width: 844, height: 844, alt: "Dr. Sahdev Singh" }],
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
      <p className="mt-3 text-sm text-neutral-500">— Dr. Sahdev Singh, stated directly</p>

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
    "title": "A Career Is Not Defined Only by Where One Begins",
    "quote": [
      "My journey has taught me that a career is not defined only by where one begins, but by the willingness to learn, adapt and take responsibility at every stage.",
      "Beginning my professional journey early in life taught me the value of discipline, perseverance and self-reliance. As I moved through different responsibilities and institutions, I realised that every assignment has something to teach us if we approach it with an open mind.",
      "Public service, in particular, requires continuous learning because the issues we deal with are constantly changing. Knowledge, experience and integrity must therefore develop together.",
      "For me, the journey has been less about positions and more about learning how to contribute meaningfully wherever I am placed."
    ],
    "whatThisMeans": "He starts from the fact that his professional journey began early, after his 10th standard, and treats that beginning as a teacher rather than a limit. Discipline, perseverance and self-reliance came first, and every later assignment added something to learn if approached with an open mind.",
    "whyItMatters": "He puts learning, adaptability and responsibility ahead of position. Knowledge, experience and integrity, in his view, have to develop together, because the issues public service deals with are constantly changing.",
    "reflect": "Looking at where you began, which habits did that early start build in you, and are you still learning with the same openness at every stage?"
  },
  {
    "number": "02",
    "title": "A Public Position Is a Responsibility, Not a Privilege",
    "quote": [
      "A public position is a responsibility, not a privilege.",
      "Holding an office gives an individual certain authority, but public service gives that authority a purpose. The real measure of public service is not the designation one holds, but the difference one's work makes to institutions and to people's lives.",
      "A public servant must remember that citizens ultimately experience government not through policies and files, but through the way those policies are implemented.",
      "Integrity, accountability, responsiveness and empathy therefore have to be part of administration, not merely words in official documents.",
      "The responsibility of a public servant is to use authority with restraint, knowledge with humility and position with a clear sense of public purpose."
    ],
    "whatThisMeans": "He separates the authority an office gives from the purpose that authority serves. The real measure of public service, he says, is the difference one's work makes to institutions and to people's lives, not the designation one holds.",
    "whyItMatters": "Citizens experience government through the way policies are implemented, not through policies and files. That is why integrity, accountability, responsiveness and empathy have to be part of administration itself rather than words in official documents.",
    "reflect": "If someone judged your work only by how it was implemented and experienced, what would they say about the way you use your position?"
  },
  {
    "number": "03",
    "title": "Integrity Begins When Personal Convenience Ends",
    "quote": [
      "Integrity begins when personal convenience ends.",
      "In public life, there will always be pressures, competing interests and situations where the easiest decision may not necessarily be the right one. Integrity means having the clarity to distinguish between what is convenient and what is correct.",
      "It also means consistency. A person's principles cannot change depending on who is present, who is watching or what position one occupies.",
      "For me, integrity is ultimately about being able to take a decision, explain the reasoning behind it and remain comfortable with that decision even when there is no external recognition for doing the right thing."
    ],
    "whatThisMeans": "He treats integrity as a practical test, not a slogan. In public life there will always be pressures and competing interests, and the real skill lies in telling what is convenient from what is correct.",
    "whyItMatters": "Consistency is central to his definition: a person's principles cannot change depending on who is present, who is watching or what position one occupies. His own measure is being able to take a decision, explain the reasoning and stay comfortable with it even when there is no external recognition.",
    "reflect": "When did you last take a decision that was correct but not convenient, and could you explain the reasoning without discomfort?"
  },
  {
    "number": "04",
    "title": "Efficiency Is Important, but Responsiveness Is Equally Important",
    "quote": [
      "Good governance begins with understanding the purpose behind a process.",
      "Rules and procedures are necessary because institutions cannot function without systems. But procedures should serve public objectives rather than become an end in themselves.",
      "People-centric governance requires administrators to understand the realities behind the file—the farmer waiting for an outcome, the student seeking an opportunity, the citizen trying to access a service or the community affected by a policy.",
      "Efficiency is important, but responsiveness is equally important.",
      "The strongest institutions are those that combine sound systems with sensitivity to the people those systems are intended to serve."
    ],
    "whatThisMeans": "He does not dismiss rules and procedures, which institutions need in order to function. His point is that procedures must serve public objectives rather than become an end in themselves.",
    "whyItMatters": "People-centric governance, for him, means seeing the reality behind the file: the farmer waiting for an outcome, the student seeking an opportunity, the citizen trying to access a service, the community affected by a policy. The strongest institutions combine sound systems with sensitivity to the people those systems serve.",
    "reflect": "Behind the file, form or process you handle most often, who is actually waiting, and have you looked at their reality lately?"
  },
  {
    "number": "05",
    "title": "Understand the Law Deeply Enough to Apply It Fairly",
    "quote": [
      "Law provides the framework within which administration must function, but good administration also requires judgement.",
      "An administrator must understand not only the letter of the law but also its purpose, constitutional values and practical implications.",
      "There can be situations where a purely mechanical interpretation of a rule may fail to address the underlying public interest. That does not mean ignoring the law. It means understanding the law deeply enough to apply it fairly, rationally and in its proper context.",
      "Knowledge of law provides the foundation; judgement, fairness and experience determine how that foundation is translated into responsible administration."
    ],
    "whatThisMeans": "Drawing on his experience in law and administration, he says law is the framework within which administration must function, but good administration also requires judgement. An administrator has to understand the letter of the law as well as its purpose, constitutional values and practical implications.",
    "whyItMatters": "He is careful to say that this does not mean ignoring the law. It means knowing it well enough to apply it fairly, rationally and in context, with knowledge as the foundation and judgement, fairness and experience deciding how that foundation becomes responsible administration.",
    "reflect": "Where in your own work have you applied a rule mechanically when understanding its purpose would have served the public interest better?"
  }
];

const principlesPart2: Principle[] = [
  {
    "number": "06",
    "title": "Build Systems That Outlast Individuals",
    "quote": [
      "In my view, institution-building means creating robust systems, capable people, effective processes and enabling infrastructure that continue to function efficiently even when individual officers move on. A strong institution should not depend on any one individual.",
      "For example, as an administrator, I focused on strengthening the work environment through improvements in IT and digital infrastructure, workplace facilities, training centres and field offices. These initiatives helped create a more conducive and efficient environment for employees.",
      "Such improvements go beyond physical infrastructure. They facilitate better communication, coordination, training, knowledge sharing, faster decision-making and improved productivity, enabling employees to deliver better results within a given period.",
      "The ultimate objective is to create a ready, responsive and service-oriented institutional ecosystem in which people, processes, technology and infrastructure work together effectively.",
      "I believe the true test of leadership is not how much an individual accomplishes personally, but how much institutional capacity he or she leaves behind. My approach is therefore to build systems that outlast individuals, develop people who can sustain them, and create an enabling environment that continuously improves efficiency, effectiveness and quality of service delivery."
    ],
    "whatThisMeans": "In his view, institution-building means creating robust systems, capable people, effective processes and enabling infrastructure that keep functioning even when individual officers move on. He grounds this in his own work as an administrator: strengthening IT and digital infrastructure, workplace facilities, training centres and field offices.",
    "whyItMatters": "He argues that such improvements go beyond physical infrastructure, because they enable better communication, coordination, training, knowledge sharing and faster decision-making. His test of leadership is how much institutional capacity one leaves behind, not how much one accomplishes personally.",
    "reflect": "If you left your role tomorrow, what systems and people would keep the work running, and what would stop?"
  },
  {
    "number": "07",
    "title": "A Farmer Is Already an Entrepreneur",
    "quote": [
      "I believe Indian agriculture must move beyond a production-centric approach towards an entrepreneurship- and market-centric approach. While increasing agricultural productivity remains important, farmers must also be empowered with the skills and resources needed to create value and participate meaningfully across the agricultural value chain.",
      "A farmer is already an entrepreneur, making decisions relating to inputs, investment, technology, production, risk and markets. However, farmers need better market intelligence, business acumen, price-negotiation skills, risk-management capabilities and access to finance to realise the full economic potential of their efforts.",
      "In my role in public administration and the Department of Agriculture and Farmers Welfare, and while holding the additional charge of Director, CCS NIAM, I have come to appreciate the importance of agricultural marketing in improving farmers' economic returns. Efficient aggregation, grading, standardisation, storage, processing, value addition and market linkages can strengthen farmers' bargaining power and help them secure a greater share of the value generated beyond the farm gate.",
      "Our objective should be to empower farmers as informed entrepreneurs with greater market access, economic choices and sustainable livelihood opportunities."
    ],
    "whatThisMeans": "Agriculture must be viewed as a complete economic value chain rather than merely an activity of production. Farmers already make entrepreneurial decisions every day, but they need appropriate skills, information, finance and institutional support to make those decisions more rewarding.",
    "whyItMatters": "Recognising farmers as entrepreneurs shifts the focus from how much they produce to how effectively they can market their produce, manage risks and capture value. Stronger agricultural marketing systems can help improve farm incomes and bargaining power.",
    "reflect": "How can we move beyond treating farmers merely as producers or beneficiaries and enable them to become informed, confident agricultural entrepreneurs?"
  },
  {
    "number": "08",
    "title": "The Farmer and the Market Are Part of the Same Ecosystem",
    "quote": [
      "I believe the most important change required in Indian agriculture is to transform the relationship between farmers and markets from a largely transactional relationship into a strong, transparent and mutually beneficial business partnership.",
      "Traditionally, agricultural development has focused considerably on increasing production, while market access, price discovery, value addition and consumer preferences have received comparatively less attention. Higher production alone does not necessarily translate into higher farm income. Agricultural marketing must therefore become an integral part of agricultural development.",
      "In my view, five priority areas are essential to this transformation: strengthening market intelligence and price transparency; developing Farmer Producer Organisations (FPOs) as professionally managed business enterprises; investing in post-harvest infrastructure, storage, processing and value addition; building trust-based, long-term partnerships between farmers and market participants; and developing farmers as entrepreneurs with better business and risk-management skills.",
      "Agricultural marketing institutions have a crucial role in connecting producers, markets and consumers through capacity building, market-oriented education, research and industry partnerships. These efforts should create transparent and efficient value chains that protect the interests of both farmers and consumers.",
      "Ultimately, agricultural policy must focus not only on increasing productivity but also on improving farmers' incomes, choices, bargaining power and ability to secure a fair share of the value they create."
    ],
    "whatThisMeans": "Farmers and markets must be treated as interconnected parts of the same agricultural ecosystem. Production decisions need to be supported by reliable market information, efficient supply chains, adequate infrastructure and opportunities for value addition.",
    "whyItMatters": "A shift towards transparent and mutually beneficial market partnerships can help FPOs negotiate better terms, reduce post-harvest losses, improve market access and create more predictable business relationships. This can make agricultural growth more rewarding for farmers while strengthening links with consumers.",
    "reflect": "Does the way we measure agricultural success capture improvements in farmers' incomes and bargaining power, or does it focus mainly on how much they produce?"
  },
  {
    "number": "09",
    "title": "Not an Occupation of Last Resort",
    "quote": [
      "I believe young people can play a transformative role in making Indian agriculture more competitive, profitable, sustainable and attractive. Their familiarity with technology, data, innovation and entrepreneurship offers significant opportunities to address challenges across the agricultural value chain.",
      "From my experience in government, higher education and agricultural administration, I see considerable potential to nurture the next generation through agricultural marketing education, entrepreneurship development, agribusiness incubation, industry partnerships and practical exposure to emerging value chains.",
      "Agriculture should be presented not merely as cultivation, but as a diverse field of opportunities in agri-business, digital agriculture, research, food processing, agricultural marketing, logistics, supply-chain management and value addition. Institutions such as CCS NIAM can contribute by equipping young people with professional knowledge, entrepreneurial capabilities and an understanding of both agricultural realities and market opportunities.",
      "Our focus should be on developing not only job seekers but also job creators who can establish viable enterprises, strengthen FPOs, improve market linkages and develop innovative solutions to farmers' real challenges. With appropriate mentoring, institutional support, finance and industry connections, young entrepreneurs can bridge the gap between farmers and markets.",
      "Ultimately, young people must become the bridge between the farm and the future—combining technology with entrepreneurship, innovation with inclusion, and business growth with farmers' welfare. By channelising their talent towards practical agricultural challenges, we can create meaningful opportunities for employment, enterprise and nation-building."
    ],
    "whatThisMeans": "Young people can contribute to agricultural transformation not only as cultivators but also as entrepreneurs, researchers, technologists, marketers and innovators. Agricultural education and practical industry exposure can help them identify opportunities across the value chain.",
    "whyItMatters": "Developing job creators alongside job seekers can generate rural employment, strengthen agricultural markets and improve farmers' access to technology, services and value addition. Institutions such as CCS NIAM can help connect education, entrepreneurship and industry requirements.",
    "reflect": "How can we equip young people to turn agricultural challenges into viable business opportunities that benefit both farmers and the wider rural economy?"
  },
  {
    "number": "10",
    "title": "The Ability to Learn, Unlearn and Relearn",
    "quote": [
      "Lifelong learning has taught me that expertise is never complete.",
      "The moment we believe that we know enough is often the moment our ability to grow begins to decline.",
      "Every new assignment exposes us to unfamiliar problems, different perspectives and new ways of thinking. Learning therefore should not stop with formal education or professional qualifications.",
      "Curiosity is an important professional quality because it keeps us willing to ask questions, examine assumptions and understand changing circumstances.",
      "In a rapidly changing world, the ability to learn, unlearn and relearn may be more valuable than any single qualification."
    ],
    "whatThisMeans": "He says plainly that expertise is never complete, and that the moment we believe we know enough is often the moment our ability to grow begins to decline. Each new assignment brings unfamiliar problems, different perspectives and new ways of thinking.",
    "whyItMatters": "Learning, for him, does not stop with formal education or professional qualifications. Curiosity keeps us willing to ask questions, examine assumptions and understand changing circumstances, and in a rapidly changing world the ability to learn, unlearn and relearn may be more valuable than any single qualification.",
    "reflect": "What assumption in your work have you not examined for a long time, and what would you have to unlearn to question it?"
  }
];

const principlesPart3: Principle[] = [
  {
    "number": "11",
    "title": "Experience Becomes More Valuable When It Is Shared",
    "quote": [
      "Experience becomes more valuable when it is shared.",
      "Those who have benefited from institutions, mentors and opportunities have a responsibility to pass knowledge forward.",
      "Mentorship should not mean telling the next generation what to do. It should help young people develop the ability to think independently, question assumptions and make informed decisions.",
      "The objective of education should not simply be to create qualified individuals, but thoughtful and responsible citizens capable of contributing to society.",
      "If our experience can help a young person avoid a mistake, see a possibility or develop confidence in their own ability, sharing that experience becomes a meaningful form of public service."
    ],
    "whatThisMeans": "He holds that those who have benefited from institutions, mentors and opportunities have a responsibility to pass knowledge forward. Mentorship, in his view, is not telling the next generation what to do.",
    "whyItMatters": "It is helping young people think independently, question assumptions and make informed decisions. The aim of education is thoughtful and responsible citizens, and if experience helps a young person avoid a mistake, see a possibility or gain confidence, sharing it becomes a meaningful form of public service.",
    "reflect": "Whose mistake could your experience help someone avoid, and when will you share it?"
  },
  {
    "number": "12",
    "title": "Authority Can Compel Compliance, but It Cannot Create Genuine Trust",
    "quote": [
      "Authority can compel compliance, but it cannot create genuine trust.",
      "Trust is built through consistency, competence, fairness and the willingness to take responsibility.",
      "People observe what a leader does much more closely than what a leader says. If a leader expects discipline but does not demonstrate it, or expects accountability but avoids it personally, credibility is quickly lost.",
      "Leadership therefore begins with example.",
      "The most enduring influence comes when people respect not merely the position a person occupies, but the values and conduct associated with that person."
    ],
    "whatThisMeans": "He draws a clear line between authority and trust. Trust, he says, is built through consistency, competence, fairness and the willingness to take responsibility.",
    "whyItMatters": "People watch what a leader does much more closely than what a leader says, so a leader who expects discipline or accountability without demonstrating it quickly loses credibility. Leadership therefore begins with example, and the most enduring influence comes when people respect the values and conduct of the person, not only the position.",
    "reflect": "Is there a standard you expect from others that you do not consistently demonstrate yourself?"
  },
  {
    "number": "13",
    "title": "Adaptability Is Applying Principles Intelligently to Changing Circumstances",
    "quote": [
      "Every new responsibility initially appears unfamiliar, but unfamiliarity can also be an opportunity to learn.",
      "Moving between different areas taught me not to approach a new assignment with the assumption that previous methods will automatically work in a new environment.",
      "The subject may change, but certain fundamentals remain constant—understanding the problem, listening to stakeholders, studying the available evidence, understanding the institutional framework and then taking responsibility for a decision.",
      "Adaptability is therefore not about abandoning one's principles. It is about applying those principles intelligently to changing circumstances."
    ],
    "whatThisMeans": "Having worked across different areas of government and administration, he treats unfamiliarity as an opportunity to learn. Moving between areas taught him not to assume that previous methods will automatically work in a new environment.",
    "whyItMatters": "The subject may change, but the fundamentals stay constant: understanding the problem, listening to stakeholders, studying the evidence, understanding the institutional framework and then taking responsibility for a decision. Adaptability is not abandoning one's principles but applying them intelligently.",
    "reflect": "In your last unfamiliar assignment, which fundamentals did you rely on, and which old methods did you have to leave behind?"
  },
  {
    "number": "14",
    "title": "Good Judgement Develops Through Reflection",
    "quote": [
      "Books can provide knowledge, frameworks and perspectives, but experience teaches us the complexity of applying them.",
      "Real situations rarely arrive as neatly defined problems. They involve competing priorities, incomplete information, human emotions, institutional constraints and consequences that may not be immediately visible.",
      "Experience teaches us to listen carefully before deciding, to understand different perspectives and to recognise that a technically correct decision may still require thoughtful implementation.",
      "Perhaps the most important lesson is that good judgement develops through reflection—by looking back at decisions, understanding their consequences and remaining willing to learn from them."
    ],
    "whatThisMeans": "He says books provide knowledge, frameworks and perspectives, but experience teaches the complexity of applying them. Real situations rarely arrive as neatly defined problems: they involve competing priorities, incomplete information, human emotions, institutional constraints and consequences that may not be immediately visible.",
    "whyItMatters": "Experience teaches listening carefully before deciding, understanding different perspectives and recognising that a technically correct decision may still require thoughtful implementation. For him, the most important lesson is that good judgement develops by looking back at decisions, understanding their consequences and remaining willing to learn from them.",
    "reflect": "Which past decision have you not yet looked back on, and what might it teach you?"
  },
  {
    "number": "15",
    "title": "Leave Behind More Capability Than You Inherited",
    "quote": [
      "Do not measure your career only by the positions you occupy. Measure it by the value you create and the institutions, people and communities that are stronger because of your contribution.",
      "Positions change. Responsibilities change. Organisations change.",
      "What remains is the integrity with which we performed our responsibilities, the knowledge we shared, the people we helped develop and the systems we helped strengthen.",
      "A meaningful career should therefore leave behind more capability than it inherited."
    ],
    "whatThisMeans": "His advice to the next generation of civil servants, professionals, educators, entrepreneurs and institution-builders is not to measure a career only by positions occupied, but by the value created and the institutions, people and communities made stronger.",
    "whyItMatters": "Positions, responsibilities and organisations change. What remains, he says, is the integrity with which responsibilities were performed, the knowledge shared, the people helped to develop and the systems strengthened, so a meaningful career should leave behind more capability than it inherited.",
    "reflect": "When you move on from your current role, what capability will remain that was not there when you arrived?"
  }
];

const principlesPart4: Principle[] = [
  {
    "number": "16",
    "title": "Learn Continuously, Serve with Integrity",
    "quote": [
      "Learn continuously, serve with integrity, and leave every institution and every person you touch stronger than you found them."
    ],
    "whatThisMeans": "Asked for his personal philosophy of life and public service in a single sentence a student could read twenty years from now, he gives three commitments: learn continuously, serve with integrity, and leave every institution and every person stronger than you found them.",
    "whyItMatters": "The sentence ties together the themes of the whole series: lifelong learning, integrity in the use of authority, and the measure of a career as what it leaves behind, in institutions and in people.",
    "reflect": "Which of the three commitments, learning, integrity or leaving others stronger, needs the most attention in your own life right now?"
  },
  {
    "number": "17",
    "title": "The Most Lasting Measure of a Career",
    "quote": [
      "The most meaningful part of a career in public service is difficult to reduce to a position or designation.",
      "For me, it is the opportunity to contribute—to institutions, to public administration, to knowledge and, ultimately, to people.",
      "A career becomes meaningful when the work continues to have value beyond the period in which one performs a particular responsibility.",
      "If something I have learned can help strengthen an institution, assist a colleague, guide a student, contribute to farmers' welfare or help a young person think differently about public service, then that is perhaps the most lasting measure of a career."
    ],
    "whatThisMeans": "In his closing reflection, he says the most meaningful part of a career in public service is difficult to reduce to a position or designation. For him, it is the opportunity to contribute to institutions, to public administration, to knowledge and ultimately to people.",
    "whyItMatters": "A career becomes meaningful when the work continues to have value beyond the period in which one performs a particular responsibility. If something he has learned can strengthen an institution, assist a colleague, guide a student, contribute to farmers' welfare or help a young person think differently about public service, that is, in his words, perhaps the most lasting measure of a career.",
    "reflect": "What of your work will still have value after you have moved on from it?"
  }
];

const takeaways = [
  {
    "title": "A career is not defined only by where one begins.",
    "body": "It is defined by the willingness to learn, adapt and take responsibility at every stage."
  },
  {
    "title": "A public position is a responsibility, not a privilege.",
    "body": "Authority gains its purpose from the difference one's work makes to institutions and to people's lives."
  },
  {
    "title": "Integrity begins when personal convenience ends.",
    "body": "Principles cannot change depending on who is present, who is watching or what position one occupies."
  },
  {
    "title": "Build systems that outlast individuals.",
    "body": "The true test of leadership is how much institutional capacity one leaves behind."
  },
  {
    "title": "A farmer is already an entrepreneur.",
    "body": "Our objective should be to empower farmers as informed entrepreneurs with greater market access, economic choices and sustainable livelihood opportunities."
  },
  {
    "title": "Authority can compel compliance, but it cannot create genuine trust.",
    "body": "Leadership begins with example."
  },
  {
    "title": "Learn continuously, serve with integrity, and leave every institution and every person you touch stronger than you found them.",
    "body": "A meaningful career should leave behind more capability than it inherited."
  }
];

const tags = [
  "Public Service & Responsibility",
  "Governance & Administration",
  "Law, Justice & Institutions",
  "Agriculture & Farmers' Welfare",
  "Institution Building",
];

function PullQuote({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <p className="text-3xl font-serif leading-snug">{children}</p>
      <p className="mt-4 text-sm text-neutral-500">Dr. Sahdev Singh — {label}, Stated</p>
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
        / Dr. Sahdev Singh
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/sahdev-portrait.jpg"
            alt="Dr. Sahdev Singh"
            width={844}
            height={844}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Dr. Sahdev Singh · Deputy Secretary, Government of India · Ministry of Agriculture &amp;
          Farmers Welfare
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Director (Administration), Directorate of Marketing and Inspection (DMI) · Additional
          Charge, Director (Administration), CCS-NIAM, Jaipur
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 025
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Dr. Sahdev <em>Singh</em>
        </h1>

        <p className="mt-3 text-base font-medium">Learn Continuously, Serve with Integrity</p>
        <p className="mt-1 text-sm text-neutral-500">
          Governance Leader · Scholar · Institution Builder
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;A career in public service is not defined by where you begin, but by how much you
          continue to learn, serve and contribute.&rdquo;
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
          <p className="font-medium">17 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">17 stated</p>
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
          Dr. Sahdev Singh is an accomplished officer of the Central Secretariat Service, with a
          diverse and enriching career spanning multiple Ministries and encompassing the fields of
          law, education and agriculture. He is currently serving as Deputy Secretary to the
          Government of India in the Ministry of Agriculture and Farmers Welfare. He also serves as
          Director (Administration) of the Directorate of Marketing and Inspection (DMI) and holds
          the additional charge of Director (Administration) at the Chaudhary Charan Singh National
          Institute of Agricultural Marketing (CCS-NIAM), Jaipur.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          With a strong academic foundation and a deep passion for learning, teaching and
          institutional development, Dr. Sahdev Singh brings valuable insights into governance,
          law, public administration, agriculture and nation-building. He is a firm believer in
          continuous learning, integrity and purposeful public service.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-neutral-700">
          <li>
            Began his career in public service after completing his Class 10 education, driven by a
            strong sense of commitment and purpose.
          </li>
          <li>
            Served in various Ministries of the Government of India, including the Ministries of
            Health and Family Welfare, Shipping, and Justice.
          </li>
          <li>
            Possesses a strong legal background, with an LL.B. and LL.M. in International Maritime
            Law, along with advanced studies in Constitutional Law, International Law and
            Diplomacy.
          </li>
          <li>
            Holds a Doctorate in Law and has also been conferred honorary doctorates in recognition
            of his academic and professional contributions.
          </li>
          <li>
            Actively pursues his passion for education as a visiting faculty member for LL.B. and
            LL.M. students, as well as research scholars.
          </li>
          <li>
            Contributes to the fields of agriculture, farmers&apos; welfare, institutional
            development and capacity building, with a focus on strengthening governance and public
            service delivery.
          </li>
        </ul>
        <blockquote className="mt-6 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Dr. Sahdev Singh sixteen questions, and one final reflection. He answered
          from a career in public service that began after his 10th standard and has run across
          governance, law, education and agriculture.&rdquo;
        </blockquote>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-5 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Seventeen principles · Stated by Dr. Sahdev Singh
        </p>
        <h2 className="mt-3 text-3xl font-serif">What he stands for — in his own words.</h2>
        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle II">
        &ldquo;A public position is a responsibility,
        <br />
        <em>not a privilege.</em>&rdquo;
      </PullQuote>

      {/* Principles 6-10 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle III">
        &ldquo;Integrity begins
        <br />
        <em>when personal convenience ends.</em>&rdquo;
      </PullQuote>

      {/* Principles 11-15 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle XII">
        &ldquo;Authority can compel compliance,
        <br />
        <em>but it cannot create genuine trust.</em>&rdquo;
      </PullQuote>

      {/* Principles 16-17 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart4.map((p, i) => (
            <PrincipleCard key={p.number} p={p} showCta={i === principlesPart4.length - 1} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle XVI">
        &ldquo;Learn continuously, serve with integrity,
        <br />
        <em>and leave every institution and every person you touch stronger than you found them.</em>&rdquo;
      </PullQuote>

      {/* Perspectives */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">Perspectives that matter</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {[
            "Public Service & Responsibility",
            "Governance & Administration",
            "Law, Justice & Institutions",
            "Lifelong Learning & Excellence",
            "Agriculture & Farmers' Welfare",
            "Institution Building",
            "Education & Mentorship",
            "Integrity, Discipline & Purpose",
          ].map((tag) => (
            <span key={tag} className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-600">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm italic text-neutral-500">
          Lessons for future leaders, public servants, professionals and changemakers.
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
          Post a commitment inspired by Dr. Sahdev Singh&apos;s principles. State it publicly — and
          make it real.
        </p>
        <a
          href="https://app.stated.in/signup"
          className="mt-5 inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Create a Commitment
        </a>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Disclaimer
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            This publication is part of the Stated Principles Series. The views, opinions and
            experiences expressed here are those of the contributor, are shared in a personal
            capacity and are based on his personal experiences and perspectives.{" "}
            <span className="font-medium">
              They do not necessarily represent the views or opinions of the Government of India or
              of any Ministry, Department or organisation with which he is or has been associated.
            </span>
          </p>
        </div>
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
        <p className="mt-4 text-sm text-neutral-500">17 min read · 17 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
