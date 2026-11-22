import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stated Principles -- What Remarkable People Stand For",
  description:
    "A living archive of principles, beliefs, and lessons from founders, investors, policymakers, creators, and leaders -- stated publicly, in their own words. Fifty people, fifty journeys, one free book of human wisdom.",
  metadataBase: new URL("https://app.stated.in"),
  openGraph: {
    title: "Stated Principles -- What Remarkable People Stand For",
    description:
      "Fifty people, fifty journeys, one free book of human wisdom -- stated publicly, in their own words.",
    url: "https://app.stated.in/principles",
    siteName: "Stated",
    images: [{ url: "/patel-portrait.jpg", width: 750, height: 750, alt: "Stated Principles" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stated Principles",
    description: "Fifty people, fifty journeys, one free book of human wisdom.",
    images: ["/patel-portrait.jpg"],
  },
  alternates: { canonical: "https://app.stated.in/principles" },
};

// ── DATA ──────────────────────────────────────────────────────────────────────
// Ordered latest first -- newest issue always leads.
const published = [
  {
    slug:     "justice-subodh-shah",
    name:     "Justice Subodh G. Shah",
    role:     "Former Judge, High Court of Gujarat · Court Computerisation Pioneer · Legal Educator",
    issue:    "028",
    date:     "November 2026",
    photo:    "/subodh-shah-portrait.jpg",
    tagline:  "Justice must be both principled and effective.",
    tags:     ["Judiciary", "Constitutional Values", "Courts & Technology"],
    readTime: 25,
    principleCount: 12,
  },
  {
    slug:     "abhijit-sen",
    name:     "Abhijit Sen",
    role:     "Former CFO, Citi India Subcontinent · Board Member · Governance Expert · Mentor",
    issue:    "027",
    date:     "October 2026",
    photo:    "/abhijit-portrait.jpg",
    tagline:  "Uphold, without any compromise, ethical values and principles.",
    tags:     ["Financial Leadership", "Governance & Risk", "Boards & Mentorship"],
    readTime: 33,
    principleCount: 25,
  },
  {
    slug:     "angelos-tsavdaris",
    name:     "Angelos Tsavdaris",
    role:     "President, Hellenic-Indian Chamber of Commerce and Economy",
    issue:    "026",
    date:     "October 2026",
    photo:    "/tsavdaris-portrait.jpg",
    tagline:  "Honour people’s trust through actions for which you are prepared to take responsibility.",
    tags:     ["Leadership & Trust", "Human Dignity", "International Cooperation"],
    readTime: 16,
    principleCount: 13,
  },
  {
    slug:     "dr-sahdev-singh",
    name:     "Dr. Sahdev Singh",
    role:     "Deputy Secretary, Government of India · Ministry of Agriculture & Farmers Welfare",
    issue:    "025",
    date:     "October 2026",
    photo:    "/sahdev-portrait.jpg",
    tagline:  "A public position is a responsibility, not a privilege.",
    tags:     ["Public Service", "Governance & Law", "Agriculture"],
    readTime: 17,
    principleCount: 17,
  },
  {
    slug:     "dr-heera-lal-patel-ias",
    name:     "Dr. Heera Lal Patel, IAS",
    role:     "Secretary, National Integration, Government of Uttar Pradesh · Climate Action Leader · Author",
    issue:    "024",
    date:     "September 2026",
    photo:    "/patel-portrait.jpg",
    tagline:  "If the problem is with us, so is the solution.",
    tags:     ["People-Centric Governance", "Climate Action", "Grassroots Transformation"],
    readTime: 19,
    principleCount: 21,
  },
  {
    slug:     "umashanker-yadav",
    name:     "Umashanker Yadav",
    role:     "Founder Director, Ahmedabad International Literature Festival (AILF) · Entrepreneur · Filmmaker · Writer",
    issue:    "023",
    date:     "September 2026",
    photo:    "/yadav-portrait.jpg",
    tagline:  "Stories make ideas human.",
    tags:     ["Literature & Culture", "Cinema & Storytelling", "Entrepreneurship with Purpose"],
    readTime: 15,
    principleCount: 17,
  },
  {
    slug:     "prof-ravinder-rena",
    name:     "Prof. Dr. Ravinder Rena",
    role:     "Professor of Economics · DUT Business School, Durban University of Technology",
    issue:    "022",
    date:     "September 2026",
    photo:    "/rena-portrait.jpg",
    tagline:  "The true measure of a life is not what we accumulate, but what we give back.",
    tags:     ["Economics & Development", "Higher Education", "Public Policy"],
    readTime: 15,
    principleCount: 16,
  },
  {
    slug:     "barbara-vercruysse",
    name:     "Barbara Vercruysse",
    role:     "Global Kindness Advocate · President, PWI Brussels (PWN Global) · Author",
    issue:    "021",
    date:     "September 2026",
    photo:    "/barbara-portrait.jpg",
    tagline:  "Kindness and strength were never opposites. They were always the same muscle.",
    tags:     ["Kindness in Leadership", "Psychological Safety", "Author"],
    readTime: 14,
    principleCount: 17,
  },
  {
    slug:     "rajendra-shah",
    name:     "Rajendra Shah",
    role:     "Education Entrepreneur · Connector, Mentor & Platform Builder",
    issue:    "020",
    date:     "September 2026",
    photo:    "/shah-portrait.jpg",
    tagline:  "The right people will have the right products and services, and not the reverse.",
    tags:     ["Education", "Mentorship", "Partnerships"],
    readTime: 8,
    principleCount: 16,
  },
  {
    slug:     "adapa-sharath-kumar-ask",
    name:     "Adapa Sharath Kumar (ASK)",
    role:     "Board Advisor & Board Member · Entrepreneur · Institution Builder",
    issue:    "019",
    date:     "September 2026",
    photo:    "/ask-portrait.jpg",
    tagline:  "Titles are rented. Character is owned.",
    tags:     ["Board Advisory", "Governance", "Institution Building"],
    readTime: 18,
    principleCount: 18,
  },
  {
    slug:     "dr-mariam-shaikh",
    name:     "Dr. Mariam Shaikh",
    role:     "Global 200 Women Power Leaders 2024 · Founder & CEO, MS Education Consultants",
    issue:    "018",
    date:     "September 2026",
    photo:    "/mariam-portrait.jpg",
    tagline:  "Success is not only about how far you go. It is also about how many lives become better because you chose to move forward.",
    tags:     ["Education Consulting", "Women's Empowerment", "Mentorship"],
    readTime: 10,
    principleCount: 12,
  },
  {
    slug:     "prof-dr-pramod-kumar-rajput",
    name:     "Prof. Dr. Pramod Kumar Rajput",
    role:     "Former Sr. Vice President, Cadila Pharma Ltd. · Director, CliMed Research Solutions",
    issue:    "017",
    date:     "September 2026",
    photo:    "/rajput-portrait.jpg",
    tagline:  "Don't measure your life only by what you achieve, but by what you give.",
    tags:     ["Pharma Leadership", "Mentorship", "Author"],
    readTime: 17,
    principleCount: 21,
  },
  {
    slug:     "air-marshal-anil-khosla",
    name:     "Air Marshal Anil Khosla",
    role:     "Indian Air Force (Retd.) · Former Vice Chief of the Air Staff",
    issue:    "016",
    date:     "September 2026",
    photo:    "/khosla-portrait.jpg",
    tagline:  "Self-discipline is doing the right things when nobody is watching.",
    tags:     ["Indian Air Force", "Leadership", "Team Building"],
    readTime: 15,
    principleCount: 9,
  },
  {
    slug:     "sushil-rao-chilkuri",
    name:     "Sushil Rao Chilkuri",
    role:     "38 Years in Journalism · Former Editor, Special Reports, The Times of India",
    issue:    "015",
    date:     "September 2026",
    photo:    "/sushilrao-portrait.jpg",
    tagline:  "You are the voice of the people.",
    tags:     ["Journalism", "Media Ethics", "Interviews"],
    readTime: 24,
    principleCount: 20,
  },
  {
    slug:     "dr-jalpan-lala",
    name:     "Dr. (Hon) Jalpan Lala",
    role:     "Global Branding Strategist · Founder, BrandBrews · VP, HBL Atrium",
    issue:    "014",
    date:     "September 2026",
    photo:    "/jalpan-portrait.jpg",
    tagline:  "Don't spend your life proving you are capable. Spend it building a life that proves it for you.",
    tags:     ["Personal Branding", "Entrepreneurship", "Women in Business"],
    readTime: 18,
    principleCount: 20,
  },
  {
    slug:     "maj-gen-ranjan-mahajan",
    name:     "Maj Gen Ranjan Mahajan",
    role:     "Indian Army (Retd.) · Five Tenures in Kashmir · Author, Kashmir in the Line of Fire",
    issue:    "013",
    date:     "September 2026",
    photo:    "/mahajan-portrait.jpg",
    tagline:  "Leadership is not primarily about authority. It is about responsibility for people.",
    tags:     ["Leadership", "Kashmir", "Author"],
    readTime: 14,
    principleCount: 10,
  },
  {
    slug:     "anil-swarup",
    name:     "Shri Anil Swarup",
    role:     "Founder Chairman, Nexus of Good · Former Secretary, School Education & Coal, Govt. of India",
    issue:    "012",
    date:     "August 2026",
    photo:    "/swarup-portrait.jpg",
    tagline:  "Good can happen because good is happening.",
    tags:     ["Public Service", "Governance Reform", "Nexus of Good"],
    readTime: 8,
    principleCount: 8,
  },
  {
    slug:     "maj-gen-ak-bardalai",
    name:     "Maj Gen (Dr) A.K. Bardalai",
    role:     "Indian Army (Retd.) · UN Peace Operations Scholar",
    issue:    "011",
    date:     "August 2026",
    photo:    "/bardalai-portrait.jpg",
    tagline:  "Trust is not given upfront; it is earned through credibility, and credibility comes only with proof.",
    tags:     ["UN Peacekeeping", "Leadership", "Truth"],
    readTime: 14,
    principleCount: 20,
  },
  {
    slug:     "amb-sanjiv-kohli",
    name:     "Amb Sanjiv Kohli",
    role:     "Indian Foreign Service, IFS · Former High Commissioner & Ambassador",
    issue:    "010",
    date:     "August 2026",
    photo:    "/kohli-portrait.jpg",
    tagline:  "Leadership is not about possessing authority. It will be tested around how that authority is exercised.",
    tags:     ["Diplomacy", "Leadership", "India"],
    readTime: 9,
    principleCount: 8,
  },
  {
    slug:     "dr-snigdhaa-majumder",
    name:     "Dr. Snigdhaa Majumder",
    role:     "Business Strategy, Customer Experience & Leadership Advisor",
    issue:    "009",
    date:     "August 2026",
    photo:    "/snigdhaa-portrait.jpg",
    tagline:  "Do not abandon yourself while becoming successful.",
    tags:     ["Leadership", "Business Strategy", "Identity"],
    readTime: 20,
    principleCount: 20,
  },
  {
    slug:     "peter-toutain-dorbec",
    name:     "Peter Toutain-Dorbec",
    role:     "Artist · Photographer · Author · Poet · Publisher",
    issue:    "008",
    date:     "August 2026",
    photo:    "/peter-portrait.jpg",
    tagline:  "What unites human beings is far greater than what separates us.",
    tags:     ["Photography", "Human Dignity", "120+ Countries"],
    readTime: 28,
    principleCount: 9,
  },
  {
    slug:     "pop-sudhir-aggarwal",
    name:     "PoP Sudhir Aggarwal",
    role:     "CHRO and Director, Digital Transformation, Orbit Techsol India",
    issue:    "007",
    date:     "July 2026",
    photo:    "/sudhir-portrait.jpg",
    tagline:  "One and only one can work upon and build one's own attitude.",
    tags:     ["CHRO", "Digital Transformation", "Attitude"],
    readTime: 10,
    principleCount: 6,
  },
  {
    slug:     "lt-general-shokin-chauhan",
    name:     "Lt General Shokin Chauhan",
    role:     "Indian Army (Retd.) · Former Defence Attaché to Nepal",
    issue:    "006",
    date:     "July 2026",
    photo:    "/shokin-portrait.jpg",
    tagline:  "Leadership is an act of service before it is an exercise of authority.",
    tags:     ["Leadership", "Integrity", "Service"],
    readTime: 32,
    principleCount: 16,
  },
  {
    slug:     "eric-anthony-jones",
    name:     "Eric Anthony Jones",
    role:     "Founder, The Peacemakers Movement™ · Former Attorney & ABA Commissioner",
    issue:    "005",
    date:     "July 2026",
    photo:    "/eric-portrait.jpg",
    tagline:  "Context without accountability becomes excuse. Accountability without context becomes distortion.",
    tags:     ["Identity", "Accountability", "Peacebuilding"],
    readTime: 22,
    principleCount: 5,
  },
  {
    slug:     "deacon-kennedy-sserugo",
    name:     "Deacon Kennedy Sserugo",
    role:     "Founder, Kennedy Development Foundation & Pad Aid Uganda",
    issue:    "004",
    date:     "July 2026",
    photo:    "/kennedy-portrait.jpg",
    tagline:  "Everything spoken of being wrong should be formalized for the masses to learn.",
    tags:     ["Community Builder", "Period Poverty", "Child Protection"],
    readTime: 8,
    principleCount: 6,
  },
  {
    slug:     "col-mandhir-singh",
    name:     "Colonel Mandhir Singh",
    role:     "Indian Army (Retd.) · Commando Instructor · Independent Director, MDI Gurgaon",
    issue:    "003",
    date:     "July 2026",
    photo:    "/mandhir-portrait.jpg",
    tagline:  "Army was never a career for me. It was a way of life.",
    tags:     ["Leadership", "Patriotism", "Accountability"],
    readTime: 13,
    principleCount: 6,
  },
  {
    slug:     "dr-lenin-raghuvanshi",
    name:     "Dr. Lenin Raghuvanshi",
    role:     "Founder, People's Vigilance Committee on Human Rights (PVCHR) · Author",
    issue:    "002",
    date:     "July 2026",
    photo:    "/lenin-portrait.jpg",
    tagline:  "Human dignity is not a reward to be earned -- it is a birthright that must be protected for everyone.",
    tags:     ["Human Rights", "Dignity", "Civil Society"],
    readTime: 7,
    principleCount: 5,
  },
  {
    slug:     "shilpa-s",
    name:     "Shilpa S",
    role:     "CMD, SheRocks India · Startup Ecosystem Enabler · Investor for MSMEs",
    issue:    "001",
    date:     "June 2026",
    photo:    "/shilpa-portrait.jpg",
    tagline:  "We finish what we start. Not for the applause -- but for the integrity of the promise.",
    tags:     ["Leadership", "Execution", "Integrity"],
    readTime: 6,
    principleCount: 5,
  },
];

const BOOK_GOAL = 50;
const publishedCount = published.length;
const progressPercent = Math.round((publishedCount / BOOK_GOAL) * 100);

const formatSteps = [
  { n: "1", title: "We ask five questions",           desc: "Curated to reveal principles, not opinions. Designed for depth, not headlines." },
  { n: "2", title: "They state what they stand for",  desc: "In their own words. Unfiltered. Publicly attributed. On record." },
  { n: "3", title: "We add context and interpretation", desc: "What it means, why it matters, and how readers can apply it." },
  { n: "4", title: "Readers reflect and act",         desc: "Create a commitment inspired by a principle. State it publicly on Stated." },
];

// ── MAILTO -- pre-filled nomination email ─────────────────────────────────────
const NOMINATION_EMAIL = "hello@stated.in";
const NOMINATION_SUBJECT = "Stated Principles -- Nomination";
const NOMINATION_BODY = `Hi Stated Team,

I would like to nominate someone for the Stated Principles series.

--- ABOUT THE PERSON BEING NOMINATED ---
Full Name: 
Current Role & Company: 
LinkedIn / Website: 
Why they should be featured (2-3 lines): 

--- ABOUT ME (THE PERSON NOMINATING) ---
My Full Name: 
My Email: 
My Phone / WhatsApp: 
My Company / Organisation: 

Note: If you are nominating yourself, fill the first section only and leave the second section blank.

Thank you,`;

const MAILTO_LINK = `mailto:${NOMINATION_EMAIL}?subject=${encodeURIComponent(
  NOMINATION_SUBJECT
)}&body=${encodeURIComponent(NOMINATION_BODY)}`;

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function PrinciplesIndexPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@300;400&display=swap');
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .mono  { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="border-b border-gray-200 px-6 py-20"
        style={{ background: "linear-gradient(180deg,#fafaf8 0%,#ffffff 100%)" }}
      >
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">
              Stated Principles
            </span>
          </div>

          <h1 className="serif text-5xl md:text-7xl font-light text-gray-900 leading-none tracking-tight mb-5">
            What remarkable<br />people{" "}
            <em className="italic text-amber-600">stand for.</em>
          </h1>

          <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-xl mb-6">
            A living archive of principles, beliefs, and lessons from founders, investors,
            policymakers, creators, and leaders -- stated publicly, in their own words.
          </p>

          <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10">
            Fifty distinguished individuals, from soldiers to artists, from human rights defenders
            to founders. Fifty journeys, fifty perspectives, told in full. When all fifty are
            complete, they will become <strong className="text-gray-900 font-medium">one book</strong> -- printed
            and distributed free, to students, young people, emerging leaders, and the
            institutions that shape them.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={MAILTO_LINK}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline"
            >
              Nominate someone
            </a>
            <a
              href={MAILTO_LINK}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg transition-all no-underline"
            >
              Nominate yourself
            </a>
          </div>
        </div>
      </section>

      {/* ── THE BOOK / PROGRESS ─────────────────────────────────────────── */}
      <section className="px-6 py-14 border-b border-amber-100" style={{ background: "#fffbeb" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">
              The Stated Principles Book
            </span>
          </div>

          <h2 className="serif text-3xl md:text-4xl font-light text-gray-900 leading-tight tracking-tight mb-4">
            50 People &middot; 50 Journeys &middot; 50 Perspectives &middot;{" "}
            <em className="italic text-amber-600">One Book of Human Wisdom.</em>
          </h2>

          <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-2xl mb-8">
            This series is not only a digital archive. It is the foundation of a book, compiled
            from fifty people across fifty different walks of life, each stating what they stand
