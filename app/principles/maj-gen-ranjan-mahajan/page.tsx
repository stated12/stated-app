import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "maj-gen-ranjan-mahajan";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Maj Gen Ranjan Mahajan — Leadership Is Not Primarily About Authority. It Is About Responsibility for People";
const DESCRIPTION =
  "Consultation is a strength, but accountability cannot be delegated. Ten principles from five tenures in Kashmir and the author of Kashmir in the Line of Fire.";
const IMAGE = "https://app.stated.in/mahajan-portrait.jpg";

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
    images: [{ url: IMAGE, width: 872, height: 872, alt: "Maj Gen Ranjan Mahajan, SM, VSM (Retd.)" }],
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
    title: "Leadership Is Earned Through Competence, Character, Courage and Trust",
    quote: [
      "Looking back, I believe I was shaped less by any single appointment or achievement than by the cumulative influence of people, places and experiences throughout my military journey. The Army taught me that leadership is not conferred by rank alone; it is earned through competence, character, courage and the trust of those one is privileged to command.",
      "As a young officer, I learned the importance of leading from the front and by setting personal example. In difficult situations, soldiers looked to their officers not merely for instructions, but for confidence, clarity and reassurance. This taught me to accept responsibility, remain composed under pressure and never ask my men to undertake a task that I was unwilling to undertake myself. Over time, I understood that courage is not the absence of fear. It is the ability to act correctly despite fear, uncertainty and personal risk, as there were issues more important than fear.",
      "My multiple tenures in Kashmir profoundly influenced me. The operational environment demanded alertness, resilience and decisive action, but it also taught me that military success cannot be measured only by operational outcomes. Every decision affects human lives, families and communities. I therefore came to appreciate the importance of restraint, compassion, empathy, dignity and respect for the people among whom we operate. Humanity is not separate from professional military conduct; it is one of its essential foundations.",
      "The soldiers I commanded were actually the biggest source of learning. Their courage, loyalty, humour and capacity to endure hardship continually humbled and inspired me. Their families also reminded me that behind every soldier stands a network of sacrifice and silent strength. I learned that comradeship is built through shared hardship, mutual trust and the conviction that no one will be abandoned.",
      "My progression from a young officer to Major General was therefore a journey of continuous learning, perseverance and determination. It taught me to listen and understand before deciding, to distinguish firmness from harshness, and to combine mission accomplishment with genuine concern for people, with empathy. I carry forward the belief that the finest leaders create confidence, develop others and leave behind institutions and individuals stronger than they found them.",
      "If I were to identify the central lesson of my life, it would be this: leadership is ultimately a moral responsibility. It is about using authority with humility, making difficult decisions with humanity and remaining accountable for their consequences. That is the perspective I hope to share with members of the Armed Forces, young people and future generations.",
    ],
    whatThisMeans:
      "Asked what most fundamentally shaped him, he doesn't point to a single defining moment but to a cumulative influence, people, places, and experiences across an entire career, with rank explicitly named as the wrong place to look for the source of real leadership.",
    whyItMatters:
      "\"The soldiers I commanded were actually the biggest source of learning\" reverses the usual direction of a leadership narrative. He credits the people below him in rank with teaching him the most, not the other way around.",
    reflect:
      "Who in your own life, below you in title or seniority, has actually taught you the most about how to lead?",
  },
  {
    number: "02",
    title: "Consultation Is a Strength, But Accountability Cannot Be Delegated",
    quote: [
      "This question or aspect is absolutely close to my heart. Leading in operational environments taught me that difficult decisions rarely arrive with complete information, unlimited time or ideal choices. In many situations, the responsibility is to make the best possible decision with the facts available, while remaining conscious that delay can itself carry serious consequences.",
      "The first lesson I learned was the importance of preparing thoroughly before a crisis occurs. Training, professional knowledge, disciplined procedures and an understanding of the situation create the foundation for sound judgment. When pressure rises, a leader cannot suddenly acquire calmness or clarity; one falls back on the habits developed beforehand.",
      "The second lesson was to separate facts from assumptions. Even under time constraints, it is important to identify what is known, what is uncertain and what must be verified. I learned to seek advice from those closest to the situation, listen to different viewpoints and then accept responsibility for the final decision. Consultation is a strength, but accountability cannot be delegated.",
      "I also learned that courage in leadership includes the willingness to revise a decision when circumstances change. Changing course on the basis of new and reliable information is not weakness; it is professional judgment. At the same time, once a decision is taken, the leader must communicate it clearly, explain the purpose behind it and stand by the people responsible for implementing it. And remember, the entire responsibility and onus of the outcome rests with the leader.",
      "Above all, pressure must never be allowed to erode values. A leader must never lose sight of the mission, the law, the dignity of human life and the welfare of the people entrusted to his or her care. Results matter, but the manner in which they are achieved matters equally. Success obtained by abandoning integrity, fairness or humanity is not true leadership.",
      "The greatest responsibility of a leader is therefore to remain calm without becoming detached, decisive without becoming reckless, firm without becoming insensitive and humble enough to learn from others. In the final analysis, leadership is not about always being certain; it is about accepting responsibility, making principled choices and protecting the trust placed in you.",
    ],
    whatThisMeans:
      "He separates two things often confused under pressure: consultation, which strengthens a decision by drawing on people closest to the situation, and accountability, which stays entirely with the leader regardless of how many people were consulted.",
    whyItMatters:
      "His four-part balance, calm without detachment, decisive without recklessness, firm without insensitivity, humble enough to learn, names the exact failure mode on either side of each virtue, not just the virtue itself.",
    reflect:
      "Under your own pressure, which of his four pairs do you tend to overcorrect toward, detachment, recklessness, insensitivity, or refusing to learn from others?",
  },
  {
    number: "03",
    title: "Conflict Enters Homes; It Unsettles Communities",
    quote: [
      "Kashmir taught me that no place can be understood through a single narrative. Beyond its mountains, beauty and strategic significance, it is a land of people, families, memories, aspirations and pain. My five tenures in the Valley showed me that conflict is never merely a contest between forces; it enters homes, unsettles communities and leaves impressions that may endure long after an operation is over.",
      "Personally, Kashmir taught me to look beyond the immediate task and understand the human context in which every decision is made. Duty required firmness, vigilance and courage, but it also required restraint, patience and respect for human dignity. I learned that the strength of an organisation is not measured only by its ability to confront danger, but also by its ability to protect the innocent and preserve trust.",
      "Kashmir also changed my understanding of courage. Courage is certainly displayed by those who face danger, but it is equally visible in the ordinary people who continue to work, educate their children, care for their families and hope for a better future despite uncertainty. I saw courage in soldiers who stood by one another in difficult circumstances, and in civilians who retained their humanity amid fear and disruption.",
      "Kashmir made me more reflective, patient and conscious of the value of life. It taught me that humanity is not a soft alternative to strength; it is what gives strength its legitimacy. The deepest lesson I carry from the Valley is that duty must be performed with courage, but never without compassion.",
    ],
    whatThisMeans:
      "Across five separate tenures, the lesson that stayed with him wasn't operational or tactical, it was that conflict is never only a contest between forces. It reaches into homes and communities and leaves impressions that outlast the operation itself.",
    whyItMatters:
      "\"Humanity is not a soft alternative to strength; it is what gives strength its legitimacy\" rejects the idea that compassion and military effectiveness sit in tension. In his account, one is what justifies the other.",
    reflect:
      "In whatever conflict or difficult situation you're navigating, are you measuring your own strength only by your ability to confront the immediate problem, or also by your ability to protect what's fragile around it?",
  },
  {
    number: "04",
    title: "True Courage Is a Moral Choice",
    quote: [
      "In my view, true courage is not the absence of fear. It is the strength to recognise fear, uncertainty or personal risk and still choose to do what is right. On the battlefield, courage may be visible in an act of valour, a difficult decision or the willingness to place oneself in danger for others. But courage is not confined to moments of combat, nor does it always announce itself dramatically.",
      "During my experiences in Kashmir, I saw that courage also consisted in showing restraint when anger could easily have prevailed, in holding fire and protecting lives amid danger and in making humane decisions under immense pressure. I saw it in soldiers who continued to perform their duties despite exhaustion and personal fear, and in ordinary people who preserved their dignity, cared for their families and kept hope alive in circumstances they had not chosen. It is also the courage to admit a mistake, seek help, stand up for someone who is vulnerable and speak the truth when silence would be easier.",
      "Leadership requires another form of courage: the courage to listen, to accept criticism, to take responsibility and to make an unpopular decision when conscience and duty demand it. It also requires the courage to show compassion. Compassion is sometimes mistaken for weakness, but I have found that it often requires greater strength than confrontation. It means recognising the humanity of others, even in situations marked by conflict or disagreement.",
      "True courage, therefore, is a moral choice. It fills us with deep pride that, as soldiers, we remain willing to enter situations where death is certain, acting not only on the orders of our commanders but often on the suggestions of those we lead.",
    ],
    whatThisMeans:
      "He locates courage in places most people wouldn't think to look: restraint when anger would have been easier, holding fire rather than using it, admitting a mistake, and staying quietly hopeful in circumstances you didn't choose, alongside the more obvious courage of combat.",
    whyItMatters:
      "\"Acting not only on the orders of our commanders but often on the suggestions of those we lead\" is a striking detail about how decisions to enter mortal danger actually get made, courage flowing upward through the ranks, not only downward as orders.",
    reflect:
      "Of the quieter forms of courage he names, restraint, admitting a mistake, speaking the truth when silence is easier, which one have you avoided practicing recently because it felt less like courage and more like just discomfort?",
  },
  {
    number: "05",
    title: "The Finest Leadership Creates Confidence, Capability, and Leaders in Others",
    quote: [
      "I have learned that ordinary people often possess extraordinary reserves of courage, resilience and ability. What appears ordinary in calm circumstances can become remarkable when responsibility, adversity or the needs of others demand it. In the Army, I saw men from modest backgrounds endure hardship, overcome fear and perform tasks of great difficulty not because they considered themselves exceptional, but because they believed in their comrades, their mission and the responsibility entrusted to them.",
      "Adversity can reveal qualities that remain hidden in comfortable circumstances. It can strengthen self-belief, develop ingenuity and teach people that they are capable of far more than they had imagined. I have also learned that resilience is not simply the ability to withstand hardship. It is the capacity to recover, learn, adapt and continue moving forward without losing one's values.",
      "Leaders have a crucial role in bringing this potential to the surface. First, they must create trust. People perform at their best when they know that their leader is competent, fair and willing to stand by them. Second, leaders must give responsibility, not merely instructions. Meaningful ownership encourages initiative and develops confidence.",
      "A leader must also set high standards while providing the training, resources and guidance necessary to meet them. Expectations without preparation produce frustration; preparation combined with high expectations produces growth. It is equally important to recognise effort, give honest feedback and treat failure as an opportunity to learn and perform better, provided that the individual has acted with sincerity and integrity.",
      "Above all, leaders must see potential before it becomes visible. They must look beyond background, rank or present performance and give people the opportunity to prove themselves. The finest leadership does not create dependence on the leader; it creates confidence, capability and leaders in others. When people are trusted, trained, respected and held to meaningful standards, ordinary individuals can achieve extraordinary things and create unordinary tales.",
    ],
    whatThisMeans:
      "His formula for growth is precise: expectations without preparation produce frustration, but preparation combined with high expectations produces growth. The high standard alone isn't the problem or the solution, it's whether it comes paired with the training to meet it.",
    whyItMatters:
      "\"The finest leadership does not create dependence on the leader; it creates confidence, capability and leaders in others\" is a direct definition of success that has nothing to do with how needed the leader remains, and everything to do with what the people around them become.",
    reflect:
      "Are you currently setting high expectations for someone without giving them the preparation to meet them, or the other way around?",
  },
];

const principlesPart2 = [
  {
    number: "06",
    title: "Every Uniform Concealed a Human Story",
    quote: [
      "Military leadership is ultimately a responsibility for people, not merely the management of tasks. The principles that guided me in developing and motivating those I led were trust, personal example, fairness, empathy, high standards and genuine concern for their welfare.",
      "I believe that people respond best when they know that their leader understands their circumstances and will stand by them. This meant being present, listening carefully and making time for individuals, particularly when operational pressures were greatest. An army officer will always get a salute from his team, but what matters the most is whether it is willing or just a part of duty. The respect earned is irreplaceable.",
      "To say one is never afraid is simply untrue. When individuals faced fear or uncertainty, my aim was to provide clarity and confidence while acknowledging the real risks. Fear is a natural response; it becomes controllable when people are well trained, honestly briefed, and assured that their team stands with them. In my experience, calm leadership and clear communication rebuilt confidence more effectively than rank or forceful words. I must confess that there were times under fire when I, too, felt shades of fear and found strength and confidence through my team.",
      "I also believed in setting demanding but realistic standards. Compassion should never mean lowering standards, and discipline should never mean abandoning compassion. People need to know what is expected of them, receive the preparation to meet those expectations and be given constructive feedback when they fall short.",
      "Failure was treated as an opportunity for reflection and improvement, provided it arose from an honest effort and not from negligence or lack of integrity. I encouraged those I led to acknowledge mistakes, learn from them and return stronger. At the same time, accountability remained essential. Believe me, an avoidable failure in the face of terrorists, when a group of six broke away and escaped, invited intense criticism and raised questions about our performance. But it also gave us a chance to strike back. In the following three weeks, across three different operations, we neutralised five of those six. So, after one dressing-down, we earned applause three times over.",
      "Above all, I tried to remember that every uniform concealed a human story. Personal difficulties, family concerns and emotional burdens could affect performance and morale. A humane leader notices these realities, responds with dignity and seeks practical support where possible. The strongest teams are built when people feel trusted, respected, protected and inspired to give their best.",
    ],
    whatThisMeans:
      "His admission that he, too, felt fear under fire and found strength through his team, rather than despite needing one, undercuts the idea that a leader's job is to be unafraid. The job is to be honest about fear while still providing clarity for others.",
    whyItMatters:
      "The story of the escaped group of six is a real, specific account of accountability followed by recovery, not a tidy lesson but an actual sequence: criticism, then three operations over three weeks, then five of six neutralised. He lets the failure and the redemption both stand, in full, rather than skipping to the moral.",
    reflect:
      "After a setback you were held accountable for, did you get the chance, or make the chance, to answer it the way his team did, with sustained effort rather than a single redemptive moment?",
  },
  {
    number: "07",
    title: "Consequential Leadership Leaves Behind Stronger People, Sounder Institutions",
    quote: [
      "Good leadership enables an organisation to function effectively; consequential leadership leaves it stronger, more capable and more purposeful than it was before. Good leaders achieve objectives and manage responsibilities well. Consequential leaders do this while also shaping people, institutions and values in ways that endure beyond their own tenure.",
      "The difference lies partly in the breadth of responsibility a leader is willing to accept. Operational leadership requires timely decisions, discipline and execution. Strategic leadership requires seeing beyond the immediate task, anticipating consequences, understanding the wider environment and preparing the organisation for challenges that may not yet be visible. Consequential leadership brings both dimensions together: it delivers today while building capacity for tomorrow.",
      "In the final analysis, consequential leadership is measured not only by what a leader accomplishes, but by what remains after the leader has gone: stronger people, sounder institutions, higher standards and a deeper sense of collective purpose. A leader's true legacy is not the power once exercised, but the trust earned and the future made better for others.",
    ],
    whatThisMeans:
      "He draws a clean distinction between good leadership, which achieves objectives well, and consequential leadership, which does that while also shaping people and institutions in ways that outlast the leader's own tenure entirely.",
    whyItMatters:
      "\"A leader's true legacy is not the power once exercised, but the trust earned and the future made better for others\" reframes legacy away from the leader's own record and toward what continues functioning well after they've left the room.",
    reflect:
      "If you left your current role tomorrow, would what remains be measured by what you accomplished while there, or by what continues to function well without you?",
  },
  {
    number: "08",
    title: "What Value Can I Continue to Create?",
    quote: [
      "Life after the Army taught me that identity is deeper than designation, rank or uniform. For many years, military service provides a clear structure: one has a defined role, a mission, responsibilities and a close-knit community. When that chapter ends, one must learn to distinguish between the position one held and the person one has become. The uniform may be put away, but the values of discipline, duty, courage, comradeship and service remain part of one's character.",
      "The transition also taught me that purpose does not end with retirement; it changes form. Earlier, purpose was expressed through command, duty and the protection of the nation. In a new phase of life, it may be expressed through mentoring, writing, public service, institution-building, teaching or helping others learn from one's experiences. The essential question is not, \"What authority do I still possess?\" but, \"What value can I continue to create?\" How can I give back to society?",
      "I became more conscious that time is finite and cannot be recovered. This encourages more deliberate choices: spending time with family, nurturing meaningful relationships, caring for one's health and giving attention to work that has lasting value. Not every opportunity deserves acceptance, and not every battle deserves to be fought.",
      "Letting go is not surrender, and it is certainly not easy, particularly when you have already weathered far rougher times and situations, many of which involved unfair treatment. It is the wisdom to release roles, habits and expectations that belonged to an earlier stage, while retaining the principles that remain important. Reinvention requires humility because it means becoming a learner again, entering unfamiliar spaces and accepting that past achievements do not automatically confer relevance in the present. Experience becomes truly valuable when it is shared constructively and adapted to serve new purposes.",
    ],
    whatThisMeans:
      "He replaces \"what authority do I still possess?\", the question that would keep someone anchored to a role that's ended, with \"what value can I continue to create?\", a question that has an answer regardless of title.",
    whyItMatters:
      "\"Not every battle deserves to be fought\" and \"past achievements do not automatically confer relevance in the present\" are both quiet admissions that reinvention requires giving something up, not just adding something new. He names that cost rather than skipping past it.",
    reflect:
      "Is there a role, habit, or expectation from an earlier stage of your life that you're still holding onto, past the point where it's actually serving you?",
  },
];

const principlesPart3 = [
  {
    number: "09",
    title: "Five Principles to Carry Through Life",
    quote: [
      "1. Choose integrity before convenience. Your reputation is built through the decisions you make when no one is watching. Do what is right, even when it is difficult, unpopular or personally costly. Competence may open doors, but integrity determines whether people continue to trust you after you enter them.",
      "2. Be courageous, but remain humane. Courage is not the absence of fear. It is the willingness to act responsibly despite fear and uncertainty. However, courage should never become recklessness or insensitivity. The strongest person is often the one who can remain firm while preserving compassion, restraint and respect for the dignity of others.",
      "3. Accept responsibility completely. Do not claim credit for every success and blame others for every failure. Accept responsibility for your decisions, your conduct and the people entrusted to your care. Responsibility also means preparing thoroughly, keeping your word and having the humility to ask for help when it is needed.",
      "4. Treat failure as a teacher, not a verdict. Failure can be painful, but it need not define you. Examine it honestly, learn from it, correct what must be corrected and begin again. Do not fear failure so much that you avoid responsibility or stop attempting difficult things. The important question is not whether you have fallen, but whether you rise wiser and stronger.",
      "5. Invest in people and serve a purpose larger than yourself. No meaningful achievement is entirely individual. Respect your family, value your comrades and mentors, listen to those who serve alongside you and help others grow. At the same time, identify a purpose that extends beyond status, wealth or recognition. A career gives you a position; purpose gives that position meaning.",
      "I would also tell them that character is paramount. Build your own character with strength, and the rest will follow; at the same time, commit to fostering the highest standards of character in all those under your responsibility and influence. People remember how you made them feel, whether you stood by them when things were hard, and whether your success opened doors for others to succeed.",
    ],
    whatThisMeans:
      "Asked for five principles to carry through life, he gives five distinct, standalone instructions rather than variations on a theme, integrity, courageous humanity, complete responsibility, failure as teacher, and investing in others, then adds character as the thread underneath all five.",
    whyItMatters:
      "\"A career gives you a position; purpose gives that position meaning\" is the sharpest line in the set. It names the difference between having reached somewhere and having a reason for being there.",
    reflect:
      "Of his five, integrity, courageous humanity, complete responsibility, failure as teacher, investing in others, which one would the people who know you best say you actually practice, and which would they say you only believe in?",
  },
  {
    number: "10",
    title: "Leadership Is Not Primarily About Authority. It Is About Responsibility for People",
    quote: [
      "If there is one lesson I wish I had understood earlier, it is that leadership is not primarily about authority; it is about responsibility for people.",
      "When one is young, it is natural to focus on performance, achievement, rank and the successful completion of the task. These are important, particularly in a demanding profession such as the Army. But with experience, I came to understand that the deepest measure of leadership is not simply what one accomplishes, but how one treats people while accomplishing it and what one leaves behind in them and in the institution.",
      "I would also want future generations to remember that success is rarely achieved alone. We are shaped by our parents, teachers, mentors, comrades, colleagues and even by those who challenge us. We should therefore remain grateful, listen generously and make time to develop those who come after us.",
      "Finally, I would say that one must not postpone what truly matters. Careers, titles and circumstances change, but character, relationships and service endure. Use every position to strengthen people, uphold values and leave the world around you better than you found it.",
    ],
    whatThisMeans:
      "Asked what he wishes he'd understood earlier, he names the belief that shaped his entire youth, that performance, achievement, and rank were the measure of leadership, as something experience eventually corrected rather than confirmed.",
    whyItMatters:
      "Naming even those who challenge us alongside parents, teachers, mentors, comrades, and colleagues as people who shaped his success is a more complete account of influence than most people are willing to give credit for, including the friction, not only the support.",
    reflect:
      "What truly matters that you've been postponing, on the belief that careers, titles, or circumstances would eventually make more room for it?",
  },
];

const takeaways = [
  {
    title: "Leadership is earned through competence, character, courage and trust, not conferred by rank.",
    body: "The soldiers he commanded were his biggest source of learning, not the other way around.",
  },
  {
    title: "Consultation is a strength, but accountability cannot be delegated.",
    body: "Seek advice from those closest to the situation, then accept sole responsibility for the final decision.",
  },
  {
    title: "Humanity is what gives strength its legitimacy.",
    body: "Conflict enters homes and unsettles communities. The strength of an organisation is measured by its ability to protect the innocent, not only to confront danger.",
  },
  {
    title: "True courage is a moral choice, not the absence of fear.",
    body: "It shows up in restraint, in admitting a mistake, and in compassion, as often as it shows up on a battlefield.",
  },
  {
    title: "The finest leadership creates confidence, capability, and leaders in others.",
    body: "Expectations without preparation produce frustration. Preparation combined with high expectations produces growth.",
  },
  {
    title: "A career gives you a position; purpose gives that position meaning.",
    body: "Choose integrity before convenience, remain courageous but humane, accept responsibility completely, treat failure as a teacher, and invest in people.",
  },
  {
    title: "Leadership is not primarily about authority. It is about responsibility for people.",
    body: "The deepest measure of leadership is not what you accomplish, but how you treat people while accomplishing it, and what you leave behind.",
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
        / Maj Gen Ranjan Mahajan
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/mahajan-portrait.jpg"
            alt="Maj Gen Ranjan Mahajan, SM, VSM (Retd.)"
            width={872}
            height={872}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Maj Gen Ranjan Mahajan, SM, VSM (Retd.) · Indian Army · Author,{" "}
          <em>Kashmir in the Line of Fire: Stories from the Battlefield</em>
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 013
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Maj Gen Ranjan <em>Mahajan</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Leadership Is Not Primarily About Authority. It Is About Responsibility for People
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Five tenures in Kashmir · Scholar Soldier · Decorated Veteran, Leader &amp; Strategist
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Consultation is a strength, but accountability cannot be delegated.&rdquo;
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
          <p className="font-medium">10 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">August 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Indian Army Veteran",
          "Five Tenures in Kashmir",
          "Author",
          "Strategic Leadership",
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
          &ldquo;We asked Maj Gen Ranjan Mahajan ten questions. He answered from five tenures in
          Kashmir, and from what came after the uniform was put away.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Maj Gen Ranjan Mahajan, SM, VSM (Retd.), is a highly decorated veteran, leader and
          strategist whose military career included five separate tenures in Kashmir, an
          operational environment that shaped much of what he stands for. He is the author of{" "}
          <em>Kashmir in the Line of Fire: Stories from the Battlefield</em>, and continues to
          write, mentor, and contribute to nation-building beyond his years in uniform.
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
          Ten principles · Stated by Maj Gen Ranjan Mahajan
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 10</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Maj Gen Ranjan Mahajan, stated directly
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
          &ldquo;Humanity is not a soft alternative to strength;
          <br />
          <em>it is what gives strength its legitimacy.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Maj Gen Ranjan Mahajan — Principle III, Stated
        </p>
      </section>

      {/* Principles 6-8 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 10</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Maj Gen Ranjan Mahajan, stated directly
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
          &ldquo;A career gives you a position;
          <br />
          <em>purpose gives that position meaning.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Maj Gen Ranjan Mahajan — Principle IX, Stated
        </p>
      </section>

      {/* Principles 9-10 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 10</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Maj Gen Ranjan Mahajan, stated directly
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
          &ldquo;Leadership is not primarily about authority.
          <br />
          <em>It is about responsibility for people.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Maj Gen Ranjan Mahajan — Principle X, Stated
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
          Post a commitment inspired by Maj Gen Ranjan Mahajan&apos;s principles. State it
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
        <p className="mt-4 text-sm text-neutral-500">14 min read · 10 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
