import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "eric-anthony-jones";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Eric Anthony Jones — Peace Must Become a Practice Before It Can Become a Promise";
const DESCRIPTION =
  "Context without accountability becomes excuse. Accountability without context becomes distortion. Five principles from the Founder of The Peacemakers Movement.";
const IMAGE = "https://app.stated.in/eric-portrait.jpg";

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
    images: [{ url: IMAGE, width: 1080, height: 1440, alt: "Eric Anthony Jones" }],
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
    title: "The Institution's Description of Me Was Not the Truth About Me",
    quote: [
      "My principles did not begin as abstract ideas. They developed through a lifetime of discovering that what people, institutions, and authorities say about a human being is not necessarily the truth about that human being.",
      "As a child, school records described me with terms such as slow, mentally retarded, and emotionally disturbed. I never believed those labels. One memory from elementary school affirmed what I already knew.",
      "At the time, I was in a regular classroom, but I had been placed in the lowest academic tier. The school also had a classroom for gifted students. During lunch and recess, I regularly went there because it was the most interesting room in the school. The students launched model rockets, conducted science experiments, built things, and even had a ping-pong table inside the classroom. I wasn't part of the class. I wasn't allowed to participate in their lessons, experiments, or activities. The teacher simply allowed me to sit quietly on the counter at the back of the room and watch.",
      "One day, while the students were playing ping-pong, the ball flew across the room, bounced onto the counter where I was sitting, rolled into the sink, and became lodged in the drain with part of it still visible. One student tried to pry it out, but the ball began to crack. As I watched, two possible solutions immediately came to mind: attach something sticky to the ball or simply turn on the water and allow it to float upward.",
      "I turned on the faucet.",
      "The ball rose.",
      "The students retrieved it, resumed their game, and I quietly returned to watching.",
      "The moment did not convince me that I was intelligent. It confirmed something I had sensed all along: the institution's description of me was not the same as the truth about me.",
      "That lesson extended far beyond academics.",
      "I was one of relatively few Black children at Heatherbrae Elementary School in Phoenix. Other children subjected me to racial insults and degrading comparisons. When I reported what was happening, I was sometimes punished for tattling rather than protected. Even ordinary behavior could be interpreted through the story adults had already formed about me. I had a naturally loud sneeze, for example, but it was treated as an attempt to attract attention.",
      "Eventually, after enduring another racial insult and believing no adult was going to protect me, I threw a chair.",
      "The action was dangerous, and I accept that.",
      "What troubled me then — and still stays with me today — was that the label placed upon me afterward ignored everything that had led to that moment. I was described as emotionally disturbed. My experience was different: I was disturbed by what was being done to me, and I had reached the point where I decided that if the adults would not protect me, I would try to protect myself.",
      "I was transferred to another school with a special program. After observing me, educators there concluded that I did not belong in that placement and moved me into regular classes.",
      "That experience taught me one of the earliest principles that continues to shape my life: people can possess authority, credentials, and sincere intentions, and still perceive another human being inaccurately.",
      "My parents loved me and did the best they knew how to do. They were African Americans shaped by their generation, their Southern upbringing, military life, and a deep respect for authority. When the school described me in a particular way, they believed the school. My father even declined possible military relocations because he was told that disrupting my supposedly stable educational environment would be harmful.",
      "He believed he was protecting me.",
      "He could not have known that the environment being preserved was also one in which I was experiencing racial, emotional, and other forms of abuse.",
      "That taught me another difficult truth: love and good intentions are indispensable, but they do not guarantee accurate perception or wise judgment.",
      "Years later, another lesson emerged. While reading my military medical records in high school, I discovered by accident that I had been adopted as an infant. The information explained genetic differences I had already noticed, but it did not create an identity crisis.",
      "My parents had raised me. They were my parents. Biology explained where I came from. Relationship explained who had loved me.",
      "That understanding continued throughout my life. At different moments, other families gave me refuge, belonging, and support. Some of those relationships endured. Others later revealed painful limits.",
      "Together they taught me that family cannot be defined by blood, legal status, or affectionate titles alone. It is ultimately revealed through presence, responsibility, protection, and whether people continue honoring the bonds they have invited others to trust.",
      "Law school added another layer. At Gonzaga University School of Law, I was, by my recollection, the only Black man in my entering class. While receiving a legal education, I was also trying to understand my own identity and history. By my third year, I often found myself reading Black history and biographies in the back of class because understanding who I was had become as important to me as understanding the law.",
      "I later learned that other minority students had received scholarship assistance for which I was ineligible because I had entered through a conditional summer program rather than in the fall. Faculty members reportedly tried to secure the scholarship for me, but the rule prevented it.",
      "Once again, I encountered a lesson that would remain with me: a system can have worthy intentions. Good people within that system can sincerely try to help. Yet the structure itself can still produce an unequal outcome.",
      "Over time, these experiences formed something larger than isolated memories. They taught me not to confuse authority with truth, labels with identity, rules with justice, intentions with impact, or reactions with the full history that produced them.",
      "They also taught me the necessary counterbalance. Understanding context must never become a substitute for personal responsibility. In my own professional life, I would eventually have failures for which I alone was responsible. I could acknowledge the forces that shaped me without allowing them to erase my agency.",
      "That balance remains central to my principles. Context without accountability becomes excuse. Accountability without context becomes distortion.",
      "Everything I am building today — including The Peacemakers Movement™, The Peacemaker's Code™, Morning Fire™, The Peacemaker's Passage™, and the developing Architecture of Human Discernment — grew from these lived experiences.",
      "I have come to believe that peace requires more than agreement or good intentions. It requires people who can regulate themselves, perceive reality more faithfully, remain humble before evidence, preserve human dignity, accept moral responsibility, and allow reality to correct them.",
      "My principles developed because I learned early that people can be profoundly harmed when an interpretation is mistaken for the truth. They matured when I realized I must apply that same standard to myself by examining my own perceptions and conduct with the same honesty I expect from others.",
      "At the center of my work is therefore a continuing question: how do we learn to see human beings — including ourselves — more truthfully than the labels, fears, histories, and assumptions placed upon them?",
    ],
    whatThisMeans:
      "He traces every principle he holds back to one recurring discovery — that authority, credentials, and even sincere love are not the same thing as accurate perception. A school, a system, or a parent can be well-intentioned and still get a human being wrong.",
    whyItMatters:
      "The turning point isn't the ping-pong ball moment itself — it's what he does with it: he doesn't conclude \"I was actually gifted.\" He concludes something more durable: an institution's description of you is not the truth about you. That distinction became the foundation for how he now separates context from excuse, and label from identity.",
    reflect:
      "What label — from a school, a workplace, a diagnosis, or a family story — have you quietly accepted as the truth about you, rather than one person's or one system's account of you?",
  },
  {
    number: "02",
    title: "Could I See Myself Accurately?",
    quote: [
      "My principles have been tested many times, but the most consequential test did not come when I was misunderstood by others. It came when I had to examine myself with the same honesty I expected from everyone else.",
      "As a child, I learned what it felt like to be judged before being understood. I was labeled, misperceived, and often punished for my reactions while the circumstances producing those reactions remained largely unseen. Those experiences shaped my commitment to human dignity, truthful perception, and the importance of understanding context before reaching conclusions.",
      "It would have been easy to spend the rest of my life believing that my greatest challenge was convincing others to see me accurately.",
      "Life eventually presented me with a far more difficult question: could I see myself accurately?",
      "After graduating from Gonzaga University School of Law, I spent thirteen years practicing law. It was meaningful work. I had the privilege of helping people navigate some of the most difficult moments of their lives, and I remain grateful for the opportunity to have served them.",
      "One conviction guided much of my legal practice. I often told clients there is an important difference between having a legal right and doing what is right. The law can determine what we are permitted to do. It cannot answer every moral question.",
      "In family law, there were times when I needed to function less as a traditional advocate and more as a mediator. I wanted my clients to understand that winning every legal advantage did not necessarily produce the wisest or most humane outcome. A person could possess a legal right and still exercise that right in ways that unnecessarily damaged relationships, families, or children.",
      "Looking back, I recognize that this principle would eventually be tested in my own life.",
      "Over time, I became complacent. I never stopped wanting to help people, but good intentions are not enough. My discipline weakened. My execution became inconsistent. I allowed habits to develop that fell short of the professional standards my clients deserved and that I expected of myself.",
      "The consequences were significant. I lost my license to practice law.",
      "That experience forced me to confront a question every leader eventually faces: would I use context to understand my failures, or would I use it to excuse them?",
      "Context mattered. My childhood experiences mattered. Financial pressures mattered. Professional stress mattered. All of those things formed part of the story. They were never the whole story.",
      "Throughout my life, I had come to believe that understanding human behavior requires seeing the full context in which it develops. But I also knew that this principle becomes dangerous the moment it is used to erase personal responsibility.",
      "So I chose the more difficult path.",
      "I acknowledged the context without allowing it to erase my agency. I accepted that there were decisions I should have made differently. I accepted that I had become less disciplined than I believed myself to be. I accepted that my execution had not consistently reflected either my intentions or my standards.",
      "That process changed me. It deepened my humility because I learned how easily any of us can drift from the principles we sincerely believe. It deepened my compassion because I came to understand that human failure is rarely explained by a single cause. It deepened my commitment to truth because I experienced firsthand how tempting it is to construct stories that protect our identity instead of revealing reality.",
      "Most importantly, it confirmed something I had long believed but now had to live: compassion and accountability are not opposites. Compassion without accountability can become permission. Accountability without compassion can become condemnation. Neither produces lasting transformation. Real growth requires both.",
      "Looking back, I no longer see that chapter simply as the end of a legal career. I see it as one of the most demanding classrooms of my life. It required me to apply inwardly the same principles I had spent years encouraging in others.",
      "Everything I have built since — including The Peacemakers Movement™, Morning Fire™, The Peacemaker's Passage™, Beyond Agreement™, The Peacemaker's Code™, and the developing Architecture of Human Discernment — has been shaped by that experience.",
      "None of this work is built upon the claim that I have lived a flawless life. It is built upon the conviction that human beings become wiser when they are willing to face reality honestly, accept responsibility without surrendering hope, and continue developing the capacities that make integrity, dignity, and peace possible.",
      "If these principles have earned any credibility, it is not because they protected me from failure. It is because they first required something of me before I ever asked them of anyone else.",
    ],
    whatThisMeans:
      "The hardest test of his principles wasn't being misjudged by a school or a system — it was losing his law license after his own discipline slipped, and having to decide whether to use his childhood context to explain that failure or to excuse it.",
    whyItMatters:
      "He names the exact trap most people fall into on either side: using compassion to excuse accountability away, or using accountability to crush compassion. His answer — that real growth requires holding both — only carries weight because he lived the failure that tested it, rather than arriving at it in theory.",
    reflect:
      "Think of a time you failed at something that mattered. Did you use the context around that failure to understand it — or to excuse it? Be honest about which one it actually was.",
  },
  {
    number: "03",
    title: "Peace Is a Human Capacity Before It Is a Social Condition",
    quote: [
      "My principles shape my work through a simple conviction: many of the crises we describe as political, social, institutional, or interpersonal are also crises of human capacity.",
      "People are often told to communicate better, disagree respectfully, make wiser choices, act with integrity, resist manipulation, or choose peace. Yet those expectations depend upon capacities that cannot simply be assumed.",
      "A person must be able to regulate emotion without becoming numb. They must perceive reality without allowing fear, memory, identity, ideology, or group loyalty to distort what they see. They must be humble enough to let evidence correct them. They must preserve another person's dignity without pretending all ideas are equally sound. They must remain present in discomfort rather than immediately becoming defensive, hostile, avoidant, or reactive. They must also retain moral agency — the capacity to choose what is right even when pressure, pain, appetite, or belonging pull them in another direction.",
      "This is why I do not understand peace merely as the absence of conflict. Conflict is inevitable. Difference is inevitable. Pressure is inevitable. The deeper question is whether human beings possess the capacities necessary to remain truthful, dignified, and morally responsible when those realities arise.",
      "That conviction shapes The Peacemakers Movement™. The Movement is not built upon the assumption that peace emerges because people are told to be kinder or because opposing groups are placed in the same room.",
      "Dialogue matters. But dialogue without regulation can become performance, combat, or withdrawal. Agreement matters when it is possible. Human dignity must never depend upon agreement.",
      "For that reason, the work focuses on formation. Morning Fire™ cultivates regulation, attention, discipline, and intentionality before the pressures of the day take control. The Peacemaker's Code™ identifies principles that must become lived practice rather than inspirational language. Beyond Agreement™ explores the human capacities that allow people to remain in truthful encounter when consensus is unavailable. The Peacemaker's Passage™ carries that inquiry into everyday life across cultures, asking what actually helps human beings move from fear and division toward dignity, dialogue, and peace. The developing Architecture of Human Discernment investigates how people interpret reality, why perception becomes distorted, and what practices help judgment become more faithful.",
      "These are not separate initiatives. They are different expressions of the same commitment: peace must become a human capacity before it can become a durable social condition.",
      "That conviction also shapes how I think about institutions. Every institution forms people, whether it intends to or not. Schools teach more than academic content. Businesses shape attention and behavior. Social media trains habits of reaction. Artificial intelligence can strengthen inquiry, but it can also weaken authorship, judgment, and human agency when used without discernment. Universities shape identity as much as they confer credentials. Fashion influences how beauty, labor, and human worth are perceived. Financial institutions influence how people understand security, aspiration, debt, and choice.",
      "For that reason, I believe every institution should ask a deeper question: are we strengthening the human capacities upon which wise and free choice depends, or are we quietly depending upon human weakness for our success?",
      "That question is not limited to one industry. It applies wherever human beings are being formed.",
      "This does not relieve individuals of responsibility for their own choices. Nor does it excuse institutions from examining the environments they create. People are not powerless products of systems. Systems are not neutral containers untouched by human consequences.",
      "The Peacemakers Movement™ stands between those two distortions. It refuses to reduce social harm to individual weakness alone. It also refuses to treat human beings as though they have no agency. Its work is to strengthen both people and the environments that shape them.",
      "I do not believe society changes only through large declarations. It changes when people develop the capacity to pause before reacting, examine what they think they see, remain open to correction, tell the truth without dehumanizing, and choose responsibility even when blame would be easier.",
      "It also changes when institutions recognize that every classroom, workplace, platform, policy, and commercial system is helping to form the people who pass through it.",
      "The Peacemakers Movement™ exists to make those formative processes visible and to help translate peace from an aspiration into a disciplined way of perceiving, relating, deciding, designing, and living.",
    ],
    whatThisMeans:
      "He reframes conflicts we usually call political or social as, underneath, crises of human capacity — the ability to regulate emotion, perceive reality without distortion, and stay morally responsible under pressure. Peace, in his framing, isn't the absence of conflict; it's whether people have the internal capacity to stay truthful and dignified when conflict inevitably arrives.",
    whyItMatters:
      "This is what separates his work from a typical dialogue-and-goodwill approach to peacebuilding. Every institution — schools, platforms, financial systems — is already forming people's capacities, for better or worse, whether it intends to or not. His question for every institution is blunt: are you strengthening people's judgment, or quietly profiting from its absence?",
    reflect:
      "Think about the institutions that shape your own daily life — your workplace, the platforms you use, the systems you depend on. Are they building your capacity for calm, truthful judgment, or quietly depending on your reactivity?",
  },
  {
    number: "04",
    title: "Nine Principles for the Next Generation",
    quote: [
      "I would not want the next generation merely to inherit my conclusions. I would want them to develop the capacities to examine reality, test what they have been taught, preserve human dignity, and make responsible choices for themselves.",
      "The first principle I would pass on is this: do not surrender your identity to another person's limited measurement of you. Authority can be useful. Education can be valuable. Expertise matters. But no teacher, institution, diagnosis, title, social category, or public opinion should be allowed to replace careful attention to the actual human being. Most people will see only a fragment of you. They may interpret you through fear, bias, habit, limited information, or an inherited story. Listen carefully enough to learn from correction, but do not mistake another person's interpretation for the total truth of who you are.",
      "The second principle is equally important: do not reduce other people to the labels once used against you. It is not enough to resist being misjudged. We must also resist becoming careless judges of others. A person is more than a race, religion, nationality, diagnosis, political position, mistake, profession, social class, or moment of failure. Categories can help us recognize patterns, but they become dangerous when they replace curiosity about the person standing before us. I would teach the next generation to ask: what do I actually know? What am I assuming? What part of this person's history can I not yet see? What evidence might correct me?",
      "The third principle is: learn to regulate before you react. Regulation does not mean becoming passive, emotionally numb, or agreeable. It does not mean quietly accepting abuse or injustice. It means developing enough inner steadiness to decide what the moment requires rather than allowing fear, anger, appetite, humiliation, or group pressure to decide for you. There are moments when resistance is necessary. There are moments when leaving is wise. There are moments when speaking forcefully is morally required. Regulation helps us distinguish moral courage from emotional reaction.",
      "The fourth principle is: hold context and accountability together. Human behavior should not be judged without examining the conditions surrounding it. Pain, trauma, poverty, discrimination, family history, institutional pressure, exclusion, and fear all matter. But explanation must not become automatic exoneration. We remain moral agents. One of the most important balances I have learned is: context without accountability becomes excuse. Accountability without context becomes distortion. The next generation will need both compassion and responsibility. Without compassion, accountability becomes condemnation. Without accountability, compassion can become permission for harm to continue.",
      "The fifth principle is: preserve dignity without abandoning truth. Human dignity does not require agreement. You can reject an idea without degrading the person who holds it. You can establish a boundary without denying another person's humanity. You can tell the truth about harm without making hatred your identity. This is especially important in a time when disagreement is often treated as evidence of moral corruption and public humiliation is confused with justice. I would teach young people that ridicule is not the same as courage, certainty is not the same as wisdom, and destroying an opponent is not the same as defending what is right.",
      "The sixth principle is: allow reality to correct you. We all develop stories about ourselves, other people, and the world. Some of those stories protect us. Some give us belonging. Some preserve our sense of innocence or superiority. No identity is strengthened by resisting reality. Humility is not thinking less of yourself. It is refusing to make yourself, your group, your ideology, or your memory more authoritative than reality. A person who cannot be corrected cannot continue to grow.",
      "The seventh principle is: understand that relationships create responsibilities. Do not casually invite people — especially children — to trust you as family, mentor, protector, or parent if you intend to treat that bond as disposable when circumstances change. Legal status and biology matter, but they do not exhaust the meaning of responsibility. When people allow us into their emotional lives, our conduct leaves consequences. Love is not merely something we feel. It is something we become accountable for practicing.",
      "The eighth principle is: do not confuse a delayed beginning with a wasted life. Human beings do not develop on identical timelines. Some people receive confidence, education, resources, mentorship, and social acceptance early. Others spend decades surviving, recovering, discovering their identity, or learning what was never taught to them. Another person's head start is not proof of your inferiority. Age does not automatically mean your meaningful contribution is behind you. What matters is whether you are willing to use what you have learned, accept the tools now available, and begin the work that is yours to do.",
      "Finally, I would teach this: peace must become a practice before it can become a promise. Peace is not merely a feeling, slogan, ceremony, or absence of disagreement. It depends upon capacities developed over time: regulation; discernment; humility; moral courage; truthful perception; compassion; boundaries; responsibility; and the preservation of dignity.",
      "I would want the next generation to inherit more than my language. I would want them to surpass me in their ability to embody these capacities. The goal is not to create people who repeat my answers. It is to help form people who can discover truth with greater humility, love with greater responsibility, exercise greater discernment, and build a more peaceful world than the one they inherited.",
      "That is the inheritance I hope to leave behind.",
    ],
    whatThisMeans:
      "Asked what he'd pass to the next generation, he doesn't offer a single motto — he offers nine distinct, ordered principles: from not surrendering your identity to another's limited view of you, through regulating before reacting, holding context and accountability together, and ending with peace as a practice, not a promise.",
    whyItMatters:
      "These nine build directly on each other — the same balance he learned from his own childhood labeling (principles one and two) and his own professional failure (principle four) becomes something he's now handing forward, tested rather than theoretical.",
    reflect:
      "Of his nine principles, which one is currently the hardest for you to actually practice — not agree with, but practice — in your own life right now?",
  },
  {
    number: "05",
    title: "Help Human Beings See Reality — and One Another — Truthfully",
    quote: [
      "When people hear the word legacy, they often think about being remembered. I think first about what continues to shape the lives of others after we are gone.",
      "If my name is remembered but my work contributes little to the flourishing of humanity, I would consider that a poor legacy. If, however, the ideas, practices, and capacities I have spent my life developing continue helping people become more truthful, more discerning, more responsible, more compassionate, and more capable of peace, then I would consider that a life well lived.",
      "The legacy I hope to leave is not centered on me. It is centered on what human beings become.",
      "Throughout my life, I have seen how easily people can be reduced to labels, stereotypes, diagnoses, political identities, professions, successes, failures, races, religions, or the worst moment of their lives. I have also seen the damage that occurs when institutions confuse authority with wisdom, when good intentions replace careful perception, or when accountability becomes separated from compassion.",
      "Those experiences convinced me that one of humanity's greatest needs is not simply more information. It is greater human capacity.",
      "I hope to leave behind practical ways for people to strengthen the capacities that make freedom, dignity, responsibility, and peace more possible. That hope is reflected throughout the work I am building.",
      "Morning Fire™ seeks to cultivate regulation and intentionality before the demands of the day take over. The Peacemaker's Code™ explores principles that become lived habits rather than inspirational slogans. Beyond Agreement™ examines how people preserve dignity and truthful dialogue when consensus cannot be reached. The Peacemaker's Passage™ is my attempt to test these ideas through ordinary human relationships across cultures rather than keeping them safely inside theory. The developing Architecture of Human Discernment asks one of the deepest questions I know: how do human beings become more capable of perceiving reality faithfully enough to choose wisely and relate peacefully?",
      "I do not expect these efforts to answer every question. I hope they encourage better questions.",
      "If someone reads my work decades from now, I do not hope they conclude that I had all the answers. I hope they become more curious, more humble, and more willing to examine their own assumptions than they were before encountering my work.",
      "I also hope my life demonstrates something that has become deeply important to me. Human beings are not finished products. A difficult childhood does not have to determine the rest of a life. Failure does not have to become identity. Success does not eliminate the need for humility. Correction is not the enemy of dignity. Growth remains possible for those willing to face reality honestly.",
      "That is one reason I have chosen not to hide the more difficult chapters of my own life. If I ask others to pursue truth, I must be willing to let the truth be told about me as well. I hope that encourages others to live with less performance and greater integrity.",
      "If there is one sentence that captures the legacy I hope to leave, it is this: help human beings become more capable of seeing reality — and one another — truthfully, and then choosing to act in ways that preserve dignity while accepting responsibility.",
      "Everything I have built ultimately serves that purpose. Whether I am writing, teaching, speaking, practicing law, engaging in dialogue, traveling through The Peacemaker's Passage™, developing Morning Fire™, or studying the Architecture of Human Discernment, I am pursuing the same underlying question: how do we cultivate the kinds of human beings who are capable of sustaining peace rather than merely talking about it?",
      "If future generations improve upon my work, correct my mistakes, refine my ideas, and discover better ways to strengthen those capacities, I will consider that success rather than failure.",
      "No meaningful legacy should require permanent agreement with its author. The greatest legacy is not that people continue quoting us. It is that they continue pursuing truth with greater wisdom, courage, humility, and love because, in some small way, our lives helped make that pursuit more possible.",
    ],
    whatThisMeans:
      "His definition of legacy deliberately isn't about being remembered — it's about what continues shaping other people's lives after he's gone. He'd rather be corrected and surpassed than quoted and agreed with forever.",
    whyItMatters:
      "The line \"I have chosen not to hide the more difficult chapters of my own life\" connects every principle he's stated back to Question One and Two — his credibility isn't built on having gotten everything right, but on being willing to let the same truth he asks of others be told about himself.",
    reflect:
      "If your own legacy had to be measured by what it continues to make possible in other people's lives — rather than by how you're remembered — would you be building it differently than you are right now?",
  },
];

const takeaways = [
  {
    title: "An institution's description of you is not the truth about you.",
    body: "Authority, credentials, and even love do not guarantee accurate perception. Labels can be wrong even when the people applying them are sincere.",
  },
  {
    title: "Context without accountability becomes excuse. Accountability without context becomes distortion.",
    body: "Real growth requires holding both — understanding what shaped a failure, without letting that understanding erase responsibility for it.",
  },
  {
    title: "Peace is a human capacity before it's a social condition.",
    body: "Regulation, discernment, humility, and moral courage aren't automatic. They have to be built — in people, and in the institutions that form them.",
  },
  {
    title: "Do not surrender your identity to another person's limited measurement of you.",
    body: "Most people will only ever see a fragment of you. Learn from correction — but don't mistake someone's interpretation for the whole truth.",
  },
  {
    title: "Preserve dignity without abandoning truth.",
    body: "You can reject an idea without degrading the person who holds it. Ridicule is not courage; certainty is not wisdom.",
  },
  {
    title: "A legacy worth building is one you'd want others to surpass.",
    body: "The goal isn't to be remembered or agreed with forever — it's that people keep pursuing truth more capably because your life made that pursuit a little more possible.",
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
        / Eric Anthony Jones
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/eric-portrait.jpg"
            alt="Eric Anthony Jones"
            width={1080}
            height={1440}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Eric Anthony Jones · Founder, The Peacemakers Movement™
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 005
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Eric Anthony <em>Jones</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Peace Must Become a Practice Before It Can Become a Promise
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Founder, The Peacemakers Movement™ · Identity Transformation &amp; Interfaith
          Leadership · Former Attorney &amp; ABA Commissioner · Creator of The Peacemaker&apos;s
          Code™
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;The institution&apos;s description of me was not the same as the truth about
          me.&rdquo;
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
          <p className="font-medium">22 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">5 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">July 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Founder, The Peacemakers Movement™",
          "Former Attorney & ABA Commissioner",
          "Identity Transformation",
          "Interfaith Leadership",
          "Creator, The Peacemaker's Code™",
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
          &ldquo;We asked Eric Anthony Jones five questions. He gave us a lifetime of learning to
          see human beings — including himself — more truthfully.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Eric Anthony Jones is the founder of The Peacemakers Movement™ and the creator of The
          Peacemaker&apos;s Code™. A former attorney and American Bar Association Commissioner, he
          now builds Morning Fire™, Beyond Agreement™, The Peacemaker&apos;s Passage™, and the
          developing Architecture of Human Discernment — work grounded in a lifetime of learning
          the difference between how institutions label a person and who that person actually is.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words, presented here in full. This is how <em>Stated Principles</em> works: the
          person states their beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Five principles · Stated by Eric Anthony Jones
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 05</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Eric Anthony Jones, stated directly
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
          &ldquo;Context without accountability becomes excuse.
          <br />
          <em>Accountability without context becomes distortion.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Eric Anthony Jones — Principle II, Stated
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
          Post a commitment inspired by Eric Anthony Jones&apos;s principles. State it publicly —
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
        <p className="mt-4 text-sm text-neutral-500">22 min read · 5 principles</p>
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
