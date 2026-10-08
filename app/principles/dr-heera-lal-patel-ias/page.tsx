import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "dr-heera-lal-patel-ias";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Dr. Heera Lal Patel, IAS — If the Problem Is With Us, So Is the Solution";
const DESCRIPTION =
  "Roll out the red carpet, not the red tape. Twenty-one principles from the field in Bundelkhand, on rural development, trust, and governance that keeps people at its centre.";
const IMAGE = "https://app.stated.in/patel-portrait.jpg";

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
    images: [{ url: IMAGE, width: 750, height: 750, alt: "Dr. Heera Lal Patel, IAS" }],
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
    title: "If the Problem Is With Us, So Is the Solution",
    quote: [
      "Early in my career, I believed that problems in governance exist outside us, in the system, in the people, in circumstances. Over time, working closely in the field, especially in Bundelkhand, I realised that if the problem is with us, so is the solution.",
      "Once I started looking inward, at my own assumptions, my own communication, my own patience, the way I approached people and problems changed completely. That shift in perspective, from blaming the system to owning the solution, has stayed with me ever since.",
    ],
    whatThisMeans:
      "He names a specific reversal in how he understood governance failure, from locating problems outside himself in the system or in people, to recognising that his own assumptions and approach were part of what needed to change.",
    whyItMatters:
      "This opening principle sets the frame for everything that follows. Once ownership replaces blame, the question shifts from \"what is wrong with the system\" to \"what can I actually do differently,\" a far more actionable starting point.",
    reflect:
      "Is there a persistent problem in your own work that you've been locating entirely outside yourself, in the system or in other people?",
  },
  {
    number: "02",
    title: "People Are Not Short of Wisdom; They Are Short of Trust and Opportunity",
    quote: [
      "Bundelkhand taught me that people are not short of wisdom; they are often short of trust and opportunity. Every village I worked in had its own knowledge systems, its own ways of managing water, land and community life, built over generations.",
      "My role was never to bring solutions from outside and impose them. It was to listen first, understand what already existed, and then work alongside the community to strengthen what was already there.",
      "That turning point, realising that the answers were often already present in the community, changed how I approached every single project after that.",
    ],
    whatThisMeans:
      "He identifies a specific error in the assumption that outside expertise is what rural communities lack. Instead, he found generations of accumulated knowledge about water, land, and community life already present, just lacking trust and opportunity to be acted on.",
    whyItMatters:
      "Repositioning his own role from bringing solutions to strengthening what already exists is a genuine redistribution of authority, treating the community as the source of answers rather than the recipient of them.",
    reflect:
      "In your own work with any community or team, are you listening first for what already exists, or arriving with solutions already decided?",
  },
  {
    number: "03",
    title: "Roll Out the Red Carpet, Not the Red Tape",
    quote: [
      "My philosophy has always been: roll out the red carpet, not the red tape. Bureaucracy, at its best, should make life easier for citizens, not harder. Every form, every process, every requirement should be examined from the perspective of the person standing on the other side of the counter.",
      "I have tried, wherever possible, to simplify procedures, reduce the number of visits a citizen has to make, and ensure that government offices feel welcoming rather than intimidating. Small changes in how a process is designed can make an enormous difference in how people experience the state.",
    ],
    whatThisMeans:
      "His test for any bureaucratic process is concrete and specific: examine it from the perspective of the person standing on the other side of the counter, not from the convenience of the administration issuing it.",
    whyItMatters:
      "\"Roll out the red carpet, not the red tape\" compresses an entire philosophy of citizen-facing governance into a single memorable line, one that's testable against any specific form or procedure rather than remaining abstract.",
    reflect:
      "Is there a process you administer or depend on that was designed for the convenience of the system rather than the person using it?",
  },
  {
    number: "04",
    title: "Understand the Local Reality First, Then Design",
    quote: [
      "No two villages are the same, even within the same district. What works in one place may completely fail in another because of differences in soil, water availability, social structure or local leadership.",
      "I have learned to resist the temptation of applying a single template everywhere. Instead, the first step in any intervention must be to understand the local reality, the specific challenges, resources and aspirations of that particular place, and only then design a response around it.",
    ],
    whatThisMeans:
      "He names the specific temptation he's had to resist: applying a single template across different villages, even within the same district, when soil, water, social structure, and local leadership can vary enough to make a working solution in one place fail completely in another.",
    whyItMatters:
      "Insisting that local reality be understood before any design begins reverses the usual order many development interventions follow, where a solution is decided first and then fitted to a place, rather than a place being studied first.",
    reflect:
      "Where have you applied a template solution to a problem that actually required understanding the specific local context first?",
  },
  {
    number: "05",
    title: "A Policy Stops Being the Government's and Becomes Theirs",
    quote: [
      "A policy stops being the government's and becomes theirs the moment people see themselves in it, not as beneficiaries, but as participants and owners. This happens when communities are involved from the planning stage itself, not simply informed after decisions have been made.",
      "When people contribute their own knowledge, their own labour and their own decisions to a project, they protect it, sustain it and improve it long after the officials have moved on. That sense of ownership is the real measure of whether a policy has succeeded.",
    ],
    whatThisMeans:
      "He locates the exact moment a policy transforms from the government's to the community's: when people see themselves as participants and owners rather than beneficiaries, which requires involvement from the planning stage, not just notification after decisions are made.",
    whyItMatters:
      "\"They protect it, sustain it and improve it long after the officials have moved on\" names the real test of a policy's success, not whether it launched well, but whether it survives the departure of the people who implemented it.",
    reflect:
      "Think of a project or initiative you've been part of. Did the people it was meant to serve see themselves as owners, or only as recipients?",
  },
];

const principlesPart2 = [
  {
    number: "06",
    title: "The Solution Must Sit With the Community, Not With the Administration",
    quote: [
      "In water-scarce regions like Bundelkhand, the solution to problems like groundwater depletion cannot be dictated from above. It has to be built with the community, because they are the ones who will live with the consequences of every decision, and they are the ones who ultimately have to maintain whatever is built.",
      "When we started community-led water management efforts, I made sure that local people were involved in every decision, from identifying where structures should be built to deciding how water would be shared. Groundwater began to respond, not because of any single technical intervention, but because the whole community had taken ownership of the solution.",
    ],
    whatThisMeans:
      "He grounds the principle in a specific outcome, groundwater beginning to respond, not attributing it to a single technical intervention but to the community's ownership of decisions from identifying structure locations to sharing arrangements.",
    whyItMatters:
      "Tying the success directly to maintenance responsibility, the community has to live with and maintain whatever is built, makes community involvement a practical necessity, not just an inclusive gesture layered onto a technical solution.",
    reflect:
      "In a project you're responsible for, do the people who will maintain it long-term have a real say in how it's designed?",
  },
  {
    number: "07",
    title: "Village Development Must Be Financially Viable, Socially Equitable, and Eco-Friendly at the Same Time",
    quote: [
      "Through the Model Gaon initiative, I learned that village development must be financially viable, socially equitable and eco-friendly at the same time. Pursuing only one of these at the cost of the others produces development that does not last.",
      "A model that is environmentally sound but financially unsustainable will collapse once external support ends. A model that is profitable but socially exclusive will deepen inequality rather than reduce it. The real work lies in designing interventions where all three dimensions reinforce each other, drawing inspiration from frameworks like Dr. A.P.J. Abdul Kalam's vision of PURA, Providing Urban Amenities in Rural Areas.",
    ],
    whatThisMeans:
      "He names the specific failure mode of each unbalanced approach: environmentally sound but financially unsustainable collapses once support ends, profitable but socially exclusive deepens inequality, treating all three dimensions as necessary together rather than any one sufficient alone.",
    whyItMatters:
      "Citing Dr. Kalam's PURA framework by name roots his own village development philosophy in an established, credible vision rather than presenting it as an idea he arrived at in isolation.",
    reflect:
      "In a project or plan you're currently part of, are financial viability, social equity, and environmental soundness all genuinely reinforcing each other, or is one quietly being sacrificed for the others?",
  },
  {
    number: "08",
    title: "Do Maa: Two Mothers",
    quote: [
      "The Do Maa, two mothers, concept emerged from a simple but powerful idea: just as a mother gives us life, the earth, our land, our environment, also sustains us like a mother. If we care for both with equal devotion, both will continue to nurture generations to come.",
      "This idea became a rallying point for encouraging people, especially children and young people, to treat natural resources, water, soil, and trees, with the same reverence and responsibility they would show towards their own mother. It helped build an emotional connection to conservation that went beyond technical instructions about sustainability.",
    ],
    whatThisMeans:
      "He describes building a conservation message around an emotional, culturally resonant idea, that the earth sustains us the way a mother does, rather than relying only on technical instructions about sustainability to motivate behaviour change.",
    whyItMatters:
      "Aiming this specifically at children and young people treats environmental responsibility as something to be instilled early, through emotional connection, rather than taught later as abstract policy.",
    reflect:
      "Is there an important value or responsibility in your own community that would land better through emotional connection than through technical instruction?",
  },
  {
    number: "09",
    title: "Respect the Water Budget of a Place",
    quote: [
      "Water scarcity in Bundelkhand taught me to respect the water budget of a place, understanding exactly how much water is available, how it is used, and where it is wasted, before designing any solution.",
      "We worked with communities to map water sources, revive traditional water bodies and build structures that captured rainfall where it fell, rather than relying only on large infrastructure projects. This localised, data-driven approach, combined with community participation, helped turn around the water situation in several villages.",
    ],
    whatThisMeans:
      "He treats water scarcity as a budgeting problem requiring precise accounting, how much is available, how it's used, where it's wasted, before any solution is designed, rather than approaching it as a problem solvable only through large infrastructure.",
    whyItMatters:
      "Reviving traditional water bodies alongside new structures connects back to Principle 2's insight that communities already hold generations of water management knowledge, rather than treating indigenous systems as obsolete.",
    reflect:
      "Do you actually know the full \"budget\" of a resource you manage or depend on, how much is available, how it's used, where it's wasted, or are you working from assumptions?",
  },
  {
    number: "10",
    title: "Technology Works Best When It Serves Participation, Not When It Replaces It",
    quote: [
      "Through platforms like Jal Chaupal, we used technology to bring people together for conversations about water, rather than to replace human interaction with digital tools. Technology works best when it serves participation, not when it replaces it.",
      "We used simple digital tools to share information, track progress and connect communities with experts, but the real work still happened through face-to-face conversations, community meetings and local leadership. Technology extended our reach; it did not substitute for genuine human engagement.",
    ],
    whatThisMeans:
      "He's precise about what technology did and didn't do in the Jal Chaupal initiative: it extended reach and shared information, while the actual work of changing minds and building consensus still happened through face-to-face conversation and local leadership.",
    whyItMatters:
      "\"Technology works best when it serves participation, not when it replaces it\" is a clear standard for evaluating any digital tool introduced into community work, whether it's amplifying genuine engagement or substituting for it.",
    reflect:
      "In your own use of technology for community or team engagement, is it extending real participation, or quietly substituting for it?",
  },
];

const principlesPart3 = [
  {
    number: "11",
    title: "An Interesting Idea Stays in a Presentation. An Impactful Idea Finds Owners.",
    quote: [
      "Across my various projects, the common thread has been finding ways to turn an interesting idea into an impactful one. An interesting idea stays in a presentation. An impactful idea finds owners, people who carry it forward because they believe in it, not because they were told to implement it.",
      "Whether it was Model Gaon, Jal Chaupal or the Do Maa concept, the projects that succeeded were the ones where local people took the idea and made it their own, adapting it to their specific circumstances rather than following a fixed blueprint.",
    ],
    whatThisMeans:
      "He draws a precise line between an idea that remains interesting and one that becomes impactful: the difference is whether it finds owners who carry it forward out of belief, rather than people who implement it because they were instructed to.",
    whyItMatters:
      "Citing Model Gaon, Jal Chaupal, and Do Maa together as examples where success came from local adaptation rather than fixed blueprints ties this principle directly back to the concrete initiatives described earlier, rather than leaving it abstract.",
    reflect:
      "Of the ideas or initiatives you're currently involved in, which ones have found genuine owners, and which are still just interesting presentations waiting for someone to implement them?",
  },
  {
    number: "12",
    title: "Citizens Are Not Consumers of Public Services. They Are Partners in Governance.",
    quote: [
      "I believe citizens are not consumers of public services; they are partners in governance. This shift in thinking changes everything, how we design programmes, how we communicate, and how we measure success.",
      "When citizens are treated as partners, they bring energy, local knowledge and accountability to the process. When they are treated only as consumers, governance becomes a one-way transaction, and the deeper, more sustainable forms of development become much harder to achieve.",
    ],
    whatThisMeans:
      "He names a specific reframe that changes program design, communication, and how success is measured all at once: whether citizens are positioned as consumers receiving a service or as partners contributing to governance.",
    whyItMatters:
      "Identifying what partnership brings that consumption doesn't, energy, local knowledge, accountability, makes the distinction practical rather than purely philosophical, with concrete consequences for what a programme can actually achieve.",
    reflect:
      "In the systems you're part of, are citizens or the people you serve treated as partners contributing something, or as consumers receiving something?",
  },
  {
    number: "13",
    title: "Development Must Be Measured by How It Reaches the Last Person",
    quote: [
      "Development must be measured by how it reaches the last person, the most marginalised, the most vulnerable, the one most likely to be left behind. Aggregate numbers and averages can hide enormous disparities beneath them.",
      "In every project I have worked on, I have tried to specifically track whether benefits are reaching the people who need them most, not just whether overall targets are being met. That discipline of looking at the margins, not just the averages, has shaped how I evaluate success.",
    ],
    whatThisMeans:
      "He names the specific blind spot that aggregate numbers create: averages and overall targets can look successful while hiding the fact that the most marginalised and vulnerable people were never actually reached.",
    whyItMatters:
      "Describing this as a discipline he deliberately practises, specifically tracking whether benefits reach those who need them most, rather than a general value he holds, means it shapes his actual evaluation methods, not just his stated priorities.",
    reflect:
      "In how you measure success in your own work, are you looking at averages, or specifically at whether the people with the least are actually being reached?",
  },
  {
    number: "14",
    title: "Leadership Is Less About Authority and More About Trust",
    quote: [
      "My years in the field have taught me that leadership is less about authority and more about trust. People do not follow a position; they follow a person they believe is genuinely working for their benefit.",
      "Building that trust requires consistency, being present, following through on commitments, and being honest even when the truth is uncomfortable. Once that trust is established, people are willing to take risks, try new approaches and contribute far more than any directive could ever extract from them.",
    ],
    whatThisMeans:
      "He separates what a position confers automatically from what trust requires to be earned: people follow a person they believe is genuinely working for their benefit, not a title, which has to be built through consistency and follow-through.",
    whyItMatters:
      "\"People are willing to take risks, try new approaches and contribute far more than any directive could ever extract from them\" names a specific practical advantage of trust over authority, not just a moral preference for one over the other.",
    reflect:
      "In your own leadership or influence, are people following your position, or do they actually trust you as a person working for their benefit?",
  },
  {
    number: "15",
    title: "Champion Change One Step at a Time",
    quote: [
      "Championing change, especially in regions with entrenched challenges like Bundelkhand, requires patience and persistence. Change rarely happens in dramatic leaps; it happens one step at a time, through small, consistent efforts that build on each other.",
      "I have learned not to be discouraged by slow progress, as long as the direction is right. Every small success, a revived water body, a village that adopted a new practice, becomes evidence that change is possible, and that evidence itself becomes a tool for championing further change.",
    ],
    whatThisMeans:
      "He treats each small success, one revived water body, one village adopting a new practice, not just as a local win but as evidence that gets used deliberately to champion further change elsewhere.",
    whyItMatters:
      "\"Not to be discouraged by slow progress, as long as the direction is right\" offers a specific standard for patience, one tied to direction rather than speed, which is a more sustainable measure for genuinely entrenched challenges.",
    reflect:
      "In a change effort you're part of that feels slow, is the direction actually right, even if the pace is frustrating?",
  },
];

const principlesPart4 = [
  {
    number: "16",
    title: "When We Trust Young People With Meaningful Work, They Usually Exceed Our Expectations",
    quote: [
      "Working with young people across Bundelkhand has consistently shown me that when we trust young people with meaningful work, they usually exceed our expectations. Youth are often underestimated, given token roles rather than real responsibility.",
      "When we involved young people directly in voter awareness efforts, water conservation initiatives and community projects, giving them genuine ownership rather than symbolic participation, they brought creativity, energy and commitment that transformed outcomes. In the 2019 elections, for instance, creative voter awareness efforts led by young people helped lift turnout in the district significantly.",
    ],
    whatThisMeans:
      "He names the specific pattern he's observed repeatedly: young people are usually given token roles rather than real responsibility, and when that pattern is broken and genuine ownership is extended instead, outcomes consistently improve.",
    whyItMatters:
      "Citing the 2019 election turnout increase as a concrete, measurable result grounds this principle in verifiable outcome rather than leaving it as a general sentiment about youth potential.",
    reflect:
      "Are the young people in your own organisation or community given genuine ownership of meaningful work, or token roles dressed up as involvement?",
  },
  {
    number: "17",
    title: "Begin Where You Are, With What You Have",
    quote: [
      "If I could leave the next generation of public servants and changemakers with one principle, it would be this: begin where you are, with what you have. Do not wait for perfect conditions, unlimited resources or complete authority before you start making a difference.",
      "The most meaningful changes I have witnessed started small, often with very limited resources, and grew because people committed to the work, adapted as they learned, and stayed consistent over time. Waiting for ideal circumstances is often just another way of postponing action.",
    ],
    whatThisMeans:
      "His core advice to the next generation isn't about acquiring more resources or authority first. It's a direct instruction against waiting for ideal conditions, naming that wait for what it often actually is: postponement.",
    whyItMatters:
      "\"Waiting for ideal circumstances is often just another way of postponing action\" is a sharp, specific diagnosis of a common excuse, reframing patience for perfect conditions as avoidance rather than wisdom.",
    reflect:
      "What are you currently waiting for ideal conditions to begin, that you could actually start with what you have right now?",
  },
  {
    number: "18",
    title: "The India of 2040 Is Being Built by the Choices We Make in 2026",
    quote: [
      "The India of 2040 is being built by the choices we make today, in 2026. Whether that India is more equitable, more sustainable and more participatory depends on whether we choose to involve people genuinely in their own development, or continue to treat them as passive recipients of government schemes.",
      "My hope is that the next generation of public servants carries forward a governance culture that is rooted in trust, humility and genuine partnership with citizens, rather than one defined only by authority and procedure.",
    ],
    whatThisMeans:
      "He frames the future not as something that will simply arrive, but as something being actively constructed by present-day choices, specifically whether citizens are involved genuinely or continue to be treated as passive recipients.",
    whyItMatters:
      "Naming trust, humility, and genuine partnership as what he hopes defines the next generation of governance, rather than authority and procedure, ties this directly back to his own opening principles about ownership and partnership.",
    reflect:
      "In your own sphere of influence, are the choices you're making today building toward genuine partnership, or toward people remaining passive recipients?",
  },
  {
    number: "19",
    title: "Keep People at the Centre and Trust Them",
    quote: [
      "If there is one idea I would want to be remembered for, it is this: keep people at the centre of every decision, and trust them. Governance, development and leadership all succeed or fail based on whether this single principle is genuinely practised or merely stated.",
      "Every initiative I have been part of that succeeded did so because we kept people at the centre and trusted their capacity to be partners, not just beneficiaries, in their own progress.",
    ],
    whatThisMeans:
      "Asked for the single idea he'd want to be remembered for, he returns to the exact throughline that has run across every earlier answer: people at the centre, and trust extended to them as genuine partners.",
    whyItMatters:
      "Naming the gap between a principle \"genuinely practised or merely stated\" is itself a quiet acknowledgment that this idea is easy to claim and hard to actually live, which is precisely why he's chosen it as his defining legacy.",
    reflect:
      "Honestly, in your own work, is \"people at the centre\" something you genuinely practise, or something you state?",
  },
  {
    number: "20",
    title: "If the Problem Is With You, So Is the Solution",
    quote: [
      "I will end where I began: if the problem is with you, so is the solution. That realisation changed the course of my career, and I believe it holds true for anyone working toward meaningful change, in government, in business or in community life.",
      "Look inward first. Take ownership of what is within your control. And trust that the people around you, however ordinary their circumstances may appear, hold the wisdom and the will to build something better, if given the chance.",
    ],
    whatThisMeans:
      "He deliberately closes by returning to his opening principle, now addressed directly to the reader as \"you\" rather than \"us,\" extending the realisation that changed his own career outward as advice for anyone pursuing meaningful change.",
    whyItMatters:
      "Bookending the entire piece with the same idea, stated first about himself and now offered to the reader, confirms it as the actual foundation every other principle in this feature was built on.",
    reflect:
      "Where in your own life or work is the problem actually with you, in a way that means the solution is too?",
  },
  {
    number: "21",
    title: "That Shift in Belief Was the Biggest Achievement",
    quote: [
      "Looking back, the achievement I am most proud of is not any single project or award, but the shift in belief I witnessed in the communities I worked with, from people who saw themselves as dependent on the government for everything, to people who saw themselves as capable of building their own future, with the government as a partner rather than a provider.",
      "That shift in belief, more than any specific structure built or scheme implemented, was the biggest achievement, because it is the one thing that continues to grow and sustain itself long after any individual official has moved on.",
    ],
    whatThisMeans:
      "Given a final, open opportunity to add anything else, he chooses not a project or an award but a shift in belief he witnessed in communities, from dependency to capability, as what he's actually most proud of.",
    whyItMatters:
      "\"The one thing that continues to grow and sustain itself long after any individual official has moved on\" is the same standard he applied to policy ownership in Principle 5, now applied to his own career's defining achievement.",
    reflect:
      "What's the most significant shift in belief, not a project or outcome, but an actual change in how people see themselves, that you've contributed to in your own work?",
  },
];

const takeaways = [
  {
    title: "If the problem is with us, so is the solution.",
    body: "Once blame shifts to ownership, the question changes from what's wrong with the system to what can I actually do differently.",
  },
  {
    title: "People are not short of wisdom; they are short of trust and opportunity.",
    body: "Every village has its own knowledge systems built over generations. The role is to strengthen what already exists, not impose solutions from outside.",
  },
  {
    title: "Roll out the red carpet, not the red tape.",
    body: "Examine every process from the perspective of the person standing on the other side of the counter.",
  },
  {
    title: "A policy stops being the government's and becomes theirs.",
    body: "The moment people see themselves as participants and owners, not beneficiaries, they protect, sustain, and improve it long after officials have moved on.",
  },
  {
    title: "An interesting idea stays in a presentation. An impactful idea finds owners.",
    body: "The projects that succeeded were the ones local people made their own, adapting them rather than following a fixed blueprint.",
  },
  {
    title: "Citizens are not consumers of public services. They are partners in governance.",
    body: "When treated as partners, people bring energy, local knowledge, and accountability that consumption never produces.",
  },
  {
    title: "Development must be measured by how it reaches the last person.",
    body: "Aggregate numbers and averages can hide enormous disparities. Look at the margins, not just the averages.",
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
        / Dr. Heera Lal Patel, IAS
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/patel-portrait.jpg"
            alt="Dr. Heera Lal Patel, IAS"
            width={750}
            height={750}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Dr. Heera Lal Patel, IAS · Rural Development &amp; Water Governance · Bundelkhand
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 024
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Dr. Heera Lal <em>Patel</em>, IAS
        </h1>

        <p className="mt-3 text-base font-medium">
          If the Problem Is With Us, So Is the Solution
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Model Gaon · Jal Chaupal · Do Maa · Community-Led Water Governance in Bundelkhand
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Roll out the red carpet, not the red tape.&rdquo;
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
          <p className="font-medium">21 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">September 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "IAS",
          "Rural Development",
          "Water Governance",
          "Community Participation",
          "Bundelkhand",
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
          &ldquo;We asked Dr. Heera Lal Patel, IAS, twenty questions, and one final reflection. He
          answered from years of fieldwork in Bundelkhand, building water governance and village
          development around community trust and ownership.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Dr. Heera Lal Patel, IAS, has spent much of his career working on rural development and
          water governance in Bundelkhand, a region long defined by water scarcity. His work
          includes the Model Gaon village development initiative, the Jal Chaupal platform for
          community water conversations, and the Do Maa conservation concept, each built around a
          consistent belief: that communities already hold the knowledge needed, and that
          governance works best when it treats citizens as partners rather than beneficiaries.
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
          Twenty-one principles · Stated by Dr. Heera Lal Patel, IAS
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 21</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Heera Lal Patel, IAS, stated directly
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
          &ldquo;People are not short of wisdom;
          <br />
          <em>they are short of trust and opportunity.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Heera Lal Patel, IAS — Principle II, Stated
        </p>
      </section>

      {/* Principles 6-10 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 21</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Heera Lal Patel, IAS, stated directly
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
          &ldquo;Just as a mother gives us life,
          <br />
          <em>the earth also sustains us like a mother.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Heera Lal Patel, IAS — Principle VIII, Stated
        </p>
      </section>

      {/* Principles 11-15 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 21</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Heera Lal Patel, IAS, stated directly
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
          &ldquo;Leadership is less about authority
          <br />
          <em>and more about trust.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Heera Lal Patel, IAS — Principle XIV, Stated
        </p>
      </section>

      {/* Principles 16-21 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart4.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 21</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Heera Lal Patel, IAS, stated directly
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
          &ldquo;Keep people at the centre
          <br />
          <em>of every decision, and trust them.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Heera Lal Patel, IAS — Principle XIX, Stated
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
          Post a commitment inspired by Dr. Heera Lal Patel&apos;s principles. State it publicly
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
        <p className="mt-4 text-sm text-neutral-500">17 min read · 21 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
