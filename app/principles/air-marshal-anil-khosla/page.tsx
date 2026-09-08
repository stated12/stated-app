import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "air-marshal-anil-khosla";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Air Marshal Anil Khosla — To Go Fast, Go Alone; to Go Far, Go With Your Team";
const DESCRIPTION =
  "Self-discipline is doing the right things when nobody is watching. Nine principles from four decades in the Indian Air Force, fighter cockpit to Vice Chief of the Air Staff.";
const IMAGE = "https://app.stated.in/khosla-portrait.jpg";

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
    images: [{ url: IMAGE, width: 1039, height: 1039, alt: "Air Marshal Anil Khosla" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

// Each quote item is either a plain paragraph (string) or a subheading
// object. Air Marshal Khosla structured several of his answers with his
// own bold/underlined subheadings (e.g. the tyre analogy, Excellence /
// Self-Discipline, the LIVE acronym). We preserve that structure exactly
// rather than flattening it into plain paragraphs.
type QuotePart = string | { sub: string };

const principles: {
  number: string;
  title: string;
  quote: QuotePart[];
  whatThisMeans: string;
  whyItMatters: string;
  reflect: string;
}[] = [
  {
    number: "01",
    title: "Take the Initiative and Make the First Move",
    quote: [
      "I consider myself highly privileged to have served in the Indian Air Force, where I had the opportunity to operate fighter aircraft, assume command positions, collaborate with various organisations, and hold senior appointments. My service also included overseeing operations such as Doklam and Balakot.",
      "During my career, I observed that as one progresses, the scope of responsibilities and the challenges encountered also expand. It is essential to adopt appropriate guiding principles for these challenges. I divide my service career into three distinct phases.",
      "The first phase, which I call the 'worker phase,' emphasises individual performance. During this period, the guiding principles I adhered to included \"take the initiative and make the first move\", as overcoming inertia is often challenging. By taking the first step, subsequent steps tend to become easier. My primary principle was to \"set ambitious goals while taking incremental steps towards achieving them\". Additionally, I believed in full involvement in every task, i.e. giving 100%. I also believed that failure is an inherent part of life; one should not get discouraged by setbacks, but instead learn from them and try again.",
      "The second phase is termed the 'supervisory phase,' where the focus shifts to overseeing and ensuring others complete tasks. This includes leadership roles such as commanding squadrons and stations. I was fortunate to command two important Indian Air Force air bases (Ambala and Jaisalmer). From this experience, I learned the importance of adaptability, i.e. \"playing with the cards you're dealt\". A relevant maritime adage states, 'If you cannot change the wind, adjust your sails.' In this stage, careful planning and organisation are essential. Effective planning requires addressing all possible contingencies to make the plans adaptable, flexible, and resilient. To implement and monitor these plans successfully, you need appropriate mechanisms, including reviews and mid-course adjustments. Crisis management and problem-solving are essential leadership skills during this phase. My personal hobby is puzzle solving, and I follow a fundamental principle: break complex problems into smaller, manageable parts to identify solutions more easily. On the other hand, crises are unpredictable and can present numerous unexpected challenges. My approach aligns with aviation practices: immediate action, subsequent actions, and long-term preventive actions. By applying common sense and acting quickly, one can contain and manage crises effectively and prevent escalation. Subsequent actions involve controlling the situation and implementing corrective measures. Long-term, predictive actions focus on preventing recurrence, allowing thoughtful planning to avoid similar crises.",
      "The third phase, known as the 'leadership phase,' involves decision-making and setting long-term objectives. Inspiring and motivating others is paramount. I firmly believe a leader should have a vision of the organisation's future, emphasising long-term gains over short-term objectives. As a leader, calculated risk-taking is essential, but impulsive decisions should be avoided. A vital guiding principle I follow is delegation: entrust tasks to capable individuals. Trying to do everything oneself is counterproductive, like \"keeping a dog but barking yourself\". These guiding principles have been instrumental in fulfilling my duties across various stages of my service career.",
    ],
    whatThisMeans:
      "He divides an entire career, fighter pilot to Vice Chief of the Air Staff, into three phases, worker, supervisory, leadership, each with its own guiding principle rather than one philosophy stretched to fit every stage. What worked at the first phase, individual initiative, isn't what carries a leader through the third, which is about vision and delegation.",
    whyItMatters:
      "\"Trying to do everything oneself is counterproductive, like keeping a dog but barking yourself\" names a specific failure mode of leaders who never fully leave the worker phase behind, holding onto tasks that should have been delegated once responsibility scaled up.",
    reflect:
      "Which phase, worker, supervisory, or leadership, are you actually operating in right now, and are you still applying principles that belonged to an earlier one?",
  },
  {
    number: "02",
    title: "Decision-Making Is Both an Art and a Science",
    quote: [
      "This question has two aspects. One relates to decision-making, and the other to younger leaders' responsibility when outcomes are uncertain.",
      "I believe that decision-making constitutes both an art and a science. This perspective stems from the understanding that the decision-making process is highly scientific, while its application requires artistry. Additionally, as one progresses to higher positions within an organisation or in life, the significance and impact of one's decisions become considerably greater. In other words, many people are affected by your decisions, and their effects can last a very long time.",
      "It is essential to make deliberate, well-considered decisions rather than act impulsively. The art of decision-making can be refined through consistent practice and the effective utilisation of available tools. One such tool involves relying on one's common sense, intuitions, and instincts. As experience accrues, these intuitions and instincts are enhanced and can play a significant role in the decision-making process. Furthermore, seeking counsel from trusted advisors is advisable; however, the individual remains responsible for the final decision. Therefore, it is imperative to assess the potential outcomes of decisions against both personal core values and organisational principles to reduce the risk of errors. Additionally, consideration of the long-term consequences of decisions is crucial. It is also recommended that decisions should not be made under emotional duress, as this can increase the likelihood of errors. A useful method I have used is listing the advantages and disadvantages, which helps clarify the decision-making process. Documenting these factors can promote clearer and more objective thinking.",
      "The second aspect of your inquiry concerns the responsibilities inherent to young leaders. In my view, it arises from adhering to and developing the principles of accountability, reliability, and dedication. These qualities are of paramount importance. Accountability is established when the fundamental principle is that \"it is my job and my responsibility.\" Reliability means that when a task is assigned, the person assigning it can be confident it will be completed on time and to a high standard. Dedication, as discussed earlier, means committing fully (100%) to the task at hand. Perseverance is another important aspect: continuing until you complete the task successfully. Another important aspect for young leaders is the ability to deal with failure. Failure will happen, but in those cases, the person should have the broad shoulders to accept it and own it, rather than pass the buck and blame someone else.",
    ],
    whatThisMeans:
      "He treats decision-making as two separate skills rather than one: a scientific process, refined by tools like listing advantages and disadvantages, and an art shaped by instinct that only sharpens with experience. Neither one alone is sufficient.",
    whyItMatters:
      "\"Seeking counsel from trusted advisors is advisable; however, the individual remains responsible for the final decision\" places accountability in exactly one place, no matter how widely counsel was sought. Advice can be shared; responsibility for the outcome cannot.",
    reflect:
      "In your last difficult decision, did you have the broad shoulders to own the outcome fully, or did some part of you already have a story ready about who else was responsible?",
  },
  {
    number: "03",
    title: "To Go Fast, Go Alone; to Go Far, Go With Your Team",
    quote: [
      "Team spirit is an important part of life, not only in services but also in personal and professional life. The guiding principle is \"To go fast, go alone; to go far, go with your team\". At a young age and in junior ranks, one should learn to work with and be part of the team. In senior appointments, it is essential to build a team and keep it together, motivated, and focused on organisational goals.",
      "For team building, I used to draw inspiration from the car. I drew an analogy that decision-makers are like drivers. They decide where the vehicle should move, which direction it should go, and at what speed. Middle-level supervisors function as the steering mechanism, facilitating the vehicle's response to the driver's commands, while employees are the other components that ensure the vehicle works. Any malfunction or misalignment of these components adversely affects the entire system. Effective management is required for the vehicle to operate smoothly. I employed a similar approach when managing an organisation.",
      { sub: "Maintaining the Same Tyre Pressure Across All Wheels" },
      "Ensuring the car tyres are inflated to the correct, uniform level is extremely important for safety, longevity, and good vehicle handling. You need to check the tyres periodically and inflate or deflate them as needed to maintain the same optimum pressure in all tyres. Similarly, human resources in any group also need to behave in a conducive manner. At times, factors like overconfidence or underconfidence, excessive eagerness or callousness, and ego can make individuals behave irrationally, ignoring the important principles of teamwork. A team member may sometimes need a boost (encouragement). At the same time, there may be a requirement to control and regulate others. A good manager and leader should know when to do that. Take special care when regulating and controlling to avoid permanent damage to enthusiasm, praise loudly, blame softly. It is best to do so privately and by using a suitable leadership style, i.e., with a little explanation.",
      { sub: "Wheel Alignment" },
      "Proper wheel alignment is essential for the vehicle to move steadily in the intended direction without pulling to one side. Similarly, all team members must work together toward the intended organisational goal. This is one of the leader's or manager's key tasks, and it requires constant effort to keep team members together and focused.",
      { sub: "Wheel Rotation" },
      "Tyre wear and tear is never uniform across all four wheels of a vehicle. Hence, to ensure uniform wear of all four tyres, it is advisable to interchange tyre positions periodically. Tyre rotation is crucial for longer tyre life and better performance. Similarly, human beings also need periodic changes in tasks and challenges. Stuck in one type of job, they tend to stagnate, which adversely affects their performance. However, introducing changes too often is also not good for the organisation. An effective leader knows when to introduce change to avoid stagnation among their members.",
      { sub: "Wheel Balancing" },
      "Wheel balancing in the wheel and tyre combination is important for a smooth, stable drive, reduced tyre wear, and eliminating vibrations. In team functioning, maintaining a balance between the task and providing the wherewithal to execute it is very important. It is the job of the leader and the manager to provide the correct amount and quality of resources for the allotted task.",
      { sub: "Spare Wheel" },
      "A vehicle has a spare wheel to cater for unforeseen circumstances. The spare wheel also needs to be maintained in good condition, like any other wheel. Similarly, in a team, it is good to have a standby person available for different tasks. The standby person needs to be aware of the task and its progress so that slotting in is easy if the need arises.",
    ],
    whatThisMeans:
      "He builds an entire theory of team leadership around a single sustained car analogy, drivers, steering, and components, then five specific vehicle-maintenance practices, tyre pressure, alignment, rotation, balancing, and a spare. Each maps to a distinct, nameable leadership responsibility rather than a vague call to \"build good teams.\"",
    whyItMatters:
      "\"Praise loudly, blame softly\" and doing so privately gives the abstract idea of encouraging a team a specific, actionable shape, exactly the kind of concrete guidance that makes the whole analogy more than just a clever metaphor.",
    reflect:
      "Of his five, tyre pressure, alignment, rotation, balancing, spare wheel, which is your own team currently most neglecting?",
  },
  {
    number: "04",
    title: "Excellence and Self-Discipline",
    quote: [
      "Two aspects stand out: excellence and discipline. Not discipline, actually self-discipline.",
      { sub: "Excellence" },
      "Two drivers shape a person's output level. One is the desire to succeed, and the other is the fear of failure. The desire to succeed is considered positive, and the fear of failure is considered negative. However, in my opinion, if you harness both, you move from average to excellent performance.",
      "You should have a desire to leave a legacy wherever you go. People should remember you for something good. Many people think enough has already been done and there is no scope for further improvement, which I think is totally wrong. There is always scope to improve your standard of living, your processes, yourself, and your organisation. The principle you should follow is to make things better every day.",
      "What I follow is very straightforward: \"hard work\". There is no shortcut in life. Some people ask me whether you should work smart or hard. I tell them there's no question of one or the other; it means you have to work smart and hard. Another principle I follow is \"one step extra\". It means that when you feel you have done enough for a task, take one or two extra steps. That is what makes the difference between average output and above-average or excellent output.",
      { sub: "Self-Discipline" },
      "Self-discipline is doing the right things when nobody is watching. I came across a very good example or definition of self-discipline, i.e., \"the ability to make yourself do the right thing at the right time, whether you like it or not\". It means you should be able to control yourself. You should be able to overcome various temptations that come your way. So self-restraint and willpower are essential for self-discipline.",
      "Another significant facet of self-discipline is its relevance not only in work culture but across all facets of life. Whether concerning professional conduct, health, dietary habits, civic responsibility, social etiquette, manners, behaviour, road discipline, time management, or financial discipline, these aspects should all be maintained with self-discipline.",
    ],
    whatThisMeans:
      "He doesn't treat the desire to succeed and the fear of failure as a choice between a healthy motivator and an unhealthy one. He treats them as two forces to be harnessed together, arguing that using only one keeps performance merely average.",
    whyItMatters:
      "Extending self-discipline explicitly beyond work, into diet, civic responsibility, manners, road discipline, and financial discipline, refuses to let it be a professional-only virtue people switch on for the office and off everywhere else.",
    reflect:
      "Is your own self-discipline consistent across work and the rest of your life, or does it noticeably weaken the moment nobody professional is watching?",
  },
  {
    number: "05",
    title: "Adapt to Technology, Threats, and an Uncertain Future",
    quote: [
      "Military leaders must constantly deal with new technologies, changing threats, and an uncertain future. They have to adapt to these changes constantly.",
      { sub: "Technology" },
      "It's often said that \"technology is a good gadget, but a bad weapon,\" highlighting its double-edged nature. In times of war, though, the lines blur, and there is no good or bad. Transforming technology into effective warfighting tools takes considerable time and effort. The Air Force, especially, is a technology-intensive service. Recently, technologies such as quantum, AI, robotics, hypersonic systems, and drones have rapidly transformed warfare.",
      "To adapt to new technology, one needs to think and ideate constantly, i.e., how to use the new technology for military purposes and how to convert it into military capability. This process must occur concurrently, and development should proceed in parallel, ensuring capabilities are integrated into both civil and military domains at the same time. As far as possible, dual-use systems are better, as they can serve both purposes.",
      { sub: "Changing Threats" },
      "Change is the only constant; resisting it can be exhausting, and adapting to it is a strength. Today's world is changing very fast, and so are the threats.",
      "Therefore, it is essential to maintain a close watch on the adversary. Observing the adversary means evaluating both their capability development and their attitudes. However, our preparation should focus on the adversary's capabilities rather than their current attitude. The adversary's attitude may change at any time, whereas their capabilities may be used against us.",
      { sub: "Uncertain Future" },
      "Decision-making in an uncertain environment is one of the most challenging tasks military leaders face. Therefore, military leaders must allow their imagination to explore all potential scenarios. This involves rigorous thinking, considering every possible outcome and preparing accordingly for each contingency. This approach ensures plans incorporate essential qualities such as adaptability, flexibility, and resilience, which are critically required in a rapidly changing world. During capability enhancement, mid-course reviews and course corrections matter because conditions change quickly. This is how you deal with a changing world.",
    ],
    whatThisMeans:
      "His distinction between an adversary's attitude and their capability is a precise strategic principle: attitudes can shift overnight, but capabilities, once developed, persist and can be used regardless of current intent. Preparation should track the harder, slower-changing variable.",
    whyItMatters:
      "\"Technology is a good gadget, but a bad weapon\" until war blurs the line entirely, is an honest acknowledgment that the ethical clarity available in peacetime about a technology's purpose doesn't survive contact with actual conflict.",
    reflect:
      "In your own field, are you preparing for what a competitor or rival currently intends, or for what they're actually capable of regardless of their current intentions?",
  },
  {
    number: "06",
    title: "Do as I Do, Not as I Say",
    quote: [
      { sub: "Responsibility Towards the New Generation" },
      "In the military domain, leadership positions change constantly as individuals retire at their designated retirement age. Experienced leaders, at the time of their exit, possess extensive knowledge and wisdom which they are expected to pass on to the succeeding generation. This process resembles a relay race, where one hands over the baton to the next runner rather than starting afresh.",
      "It is therefore essential to leave a legacy that is memorable and reflects established capability, while also allowing room for future enhancements based on forthcoming changes. Furthermore, alongside developing capabilities and strategic planning, it is crucial to provide a clear and effective roadmap for the future. This roadmap provides a foundation for subsequent generations to adapt and build. Equally important is mentoring and training the successors, ensuring they are well prepared to assume future roles and responsibilities. Additionally, cultivating a motivated and competent team is vital, as this enables incoming leaders to develop further and refine the established framework. In my view, these are the key actions experienced leaders should take to support the transition and ease the next generation's tasks.",
      { sub: "Lessons for Young Professionals" },
      "Regarding lessons for young professionals and leaders, I have previously advocated several in my earlier response. Moreover, there are a few additional ones.",
      "It is advisable to always adopt a balanced approach. This involves, firstly, maintaining equilibrium across professional, personal, and social settings. Secondly, it requires diligent effort while also acknowledging the importance of leisure; a guiding principle I have consistently upheld is \"work hard and play harder\". Furthermore, in professional pursuits, both substance and presentation are critical; however, it is essential to balance them. This philosophy embodies what I consider a balanced approach to life.",
      "Second, the foremost priority should be being a good human being. It is essential to recognise that possessing professional excellence does not necessarily equate to being a good human being. To cultivate goodness, one must show tolerance towards others and respect their ideas and beliefs. It is important to show empathy towards subordinates, remain honest in all interactions, and uphold fairness in dealings. I believe these qualities are fundamental to earning others' respect. Therefore, they are essential.",
      "And lastly, and most importantly, it is essential to lead by example. Your motto should be 'Do as I do' rather than 'Do as I say'. This is because people tend to forget or doubt what you say, but they always observe and trust what you do. They pay close attention to your actions and look for consistency. Therefore, it is very crucial that you lead by example.",
    ],
    whatThisMeans:
      "He treats passing on leadership as a relay race, handing over a baton rather than each generation starting from zero, which requires a leader to actively build a roadmap and mentor successors before they leave, not simply perform well and depart.",
    whyItMatters:
      "\"Possessing professional excellence does not necessarily equate to being a good human being\" is a direct rejection of the assumption that competence and character are the same achievement. He names being a good human being as the foremost priority, ahead of professional excellence itself.",
    reflect:
      "If people around you could only observe your actions, never hear your words, what would they conclude your actual priorities are?",
  },
  {
    number: "07",
    title: "Ikigai: A Reason for Being",
    quote: [
      { sub: "Retirement Transition" },
      "The transition from forty years of military service to retirement has, I must admit, been somewhat challenging, mainly because it requires an adjustment period. One day, you are in a very high-ranking position, addressing numerous crises and constantly taking calls. The next day, however, your phone goes completely silent, and you're totally out of the loop. It takes time to adjust to the new way of life.",
      "In my case, the process has been instructive, offering numerous insights into purpose and ongoing contribution. One such realisation is that the skills and knowledge acquired through service are equally applicable to everyday life, which has proven highly beneficial. Furthermore, it is evident that the extensive experiences gained over a span of forty years should not be squandered; rather, they ought to be shared with others so they too can benefit from these lessons.",
      "Additionally, I have recognised that there remains much to learn. During active service, the focus is predominantly on one's profession, often leaving less attention for other areas. However, later reflections reveal that one can acquire much more knowledge and develop many additional skills. Moreover, it became clear that life encompasses much more than the monetary wealth, rank, and power people often pursue during their careers. Understanding that health and relationships matter more than material gains underscores the importance of purpose and meaningful contribution.",
      { sub: "Purpose in Life" },
      "Retirement does not imply that one merely ceases all activity; rather, it is essential to remain both physically and mentally engaged. This engagement is not necessarily to earn additional income, but it is essential for one's physical and intellectual well-being.",
      "In my case, a peculiar situation arose following my retirement. During the COVID period, I experienced considerable idle time. Consequently, I began documenting and discussing the knowledge I had accumulated over forty years. This endeavour gradually evolved into my life's purpose: to read, learn more, and share my insights with others. I established a blog, which now hosts about 850 posts, and I also manage a YouTube channel. Both platforms are self-operated. Additionally, I participate in seminars, discussions, and lectures at various colleges, universities, and think tanks. This involvement keeps me actively engaged.",
      "Furthermore, I value continuous learning, meeting new people, and sharing knowledge through my blog and YouTube channels. These activities benefit one's well-being and also contribute to society. It is mutually advantageous.",
      "Having a clear purpose is a Japanese concept called \"Ikigai\", which means \"a reason for being\" (it combines iki, to live, and gai, reason). Ikigai is a significant factor contributing to the longevity of Japanese people. Therefore, having a purpose in life post-retirement is exceedingly important.",
    ],
    whatThisMeans:
      "He's honest that the transition itself was somewhat challenging, from a phone ringing constantly with crises to complete silence overnight, rather than presenting retirement as a smooth, dignified next chapter from the start.",
    whyItMatters:
      "Building an 850-post blog and a self-operated YouTube channel during COVID idle time turned reflection into an actual practice, not just a stated value. Ikigai, in his account, isn't a concept he read about, it's the structure he built for himself once he needed one.",
    reflect:
      "If a major role or identity in your own life ended overnight, do you have a reason for being ready that doesn't depend on that role?",
  },
  {
    number: "08",
    title: "LIVE: Learning, Ideation, Value Creation, Exchange",
    quote: [
      "One principle I want everyone to remember is captured in the acronym \"LIVE.\"",
      { sub: "L Stands for Learning" },
      "Learning is an ongoing process that continues throughout one's life. In my view, the day you cease to learn, you also cease to truly live. Learning keeps us curious, adaptable, and open to new possibilities.",
      { sub: "I Stands for Ideation" },
      "Learning must lead to thoughtful reflection, questioning, and brainstorming. In today's world, we need thinkers, individuals who can generate new and innovative ideas. But an idea, unless acted upon, remains only an idea.",
      { sub: "V Stands for Value Creation" },
      "The true value of learning and ideas lies in their implementation. We must translate our ideas into action, create meaningful outcomes, and continuously improve upon what we do. Implementation turns ideas into practice and creates value for ourselves and others.",
      { sub: "E Stands for Exchange" },
      "Knowledge, experiences, and innovations gain greater meaning when they are shared. We have a responsibility to pass on what we have learned, including our successes and failures, to the next generation and to others who can benefit from our experiences.",
      "Thus, LIVE represents a continuous cycle: Learning, Ideation, Value Creation, and Exchange. It is a simple but fundamental principle: keep learning, keep thinking, turn ideas into value, and share what you learn with others. That is what it means to truly LIVE.",
    ],
    whatThisMeans:
      "Asked for the one principle he'd most want future generations to remember, he compresses his answer into a four-letter cycle, learning that leads to ideation, ideation that must become value, and value that only means something once exchanged with others.",
    whyItMatters:
      "\"An idea, unless acted upon, remains only an idea\" is the hinge of the whole cycle. Without it, learning and ideation alone would just be intellectual accumulation, LIVE insists each stage has to convert into the next or the cycle stalls.",
    reflect:
      "Where in your own LIVE cycle, learning, ideation, value creation, exchange, are you currently stuck, accumulating at one stage without moving to the next?",
  },
  {
    number: "09",
    title: "Doing What You Love and Loving What You Do",
    quote: [
      "I want to share a personal experience with you. It is not merely a story, but an actual event that occurred in my life. During my school years, particularly in class nine for the higher secondary board, my father wanted me to take up biology and become a doctor. At that time, opportunities were quite limited. His reasoning was simple: my elder brother had become an engineer, so I should pursue a career in medicine. Consequently, I enrolled in biology alongside physics and chemistry, among other subjects. After a year of study, I realised my interest in biology was limited, while I strongly liked mathematics.",
      "I approached my mathematics teacher to ask whether I could include mathematics alongside the other three science subjects. He expressed concerns about my ability to cope, given that I had not studied mathematics for a year. I asked for a chance to try, promising to drop the subject if I could not manage it. He agreed and convinced the principal to allow me to take mathematics as a fourth subject in Class 10. In the board exams, mathematics was the only subject in which I obtained a distinction. Subsequently, mathematics became a mandatory requirement for joining the Air Force.",
      "When I applied and cleared the selection process for the National Defence Academy, a second issue arose. My father questioned my desire to join the services. After I convinced him, he suggested I consider joining the Navy, arguing that his background in the Air Force and my brother's service in the Army meant all three services would be represented if I joined the Navy. However, my heart was set on the Air Force, so I chose that path. Later, my mother raised concerns about the risks of flying and advised me against it. I explained that if I joined the Air Force, I wanted to become a pilot. Subsequently, I began flying in the Air Force, and my aviation career grew from there.",
      "I share this story not to portray myself as a rebel against my parents. On the contrary, they understood and supported my feelings and aspirations. The key takeaway from this narrative is the importance of self-awareness, i.e. understanding your strengths, weaknesses, likes, and dislikes. Once you understand yourself clearly, you should follow your dreams. Everyone has aspirations; pursuing them is crucial. By doing so, the guiding principle of \"doing what you love and loving what you do\" naturally emerges. This approach lets you give your best effort to your pursuits and ultimately succeed. This is the core message I wish to convey through this story.",
    ],
    whatThisMeans:
      "Three separate moments in his youth, choosing mathematics over biology, choosing the Air Force over medicine or the Navy, choosing to fly despite his mother's worry, each required him to advocate for himself against a reasonable, well-intentioned expectation from someone he respected.",
    whyItMatters:
      "He's careful to frame this as self-awareness rather than rebellion, and to note his parents ultimately understood and supported him. The lesson isn't about defying family, it's about knowing yourself clearly enough to make the case for what you actually want.",
    reflect:
      "Is there a well-intentioned expectation from someone you respect that you've never actually made the case against, the way he did with his mathematics teacher and his father?",
  },
];

const takeaways = [
  {
    title: "Take the initiative and make the first move.",
    body: "Overcoming inertia is often the hardest part. Set ambitious goals while taking incremental steps toward them.",
  },
  {
    title: "Decision-making is both an art and a science.",
    body: "Seek counsel from trusted advisors, but the individual remains responsible for the final decision, regardless of how widely that counsel was sought.",
  },
  {
    title: "To go fast, go alone; to go far, go with your team.",
    body: "Maintain equal tyre pressure, keep alignment toward the shared goal, rotate tasks to prevent stagnation, balance resources against responsibility, and always have a spare wheel ready.",
  },
  {
    title: "Self-discipline is doing the right things when nobody is watching.",
    body: "It should hold across professional conduct, health, civic responsibility, manners, and financial discipline, not just at work.",
  },
  {
    title: "Prepare for an adversary's capability, not their current attitude.",
    body: "Attitudes can change overnight. Capabilities, once developed, persist and can be used regardless of intent.",
  },
  {
    title: "Do as I do, not as I say.",
    body: "People forget or doubt what you say. They always observe and trust what you do.",
  },
  {
    title: "LIVE: Learning, Ideation, Value Creation, Exchange.",
    body: "An idea, unless acted upon, remains only an idea. Value only means something once it's exchanged with others.",
  },
];

function QuoteBlock({ parts }: { parts: (string | { sub: string })[] }) {
  return (
    <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <p key={i} className="leading-relaxed">
            {part}
          </p>
        ) : (
          <p key={i} className="pt-2 text-sm font-bold uppercase tracking-wide text-neutral-900 underline decoration-2 underline-offset-4">
            {part.sub}
          </p>
        )
      )}
    </blockquote>
  );
}

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
        / Air Marshal Anil Khosla
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/khosla-portrait.jpg"
            alt="Air Marshal Anil Khosla"
            width={1039}
            height={1039}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Air Marshal Anil Khosla (Retd.) · Indian Air Force · Fighter Pilot · Former Vice Chief
          of the Air Staff
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 016
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Air Marshal Anil <em>Khosla</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          To Go Fast, Go Alone; to Go Far, Go With Your Team
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Four decades in the Indian Air Force · Operations Doklam &amp; Balakot · Air Officer
          Commanding, Ambala &amp; Jaisalmer
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Self-discipline is doing the right things when nobody is watching.&rdquo;
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
          <p className="font-medium">9 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">August 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Indian Air Force",
          "Fighter Pilot",
          "Vice Chief of the Air Staff",
          "Team Leadership",
          "Self-Discipline",
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
          &ldquo;We asked Air Marshal Anil Khosla eight questions, and one optional ninth. He
          answered from four decades in the cockpit, in command, and at the top of the Indian
          Air Force.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Air Marshal Anil Khosla (Retd.) served in the Indian Air Force for four decades,
          operating fighter aircraft, commanding two air bases at Ambala and Jaisalmer, and
          overseeing operations including Doklam and Balakot, before rising to Vice Chief of the
          Air Staff. Since retiring, he has written roughly 850 blog posts and runs a self-operated
          YouTube channel, alongside speaking at colleges, universities, and think tanks.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words, including the subheadings and structure he chose himself. This is how{" "}
          <em>Stated Principles</em> works: the person states their beliefs. We make them visible.
          You decide what to carry forward.
        </p>
      </section>

      {/* Principles */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Nine principles · Stated by Air Marshal Anil Khosla
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p, idx) => (
            <div key={p.number}>
              <article className="border-t border-neutral-200 pt-10">
                <p className="text-sm text-neutral-400">{p.number} of 09</p>
                <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

                <QuoteBlock parts={p.quote} />

                <p className="mt-3 text-sm text-neutral-500">
                  — Air Marshal Anil Khosla, stated directly
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

              {idx === 2 && (
                <div className="mt-20 border-t border-neutral-200 pt-16 text-center">
                  <p className="text-3xl font-serif leading-snug">
                    &ldquo;Praise loudly,
                    <br />
                    <em>blame softly.</em>&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    Air Marshal Anil Khosla — Principle III, Stated
                  </p>
                </div>
              )}

              {idx === 5 && (
                <div className="mt-20 border-t border-neutral-200 pt-16 text-center">
                  <p className="text-3xl font-serif leading-snug">
                    &ldquo;Do as I do,
                    <br />
                    <em>rather than do as I say.</em>&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    Air Marshal Anil Khosla — Principle VI, Stated
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
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
          Post a commitment inspired by Air Marshal Anil Khosla&apos;s principles. State it
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
        <p className="mt-4 text-sm text-neutral-500">15 min read · 9 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
