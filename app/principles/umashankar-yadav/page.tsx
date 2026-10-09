import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "umashankar-yadav";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Umashankar Yadav — Be Flexible in Your Approach, but Firm in Your Values";
const DESCRIPTION =
  "Stories make ideas human. Seventeen principles from a former Air Force professional turned entrepreneur, filmmaker, writer and founder of the Ahmedabad International Literature Festival.";
const IMAGE = "https://app.stated.in/yadav-portrait.jpg";
const TOTAL = 17;

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

type Seg = string | { b: string } | { i: string };
type Para = string | Seg[];
type Principle = {
  number: string;
  title: string;
  quote: Para[];
  whatThisMeans: string;
  whyItMatters: string;
  reflect: string;
};

const linkPill =
  "inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-600 hover:text-white";

function renderSeg(s: Seg, i: number) {
  if (typeof s === "string") return <span key={i}>{s}</span>;
  if ("b" in s)
    return (
      <strong key={i} className="font-semibold text-neutral-900">
        {s.b}
      </strong>
    );
  return <em key={i}>{s.i}</em>;
}

function PrincipleCard({ p, showCta }: { p: Principle; showCta?: boolean }) {
  return (
    <article className="border-t border-neutral-200 pt-10">
      <p className="text-sm text-neutral-400">
        {p.number} of {TOTAL}
      </p>
      <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

      <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
        {p.quote.map((para, i) => (
          <p key={i} className="leading-relaxed">
            {typeof para === "string" ? para : para.map(renderSeg)}
          </p>
        ))}
      </blockquote>
      <p className="mt-3 text-sm text-neutral-500">— Umashankar Yadav, stated directly</p>

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

      {showCta && (
        <a
          href="https://app.stated.in/signup"
          className="mt-8 inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:border-neutral-900"
        >
          Create a Commitment inspired by this
        </a>
      )}
    </article>
  );
}

const principles: Principle[] = [
  {
    "number": "01",
    "title": "I Am, in Many Ways, the Sum of All Those Experiences",
    "quote": [
      [
        {
          "b": "Everything I have experienced in my journey has taught me something. I believe I am, in many ways, the sum of all those experiences. The Indian Air Force taught me discipline, technology, responsibility and self-reliance. At a very young age, it taught me how to take care of myself, support my family and serve the nation with pride and a sense of purpose. Entrepreneurship taught me how to build—ideas, products, businesses and opportunities. It also gave me the financial independence to pursue the passions that were close to my heart. Literature made me more sensitive and observant. Cinema taught me collaboration and showed me how different people, talents and perspectives can come together to create something meaningful. And the Ahmedabad International Literature Festival taught me perhaps the most important lesson—that passion and purpose can come together to touch people's lives and contribute to society."
        }
      ],
      "I don't think any single experience made me who I am today. Each phase came at a different age, with different challenges, opportunities and aspirations. Each one added something to me. What remained constant was my desire to learn, to grow and to keep moving forward with a sense of purpose.",
      "So, when I look back, I don't see one defining chapter. I see a collection of experiences, each shaping the next. And perhaps that is what the journey really is—learning, evolving and becoming a little more complete with every phase of life."
    ],
    "whatThisMeans": "He credits no single defining chapter. Each phase, from the Air Force to the festival, added something different.",
    "whyItMatters": "The constant across every phase was the desire to learn, to grow and to keep moving forward with purpose.",
    "reflect": "Which phase of your own life taught you something the others could not?"
  },
  {
    "number": "02",
    "title": "I Would Rather Lose Something While Remaining True to Myself",
    "quote": [
      "I believe that, by nature, every human being has some degree of self-interest. I am no different. I have my own likes, dislikes, ambitions and opinions, and I am a fairly opinionated person. But I try to ensure that my opinions are guided by reason, experience and a clear sense of what I believe is right.",
      "With time, my personal interests have evolved into a larger sense of purpose. What matters to me personally is often connected to the larger interest of the people and society around me and ultimately to the nation. I have never been comfortable with partisan thinking. I value honesty, integrity and the intention of the people I work with and associate with.",
      "The larger purpose behind this way of thinking is to contribute, in whatever way I can, towards creating a better society for generations that will come after us.",
      "I have paid a price for holding on to these principles. At different points in my life, I have lost businesses, friendships and relationships because I was unwilling to compromise on certain values. But I have made peace with those losses. Because at the end of the day, I would rather lose something while remaining true to myself than gain something by compromising what I believe in. These principles are not just ideas I talk about, but they are my lived experiences, core values and the way I have chosen to live my life.",
      "For me, purpose is ultimately finding a balance between what we want for ourselves and what we can contribute to the world around us. If my journey can make even a small difference to the society and leave something meaningful for future generations, that gives greater meaning to everything I do."
    ],
    "whatThisMeans": "He names the price of his values plainly: lost businesses, friendships and relationships.",
    "whyItMatters": "Purpose, for him, is a balance between what we want for ourselves and what we can contribute to the world around us.",
    "reflect": "What have you been unwilling to compromise on, and what has it cost you?"
  },
  {
    "number": "03",
    "title": "Not Just Another Festival",
    "quote": [
      "When we started Ahmedabad International Literature Festival in 2016, we never wanted to create just another festival. We wanted to create a space where people could come with curiosity and questions and go back with some answers, perhaps more questions, and maybe a new direction in life.",
      "For me, literature has never existed in isolation. I wanted it to have a conversation with young people and society—with journalism, cinema, art, culture and everything that influences the way we think and live. We were never obsessed with making AILF bigger. We wanted to make it deeper. We wanted people to participate, question, discuss, debate, deconstruct and contribute—not simply sit in an audience and consume content.",
      "I think over the years, AILF has stayed true to that idea. The love and trust people have given the festival has been incredibly encouraging.",
      "But the journey has also taught me that building a cultural institution is much more challenging than running a normal business. When you work with creative people, everyone comes with their own aspirations, expectations and ideas. And sometimes, even when your intentions are genuine, your resources don't allow you to fulfill everyone's expectations. That can be painful because you care deeply about the people and the platform.",
      "A cultural institution survives not only on resources but on passion, commitment and the ability to keep finding a way forward. There have been difficult moments, but the belief in what we are trying to create has kept me going.",
      "Today, AILF is no longer just a festival for me. It has become a part of my life. It has given me friendships, conversations, ideas and perspectives that I may never have encountered otherwise.",
      "And when I look back, I realise this was perhaps the life I was searching for all along—a life where my work allows me to meet people, exchange ideas, create conversations and, hopefully, make some small contributions to the society around me."
    ],
    "whatThisMeans": "AILF began in 2016 with one aim: to be deeper, not bigger, a place for participation rather than consumption.",
    "whyItMatters": "He is candid that a cultural institution is harder than a normal business, and that it survives on passion and commitment as much as resources.",
    "reflect": "Is what you are building designed to be bigger, or deeper?"
  },
  {
    "number": "04",
    "title": "Stories Make Ideas Human",
    "quote": [
      "I have always felt that facts and information are important, but by themselves they can remain abstract. They give us knowledge, but they do not always touch us. They tell us what happened, but they don't necessarily make us feel why it matters.",
      [
        {
          "b": "Stories have a different power. They make ideas human."
        }
      ],
      "I experienced this myself about two years ago.",
      "One day, a person I barely knew called me and said, \"Sir, I am in your city and would like to meet you.\" I invited him to my office. He came with his wife. During our conversation, he told me that he had written a story and screenplay and asked if he could narrate it to me.",
      "I listened. I liked the story.",
      "Then he said, \"If you support me, we can make a short film.\"",
      [
        "I had never planned to enter film production. But I thought about it for a moment. I had the resources; he had the story, the screenplay and the vision. So, I said, ",
        {
          "b": "\"Let's do it.\""
        }
      ],
      [
        "That simple conversation gave birth to ",
        {
          "b": "SERENE FILMS"
        },
        "."
      ],
      [
        "The film, ",
        {
          "i": "Sukhnath Mogra Ni Vaarta"
        },
        ", was made in Gujarati and has been running successfully on WAVES OTT for more than a year. The person who walked into my office that day was ",
        {
          "b": "Omkar Pethkar"
        },
        ". He later wrote the screenplay and directed our Hindi feature film ",
        {
          "b": "Drop Out"
        },
        ", which had a good theatrical run and subsequently reached a prestigious OTT platform."
      ],
      [
        "We later produced another short film, ",
        {
          "i": "Heer Aur Raanjha"
        },
        ", written and directed by ",
        {
          "b": "Tamal Dutta"
        },
        ", which is also streaming on WAVES OTT. We are now working on several more ambitious projects."
      ],
      "When I look back, I find the journey fascinating.",
      [
        {
          "b": "A film company was not born from a business plan. It was born from a story."
        }
      ],
      "And that, for me, is the power of storytelling.",
      "Data can inform us. Facts can educate us. But a story can make us feel. It can give a face to an idea, emotion to information and meaning to an experience.",
      [
        {
          "b": "Facts tell us what is happening. Stories help us understand why it matters."
        }
      ],
      "Facts can inform us. Ideas can challenge us. But stories can move us. And sometimes, a story does more than communicate an idea—it changes the direction of a life.",
      [
        {
          "b": "Perhaps that is the greatest power of a story: it can change not only the way we see the world, but sometimes the direction in which we choose to walk."
        }
      ]
    ],
    "whatThisMeans": "Serene Films began with a single conversation: a stranger, a screenplay and a willingness to say yes.",
    "whyItMatters": "For him, facts inform but stories make us feel why something matters.",
    "reflect": "What story has changed the direction in which you chose to walk?"
  },
  {
    "number": "05",
    "title": "Fearless in Thought, Responsible in Expression, Independent in Spirit",
    "quote": [
      [
        "I believe creativity should challenge minds, not target people. It should provoke thought, not provoke hatred",
        {
          "b": "."
        }
      ],
      "It should remain independent of activism. A creator may have convictions, but art should not become merely a vehicle for an agenda. The moment creativity loses its freedom to explore, question and interpret, it risks losing something essential to its very nature.",
      "Let creativity be fearless in thought, responsible in expression, and independent in spirit."
    ],
    "whatThisMeans": "Creativity should challenge minds without targeting people, and stay free of any agenda.",
    "whyItMatters": "Freedom to explore, question and interpret is, in his view, essential to the nature of art.",
    "reflect": "Where does your own work draw the line between provoking thought and provoking hatred?"
  }
];

const principlesPart2: Principle[] = [
  {
    "number": "06",
    "title": "Business with Dignity",
    "quote": [
      "For me, entrepreneurship has never been only about creating financial success for myself or the people around me. It is equally about creating value for the people and businesses we work with.",
      "One of my greatest satisfactions as an entrepreneur comes from seeing how the systems, technology and support we provided decades ago have helped our clients transform their businesses—making them more accurate, efficient and faster. When something we created years ago continues to make a difference in someone's business today, that gives me a sense of fulfilment that goes beyond financial success. We have always believed in standing by our clients and supporting them whenever they need us.",
      [
        "My simple principle is ",
        {
          "b": "\"Business with Dignity.\""
        }
      ],
      [
        "I tell my team and fellow entrepreneurs: ",
        {
          "b": "Be proud of what you do, regardless of the size or scale of your business."
        },
        " Every honest business contributes to an industry, creates value, supports livelihoods and, in its own way, contributes to the building of the nation."
      ],
      [
        {
          "b": "Entrepreneurship is not just about building a business. It is about building value, earning trust and leaving something better than you found it."
        }
      ]
    ],
    "whatThisMeans": "His measure of entrepreneurship is value created for clients, still working years later.",
    "whyItMatters": "Every honest business, whatever its size, supports livelihoods and builds the nation.",
    "reflect": "Would you be proud of your work if no one measured its size?"
  },
  {
    "number": "07",
    "title": "What We Are Able to Give Back",
    "quote": [
      "If something I create can outlive me and continue to have meaning for others, I would consider that my small contribution to the world.",
      [
        "We come into this world with nothing and eventually leave with nothing. Perhaps the real measure of our journey is not what we accumulate for ourselves, but ",
        {
          "b": "what we are able to give back while we are here."
        }
      ],
      [
        {
          "b": "My thought process is, \"I will try to make the world a little better than I found it.\""
        }
      ]
    ],
    "whatThisMeans": "He measures a life by what it gives back, not by what it accumulates.",
    "whyItMatters": "Lasting meaning for others is the only legacy he asks of his work.",
    "reflect": "What are you building that could outlive you?"
  },
  {
    "number": "08",
    "title": "Never Drop Out of Life",
    "quote": [
      [
        "In fact, my movie ",
        {
          "b": "Drop Out"
        },
        " is based on the same subject. I would advise the young generation:"
      ],
      [
        {
          "b": "Never drop out of life just because you could not follow the first plan."
        }
      ],
      "Life is not only about success. It is about discovering who you are, finding what gives your life meaning, and having the courage to begin again.",
      [
        {
          "b": "Be patient."
        },
        " Good things take time."
      ]
    ],
    "whatThisMeans": "His film Drop Out carries the same message he gives young people: a failed first plan is not the end.",
    "whyItMatters": "Life, he says, is about discovering who you are and having the courage to begin again.",
    "reflect": "What would you begin again if the first plan had not worked?"
  },
  {
    "number": "09",
    "title": "Development Should Not Make Us Less Human",
    "quote": [
      "The world is changing at an unprecedented pace and so is India. Technology, business, media and changing social behaviour have transformed the way we live, think and interact. While these changes have brought remarkable possibilities, they have also made us increasingly focused on the self—our success, our possessions, our opinions and our ambitions.",
      "In this race to achieve more, we sometimes forget the deeper essence of life and the human values that give it meaning. We seldom pause to reflect on a simple truth: everything is temporary—even life itself. Perhaps this forgetfulness has contributed to a growing impatience, aggression and insensitivity in society.",
      "This is where literature, cinema, art and cultural institutions have a responsibility far beyond entertainment. They must create spaces where people can pause, reflect, question, feel and reconnect with what makes us human. They can remind us of empathy, compassion, humility, relationships and the value of living together—not merely competing with one another.",
      "Progress should not come at the cost of sensitivity. Development should not make us less human.",
      [
        {
          "b": "Technology may shape the future, but culture must help humanity remain at its heart."
        }
      ]
    ],
    "whatThisMeans": "He sees culture's role as creating spaces to pause, reflect, question and feel.",
    "whyItMatters": "Rapid change has made us more focused on the self, and culture can remind us of empathy and humility.",
    "reflect": "When did you last pause, in the middle of a race to achieve more?"
  },
  {
    "number": "10",
    "title": "Agree to Disagree, to Move Forward Together",
    "quote": [
      "At the heart of it all, I believe human beings are fundamentally good. We may hold different beliefs, affiliations, ideologies and interests, and sometimes we may strongly defend the principles we believe in. That diversity is a natural part of society.",
      "What matters is that our personal beliefs and differences should not come in the way of our collective progress as a society and as a nation. We may disagree on many things, but there is a larger common aspiration that connects us: we all want a better life, a harmonious society and a stronger, more compassionate nation.",
      "Perhaps the maturity of a society lies not in making everyone think alike, but in creating the space for different people to think differently and still move forward together.",
      [
        {
          "b": "We must learn to agree to disagree—not to end the conversation, but to reach a meaningful and constructive outcome."
        }
      ],
      "Because ultimately, progress is not about proving that one side is right. It is about finding enough common ground for all of us to move forward."
    ],
    "whatThisMeans": "He starts from the belief that human beings are fundamentally good.",
    "whyItMatters": "A mature society makes space for different people to think differently and still move forward together.",
    "reflect": "Where could you look for common ground instead of proving yourself right?"
  }
];

const principlesPart3: Principle[] = [
  {
    "number": "11",
    "title": "You Can Never Be Certain of the Outcome",
    "quote": [
      [
        "One of the biggest lessons I have learnt through my journey in creativity is that, no matter how sincerely you work or how carefully you plan, ",
        {
          "b": "you can never be certain of the outcome."
        }
      ],
      [
        "I experienced this deeply while making ",
        {
          "i": "Drop Out"
        },
        ". During production and post-production, there were moments when things simply did not happen according to plan. The music was getting delayed, decisions were getting stuck, and there were times when I genuinely did not know what would happen next or what I could do about it. The most difficult part was knowing that I had done everything I could, yet some things were simply beyond my control."
      ],
      "Even before the film's OTT release, there was another period of uncertainty and helplessness. Waiting without knowing what the outcome would be was perhaps more difficult than the work itself.",
      "I have experienced something similar with the Ahmedabad International Literature Festival. In business, you can often work with numbers, systems and relatively predictable outcomes. But in creativity, you are dealing with people, emotions and responses. You may curate what you believe is a meaningful session, but you cannot be certain how the audience will receive it.",
      "That, perhaps, is both the difficulty and the beauty of creative work.",
      [
        {
          "b": "You can control your effort, your intention and the quality of your work—but you cannot control how the world will respond to it."
        }
      ],
      [
        "And perhaps creativity teaches us something that business sometimes does not: ",
        {
          "b": "to keep faith, remain patient and continue moving even when the outcome is uncertain."
        }
      ]
    ],
    "whatThisMeans": "He describes the helplessness of waiting during Drop Out, which he found harder than the work itself.",
    "whyItMatters": "In business you work with systems; in creativity you work with people, emotions and responses.",
    "reflect": "What are you waiting on that is beyond your control?"
  },
  {
    "number": "12",
    "title": "A Project May Have One Vision, but It Takes Many People",
    "quote": [
      "One thing that has worked well for me in my journey is giving people space and giving due credit for their contribution. I have learnt that every person involved in a project, whether big or small, has a role to play—and every process has its own importance.",
      "At the same time, I have to remain graceful with people and patient in every situation. In a collaborative project, one moment of arrogance, impatience or high-handedness from my side can sometimes jeopardise months of work.",
      "I have realised that leadership is not about being a boss. If I start behaving like one, collaboration can quickly break down. People need to feel respected, heard and valued.",
      "Every individual and every process also have the potential to influence the outcome. What may appear small or insignificant can sometimes create a major obstacle if it is ignored.",
      [
        {
          "b": "For me, successful collaboration is about respecting people, giving them space, acknowledging their contribution and staying patient—even when things do not go as planned."
        }
      ],
      "Because ultimately, a project may have one vision, but it takes many people to bring that vision to life."
    ],
    "whatThisMeans": "He names space and due credit as what makes collaboration work.",
    "whyItMatters": "Leadership, he says, is not about being a boss.",
    "reflect": "Who on your team deserves more space, or more credit?"
  },
  {
    "number": "13",
    "title": "Dignity, Integrity and Character",
    "quote": [
      "Dignity, Integrity and Character"
    ],
    "whatThisMeans": "These are his three non-negotiables.",
    "whyItMatters": "He holds to them even when compromising might make a project, relationship or opportunity easier.",
    "reflect": "What are your own non-negotiables?"
  },
  {
    "number": "14",
    "title": "Start With What You Have",
    "quote": [
      [
        {
          "b": "Start With What You Have"
        }
      ],
      [
        "To all the young creators and entrepreneurs, I would say: ",
        {
          "b": "start with what you have."
        },
        " Do not keep waiting for the perfect opportunity, perfect resources or perfect circumstances. They may never arrive exactly as you imagine them."
      ],
      "Begin with whatever is available to you, take the first step and keep moving. When you genuinely believe in what you are doing and remain committed to it, support often comes from unexpected places and unexpected people.",
      [
        "I have also learnt that ",
        {
          "b": "not taking a risk can sometimes be the biggest risk in life."
        },
        " Of course, every risk must be considered thoughtfully, but fear of failure should not stop us from trying."
      ],
      "You may not know where the journey will take you. You only need enough courage to begin.",
      [
        {
          "b": "Start with what you have. Believe in what you are doing. Take the risk. The journey will teach you the rest."
        }
      ]
    ],
    "whatThisMeans": "His advice to young creators is to stop waiting for perfect circumstances.",
    "whyItMatters": "Not taking a risk can sometimes be the biggest risk in life.",
    "reflect": "What first step could you take this week with only what you have?"
  },
  {
    "number": "15",
    "title": "Be Flexible in Your Approach, but Firm in Your Values",
    "quote": [
      [
        {
          "b": "Never compromise on your core values."
        }
      ],
      "You may change your plans, your methods, your profession or even your direction in life. You may have to adapt, negotiate and make compromises along the way. But do not compromise on the values that define who you are.",
      "Success may come and go. Circumstances may change. People may applaud you today and question you tomorrow. But when everything else changes, your values are what remain with you.",
      [
        {
          "b": "Be flexible in your approach, but firm in your values."
        }
      ],
      [
        "Because ultimately, what you achieve in life matters—but ",
        {
          "b": "who you become while achieving it matters even more."
        }
      ]
    ],
    "whatThisMeans": "This is the one principle he would leave to a reader twenty years from now.",
    "whyItMatters": "Plans, methods and even professions can change; the values that define who you are should not.",
    "reflect": "Which of your methods could you change, and which values never?"
  },
  {
    "number": "16",
    "title": "Gratitude Should Not Have an Expiry Date",
    "quote": [
      [
        {
          "b": "Keep a space in your heart for those who stood by you and loved you when you needed them."
        }
      ],
      "It does not mean forgetting what happened later, nor does it mean allowing yourself to be hurt again. It simply means choosing gratitude over bitterness and remembering the good without denying the difficult.",
      [
        "Because relationships may change, but ",
        {
          "b": "gratitude should not have an expiry date."
        }
      ]
    ],
    "whatThisMeans": "The story he would preserve is about remembering those who stood by you.",
    "whyItMatters": "Gratitude here means choosing it over bitterness, without denying what was difficult.",
    "reflect": "Who stood by you when you needed them, and have you thanked them?"
  }
];

const principlesPart4: Principle[] = [
  {
    "number": "17",
    "title": "Live with Courage, Create with Conviction",
    "quote": [
      "Live with courage, create with conviction, treat people with dignity, remain grounded in your values—and never stop believing in the possibility of a better tomorrow."
    ],
    "whatThisMeans": "This is the message he chose to add in his own words.",
    "whyItMatters": "It gathers the threads of the whole series: courage, conviction, dignity and values.",
    "reflect": "Which of these four would you most like to strengthen?"
  }
];

const takeaways = [
  {
    "title": "Be flexible in your approach, but firm in your values.",
    "body": "Plans, methods and even professions can change. The values that define who you are should not."
  },
  {
    "title": "Stories make ideas human.",
    "body": "Facts tell us what is happening. Stories help us understand why it matters."
  },
  {
    "title": "A film company was not born from a business plan. It was born from a story.",
    "body": "Serene Films began with one conversation and a willingness to say yes."
  },
  {
    "title": "Business with Dignity.",
    "body": "Be proud of what you do, regardless of the size or scale of your business."
  },
  {
    "title": "Start with what you have.",
    "body": "Not taking a risk can sometimes be the biggest risk in life."
  },
  {
    "title": "We must learn to agree to disagree.",
    "body": "Not to end the conversation, but to reach a meaningful and constructive outcome."
  },
  {
    "title": "Gratitude should not have an expiry date.",
    "body": "Choose gratitude over bitterness, and remember the good without denying the difficult."
  }
];

const tags = [
  "Literature & Culture",
  "Cinema & Storytelling",
  "Entrepreneurship with Purpose",
  "Education & Youth",
  "Society & Impact",
];

function PullQuote({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <p className="text-3xl font-serif leading-snug">{children}</p>
      <p className="mt-4 text-sm text-neutral-500">Umashankar Yadav — {label}, Stated</p>
    </section>
  );
}

function WebsiteLink() {
  return (
    <a href="https://ailf.co.in/" target="_blank" rel="noopener noreferrer" className={linkPill}>
      AILF Website
      <span aria-hidden>↗</span>
    </a>
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
          Umashankar Yadav · Entrepreneur · Filmmaker · Writer · Cultural Visionary
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 023
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Umashankar <em>Yadav</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Be Flexible in Your Approach, but Firm in Your Values
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Founder Director, Ahmedabad International Literature Festival (AILF) · Managing Trustee,
          Ikon Education Foundation · Serene Films · Former Indian Air Force
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;Stories have the power to connect people, inspire change and build a more
          compassionate society.&rdquo;
        </blockquote>

        <div className="mt-5 flex justify-center">
          <WebsiteLink />
        </div>
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
          <p className="font-medium">17 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">September 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-600">
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
          Umashankar Yadav is an entrepreneur, filmmaker, writer and cultural visionary. A former
          Indian Air Force professional who served for 15 years, he later built successful
          enterprises while pursuing his passion for literature, arts, cinema, education and social
          development. Through the Ahmedabad International Literature Festival (AILF), Ikon
          Education Foundation and his film production house Serene Films, he has created platforms
          that celebrate ideas, nurture creativity and contribute to a more mindful and inclusive
          society.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 leading-relaxed text-neutral-700">
          <li>Former Indian Air Force professional (15 years of service)</li>
          <li>
            Founder Director, Ahmedabad International Literature Festival (AILF), nurturing a major
            literary and cultural platform since 2016
          </li>
          <li>Managing Trustee, Ikon Education Foundation</li>
          <li>Entrepreneur with successful business ventures</li>
          <li>
            Filmmaker, writer and actor. Producer, writer and actor of the Hindi feature film
            &ldquo;Drop Out&rdquo; (2026) under his banner, Serene Films
          </li>
          <li>Continues to champion literature, arts, cinema, education and social development</li>
        </ul>
        <blockquote className="mt-6 border-l-2 border-neutral-300 pl-4 text-lg italic text-neutral-700">
          &ldquo;We asked Umashankar Yadav seventeen questions. He answered from the Air Force, from
          business, from the Ahmedabad International Literature Festival and from Serene
          Films.&rdquo;
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
          Seventeen principles · Stated by Umashankar Yadav
        </p>
        <h2 className="mt-3 text-3xl font-serif">What he stands for — in his own words.</h2>
        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle IV">
        &ldquo;A film company was not born from a business plan.
        <br />
        <em>It was born from a story.</em>&rdquo;
      </PullQuote>

      {/* Principles 6-10 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart2.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle IX">
        &ldquo;Technology may shape the future,
        <br />
        <em>but culture must help humanity remain at its heart.</em>&rdquo;
      </PullQuote>

      {/* Principles 11-16 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart3.map((p) => (
            <PrincipleCard key={p.number} p={p} />
          ))}
        </div>
      </section>

      <PullQuote label="Principle XVI">
        &ldquo;Gratitude should not
        <br />
        <em>have an expiry date.</em>&rdquo;
      </PullQuote>

      {/* Principle 17 */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <div className="space-y-20">
          {principlesPart4.map((p) => (
            <PrincipleCard key={p.number} p={p} showCta />
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

      {/* Connect */}
      <section className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">Connect with him</p>
        <div className="mt-3">
          <WebsiteLink />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h3 className="text-xl font-serif">Which principle resonates with you?</h3>
        <p className="mt-2 text-neutral-700">
          Post a commitment inspired by Umashankar Yadav&apos;s principles. State it publicly — and
          make it real.
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
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(URL)}&text=${encodeURIComponent(DESCRIPTION)}`}
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
        <p className="mt-4 text-sm text-neutral-500">15 min read · 17 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>
    </main>
  );
}
