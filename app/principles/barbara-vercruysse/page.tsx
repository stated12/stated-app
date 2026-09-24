import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "barbara-vercruysse";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Barbara Vercruysse — Kindness and Strength Were Never Opposites";
const DESCRIPTION =
  "They were always the same muscle. Seventeen principles on kindness, psychological safety, and choosing to be human, always.";
const IMAGE = "https://app.stated.in/barbara-portrait.jpg";

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
    images: [{ url: IMAGE, width: 880, height: 880, alt: "Barbara Vercruysse" }],
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
    title: "Kindness Is Not Weakness; It Is a Sign of Maturity and Strength",
    quote: [
      "Kindness has never been the opposite of strength for me. It has always been one of the clearest signs of it.",
      "Early in my career, I absorbed the belief that being taken seriously meant being tough, decisive, unemotional. I saw kindness treated as something soft, something that had to be managed carefully so it wouldn't be mistaken for weakness.",
      "Over time, I realised the opposite was true. The leaders who influenced me most were not the ones who dominated a room. They were the ones who listened without needing to prove anything, who could hold a difficult conversation with warmth instead of coldness, who made people feel safe enough to tell the truth.",
      "That is when I understood: kindness is not the absence of strength. It is what strength looks like when it has matured.",
    ],
    whatThisMeans:
      "She traces a real reversal in her own thinking, from believing early on that being taken seriously required toughness, to recognising that the leaders who influenced her most led with warmth, not dominance.",
    whyItMatters:
      "\"Kindness is what strength looks like when it has matured\" reframes kindness not as strength's opposite that needs defending, but as its most developed form, a harder standard to meet than toughness alone.",
    reflect:
      "Is there a place in your own leadership or life where you've been performing toughness because you believed kindness would be mistaken for weakness?",
  },
  {
    number: "02",
    title: "Niceness Avoids Conflict; Kindness Serves What Someone Actually Needs",
    quote: [
      "Niceness is about avoiding conflict. Kindness is about caring enough to engage with it.",
      "Being nice often means softening the truth so no one feels uncomfortable. Kindness means telling someone the truth because you respect them enough to trust them with it.",
      "I have had to give feedback that was hard to hear. Being nice would have meant staying quiet, or wrapping the message in so much padding that the point got lost. Being kind meant being honest, direct and respectful, because I genuinely wanted the person to grow, not just to feel comfortable in the moment.",
      "Kindness sometimes looks uncomfortable in the short term. Niceness almost always avoids that discomfort, and in doing so, it fails the person it claims to protect.",
    ],
    whatThisMeans:
      "She draws the distinction precisely: niceness softens or withholds truth to avoid discomfort, while kindness trusts someone enough to give them the truth directly, even when it's harder to hear in the moment.",
    whyItMatters:
      "\"In doing so, it fails the person it claims to protect\" is a direct challenge to the instinct that avoiding discomfort is the same as caring for someone. She argues the opposite: avoidance is often the less caring choice.",
    reflect:
      "The last time you softened or withheld a truth to keep things comfortable, were you being kind, or just being nice?",
  },
  {
    number: "03",
    title: "A Constant, Self-Correcting Balance Between Effectiveness and Kindness",
    quote: [
      "Balancing effectiveness with kindness is not something I solved once. It is something I keep recalibrating.",
      "There are moments when a decision needs to be made quickly, and there isn't time to consult everyone or soften every edge. In those moments, I try to stay clear and decisive, but I remain conscious of how the decision lands on people, and I make space afterwards to acknowledge the impact.",
      "There are other moments when slowing down, listening longer, and prioritising someone's wellbeing over speed is exactly what effectiveness actually requires, because a team that doesn't feel safe or respected will never perform at its best for long.",
      "So the balance isn't a fixed formula. It's a constant, honest check: am I being effective at the expense of people, or am I being kind at the expense of the mission? Neither extreme works. The real skill is noticing when you've drifted too far in either direction and correcting course.",
    ],
    whatThisMeans:
      "She refuses to offer a fixed formula for balancing effectiveness and kindness, describing instead an ongoing, honest check she runs continuously, sometimes prioritising speed and clarity, sometimes prioritising people, depending on what a given moment actually requires.",
    whyItMatters:
      "Naming both failure modes explicitly, being effective at the expense of people, and being kind at the expense of the mission, treats them as equally real risks, not just kindness as the vulnerable side that needs protecting.",
    reflect:
      "Right now, in your own work, have you drifted too far toward effectiveness at the expense of people, or too far toward kindness at the expense of the mission?",
  },
  {
    number: "04",
    title: "Genuinely Seen, Not Managed, Not Performed At",
    quote: [
      "The moments people remember most are rarely the big, formal ones. They remember the small moments when they felt genuinely seen.",
      "Someone once told me that what stayed with them was not a piece of feedback I gave in a formal review, but a short message I sent after noticing they seemed off during a meeting, just checking in, no agenda attached. That small act told them more about how much I cared than any formal recognition could have.",
      "I have learned that people can tell the difference between being managed and being genuinely cared for. They can tell when kindness is performed for optics and when it is real. And when it is real, even the smallest gesture becomes something they carry with them for a long time.",
    ],
    whatThisMeans:
      "The example she chooses, a short check-in message with no agenda attached, deliberately isn't a dramatic gesture. She uses it to illustrate that the moments people remember most are rarely the formal, visible ones.",
    whyItMatters:
      "\"People can tell the difference between being managed and being genuinely cared for\" names a distinction that's easy to blur in leadership language but instantly obvious to the person on the receiving end of it.",
    reflect:
      "Think of a moment someone made you feel genuinely seen. Was it a formal gesture, or something small and unplanned, the way she describes?",
  },
  {
    number: "05",
    title: "Psychological Safety Is What I Would Measure First",
    quote: [
      "If I could measure only one thing to understand whether an organisation was genuinely kind, I would measure psychological safety: do people feel safe enough to speak up, disagree, admit mistakes and ask for help without fear of punishment or ridicule?",
      "Kindness in an organisation is not really visible in mission statements or wellness perks. It is visible in whether someone feels safe enough to say, \"I don't know,\" or \"I made a mistake,\" or \"I disagree with this decision,\" without bracing themselves for consequences.",
      "When psychological safety is present, kindness tends to follow naturally, because people feel secure enough to extend it to each other. When it is absent, no amount of stated values will make an organisation genuinely kind.",
    ],
    whatThisMeans:
      "Asked what single measure would reveal whether an organisation was genuinely kind, she doesn't reach for satisfaction surveys or stated values. She reaches for something more specific and harder to fake: whether people feel safe admitting \"I don't know\" or \"I made a mistake.\"",
    whyItMatters:
      "\"No amount of stated values will make an organisation genuinely kind\" without psychological safety underneath them is a direct challenge to organisations that treat mission statements as evidence of culture rather than as aspirations that still need to be earned.",
    reflect:
      "In your own organisation or team, could you say \"I made a mistake\" right now without bracing yourself for consequences?",
  },
  {
    number: "06",
    title: "Avoiding a Hard Truth in the Name of Kindness Was Never Kindness at All",
    quote: [
      "There was a period when I avoided a difficult conversation with someone because I told myself I was being kind by not adding to their stress.",
      "In reality, I was avoiding my own discomfort, and by staying silent, I let a situation continue that eventually became much harder to address than if I had spoken up earlier.",
      "That experience taught me something important: avoiding a hard truth in the name of kindness is not kindness. It is often self-protection disguised as consideration for someone else. Real kindness sometimes requires the courage to have the uncomfortable conversation sooner rather than later.",
    ],
    whatThisMeans:
      "She names her own past mistake directly, avoiding a conversation and calling it kindness, before revealing what it actually was: self-protection, which she only recognised once the delay made the eventual conversation harder than it needed to be.",
    whyItMatters:
      "\"Self-protection disguised as consideration for someone else\" is an uncomfortable but precise diagnosis of a very common form of avoidance, one many people mistake for genuine care rather than recognising as fear.",
    reflect:
      "Is there a difficult conversation you're currently avoiding under the label of kindness, that might actually be self-protection?",
  },
  {
    number: "07",
    title: "A Meaningful Human Experience Is Built From Small, Unglamorous Moments",
    quote: [
      "A truly meaningful human experience is rarely built from one big gesture. It is built from a series of small, consistent moments: being listened to, being remembered, being treated with respect even when no one important is watching.",
      "I try to remember details about people, not because I have to, but because those details matter to them, and remembering them is a way of saying, \"You matter to me.\"",
      "I try to be consistent, so that people know what to expect from me regardless of my mood or how busy I am. And I try to stay present in conversations instead of already thinking about the next thing on my list.",
      "None of these things are glamorous. But together, they build the kind of trust that no single grand gesture ever could.",
    ],
    whatThisMeans:
      "She explicitly rejects the idea that meaningful human experience comes from one big gesture, building her definition instead from small, unglamorous, repeated actions: being listened to, remembered, treated with respect when no one important is watching.",
    whyItMatters:
      "\"Being treated with respect even when no one important is watching\" is a quiet but sharp test, distinguishing genuine consideration from performance aimed at an audience that happens to matter.",
    reflect:
      "Are you consistently kind and present in the small, unwitnessed moments, or does your consideration mostly show up when someone important is watching?",
  },
  {
    number: "08",
    title: "Someone Believed in Me Before There Was Any Proof to Justify It",
    quote: [
      "Early in my career, someone gave me a level of responsibility I did not feel ready for. When I hesitated, they told me, \"I already see it in you. Now it's your turn to see it too.\"",
      "That sentence changed something in me. Someone believed in my capability before I had the confidence to believe in it myself, and that belief became something I had to grow into.",
      "It taught me the power of seeing potential in people before they see it in themselves, and I try to offer that same belief to others now, especially to the people who hesitate the way I once did.",
    ],
    whatThisMeans:
      "The specific sentence she was told, \"I already see it in you. Now it's your turn to see it too,\" placed the responsibility for belief on someone else first, before she had any confidence of her own to draw on.",
    whyItMatters:
      "She names exactly who she now extends that same belief to: the people who hesitate the way she once did, treating it as a specific practice passed forward, not a general sentiment about mentorship.",
    reflect:
      "Who around you right now is hesitating the way you once did, and could you be the person who tells them what someone once told you?",
  },
  {
    number: "09",
    title: "Kindness Is the Precondition for a Well-Run Organisation, Not the Soft Add-On",
    quote: [
      "Kindness is often treated as a nice-to-have, something separate from performance, strategy or results. I believe the opposite: kindness is a precondition for a well-run organisation, not an accessory to it.",
      "People do their best work when they feel safe, respected and genuinely cared for. Fear can produce short-term compliance, but it corrodes trust, creativity and long-term performance. Kindness, on the other hand, builds the conditions where people can take risks, admit mistakes, ask for help and grow.",
      "I don't see kindness and high performance as competing priorities. I see kindness as one of the most underrated drivers of high performance.",
    ],
    whatThisMeans:
      "She refuses the common framing that positions kindness as a soft value competing against hard results, arguing instead that kindness creates the actual conditions, safety, trust, willingness to admit mistakes, that high performance depends on.",
    whyItMatters:
      "Distinguishing fear's short-term compliance from kindness's long-term trust names a trade-off many organisations make without realising it: choosing something that works immediately over something that works sustainably.",
    reflect:
      "In your own organisation, is kindness currently treated as a precondition for good performance, or as a soft extra that gets cut when things get busy?",
  },
  {
    number: "10",
    title: "Being Liked, Feared, and Respected Are Three Different Things",
    quote: [
      "Being liked, being feared and being respected are three very different things, and confusing them can lead leaders in the wrong direction.",
      "Being liked is about approval. Being feared is about control. Being respected is about trust, earned through consistency, fairness and genuine care, even when decisions are difficult.",
      "I would rather be respected than liked, because respect endures even through hard decisions, while being liked can evaporate the moment you have to say something someone doesn't want to hear. And I would rather be respected than feared, because fear only produces compliance, while respect produces genuine commitment.",
    ],
    whatThisMeans:
      "She defines all three terms precisely rather than treating them as roughly interchangeable forms of influence: liked is approval, feared is control, respected is trust earned through consistency and fairness even under difficulty.",
    whyItMatters:
      "Choosing respect over both being liked and being feared, for different specific reasons in each case, shows she's weighed the trade-offs deliberately rather than simply preferring the more flattering-sounding option.",
    reflect:
      "Honestly, which of the three, being liked, being feared, or being respected, are you currently optimising for in your own leadership or relationships?",
  },
  {
    number: "11",
    title: "A Deliberate Morning Routine Rooted in Gratitude",
    quote: [
      "My mornings are intentional. Before I check any messages, I take time for stillness, reflection and gratitude, even if it's only a few minutes. That grounding shapes the rest of my day.",
      "I try to walk into every interaction with the same question: how can I add value to this person's day, even in a small way? Sometimes that means really listening. Sometimes it means offering encouragement. Sometimes it just means being fully present instead of distracted.",
      "It isn't about grand gestures. It's about consistency, showing up the same way, with the same intention, day after day, regardless of how the day itself is going.",
    ],
    whatThisMeans:
      "She's specific about the order: stillness and gratitude come before any messages are checked, not after, a deliberate sequencing that protects the grounding before the day's demands can interrupt it.",
    whyItMatters:
      "Her daily question, \"how can I add value to this person's day, even in a small way\", operationalises kindness into something repeatable across every interaction, rather than leaving it as a general disposition she hopes shows up.",
    reflect:
      "What's the first thing you actually do each morning, and does it ground you the way you'd want, or does it immediately pull you into other people's demands?",
  },
  {
    number: "12",
    title: "Respect for a Person's Dignity Is Never Negotiable",
    quote: [
      "There are things I will never compromise on, no matter the circumstances. Honesty is one of them. Respect for a person's dignity is another.",
      "I will adapt my approach, my tone, my pace, depending on the situation. But I will not sacrifice truthfulness for convenience, and I will not treat someone as less than human, regardless of their position, their mistake, or the pressure of the moment.",
      "Those two things, honesty and dignity, are the foundation everything else is built on. If I ever had to choose between being effective in the short term and violating either of them, I would choose to stay true to them, even if it costs me something in the moment.",
    ],
    whatThisMeans:
      "She separates what she'll flexibly adapt, approach, tone, pace, from what stays fixed regardless of circumstance: honesty and a person's dignity. The distinction is deliberate, not an accident of which values happened to hold under pressure.",
    whyItMatters:
      "Stating she would accept a short-term cost rather than violate either principle makes this a tested commitment rather than an easy claim, since real non-negotiables only reveal themselves when something is actually at stake.",
    reflect:
      "What are your own genuine non-negotiables, the ones you'd hold even at a real cost, versus the ones you only think are non-negotiable until they're actually tested?",
  },
  {
    number: "13",
    title: "Boundaries Are What Keep Kindness Sustainable",
    quote: [
      "Kindness without boundaries eventually becomes self-erasure, and that helps no one, least of all the people you're trying to be kind to.",
      "I have learned to say no without guilt, to protect my energy so I have something genuine left to give, and to recognise when someone is asking for more than is fair to expect.",
      "Boundaries are not the opposite of kindness. They are what make kindness sustainable. A person who has nothing left to give cannot actually be kind to anyone, no matter how good their intentions are.",
    ],
    whatThisMeans:
      "She treats boundaries not as a limitation on kindness but as its structural requirement, arguing that kindness without them eventually collapses into self-erasure, which ultimately fails the very people it was meant to help.",
    whyItMatters:
      "\"A person who has nothing left to give cannot actually be kind to anyone, no matter how good their intentions are\" separates intention from capacity, good intentions alone don't produce kindness if there's nothing left to act on them with.",
    reflect:
      "Where in your own life has kindness without boundaries started tipping into self-erasure, leaving you with less to actually give?",
  },
  {
    number: "14",
    title: "Kindness Is Active, Not Passive",
    quote: [
      "Kindness is often mistaken for passivity, for simply being agreeable or avoiding upsetting anyone. But real kindness is active. It requires courage, honesty and sometimes real discomfort.",
      "Speaking up for someone who isn't in the room takes courage. Giving honest feedback takes courage. Holding a boundary with someone you care about takes courage. None of that is passive.",
      "I have come to see kindness as one of the most demanding things a person can practise consistently, precisely because it asks you to stay engaged and honest, even when disengaging or staying quiet would be far easier.",
    ],
    whatThisMeans:
      "She lists three concrete acts of kindness, speaking up for someone absent, giving honest feedback, holding a boundary with someone you care about, each requiring courage rather than agreeableness, to make the case that kindness is active work, not passive niceness.",
    whyItMatters:
      "Calling kindness \"one of the most demanding things a person can practise consistently\" reframes it from an easy default disposition into a discipline that requires real, ongoing effort to sustain.",
    reflect:
      "Of her three examples, speaking up for someone absent, giving honest feedback, holding a boundary with someone you care about, which one do you most often avoid because disengaging feels easier?",
  },
  {
    number: "15",
    title: "Wherever You Go, Be a Blessing There",
    quote: [
      "If I could leave the next generation with one thought, it would be this: wherever you go, be a blessing there.",
      "You don't need power, wealth or a title to make someone's day better. A genuine smile, a kind word, real attention, these things cost nothing, and they can change someone's entire day, sometimes their entire trajectory.",
      "The world doesn't need more people chasing success at any cost. It needs more people who leave every room, every conversation, every interaction a little better than they found it.",
    ],
    whatThisMeans:
      "Asked for one thought to leave the next generation, she chooses something requiring no power, wealth, or title to act on, deliberately removing every excuse someone might have for believing they're not yet positioned to practise it.",
    whyItMatters:
      "\"Leave every room, every conversation, every interaction a little better than they found it\" sets a standard measured entirely by what you leave behind for others, not by what you personally gained from being there.",
    reflect:
      "Think about the last few rooms or conversations you were part of. Did you leave them a little better than you found them?",
  },
  {
    number: "16",
    title: "Kindness and Strength Were Never Opposites",
    quote: [
      "If I could offer one final reflection, it would be this: kindness and strength were never opposites. They were always the same muscle.",
      "For most of my early career, I believed I had to choose between being effective and being kind, between being respected and being warm. It took me years to understand that the strongest leaders I ever encountered were strong precisely because they were kind, not in spite of it.",
      "Kindness takes more courage than toughness ever did. It requires you to stay open when it would be easier to close off, to stay honest when it would be easier to stay silent, and to keep caring about people even when it costs you something.",
      "That is the principle I would want to leave behind: kindness and strength were never opposites. They were always the same muscle.",
    ],
    whatThisMeans:
      "This closing principle names the exact belief she held for most of her early career, that effectiveness and kindness, respect and warmth, required choosing between them, and states plainly that it took years to understand they didn't.",
    whyItMatters:
      "\"Kindness takes more courage than toughness ever did\" inverts the assumption running underneath most leadership advice, that toughness is the harder, more demanding path, and kindness the easier, softer one.",
    reflect:
      "Where in your own life are you still operating as though kindness and strength are opposites, rather than the same muscle?",
  },
  {
    number: "17",
    title: "Choose to Be Human, Always",
    quote: [
      "Choose to be human, always. Choose to be kind, even when it isn't required of you. Choose to see the person in front of you, not just their role, their title or their usefulness to you.",
      "Every interaction is an opportunity, either to make someone feel smaller, or to make someone feel seen. I hope, in the time I have, to choose the second option as often as I possibly can.",
    ],
    whatThisMeans:
      "Her final principle collapses everything she's said across sixteen earlier answers into a single, repeated instruction: choose. Not a disposition someone either has or doesn't, but a decision made again, deliberately, in each interaction.",
    whyItMatters:
      "Framing every interaction as a binary, either making someone feel smaller or making someone feel seen, removes the possibility of a neutral encounter. In her account, there's no such thing as an interaction that doesn't move someone in one direction or the other.",
    reflect:
      "In your very next interaction today, which will it be: making the other person feel smaller, or making them feel seen?",
  },
];

const takeaways = [
  {
    title: "Kindness is what strength looks like when it has matured.",
    body: "The leaders who influence us most rarely dominate a room. They listen without needing to prove anything.",
  },
  {
    title: "Niceness avoids conflict; kindness engages with it.",
    body: "Being nice softens the truth. Being kind trusts someone enough to give it to them directly.",
  },
  {
    title: "Psychological safety is the real measure of a kind organisation.",
    body: "Whether people feel safe saying \"I don't know\" or \"I made a mistake\" matters more than any mission statement.",
  },
  {
    title: "Avoiding a hard truth in the name of kindness is often self-protection.",
    body: "Real kindness sometimes requires the courage to have the uncomfortable conversation sooner rather than later.",
  },
  {
    title: "Boundaries are what make kindness sustainable.",
    body: "A person with nothing left to give cannot actually be kind to anyone, no matter how good their intentions.",
  },
  {
    title: "Kindness is active, not passive. It takes more courage than toughness ever did.",
    body: "Speaking up for someone absent, giving honest feedback, and holding a boundary all require real courage.",
  },
  {
    title: "Kindness and strength were never opposites. They were always the same muscle.",
    body: "Choose to be human, always. Every interaction is a chance to make someone feel smaller, or to make them feel seen.",
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
        / Barbara Vercruysse
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/barbara-portrait.jpg"
            alt="Barbara Vercruysse"
            width={880}
            height={880}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Global Kindness Advocate · Quality &amp; Customer Experience Lead, BMW Gregoir ·
          President, PWI Brussels (PWN Global) · International Keynote Speaker · Bestselling
          Author, <em>The Path of Powerful Kindness</em>
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 021
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Barbara <em>Vercruysse</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Kindness and Strength Were Never Opposites
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          #1 Top 50 Global Thought Leader on Mental Health, Thinkers360 · Featured in HuffPost
          &amp; Thrive Global
        </p>

        {/* Official links */}
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://www.barbaravercruysse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            Website
            <span className="sr-only"> (opens in new window)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/barbara-vercruysse-431027113/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            LinkedIn
            <span className="sr-only"> (opens in new window)</span>
          </a>
          <a
            href="https://www.pwnglobal.net/c/pwi-brussels/content/our-local-board"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            PWI Brussels
            <span className="sr-only"> (opens in new window)</span>
          </a>
        </div>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;They were always the same muscle.&rdquo;
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
          "Kindness in Leadership",
          "Psychological Safety",
          "Author",
          "Keynote Speaker",
          "PWI Brussels",
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
        <p className="mt-4 leading-relaxed text-neutral-700">
          Barbara Vercruysse is a Global Kindness Advocate, Leadership Mentor, Business
          Consultant, Thought Leader, and International Speaker.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          An entrepreneur for over 25 years, Barbara&apos;s life took a profound turn after
          surviving stage 4 cancer at the age of 32. Since then, she has devoted herself to
          leaving a legacy of positive impact, championing the power of kindness in leadership,
          business, and beyond. Her approach merges practical strategy with deep wisdom, always
          rooted in humanity.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          In her role as Quality &amp; Customer Experience Lead for a group of BMW dealerships in
          Belgium, Barbara has helped elevate business performance, streamline processes, and
          foster a culture of continuous improvement. Under her guidance, the group consistently
          meets its sales and quality targets and has seen a significant rise in employee
          engagement and retention. She has been a trusted member of the management team for
          nearly a decade.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          Barbara currently serves as President of <em>Professional Women International (PWI)
          Brussels</em>, part of the global PWN network. Through her leadership, she drives
          initiatives to empower women professionally and promote gender-balanced leadership.
          She fosters a values-driven community grounded in respect, collaboration, courage,
          excellence, and inclusiveness.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          A mother of three and happily married for over 25 years, Barbara leads by example,
          showing that strength and kindness can coexist powerfully. Her passions include
          reading, painting, the arts, travel, and meaningful conversations. She reads at least
          50 books a year and sees lifelong learning as essential to both leadership and personal
          growth.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          Barbara&apos;s work has been featured in <em>HuffPost</em> and <em>Thrive Global</em>.
          Her weekly inspirational videos reach millions across social platforms, offering
          messages of encouragement, emotional intelligence, and conscious leadership.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          She has spoken at international platforms including Harvard University&apos;s Graduate
          School of Education on <em>The Path of Powerful Kindness</em>, Microsoft&apos;s Soft
          Skills Community (audience of 1,600+ managers), the Kindness@Work Conference, Girl Up
          Jabalpur with the UN Foundation, and the World Young Scientist Summit in Brussels on
          The Importance of Human Growth.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          Recognized globally, Barbara was ranked the #1 Top 50 Global Thought Leader on Mental
          Health by Thinkers360, the world&apos;s premier platform for top experts and
          influencers across industries. She is the author of <em>The Path of Powerful
          Kindness</em>, a book that captures her philosophy and lifelong commitment to
          compassionate leadership.
        </p>
        <blockquote className="mt-6 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Barbara Vercruysse seventeen questions. She answered from a life
          reshaped by surviving stage 4 cancer at 32, and rebuilt around one conviction: kindness
          and strength were never opposites.&rdquo;
        </blockquote>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what she stands for, stated publicly,
          in her own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-6 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Seventeen principles · Stated by Barbara Vercruysse
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What she stands for — in her own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p, idx) => (
            <div key={p.number}>
              <article className="border-t border-neutral-200 pt-10">
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
                  — Barbara Vercruysse, stated directly
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
                    &ldquo;No amount of stated values
                    <br />
                    <em>will make an organisation genuinely kind.</em>&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    Barbara Vercruysse — Principle V, Stated
                  </p>
                </div>
              )}

              {idx === 10 && (
                <div className="mt-20 border-t border-neutral-200 pt-16 text-center">
                  <p className="text-3xl font-serif leading-snug">
                    &ldquo;Boundaries are not the opposite of kindness.
                    <br />
                    <em>They are what make kindness sustainable.</em>&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    Barbara Vercruysse — Principle XIII, Stated
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
          &ldquo;Kindness and strength
          <br />
          <em>were always the same muscle.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Barbara Vercruysse — Principle XVI, Stated
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
          Post a commitment inspired by Barbara Vercruysse&apos;s principles. State it publicly —
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
        <p className="text-xs uppercase tracking-wide text-neutral-400">Connect with her</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          <a
            href="https://www.barbaravercruysse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            Website
            <span className="sr-only"> (opens in new window)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/barbara-vercruysse-431027113/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            LinkedIn
            <span className="sr-only"> (opens in new window)</span>
          </a>
          <a
            href="https://www.pwnglobal.net/c/pwi-brussels/content/our-local-board"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
          >
            PWI Brussels
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
