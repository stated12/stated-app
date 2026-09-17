import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "adapa-sharath-kumar-ask";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Adapa Sharath Kumar (ASK) — Build a Life That Outlives Your Designation";
const DESCRIPTION =
  "Titles are rented. Character is owned. Eighteen principles from a journey that moved from a sales bag in undivided Andhra Pradesh to the boardroom.";
const IMAGE = "https://app.stated.in/ask-portrait.jpg";

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
    images: [{ url: IMAGE, width: 570, height: 571, alt: "Adapa Sharath Kumar (ASK)" }],
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
    title: "Do Justice to Whatever Responsibility Is Placed in Your Hands",
    quote: [
      "One of the earliest leadership lessons I received came from a boss who told me something that stayed with me throughout my career: \"Whatever you do in your career, at whatever level, and however small it might be, make sure it has a huge positive impact that will be the legacy of your stint in the years to come.\"",
      "That sentence changed the way I looked at work. A young person often thinks the important assignments are the ones with visibility. I learnt the opposite. The responsibility may be small. The geography may be small. The team may be small. The designation may be junior. But the quality of your work should never be small.",
      "When I joined Bayer India Diagnostics in 1995, there were no smartphones, GPS systems, social media platforms or sophisticated online dashboards helping a salesperson navigate a territory. What I had was a product, a sales bag, relationships and the reputation I built through my own conduct.",
      "I remember travelling through places such as Adilabad and working with customers whose scale could easily have been underestimated. In one instance, I persuaded a small laboratory to invest around ₹1.5 lakh in a diagnostic instrument. I realised that I was not really selling a machine. I was helping someone improve diagnosis, serve patients better and build confidence in healthcare delivery.",
      "That experience taught me something I still believe: never judge the size of an opportunity by the size of its geography. The work in front of you deserves your best simply because it is in front of you.",
    ],
    doctrine: "Do not wait for a bigger position to demonstrate bigger responsibility.",
    whatThisMeans:
      "The lesson didn't arrive as an abstract principle, it arrived as a boss's sentence he carried for decades, and was tested immediately in a small lab in Adilabad where the machine mattered less than the patients it would eventually serve.",
    whyItMatters:
      "\"Never judge the size of an opportunity by the size of its geography\" rejects the common early-career instinct to wait for visibility before giving full effort. The standard he sets is unconditional, regardless of scale.",
    reflect:
      "Is there a task in front of you right now that you've been giving less than your best because it feels too small to matter?",
  },
  {
    number: "02",
    title: "The Higher You Rise, the Larger the Horizon of Your Responsibility",
    quote: [
      "My career moved through very different worlds. Bayer taught me trust. VIP Industries taught me reputation. Reliance Communications taught me execution. Ogilvy taught me to understand people and India. Invictus taught me culture and institution building. The Boardroom taught me stewardship. I call these my six universities. Each transition required me to become a student again.",
      "The lesson was simple: growth is not merely an increase in authority. It is an expansion of responsibility.",
      "As a young professional, I was responsible for targets. Later, I became responsible for teams. Then for businesses. Then for people, culture and institutions. Eventually, the question changed from \"What can I achieve?\" to \"What can I safeguard, strengthen and leave behind?\" That is when leadership begins to mature.",
      "The higher you rise, the less leadership becomes about yourself. And the more it becomes about the consequences of your decisions on others.",
    ],
    doctrine: "Leadership expands when responsibility expands.",
    whatThisMeans:
      "He names six genuinely different organisations as six universities, each teaching a distinct subject, trust, reputation, execution, understanding people, culture, stewardship, treating every transition as a reason to become a student again rather than simply applying what he already knew.",
    whyItMatters:
      "The shift from \"What can I achieve?\" to \"What can I safeguard, strengthen and leave behind?\" marks the exact point where he locates leadership maturity, not a specific title or years of experience, but a change in the question being asked.",
    reflect:
      "Which question are you currently asking yourself more often: what can I achieve, or what can I safeguard, strengthen and leave behind?",
  },
  {
    number: "03",
    title: "Governance Is About Protecting the Future",
    quote: [
      "For me, governance is not simply compliance. Compliance asks: \"Have we followed the rules?\" Governance asks: \"Are we protecting the institution?\" That distinction matters.",
      "A Board has a responsibility not merely to review what management has done, but to protect the organisation's future capacity to create value. That means asking uncomfortable questions. It means balancing growth with resilience. It means thinking about succession before succession becomes urgent. It means considering culture, reputation, risk, stakeholders, technology and institutional continuity.",
      "The Boardroom is therefore not simply a place of authority. It is a place of stewardship.",
    ],
    doctrine: "A Board does not merely approve today's decisions. It carries responsibility for tomorrow's consequences.",
    whatThisMeans:
      "He draws a precise line between two questions that sound similar but aren't: compliance asks whether rules were followed; governance asks whether the institution itself is being protected. The second question is harder and has no checklist.",
    whyItMatters:
      "Naming succession as something to think about \"before succession becomes urgent\" treats stewardship as a continuous discipline rather than a response triggered only once a crisis forces the question.",
    reflect:
      "In your own area of responsibility, are you asking whether the rules were followed, or whether the thing you're responsible for is actually being protected for the future?",
  },
  {
    number: "04",
    title: "The Most Important Board Question: \"What Are We Not Seeing?\"",
    quote: [
      "Experience can become dangerous when it creates certainty. The longer we work in a particular industry, the easier it becomes to believe that we understand it completely. But markets change. Consumers change. Technology changes. People change. Regulation changes. And sometimes the biggest risk is not what we know. It is what we have stopped questioning.",
      "This is why I believe one of the most important questions in a Boardroom is: \"What are we not seeing?\" It creates space for dissent. It encourages independent thought. It challenges assumptions. It protects the Board from collective overconfidence.",
      "I learnt this much earlier in business. One of my most important lessons from failure was: never fall in love with your own assumptions. A strategy can look perfect on paper and still fail on the ground. A plan can be logical and still be wrong. Experience is valuable. But experience must remain curious.",
    ],
    doctrine: "Experience should increase judgement, not decrease curiosity.",
    whatThisMeans:
      "He identifies a specific danger in expertise itself: the longer you work in an industry, the easier it becomes to believe you understand it completely, right as the industry keeps changing underneath that certainty.",
    whyItMatters:
      "\"Never fall in love with your own assumptions\" is a discipline aimed squarely at the people most likely to need it, the experienced and successful, who have the most reason to trust their own judgment and the most to lose by not questioning it.",
    reflect:
      "In the area where you have the most experience, when did you last genuinely ask what you might not be seeing, rather than trusting what you already believe you know?",
  },
  {
    number: "05",
    title: "Judge the Decision Before You Judge the Result",
    quote: [
      "Failure has probably been my greatest teacher. Projects did not always go according to plan. There were clients I could not win. Strategies that looked right on paper did not work on the ground. There were decisions I wished I had taken earlier. There were moments of self-doubt.",
      "But with time, I understood that failure is not always evidence of a bad decision. Sometimes a sound decision produces a bad outcome. Sometimes a poor decision gets lucky. Therefore, I learnt to examine the quality of the decision, not merely the result.",
      "That distinction is extremely important for leaders. If we reward only outcomes, people eventually stop taking intelligent risks. If we examine reasoning, assumptions, information, alternatives and judgement, we create better decision-makers.",
      "Failure removed a great deal of ego from my thinking. I stopped asking, \"Who is responsible?\" and started asking, \"What is this experience trying to teach me?\" Blame rarely solves problems. Learning does.",
      "But another lesson failure taught me was this: never allow a difficult chapter to convince you that the story is over. Resilience is not pretending that failure does not hurt. It is refusing to allow failure to define you. It is getting up without becoming bitter. It is learning without losing faith in yourself. It is continuing without carrying resentment.",
      "There is a sher by Jigar Moradabadi that captures this spirit with extraordinary force:",
      "\"हम को मिटा सके ये ज़माने में दम नहीं, हम से ज़माना ख़ुद है, ज़माने से हम नहीं।\" — जिगर मुरादाबादी",
      "English meaning: The world does not possess the power to erase us; we shape our relationship with the world rather than allowing the world to define us.",
      "That, for me, is resilience. Not defiance for its own sake. Not ego. But the quiet conviction that a setback can interrupt your journey without determining its destination. I have had difficult phases. I would not erase them. They introduced me to a wiser version of myself.",
      "And Faiz Ahmed Faiz expresses another dimension of resilience beautifully:",
      "\"दिल ना-उमीद तो नहीं, नाकाम ही तो है, लम्बी है ग़म की शाम, मगर शाम ही तो है।\" — फ़ैज़ अहमद फ़ैज़",
      "English meaning: The heart has not lost hope; it has only experienced failure. The evening may be long, but it is still only an evening.",
      "That is how I now look at difficult phases. They are phases. Not identities.",
    ],
    doctrine: "Failure is tuition. Wisdom is the degree.",
    whatThisMeans:
      "He separates the quality of a decision from the quality of its outcome, a sound decision can still produce a bad result, and a poor one can get lucky, which means judging leaders only by outcomes teaches them the wrong lesson entirely.",
    whyItMatters:
      "The two shers he reaches for, from Jigar Moradabadi and Faiz Ahmed Faiz, both make the same distinction in poetic form that he makes in plain language: a setback is a phase, not an identity, and difficulty is an evening, not a permanent night.",
    reflect:
      "Think of your last failure. Did you evaluate the quality of the decision that led to it, or only the outcome, the way most people default to doing?",
  },
];

const principlesPart2 = [
  {
    number: "06",
    title: "Never Navigate Tomorrow Using Yesterday's Assumptions",
    quote: [
      "Every major transition in my career required me to unlearn something. Moving from diagnostics to consumer products required a new understanding of markets. Moving to telecom required understanding scale and execution differently. Moving to advertising required understanding human behaviour. Moving to entrepreneurship required understanding culture, P&L and institutional resilience. Moving into governance required understanding stewardship.",
      "Today, artificial intelligence is again changing the landscape. The temptation is to ask, \"How do we implement AI?\" I believe Boards must increasingly ask, \"How do we prepare our people for an AI-enabled world?\"",
      "Technology is rarely the biggest challenge. Mindset is. AI can analyse. Predict. Recommend. Automate. But leadership still requires responsibility, accountability, moral judgement and human understanding.",
      "The future will not belong to people who compete against technology. It will belong to people who learn how to work intelligently with it without surrendering human judgement.",
    ],
    doctrine: "Never use yesterday's assumptions to navigate tomorrow's reality.",
    whatThisMeans:
      "He reframes the standard AI question, \"how do we implement it\", into a different and harder one, \"how do we prepare our people for it\", shifting the challenge from a technology rollout to a human readiness problem.",
    whyItMatters:
      "\"Technology is rarely the biggest challenge. Mindset is\" applies to every transition he lists, not just AI, diagnostics to consumer products, telecom, advertising, entrepreneurship, governance all required unlearning before the new skill could take hold.",
    reflect:
      "In whatever major shift you're currently navigating, are you focused on implementing the new tool, or on preparing the mindset needed to actually use it well?",
  },
  {
    number: "07",
    title: "Capital Is More Than Money",
    quote: [
      "When we discuss business capital, we often think of financial capital. But institutions are built on several forms of capital. There is financial capital. There is human capital. There is intellectual capital. There is relationship capital. There is reputational capital. And there is trust capital.",
      "A business can lose money and recover. It can lose market share and rebuild. But once trust is deeply damaged, rebuilding becomes far more difficult.",
      "My own career taught me that relationships are not networking transactions. Many opportunities that came much later in my career were born from relationships built years earlier, without expecting an immediate return.",
      "That is why I tell young professionals: do not ask only, \"What can this relationship do for me?\" Ask, \"What value can I create in this relationship?\" That is how relationship capital compounds.",
    ],
    doctrine: "The strongest capital is often the capital that does not appear on the balance sheet.",
    whatThisMeans:
      "He names trust capital as uniquely fragile among the six forms he lists, money and market share can both be lost and rebuilt, but deeply damaged trust is far harder to recover, which is why he treats it as the one worth protecting most carefully.",
    whyItMatters:
      "Building relationships years before they produced any opportunity, without expecting an immediate return, is a genuinely patient practice that runs against the instinct to network only for near-term value.",
    reflect:
      "In your own relationships, are you asking what they can do for you, or what value you can create within them, regardless of what comes back?",
  },
  {
    number: "08",
    title: "When Growth Outruns Governance, Risk Scales With Revenue",
    quote: [
      "Growth is exciting. But growth without governance can become dangerous. As businesses scale, informal systems that worked at ₹10 crore may fail at ₹100 crore. Founder-driven decisions may work in the early years but become bottlenecks later.",
      "A small team can operate on relationships. A larger institution requires systems. A founder can remember everything. An institution needs processes. That is why governance should not be treated as something that arrives after growth. Governance must evolve with growth.",
      "My own experience in building Invictus reinforced this strongly. We adopted a work-from-home model as early as 2010, long before the world was forced into remote working by the pandemic. When people asked how we could manage people without seeing them every day, my answer was: \"If leadership depends on seeing people every day, perhaps we haven't built enough trust.\" The model worked because it was supported by accountability, trust and culture.",
    ],
    doctrine: "Scale the governance before you scale the risk.",
    whatThisMeans:
      "He identifies a specific structural failure point, informal systems that worked at ₹10 crore breaking at ₹100 crore, rather than treating growth problems as vague or unpredictable. The systems need to evolve ahead of the scale, not catch up after it.",
    whyItMatters:
      "Adopting remote work in 2010, over a decade before the pandemic forced it globally, and defending it with \"if leadership depends on seeing people every day, perhaps we haven't built enough trust\", reframes a management concession as evidence of exactly the trust-based governance he's describing.",
    reflect:
      "Is there an informal system in your own work that functioned fine at a smaller scale but is now quietly becoming a bottleneck as things have grown?",
  },
  {
    number: "09",
    title: "Don't Become Indispensable. Become Replaceable.",
    quote: [
      "This may sound counterintuitive. But I believe it is one of the most important lessons for founders, CEOs and leaders. If everything depends on you, you have not built an institution. You have built dependence.",
      "The objective of leadership should be to build people capable of carrying the responsibility forward. At Invictus, I have always believed that if our people grow, the organisation grows.",
      "A leader's success is therefore not measured only by how much he or she can personally accomplish. It is measured by how much the organisation can accomplish without depending on that individual.",
      "This is especially important in family businesses and founder-led enterprises. Succession is not an event. It is preparation. Institutional continuity is not about removing the founder. It is about ensuring that the institution becomes larger than the founder.",
    ],
    doctrine: "The ultimate test of leadership is whether the institution can thrive after the leader steps away.",
    whatThisMeans:
      "He names the exact failure that indispensability actually represents: not strength, but dependence, an institution that hasn't been built yet, just a person that everything currently relies on.",
    whyItMatters:
      "Reframing succession as preparation rather than an event changes when the work is supposed to happen, continuously and in advance, not scrambled together once a departure becomes imminent.",
    reflect:
      "If you stepped away from your current role tomorrow, would what you've built continue, or would it reveal how much was actually just dependence on you?",
  },
  {
    number: "10",
    title: "Transformation Is Complete Only When Behaviour Changes",
    quote: [
      "Transformation is often discussed through technology, restructuring, new strategies or new operating models. But transformation is incomplete until behaviour changes.",
      "You can introduce a new system. You can redesign an organisation. You can publish a new vision. But if people continue behaving exactly as they did before, very little has transformed.",
      "I have seen this repeatedly across business and consulting. The deepest transformations happen when people begin to think differently, collaborate differently, make decisions differently and take ownership differently.",
      "That is why I believe transformation is fundamentally human. Technology can enable transformation. Leadership must make it real.",
    ],
    doctrine: "Transformation is not what you install. It is what people start doing differently.",
    whatThisMeans:
      "He separates the visible signals of transformation, a new system, a redesigned org chart, a published vision, from the actual test of whether it happened: whether people's behaviour changed at all underneath those signals.",
    whyItMatters:
      "\"Technology can enable transformation. Leadership must make it real\" assigns each party a distinct, non-interchangeable role. A tool can't do leadership's job, and leadership alone can't substitute for the tool.",
    reflect:
      "Think of a transformation effort you've been part of. Did people's actual day-to-day behaviour change, or just the systems and language around them?",
  },
];

const principlesPart3 = [
  {
    number: "11",
    title: "Authority Can Be Assigned. Trust Has to Be Earned.",
    quote: [
      "Leadership without trust is merely authority. A designation can give you the right to instruct people. It cannot make them believe in you.",
      "My own understanding of leadership has therefore always been closely connected to trust. I learnt it early at Bayer. I saw it reinforced across later roles. And I experienced its full meaning while building teams at Invictus.",
      "People may work for a designation. But they follow character. That is why I have always believed in authentic leadership, remaining true to your personal and professional values even when circumstances become uncomfortable.",
      "Integrity is not what you demonstrate when everyone agrees with you. Integrity is what you preserve when doing the right thing becomes inconvenient.",
    ],
    doctrine: "Authority may open the door. Character determines how long you remain welcome inside.",
    whatThisMeans:
      "He separates working for someone from following them: a designation can command the former, but only character earns the latter, and the gap between the two is where most leadership actually fails or succeeds.",
    whyItMatters:
      "Defining integrity specifically as what you preserve when the right thing becomes inconvenient, not what you display when everyone already agrees with you, sets a test that only shows up under real pressure, not in comfortable moments.",
    reflect:
      "The last time doing the right thing became inconvenient, did your integrity hold, or did convenience quietly win?",
  },
  {
    number: "12",
    title: "Culture Is the Invisible Operating System of Governance",
    quote: [
      "You can write policies. You can create committees. You can establish controls. But culture determines how people behave when nobody is watching. That makes culture a governance issue.",
      "My four I's, Inclusivity, Integrity, Innovation and Impact, are connected. Inclusivity allows different voices to enter the room. Integrity gives those voices a trustworthy foundation. Innovation allows the organisation to challenge the existing way of doing things. Impact asks whether all of this is actually creating positive change.",
      "This philosophy was shaped by experiences throughout my career, but perhaps its roots go back much further, to growing up among people from different parts of India and learning early that difference does not have to create distance.",
      "The strongest institutions are not those where everyone thinks alike. They are those where people can think differently without losing trust in one another.",
    ],
    doctrine: "Culture is what remains when policy stops speaking.",
    whatThisMeans:
      "He traces his four I's back to their actual origin, not a leadership seminar but growing up in defence postings among people from different states, languages, and backgrounds, where he learned early that difference doesn't have to create distance.",
    whyItMatters:
      "Defining the strongest institutions as places where people think differently \"without losing trust in one another\" rejects uniformity of thought as the marker of a healthy culture, replacing it with a much harder standard: real disagreement held together by real trust.",
    reflect:
      "In your own team or organisation, do people who think differently from each other still trust one another, or has disagreement quietly started eroding that trust?",
  },
  {
    number: "13",
    title: "Experience Becomes Valuable When It Becomes Useful to Others",
    quote: [
      "Over time, I began to think differently about success. At 25, success meant achieving targets. Later, it meant leading larger teams. As an entrepreneur, it meant building a sustainable business. Today, I ask a different question: \"Will my work continue to create value when I am no longer there?\"",
      "That changed my definition of success. I have increasingly believed that the world does not need only successful people. It needs useful people. People who solve problems. People who build teams. People who strengthen institutions. People who help others become better. People who leave places stronger than they found them.",
      "That is why mentoring has become important to me. Experience has little value if it ends with the person who acquired it. It becomes meaningful when it becomes useful to someone else.",
      "At this stage of my life, I think less about accumulation and more about contribution. And this is where I often return to Iqbal:",
      "\"सितारों से आगे जहाँ और भी हैं, अभी इश्क़ के इम्तिहाँ और भी हैं।\" — अल्लामा इक़बाल",
      "English meaning: Beyond the stars there are still other worlds; beyond today's achievements, there are still greater tests and possibilities.",
      "For me, that is what learning means. Every achievement should create the appetite for the next contribution.",
    ],
    doctrine: "Success builds a résumé. Legacy builds other people's futures.",
    whatThisMeans:
      "He tracks his own changing definition of success across four distinct life stages, targets, teams, a sustainable business, and finally a single question about whether his work outlasts his presence, rather than claiming he always understood success the way he does now.",
    whyItMatters:
      "\"The world does not need only successful people. It needs useful people\" makes usefulness to others the actual measure, treating experience that ends with the person who acquired it as, in his words, having little value at all.",
    reflect:
      "By his current measure, will your work continue to create value when you're no longer there to sustain it personally?",
  },
  {
    number: "14",
    title: "Become Capable Before You Become Visible",
    quote: [
      "We live in an age where visibility can arrive before capability. Social media can make someone appear successful very quickly. But visibility is not value.",
      "I tell young professionals: build substance before building a personal brand. Learn. Read. Listen. Take difficult assignments. Work with people different from you. Make mistakes. Accept feedback. Keep your word. Become dependable.",
      "My own journey was never planned as a straight path from Sales Officer to Board advisor. I simply kept taking the next responsibility seriously. Adilabad taught me not to underestimate small opportunities. Reliance taught me execution. Ogilvy taught me human behaviour. Entrepreneurship taught me resilience. Governance taught me stewardship. The Boardroom came much later. Capability came first.",
      "There is perhaps no better expression of this philosophy than Iqbal's famous lines:",
      "\"ख़ुदी को कर बुलंद इतना कि हर तक़दीर से पहले, ख़ुदा बन्दे से ख़ुद पूछे, बता तेरी रज़ा क्या है।\" — अल्लामा इक़बाल",
      "English meaning: Raise your inner self to such strength and stature that, before destiny determines your path, you have developed the character and capability to shape your own direction.",
      "For me, this is not a call to arrogance. It is a call to self-development. Become worthy. Become capable. Become dependable. And then let opportunity find you.",
    ],
    doctrine: "Don't spend your life chasing success. Spend your life becoming worthy of it.",
    whatThisMeans:
      "He identifies a specific modern inversion, visibility now often arriving before capability, and states plainly which one is real: visibility is not value, no matter how quickly social media can manufacture the appearance of success.",
    whyItMatters:
      "Listing capability came first, before the Boardroom, and giving the specific credit to each stop along the way, Adilabad, Reliance, Ogilvy, entrepreneurship, governance, treats capability as something accumulated in sequence, not claimed all at once.",
    reflect:
      "Are you currently investing more in becoming visible, or in becoming capable? Which one would still be true of you if all your visibility disappeared tomorrow?",
  },
];

const principlesPart4 = [
  {
    number: "15",
    title: "Build Institutions That Outlive Leaders",
    quote: [
      "This is perhaps the principle I value most today. When I was younger, I thought about career. Then achievement. Then entrepreneurship. Today, I think increasingly about legacy. Career is what you achieve. Legacy is what continues after you.",
      "The first international Board appointment I received came from Toronto. What made that particularly meaningful was that it did not come because I had aggressively marketed myself. It came because people had observed the work over time. That taught me something profound: legacy often arrives through the trust other people place in you.",
      "Today, my ambition is not simply to be remembered for the positions I held. I would rather be remembered for the people who became more confident because I believed in them. For organisations that became stronger. For institutions that became more resilient. For conversations that created more hope. For young professionals who found courage to take their next step. For businesses that became less dependent on individuals. For institutions that continued to create value after individual leaders moved on.",
      "That, to me, is institution building. And perhaps this is where my entire journey comes together. The Sales Officer with the sales bag. The professional learning trust. The manager learning execution. The entrepreneur learning resilience. The consultant learning transformation. The Board advisor learning stewardship. They are not separate people. They are different chapters of the same education.",
    ],
    doctrine: "Positions are temporary. Institutions should not be.",
    whatThisMeans:
      "His international Board appointment from Toronto arrived because people had observed his work over time, not because he marketed himself for it, which he treats as proof that legacy arrives through trust others place in you, not trust you claim for yourself.",
    whyItMatters:
      "Naming every version of himself, the Sales Officer, the manager, the entrepreneur, the consultant, the Board advisor, as \"different chapters of the same education\" rather than separate identities ties his entire career into one continuous act of learning rather than a series of reinventions.",
    reflect:
      "Looking at your own career so far, do the different roles you've held feel like separate identities, or chapters of the same ongoing education?",
  },
  {
    number: "16",
    title: "The Lesson I Would Give My 25-Year-Old Self",
    quote: [
      "If I could sit across the table from the 25-year-old version of myself, I would tell him: do not worry about having your entire life figured out. You don't need to know exactly where the journey will end.",
      "Take the next honest step. Learn. Keep your word. Respect people. Stay curious. Do difficult things. Don't become bitter when something doesn't work. Don't become arrogant when something does. And never confuse position with significance.",
      "There were many moments in my career when I could not have predicted what would come next. The young man travelling through villages in Andhra Pradesh with a sales bag could not have imagined that one day he would advise Boards, mentor entrepreneurs, write about governance or speak about institution building.",
      "But life has a remarkable way of connecting the dots when you keep moving. That is why I tell young professionals: don't chase success. Become valuable. If you become genuinely valuable, success has a much better chance of finding you.",
    ],
    doctrine: "Don't chase success. Become valuable.",
    whatThisMeans:
      "Rather than offering his 25-year-old self a roadmap, he offers permission to not have one, take the next honest step without needing to know where the journey ends, a lesson that only makes sense in hindsight, from someone who couldn't have predicted his own path either.",
    whyItMatters:
      "\"Never confuse position with significance\" sits alongside two matched warnings, don't become bitter when something doesn't work, don't become arrogant when something does, treating both failure and success as equally capable of distorting judgment.",
    reflect:
      "If you wrote this same letter to your own younger self, what specific instruction would matter most, given what you couldn't have known then?",
  },
  {
    number: "17",
    title: "What I Want to Leave Behind",
    quote: [
      "I do not want my life to be remembered simply as a list of designations. Sales Officer. State Head. CEO. Board Advisor. Board Member. Those are chapters. They are not the story.",
      "The story is what happened to people, organisations and institutions because I was part of them.",
      "My greatest ambition today is therefore not to become indispensable. It is to become useful. Not to accumulate authority. But to create trust. Not merely to build businesses. But to build people and institutions. Not to be remembered for occupying a Board seat. But for helping make the institution stronger while I occupied it.",
      "I want to believe that wherever I have worked, I left people a little more confident than I found them. Organisations a little stronger. Conversations a little more hopeful. And institutions a little more prepared for the future.",
    ],
    doctrine: "",
    whatThisMeans:
      "He lists his own designations, Sales Officer, State Head, CEO, Board Advisor, Board Member, only to explicitly reject them as the story, insisting the actual narrative is what happened to the people and institutions around each title, not the titles themselves.",
    whyItMatters:
      "Each of his four paired contrasts, indispensable versus useful, authority versus trust, building businesses versus building people, occupying a seat versus strengthening the institution, chooses the harder, less self-centered option every time.",
    reflect:
      "If someone summarized your career only by your list of titles, how much of the actual story would be missing?",
  },
  {
    number: "18",
    title: "Build a Life That Outlives Your Designation",
    quote: [
      "If there is one thought I would leave with the next generation, it is this: build a life that outlives your designation.",
      "One day, every title disappears. Every visiting card becomes irrelevant. Every office changes hands. Every organisation moves forward. But the way you treated people remains. The values you defended remain. The people you developed remain. The institutions you strengthened remain.",
      "That is why I believe: titles are rented. Character is owned. We are all temporary custodians of permanent values.",
      "And leadership is not ultimately about how many people worked for you. It is about how many people grew because of you. Perhaps that is the most honest measure of a life in leadership.",
      "I did not begin with a Boardroom in sight. I began by learning how to live with difference. Then I learnt how to sell. Then how to listen. Then how to lead. Then how to build. And eventually, how to govern. Every chapter gave me a lesson. Every lesson gave me a responsibility. And every responsibility made me a little better, not merely as a leader, but as a human being.",
      "If history remembers me at all, I hope it remembers that I tried to build people, strengthen institutions and leave things better than I found them. Because ultimately: success is what you achieve. Significance is what you contribute. Legacy is what continues after you. And character is what remains when everything else is gone.",
      "A final sher for the journey:",
      "\"तू शाहीं है, परवाज़ है काम तेरा, तेरे सामने आसमाँ और भी हैं।\" — अल्लामा इक़बाल",
      "English meaning: You are a falcon; your purpose is to soar. There are still many skies ahead of you.",
      "That, perhaps, is the message I would most like to leave with a young person reading these pages: do not allow your present position to define the limits of your future. There are always more skies. More learning. More responsibility. More people to serve. More institutions to strengthen. More value to create. And more of yourself still to discover.",
    ],
    doctrine: "Titles are rented. Character is owned.",
    whatThisMeans:
      "His closing principle distills every one of the previous seventeen into a single test that outlasts all of them: not how many people worked for you, but how many people grew because of you.",
    whyItMatters:
      "The three-part distinction he draws, success is what you achieve, significance is what you contribute, legacy is what continues after you, gives each word a precise, non-overlapping meaning rather than treating them as interchangeable synonyms for a good career.",
    reflect:
      "By his own three measures, achievement, contribution, and what continues after you, which one has had the least of your actual attention so far?",
  },
];

const takeaways = [
  {
    title: "Never judge the size of an opportunity by the size of its geography.",
    body: "The work in front of you deserves your best simply because it is in front of you.",
  },
  {
    title: "Authority may open the door. Character determines how long you remain welcome inside.",
    body: "A designation gives you the right to instruct people. It cannot make them believe in you.",
  },
  {
    title: "Don't become indispensable. Become replaceable.",
    body: "If everything depends on you, you have not built an institution. You have built dependence.",
  },
  {
    title: "Scale the governance before you scale the risk.",
    body: "Informal systems that worked at ₹10 crore may fail at ₹100 crore. Governance must evolve with growth, not arrive after it.",
  },
  {
    title: "Transformation is not what you install. It is what people start doing differently.",
    body: "A new system, a redesigned org chart, and a published vision mean little if behaviour underneath them stays the same.",
  },
  {
    title: "Become capable before you become visible.",
    body: "Visibility is not value. Build substance, keep your word, and become dependable before building a personal brand.",
  },
  {
    title: "Titles are rented. Character is owned.",
    body: "Leadership is not about how many people worked for you. It is about how many people grew because of you.",
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
        / Adapa Sharath Kumar (ASK)
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/ask-portrait.jpg"
            alt="Adapa Sharath Kumar (ASK)"
            width={570}
            height={571}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Adapa Sharath Kumar (ASK) · Board Advisor &amp; Board Member · Entrepreneur · Institution
          Builder
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 019
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Adapa Sharath <em>Kumar</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Build a Life That Outlives Your Designation
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          From a Sales Officer&apos;s bag in undivided Andhra Pradesh to the Boardroom · Bayer ·
          VIP Industries · Reliance Communications · Ogilvy · Invictus · &ldquo;Transforming
          Thought Leadership into Boardroom Impact&rdquo;
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Titles are rented. Character is owned.&rdquo;
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
          <p className="font-medium">18 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">18 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">September 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Board Advisory",
          "Governance",
          "Institution Building",
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
          &ldquo;From a defence child to the boardroom: a journey of learning, trust, impact and
          institution building.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Adapa Sharath Kumar, known as ASK, began his career as a young Sales Officer carrying a
          sales bag through the towns and villages of undivided Andhra Pradesh. The son of an
          Indian Air Force officer, he grew up across Mumbai, Delhi, Amla, Siliguri and Hyderabad,
          studying in Kendriya Vidyalayas, an upbringing he credits with his earliest lessons in
          inclusivity and discipline. His career since has moved through Bayer, VIP Industries,
          Reliance Communications, Ogilvy, and Invictus, before arriving at governance, mentoring,
          and Board advisory, including his first international Board appointment from Toronto.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words, including the &ldquo;ASK Doctrine&rdquo; line he closed each principle
          with himself. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-5 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Eighteen principles · Stated by Adapa Sharath Kumar
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 18</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              {p.doctrine && (
                <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-base font-serif italic leading-snug text-amber-900">
                  <span className="mr-2 not-italic text-xs font-bold uppercase tracking-wide text-amber-700">
                    ASK Doctrine
                  </span>
                  &ldquo;{p.doctrine}&rdquo;
                </p>
              )}

              <p className="mt-3 text-sm text-neutral-500">
                — Adapa Sharath Kumar, stated directly
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
          &ldquo;Never fall in love
          <br />
          <em>with your own assumptions.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Adapa Sharath Kumar — Principle IV, Stated
        </p>
      </section>

      {/* Principles 6-10 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 18</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              {p.doctrine && (
                <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-base font-serif italic leading-snug text-amber-900">
                  <span className="mr-2 not-italic text-xs font-bold uppercase tracking-wide text-amber-700">
                    ASK Doctrine
                  </span>
                  &ldquo;{p.doctrine}&rdquo;
                </p>
              )}

              <p className="mt-3 text-sm text-neutral-500">
                — Adapa Sharath Kumar, stated directly
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
          &ldquo;Don&apos;t become indispensable.
          <br />
          <em>Become replaceable.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Adapa Sharath Kumar — Principle IX, Stated
        </p>
      </section>

      {/* Principles 11-14 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 18</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              {p.doctrine && (
                <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-base font-serif italic leading-snug text-amber-900">
                  <span className="mr-2 not-italic text-xs font-bold uppercase tracking-wide text-amber-700">
                    ASK Doctrine
                  </span>
                  &ldquo;{p.doctrine}&rdquo;
                </p>
              )}

              <p className="mt-3 text-sm text-neutral-500">
                — Adapa Sharath Kumar, stated directly
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
          &ldquo;Don&apos;t spend your life chasing success.
          <br />
          <em>Spend your life becoming worthy of it.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Adapa Sharath Kumar — Principle XIV, Stated
        </p>
      </section>

      {/* Principles 15-18 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart4.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 18</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>

              {p.doctrine && (
                <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-base font-serif italic leading-snug text-amber-900">
                  <span className="mr-2 not-italic text-xs font-bold uppercase tracking-wide text-amber-700">
                    ASK Doctrine
                  </span>
                  &ldquo;{p.doctrine}&rdquo;
                </p>
              )}

              <p className="mt-3 text-sm text-neutral-500">
                — Adapa Sharath Kumar, stated directly
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
          &ldquo;Titles are rented.
          <br />
          <em>Character is owned.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Adapa Sharath Kumar — Principle XVIII, Stated
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
          Post a commitment inspired by Adapa Sharath Kumar&apos;s principles. State it publicly
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
        <p className="mt-4 text-sm text-neutral-500">18 min read · 18 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
