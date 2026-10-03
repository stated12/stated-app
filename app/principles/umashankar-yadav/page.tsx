import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "umashankar-yadav";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Umashankar Yadav — Be Flexible in Your Approach, But Firm in Your Values";
const DESCRIPTION =
  "A film company was not born from a business plan. It was born from a story. Seventeen principles on creativity, dignity, and building a film company rooted in both.";
const IMAGE = "https://app.stated.in/yadav-portrait.jpg";

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
    images: [{ url: IMAGE, width: 1254, height: 1254, alt: "Umashankar Yadav" }],
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
    title: "I Am, in Many Ways, the Sum of All Those Experiences",
    quote: [
      "Looking back, I realise that life has shaped me in layers, each phase came at a different age, through different circumstances, and each left behind something that became part of who I am today.",
      "At a very young age, I lost my father. That experience brought an early sense of responsibility and maturity, but it also brought uncertainty. I grew up watching my mother navigate life with quiet strength, and that silently shaped my own resilience.",
      "Later, as I began working, I experienced both failures and small victories, moments that taught me patience and humility. There were times things did not go as planned, and I had to rebuild, rethink and start again.",
      "Then came the phase of building something of my own, starting a company, taking creative and financial risks, and learning that courage is not the absence of fear but the decision to move forward despite it.",
      "Each of these experiences, loss, struggle, failure and rebuilding, has contributed to shaping my character, my patience and my perspective on life. I am, in many ways, the sum of all those experiences.",
    ],
    whatThisMeans:
      "He traces his own character back to a sequence of distinct life phases, early loss, workplace failure and small victories, and eventually entrepreneurial risk, treating none of them as separate from who he is today, but as layers that together built him.",
    whyItMatters:
      "Naming courage as \"not the absence of fear but the decision to move forward despite it\" is a hard-won definition, arrived at specifically through the experience of building a company and taking creative and financial risk, not offered as an abstract motivational line.",
    reflect:
      "Looking at the distinct phases of your own life so far, which one shaped your character the most, and have you actually acknowledged what it gave you?",
  },
  {
    number: "02",
    title: "I Would Rather Lose Something While Remaining True to Myself",
    quote: [
      "Yes, there have been several moments where I had to choose between what felt easier and what felt right. One belief I have never compromised on is honesty in intent, even when the truth was inconvenient or could cost me an opportunity.",
      "There were business situations where bending a little, saying what people wanted to hear, or taking a shortcut would have been simpler. But I always believed that short-term comfort built on compromise eventually costs more in the long run, either in trust, in reputation, or in self-respect.",
      "So yes, there have been real costs, financial, relational, even professional, but I would rather lose something while remaining true to myself than gain something by losing my integrity.",
    ],
    whatThisMeans:
      "He names honesty in intent as the specific belief he's never compromised on, and is direct about the fact that holding to it has cost him real, concrete things, financial, relational, professional, not just abstract discomfort.",
    whyItMatters:
      "\"Short-term comfort built on compromise eventually costs more in the long run\" reframes the easier choice as the more expensive one over time, a calculation most people avoid making explicit even when they sense it's true.",
    reflect:
      "Is there a shortcut you're currently tempted by that would be easier now but, by his logic, would cost you more later in trust or self-respect?",
  },
  {
    number: "03",
    title: "We Wanted to Make It Deeper, Not Bigger",
    quote: [
      "AILF, the Ashirwad International Literature Festival, started with a very simple but strong intention: to create a space where literature, art, cinema and ideas could meet without barriers of language, geography or background.",
      "I have always believed that literature is not just about books, it is about human experience, emotion and thought. India has such a rich diversity of languages and storytelling traditions, yet many of these voices remain unheard outside their own regions.",
      "AILF was built on the idea of inclusivity, bringing together established as well as emerging writers, filmmakers, artists and thinkers on one platform. We wanted to create dialogue, not competition, collaboration, not hierarchy.",
      "Over time, instead of simply scaling the number of events, we focused on deepening the quality of conversations, strengthening regional participation and building long-term relationships with authors and institutions. We wanted AILF to feel personal, not corporate, where everyone, from a published author to a first-time poet, feels equally valued. That intention of inclusivity and authenticity is what has helped AILF grow organically, chapter by chapter, voice by voice.",
    ],
    whatThisMeans:
      "Rather than scaling by increasing the number of events, he describes a deliberate choice to deepen the quality of conversations and regional participation instead, treating growth in reach and growth in depth as two genuinely different goals.",
    whyItMatters:
      "\"We wanted to create dialogue, not competition, collaboration, not hierarchy\" is a specific structural choice about how a platform treats both established and first-time voices, not just a value statement about inclusivity in the abstract.",
    reflect:
      "In something you've built or are building, have you been optimising for scale, or for depth, and which one does it actually need more right now?",
  },
  {
    number: "04",
    title: "A Film Company Was Not Born From a Business Plan. It Was Born From a Story.",
    quote: [
      "The idea for Akashwadi Films did not come from a business plan, it came from a story. A few years ago, I came across a real-life incident that deeply moved me, something so human and emotional that I felt it had to be told through cinema.",
      "I realised that if a story could move me that much, it could move audiences too, if told honestly, without compromising its emotional truth for commercial formula.",
      "That became the seed of Akashwadi Films, a company built not just to produce films, but to tell stories that matter, stories rooted in human emotion, culture and reality rather than just entertainment value.",
      "Since then, our focus has remained the same: to find stories that deserve to be told and give them the right platform, authenticity and respect they deserve.",
    ],
    whatThisMeans:
      "The founding moment wasn't a market gap or a business opportunity, it was a real-life incident that moved him personally, and the entire company grew from the conviction that if a story could move him, it could move an audience too, if told honestly.",
    whyItMatters:
      "\"Without compromising its emotional truth for commercial formula\" names the specific tension a production company constantly faces, and states plainly which side of that tension the company was built to protect.",
    reflect:
      "Has something you built or started come from a genuine emotional conviction, or from a calculated opportunity, and does it still feel true to that original source?",
  },
  {
    number: "05",
    title: "Let Creativity Be Fearless in Thought, Responsible in Expression, Independent in Spirit",
    quote: [
      "Creative freedom, to me, means the ability to explore ideas, emotions and perspectives honestly, without fear of judgement or unnecessary restriction. However, true creative freedom also comes with responsibility, towards the audience, towards society and towards the truth of the story itself.",
      "I believe creativity should provoke thought, not provoke hatred. It should question, but not divide. Art and storytelling have the power to influence minds, so with that power comes the duty to be sensitive and socially conscious.",
      "At the same time, I strongly oppose unnecessary censorship that stifles genuine artistic expression. The key lies in intent, if a story is being told to spread awareness, empathy or reflection, it deserves space, but if it is being told carelessly, only to provoke controversy or hurt sentiments without purpose, that is not freedom, that is irresponsibility disguised as art.",
      "So, my philosophy is simple: let creativity be fearless in thought, responsible in expression, and independent in spirit.",
    ],
    whatThisMeans:
      "He separates two things often confused in debates about creative freedom: the intent behind a work, awareness, empathy, reflection, versus carelessness aimed only at provoking controversy, treating only the first as genuine freedom worth protecting.",
    whyItMatters:
      "Holding both \"oppose unnecessary censorship\" and \"creativity should provoke thought, not provoke hatred\" at once refuses to collapse into either a purely libertarian or purely restrictive position on artistic expression.",
    reflect:
      "In your own creative or professional work, is the intent behind what you make genuinely about awareness or empathy, or has it drifted toward provocation for its own sake?",
  },
];

const principlesPart2 = [
  {
    number: "06",
    title: "Business With Dignity",
    quote: [
      "In my experience, success and ethics are not opposing forces, they actually strengthen each other in the long run. I have always believed in transparency with investors, fairness with collaborators and respect for every individual associated with a project, whether it is a lead actor or a junior technician.",
      "Yes, there are moments when deadlines, budgets and market pressures tempt shortcuts, but I try to remind myself and my team that reputation is built slowly and lost quickly.",
      "I run my business with one simple principle: business with dignity. Profit is important, every business needs it to survive and grow, but not at the cost of someone's dignity, safety or trust.",
    ],
    whatThisMeans:
      "He explicitly rejects the framing that ethics and success are opposing forces, arguing instead that fairness and transparency, especially with the people who have the least leverage, a junior technician as much as a lead actor, strengthen a business over time rather than slow it down.",
    whyItMatters:
      "\"Reputation is built slowly and lost quickly\" is offered as a practical, not just moral, reason to resist shortcuts under deadline and budget pressure, treating integrity as a long-term asset rather than a cost.",
    reflect:
      "Under your own current pressures, deadlines, budgets, or otherwise, is dignity for the people with the least leverage still holding, or has it quietly started to slip?",
  },
  {
    number: "07",
    title: "I Will Try to Make the World a Little Better Than I Found It",
    quote: [
      "I want to be remembered not just as a filmmaker or an entrepreneur, but as someone who created spaces, spaces for stories to be told, for voices to be heard, and for creativity to thrive with honesty and purpose.",
      "I would like people to say that I believed in human connection more than personal gain, and that whatever I built, whether AILF or Akashwadi Films, was rooted in authenticity, respect and purpose.",
      "If, through my work, even a few people find courage to express themselves, or a few stories reach audiences that truly deserve them, I will consider my journey meaningful.",
      "I don't think in terms of legacy as fame or recognition, I think in terms of impact, how many lives, however small the number, were touched positively because of something I created or believed in. That, to me, is success, and that is what I hope to be remembered for: that I tried, with honesty and heart, to make the world a little better than I found it.",
    ],
    whatThisMeans:
      "He explicitly separates legacy from fame or recognition, redefining it instead as impact, measured by however small a number of lives were touched positively, rather than by scale or visibility.",
    whyItMatters:
      "Wanting to be remembered for creating \"spaces\" rather than for personal output ties directly back to Principle 3's approach to AILF, built on inclusivity and giving others a platform, not on his own name being central to it.",
    reflect:
      "If you measured your own impact by lives touched rather than recognition received, would your current priorities look the same?",
  },
  {
    number: "08",
    title: "Never Drop Out of Life Just Because You Could Not Follow the First Plan",
    quote: [
      "Interestingly, one of our recent projects is literally titled Drop Out, and the irony is that it explores exactly this theme, failure, self-doubt and the courage to rediscover oneself after setbacks.",
      "In real life too, there was a phase when a major project I was developing fell apart due to financial and creative differences. It was disheartening, but instead of giving up, I used that time to research, write and restructure my approach.",
      "That failure eventually led me to create stronger, more grounded content and helped me understand the industry, and myself, much better.",
      "So, if I were to connect it symbolically, Drop Out is not just a film title, it reflects a life lesson, that sometimes you have to drop out of your comfort zone, drop out of failure's grip and start again with renewed purpose.",
      "The message to carry forward from this experience is simple: never drop out of life just because you could not follow the first plan.",
    ],
    whatThisMeans:
      "He draws a direct line between a real professional setback, a major project falling apart over financial and creative differences, and the thematic content of an actual film his company made, treating the failure as research material rather than something to simply move past.",
    whyItMatters:
      "Reframing \"drop out\" from a term of failure into \"drop out of your comfort zone, drop out of failure's grip\" repurposes the exact language of the setback into the language of recovery, rather than avoiding the word altogether.",
    reflect:
      "Is there a failed plan in your own past that you've filed away as simply a loss, rather than mined for what it could teach you, the way he did with Drop Out?",
  },
  {
    number: "09",
    title: "Technology May Shape the Future, But Culture Must Help Humanity Remain at Its Heart",
    quote: [
      "Technology, especially AI and digital platforms, has changed how stories are created, distributed and consumed. It has given more people access to tools that were once limited to big studios, and that's empowering.",
      "But I also believe that no matter how advanced technology becomes, it cannot replace human emotion, intuition or imagination, the very soul of storytelling.",
      "My approach has always been to use technology as a tool, not a replacement, for creativity. Whether it's using digital platforms to reach wider audiences for AILF, or using modern production techniques to tell stories more effectively in Akashwadi Films, I see technology as an enabler of human expression, not a substitute for it.",
      "The future will belong to those who can balance innovation with authenticity, using new tools, but keeping the human heart of storytelling alive.",
    ],
    whatThisMeans:
      "He treats the access technology provides, tools once limited to big studios now reaching more people, as a genuine benefit, while drawing a firm line around what it cannot do: replace human emotion, intuition, or imagination.",
    whyItMatters:
      "\"The future will belong to those who can balance innovation with authenticity\" applies directly to both of his own ventures, AILF and Akashwadi Films, each using modern tools in service of human storytelling rather than letting the tools define the work.",
    reflect:
      "In your own use of new tools or technology, are you using them to enable something genuinely human, or letting them start to substitute for it?",
  },
  {
    number: "10",
    title: "We Must Learn to Agree to Disagree, Not to End the Conversation, But to Reach a Constructive Outcome",
    quote: [
      "As a leader, I have faced situations where I had to challenge dominant opinions, whether it was questioning a popular market trend, taking an unconventional storytelling approach, or standing by a decision that others doubted.",
      "I believe influence without authority comes from consistency, credibility and genuine intent. When people see that your actions align with your words over time, trust builds naturally, even without formal power.",
      "I try to lead through dialogue rather than dictation, listening to different viewpoints but also having the confidence to stand by what I believe is right, even if it's not the popular choice.",
      "Sometimes, influence also means patience, waiting for the right moment to present an idea persuasively rather than forcing it. In my experience, people are more open to differing views when they feel heard and respected, not challenged or dismissed.",
      "So, in short, I believe we must learn to agree to disagree, not to end the conversation, but to reach a constructive outcome.",
    ],
    whatThisMeans:
      "He locates influence without formal authority in consistency between words and actions over time, rather than in persuasive argument alone, treating trust as something built cumulatively rather than claimed through a single convincing case.",
    whyItMatters:
      "Redefining \"agree to disagree\" as a tool to continue toward a constructive outcome, rather than a way to end a conversation, changes what the phrase is actually for, keeping dialogue open rather than using it to politely shut discussion down.",
    reflect:
      "The last time you said \"let's agree to disagree,\" was it to keep working toward something constructive together, or was it actually a way to end the conversation?",
  },
];

const principlesPart3 = [
  {
    number: "11",
    title: "You Can Control Your Effort; You Cannot Control How the World Responds",
    quote: [
      "Honestly, failure has been one of my greatest teachers. There have been projects, both in films and in AILF, that did not go as planned, financially, creatively or logistically.",
      "But every failure taught me something new: patience, better planning, humility and the importance of staying grounded.",
      "I have learnt that failure is not the opposite of success, it's part of the process toward it. The key is not to take failure personally, but to analyse it objectively, what went wrong, what could have been done differently, and what can be improved.",
      "I have also learnt to separate self-worth from outcome. You can control your effort, your intention and your integrity, but you cannot always control how the world responds. That understanding has helped me stay mentally strong and move forward without carrying unnecessary guilt or fear.",
    ],
    whatThisMeans:
      "He treats failure as data to analyse objectively, what went wrong, what could have been done differently, rather than as a verdict on his own worth, explicitly separating self-worth from outcome as two different things.",
    whyItMatters:
      "\"You can control your effort, your intention and your integrity, but you cannot always control how the world responds\" draws the actual boundary of what's within a person's power, which is a more useful standard than simply urging resilience in the abstract.",
    reflect:
      "After your last significant failure, did you analyse it objectively, or did you let it become a verdict on your own worth?",
  },
  {
    number: "12",
    title: "Leadership Is Not About Being a Boss",
    quote: [
      "To me, leadership is not about being a boss, it's about being a guide and a support system for the people around you. I try to develop young talent and emerging voices by giving them real opportunities, not just encouragement.",
      "At AILF, I ensure that new and upcoming writers get genuine platforms alongside established ones. At Akashwadi Films, I often collaborate with young technicians, writers and actors, giving them creative freedom while mentoring them through the process.",
      "I believe talent needs direction more than instruction. So, instead of telling people exactly what to do, I try to create an environment where they feel safe to experiment, make mistakes and grow from them.",
      "I also make it a point to give credit where it's due, recognition is one of the most powerful motivators for young talent. Ultimately, my goal is to build not just projects, but people, individuals who can eventually lead their own paths with confidence and integrity.",
    ],
    whatThisMeans:
      "He draws a specific line between encouragement and real opportunity, giving new writers genuine platforms alongside established ones at AILF, and collaborating directly with young technicians and actors at Akashwadi Films, rather than offering only supportive words.",
    whyItMatters:
      "\"Talent needs direction more than instruction\" is a precise distinction: instruction tells someone what to do, direction creates the conditions, safety to experiment and make mistakes, for them to find it themselves.",
    reflect:
      "In mentoring or guiding someone, are you giving them real opportunities and direction, or mostly encouragement and instruction?",
  },
  {
    number: "13",
    title: "Dignity, Integrity and Character",
    quote: [
      "Dignity, integrity and character.",
    ],
    whatThisMeans:
      "Asked for the one principle he'd want people to remember him by, he gives three words rather than an elaborated statement, each of which has already appeared as a load-bearing idea throughout his earlier answers, from \"business with dignity\" to never compromising honesty in intent.",
    whyItMatters:
      "The brevity itself is notable. After sixteen other detailed answers, choosing not to elaborate here suggests these three words already carry everything he needs them to, without further explanation.",
    reflect:
      "If you had to reduce what you want to be remembered for to three words, would they hold up as consistently across your own actions as his three do across his answers?",
  },
  {
    number: "14",
    title: "Not Taking a Risk Can Sometimes Be the Biggest Risk in Life",
    quote: [
      "Yes, starting Akashwadi Films itself was a huge risk. I didn't have the backing of a big production house or unlimited resources, I started with limited funds, a small team and a strong belief in the stories I wanted to tell.",
      "There were moments of doubt, will this film find an audience, will investors trust an independent story, will the market accept content that doesn't follow the usual commercial formula? But I decided to take that risk because I believed that authentic storytelling, even on a smaller scale, has lasting value.",
      "My philosophy has always been: not taking a risk can sometimes be the biggest risk in life. If you never try, you never know what could have been. So, I would rather fail trying something I believe in, than succeed by following a path that isn't truly mine.",
    ],
    whatThisMeans:
      "He names the specific doubts he carried when starting without a big production house behind him, whether the film would find an audience, whether investors would trust an independent story, rather than presenting the risk as something he took without hesitation.",
    whyItMatters:
      "\"I would rather fail trying something I believe in, than succeed by following a path that isn't truly mine\" sets a standard for what actually counts as success, one tied to authenticity rather than only to outcome.",
    reflect:
      "Is there a risk you've avoided taking, not because you calculated it wasn't worth it, but because not trying felt safer than trying and failing?",
  },
  {
    number: "15",
    title: "Be Flexible in Your Approach, But Firm in Your Values",
    quote: [
      "If I could leave one principle for the next generation of creators and entrepreneurs, it would be this: stay authentic, work hard, and never lose your human side.",
      "The creative and business world will constantly change, trends will shift, technology will evolve, but what will always matter is honesty in your intent and respect for the people you work with. Chase purpose more than popularity, because popularity fades, but purpose creates lasting impact.",
      "I would also tell them: don't be afraid to take risks, but take them with responsibility and integrity. Failures are not the end, they are often the beginning of something better.",
      "Lastly, be flexible in your approach, but firm in your values. The methods may change with time, but your core principles should remain unshaken.",
    ],
    whatThisMeans:
      "His advice to the next generation doesn't promise that trends or technology will stabilise. It assumes they won't, and builds the principle specifically around what should stay fixed, honesty and respect, while everything else is expected to keep shifting.",
    whyItMatters:
      "\"Chase purpose more than popularity, because popularity fades, but purpose creates lasting impact\" offers a specific, testable distinction rather than a vague call to have integrity, giving young creators something concrete to check their own choices against.",
    reflect:
      "In your own current work, are you chasing purpose or popularity, and would you be able to tell the difference if you were honest about it?",
  },
  {
    number: "16",
    title: "Gratitude Should Not Have an Expiry Date",
    quote: [
      "If I could have a conversation with my younger self, I would tell him to trust the process more and worry less about instant results. Success often takes time, and patience is as important as talent or hard work.",
      "I would also remind him that failures are not setbacks, they're stepping stones, every rejection or mistake is preparing you for something bigger.",
      "I'd tell him to value relationships more than transactions, because people remember how you made them feel, not just what you achieved. And most importantly, I'd tell him to enjoy the journey, not just chase the destination, because life is happening in these very moments of struggle and growth, not just in the achievements that come later.",
      "Lastly, I would tell him to stay humble and grounded, no matter how much success comes your way, because gratitude should not have an expiry date.",
    ],
    whatThisMeans:
      "His advice to his younger self doesn't focus on what to achieve differently, it focuses on how to hold the process itself, patience over instant results, relationships over transactions, the journey over the destination.",
    whyItMatters:
      "\"Gratitude should not have an expiry date\" is a specific warning against a common pattern, where early humility and thankfulness fade as success accumulates, treating gratitude as something that has to be actively maintained, not just felt once.",
    reflect:
      "Has your own gratitude for something you once wanted badly quietly expired now that you have it?",
  },
  {
    number: "17",
    title: "Live With Courage, Create With Conviction, Treat People With Dignity",
    quote: [
      "If there's one thing I'd want people to take away from my journey, it's this: live with courage, create with conviction, treat people with dignity, remain grounded in your values, and never stop believing in the possibility of a better tomorrow.",
    ],
    whatThisMeans:
      "His closing principle compresses the entire arc of his earlier answers, courage from Principle 1, conviction from founding Akashwadi Films on a real story, dignity as the explicit operating principle of his business, into a single closing sentence.",
    whyItMatters:
      "Ending on \"never stop believing in the possibility of a better tomorrow\" returns to the same hope that opened his answer about legacy, that his work might make the world a little better than he found it.",
    reflect:
      "Of his five closing instructions, courage, conviction, dignity, groundedness, belief in a better tomorrow, which one would you say is currently the weakest link in your own life?",
  },
];

const takeaways = [
  {
    title: "I would rather lose something while remaining true to myself.",
    body: "Short-term comfort built on compromise eventually costs more in the long run, in trust, reputation, or self-respect.",
  },
  {
    title: "A film company was not born from a business plan. It was born from a story.",
    body: "If a story could move him that much, he believed it could move audiences too, if told honestly.",
  },
  {
    title: "Business with dignity.",
    body: "Profit matters, but not at the cost of someone's dignity, safety, or trust, whether a lead actor or a junior technician.",
  },
  {
    title: "Not taking a risk can sometimes be the biggest risk in life.",
    body: "He would rather fail trying something he believes in than succeed by following a path that isn't truly his.",
  },
  {
    title: "Talent needs direction more than instruction.",
    body: "Create an environment where people feel safe to experiment and make mistakes, rather than telling them exactly what to do.",
  },
  {
    title: "Chase purpose more than popularity.",
    body: "Popularity fades. Purpose creates lasting impact. Be flexible in your approach, but firm in your values.",
  },
  {
    title: "Gratitude should not have an expiry date.",
    body: "Stay humble and grounded no matter how much success comes your way.",
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
        / Umashankar Yadav
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/yadav-portrait.jpg"
            alt="Umashankar Yadav"
            width={1254}
            height={1254}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Umashankar Yadav · Founder, Akashwadi Films · Founder, Ashirwad International
          Literature Festival (AILF)
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 023
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Umashankar <em>Yadav</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Be Flexible in Your Approach, But Firm in Your Values
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Filmmaker &amp; Entrepreneur · Founder, Akashwadi Films &amp; Ashirwad International
          Literature Festival
        </p>

        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://ailf.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            AILF Website
            <span className="sr-only"> (opens in new window)</span>
          </a>
        </div>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;A film company was not born from a business plan. It was born from a
          story.&rdquo;
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
          <p className="font-medium">14 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">17 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">September 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Filmmaking",
          "Literature Festival",
          "Creative Freedom",
          "Entrepreneurship",
          "Mentorship",
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
          &ldquo;We asked Umashankar Yadav seventeen questions. He answered from building a film
          company around a single true story, and a literature festival around the belief that
          every regional voice deserves a platform.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Umashankar Yadav is the founder of Akashwadi Films, a production company built around
          authentic, emotionally honest storytelling, and the Ashirwad International Literature
          Festival (AILF), a platform bringing together established and emerging writers,
          filmmakers, artists and thinkers across India&apos;s diverse languages and storytelling
          traditions.
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
          Seventeen principles · Stated by Umashankar Yadav
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 17</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Umashankar Yadav, stated directly
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
          &ldquo;Let creativity be fearless in thought,
          <br />
          <em>responsible in expression, independent in spirit.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Umashankar Yadav — Principle V, Stated
        </p>
      </section>

      {/* Principles 6-10 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 17</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Umashankar Yadav, stated directly
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
          &ldquo;Business with dignity.&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Umashankar Yadav — Principle VI, Stated
        </p>
      </section>

      {/* Principles 11-17 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 17</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Umashankar Yadav, stated directly
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

      {/* Pull quote 3 */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;Gratitude should not
          <br />
          <em>have an expiry date.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Umashankar Yadav — Principle XVI, Stated
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
          Post a commitment inspired by Umashankar Yadav&apos;s principles. State it publicly —
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
        <p className="text-xs uppercase tracking-wide text-neutral-400">Connect with him</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          <a
            href="https://ailf.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            AILF Website
            <span className="sr-only"> (opens in new window)</span>
          </a>
        </div>

        <p className="mt-8 text-xs uppercase tracking-wide text-neutral-400">
          Share this feature
        </p>
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
        <p className="mt-4 text-sm text-neutral-500">14 min read · 17 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
