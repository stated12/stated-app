import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "dr-snigdhaa-majumder";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Dr. Snigdhaa Majumder — Do Not Abandon Yourself While Becoming Successful";
const DESCRIPTION =
  "Achievement means very little if, by the time you reach it, you have become someone you no longer recognize. Twenty principles on business, leadership, and staying yourself.";
const IMAGE = "https://app.stated.in/snigdhaa-portrait.jpg";

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
    images: [{ url: IMAGE, width: 870, height: 870, alt: "Dr. Snigdhaa Majumder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

// Each principle carries an optional `highlight` -- her own bolded, stated
// principle line -- rendered as a standalone callout inside the card, so the
// strongest line from every answer is visible at a glance, not just buried
// in the paragraph.
const principles = [
  {
    number: "01",
    title: "Experience Quietly Rearranges You",
    quote: [
      "The experiences that shaped me most were not the ones that went according to plan.",
      "They were the moments when I had to walk into rooms where I was not the obvious choice. The times I had to make decisions before I felt ready. The businesses I helped build. The teams I had to lead through ambiguity. The dreams that worked and the ones that broke apart in my hands.",
      "I have lived in very different worlds: large organizations, high-growth startups, boardrooms, classrooms, entrepreneurship and mentoring. Each world changed me differently.",
      "Corporate life taught me scale. Startups taught me speed. Entrepreneurship taught me loneliness. Leadership taught me that people are far more complicated than spreadsheets. Teaching taught me that influence is not about authority. And life itself taught me something no business school could:",
      "Earlier, I thought experience was something you accumulated. Today, I think experience is something that quietly rearranges you. The person who began my career and the woman writing this today may share the same name, but they do not hold the same beliefs. And perhaps that is what a meaningful life should do to us.",
    ],
    highlight: "You can lose certainty and still not lose yourself.",
    whatThisMeans:
      "She locates her own transformation not in one dramatic turning point, but across five very different worlds, corporate, startup, entrepreneurship, teaching, mentoring, each teaching her something the others couldn't.",
    whyItMatters:
      "Her distinction between accumulating experience and being rearranged by it is precise: the first assumes you stay the same person collecting more. The second admits the person doing the collecting keeps changing.",
    reflect:
      "Which of your beliefs from five years ago would the person you are today no longer hold?",
  },
  {
    number: "02",
    title: "What an Organization Says, Rewards, and Delivers Must Be the Same Thing",
    quote: [
      "I have seen strategy fail in companies full of intelligent people. I have seen organizations with extraordinary processes produce ordinary outcomes. And I have seen small teams with limited resources achieve remarkable things simply because everyone understood what mattered.",
      "Different worlds taught me that organizations do not fail only because they lack strategy. They often fail because strategy, people and reality are each having a different conversation.",
      "A strategy may be brilliant. But if the people executing it do not understand it, trust it or feel responsible for it, it remains a presentation.",
      "A culture may have beautiful values written on walls. But culture is revealed in who gets heard, who gets promoted, what gets tolerated and what happens when someone makes a mistake.",
      "So, what makes an organization genuinely effective? Clarity. Trust. Ownership. And the courage to confront reality before reality becomes expensive.",
    ],
    highlight:
      "An organization becomes powerful when what it says, what it rewards and what people experience are the same thing.",
    whatThisMeans:
      "Strategy failing isn't usually about the strategy itself, in her account, it's about strategy, people, and reality operating as three separate, disconnected conversations instead of one.",
    whyItMatters:
      "\"Culture is revealed in who gets heard, who gets promoted, what gets tolerated\" is a sharper, more checkable definition than most stated-values language, because it points at what actually happens rather than what's written on a wall.",
    reflect:
      "In your own organization, do the words on the wall, what gets rewarded, and what people actually experience day to day tell the same story?",
  },
  {
    number: "03",
    title: "Listen Beyond What People Say",
    quote: [
      "The biggest mistake organizations make is believing that customers exist to validate the organisation's ideas. They do not.",
      "Customers do not wake up thinking about our strategy, our product roadmap or our internal challenges. They wake up with their own problems, frustrations, fears and aspirations. We often listen for answers when we should be listening for meaning.",
      'A customer may say, "Your service is slow." But perhaps what they really mean is: "I feel unimportant."',
      'They may say, "Your app is complicated." But perhaps they mean: "I am anxious about making a mistake."',
      "The words are not always the problem. The experience behind the words is.",
    ],
    highlight: "Listen beyond what people say. Most of the truth lives underneath the sentence.",
    whatThisMeans:
      "Her two examples, \"your service is slow\" possibly meaning \"I feel unimportant,\" \"your app is complicated\" possibly meaning \"I am anxious about making a mistake,\" show exactly what listening for meaning instead of answers looks like in practice, not as an abstract principle.",
    whyItMatters:
      "This reframes customer complaints as translation problems, not just information problems. Fixing the literal words of a complaint can still miss the feeling underneath it entirely.",
    reflect:
      "The last time someone gave you direct feedback, did you respond to the words, or to what you sensed underneath them?",
  },
  {
    number: "04",
    title: "What Are We Not Seeing?",
    quote: [
      "Design thinking gave me permission to stop being impressed by quick answers.",
      "Earlier in my career, like many ambitious professionals, I took pride in solving problems quickly. If someone brought me a challenge, I wanted to move towards a solution. Experience taught me that speed is not intelligence when you are solving the wrong problem.",
      "I have seen organizations invest in technology when the real issue was human behavior. I have seen leaders redesign processes when the actual problem was lack of accountability. I have seen businesses ask how to acquire more customers when they should have been asking why existing customers were quietly leaving. The visible problem is often only the symptom.",
    ],
    highlight: 'Before asking, "How do we solve this?" ask, "What are we not seeing?"',
    whatThisMeans:
      "Three parallel examples, technology bought to fix human behavior, processes redesigned to fix accountability, customer acquisition chased to fix quiet churn, all point at the same failure: solving the visible symptom instead of the real problem underneath it.",
    whyItMatters:
      "\"Sometimes the problem behind the problem is not outside us. Sometimes it is us\" is the harder half of this principle. It's one thing to ask what an organization isn't seeing. It's another to ask whether the answer is you.",
    reflect:
      "What's a problem you've recently tried to move fast on, that might actually be a symptom of something you haven't looked at yet?",
  },
  {
    number: "05",
    title: "Your Own Inner Intelligence Deserves a Seat at the Table",
    quote: [
      "One of the most humbling things I have learned is that listening does not come naturally to people who are good at solving. When you have spent years making decisions, fixing problems and being rewarded for having answers, you can begin listening with an answer already forming in your mind. That is not listening. That is waiting.",
      "Real listening changed me because it forced me to give up the temporary comfort of certainty. I began to notice that the quietest person in the room sometimes understood the problem best. That frontline employees often knew what senior leaders were debating from a distance. That customers revealed things data could not.",
      "And eventually, I learned to listen to myself. That may have been the hardest lesson of all.",
      'There are times when the world around you tells you to continue, stay, accept or compromise and something inside you quietly says, "This is not right."',
      "Do not silence that voice too quickly. Data is important. Advice is useful. But your own inner intelligence also deserves a seat at the table.",
    ],
    whatThisMeans:
      "She distinguishes listening from waiting, listening with an answer already forming isn't listening at all. That distinction, learned from years of being rewarded for having answers, is what made her notice the quietest person in the room often understood the problem best.",
    whyItMatters:
      "Turning that same listening back on herself, rather than only on customers and teams, is presented as the hardest version of the lesson. The instinct to override an inner \"this is not right\" with data and advice is exactly what she's warning against.",
    reflect:
      "Is there a quiet \"this is not right\" you've been talking yourself out of lately, in favor of data or advice that sounds more defensible?",
  },
  {
    number: "06",
    title: "Move Like a Startup When Learning; Think Like an Institution When Building",
    quote: [
      "Corporates and entrepreneurs often believe they have little to learn from each other. I think that is unfortunate.",
      "Corporates can teach entrepreneurs that chaos is not the same as innovation. You cannot build everything through passion alone. At some point, scale demands systems, discipline and accountability.",
      "Entrepreneurs can teach corporates something equally valuable: not every decision deserves a committee. The entrepreneurial world taught me the power of moving before certainty arrives. Corporate life taught me the consequences of moving without considering scale. One gives you courage. The other gives you architecture. The strongest organisations need both.",
    ],
    highlight: "Move like a startup when learning. Think like an institution when building.",
    whatThisMeans:
      "Rather than picking a side in the classic corporate-versus-startup debate, she assigns each world a distinct gift, courage from the entrepreneurial instinct to move before certainty, architecture from the corporate discipline of building for scale.",
    whyItMatters:
      "\"Chaos is not the same as innovation\" cuts against a romanticized view of startup culture, just as \"not every decision deserves a committee\" cuts against an equally romanticized view of corporate process. Neither world gets to claim the moral high ground.",
    reflect:
      "In whatever you're currently building, are you borrowing courage from one world and architecture from the other, or defaulting entirely to just one?",
  },
  {
    number: "07",
    title: "Your Intention Is Not Your Impact",
    quote: [
      "The most important leadership lesson I learned could never have come from a book:",
      "You may believe you are being direct. Someone may experience you as dismissive. You may believe you are empowering someone. They may experience you as absent. You may believe everyone understands your vision because you have explained it ten times. They may still have no idea what you mean.",
      "Leadership becomes dangerous when we judge ourselves only by our intentions. The people around us live with our impact. This lesson made me more conscious of the gap between who I believed I was as a leader and what people experienced. It is an uncomfortable gap to look at.",
      "But leadership begins there. Not when you discover that you are perfect. When you discover that you are not, and remain willing to learn.",
    ],
    highlight: "Your intention is not your impact.",
    whatThisMeans:
      "Her three paired examples, direct versus dismissive, empowering versus absent, explained versus understood, all illustrate the same gap: what a leader believes they're doing and what the people around them are actually experiencing can diverge completely, even with good intentions on both counts.",
    whyItMatters:
      "She places the start of real leadership not at self-discovery of strength, but at the uncomfortable discovery of the gap between intention and impact, and the willingness to keep looking at it rather than looking away.",
    reflect:
      "Where might your intention and your actual impact on someone currently be further apart than you'd like to believe?",
  },
  {
    number: "08",
    title: "Committed to the Purpose, or Merely Attached to the Form?",
    quote: [
      'I have learned that persistence is a virtue only until ego takes over. Sometimes we call it resilience when we are actually refusing to accept reality. Sometimes we call it "giving up" when what we are really doing is freeing ourselves from an idea that no longer belongs to us. The question I ask myself is:',
      "If the purpose still matters, I adapt. If the evidence is asking me to change my assumptions, I listen. If the only reason I am continuing is because I have already invested too much, I let go. Sunk costs are not a reason to spend more of your life. I wish I had learned that earlier.",
    ],
    highlight: "Am I committed to the purpose or merely attached to the form?",
    whatThisMeans:
      "She names the exact language trick that keeps people stuck: calling stubbornness \"resilience,\" and calling a legitimate release \"giving up.\" Her test cuts through both by asking what's actually being protected, the purpose, or just the familiar shape of it.",
    whyItMatters:
      "\"Sunk costs are not a reason to spend more of your life\" applies the sunk-cost fallacy, usually discussed as a business concept, directly to personal time and identity, which is a harder and more personal application than the textbook version.",
    reflect:
      "Is there something you're currently persisting with because the purpose still matters, or only because you've already invested too much to admit otherwise?",
  },
  {
    number: "09",
    title: "Never Grow So Fast That You Become Unrecognisable to Yourself",
    quote: [
      "I have seen organisations grow faster than their culture can absorb. The numbers look impressive. Revenue rises. Teams expand. Investors celebrate. Meanwhile, something quieter begins to break. People stop speaking honestly. Customers become metrics. Leaders become exhausted. Values become inconvenient.",
      "And eventually, the organisation discovers that growth has amplified everything, including what was already broken. Sustainable growth, to me, is not growth you can report. It is growth you can survive.",
      "Leaders must protect the things that do not always appear in quarterly results: trust, judgement, culture, relationships, curiosity and the psychological safety to tell the truth.",
    ],
    highlight: "Never grow so fast that you become unrecognisable to yourself.",
    whatThisMeans:
      "Her list of what quietly breaks during ungoverned growth, honesty, customers-as-people, leader energy, values, isn't presented as a cost of growth. It's presented as evidence that growth amplifies whatever was already broken, rather than fixing it.",
    whyItMatters:
      "\"This is true for companies. And for people\" extends a growth principle usually reserved for business strategy into something personal, the same warning applies to a life expanding faster than the person living it can absorb.",
    reflect:
      "Is there an area of your own life growing fast enough right now that you're starting to become someone you don't quite recognize?",
  },
  {
    number: "10",
    title: "Build a Career, But Do Not Hand Your Identity Over to It",
    quote: [
      "I find myself telling young professionals and founders something that is not always popular: stop waiting to feel ready. You may never feel ready.",
      "Confidence is often misunderstood. We imagine confident people wake up believing they can do everything. In my experience, confidence is usually evidence collected after courage. You take the role before you feel completely prepared. You speak before your voice stops shaking. You begin before the plan is perfect. And somewhere along the way, you discover you survived.",
      "I also tell them not to build their entire identity around professional success. A career is important. But if your entire sense of worth depends on your next designation, your next salary or someone else's approval, you will never feel successful for long.",
    ],
    highlight: "Build a career. But do not hand your identity over to it.",
    whatThisMeans:
      "\"Confidence is usually evidence collected after courage\" reverses the common assumption that confidence comes first and action follows. In her account, the order runs the other way, you act before you feel ready, and confidence is what you find afterward.",
    whyItMatters:
      "Tying self-worth to the next designation or salary guarantees the feeling of success never lands permanently, because there's always a next milestone to chase. The fix isn't ambition, it's where identity is anchored.",
    reflect:
      "If your next promotion, raise, or milestone disappeared tomorrow, how much of your sense of worth would go with it?",
  },
];

const principlesPart2 = [
  {
    number: "11",
    title: "When the Future Is Unclear, Return to Who You Are",
    quote: [
      "There have been periods when I did not know what would happen next. I have learned that uncertainty becomes frightening when we believe we need the entire future to be visible before we can move.",
      "We do not. We only need enough light for the next step. When everything feels uncertain, I ask myself:",
      "What do I know to be true? What is within my control? What am I afraid of? And who do I want to be while this is happening?",
      "That last question matters most. Because uncertainty does not only test our strategy. It reveals our character.",
    ],
    highlight: "When the future is unclear, return to who you are.",
    whatThisMeans:
      "Her four-question framework moves from the practical, what's true, what's controllable, what's feared, to the one she says matters most: who do I want to be while this is happening. That's the only one of the four not about the situation at all.",
    whyItMatters:
      "\"We only need enough light for the next step\" directly answers the specific fear that makes uncertainty frightening, needing the whole future visible before moving, rather than offering generic reassurance about staying calm.",
    reflect:
      "In whatever uncertainty you're currently facing, have you been asking what will happen, or who you want to be while it's happening?",
  },
  {
    number: "12",
    title: "Know When to Work Harder, and When to Walk Away",
    quote: [
      "One lesson I wish people did not have to learn painfully is this:",
      "For a long time, I believed competence, hard work and integrity would speak for themselves. They do not always.",
      "People are complicated. Organizations are political. Relationships are not always reciprocal. Some people will appreciate what you bring. Others will only notice when you stop bringing it. This does not mean we should become cynical. But it does mean we need discernment.",
      "Do not confuse access with loyalty. Do not confuse praise with trust. Do not confuse being needed with being valued. And most importantly, do not keep proving your worth in places that have already decided not to see it.",
    ],
    highlight: "Being good at what you do does not guarantee that you will be treated fairly.",
    whatThisMeans:
      "Her three paired distinctions, access versus loyalty, praise versus trust, being needed versus being valued, each name a specific way competence gets mistaken for security. All three can be present without the fourth thing, actually being valued, ever showing up.",
    whyItMatters:
      "\"Do not keep proving your worth in places that have already decided not to see it\" names a trap that discipline and hard work alone can't escape, because the problem isn't the effort, it's the place.",
    reflect:
      "Is there a place in your own life right now where you're still proving your worth, even though it may have already decided not to see it?",
  },
  {
    number: "13",
    title: "What Is All This Success Asking Me to Become?",
    quote: [
      "There was a period in my life when I realized that achievement and fulfilment were not the same thing. That sounds obvious when written as a sentence. It is much harder to understand when you have spent years climbing. Ambitious people are trained to keep asking, \"What next?\"",
      "The next role. The next business. The next milestone. The next proof.",
      "But eventually, I began asking a different question:",
      "That question changed me. I stopped seeing success only as arrival. I began seeing it as alignment. Are my achievements and my values moving in the same direction?",
      "Is the life I am building one I want to live? Am I becoming more myself, or merely becoming more successful?",
      "Those questions have no permanent answers. I still return to them.",
    ],
    highlight: "What is all this success asking me to become?",
    whatThisMeans:
      "Her shift from seeing success as arrival to seeing it as alignment replaces a finish-line model of achievement with an ongoing check: are the things you're achieving and the values you hold actually still moving in the same direction.",
    whyItMatters:
      "\"Those questions have no permanent answers. I still return to them\" is an honest admission that this isn't a lesson she learned once and resolved, it's a question she keeps having to ask again.",
    reflect:
      "Right now, are your current achievements and your values moving in the same direction, or have they quietly started to diverge?",
  },
  {
    number: "14",
    title: "Success Is Freedom",
    quote: [
      "Earlier in my life, success looked visible.",
      'Growth. Recognition. Titles. Achievement. The ability to say, "I made it."',
      "Today, success has become quieter. Success is freedom. The freedom to choose meaningful work. The freedom to say no. The freedom to begin again. The freedom to walk away from what no longer aligns with who I am.",
      "Success is also peace, but not the kind that comes from having no ambition.",
      "I am still ambitious. I simply no longer want to sacrifice myself at the altar of ambition. Today, success means this:",
    ],
    highlight:
      "To build a life I am proud of without becoming a stranger to myself while building it.",
    whatThisMeans:
      "Her four freedoms, to choose meaningful work, to say no, to begin again, to walk away, replace the visible markers of success (titles, recognition) with the ability to act according to her own values at any given moment.",
    whyItMatters:
      "She's careful to clarify that this isn't a retreat from ambition, \"success is also peace, but not the kind that comes from having no ambition\" rejects the easy reading that her definition of success means wanting less.",
    reflect:
      "Which of her four freedoms, meaningful work, saying no, beginning again, walking away, do you currently have the least of?",
  },
  {
    number: "15",
    title: "Do Not Betray Yourself to Belong",
    quote: [
      "Every career presents moments when fitting in appears easier than standing apart. Stay silent. Accept what you know is wrong. Be less ambitious. Be less emotional. Be more convenient. Become whatever the room rewards.",
      "I have learned that external acceptance is an expensive bargain if it requires internal abandonment. There are compromises we all make in life. But there are some prices that are too high. For me, one of them is self-respect. You can rebuild a career. You can change industries. You can begin again. But if you repeatedly abandon your own values, eventually you may not recognize the person who remains.",
    ],
    highlight: "Do not betray yourself to belong.",
    whatThisMeans:
      "Her list, stay silent, be less ambitious, be less emotional, become whatever the room rewards, names the specific small concessions that add up to belonging at a cost. None of them look dramatic individually; the danger is in their repetition.",
    whyItMatters:
      "\"You can rebuild a career. You can change industries. You can begin again\" establishes what's actually recoverable, so that the one thing she names as not easily recoverable, self-respect eroded by repeated self-abandonment, stands out clearly by contrast.",
    reflect:
      "What's a small concession you've made recently to fit into a room, that you'd call a compromise rather than a betrayal, if you're honest about the difference?",
  },
];

const principlesPart3 = [
  {
    number: "16",
    title: "Five Principles for the Next Generation",
    quote: [
      "1. Do not confuse movement with progress. A busy life can still be a directionless one.",
      "2. Learn to sit with uncertainty. Not every important decision comes with enough information.",
      "3. Let people earn your trust more than once. Trust is beautiful. Blind trust is expensive.",
      "4. Become difficult to manipulate by becoming deeply aware of yourself. Know your fears, your patterns, your need for approval and your vulnerabilities.",
      "5. Keep becoming. Do not become so attached to who you were that you cannot meet who you are capable of becoming.",
    ],
    whatThisMeans:
      "Asked for five principles rather than one, she gives five distinct, standalone instructions rather than five versions of the same idea, each addressing a different failure mode: mistaking busyness for direction, needing certainty before deciding, trusting too easily, staying unaware of your own patterns, and clinging to an outdated self.",
    whyItMatters:
      "\"Become difficult to manipulate by becoming deeply aware of yourself\" reframes self-awareness as a defensive skill, not just a reflective one, knowing your own fears and need for approval is what makes you harder for others to exploit.",
    reflect:
      "Of her five, which one names a pattern you actually recognize in yourself right now, rather than one that's easy to agree with in the abstract?",
  },
  {
    number: "17",
    title: "\"I See This Differently Now\"",
    quote: [
      "I once believed that successful leaders were people who had figured themselves out. I no longer believe that. The older I get, the more I respect people who remain unfinished. People who can say, \"I was wrong.\" People who can change their mind. People who can outgrow an identity that once made them successful.",
      "I think certainty is often overrated. Certainty can make us feel safe, but it can also stop us from seeing. Today, I believe one of the most powerful sentences a leader can say is:",
      "It requires humility. And humility, in my experience, is not weakness. It is intellectual and emotional maturity.",
    ],
    highlight: "I see this differently now.",
    whatThisMeans:
      "She names the specific belief she abandoned, that successful leaders are people who've figured themselves out, and replaces it with respect for people who remain unfinished and willing to outgrow the very identity that made them successful in the first place.",
    whyItMatters:
      "Naming \"I see this differently now\" as one of the most powerful sentences a leader can say sets a concrete, sayable bar for humility, rather than leaving humility as an abstract virtue no one quite knows how to practice.",
    reflect:
      "What is a belief about your own field or work that you now see differently than you used to, and have you actually said so out loud to anyone?",
  },
  {
    number: "18",
    title: "Because of Her, I Believed I Could Begin Again",
    quote: [
      "I do not particularly want to be remembered only for the businesses I helped grow, the roles I held or the numbers attached to my career. Those things matter. But they are not what I hope remains.",
      "I would like to be remembered as someone who helped people see more of themselves. Someone who could look at a person in transition, confusion or self-doubt and remind them that their current identity was not their final identity.",
      "As a leader, teacher, mentor and entrepreneur, that has increasingly become the work I care about. Helping people think differently. Feel more courageously. Choose more consciously. And perhaps become more of who they already are.",
      "If someone years from now says:",
    ],
    highlight: '"Because of her, I believed I could begin again," I think that would be enough.',
    whatThisMeans:
      "Her hoped-for legacy isn't tied to the businesses she built or the titles she held, it's tied to a single sentence she imagines someone saying about her years from now, which is a far more specific and personal measure than most legacy answers offer.",
    whyItMatters:
      "\"Their current identity was not their final identity\" is the same idea running through Principle 16's \"keep becoming\" and Principle 1's \"experience quietly rearranges you,\" applied outward, to what she hopes to help other people see in themselves.",
    reflect:
      "If someone had to summarize what you helped them believe about themselves in one sentence, what would you want that sentence to be?",
  },
  {
    number: "19",
    title: "Do Not Abandon Yourself While Becoming Successful",
    quote: [
      "Because achievement means very little if, by the time you reach it, you have become someone you no longer recognize.",
    ],
    highlight: "Do not abandon yourself while becoming successful.",
    whatThisMeans:
      "Asked for the single principle she'd give every reader of this series, she chooses the same warning that runs through nearly every earlier answer, growth, success, ambition, identity, distilled into one sentence.",
    whyItMatters:
      "That this is the one principle she'd want every reader to carry, out of twenty answers covering strategy, listening, leadership, and legacy, tells you which thread she considers the actual throughline of everything else she's said.",
    reflect:
      "If achievement meant very little unless you still recognized yourself at the end of it, would anything about how you're currently pursuing success change?",
  },
  {
    number: "20",
    title: "Who Am I Becoming, and Is She Someone I Want to Meet?",
    quote: [
      "Perhaps the most important thing my journey has taught me is that life is not asking us to become one final, perfected version of ourselves. It is asking us to keep becoming. For a long time, I thought growth meant adding. More knowledge. More experience. More achievement. More confidence.",
      "Today, I think some of the deepest growth comes from subtraction. Removing borrowed beliefs. Letting go of identities that have expired. Outgrowing relationships, roles and ambitions that once defined us. Releasing the need to explain every decision. Forgiving ourselves for not knowing earlier what we know now.",
      "I have learned that reinvention is not always about becoming someone new. Sometimes it is simply the courageous act of returning to someone you had to leave behind in order to survive. So if there is one thing I would like this record of my journey to hold, it is this:",
      "I have not always known where I was going. I have changed my mind. I have failed. I have rebuilt. I have trusted too much. I have learned to trust differently. I have achieved things I once dreamed of, and discovered that dreams, once achieved, are not always enough.",
      "But through all of it, I have tried to remain a student of my own life. Because perhaps wisdom is not finally having all the answers. Perhaps wisdom is having the courage to keep asking:",
    ],
    highlight: "Who am I becoming, and is she someone I want to meet?",
    whatThisMeans:
      "Her closing reframes growth as subtraction as much as addition, removing borrowed beliefs, expired identities, and the need to explain every decision, rather than only accumulating more knowledge, achievement, and confidence.",
    whyItMatters:
      "\"Reinvention is not always about becoming someone new. Sometimes it is simply the courageous act of returning to someone you had to leave behind in order to survive\" closes the loop on Principle 1's claim that experience rearranges rather than accumulates, growth can mean going back, not just forward.",
    reflect:
      "Ask yourself her final question honestly: who are you becoming right now, and is she or he someone you'd actually want to meet?",
  },
];

const takeaways = [
  {
    title: "Experience rearranges you; it doesn't just accumulate.",
    body: "The person who began your career and the person you are today may share a name but not the same beliefs. That's not a flaw. It may be the point.",
  },
  {
    title: "Listen for meaning, not just answers.",
    body: "\"Your service is slow\" may really mean \"I feel unimportant.\" Most of the truth lives underneath the sentence.",
  },
  {
    title: "Your intention is not your impact.",
    body: "The people around you live with what they experience from you, not with what you meant. Leadership begins at that uncomfortable gap.",
  },
  {
    title: "Ask whether you're committed to the purpose, or just attached to the form.",
    body: "Sunk costs are not a reason to spend more of your life. Sometimes what looks like giving up is actually freedom.",
  },
  {
    title: "Never grow so fast you become unrecognisable to yourself.",
    body: "True of companies. True of people. Growth amplifies whatever was already broken, not just what was working.",
  },
  {
    title: "Build a career. Do not hand your identity over to it.",
    body: "Confidence is usually evidence collected after courage, not a feeling you wait to have before you begin.",
  },
  {
    title: "Do not abandon yourself while becoming successful.",
    body: "Achievement means very little if, by the time you reach it, you no longer recognize who you've become.",
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
        / Dr. Snigdhaa Majumder
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/snigdhaa-portrait.jpg"
            alt="Dr. Snigdhaa Majumder"
            width={870}
            height={870}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Dr. Snigdhaa Majumder · Business Strategy, Customer Experience &amp; Leadership Advisor
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 009
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Dr. Snigdhaa <em>Majumder</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Do Not Abandon Yourself While Becoming Successful
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Corporate strategy, high-growth startups, entrepreneurship, design thinking, and
          mentoring founders and emerging leaders
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;You can lose certainty and still not lose yourself.&rdquo;
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
          <p className="font-medium">20 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">20 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">August 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Business Strategy",
          "Customer Experience",
          "Design Thinking",
          "Founder Mentor",
          "Leadership",
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
          &ldquo;We asked Dr. Snigdhaa Majumder twenty questions. Twenty answers later, one
          sentence kept returning: do not abandon yourself while becoming successful.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Dr. Snigdhaa Majumder&apos;s work sits at the intersection of business strategy,
          customer experience, leadership, startups, design thinking, mentoring, branding, and
          communication. Across large organizations, high-growth startups, boardrooms,
          classrooms, and entrepreneurship, she now works closely with founders and emerging
          leaders on the thinking behind their decisions, not just the decisions themselves.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what she stands for, stated publicly,
          in her own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-10 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Twenty principles · Stated by Dr. Snigdhaa Majumder
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What she stands for — in her own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 20</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              {p.highlight && (
                <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-lg font-serif italic leading-snug text-amber-900">
                  &ldquo;{p.highlight}&rdquo;
                </p>
              )}

              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Snigdhaa Majumder, stated directly
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
          &ldquo;Your intention
          <br />
          <em>is not your impact.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Snigdhaa Majumder — Principle VII, Stated
        </p>
      </section>

      {/* Principles 11-15 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 20</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              {p.highlight && (
                <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-lg font-serif italic leading-snug text-amber-900">
                  &ldquo;{p.highlight}&rdquo;
                </p>
              )}

              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Snigdhaa Majumder, stated directly
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
          &ldquo;Never grow so fast
          <br />
          <em>that you become unrecognisable to yourself.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Snigdhaa Majumder — Principle IX, Stated
        </p>
      </section>

      {/* Principles 16-20 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 20</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              {p.highlight && (
                <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-lg font-serif italic leading-snug text-amber-900">
                  &ldquo;{p.highlight}&rdquo;
                </p>
              )}

              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Snigdhaa Majumder, stated directly
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
          &ldquo;Do not abandon yourself
          <br />
          <em>while becoming successful.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Snigdhaa Majumder — Principle XIX, Stated
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
          Post a commitment inspired by Dr. Snigdhaa Majumder&apos;s principles. State it publicly
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
        <p className="mt-4 text-sm text-neutral-500">20 min read · 20 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
