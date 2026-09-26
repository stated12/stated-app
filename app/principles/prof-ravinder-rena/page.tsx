import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "prof-ravinder-rena";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Prof. Dr. Ravinder Rena — The True Measure of a Life Is Not What We Accumulate, but What We Give Back";
const DESCRIPTION =
  "True leadership is defined not by the authority one holds, but by the positive difference one makes in the lives of others. Sixteen principles from a career in economics, education, and public service.";
const IMAGE = "https://app.stated.in/rena-portrait.jpg";

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
    images: [{ url: IMAGE, width: 851, height: 851, alt: "Prof. Dr. Ravinder Rena" }],
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
    title: "Titles and Status Are Fleeting; the Difference We Make Endures",
    quote: [
      "Throughout my journey as an academic, researcher, and public servant, I have come to understand that true leadership is defined not by the authority one holds, but by the positive difference one makes in the lives of others.",
      "Early in my career, I believed that success was measured through titles, publications, or recognition. Over time, however, I realised that genuine fulfilment comes from empowering others, whether by mentoring young researchers, shaping inclusive policies, or contributing to community development.",
      "My guiding principle has always been that knowledge must serve humanity. Whether through my academic work in economics and development studies or through my engagement with government and civil society, I strive to bridge theory and practice for social good.",
      "I also believe strongly in humility and continuous learning. No matter how many years of experience one gains, there is always more to learn from others, especially from the communities we aim to serve.",
      "Finally, integrity and consistency in values, both personal and professional, have remained the cornerstone of my journey. Titles and positions are fleeting, but the values we uphold and the difference we make in people's lives endure far beyond any professional milestone.",
    ],
    whatThisMeans:
      "He describes a real shift in how he measured success, from titles, publications, and recognition early on, to genuine fulfilment found in empowering others, whether through mentoring, policy work, or community development.",
    whyItMatters:
      "\"Titles and positions are fleeting, but the values we uphold and the difference we make in people's lives endure\" places the emphasis on what actually outlasts a career, not the markers most academic and professional paths are built to chase.",
    reflect:
      "Are you currently measuring your own success by titles and recognition, or by the difference you're actually making in someone else's life?",
  },
  {
    number: "02",
    title: "True Leadership Is Defined by Service, Not Authority",
    quote: [
      "Leadership, to me, is fundamentally about service, empathy and vision. Having worked across academic, governmental and community sectors, I have learned that effective leadership requires listening more than instructing.",
      "A good leader must understand the aspirations and struggles of those they serve, and must create pathways for collaboration rather than control.",
      "I also believe that leadership demands moral courage, the willingness to make difficult decisions that align with ethical principles, even when they are unpopular. Transparency and accountability are indispensable, particularly in public and academic institutions where trust must be earned continuously.",
      "Equally important is the capacity to inspire hope and confidence in others, especially the youth, who represent the future of any nation or institution. My leadership philosophy is therefore rooted in the idea that true leadership is not defined by authority, but by the ability to uplift others and create sustainable, positive change.",
    ],
    whatThisMeans:
      "He treats listening as a leadership skill that has to come before instructing, not a courtesy performed after decisions are already made, requiring genuine understanding of the aspirations and struggles of the people being led.",
    whyItMatters:
      "Naming moral courage specifically as the willingness to make unpopular but ethically aligned decisions distinguishes real leadership from simply being liked or avoiding controversy, a harder and less comfortable standard.",
    reflect:
      "Think of your last unpopular decision. Did you make it because it was ethically right, or did you avoid it because it would cost you support?",
  },
  {
    number: "03",
    title: "Education Is the Progressive Discovery of the Human Being",
    quote: [
      "I strongly believe that education is not merely the transmission of information, but the progressive discovery of the human being. This is a principle I have consistently emphasised throughout my academic career, particularly through my work in economics education and human capital development.",
      "Education should nurture critical thinking, ethical awareness and social responsibility, alongside technical competence. It must empower individuals to become active contributors to society, not passive recipients of knowledge.",
      "I have often highlighted the importance of contextualising education to address real-world challenges such as poverty, inequality and sustainable development. My philosophy is that education, when combined with empathy and purpose, becomes a transformative force capable of shaping both individuals and societies for the better.",
    ],
    whatThisMeans:
      "He deliberately expands the definition of education beyond information transfer, treating critical thinking, ethical awareness, and social responsibility as equally essential outcomes alongside technical competence, not optional additions to it.",
    whyItMatters:
      "Insisting that education be contextualised to real-world challenges like poverty and inequality, rather than taught in the abstract, ties his academic philosophy directly to the development work that runs through the rest of his answers.",
    reflect:
      "In your own learning, or in how you teach or mentor others, is critical thinking and ethical awareness treated as central, or as something secondary to technical competence?",
  },
  {
    number: "04",
    title: "When Economics Centers on Human Dignity, Growth Numbers Become Real Welfare",
    quote: [
      "My work in economics is driven by the conviction that economic policies must ultimately serve human welfare and dignity. I have spent much of my career studying how developing economies, particularly in Africa and Asia, can achieve inclusive and sustainable growth.",
      "I firmly believe that economic growth should not be measured solely by GDP figures, but by improvements in people's quality of life, access to education, healthcare and employment opportunities.",
      "My research has often focused on structural transformation, informal sector development and regional integration as pathways to reducing poverty and inequality. I also advocate strongly for evidence-based policymaking that incorporates the voices of marginalised communities.",
      "Ultimately, I see economics as a tool for social justice, one that must be applied with compassion and rigour to create real, measurable improvements in people's lives.",
    ],
    whatThisMeans:
      "He rejects GDP alone as the measure of successful economic policy, replacing it with quality of life, access to education, healthcare, and employment, a shift from an abstract number to whether people's actual circumstances improved.",
    whyItMatters:
      "Advocating for evidence-based policymaking that specifically incorporates the voices of marginalised communities means the evidence itself has to include people usually left out of the data that shapes policy in the first place.",
    reflect:
      "In your own field, is success currently measured by an abstract number, or by whether it actually improved something concrete in people's lives?",
  },
  {
    number: "05",
    title: "Inclusive Growth Rests on Four Pillars",
    quote: [
      "In my view, inclusive economic growth rests on four key pillars: equitable access to education and skills development, gender and social inclusion, sustainable use of resources, and strong institutional governance.",
      "Education equips individuals with the tools to participate meaningfully in the economy, while gender and social inclusion ensure that growth benefits reach all segments of society, not just a privileged few.",
      "Sustainability ensures that development today does not compromise future generations, and good governance guarantees transparency, accountability and efficient use of resources.",
      "My research and policy engagements have consistently emphasised these interconnected pillars as essential for building resilient, inclusive economies, particularly in developing regions such as Sub-Saharan Africa and South Asia.",
    ],
    whatThisMeans:
      "He gives inclusive growth a precise structure, four named pillars rather than a vague call for fairness, each addressing a distinct failure mode: exclusion from skills, exclusion by gender or group, resource depletion, and weak governance.",
    whyItMatters:
      "Treating sustainability as ensuring \"development today does not compromise future generations\" ties environmental responsibility directly into economic inclusion, rather than positioning them as competing priorities.",
    reflect:
      "Of his four pillars, education access, gender and social inclusion, sustainability, and governance, which one is most neglected in the systems you're closest to?",
  },
];

const principlesPart2 = [
  {
    number: "06",
    title: "Economic Justice Is Not Granted; It Is Built Through Unity and Shared Purpose",
    quote: [
      "Global economic dynamics are undergoing significant transformation, with shifting power balances between the Global North and Global South. I believe that developing nations must strengthen regional cooperation, enhance industrial capacity and invest in human capital to reduce dependency on traditional economic powers.",
      "Initiatives such as intra-African trade, South-South cooperation and coalitions like BRICS+ can play pivotal roles in reshaping global economic governance to be more equitable.",
      "At the same time, I emphasise that economic sovereignty must be paired with sound domestic policies, strong institutions and social investment, so that growth translates into meaningful improvements in citizens' lives. I remain a strong advocate for multilateralism grounded in fairness, transparency and mutual respect among all nations, both developed and developing.",
      "True economic justice, in my view, is not simply granted by global institutions but is built through the unity, innovation and shared purpose of nations working together toward common prosperity.",
    ],
    whatThisMeans:
      "He pairs a call for developing nations to strengthen regional cooperation and reduce dependency with an explicit caveat: economic sovereignty only produces real benefit for citizens when it comes paired with sound domestic policy and strong institutions at home.",
    whyItMatters:
      "This is his own stated position on a genuinely contested area of international economic policy. He frames it as a call for fairer multilateralism rather than opposition to any specific country, but it engages directly with debates about global economic power that reasonable people weigh differently.",
    reflect:
      "Where do you see the balance between external cooperation and internal institutional strength playing out in your own country's or region's development?",
  },
  {
    number: "07",
    title: "Policy Is Not a Static Document; It Is a Living Commitment to Human Welfare",
    quote: [
      "Public policy, to be effective, must be dynamic, evidence-based and responsive to the needs of the population it serves. I have always advocated for policies that are inclusive, participatory and grounded in rigorous research.",
      "One of my core principles is that policy formulation should involve continuous consultation with stakeholders, including marginalised and vulnerable groups, to ensure that interventions address actual needs rather than assumed ones.",
      "I also stress the importance of monitoring and evaluation frameworks to track policy outcomes and make necessary adjustments over time. Furthermore, I believe that policies must balance short-term economic objectives with long-term social and environmental sustainability.",
      "In essence, effective policy design requires humility, flexibility and a genuine commitment to improving human welfare, recognising that policy is not a static document but a living framework that must evolve with society's changing needs.",
    ],
    whatThisMeans:
      "He specifically names monitoring and evaluation frameworks as essential, treating policy as something that must be tracked and adjusted over time rather than written once and assumed to work as intended indefinitely.",
    whyItMatters:
      "Insisting policy address \"actual needs rather than assumed ones\" through continuous consultation with marginalised groups directly challenges policymaking that relies on assumptions about what people need rather than asking them.",
    reflect:
      "Is there a policy or plan in your own organisation that was designed once and never revisited, the way he warns against?",
  },
  {
    number: "08",
    title: "PhD Stands for Patience, Honesty, and Dedication",
    quote: [
      "My doctoral journey was, without doubt, one of the most transformative experiences of my academic career. Beyond the acquisition of specialised knowledge in economics, it profoundly shaped my critical thinking, research rigour and analytical precision.",
      "The process taught me the value of intellectual humility, recognising that knowledge is continuously evolving and that rigorous inquiry requires openness to new ideas and constructive criticism.",
      "My doctoral experience also instilled in me a deep sense of perseverance and resilience, as academic research often involves navigating uncertainty, setbacks and the iterative process of refining ideas.",
      "Moreover, it reinforced the importance of mentorship and collaboration, as I learned as much from my supervisors and peers as from my own independent research. This period cultivated in me the qualities of patience, precision and purpose that continue to define my professional and personal ethos.",
      "As I often tell my own doctoral students today: PhD does not merely denote a Doctor of Philosophy; it also signifies Patience, Honesty and Dedication, three qualities that anchor genuine intellectual and personal growth throughout a scholar's life.",
    ],
    whatThisMeans:
      "He reframes the PhD acronym itself as a mnemonic for the character qualities the process actually demands, patience, honesty, and dedication, alongside its formal meaning as a Doctor of Philosophy.",
    whyItMatters:
      "Crediting mentorship and collaboration as sources of learning equal to his own independent research pushes back against a common myth of the solitary scholar, acknowledging that even doctoral-level work is built with others.",
    reflect:
      "In your own most demanding period of learning or growth, did you credit the people who taught and supported you as much as your own independent effort?",
  },
  {
    number: "09",
    title: "Academic Leaders Must Move Away From Top-Down Authoritarian Governance",
    quote: [
      "Effective academic leadership requires a delicate balance between maintaining institutional standards and fostering an environment conducive to research, teaching and innovation.",
      "I believe strongly in participatory governance, where faculty, staff and students are actively involved in decision-making processes, thereby cultivating a sense of ownership and accountability across the institution.",
      "Encouraging interdisciplinary collaboration and open dialogue is also essential to break down silos and stimulate creative and critical thinking.",
      "Additionally, I emphasise the need for transparent and merit-based systems for promotion, funding and resource allocation to maintain trust and motivation within the academic community.",
      "In my view, academic institutions must continuously invest in capacity building, both for early-career scholars and established academics, to remain competitive, relevant and impactful in a rapidly evolving educational landscape. This requires a shift from top-down, authoritarian management styles toward more inclusive, participatory approaches, which, in my experience, cultivate innovation, resilience and long-term institutional excellence.",
    ],
    whatThisMeans:
      "He specifically names participatory governance, faculty, staff, and students actively involved in decisions, as the mechanism for building ownership and accountability, rather than treating institutional standards and inclusive process as competing priorities.",
    whyItMatters:
      "Calling directly for a shift away from top-down, authoritarian management styles is a specific institutional critique from someone with real standing inside academic administration, not an abstract preference for a friendlier workplace culture.",
    reflect:
      "In an institution or organisation you're part of, is decision-making genuinely participatory, or top-down with the appearance of consultation?",
  },
  {
    number: "10",
    title: "Young Researchers Are Our Most Valuable Resource for Sustainable Progress",
    quote: [
      "Mentorship has always been at the heart of my academic and professional practice. I firmly believe that guiding young researchers, students and early-career professionals is not just a duty but a moral responsibility, one that ensures the continuity and advancement of knowledge and societal progress.",
      "Effective mentorship requires patience, active listening and the ability to tailor guidance to the unique needs, strengths and aspirations of each individual. I strive to create an environment where mentees feel safe to explore ideas, make mistakes and grow both intellectually and personally.",
      "Beyond technical knowledge, I emphasise the development of critical thinking, ethical judgement and resilience, qualities that are essential for long-term success in research, policy or professional practice.",
      "I also believe in leading by example, demonstrating integrity, discipline and a genuine passion for knowledge, which often inspires mentees more than instructions or theoretical guidance alone.",
      "Ultimately, my mentorship philosophy centres on empowering individuals to become independent, confident and socially responsible contributors to their fields, recognising that investing in young talent is investing in the future of research, education and sustainable development.",
    ],
    whatThisMeans:
      "He calls mentorship \"a moral responsibility\" rather than an optional extra to a research career, tying it directly to the continuity of knowledge and societal progress, not just individual career development for the mentee.",
    whyItMatters:
      "Creating an environment where mentees \"feel safe to explore ideas, make mistakes and grow\" is a specific, practical standard that goes beyond simply transferring technical knowledge, addressing the psychological conditions that actually let learning happen.",
    reflect:
      "Do the people you mentor or supervise feel genuinely safe making mistakes in front of you, or do they perform certainty to avoid your judgment?",
  },
];

const principlesPart3 = [
  {
    number: "11",
    title: "The Central Challenge Is to Build an Ecosystem Where Everyone Has a Genuine Opportunity",
    quote: [
      "Entrepreneurship and innovation are critical drivers of economic development, particularly in emerging and developing economies. I believe that fostering a culture of entrepreneurship requires more than access to finance; it necessitates supportive policy frameworks, quality education and mentorship, as well as robust infrastructure.",
      "My research has consistently highlighted that inclusive entrepreneurship, especially empowering women, youth and marginalised communities, has transformative potential to reduce poverty, generate employment and stimulate local economic growth.",
      "I also emphasise the importance of innovation ecosystems that connect universities, industry and government, ensuring that knowledge translates into practical, scalable solutions. Moreover, I advocate for policies that reduce bureaucratic barriers and promote access to markets, technology and capital for small and medium enterprises.",
      "In my view, the central challenge is not merely to create more entrepreneurs, but to build an ecosystem where everyone, regardless of gender, socioeconomic background or geographic location, has a genuine opportunity to innovate, grow and contribute to sustainable development.",
    ],
    whatThisMeans:
      "He reframes the entrepreneurship challenge away from simply producing more entrepreneurs, toward building the ecosystem, policy frameworks, education, mentorship, infrastructure, that determines who actually gets a genuine opportunity to try in the first place.",
    whyItMatters:
      "Naming women, youth, and marginalised communities specifically as groups with transformative potential when included treats inclusive entrepreneurship as an economic strategy, not only a matter of fairness.",
    reflect:
      "In your own community or field, is the barrier to entrepreneurship really a lack of entrepreneurs, or a lack of genuine access to the ecosystem that would let more people try?",
  },
  {
    number: "12",
    title: "Neither Growth at Any Cost, Nor Environmental Protection at the Expense of Human Development, Is the Right Goal",
    quote: [
      "Balancing economic growth with environmental sustainability is one of the most pressing challenges of our time. I believe that neither growth at any cost, nor environmental protection at the expense of human development, is the right approach.",
      "Instead, we must pursue a model of sustainable and inclusive growth that integrates environmental stewardship into economic planning from the outset.",
      "This involves investing in renewable energy, promoting resource efficiency and encouraging sustainable agricultural practices, while simultaneously addressing poverty, unemployment and social inequality.",
      "I also advocate for strong regulatory frameworks and incentives that encourage businesses and communities to adopt environmentally responsible practices without compromising economic opportunities. Ultimately, achieving this balance requires collaboration between governments, private sector actors and civil society, recognising that long-term prosperity is only possible when economic development and environmental sustainability are pursued together, rather than as competing objectives.",
    ],
    whatThisMeans:
      "He explicitly rejects both extremes, growth at any cost and environmental protection at the expense of human development, refusing to treat this as a binary choice and instead describing environmental stewardship as something integrated into economic planning from the start.",
    whyItMatters:
      "Insisting environmental and economic goals be \"pursued together, rather than as competing objectives\" pushes back on a framing that often forces communities and policymakers to choose one over the other.",
    reflect:
      "In your own decisions, do you currently treat sustainability and growth as genuinely compatible goals, or as a trade-off you're quietly choosing one side of?",
  },
  {
    number: "13",
    title: "Resilience Is the Capacity to Learn, Adapt, and Continue With Integrity",
    quote: [
      "Throughout my career, I have encountered numerous challenges, ranging from navigating complex bureaucratic systems to managing large-scale research projects under constrained resources. One particularly formative experience was leading a multi-country research initiative during a period of significant political and economic instability.",
      "Despite unforeseen obstacles, including funding delays and logistical challenges, we successfully completed the project by fostering strong collaboration, maintaining transparent communication and adapting our strategies to changing circumstances.",
      "This experience taught me the importance of resilience, patience and problem-solving under pressure. I learned that setbacks are not failures but opportunities to refine strategies, strengthen partnerships and innovate solutions.",
      "It also reinforced my belief in the power of teamwork and shared responsibility, as overcoming complex challenges is rarely achieved alone. Ultimately, this experience deepened my understanding that resilience is not simply the ability to recover from difficulties, but the capacity to learn, adapt and continue moving forward with integrity, even amid uncertainty.",
    ],
    whatThisMeans:
      "He offers a specific, real example, a multi-country research initiative during political and economic instability, rather than a general claim about resilience, grounding the principle in an actual test of funding delays and logistical breakdowns.",
    whyItMatters:
      "Redefining resilience as \"the capacity to learn, adapt and continue moving forward with integrity,\" rather than simply the ability to recover, adds a standard that recovery alone doesn't guarantee, integrity maintained throughout the difficulty, not just survival of it.",
    reflect:
      "Think of your own hardest professional setback. Did you recover from it, or did you also maintain your integrity and keep learning throughout it, the way he distinguishes?",
  },
  {
    number: "14",
    title: "Integrity Builds Trust, Lifelong Learning Creates Progress, Service Gives Success Its Purpose",
    quote: [
      "If I could offer three guiding principles to young professionals and future leaders, they would be: first, uphold integrity and ethical conduct in all endeavours, as trust and credibility are the foundation of any successful career or initiative.",
      "Second, embrace lifelong learning and adaptability, recognising that knowledge and skills must continuously evolve to remain relevant in a rapidly changing world.",
      "Third, prioritise service to others and social responsibility, understanding that true success is measured not only by personal achievement, but by the positive impact one has on communities, institutions and society at large.",
      "These principles, in my experience, form the foundation for sustainable personal and professional growth, as well as meaningful contributions to society.",
    ],
    whatThisMeans:
      "Asked for three guiding principles to leave with young professionals, he gives integrity, lifelong learning, and service to others as a sequence, not a list of equal options, each building on the credibility and relevance the previous one establishes.",
    whyItMatters:
      "Defining true success as measured \"not only by personal achievement, but by the positive impact one has\" extends the same standard he's applied throughout, to policy, to mentorship, to entrepreneurship, down to the individual level of personal career success.",
    reflect:
      "Of his three, integrity, lifelong learning, service to others, which one would you say currently gets the least deliberate attention in your own life?",
  },
];

const principlesPart4 = [
  {
    number: "15",
    title: "Build a Life of Purpose, Not Merely a Career of Success",
    quote: [
      "If I could summarise a single message for the next generation, it would be this: seek knowledge with humility, act with integrity and lead with compassion.",
      "The world is constantly evolving, presenting new challenges and opportunities, and it is essential to remain adaptable while staying true to core ethical principles. Education and professional achievement are important, but they must be complemented by empathy, social responsibility and a genuine commitment to the wellbeing of others.",
      "I would encourage young people to embrace collaboration over competition, to value diverse perspectives and to recognise that meaningful impact often comes from collective effort rather than individual accolades.",
      "Finally, I would remind them that resilience, patience and continuous learning are essential tools for navigating an uncertain and rapidly changing world. My hope is that they carry forward a sense of purpose that transcends personal gain, striving to create positive change for their communities, their countries and the world at large, ultimately building a life of purpose, not merely a career of success.",
    ],
    whatThisMeans:
      "His three-part summary message, seek knowledge with humility, act with integrity, lead with compassion, pairs each virtue with a specific action rather than leaving them as abstract qualities to admire.",
    whyItMatters:
      "The final distinction, \"a life of purpose, not merely a career of success\", is the same idea that opened his very first answer, that titles and status are fleeting, now offered forward to the next generation rather than only reflected on in his own life.",
    reflect:
      "By his own closing distinction, are you currently building a career of success, or a life of purpose? What would change if you were honest about the difference?",
  },
  {
    number: "16",
    title: "The True Measure of a Life Is Not What We Accumulate, but What We Give Back",
    quote: [
      "As I reflect on my journey as an academic, researcher and policy advocate, I am reminded that the true measure of a life is not what we accumulate, but what we give back.",
      "Every lecture delivered, every paper published, and every policy discussion I have contributed to carries the hope of empowering others and improving lives, whether through advancing knowledge, mentoring the next generation, or influencing more equitable and sustainable development.",
      "I have learned that patience, humility and perseverance are indispensable, particularly when navigating complex challenges in research, governance or social development. Above all, I believe that our legacy is defined not by titles or accolades, but by the positive difference we make in the lives of others and the enduring values we instil in those who follow.",
      "It is this conviction that continues to guide my work and inspires me to contribute meaningfully to society, both today and for future generations.",
    ],
    whatThisMeans:
      "Given the chance to add one final, unprompted reflection, he returns to the same measure that opened his very first answer, not accumulation but contribution, confirming it as the actual foundation the other fifteen principles were built on.",
    whyItMatters:
      "Naming lectures, papers, and policy discussions specifically as carrying \"the hope of empowering others\" ties his everyday professional output directly to the larger legacy he describes, rather than treating legacy as separate from the daily work itself.",
    reflect:
      "By his measure, not what you accumulate but what you give back, what would your own answer be right now if you were honest about it?",
  },
];

const takeaways = [
  {
    title: "Titles and positions are fleeting; the difference you make in people's lives endures.",
    body: "Genuine fulfilment comes from empowering others, not from titles, publications, or recognition alone.",
  },
  {
    title: "True leadership is defined by service, not authority.",
    body: "Listening must come before instructing. Moral courage means making unpopular decisions that align with ethical principles.",
  },
  {
    title: "Economic growth should be measured by quality of life, not GDP alone.",
    body: "Access to education, healthcare, and employment are the real markers of whether growth is actually working.",
  },
  {
    title: "PhD also stands for Patience, Honesty, and Dedication.",
    body: "Intellectual humility means recognising that knowledge is always evolving, and that rigorous inquiry requires openness to criticism.",
  },
  {
    title: "Resilience is the capacity to learn, adapt, and continue with integrity.",
    body: "Not simply the ability to recover from setbacks, but to keep your integrity intact throughout the difficulty.",
  },
  {
    title: "Uphold integrity, embrace lifelong learning, and prioritise service to others.",
    body: "In that order. Trust and credibility are the foundation everything else is built on.",
  },
  {
    title: "The true measure of a life is not what we accumulate, but what we give back.",
    body: "Legacy is defined not by titles or accolades, but by the positive difference made in the lives of others.",
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
        / Prof. Dr. Ravinder Rena
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/rena-portrait.jpg"
            alt="Prof. Dr. Ravinder Rena"
            width={851}
            height={851}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Prof. Dr. Ravinder Rena, B.A.(Econ), B.Ed., LL.B., M.A., M.Phil., Ph.D.(Econ), Gold
          Medallist · Professor of Economics, DUT Business School, Durban University of
          Technology, South Africa
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 022
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Prof. Dr. Ravinder <em>Rena</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          The True Measure of a Life Is Not What We Accumulate, but What We Give Back
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Associate Editor, <em>The Bottom Line</em> (Q1 Scopus &amp; WoS) · Founding
          Editor-in-Chief, <em>International Journal of Education Economics and Development</em>{" "}
          (2009&ndash;2016) · Associate Editor, <em>African Journal of Science, Technology,
          Innovation and Development</em> (2016&ndash;2021)
        </p>

        {/* Official links */}
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="http://ssrn.com/author=910083"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            SSRN Profile
            <span className="sr-only"> (opens in new window)</span>
          </a>
          <a
            href="http://orcid.org/0000-0002-4156-8693"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            ORCID
            <span className="sr-only"> (opens in new window)</span>
          </a>
        </div>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;True leadership is defined not by the authority one holds, but by the positive
          difference one makes in the lives of others.&rdquo;
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
          <p className="font-medium">15 minutes</p>
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
          "Economics & Development",
          "Higher Education Leadership",
          "Public Policy",
          "Mentorship",
          "Inclusive Growth",
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
          &ldquo;We asked Prof. Dr. Ravinder Rena fifteen questions, and one final reflection. He
          answered from a career spanning economics research, higher education leadership, and
          public policy across Africa and South Asia.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Prof. Dr. Ravinder Rena is Professor of Economics at the DUT Business School, Faculty of
          Management Sciences, Durban University of Technology, South Africa. He holds a
          Ph.D.(Econ) as a Gold Medallist, alongside degrees in Economics, Education, and Law. He
          serves as Associate Editor of <em>The Bottom Line</em> (Q1 Scopus and Web of Science),
          was Founding Editor-in-Chief of the <em>International Journal of Education Economics
          and Development</em> from 2009 to 2016, and served as Associate Editor of the{" "}
          <em>African Journal of Science, Technology, Innovation and Development</em> from 2016
          to 2021. His work spans economic development, inclusive growth, higher education
          governance, and mentorship of early-career researchers.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-5 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Sixteen principles · Stated by Prof. Dr. Ravinder Rena
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
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
                — Prof. Dr. Ravinder Rena, stated directly
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
            </article>
          ))}
        </div>
      </section>

      {/* Pull quote 1 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;PhD does not merely denote
          <br />
          <em>a Doctor of Philosophy.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Prof. Dr. Ravinder Rena — Principle VIII, Stated
        </p>
      </section>

      {/* Principles 6-10 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
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
                — Prof. Dr. Ravinder Rena, stated directly
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
            </article>
          ))}
        </div>
      </section>

      {/* Pull quote 2 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;Setbacks are not failures;
          <br />
          <em>they are opportunities to refine strategies.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Prof. Dr. Ravinder Rena — Principle XIII, Stated
        </p>
      </section>

      {/* Principles 11-14 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
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
                — Prof. Dr. Ravinder Rena, stated directly
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
            </article>
          ))}
        </div>
      </section>

      {/* Pull quote 3 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;Seek knowledge with humility,
          <br />
          <em>act with integrity, lead with compassion.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Prof. Dr. Ravinder Rena — Principle XV, Stated
        </p>
      </section>

      {/* Principles 15-16 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart4.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
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
                — Prof. Dr. Ravinder Rena, stated directly
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

      {/* Pull quote 4 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;The true measure of a life
          <br />
          <em>is not what we accumulate, but what we give back.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Prof. Dr. Ravinder Rena — Principle XVI, Stated
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
          Post a commitment inspired by Prof. Dr. Ravinder Rena&apos;s principles. State it
          publicly — and make it real.
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
        <p className="mt-4 text-sm text-neutral-500">15 min read · 16 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
