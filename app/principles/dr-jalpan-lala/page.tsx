import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "dr-jalpan-lala";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Dr. (Hon) Jalpan Lala — Don't Spend Your Life Proving You Are Capable";
const DESCRIPTION =
  "Spend it building a life that proves it for you. Twenty principles on branding, authenticity, and ambition without apology.";
const IMAGE = "https://app.stated.in/jalpan-portrait.jpg";

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
    images: [{ url: IMAGE, width: 452, height: 452, alt: "Dr. (Hon) Jalpan Lala" }],
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
    title: "Curiosity Bridges Gaps",
    quote: [
      "Before personal branding became part of my vocabulary, I wanted to be a teacher. I actually started my career as a pre-primary teacher and later taught higher-secondary students. I enjoyed teaching, shaping and helping people understand things differently.",
      "Since childhood, I have always been curious and a bit of a chatterbox. I loved making friends, having conversations and connecting with people. I think I naturally tried to bridge gaps. And if someone ever told me, \"This is not for you,\" I usually wanted to prove that it could be.",
      "I have always been open to learning and exploring. My journey took me through teaching, business, writing, NLP, hypnosis, spiritual healing, counselling and later branding. I never wanted to be defined by one title. For me, the work and the problem I could solve were always more important than the designation.",
      "My work with women after COVID brought another side of me forward. I started helping women learn, earn and become more confident. And honestly, every time I saw a woman transform, it gave me more strength and motivation to keep doing it.",
      "Looking back, I don't think I was consciously building a brand. I was simply trying to learn, evolve, connect people and make a difference wherever I could.",
    ],
    whatThisMeans:
      "Long before branding was part of her vocabulary, the through-line was already visible: curiosity, a refusal to be defined by one title, and an instinct to prove people wrong who told her something wasn't for her.",
    whyItMatters:
      "She names the work and the problem solved, not the designation, as what actually mattered across teaching, business, writing, NLP, healing, and branding. That ordering is the reason none of those pivots reads as inconsistency.",
    reflect:
      "Has someone ever told you \"this is not for you\"? Did it stop you, or did it become the thing you set out to prove wrong?",
  },
  {
    number: "02",
    title: "Let Your Behaviour Make the Introduction",
    quote: [
      "I believe a person's real character should be discoverable without them having to announce it.",
      "Don't just listen to what someone says about being trustworthy, caring or respectful. Watch how they behave with people who cannot benefit them, how they react when things don't go their way, whether they keep their word, and whether they remain the same person when there is nothing to gain.",
      "For me, even small things reveal a lot. If someone suddenly goes quiet, I naturally call and ask if everything is alright. If someone is junior to me, I still respect their work and their dignity. If I cannot deliver something, I prefer to say it directly rather than create a false expectation.",
      "I have also learned that care and boundaries have to coexist. Being approachable does not mean allowing people to cross lines, and being kind does not mean accepting disrespect.",
      "So I would tell people: don't build your reputation by telling people who you are. Let your behaviour make the introduction for you.",
    ],
    whatThisMeans:
      "Her test for character isn't what someone claims about themselves, it's how they treat people who can't benefit them, and whether they stay the same person when there's nothing to gain from the performance.",
    whyItMatters:
      "Pairing care with boundaries in the same breath, being approachable isn't the same as letting people cross lines, keeps this from reading as simple niceness. Kindness and firmness are treated as compatible, not opposites.",
    reflect:
      "Think of someone whose character you trust. Did you come to that conclusion because of what they told you about themselves, or because of how they acted when it didn't benefit them?",
  },
  {
    number: "03",
    title: "Personal Branding Is Presenting Yourself Well; Authenticity Is Living With Yourself After",
    quote: [
      "For me, authenticity is when my mind, body and commitment are aligned in the same direction, with humbleness, without ego and with respect for others.",
      "I have experienced the importance of this very practically throughout my work. When I was in insurance claims investigation, there were opportunities to compromise my ethics, but I never changed an investigation report for money or pressure. Even when there were threats, I stood by what I had found and believed was right. Eventually, I had to move away from that field, especially because I had a family and children to consider.",
      "Even today, I have had situations where I could have compromised my principles simply to continue a relationship, association or opportunity. I chose not to. I have realised that an opportunity which requires me to compromise who I am is not really an opportunity for me.",
      "I can adapt, learn, negotiate and even change my approach, but I don't change my principles to fit into a person, a room or an opportunity.",
      "That is probably what makes me feel good about myself.",
      "For me, personal branding is about presenting yourself well; authenticity is about being able to live with yourself when the presentation is over.",
    ],
    whatThisMeans:
      "Standing firm on an investigation report despite threats, and eventually leaving that field partly because of it, is the concrete cost behind an otherwise abstract principle. Authenticity here isn't a personality trait, it's a decision that was tested and held under real pressure.",
    whyItMatters:
      "\"An opportunity which requires me to compromise who I am is not really an opportunity for me\" redefines opportunity itself, not every open door counts as one, if walking through it costs her the thing she's actually trying to build.",
    reflect:
      "Is there something currently being offered to you that would require a small compromise of who you are to accept? What would you call it instead of an opportunity?",
  },
  {
    number: "04",
    title: "When All the Titles Disappear, I Would Still Want to Be Jalpan",
    quote: [
      "OG me, I live that every day when I am not working. Besides every title, my favourite one is Mom of my kids.",
      "Even without my designations, organisations or achievements, I think people would still see a woman enjoying life through small happiness and small gestures, while helping others grow.",
      "They would probably also see me in my raw and slightly sassy way, a woman who minds her own business, earns her own money, takes care of her responsibilities and doesn't feel the need to explain herself to everyone.",
      "I would want people to remember that I lived life on my own terms, helped people grow wherever I could, and remained myself while doing it.",
      "Because when all the titles disappear, I would still want to be Jalpan, not a designation.",
    ],
    whatThisMeans:
      "Asked what would remain if every title, award, and organisation vanished tomorrow, she doesn't reach for a polished legacy statement. She reaches for something plainer: a woman who minds her own business, earns her own money, and doesn't explain herself to everyone.",
    whyItMatters:
      "Naming \"Mom of my kids\" as her favourite title, ahead of any professional one, alongside a clear-eyed insistence on financial and personal independence, holds both without treating them as in tension.",
    reflect:
      "If every title and achievement disappeared from your own profile tomorrow, what would people still say they saw in you?",
  },
  {
    number: "05",
    title: "What Is Your Romance With Your Product?",
    quote: [
      "I think the biggest misunderstanding about personal branding is that people start treating themselves like a celebrity of their product or business. They focus on the outside, appearance, big flexes, reels and visibility, without first building the real foundation underneath.",
      "Everyone wants the best and brightest white shirt, without understanding whether their own shirt is cotton, linen or silk. They all reflect white, but each has its own quality, texture and character. The problem starts when we try to make everyone look the same.",
      "I also see people connecting everything to social media. They create reels without understanding whether the content actually represents their business, and sometimes keep forwarding superficial content to others. In trying to become visible, they can actually become irritating, create wrong expectations or even spread a message that their business cannot deliver. That ultimately damages credibility instead of building it.",
      "And followers are not the same as visibility. Someone with fewer followers can have far greater meaningful visibility than someone with thousands.",
      "For me, visibility comes later. The first question should be: What is your romance with your product or business? How well do you know it? Why do you want to do it? What problem are you trying to solve? And how are you actually going to do it?",
      "Once that foundation is clear, then comes positioning, classification, communication and visibility.",
      "Don't start by asking, \"How do I become visible?\" Start by asking, \"What am I actually bringing to the world, and why should anyone believe me?\"",
    ],
    whatThisMeans:
      "Her white-shirt analogy, everyone wanting the same brightest shirt without knowing whether their own is cotton, linen, or silk, captures the exact mistake she sees repeatedly: chasing a uniform kind of visibility instead of understanding your own actual texture and character first.",
    whyItMatters:
      "\"Followers are not the same as visibility\" cuts against a metric everyone defaults to. Real credibility, in her account, can exist with a small audience and be entirely absent from a large one.",
    reflect:
      "If someone asked you right now what your romance with your own work actually is, would your answer be clear, or would it default to talking about visibility instead?",
  },
];

const principlesPart2 = [
  {
    number: "06",
    title: "What Can the World Be Better Off Having Because I Exist?",
    quote: [
      "I think in the early stages, every entrepreneur naturally looks at people who have already made it and thinks, \"This is how it happens.\" That is human psychology. I don't see imitation at the beginning as wrong. The problem starts when imitation becomes copying and you stop discovering your own identity.",
      "For me, the shift from \"How do I compete globally?\" to \"What can I uniquely contribute to the world?\" is a shift from comparison to contribution.",
      "My approach to business has always been around the 3 Ps, Planet, People and Profit. Profit is necessary for a business to survive and grow, but I don't believe it should be the only measure of success. What we create should also consider the people involved and the planet we leave behind.",
      "I believe Indian entrepreneurs have enormous potential to contribute globally, but we don't have to become a western version of ourselves to do that. We need to understand what is genuinely ours, our knowledge, resourcefulness, experiences, culture, skills and ways of solving problems, and then give it global quality and relevance.",
      "To me, global positioning is therefore not about looking global. It is about becoming valuable beyond your geography.",
      "And perhaps the bigger question an entrepreneur should ask is not \"How can I be better than them?\" but \"What can the world be better off having because I exist?\"",
    ],
    whatThisMeans:
      "She draws a line between imitation, which she considers a natural, harmless starting point, and copying, which is where identity actually gets lost. The distinction is whether you're still discovering yourself while learning from others, or have simply stopped.",
    whyItMatters:
      "\"We don't have to become a western version of ourselves\" to contribute globally rejects a common assumption that global relevance requires cultural translation. Her answer is the opposite: global quality applied to what's genuinely yours, not a substitute for it.",
    reflect:
      "Are you currently trying to be better than a competitor, or asking what the world would be better off having because you specifically exist?",
  },
  {
    number: "07",
    title: "Create a Garden, Let the Butterflies Come to You",
    quote: [
      "I have learned that men and women are different, and I don't think we need to keep comparing them. Men may naturally bring protective capabilities, while women often bring nurturing capabilities. Both have their own strengths, and neither needs to become the other to succeed.",
      "When I am doing business, I don't see myself as a \"woman entrepreneur\" first. I see the entrepreneur in me. Saying \"I can earn\" does not mean I stop being a woman, a mother or a nurturing person. One of the biggest conflicts women face is trying to prove that ambition means giving up their nurturing responsibilities. It doesn't.",
      "I have personally experienced being unheard simply because I was a woman. I have even been advised by people in positions of authority to focus on cultural businesses for women rather than corporate sectors. Honestly, I took that as a challenge. I am grateful for those experiences because they pushed me towards where I am today.",
      "I never wanted to prove that I could be like a man. I simply focused on my work, my ethics and what I could contribute. If one door was closed, I looked for another, or created one.",
      "I have learned not to chase acceptance or validation. If you chase a butterfly, it flies away. Create a beautiful garden and let the butterflies come to you.",
      "Leadership books often talk about success. My experience taught me something different: make mistakes, because sometimes a mistake forces you to discover a solution that success would never have made you look for. I don't see failure as the opposite of success; I see it as another door that some people are willing to find.",
      "And whether you are a man or a woman, whatever you choose to build, be responsible, be conscious and own your choices.",
      "That, to me, is navigating the room, not asking the room to change for you, and not changing yourself to belong in it.",
    ],
    whatThisMeans:
      "Told to focus on \"cultural businesses for women\" rather than corporate sectors, she took it as a challenge rather than a boundary. She's careful not to frame her response as proving she could be like a man, but as simply focusing on her own work and ethics.",
    whyItMatters:
      "The butterfly and garden image reframes chasing validation as counterproductive by nature, not just tiring. You don't catch acceptance by pursuing it harder; you build something worth being drawn to.",
    reflect:
      "Where in your own life are you currently chasing a butterfly, validation or acceptance, rather than building the garden that would draw it to you naturally?",
  },
  {
    number: "08",
    title: "Ambition Says I Want to Do Something; Ego Wants the Result",
    quote: [
      "I believe everyone has the will to do something, but often not the clarity, what to do, how to do it, whether it will work, or whether it will be accepted. When you become clear about your purpose and decide that you are going to work towards it, that is where ambition begins for me.",
      "I also believe ambition can mean different things to different people. It can be about education, earning, building a business, family priorities, or simply creating a better life. There is nothing wrong with ambition as long as you don't forget your responsibilities towards your family, society or your workplace, and you don't take unethical shortcuts that hurt others.",
      "I am grateful that we are living through a transformational era for women in India, where there are far more opportunities and support systems available to women to start and grow. A woman can be deeply ambitious and still nurture her family, I experience that myself because I have a supportive environment at home.",
      "I have been asked to explain some of my choices too. But I learned to ask myself first: does this person actually hold the authority or proximity to ask me for an explanation? Will my explanation be understood and reviewed neutrally? If not, why should I give it?",
      "That became an important boundary for me. Not every person deserves access to every explanation.",
      "For me, ambition and ego are completely different. Ambition says, \"I want to do something, so I am willing to leave my comfort zone, accept responsibility, learn, research, update myself and keep working.\" Ego simply wants the result without necessarily accepting everything that comes with it.",
      "I don't believe we should sit and say \"I want this\" while disturbing everyone else's peace or making others responsible for our ambition. Work for it. Take responsibility. Set an example.",
      "And when you are clear about your purpose, don't keep looking outside for permission. Very often, the first person who can stop you is yourself.",
    ],
    whatThisMeans:
      "Her two questions before offering any explanation for a choice, does this person hold the authority or proximity to ask, and would the explanation actually be reviewed neutrally, turn a common social pressure into a deliberate boundary rather than an automatic obligation.",
    whyItMatters:
      "Her distinction between ambition and ego is precise and testable: ambition accepts everything that comes with the work, discomfort, responsibility, learning, while ego wants only the result. That's a harder standard than most definitions of healthy ambition offer.",
    reflect:
      "The next time you feel obligated to explain a choice, ask her two questions first: does this person actually have the authority or proximity to ask, and will the explanation be heard neutrally?",
  },
  {
    number: "09",
    title: "The Courage to Make Your Own Choice",
    quote: [
      "I don't particularly look at my journey as a series of dramatic \"No's.\" For me, life and work have always been about making choices according to the situation I was in at that point.",
      "Whether I say yes or no, it is my decision, and I take responsibility for it. Sometimes it works, sometimes it doesn't. If it doesn't, I don't consider it a failure, I learn from it and make a better choice the next time.",
      "There have been opportunities I have walked away from because they did not fit my circumstances, principles or direction. But I don't believe every decision needs to be justified to the world. I evaluate, decide and move forward.",
      "I have also never believed that learning from someone means losing your identity. I remain open to learning, even from competitors. If they are doing something better, there is something to learn. There is nothing wrong with that.",
      "Over time, these choices have allowed me to keep reinventing myself instead of becoming stuck in one direction. Teaching led me elsewhere, business exposed me to new possibilities, insurance taught me ethics and problem-solving, and later experiences opened doors into mentoring, branding and global work.",
      "So for me, the real lesson is not about the price of saying \"No.\"",
      "It is about having the courage to make your own choice, the responsibility to own its outcome, and the openness to learn from it.",
      "Then you simply make your next choice better, and keep moving.",
    ],
    whatThisMeans:
      "Asked about the price of saying no, she rejects the framing itself. Her career wasn't built on dramatic refusals, it was built on ordinary choices made according to circumstance, each one owned regardless of outcome.",
    whyItMatters:
      "Remaining open to learning even from competitors, without treating it as a threat to her own identity, is a quieter form of confidence than most people manage. Learning from a rival doesn't cost her anything, in her account, because her identity was never dependent on being the only source of good ideas.",
    reflect:
      "Is there something a competitor or rival does better than you, that you've avoided learning from because it felt like it would cost you something?",
  },
  {
    number: "10",
    title: "It's Not Who Sees You Enter the Room. It's the Impression You Leave Walking Out",
    quote: [
      "Honestly, I don't remember a room where people immediately recognised me. Why would they? A big room has many people, and everyone is at a different level.",
      "Earlier, I would feel frustrated and wonder, \"Why aren't they seeing or hearing me?\" I tried proving myself, explaining myself, even observing how others created their presence. None of it really worked.",
      "Then I asked myself a very simple question: why do I want them to see me or hear me?",
      "My work should do that.",
      "That changed something in me. I stopped chasing recognition and started focusing on what I could actually contribute.",
      "I believe it is not important who knows you when you enter a room. I have always believed it is more important what impression you leave when you walk out.",
      "That impression doesn't have to come from a designation or an introduction. It can come from your intent, your clarity, your conduct, your knowledge or simply the value you added to that room.",
      "That is also how I look at my journey into HBL ATRIUM. Nobody handed me a ready-made path. I had a clear intent, I found my way, HBL recognised it, and Hendrick's leadership helped guide that vision globally.",
      "So today, I don't enter a room trying to establish that I belong there. I enter to contribute something meaningful enough to be remembered after I leave.",
      "For me, that is presence.",
    ],
    whatThisMeans:
      "The turning point wasn't a single room where she finally felt recognized, it was a question that made the whole pursuit of recognition beside the point: why do I want them to see me or hear me? My work should do that.",
    whyItMatters:
      "Redefining presence as the impression left walking out, rather than the reception on walking in, shifts the entire goal from managing how you're perceived on arrival to what you actually contribute while there.",
    reflect:
      "In the last room you walked into feeling unnoticed, were you trying to establish that you belonged, or trying to contribute something worth remembering?",
  },
];

const principlesPart3 = [
  {
    number: "11",
    title: "I Never Really Changed Who I Was. I Explored More of Who I Was",
    quote: [
      "I don't think I ever completely left one version of myself behind. I kept evolving.",
      "What I had to leave behind were some of my bookish perceptions, my comfort zone, my idea of having enough time for parties, fun and even sometimes the luxury of taking proper recovery time when I was unwell. As life and responsibilities grew, I had to learn how to manage my time differently.",
      "When I was new to things, I did hesitate. But gradually I became more honest with myself and more original about what I knew and what I didn't know. Clarity became my strength. I learned to meet the right people, have the right conversations and speak openly when something needed to be discussed. There should not be unnecessary fear.",
      "As I evolved, I also became more comfortable acknowledging my weaknesses while embracing my talents. I continued meeting people with the same respect, regardless of their position or work, listening to their problems with empathy and trying to find solutions.",
      "What I consciously never changed was my ethics, my principles and my respect for people.",
      "I don't believe reinvention means becoming a different person every time life changes. Sometimes you simply move to the next level. And then perhaps you repeat that level until you are ready for the next one.",
      "\"Darr ke aage result hai!\" (There is a result beyond fear.), haha, that's probably my version of reinvention.",
      "I never really changed who I was. I explored more of who I was.",
    ],
    whatThisMeans:
      "What she describes leaving behind isn't identity, it's bookish perceptions, comfort-zone habits, and time she used to have for things that no longer fit her responsibilities. What she names as unchanged, ethics, principles, respect for people, is the actual core.",
    whyItMatters:
      "\"Sometimes you simply move to the next level. And then perhaps you repeat that level until you are ready for the next one\" pushes back against the idea that growth is always visible or linear. Repetition, in her account, is part of the process, not a failure to progress.",
    reflect:
      "What have you actually left behind as you've grown, habits and comfort, or something closer to your actual principles? Be honest about which one it really was.",
  },
  {
    number: "12",
    title: "First the Why. Then the How.",
    quote: [
      "Before I let anyone spend a single rupee on branding, I want to understand their intent first.",
      "In my conversations, I ask questions around \"why\". I keep going deeper into the why until the how starts becoming clear.",
      "Why do you want to build this business? Why this product? Why this audience? Why do you want visibility?",
      "Because for me, before you build a brand, you need to have a romance with your business. You need to genuinely know it, understand it, believe in it and enjoy what you are building. If that romance isn't there, no amount of marketing can create a lasting relationship between your brand and its audience.",
      "If I feel someone simply wants to build a brand for flexing or showing off, I would rather ask them to pause and reflect before spending money on logos, websites or social media.",
      "For me, branding doesn't begin with what people see. It begins with what the entrepreneur believes, why they are doing it and whether they can genuinely deliver what they want people to believe.",
      "Once that clarity is there, then we decide how to communicate it.",
      "First the WHY. Then the HOW. The visible brand comes much later.",
    ],
    whatThisMeans:
      "Her first real branding decision has nothing to do with logos, colours, or a website, it's a repeated, deepening question of why, asked until the how starts to become clear on its own.",
    whyItMatters:
      "She's willing to actively discourage a client from spending money on branding, if the underlying reason is flexing or showing off rather than a real romance with the business. That's a rare thing for someone in her field to say against her own short-term financial interest.",
    reflect:
      "If someone kept asking you why, about your current work or a project you're building, how many layers deep would you get before the answer became genuinely clear?",
  },
  {
    number: "13",
    title: "No One Can Replace You Yourself",
    quote: [
      "No one can replace you yourself.",
      "You can outsource design, marketing, communication, technology and even parts of your strategy. But you cannot outsource what you personally bring to the business, your behaviour, your quality, your values and the experience you create through your product or service.",
      "An agency can communicate your brand, but it cannot become you.",
      "I also strongly believe that other people's time and energy are as valuable as ours. If someone gives me their time, attention or trust, I feel responsible for giving them the best value I can, not wasting their time with something superficial or something that doesn't genuinely serve a purpose.",
      "People may first come to you because of your marketing, but they stay because of the experience, trust and quality they receive.",
      "That is why the most important part of a brand must remain deeply personal to the founder.",
      "Your business may have many hands working on it, but the experience you promise, the value you deliver and the credibility you build must still carry your signature.",
      "That, for me, is what cannot be outsourced.",
    ],
    whatThisMeans:
      "She separates what marketing gets someone in the door from what actually keeps them there. An agency can communicate a brand's message, but the experience, trust, and quality behind it have to come from the founder directly, every time.",
    whyItMatters:
      "Treating other people's time as equally valuable to her own, and feeling responsible for not wasting it with anything superficial, is the practical version of the principle, not a slogan but a standard she applies to every interaction.",
    reflect:
      "In your own work, what's the part that genuinely can't be outsourced, the thing that has to carry your signature no matter how many hands are involved?",
  },
  {
    number: "14",
    title: "Challenge the Problem, Not the Dignity of the Person",
    quote: [
      "I have never told people to hear me. I am heard because I lead with what I have to say.",
      "Sometimes, when you speak about a real challenge, you realise that your voice is also carrying the voice of many women who want to speak but may not yet have found the space or confidence to do so. People relate to that authenticity.",
      "I have learned that what you speak matters, but how you speak matters just as much.",
      "Influence is not about demanding attention or using authority. It is about bringing the real issue to the table, driving the conversation forward and still respecting the people sitting across from you. Challenge the problem, not the dignity of the person.",
      "I also believe in knowing how much to speak and when to stop. Being heard doesn't mean speaking the most. Sometimes one clear, relevant thought has more influence than a long explanation.",
      "For me, influence without authority is therefore not about being authoritative or demanding.",
      "It is about clarity, relevance, courage and the way you carry your words.",
      "When people hear the thought, relate to it and choose to act on it, not because they were instructed to, but because they found meaning in it, that, to me, is real influence.",
    ],
    whatThisMeans:
      "\"Challenge the problem, not the dignity of the person\" is the operating rule underneath everything else she says about influence, driving a real issue forward without ever needing to diminish the person on the other side of it.",
    whyItMatters:
      "\"Being heard doesn't mean speaking the most\" cuts against a common assumption that influence requires volume or persistence. One clear, relevant thought, in her account, does more work than a long explanation.",
    reflect:
      "In your last disagreement with someone, did you challenge the actual problem, or did the person's dignity become collateral in making your point?",
  },
  {
    number: "15",
    title: "I Am Simply Trying to Live an Extraordinary Life in My Own Way",
    quote: [
      "Behind all the titles, work and professional identities, I am a simple human being.",
      "I believe in staying within the laws of nature, respecting people and situations for what they are, and enjoying life along the way.",
      "I enjoy small happiness, good conversations, humour, relationships and simply being myself. I don't think every part of life needs to become a professional achievement or a public story.",
      "Perhaps the part my professional profile doesn't reveal enough is that I am not trying to become someone extraordinary. I am simply trying to live an extraordinary life in my own way, while remaining a human being first.",
      "That balance of ambition and simplicity, purpose and enjoyment, strength and humanity is probably the real Jalpan behind the professional identity.",
    ],
    whatThisMeans:
      "She draws a subtle but real distinction between trying to become someone extraordinary, an identity built for external recognition, and trying to live an extraordinary life in her own way, which requires no audience at all.",
    whyItMatters:
      "\"I don't think every part of life needs to become a professional achievement or a public story\" is a quiet boundary in an era that often pressures people to narrate everything, including their private enjoyment, as content.",
    reflect:
      "Is there a part of your own life you've started treating as a public story or achievement, that used to just be something you privately enjoyed?",
  },
];

const principlesPart4 = [
  {
    number: "16",
    title: "I Developed a Romance With My Failures",
    quote: [
      "I don't say this to boast, but I have rarely achieved anything at the first attempt. I have made mistakes, taken wrong decisions and learnt through experiences that didn't work.",
      "When I was in Nairobi, for example, I crossed my credit-sales limits based on trust and suffered significant financial losses between 2011 and 2013. One very practical lesson stayed with me from that experience: today, my businesses work on advance payments. Hahaha.",
      "But there were many such lessons.",
      "I eventually stopped looking at these experiences as failures that needed to frustrate me. I developed a kind of romance with my failures. Each one made me look at things differently, explore another possibility and find a new way towards success.",
      "Success taught me what worked.",
      "Failure taught me why it didn't work, and what I could do differently.",
      "So today, I don't carry frustration or haste when something doesn't work. I carry the will to keep exploring, learning and trying another way.",
      "For me, there is nothing wrong with not succeeding at the first attempt.",
      "You learn. You adapt. You try again. And sometimes the failed attempt becomes the reason you eventually find your own way to success.",
    ],
    whatThisMeans:
      "The Nairobi credit-sales loss between 2011 and 2013 is a specific, real financial setback, not an abstract lesson. What she kept from it is equally concrete: her businesses now run on advance payments, a direct operational change traceable to that failure.",
    whyItMatters:
      "\"Success taught me what worked. Failure taught me why it didn't work, and what I could do differently\" separates two kinds of learning that success alone can't provide. Success confirms; failure explains.",
    reflect:
      "What operational or personal change in your own life can you trace directly back to a specific failure, the way she traces advance payments back to Nairobi?",
  },
  {
    number: "17",
    title: "The Responsibility to Become That Person for Someone Else Someday",
    quote: [
      "My journey has never been built alone. There are people who changed my trajectory in very different ways.",
      "Harshvardhan, Harsh, was my first corporate mentor. He didn't simply encourage me; he challenged me. His criticism pushed me to look at myself differently, improve and build myself stronger. I carry that lesson even today: the right criticism can build you, if you are willing to listen.",
      "Dr. Pravin Parmar, Founder of Peers Global, gave me an opportunity through his Greenpreneur platform and later Fempreneur. That became an important turning point. It was where some of my work started receiving public recognition, including magazine features and other recognitions. It gave my work a platform and, perhaps more importantly, gave me the confidence to keep going.",
      "I am also grateful to the people who told me I couldn't. They probably don't realise it, but they gave me another kind of fuel. Every \"you can't\" made me explore another \"how can I?\"",
      "And then there is Hendrick Henningson, who believed in the concept of HBL ATRIUM and trusted me with the HBL platform. That belief allowed an idea I carried to find a larger, global direction.",
      "Alongside them, my family and Gurus have shaped much of who I am, responsibility, business vision, dedication, continuous learning and spiritual evolution.",
      "I actually keep a diary where I write people's names and something good I have learnt from them. It could be something I want to follow, something I admire, or simply something that made me think.",
      "I don't believe only great people teach us great lessons. If you remain open to learning, every person, and sometimes even an ant, can teach you something.",
      "What I carry forward is not just gratitude for the people who helped me. It is the responsibility to become that person for someone else someday.",
    ],
    whatThisMeans:
      "She names people across every category, a mentor who challenged rather than flattered her, a platform-builder who gave her a public start, people who told her she couldn't, and family and gurus, as having genuinely shaped her trajectory, gratitude extended even to the ones who doubted her.",
    whyItMatters:
      "Keeping an actual diary of names and specific lessons learned from each person is a concrete practice, not a sentiment. It's gratitude structured as a discipline she returns to, not a feeling she mentions once.",
    reflect:
      "If you kept a diary like hers, one name and one specific lesson at a time, who would the next entry be, and what would you write that you learned from them?",
  },
  {
    number: "18",
    title: "If You Were Unable to Climb, Create a Ladder",
    quote: [
      "If someone discovers my work twenty years from now, I would want them to understand that a meaningful professional life is not only about what you achieve for yourself, but also about what you make possible for others.",
      "Nothing can heal better than time, and no one can heal better than emotional touch. So be the person you are, respect the life you have, and create possibilities for helping others.",
      "If you were unable to climb, create a ladder, not only for yourself, but for those who can use it to climb ahead.",
      "Keep your intentions simple and clear. Be constructively visionary. Keep learning, keep evolving and do your efforts responsibly.",
      "I have learnt that life doesn't always give you the perfect circumstances, the right opportunity or an open door. Sometimes you have to create the possibility yourself, and then leave that possibility open for someone else too.",
      "For me, legacy is not about how many people remember my name.",
      "It is about how many people found a way forward because I left something behind that helped them climb.",
    ],
    whatThisMeans:
      "\"If you were unable to climb, create a ladder\" turns a personal limitation into something built for others rather than something merely overcome. The ladder outlasts the specific climb it was originally meant for.",
    whyItMatters:
      "Her definition of legacy explicitly rejects being remembered by name as the measure. The measure instead is how many people found a way forward because of something she left behind, whether or not they ever knew it was her.",
    reflect:
      "Is there a ladder you built for yourself out of necessity, that you could now leave in place for someone else to climb?",
  },
  {
    number: "19",
    title: "Don't Spend Your Life Proving You Are Capable",
    quote: [
      "Ohhh... 25 is still too young to have everything figured out! Hahaha.",
      "Live your life for you. Love yourself, understand yourself and start building your own financial independence. No one else is going to earn your life for you.",
      "Make attempts. Make mistakes. Learn. Make more attempts. Build your own highway through your work and career.",
      "And yes, keep making mistakes ahead, but make sure you have filled your pockets with experience, wisdom and some financial independence along the way! Hahaha.",
      "Don't wait for everyone's approval or validation before you begin. You will understand many things only after you start walking.",
      "Own your life responsibly. Respect your responsibilities, but don't forget that your life is yours to shape.",
      "And if I had to leave her with just one thought: don't spend your life proving that you are capable. Spend it building a life that proves it for you. — jalpanoholic",
    ],
    whatThisMeans:
      "Her advice to a 25-year-old doesn't promise clarity or certainty, it explicitly says 25 is too young to have everything figured out, and builds the advice around that uncertainty rather than pretending it away.",
    whyItMatters:
      "The closing line does real work: proving capability is a performance aimed at an audience; building a life that proves it is just living, with the evidence as a byproduct rather than the goal.",
    reflect:
      "Are you currently spending more energy trying to prove you're capable, or actually building the life that would make the proof unnecessary?",
  },
  {
    number: "20",
    title: "Don't Be Afraid to Outgrow Your Own Identity",
    quote: [
      "You have been a corporate professional, investigator, entrepreneur, homemaker, mother, writer, healer, mentor, speaker, women's advocate and now a global platform builder. What is the one inner quality that remained unchanged through every version of your life?",
      "And my answer for you would be: curiosity. I have never been able to stay in one version of myself for too long. Life kept introducing me to new situations, new people, new problems and new possibilities, and I kept learning.",
      "I learnt business from business, responsibility from family, resilience from failures, spirituality from my Gurus, innocence from my children, and sometimes the most unexpected lessons from people I never thought would teach me anything.",
      "I don't think my journey was ever a straight career path. It was more like a continuous exploration of who I could become without losing who I am.",
      "I made mistakes. I changed directions. I started again. I entered rooms where nobody knew me. I was sometimes underestimated, sometimes challenged and sometimes disappointed. But I never stopped exploring.",
      "Somewhere along the way, I realised I don't need to have everything figured out. I only need to remain open enough to learn, honest enough to accept myself and courageous enough to keep moving.",
      "I don't want a perfect life. I want a meaningful one, with work that matters, people who matter, responsibilities fulfilled, some madness, some laughter and enough freedom to remain myself.",
      "Perhaps that is the simplest way to describe me: perfectly imperfect. Still learning. Still becoming. Still me.",
      "And if there is anything I would want the next generation to take from my journey, it is this: don't be afraid to outgrow your own identity. You are allowed to become many versions of yourself, as long as every version remains authentically yours.",
    ],
    whatThisMeans:
      "Asked what one inner quality stayed constant across corporate professional, investigator, entrepreneur, homemaker, mother, writer, healer, mentor, and platform builder, her answer isn't any of the roles themselves. It's curiosity, the thing that kept moving her between them.",
    whyItMatters:
      "\"Perfectly imperfect. Still learning. Still becoming. Still me\" closes the entire twenty-question arc on the same note it opened with in Principle 1, an identity built on continuous exploration rather than a fixed destination ever being reached.",
    reflect:
      "Across every version of yourself you've been so far, what's the one quality that's actually stayed constant, the way curiosity has for her?",
  },
];

const takeaways = [
  {
    title: "Let your behaviour make the introduction, not your announcements.",
    body: "Watch how someone treats people who can't benefit them. That reveals more than anything they say about themselves.",
  },
  {
    title: "Personal branding is presenting yourself well; authenticity is living with yourself after.",
    body: "An opportunity that requires compromising who you are isn't really an opportunity.",
  },
  {
    title: "Before visibility, ask what your romance with your work actually is.",
    body: "Followers are not the same as visibility. Know your own texture and character before chasing a uniform kind of attention.",
  },
  {
    title: "Create a garden; let the butterflies come to you.",
    body: "Chasing validation makes it fly further away. Build something worth being drawn to instead.",
  },
  {
    title: "Ambition accepts everything that comes with the work. Ego only wants the result.",
    body: "Not every person deserves access to every explanation for your choices.",
  },
  {
    title: "It's not who sees you enter the room. It's the impression you leave walking out.",
    body: "Presence comes from intent, clarity, and the value you added, not from a designation or introduction.",
  },
  {
    title: "Don't spend your life proving you are capable. Spend it building a life that proves it for you.",
    body: "Proving is a performance for an audience. Building is just living, with the proof as a byproduct.",
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
        / Dr. (Hon) Jalpan Lala
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/jalpan-portrait.jpg"
            alt="Dr. (Hon) Jalpan Lala"
            width={452}
            height={452}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Dr. (Hon) Jalpan Lala · Global Branding Strategist · Founder, BrandBrews · VP, HBL
          Atrium
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 014
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Dr. (Hon) <em>Jalpan Lala</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Don&apos;t Spend Your Life Proving You Are Capable
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Global Branding Strategist · Founder, BrandBrews · VP, HBL Atrium · Teacher, Writer,
          Mentor &amp; Women&apos;s Advocate
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Spend it building a life that proves it for you.&rdquo;
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
          "Personal Branding",
          "Women in Business",
          "Entrepreneurship",
          "Authenticity",
          "Global Positioning",
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
        <blockquote className="mt-4 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Dr. Jalpan Lala twenty questions. She answered as a teacher, an
          investigator, an entrepreneur, a mother, and a global platform builder, all at
          once.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Dr. (Hon) Jalpan Lala is a Global Branding Strategist, the Founder of BrandBrews, and VP
          of HBL Atrium. Her path ran through teaching, insurance claims investigation, business,
          writing, NLP, spiritual healing, and counselling before arriving at branding, work she
          now applies to global positioning for entrepreneurs, alongside her ongoing focus on
          helping women learn, earn, and build financial independence.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what she stands for, stated publicly,
          in her own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles 1-5 */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Twenty principles · Stated by Dr. (Hon) Jalpan Lala
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
              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Jalpan Lala, stated directly
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
          &ldquo;If you chase a butterfly, it flies away.
          <br />
          <em>Create a beautiful garden and let the butterflies come to you.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Jalpan Lala — Principle VII, Stated
        </p>
      </section>

      {/* Principles 6-10 */}
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
              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Jalpan Lala, stated directly
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
          &ldquo;It&apos;s not who sees you enter the room.
          <br />
          <em>It&apos;s the impression you leave walking out.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Jalpan Lala — Principle X, Stated
        </p>
      </section>

      {/* Principles 11-15 */}
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
              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Jalpan Lala, stated directly
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
          &ldquo;I never really changed who I was.
          <br />
          <em>I explored more of who I was.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Jalpan Lala — Principle XI, Stated
        </p>
      </section>

      {/* Principles 16-20 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart4.map((p) => (
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
              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Jalpan Lala, stated directly
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
          &ldquo;Don&apos;t spend your life proving that you are capable.
          <br />
          <em>Spend it building a life that proves it for you.</em>&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Jalpan Lala — Principle XIX, Stated
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
          Post a commitment inspired by Dr. Jalpan Lala&apos;s principles. State it publicly —
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
        <p className="mt-4 text-sm text-neutral-500">18 min read · 20 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
