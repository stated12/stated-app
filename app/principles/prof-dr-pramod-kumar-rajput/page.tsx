import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "prof-dr-pramod-kumar-rajput";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Prof. Dr. Pramod Kumar Rajput — Don't Measure Your Life Only by What You Achieve, but by What You Give";
const DESCRIPTION =
  "A designation may give us authority, but only trust, empathy and integrity give us influence. Twenty-one principles from four decades in pharma leadership, education, and mentorship.";
const IMAGE = "https://app.stated.in/rajput-portrait.jpg";

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
    images: [{ url: IMAGE, width: 880, height: 880, alt: "Prof. Dr. Pramod Kumar Rajput" }],
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
    title: "Leadership Is Less About Managing Businesses and More About Understanding People",
    quote: [
      "After more than four decades in the corporate world, I realised that leadership is less about managing businesses and more about understanding people.",
      "My real lessons came from difficult decisions, failures, successes, conflicts and, most importantly, from the people I had the privilege to lead.",
      "I learned that a designation may give us authority, but only trust, empathy and integrity give us influence. Business schools can teach frameworks, but experience teaches us when to listen, when to act and when to simply stand beside our people.",
      "For me, leadership ultimately became a journey from managing performance to nurturing people, from achieving results to creating impact.",
    ],
    whatThisMeans:
      "He separates authority, which a designation confers automatically, from influence, which only trust, empathy, and integrity can earn. Business schools can teach the frameworks for the first; only lived experience teaches the second.",
    whyItMatters:
      "The shift he names, from managing performance to nurturing people, from achieving results to creating impact, isn't a rejection of results. It's an argument that results without impact on people are an incomplete version of leadership.",
    reflect:
      "In your own role, are you currently managing performance, or nurturing the people behind it? Be honest about which one gets more of your actual attention.",
  },
  {
    number: "02",
    title: "Experience Gives Us Stories; Reflection Converts Them Into Wisdom",
    quote: [
      "For me, experience is not about counting the years; it is about understanding what those years have taught you.",
      "Over four decades, I have experienced successes, setbacks, people, pressures and moments of transformation. Experience becomes wisdom when we stop merely remembering what happened and start reflecting on why it happened and what we can learn from it.",
      "Wisdom is the ability to use yesterday's lessons to make better decisions today and create better possibilities for tomorrow.",
      "Experience gives us stories; reflection converts those stories into wisdom. But true wisdom begins when we stop asking, \"What did I gain from my journey?\" and start asking, \"What can I give back because of it?\"",
    ],
    whatThisMeans:
      "He draws a precise line between accumulating years and accumulating wisdom: the first happens automatically, the second requires the deliberate, separate act of reflecting on why something happened, not just remembering that it did.",
    whyItMatters:
      "The shift from \"what did I gain\" to \"what can I give back\" is the same movement that runs through his answers on mentorship and legacy. Wisdom, in his account, isn't complete until it's shared outward.",
    reflect:
      "Think of a significant experience from your own past. Have you actually reflected on why it happened, or have you only ever remembered that it did?",
  },
  {
    number: "03",
    title: "Build Ladders for Others Who May Not Yet See Their Own Potential",
    quote: [
      "To me, the ladder represents opportunity, growth and the courage to rise beyond where we are today.",
      "But leadership is not about climbing the ladder alone; it is about creating ladders for others who may not yet see their own potential.",
      "Over the years, I have learned that a leader owes people three things: direction to know where they are going, support when the climb becomes difficult and trust to let them climb in their own way.",
      "And when someone reaches a higher rung because, as a person, you gave them an opportunity, that is not your loss; it is your greatest achievement as a leader.",
      "A true leader does not measure success by how high they have climbed, but by how many people they have helped rise, and how many ladders they leave behind for others to climb.",
    ],
    whatThisMeans:
      "Named after his own book, this principle turns a common leadership metaphor, climbing the ladder, into something with an explicit obligation attached: a leader owes the people around them direction, support, and trust, not just a good example to follow.",
    whyItMatters:
      "\"That is not your loss; it is your greatest achievement\" directly confronts the instinct to feel threatened when someone you've developed surpasses you. He reframes that moment as the actual point of the work, not a cost of it.",
    reflect:
      "When was the last time someone you helped reach a higher rung than you occupy, and did it feel like your achievement or their competition?",
  },
  {
    number: "04",
    title: "A Transformational Leader Changes Mindsets, Not Just Delivers Results",
    quote: [
      "For me, transformational leadership is deeply personal; it is about what changes in people because you have led them.",
      "A successful leader delivers results; an influential leader earns followers; but a transformational leader changes mindsets, builds confidence and creates new possibilities.",
      "Throughout my journey, I have learned that people rarely remember every target you achieved, but they remember how you made them feel about their own potential.",
      "I believe a transformational leader must have the courage to challenge the status quo, the humility to keep learning and the empathy to bring people along.",
      "Ultimately, I measure my leadership not by the success I created for myself, but by the transformation I enabled in others.",
    ],
    whatThisMeans:
      "He ranks three kinds of leadership in ascending order, successful (delivers results), influential (earns followers), transformational (changes mindsets), treating them as genuinely different achievements rather than synonyms for the same thing at different scales.",
    whyItMatters:
      "\"People rarely remember every target you achieved, but they remember how you made them feel about their own potential\" names the actual currency of transformational leadership: not the target itself, but what it did to someone's belief in themselves.",
    reflect:
      "Of the three, successful, influential, transformational, which one would the people you've led actually say you've been to them?",
  },
  {
    number: "05",
    title: "When Someone No Longer Needs Your Guidance, That Is a Sign You Have Done Your Job Well",
    quote: [
      "The real test of a leader is not what happens while you are leading, but what happens to people after they have worked with you.",
      "I believe a leader should begin measuring success through the growth of people the moment they realise that their own journey is not the final destination.",
      "In my career, some of my proudest moments have not been the positions I held or the targets I achieved, but seeing people I mentored become confident leaders in their own right and become entrepreneurs and many job creators.",
      "When someone you have guided no longer needs your guidance, that is not a loss; it is a sign that you have done your job well.",
    ],
    whatThisMeans:
      "He moves the actual test of leadership outside the time period when he was actually leading, into what happens to people afterward, when he's no longer there to take credit or observe the outcome directly.",
    whyItMatters:
      "Naming his proudest moments as people he mentored becoming entrepreneurs and job creators, rather than positions he held, locates pride in outcomes he can't fully claim credit for, only having helped make possible.",
    reflect:
      "What's a measure of your own success that only becomes visible after you're no longer directly involved?",
  },
  {
    number: "06",
    title: "A Great Mentor Builds Capability, Not Dependence",
    quote: [
      "I believe the highest form of leadership is when the person you mentored can eventually walk confidently without needing you to hold their hand.",
      "Throughout my journey, I have never wanted to create followers who depend on me; I have wanted to develop people who can think, decide and lead for themselves.",
      "A mentor's role is to provide the wisdom, confidence and perspective needed at the beginning, but gradually give the other person the freedom, while trusting them, to find their own path.",
      "When someone I have mentored becomes independent, makes decisions better than I would, or even surpasses me, I consider that one of my greatest successes.",
      "A great mentor does not build dependence; they build capability, and when your guidance becomes unnecessary, your mentorship has truly succeeded.",
    ],
    whatThisMeans:
      "He states plainly that a mentee making decisions better than he would, or surpassing him outright, counts as one of his greatest successes, not a threat to his standing as the mentor.",
    whyItMatters:
      "The paradox he names directly, that mentorship succeeds when it becomes unnecessary, is a genuinely uncomfortable standard for anyone who measures their value by being needed. He states it without softening it.",
    reflect:
      "Is there someone you mentor or guide whose growing independence you've quietly found threatening, rather than treating it as the actual goal?",
  },
];

const principlesPart2 = [
  {
    number: "07",
    title: "Influence Is Earned One Interaction at a Time",
    quote: [
      "After spending decades in corporate leadership, I have learned that the designation on your visiting card may introduce you, but it is your character that makes people remember you.",
      "I have held positions that gave me authority, but the relationships I built through trust, respect, mentoring and genuine human connection created something with a far more lasting influence.",
      "Even after the designation is gone, I have been fortunate to see people continue to reach out, seek my perspective and value the lessons we shared.",
      "That has taught me that influence is never demanded; it is earned one interaction, one commitment and one act of integrity at a time.",
      "For me, the real measure of leadership is not how many people knew my designation, but how many people still value my presence after the designation is no longer there.",
    ],
    whatThisMeans:
      "He offers his own life as the test case for this principle, people who still reach out to him after his formal titles are gone, treating that ongoing contact as the actual evidence for influence outlasting authority, not just a claim.",
    whyItMatters:
      "\"Influence is never demanded; it is earned one interaction, one commitment and one act of integrity at a time\" makes influence granular and cumulative rather than something conferred all at once by a title or achievement.",
    reflect:
      "If your current professional title disappeared tomorrow, how many of your current relationships would remain exactly as they are?",
  },
  {
    number: "08",
    title: "Put People Before Processes, Purpose Before Position",
    quote: [
      "My journey in the pharmaceutical industry was far more than a corporate career; eventually, it was a continuous school of leadership, people and responsibility.",
      "Working at the intersection of science, business and human lives taught me that every decision has consequences, and leadership therefore demands both competence and conscience.",
      "I learned to lead diverse teams, perform under pressure, navigate change and uncertainty, and balance business objectives with the responsibility we carry towards patients and society.",
      "These lessons go far beyond pharma: put people before processes, purpose before position, and responsibility before convenience.",
      "After four decades, my greatest learning is simple: leadership is not about how much business you build, but how much value, trust and positive impact you create through the business you lead. When your work ultimately touches human lives, leadership can never be only about achieving results; it must be about creating results that are worth achieving.",
    ],
    whatThisMeans:
      "Working where science, business, and human lives intersect taught him that leadership demands competence and conscience together, not competence alone. Every decision in that environment had a consequence for someone beyond the balance sheet.",
    whyItMatters:
      "\"Results that are worth achieving\" is a higher bar than simply achieving results. It asks not just whether a target was hit, but whether hitting it created value, trust, and positive impact along the way.",
    reflect:
      "In your own work, are you currently optimizing for results, or for results that are actually worth achieving?",
  },
  {
    number: "09",
    title: "Helping Others Learn Makes Your Knowledge Meaningful",
    quote: [
      "After investing a couple of decades acquiring knowledge, the greatest lesson I have learned is that yesterday's knowledge can never guarantee tomorrow's relevance.",
      "What matters today is not simply how much you know, but how curious you remain, how quickly you can unlearn and relearn and how willingly you share what you discover.",
      "In my own journey, every transition, from corporate leadership to education, mentoring and writing, has required me to become a student again.",
      "But I believe the highest level of learning is reached when your knowledge becomes useful to someone else, when you can inspire another person to learn, think and grow.",
      "For me, knowing makes you knowledgeable, learning keeps you relevant, but helping others learn makes your knowledge meaningful. That's why I keep sharing my learning in various forums, starting from students to their teachers, to professionals and so on.",
    ],
    whatThisMeans:
      "His three-part ladder, knowing makes you knowledgeable, learning keeps you relevant, helping others learn makes your knowledge meaningful, treats each stage as insufficient without the next. Knowledge that stays private, in his account, never reaches its highest use.",
    whyItMatters:
      "Requiring himself to \"become a student again\" at every transition, corporate to education, education to mentoring, mentoring to writing, means he applies the same standard of continual relearning to himself that he asks of the young professionals he mentors.",
    reflect:
      "When did you last genuinely become a student again in your own field, rather than relying on what you already knew?",
  },
  {
    number: "10",
    title: "Teaching Became One of My Greatest Teachers",
    quote: [
      "From working in the field to corporate leadership taught me how to lead people; becoming a teacher taught me how to truly understand them.",
      "In the corporate world, success was often measured by targets, performance and outcomes. In teaching, I discovered that the real outcome is what happens inside a person: the confidence they gain, the questions they begin to ask and the possibilities they start to see.",
      "Standing before students and young professionals has also made me realise that a teacher can never stop being a learner; every question challenges you to rethink what you thought you knew.",
      "It taught me to listen more deeply, communicate with greater empathy and measure success through transformation rather than achievement alone.",
      "Perhaps the greatest paradox of my journey is this: I entered teaching to share what I had learned, but teaching became one of my greatest teachers.",
    ],
    whatThisMeans:
      "He locates the real outcome of teaching not in what students produce externally, but in what happens inside them, confidence, new questions, possibilities they start to see, a measure that's harder to track than corporate targets but, in his account, more real.",
    whyItMatters:
      "The paradox he names, entering teaching to give knowledge and discovering it taught him more than he gave, undercuts the assumption that mentorship flows in only one direction from expert to student.",
    reflect:
      "In a role where you consider yourself the one with knowledge to give, what has that role actually taught you in return?",
  },
  {
    number: "11",
    title: "A Book Can Continue the Conversation Long After You Have Left the Room",
    quote: [
      "I realised that conversations can inspire a few people, but a book can continue the conversation long after you have left the room.",
      "After my corporate leadership, I felt a responsibility to capture the lessons, failures, reflections and insights that shaped my journey. Writing allowed me to move beyond mentoring individuals and create something that could reach people I may never meet personally.",
      "For me, each book is not simply a collection of ideas; it is an invitation to pause, reflect and perhaps see leadership and oneself differently.",
      "Mentoring allowed me to touch lives in the present; writing allowed my experiences to travel across time, generations and boundaries. That is why I chose to write.",
    ],
    whatThisMeans:
      "He distinguishes mentoring and writing not by which is more valuable, but by their reach across time: mentoring touches lives in the present, while writing lets the same experiences travel to people he'll never meet, in generations he won't see.",
    whyItMatters:
      "Framing each book as \"an invitation to pause, reflect\" rather than a delivery of conclusions respects the reader's own process, positioning the writer as someone opening a conversation rather than closing one with a final answer.",
    reflect:
      "Is there something you've learned that currently only reaches people through direct conversation, that might reach further if you found a way to write it down?",
  },
];

const principlesPart3 = [
  {
    number: "12",
    title: "What Do I Want to Leave Behind, Not Just What Do I Want to Achieve",
    quote: [
      "One of the biggest turning points in my life was realising that a successful career is not necessarily the same as a purposeful life.",
      "After more than four decades in corporate leadership, I reached a stage where I began asking myself a deeper question: \"What do I want to leave behind, not just what do I want to achieve?\"",
      "That question gave me the courage to move beyond the corporate world into academia, mentoring, speaking and writing.",
      "It was not about walking away from my past; it was about giving everything I had learned a larger purpose by sharing it with others.",
      "My journey taught me that changing direction is not abandoning your path; eventually, it is having the courage to choose a path that is more aligned with who you have become and the legacy I want to leave behind.",
    ],
    whatThisMeans:
      "The turning point wasn't a crisis or a failure, it was a single question that separated a successful career from a purposeful life, two things he explicitly says are not automatically the same.",
    whyItMatters:
      "\"It was not about walking away from my past\" is an important distinction. He frames his transition into academia and writing as an extension and larger purpose for his corporate experience, not a rejection of it.",
    reflect:
      "If you asked yourself his question honestly right now, what do you want to leave behind, not just what do you want to achieve, would the answer change anything about your current direction?",
  },
  {
    number: "13",
    title: "The Greatest Success Is Reaching the Destination Without Losing Yourself",
    quote: [
      "I learned the hardest lesson about success not when I achieved something, but when I realised that every achievement comes with a price, and sometimes we understand that price only much later.",
      "Over my journey, I experienced the recognition, responsibilities and expectations that come with professional success. But I also learned that the pursuit of success can quietly consume time, relationships, personal space and moments that can never be recovered.",
      "Success taught me that achieving more is not always the same as living better.",
      "Today, I see success differently: it is not only about what one can accomplish, but whether one can remain fulfilled, grounded and connected to the people who matter while accomplishing it.",
      "The greatest success, I believe, is reaching the destination without losing yourself, or the people and values that made the journey worthwhile.",
    ],
    whatThisMeans:
      "He's specific about what success quietly costs, time, relationships, personal space, moments that can never be recovered, rather than leaving the cost of ambition as a vague warning. These are named, recoverable-or-not categories.",
    whyItMatters:
      "\"Achieving more is not always the same as living better\" separates two things usually treated as automatically linked. The lesson only became visible in hindsight, which is why he frames it as something learned only much later.",
    reflect:
      "Of the things success can quietly consume, time, relationships, personal space, irrecoverable moments, which one is your own current pursuit costing you right now?",
  },
  {
    number: "14",
    title: "Failure Is Rarely a Full Stop; It Is Feedback",
    quote: [
      "Some of the most important lessons of my journey did not come from the moments when everything went right; they came from the moments when I had to look in the mirror and accept that I could have done better.",
      "I learned that failure is rarely a full stop; actually, it is feedback, provided we have the humility to listen to it.",
      "Those difficult experiences taught me to become less judgmental, be more patient and far more empathetic towards people who were struggling or making mistakes.",
      "As I moved from corporate leadership into teaching and mentoring, I carried that lesson with me: people do not need a leader who has never failed; they need one who has learned from failure and gives them the courage to rise again.",
      "It is true that success may give us confidence, but failure gives a clear perspective, and perspective is what ultimately makes us a wiser leader.",
    ],
    whatThisMeans:
      "He treats failure as data rather than verdict, feedback that requires humility to actually hear, not simply survive. The lessons he names, becoming less judgmental, more patient, more empathetic, all came from having to look in the mirror rather than at someone else.",
    whyItMatters:
      "\"People do not need a leader who has never failed; they need one who has learned from failure\" reframes what makes a leader credible to the people struggling under them. Perfection isn't the qualification; recovery is.",
    reflect:
      "Think of your most instructive failure. Did you actually listen to what it was telling you, or did you just survive it and move on?",
  },
  {
    number: "15",
    title: "Your Attitude and Your Ability to Work With People Will Determine How Far You Travel",
    quote: [
      "The biggest challenge I see today is not a lack of talent; it is a gap between being qualified to do a job and being prepared to lead people.",
      "After interacting with Gen Z, students, young professionals and emerging leaders, I have seen that their technical competence can make them excellent at their work, but it does not automatically make them effective leaders.",
      "Leadership requires self-awareness, emotional intelligence, communication, resilience, adaptability and, above all, the ability to bring out the best in others.",
      "I often tell young professionals: your qualification may open the door and your expertise may get you noticed, but your attitude and your ability to work with people will determine how far you travel.",
      "My responsibility as a mentor is not simply to prepare young people for the jobs of today, or start-ups to have fabulous growth or leaders to lead, but to develop their mindset, build towards a strong character enabled with true values for the future and the courage they need to lead the world of tomorrow.",
    ],
    whatThisMeans:
      "He identifies the actual gap in young professionals as not a lack of talent but a gap between being qualified for a job and being prepared to lead people, two different kinds of readiness that technical competence alone doesn't bridge.",
    whyItMatters:
      "Defining his responsibility as a mentor beyond preparing people \"for the jobs of today\" toward developing mindset, character, and values for a future he can't fully predict is a longer-horizon commitment than most mentorship offers.",
    reflect:
      "In your own development, are you currently investing more in your technical qualifications, or in the self-awareness and people skills that determine how far those qualifications actually take you?",
  },
  {
    number: "16",
    title: "Corporate Leadership Taught Me to Manage Responsibility; Entrepreneurship Taught Me to Own It",
    quote: [
      "Corporate leadership taught me how to build within a system; entrepreneurship taught me that I had to build the system itself.",
      "After my corporate experience, moving into entrepreneurship and mentoring changed my thinking from \"How do we achieve the organisation's goals?\" to \"What problem can I solve, what value can I create, and whose life can I make better?\"",
      "I also discovered that entrepreneurship demands a different kind of courage; you have greater freedom, but you also carry greater personal responsibility for every decision.",
      "Mentoring entrepreneurs has further reinforced my belief that experience becomes truly valuable when it is converted into insight, and insight into action, with a vision and a mission for self, for your employees, for society and also towards the country.",
      "Corporate leadership taught me to manage responsibility; entrepreneurship taught me to own it, and mentoring taught me that the greatest value I can create is helping others build something that may outlast me.",
    ],
    whatThisMeans:
      "He traces a specific shift in the question he asked himself, from \"how do we achieve the organisation's goals\" to \"what problem can I solve, what value can I create, whose life can I make better,\" as the actual mechanism of moving from corporate leadership into entrepreneurship.",
    whyItMatters:
      "\"The greatest value I can create is helping others build something that may outlast me\" closes the loop between his corporate, entrepreneurial, and mentoring chapters, each one, in his account, building toward something bigger than his own tenure in it.",
    reflect:
      "If you reframed your current work using his question, not how do we achieve the goals, but what problem can I solve and whose life can I make better, would it change how you approach it?",
  },
];

const principlesPart4 = [
  {
    number: "17",
    title: "Your Attitude Decides the Altitude",
    quote: [
      "After a couple of decades of leading people, I can say with conviction: talent may get you noticed, qualifications may get you selected and experience may earn you credibility; but attitude determines how far you ultimately go. That's why the old saying goes: \"Your Attitude decides The Altitude.\"",
      "I have seen equally talented and experienced people take very different paths simply because of how they responded to challenges, change, failure and opportunity.",
      "That realisation became the foundation of my book \"Attitude Matters\", because attitude is not a soft quality; it is a powerful force that shapes how we think, learn, respond and lead.",
      "For me, the right attitude means staying curious when you think you know enough, staying humble when you succeed, and staying resilient when things don't go your way.",
      "If one wishes to understand why attitude can become the difference between potential and performance, between success and significance, I believe \"Attitude Matters\" is a book worth reading, not because I wrote it, but because life taught me every lesson in it.",
      "(However, with the best wishes of all my readers, this book, \"Attitude Matters\", which is my 3rd book, has also attained bestseller status on Amazon India.)",
    ],
    whatThisMeans:
      "He ranks talent, qualifications, experience, and attitude by what each actually secures, noticed, selected, credible, and finally how far you go, arguing that the first three get you into the room while only the fourth determines what happens once you're in it.",
    whyItMatters:
      "His three-part definition of the right attitude, curious when you think you know enough, humble when you succeed, resilient when things don't go your way, targets exactly the moments when attitude is hardest to maintain, not the easy ones.",
    reflect:
      "Of his three tests, staying curious past the point you feel you know enough, staying humble in success, staying resilient in setback, which one do you find hardest to hold onto?",
  },
  {
    number: "18",
    title: "Positions Define My Role; Values Define Who I Am",
    quote: [
      "I have learned that opportunities come and go, but once you compromise your values, you can never negotiate your way back to the person you were.",
      "For me, the two non-negotiables are integrity and respect for people.",
      "Integrity means doing the right thing even when nobody is watching, and especially when doing the right thing comes at a cost, which includes your growth as well.",
      "Respect means never allowing position, pressure, or ambition to diminish another person's dignity.",
      "I would rather lose an opportunity than lose my integrity, and I would rather walk away from success than achieve it at the cost of another person's dignity. Because positions may define my role, but values define who I am.",
    ],
    whatThisMeans:
      "He names exactly two non-negotiables, integrity and respect for people, rather than a longer list that would dilute the weight of each one. Both are defined precisely enough to actually test against: integrity even when it costs your own growth, respect even under pressure or ambition.",
    whyItMatters:
      "\"You can never negotiate your way back to the person you were\" treats a compromised value as a one-way door, not a temporary lapse that can be corrected later. That's a harder, more serious framing than most people apply to small compromises.",
    reflect:
      "Is there a small compromise you've made recently that you've been telling yourself you can undo later? What would it mean if that door only opens one way?",
  },
  {
    number: "19",
    title: "Because of Something I Learned From Him, I Became a Better Version of Myself",
    quote: [
      "When I think about legacy, I don't think about what will be written after my name; I think about what will remain in the hearts and minds of the people whose lives I have touched.",
      "I know that this recognition on various platforms will fade slowly, awards will gather dust, titles will eventually disappear and even books will become pages of history; but the confidence we give someone, the perspective we share, or the life we help transform can continue far beyond us.",
      "After four decades of corporate leadership and my journey through academia, mentoring, speaking and writing, this has become increasingly important to me.",
      "I would like people to carry forward the courage to believe in themselves, the humility to keep learning, the integrity to do what is right and the willingness to help someone else rise.",
      "If, years from now, someone near or far in this beautiful world will say, \"Because of something I learned from him, I became a better version of myself,\" that, to me, would be the legacy worth leaving behind.",
    ],
    whatThisMeans:
      "He lists exactly what he expects to fade, recognition, awards, titles, books, becoming pages of history, before naming what he believes actually continues: confidence given, perspective shared, a life helped to transform. The contrast is deliberate.",
    whyItMatters:
      "The specific sentence he hopes someone says someday, \"because of something I learned from him, I became a better version of myself,\" is a concrete, checkable measure of legacy, not an abstract wish for being remembered well.",
    reflect:
      "If someone had to complete the sentence \"because of something I learned from you, I became...\" about their own experience of you, how would they finish it?",
  },
  {
    number: "20",
    title: "Build a Life You Will Be Proud to Remember",
    quote: [
      "If I could meet the young Pramod who was just beginning his journey four decades ago, I would not begin by giving him advice. I would simply tell him, \"You have no idea how much life is going to teach you; hence, enjoy this journey; you will never get these years back.\"",
      "I would tell him to work hard, but not so hard that he forgets to live; to chase excellence. However, some people will become lessons, some will become lifelong relationships and some will simply pass through; but never chase a title at the cost of his values or relationships, because every person will shape your journey in some way.",
      "I would also tell him not to fear failure, rejection or changing direction. One day, he will understand that the moments that hurt him most often prepared him for the moments that mattered most.",
      "I would tell him that there will be days when he will question himself, moments when people will disappoint him and times when success will demand sacrifices he never anticipated. Don't let those moments harden your heart.",
      "I would tell him to keep learning, stay humble, forgive quickly, love his family deeply, and never postpone the things that truly matter while chasing the things that merely look important.",
      "And finally, I would hold his hand and say: \"You will spend years trying to build a successful life. One day, you will understand that the real success is the people who stood beside you, starting from your parents, your wife, your gurus, mentors, peers, team members, seniors, and including all the people who helped raising you and rising you and the person you became along the way. So don't just build a career, Pramod; build a life you will be proud to remember.\"",
    ],
    whatThisMeans:
      "Rather than giving his younger self a list of career advice, his first instinct is to tell him to enjoy years he'll never get back. Every piece of guidance that follows, work hard but don't forget to live, don't chase titles at the cost of relationships, is built around that same warning against trading the present for an imagined future.",
    whyItMatters:
      "Naming his parents, wife, gurus, mentors, peers, team members, and seniors together as \"the real success\" reframes four decades of achievement as something that was never actually a solo undertaking, even though career narratives usually get told that way.",
    reflect:
      "If you wrote a letter to your own younger self today, would the first line be advice, or would it be his instruction to simply enjoy years you'll never get back?",
  },
  {
    number: "21",
    title: "Don't Measure Your Life Only by What You Achieve, but by What You Give",
    quote: [
      "If there is one principle I have lived by through my journey, it is this: don't measure your life only by what you achieve, but by what you give.",
      "My journey has taught me that knowledge becomes meaningful when shared; success becomes meaningful when it lifts others; and experience becomes meaningful when it helps someone else grow.",
      "Titles fade, achievements become memories, but the lives we touch and the difference we make can outlive us. For me, that is the true measure of a life well lived.",
    ],
    whatThisMeans:
      "Given the chance to add one final, unprompted principle, he returns to the same throughline that runs through nearly every earlier answer: knowledge, success, and experience only become meaningful once they're given away, not simply accumulated.",
    whyItMatters:
      "That this closing principle repeats, almost word for word, the logic of his answers on wisdom, legacy, and mentorship confirms it isn't a new idea added for effect. It's the actual foundation the other twenty answers were built on.",
    reflect:
      "By his measure, don't measure your life only by what you achieve but by what you give, how would you currently score, and is that the measure you've actually been using?",
  },
];

const takeaways = [
  {
    title: "A designation gives authority; only trust, empathy and integrity give influence.",
    body: "Business schools teach the frameworks. Experience teaches when to listen, when to act, and when to simply stand beside your people.",
  },
  {
    title: "Build ladders for others who may not yet see their own potential.",
    body: "A leader owes people direction, support, and trust. Someone rising past you isn't your loss, it's your greatest achievement.",
  },
  {
    title: "A great mentor builds capability, not dependence.",
    body: "When your guidance becomes unnecessary, your mentorship has truly succeeded.",
  },
  {
    title: "Success taught confidence; failure gave perspective.",
    body: "Failure is rarely a full stop. It is feedback, provided you have the humility to listen to it.",
  },
  {
    title: "Your attitude decides the altitude.",
    body: "Talent gets you noticed, qualifications get you selected, experience earns credibility. Attitude determines how far you go.",
  },
  {
    title: "Positions define your role; values define who you are.",
    body: "Once you compromise your values, you can never negotiate your way back to the person you were.",
  },
  {
    title: "Don't measure your life only by what you achieve, but by what you give.",
    body: "Knowledge becomes meaningful when shared. Titles fade, but the lives you touch can outlive you.",
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
        / Prof. Dr. Pramod Kumar Rajput
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/rajput-portrait.jpg"
            alt="Prof. Dr. Pramod Kumar Rajput"
            width={880}
            height={880}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Prof. Dr. P K Rajput, MBA, PhD, FIASST, FIAECT, FGCPR (USA), MLE
          <sup className="text-[0.6em]">SM</sup> · Former Sr. Vice President, Cadila Pharma Ltd.
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 017
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Prof. Dr. Pramod Kumar <em>Rajput</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Don&apos;t Measure Your Life Only by What You Achieve, but by What You Give
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Director of the Board, CliMed Research Solutions, India · Chairman, Board of Studies,
          Scinova International Frontier Research, UK · Five-Time World Record Holder · Amazon
          Bestselling Author ·{" "}
          <a
            href="https://www.linkedin.com/in/pkrajput99"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-900"
          >
            LinkedIn
            <span className="sr-only"> (opens in new window)</span>
          </a>
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;A designation may give us authority, but only trust, empathy and integrity give
          us influence.&rdquo;
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
          "Pharma Leadership",
          "Mentorship",
          "Author",
          "Entrepreneurship",
          "Academia",
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
          &ldquo;We asked Prof. Dr. Pramod Kumar Rajput twenty questions, and one final thought.
          He answered from four decades that moved from corporate pharma leadership into
          academia, mentoring, and writing.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Prof. Dr. Pramod Kumar Rajput served as Former Senior Vice President at Cadila Pharma
          Ltd., Ahmedabad, and is currently Director of the Board at CliMed Research Solutions,
          India, and Chairman of the Board of Studies at Scinova International Frontier Research,
          UK. He is a five-time World Record holder, an Amazon bestselling author of three books
          including <em>Attitude Matters</em>, and a Life Member of Leadership Excellence Harvard
          Square, Cambridge, Massachusetts.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-6 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Twenty-one principles · Stated by Prof. Dr. Pramod Kumar Rajput
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
                — Prof. Dr. Pramod Kumar Rajput, stated directly
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
          &ldquo;When someone you have guided
          <br />
          <em>no longer needs your guidance,</em>
          <br />
          that is a sign you have done your job well.&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Prof. Dr. Pramod Kumar Rajput — Principle V, Stated
        </p>
      </section>

      {/* Principles 7-11 */}
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
                — Prof. Dr. Pramod Kumar Rajput, stated directly
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
          &ldquo;The greatest success
          <br />
          <em>is reaching the destination without losing yourself.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Prof. Dr. Pramod Kumar Rajput — Principle XIII, Stated
        </p>
      </section>

      {/* Principles 12-16 */}
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
                — Prof. Dr. Pramod Kumar Rajput, stated directly
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
          &ldquo;Your Attitude
          <br />
          <em>decides The Altitude.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Prof. Dr. Pramod Kumar Rajput — Principle XVII, Stated
        </p>
      </section>

      {/* Principles 17-21 */}
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
                — Prof. Dr. Pramod Kumar Rajput, stated directly
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
          &ldquo;Don&apos;t measure your life
          <br />
          <em>only by what you achieve, but by what you give.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Prof. Dr. Pramod Kumar Rajput — Principle XXI, Stated
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
          Post a commitment inspired by Prof. Dr. Pramod Kumar Rajput&apos;s principles. State it
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
        <p className="mt-4 text-sm text-neutral-500">17 min read · 21 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
