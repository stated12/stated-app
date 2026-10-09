import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "dr-heera-lal-patel-ias";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Dr. Heera Lal Patel, IAS — If the Problem Is With Us, So Is the Solution";
const DESCRIPTION =
  "Real change happens when governance, people and nature work together for a better tomorrow. Twenty-one principles from Banda, Bundelkhand, and a career in people-centric governance.";
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
      "If I had to name one principle, it would be this: if the problem is with us, so is the solution. I have said this to villagers, to my staff and to myself many times, and it has carried me through the hardest moments.",
      "When I reached Banda as District Magistrate in 2018, the district was known for drought, dry wells and people leaving for the cities. It would have been easy to wait for a big budget or a big scheme. Instead we asked a simple question. What can we do ourselves, with what we already have? Most of the answers turned out to be low-cost or no-cost, and they worked because people owned them.",
      "Behind this principle sits another belief that I hold very close. Positive change is not only possible, it is necessary, and it comes from unlocking human potential with empathy and compassion. When things are uncertain, I go back to people. They rarely let you down.",
    ],
    whatThisMeans:
      "Arriving in a district defined by drought and out-migration, he deliberately rejected waiting for a big budget or scheme, asking instead what could be done with what was already there. Most of what followed turned out to be low-cost or no-cost, and worked specifically because people owned it rather than received it.",
    whyItMatters:
      "Pairing the principle with the belief that positive change \"is not only possible, it is necessary\" turns it from a coping strategy under resource constraints into a conviction he returns to deliberately whenever things are uncertain.",
    reflect:
      "Facing your own hardest or most resource-constrained moment, have you waited for a bigger budget or scheme, or asked what could be done with what you already have?",
  },
  {
    number: "02",
    title: "People Are Not Short of Wisdom; They Are Short of Trust and Opportunity",
    quote: [
      "I come from a modest background, and that has shaped me more than any training. I know what it means when a hand pump goes dry or when a family has to make a hard choice about a child's schooling. That memory keeps me honest about who government is really for.",
      "My years as District Magistrate of Banda, from August 2018 to February 2020, were a turning point. Bundelkhand taught me that people are not short of wisdom, they are short of trust and opportunity. When we sent village heads and young rural entrepreneurs on learning tours to Ralegan Siddhi, where Anna Hazare worked, and to Hiware Bazar, which Padma Shri Popat Rao Pawar transformed, they came back changed. Seeing a working model village with their own eyes did more than a hundred meetings could.",
      "I have also learnt a lot from people who quietly built change on the ground, including the Padma Shri awardees who today mentor Model Gaon. And of course from Mahatma Gandhi's idea of Gram Swaraj and Dr. A.P.J. Abdul Kalam's vision of PURA, providing urban amenities in rural areas. Both remind me that India's future is decided in its villages.",
    ],
    whatThisMeans:
      "Rather than bringing in outside experts, he sent village heads and young rural entrepreneurs to see Ralegan Siddhi and Hiware Bazar with their own eyes, villages transformed by Anna Hazare and Padma Shri Popat Rao Pawar respectively, trusting that direct experience would do what meetings couldn't.",
    whyItMatters:
      "Naming his modest background as shaping him \"more than any training\" grounds this principle in lived memory, knowing what a dry hand pump actually costs a family, rather than in administrative theory about participation.",
    reflect:
      "Is there a group of people you work with or serve who you've assumed lack expertise, when what they actually lack is trust and opportunity to act on what they already know?",
  },
  {
    number: "03",
    title: "Roll Out the Red Carpet, Not the Red Tape",
    quote: [
      "For me, people-centric governance means rolling out the red carpet, not the red tape. The citizen is not a file number or a beneficiary on a list. He or she is the reason the office exists.",
      "In practice it means three things. First, people should be part of deciding what needs to be done, not just told about it afterwards. Second, the process should be simple enough that an ordinary villager can access it without a middleman. Third, the administration should be visible and reachable, out in the field, not only in the office.",
      "Administrators can keep people at the centre by building participation into the system itself. A Jal Chaupal in the village, a village manifesto written by the villagers, a public meeting before a decision rather than after it. When people help design something, they protect it. When something is designed for them without them, it usually stays on paper.",
      "I also believe trust in institutions has to be earned again and again. Every small act, answering a complaint on time or keeping a promise made in a village, adds to that trust.",
    ],
    whatThisMeans:
      "He gives people-centric governance three concrete, testable requirements, deciding before being told, accessing a process without a middleman, an administration visible in the field, rather than leaving it as an abstract phrase anyone could claim.",
    whyItMatters:
      "\"When people help design something, they protect it. When something is designed for them without them, it usually stays on paper\" is the operating logic behind the Jal Chaupal and village manifesto tools he built his actual work around.",
    reflect:
      "In a process or system you've built for other people, did they help design it, or was it designed for them and handed down?",
  },
  {
    number: "04",
    title: "Understand the Local Reality First, and Respect Local Knowledge",
    quote: [
      "Listening is the most underrated skill in administration. Many good schemes fail not because the idea was wrong but because nobody asked the people it was meant for.",
      "In Banda, before we started on water, we held Jal Chaupals in villages and spoke about water budgeting, how much water comes in, how much goes out, and what that means for the next summer. People already knew their old wells and ponds better than any survey. They knew which ones had dried up and why. Our job was to listen and then reconnect them with those traditional water sources.",
      "Model Gaon follows the same idea through the village manifesto. Before anything is planned, the villagers themselves set the agenda for development. What they want might be better income, self-employment for young people or stopping migration. It might be very different from what an outsider assumes.",
      "So my lesson is simple. Understand the local reality first, and respect local knowledge. Then design. Solutions that grow out of a community's own understanding last much longer than those dropped from above.",
    ],
    whatThisMeans:
      "At the Jal Chaupals, villagers already knew their old wells and ponds better than any survey could capture, which ones had dried up and why. His job wasn't to bring new data but to listen to data that already existed in the community and reconnect them with it.",
    whyItMatters:
      "\"Many good schemes fail not because the idea was wrong but because nobody asked the people it was meant for\" locates failure at the design stage, before implementation even begins, which is a harder and more preventable kind of failure to admit to.",
    reflect:
      "Has a plan or idea of yours ever failed not because it was wrong, but because you designed it without first asking the people it was meant to serve?",
  },
  {
    number: "05",
    title: "A Policy Stops Being the Government's and Becomes Theirs",
    quote: [
      "On paper, a scheme has a target, a budget and a timeline. On the ground, it needs people who believe in it. That gap is where most of an administrator's real work lies.",
      "A few things have helped me bridge it. One is to break a big goal into small, visible actions that people can do themselves, digging contour trenches near hand pumps, desilting a pond, setting up rooftop rainwater harvesting. When people see results in their own village, the policy stops being the government's and becomes theirs.",
      "Another is to bring in culture and emotion, not just instructions. In Banda we organised Kuan Talab Puja and Jal Marches. Respecting a well or a pond as something sacred made conservation a matter of faith and pride, not only a government order.",
      "The third is follow-through. Monitoring, regular review and recognising those who do good work keep the momentum alive. Change becomes lasting when it moves from a campaign to a habit.",
    ],
    whatThisMeans:
      "He names the exact gap between a scheme's paper existence, its target, budget, timeline, and its ground reality, people who believe in it, and treats bridging that gap as most of an administrator's actual work.",
    whyItMatters:
      "Organising Kuan Talab Puja (well and pond worship ceremonies) and Jal Marches shows a deliberate choice to make conservation a matter of faith and pride rather than relying only on instructions, a cultural strategy as much as an administrative one.",
    reflect:
      "In something you're trying to make stick, have you relied only on instructions, or have you found a way to connect it to something people already hold sacred or take pride in?",
  },
];

const principlesPart2 = [
  {
    number: "06",
    title: "The Solution Must Sit With the Community, Not With the Administration",
    quote: [
      "India has already shown the way through villages like Ralegan Siddhi and Hiware Bazar. What they teach us is that a village can transform itself when its people come together around a shared goal and have honest, committed leadership from within.",
      "A grassroots intervention becomes sustainable when three conditions are met. The community must own the agenda, so the plan is theirs and not a project imposed from outside. There must be local leaders, changemakers who stay in the village long after the officer or the NGO has moved on. And there must be an economic engine, because a village that cannot earn cannot sustain anything.",
      "Short-term pushes fail when they depend on one officer, one grant or one event. In a career with many postings, I have seen this again and again. What survives a transfer is what the people have made their own. That is why I keep saying that the solution must sit with the community, not with the administration.",
    ],
    whatThisMeans:
      "He names three specific, checkable conditions for sustainability, community ownership of the agenda, local leaders who outlast any individual officer or NGO, and an economic engine, rather than a general appeal to community involvement.",
    whyItMatters:
      "\"What survives a transfer is what the people have made their own\" is tested knowledge from a career with many postings, not theory. He has personally watched initiatives collapse the moment the officer attached to them moved on.",
    reflect:
      "Of the initiatives you're currently part of, which ones would survive you leaving, and which ones exist only because you're still there holding them together?",
  },
  {
    number: "07",
    title: "If One of These Is Missing, the Model Is Incomplete",
    quote: [
      "Model Gaon grew out of what we tried in Banda, and it rests on three pillars that I believe can guide any village.",
      "The first is the village manifesto. Villagers decide their own development agenda, whether it is increasing income, creating self-employment, reducing migration or building toward model village status. Every villager should have access to it.",
      "The second is the changemaker. In every village there are people who are ambitious, creative, willing to take risks and genuinely want to help others. We identify them and help them grow into trusted social leaders who carry the village forward.",
      "The third is turning agriculture into an enterprise through Farmer Producer Companies. It is not good to remain stuck in loss-making farming. When farmers come together they gain bargaining power, can add value through sorting, grading and processing, and can deal with the market on better terms.",
      "Underneath all three is the idea that a village's development should be financially viable, socially equitable and eco-friendly at the same time. Inspired by Gandhi ji's Gram Swaraj and Dr. Kalam's PURA, Model Gaon tries to bring together technology, people, traditions, skills and entrepreneurial spirit. If one of these is missing, the model is incomplete.",
    ],
    whatThisMeans:
      "He names all three pillars of Model Gaon precisely, village manifesto, changemaker, Farmer Producer Companies, and states plainly that the model is incomplete if even one is missing, rather than presenting them as independently optional components.",
    whyItMatters:
      "Turning agriculture into enterprise through Farmer Producer Companies, giving farmers collective bargaining power and the ability to add value through sorting, grading, and processing, is a concrete economic mechanism, not just an aspiration toward village prosperity.",
    reflect:
      "In a model or framework you've built, are all its pillars actually reinforcing each other, or is one quietly missing while you treat the model as complete anyway?",
  },
  {
    number: "08",
    title: "Do Maa: Two Mothers",
    quote: [
      "I often talk about the idea of Do Maa, two mothers. One is the mother who gave birth to us and the other is Mother Earth, our water, forests and land. If we serve the first, we must also serve the second. When people see it this way, sustainability stops being a distant global issue and becomes a personal duty.",
      "Climate action becomes real when it enters everyday routines. In the 2024 Lok Sabha elections, as observer for Anandpur Sahib in Punjab, we tried to show that even an election can be green. We set up Green Booths where voters received saplings, reduced single-use plastic in EVM training, dispatch and collection, and asked candidates of all parties to plant a sapling every day before going out to campaign. Our slogan was a free, fair, transparent and environment-friendly election. I was happy to see the idea later picked up elsewhere.",
      "Governments can build such small green habits into routine processes. Institutions can lead by example. Communities can protect their own ponds, trees and soil. And each individual can start with one tree, one less plastic bag, one bucket of water saved. These small steps, repeated by millions, matter more than any speech.",
    ],
    whatThisMeans:
      "As election observer for Anandpur Sahib in the 2024 Lok Sabha elections, he embedded climate action into the mechanics of the election itself, Green Booths handing out saplings, reduced plastic in EVM training and collection, candidates planting a sapling daily, rather than treating sustainability as a separate campaign.",
    whyItMatters:
      "\"These small steps, repeated by millions, matter more than any speech\" is a specific bet on scale through repetition over scale through rhetoric, consistent with his broader preference for low-cost, community-owned action over top-down declarations.",
    reflect:
      "Is there a routine process in your own work or life where you could embed a sustainable habit directly, the way he embedded it into election administration itself?",
  },
  {
    number: "09",
    title: "Respect the Water Budget of a Place",
    quote: [
      "Development and conservation are not enemies. The mistake we made for many years was to treat water as unlimited and nature as free. Bundelkhand paid the price for that.",
      "The principle I follow is simple. Respect the water budget of a place, and reconnect people with their traditional water sources. If we hold the rain where it falls, recharge the ground and revive our traditional wells and ponds, we can meet our needs without draining the future.",
      "In Banda our campaigns, Bhujal Badhao Peyjal Bachao and then Kuan Talab Jiyao Abhiyan, were built on this. Ponds were desilted, wells revived, contour trenches dug and rainwater harvesting promoted, mostly through people's participation. Groundwater began to respond.",
      "So any development plan should ask a few basic questions. Does it respect the water budget of the area? Does it revive or destroy traditional water bodies? Does it involve the people who will live with the consequences? If we answer these honestly, the balance usually follows.",
    ],
    whatThisMeans:
      "He names the two actual campaigns by their real names, Bhujal Badhao Peyjal Bachao and Kuan Talab Jiyao Abhiyan, and the specific actions underneath them, desilting ponds, reviving wells, digging contour trenches, rather than describing water conservation in general terms.",
    whyItMatters:
      "Reducing any development plan to three honest questions, water budget, traditional water bodies, the people who'll live with consequences, gives a portable test that doesn't require Bundelkhand's specific conditions to apply elsewhere.",
    reflect:
      "Applying his three questions to a current project of yours, water budget, impact on existing resources, involvement of those who'll live with the outcome, would it pass?",
  },
  {
    number: "10",
    title: "Technology Works Best When It Serves Participation, Not When It Replaces It",
    quote: [
      "Innovation in government does not always mean technology or large budgets. Some of the most effective innovations I have seen were low-cost or no-cost ideas built on people's participation.",
      "Governments should actively encourage innovation in three areas: how they reach people, how they involve people, and how they use what already exists. In Banda we tried this across water conservation, jail reforms, malnutrition, education, elections and agriculture. In the 2019 elections, for instance, creative voter awareness efforts helped lift turnout in the district significantly. We also organised a Startup and Innovation Summit so that young people and rural entrepreneurs could bring their ideas forward.",
      "What helps a good idea move from concept to implementation? A clear purpose, a small pilot that shows results quickly, a team that believes in it, and leaders willing to give officials room to try. Accountability and innovation can go together if we are transparent about what we are doing and why. I have also found that technology works best when it serves participation, not when it replaces it.",
    ],
    whatThisMeans:
      "He lists the actual range of areas this was tried across in Banda, water conservation, jail reforms, malnutrition, education, elections, agriculture, demonstrating that his approach to innovation wasn't confined to a single signature programme but applied as a general method.",
    whyItMatters:
      "Naming a specific, measurable outcome, voter turnout rising significantly in the 2019 elections through creative awareness efforts, grounds the claim about innovation in something verifiable rather than only in intention.",
    reflect:
      "In your own organisation, is innovation generally treated as requiring a large budget or new technology, or is there room for the low-cost, participation-built kind he describes?",
  },
];

const principlesPart3 = [
  {
    number: "11",
    title: "An Interesting Idea Stays in a Presentation. An Impactful Idea Finds Owners.",
    quote: [
      "An interesting idea stays in a presentation. An impactful idea finds owners.",
      "From what I have seen, the ideas that last have a few things in common. They solve a problem that people themselves feel, not one that only an outsider sees. They are simple enough to be copied in the next village without needing me or any officer there. They cost little, so they do not collapse when funding stops. And they can be measured, the number of wells revived, the rise in water level, the increase in voter turnout, the income of a Farmer Producer Company.",
      "Most importantly, they connect with people's values. In Banda, water conservation became a people's movement when it was linked to faith, pride and the future of their children. That emotional connection is often the difference between a project and a movement.",
      "So when I look at an idea, I ask: who will own it after we leave? If there is a clear answer, the idea has a chance.",
    ],
    whatThisMeans:
      "He gives four specific, checkable tests for whether an idea will last: does it solve a problem people themselves feel, can it be copied without him or any officer present, does it cost little enough to survive funding ending, and can it be measured in concrete terms like wells revived or turnout increased.",
    whyItMatters:
      "\"Who will own it after we leave?\" is the single question he actually uses to evaluate every idea, a practical filter that ties directly back to Principle 6's finding that what survives a transfer is only what people have made their own.",
    reflect:
      "Apply his question to an idea or initiative you're currently running: who would own it after you left, and is the answer actually clear?",
  },
  {
    number: "12",
    title: "Citizens Are Not Just Consumers of Public Services. They Are Partners in Governance.",
    quote: [
      "Citizens are not just consumers of public services. They are partners in governance, and in many cases they are the real solution.",
      "When the people of Banda's gram panchayats came out to dig trenches and clean their ponds, they were not helping the government. They were helping themselves, and the government was supporting them. That is how the relationship should be.",
      "Responsibility can be shared quite naturally. The government should provide direction, resources, knowledge and a fair system. Communities should set their priorities and protect what is built. Civil society and organisations like Model Gaon can train changemakers and connect villages to markets and schemes. Corporates can contribute through CSR, as ICICI Foundation has done by supporting Model Gaon. And every individual can take responsibility for one thing in their own surroundings.",
      "When everyone holds a small piece of responsibility, communities become far more resilient than when everything is left to the state.",
    ],
    whatThisMeans:
      "He reverses the framing of a specific moment: when gram panchayat members dug trenches and cleaned ponds, he insists they weren't helping the government, they were helping themselves, with the government in the supporting role rather than the other way around.",
    whyItMatters:
      "Naming ICICI Foundation specifically as a real example of corporate CSR supporting Model Gaon makes the shared-responsibility model concrete rather than aspirational, showing it already functions with an actual named partner.",
    reflect:
      "In a system you're part of, is responsibility actually distributed the way he describes, government, community, civil society, corporates, and individuals each holding a piece, or has it defaulted to the state carrying everything?",
  },
  {
    number: "13",
    title: "Development Must Be Measured by How It Reaches the Last Person, Not by Its Averages",
    quote: [
      "Development must be measured by how it reaches the last person, not by its averages.",
      "Institutionally, we need systems that go to people instead of waiting for people to come to them. Field visits, village meetings and simple, local-language processes matter a great deal for those who are poor, illiterate or far away.",
      "Socially, we must ensure that the voices of women, small and marginal farmers and the poorest families are heard in village decisions. In Farmer Producer Companies, for example, the rules require that at least one director is a woman and that half the members are small or marginal farmers. Such provisions are important, but the spirit behind them matters more.",
      "Behaviourally, the biggest change is empathy. Those of us in positions of authority must see the person in front of us as someone with dignity and potential, not as a problem to be managed. My own work on issues like jail reforms and malnutrition taught me that people at the margins respond remarkably when they are treated with respect.",
    ],
    whatThisMeans:
      "He structures inclusion across three distinct levels, institutional (systems that go to people), social (representation rules like requiring a woman director and half the members being small or marginal farmers in Farmer Producer Companies), and behavioural (empathy), rather than treating inclusion as a single fix.",
    whyItMatters:
      "\"Such provisions are important, but the spirit behind them matters more\" is a notable admission from someone who helped design the provisions himself, that rules alone don't guarantee the inclusion they're meant to produce.",
    reflect:
      "In a system you've helped design with inclusion rules built in, are the rules actually being followed in spirit, or just in letter?",
  },
  {
    number: "14",
    title: "Leadership Is Less About Authority and More About Trust",
    quote: [
      "Public service taught me that leadership is less about authority and more about trust. People follow you when they believe you are sincere and that you will stand with them.",
      "Integrity is the foundation. Without it, no plan, however clever, will survive. Patience is equally important, because real change in a village or an institution takes time and it rarely moves in a straight line. Accountability means owning the result, good or bad, and not hiding behind procedure.",
      "On decision-making, I have learnt to listen widely, decide clearly and then involve the team fully. Teamwork, foresight and dedication count for much more than individual brilliance. Many of the successes credited to me in Banda were really the work of countless officials, panchayat members and ordinary villagers.",
      "All of this applies equally outside government. A company, a startup or a social enterprise also runs on trust, integrity and the ability to bring people together around a shared purpose.",
    ],
    whatThisMeans:
      "He directly redistributes credit for his own Banda successes, naming them as the work of countless officials, panchayat members and ordinary villagers, rather than accepting sole credit for outcomes publicly attributed to him.",
    whyItMatters:
      "\"Accountability means owning the result, good or bad, and not hiding behind procedure\" sets a standard that applies in the opposite direction to the credit-sharing above, taking full ownership of failure while distributing credit for success.",
    reflect:
      "When something you led succeeded, did you redistribute credit the way he does? When something failed, did you own it fully, or did procedure provide cover?",
  },
  {
    number: "15",
    title: "Champion Change One Step at a Time",
    quote: [
      "Resistance is natural. Whenever you challenge the status quo, some people will doubt you and some will oppose you. I have learnt not to take it personally.",
      "What helps is starting small and letting results speak. When people see one revived well or one improved booth, scepticism softens. In Banda the 2019 general elections came right in the middle of our water campaign. Afterwards we took it forward in a second phase, with even more speed. Setbacks like that are part of the journey. You adjust your timing and your method, but you keep the purpose.",
      "Limited resources can actually be a strength. They push you towards low-cost solutions and people's participation, which are often more durable than expensive ones.",
      "My motto has always been to champion change one step at a time. You do not need to win every battle on the first day. You need to keep moving in the right direction and keep people with you.",
    ],
    whatThisMeans:
      "He treats the 2019 general elections landing in the middle of his water campaign not as a derailment to describe apologetically, but as a specific, real example of adjusting timing and method while keeping the underlying purpose intact.",
    whyItMatters:
      "Reframing limited resources as \"actually a strength\" that pushes toward low-cost, participation-built solutions connects directly back to Principle 1's founding insight in Banda, that constraint often produced more durable answers than a large budget would have.",
    reflect:
      "The last time a setback disrupted your timeline, did you keep the underlying purpose intact while adjusting method, or did the setback derail the purpose itself?",
  },
];

const principlesPart4 = [
  {
    number: "16",
    title: "When We Trust Young People With Meaningful Work, They Usually Exceed Our Expectations",
    quote: [
      "Young Indians are the biggest resource this country has. They have energy, ideas, comfort with technology and, very often, a strong sense of fairness.",
      "In governance, they can be watchdogs, volunteers and innovators who help systems work better. In climate action, they can lead tree plantation drives, water conservation and plastic reduction in their own neighbourhoods. In social innovation and rural transformation, they can become the changemakers that every village needs, starting enterprises, forming Farmer Producer Companies and bringing new knowledge back home.",
      "Institutions must open the door for them. That means internships and fellowships in government, platforms like startup and innovation summits, learning tours to model villages, and real responsibility rather than token roles. When we trust young people with meaningful work, they usually exceed our expectations.",
    ],
    whatThisMeans:
      "He names concrete institutional mechanisms, internships and fellowships in government, startup and innovation summits, learning tours to model villages, as what's actually required to open the door for young people, rather than leaving the invitation abstract.",
    whyItMatters:
      "\"Real responsibility rather than token roles\" is the specific distinction he draws, the same one that runs through his approach to village changemakers: genuine ownership produces genuine results, symbolic inclusion does not.",
    reflect:
      "Are the young people you work with given real responsibility, or token roles dressed up as opportunity?",
  },
  {
    number: "17",
    title: "Begin Where You Are, With What You Have",
    quote: [
      "Begin where you are, with what you have.",
      "You do not need money, influence or connections to start. Pick one problem in your own village, colony or college that you genuinely care about. Talk to the people affected by it and listen carefully. Then do one small thing that helps, clean a pond, teach a child, plant trees, help someone access a government scheme.",
      "Learn continuously. Visit places where change has already happened, read, ask questions and find mentors. Be creative and willing to take some risk. Communicate well, because bringing people along is half the work.",
      "Above all, be patient and consistent. Resources and recognition tend to follow genuine work done over time. Many of the most respected changemakers in rural India started with nothing but commitment.",
    ],
    whatThisMeans:
      "His advice to someone with limited resources, influence, or connections isn't to wait until they acquire those things. It's to pick one problem they genuinely care about and do one small, concrete thing, clean a pond, teach a child, plant trees.",
    whyItMatters:
      "\"Resources and recognition tend to follow genuine work done over time\" inverts the usual assumption that resources must come first, suggesting instead that sustained genuine work is what actually attracts them.",
    reflect:
      "Is there a problem you genuinely care about that you've been waiting for resources, influence, or connections to address, when you could begin with one small thing right now?",
  },
  {
    number: "18",
    title: "The India of 2040 Is Being Built by the Choices We Make in 2026",
    quote: [
      "I hope the next generation inherits an India where villages are not places people leave, but places they want to stay in. Villages with good income, clean water, healthy children, quality education and opportunities for young people. Where farming is a profitable enterprise and not a burden.",
      "I hope they inherit a country that has learnt to live in harmony with nature, where our rivers, ponds, forests and soil are healthier than they are today. And I hope they inherit institutions that people trust, where governance is transparent, participatory and genuinely focused on citizens.",
      "To move closer to that vision, we must start today. Revive our water bodies. Plant and protect trees. Make every village write and follow its own development agenda. Invest in local leaders. And make empathy a basic quality of everyone in public life. The India of 2040 is being built by the choices we make in 2026.",
    ],
    whatThisMeans:
      "His vision of India in 10 to 20 years is anchored in a specific, testable condition, villages people want to stay in rather than leave, with farming as a profitable enterprise rather than a burden, not an abstract notion of national progress.",
    whyItMatters:
      "Naming empathy as \"a basic quality of everyone in public life\" alongside concrete infrastructure goals, water bodies revived, trees planted, local leaders invested in, treats a human quality as equally necessary to the vision as physical and institutional change.",
    reflect:
      "What choice are you making today, in 2026, that's actually building toward the future you hope to see, rather than just hoping for it?",
  },
  {
    number: "19",
    title: "Keep People at the Centre and Trust Them",
    quote: [
      "Keep people at the centre and trust them.",
      "Whether you are an administrator, an entrepreneur or a citizen, the best solutions come from the people closest to the problem. If you involve them, respect their knowledge and give them ownership, they will surprise you with what they can achieve.",
      "I would add one more thing: serve with empathy. Positions, budgets and powers are temporary. What remains is the difference you made in someone's life and the trust you built. That is the real measure of public service.",
    ],
    whatThisMeans:
      "Asked for one principle to leave with the next generation of administrators, entrepreneurs, and changemakers, he doesn't limit it to government. The same instruction, keep people at the centre and trust them, applies equally to an administrator, an entrepreneur, or a citizen.",
    whyItMatters:
      "\"Positions, budgets and powers are temporary. What remains is the difference you made in someone's life and the trust you built\" offers a measure of success that doesn't depend on holding office, applicable long after any specific role ends.",
    reflect:
      "By his real measure, the difference made and the trust built, not the position held, how would you currently score in your own role?",
  },
  {
    number: "20",
    title: "If the Problem Is With You, So Is the Solution",
    quote: [
      "If the problem is with you, so is the solution.",
      "Do not wait for someone else to change things. Start with one step, however small, and bring others along. Change is not only possible, it is necessary, and it begins with you.",
    ],
    whatThisMeans:
      "Asked for one thought a young reader should remember above all others, he returns directly to his opening principle, now addressed to \"you\" rather than \"us,\" closing the loop between where his own journey began and what he wants to leave behind.",
    whyItMatters:
      "Repeating \"change is not only possible, it is necessary\" word for word from Principle 1 confirms this isn't a new idea added for a strong ending, it's the actual foundation every other principle in this feature was built on.",
    reflect:
      "Where in your own life or work is the problem actually with you, in a way that means the solution is too, and are you waiting for someone else to start?",
  },
  {
    number: "21",
    title: "That Shift in Belief Was the Biggest Achievement",
    quote: [
      "I would like to share one more thought. In Banda, people once believed that drought was their fate. Within a short time, through their own effort in reviving wells and ponds, they began to believe that water could return. That shift in belief was the biggest achievement, bigger than any number we could report.",
      "This is why I believe every village can become a model village. It needs a clear agenda written by its own people, a few committed changemakers and an economy that rewards hard work. Model Gaon exists to support exactly that.",
      "And finally, let us remember our two mothers, the one who raised us and Mother Earth who sustains us. If we care for both, we will rarely go wrong.",
    ],
    whatThisMeans:
      "Given one final, open opportunity to add anything, he names a belief shift, from drought as fate to water as recoverable, as the achievement he's actually most proud of, bigger than any measurable number his administration could report.",
    whyItMatters:
      "Closing on Do Maa again, the two mothers who raised us and who sustain us, returns to Principle 8's emotional foundation one last time, confirming it as a belief he holds personally, not only as a public messaging device.",
    reflect:
      "What's the most significant shift in belief, not a project or outcome, but an actual change in how people saw their own possibilities, that you've contributed to in your own work?",
  },
];

const takeaways = [
  {
    title: "If the problem is with us, so is the solution.",
    body: "Arriving in a drought-struck district, the question wasn't what budget was needed, but what could be done with what was already there.",
  },
  {
    title: "People are not short of wisdom; they are short of trust and opportunity.",
    body: "Seeing a working model village with their own eyes, at Ralegan Siddhi and Hiware Bazar, did more than a hundred meetings could.",
  },
  {
    title: "Roll out the red carpet, not the red tape.",
    body: "When people help design something, they protect it. When something is designed for them without them, it usually stays on paper.",
  },
  {
    title: "An interesting idea stays in a presentation. An impactful idea finds owners.",
    body: "The real test of any idea: who will own it after we leave?",
  },
  {
    title: "Citizens are not just consumers of public services. They are partners in governance.",
    body: "When people dig trenches and clean their own ponds, they are not helping the government. They are helping themselves.",
  },
  {
    title: "Development must be measured by how it reaches the last person, not by its averages.",
    body: "Systems should go to people instead of waiting for people to come to them.",
  },
  {
    title: "Keep people at the centre and trust them.",
    body: "Positions, budgets and powers are temporary. What remains is the difference made and the trust built.",
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
          Dr. Heera Lal Patel, IAS · Secretary, National Integration, Government of Uttar Pradesh
          · Climate Action Leader · Author · Changemaker · Social Entrepreneur · Inspirational
          Speaker
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
          District Magistrate, Banda (2018&ndash;2020) · Model Gaon · Jal Chaupal · Do Maa ·
          Bundelkhand
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Real change happens when governance, people and nature work together for a
          better tomorrow.&rdquo;
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
          <p className="font-medium">19 minutes</p>
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
          "People-Centric Governance",
          "Climate Action",
          "Grassroots Transformation",
          "Innovation in Government",
          "Youth & Changemakers",
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
        <p className="mt-4 leading-relaxed text-neutral-700">
          Dr. Heera Lal Patel, IAS, is a distinguished civil servant, changemaker and social
          entrepreneur known for his people-centric approach to governance. Through innovative,
          practical and community-driven initiatives, he has worked across rural development,
          climate action, sustainable living and citizen participation, creating meaningful and
          lasting impact on the ground.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          He currently serves as Secretary, National Integration, Government of Uttar Pradesh. As
          District Magistrate of Banda, in the heart of Bundelkhand, from August 2018 to February
          2020, he led community-driven water conservation and rural development efforts,
          including the Bhujal Badhao Peyjal Bachao and Kuan Talab Jiyao Abhiyan campaigns, that
          turned a drought-known district toward water revival through people's participation. His
          Model Gaon approach, built on the village manifesto, local changemakers, and Farmer
          Producer Companies, has since become a framework for rural transformation. He is a
          champion of climate action, water conservation and sustainability, an author, social
          entrepreneur and inspirational speaker.
        </p>
        <blockquote className="mt-6 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Dr. Heera Lal Patel, IAS, twenty questions, and one final reflection. He
          answered from years of fieldwork in Banda, Bundelkhand, building water governance and
          village development around community trust and ownership.&rdquo;
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
        <p className="mt-4 text-sm text-neutral-500">19 min read · 21 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
