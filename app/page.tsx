export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import CommitmentFeed from "@/components/CommitmentFeed";

export const metadata: Metadata = {
  title: "Stated - Say it. Do it. Prove it.",
  description:
    "Stated is the public accountability platform where individuals, companies, founders, NGOs and government initiatives post commitments, run challenges, and build a verifiable record of execution. Browse free - no signup required.",
  metadataBase: new URL("https://app.stated.in"),
  openGraph: {
    title: "Stated - Say it. Do it. Prove it.",
    description:
      "Post commitments publicly. Build credibility over time. Every promise you keep raises your reputation score. Free to browse - no signup needed.",
    url: "https://app.stated.in",
    siteName: "Stated",
    images: [{ url: "/og-image.png", width: 1270, height: 760, alt: "Stated - Say it. Do it. Prove it." }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stated - Say it. Do it. Prove it.",
    description: "Post commitments publicly. Build credibility over time. Free to browse - no signup needed.",
    images: ["/og-image.png"],
  },
  keywords: [
    "public accountability", "commitments", "credibility", "follow-through",
    "reputation", "goal tracking", "public goals", "accountability platform",
    "hiring challenge", "cofounder hunt", "execution platform",
  ],
  alternates: { canonical: "https://app.stated.in" },
};

// --- Static data -------------------------------------------------------------

const howSteps = [
  { num: "01", icon: "📝", name: "Commit",   desc: "Post what you're going to do - publicly. Your word, your name, your timestamp. On record forever." },
  { num: "02", icon: "📈", name: "Track",    desc: "Log progress with updates as you move. Let followers see the journey, not just the destination." },
  { num: "03", icon: "📸", name: "Prove",    desc: "Attach real proof - a link, screenshot, or video. Real outcomes, not just good intentions." },
  { num: "04", icon: "🏆", name: "Complete", desc: "Finish strong. Your credibility score rises. Your public record grows with every completion." },
];

const whyCards = [
  { icon: "📌", title: "Your word, on record",    body: "Public, timestamped, tied to your name. No escaping it - and that's exactly the point. Social pressure that actually works." },
  { icon: "📈", title: "Credibility compounds",   body: "Every commitment kept raises your reputation score. Over time your public profile becomes the most credible thing about you." },
  { icon: "🎯", title: "Work filters everything", body: "Challenges replace resumes and cold pitches with actual work submitted as proof. The best executor wins - not the best talker." },
  { icon: "🌐", title: "Free to browse, forever", body: "No signup to view any commitment or challenge. Everything is public by default. An open record, not a walled garden." },
  { icon: "🏛", title: "For everyone",            body: "Individuals, companies, founders, NGOs, government initiatives, and institutions - anyone who makes public commitments belongs here." },
  { icon: "🇮🇳", title: "Built in India",         body: "Made for the Indian execution-first mindset. Priced for Indian companies. Serving the world's fastest-growing builder community." },
];

const execRewards = [
  { icon: "🛡", title: "No Cost",       body: "Completely free to join. No credit card required." },
  { icon: "🎁", title: "Credits",       body: "Get credits to create up to 5 commitments free to start." },
  { icon: "📣", title: "Recognition",   body: "Top executors get featured, PR distribution & a premium upgrade." },
  { icon: "👥", title: "Teams Welcome", body: "Work solo or with your team. Build a shared credibility score." },
];

const challengeTypes = [
  { icon: "💼", title: "Hiring Challenge",     for: "Companies . Anyone",        desc: "Post a real task. Receive actual work as applications. Hire the best executor - not the best CV writer.",           price: "from ₹999",  top: "from-blue-600 to-blue-400",    bg: "bg-blue-50",   pc: "text-blue-600"   },
  { icon: "🤝", title: "Cofounder Hunt",       for: "Founders . Individuals",    desc: "Post a scoped task. See who actually builds with you before committing. Find the right partner with proof.",          price: "from ₹499",  top: "from-violet-600 to-violet-400",bg: "bg-violet-50", pc: "text-violet-600" },
  { icon: "🔗", title: "Partner Hunt",         for: "Companies . Founders",      desc: "Find integration partners, resellers, or allies. Evaluate real intent through a proposal - not a pitch.",            price: "from ₹799",  top: "from-green-600 to-green-400",  bg: "bg-green-50",  pc: "text-green-600"  },
  { icon: "🧠", title: "Consultant Hunt",      for: "Companies . Anyone",        desc: "Post the problem. Get a solution as the application. Hire the expert who already showed you what they can do.",      price: "from ₹999",  top: "from-teal-600 to-teal-400",    bg: "bg-teal-50",   pc: "text-teal-600"   },
  { icon: "📡", title: "Investor Signal",      for: "Founders . Companies",      desc: "Let investors evaluate your real execution history - not a polished deck. 18 months of proof speaks louder.",        price: "from ₹999",  top: "from-amber-600 to-amber-400",  bg: "bg-amber-50",  pc: "text-amber-600"  },
  { icon: "⚡", title: "Collaborator Hunt",    for: "Individuals . Creators",    desc: "Find collaborators who prove they'll add value before joining. No more co-creators who disappear after week one.",   price: "from ₹299",  top: "from-rose-600 to-rose-400",    bg: "bg-rose-50",   pc: "text-rose-600"   },
  { icon: "🌱", title: "Impact Challenge",     for: "NGOs . Govt. Initiatives",  desc: "NGOs and government initiatives post public accountability commitments and open challenges for volunteers or partners. Every outcome is on public record.", price: "from ₹499", top: "from-slate-500 to-slate-400", bg: "bg-slate-50", pc: "text-slate-600" },
  { icon: "🎓", title: "Grant & Fellowship",   for: "Institutions . Accelerators", desc: "Accelerators and grant bodies post selection challenges. Applicants submit real work. The best execution wins the seat - not the best essay.",          price: "Contact us", top: "from-violet-600 to-amber-400", bg: "bg-violet-50", pc: "text-violet-600" },
];

// --- Component ---------------------------------------------------------------

export default async function HomePage() {
  return (
    <div className="flex flex-col bg-white text-gray-900">

      {/* -- HERO --------------------------------------------------------- */}
      <section className="relative pt-32 pb-0 overflow-hidden" style={{ background: "linear-gradient(180deg,#eef5ff 0%,#ffffff 100%)" }}>
        <div className="hero-dots absolute inset-0 opacity-70 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 pulse-dot" />
            🚀 Execution Challenge - Live Now
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.02] tracking-tight mb-6">
            Say it publicly.<br />
            <span className="text-blue-600">Do it publicly.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            The public accountability platform for{" "}
            <strong className="text-gray-900 font-semibold">individuals, companies, founders, NGOs</strong>{" "}
            and organisations. Post commitments. Build credibility that lasts.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { icon: "📝", label: "Post commitments"  },
              { icon: "🎯", label: "Run challenges"    },
              { icon: "📊", label: "Track progress"    },
              { icon: "🏆", label: "Build credibility" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">
                <span>{icon}</span> {label}
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
              🚀 Start free - 5 commitments included
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium text-base px-8 py-4 rounded-xl border border-gray-300 transition-all"
            >
              Browse what people are doing ->
            </Link>
          </div>

          {/* Search */}
          <form action="/search" method="GET" className="flex max-w-xl mx-auto bg-white border border-gray-300 rounded-xl overflow-hidden shadow-md mb-14">
            <input
              type="text"
              name="q"
              placeholder="Search commitments, people or organisations…"
              className="flex-1 px-5 py-3.5 text-gray-900 text-sm outline-none placeholder-gray-400 bg-transparent"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 transition-colors shrink-0">
              Search
            </button>
          </form>

          {/* Mini preview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              { initials: "S",  bg: "bg-blue-600",    name: "Stated",        text: "We will launch Stated on March 29th",             badge: "✓ Done",      bc: "bg-green-100 text-green-700 border-green-200" },
              { initials: "CL", bg: "bg-violet-600",  name: "Credorium Labs", text: "Building strong interpretation tools for founders", badge: "In progress", bc: "bg-amber-100 text-amber-700 border-amber-200" },
              { initials: "P",  bg: "bg-emerald-600", name: "Priya K.",       text: "Read 20 pages every morning for 30 days",           badge: "✓ Done",      bc: "bg-green-100 text-green-700 border-green-200" },
            ].map(({ initials, bg, name, text, badge, bc }) => (
              <div key={name} className="bg-white border border-gray-200 rounded-xl p-4 text-left shadow-sm">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{initials}</div>
                  <span className="text-sm font-semibold text-gray-900">{name}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2.5">{text}</p>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${bc}`}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- TICKER ------------------------------------------------------- */}
      <div className="bg-blue-600 py-3.5 overflow-hidden">
        <div className="flex gap-12 w-max" style={{ animation: "ticker 35s linear infinite" }}>
          {[
            { name: "@posivity",      text: "I will end each day with one visible outcome I can point to."   },
            { name: "Credorium Labs", text: "We commit to building strong interpretation tools for founders." },
            { name: "@rishi_dev",     text: "Shipping 3 features this week - publicly tracked."              },
            { name: "@meenakshi",     text: "Read 20 pages every morning before 8 AM."                       },
            { name: "@buildinpublic", text: "Post a build update every single Monday."                        },
            { name: "GreenNGO",       text: "Plant 500 trees by June - publicly tracked with proof."          },
            { name: "@posivity",      text: "I will end each day with one visible outcome I can point to."   },
            { name: "Credorium Labs", text: "We commit to building strong interpretation tools for founders." },
            { name: "@rishi_dev",     text: "Shipping 3 features this week - publicly tracked."              },
            { name: "@meenakshi",     text: "Read 20 pages every morning before 8 AM."                       },
            { name: "@buildinpublic", text: "Post a build update every single Monday."                        },
            { name: "GreenNGO",       text: "Plant 500 trees by June - publicly tracked with proof."          },
          ].map(({ name, text }, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-blue-100 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
              <span className="text-white font-semibold">{name}</span>
              <span>- {text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* -- WHAT IS STATED ----------------------------------------------- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-blue-600 inline-block rounded" />
            What is Stated
          </p>
          <div className="grid md:grid-cols-2 gap-14 items-start">

            {/* Left */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                The platform where your{" "}
                <span className="text-blue-600">word</span>{" "}
                becomes your{" "}
                <span className="text-blue-600">record.</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Stated is where individuals, companies, founders, NGOs, and government initiatives make public commitments - and prove them with real updates and proof. Every action builds a permanent, verifiable credibility score that compounds over time.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: "👤", label: "Individuals"       },
                  { icon: "🏢", label: "Companies"         },
                  { icon: "🚀", label: "Founders"          },
                  { icon: "🌱", label: "NGOs"              },
                  { icon: "🏛", label: "Govt. Initiatives" },
                  { icon: "🎓", label: "Institutions"      },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - comparison */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="grid grid-cols-2">
                <div className="bg-red-50 px-5 py-3 border-b border-r border-gray-200">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">✕ Everywhere else</span>
                </div>
                <div className="bg-green-50 px-5 py-3 border-b border-gray-200">
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wider">✓ On Stated</span>
                </div>
              </div>
              {[
                ["Claims without proof",                  "Every commitment has timestamped proof"   ],
                ["Resumes over results",                  "Challenges filter by actual work done"    ],
                ["Hidden, private, unverifiable",         "Public record anyone can see"             ],
                ["Reputation fades or resets",            "Credibility score compounds forever"      ],
                ["Tools track tasks, not accountability", "Stated tracks commitments with proof"     ],
              ].map(([bad, good], i) => (
                <div key={i} className="grid grid-cols-2">
                  <div className="px-5 py-3.5 border-b border-r border-gray-100 text-sm text-gray-400 flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 text-red-300">-</span>{bad}
                  </div>
                  <div className="px-5 py-3.5 border-b border-gray-100 text-sm text-gray-800 font-medium flex items-start gap-2">
                    <span className="text-green-600 font-bold shrink-0 mt-0.5">✓</span>{good}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- HOW IT WORKS ------------------------------------------------- */}
      <section className="bg-gray-900 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-blue-400 inline-block rounded" />
            How it works
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
            Four steps. Public record. Forever.
          </h2>
          <p className="text-gray-400 text-base mb-14 max-w-md">The simplest accountability system ever built. No fluff, no complexity.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {howSteps.map(({ num, icon, name, desc }) => (
              <div key={name} className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 hover:-translate-y-1 transition-all">
                <div className="text-white/[0.08] font-display font-extrabold text-3xl leading-none mb-3">{num}</div>
                <div className="text-3xl mb-4">{icon}</div>
                <div className="text-blue-400 font-semibold text-sm mb-2">{name}</div>
                <div className="text-gray-400 text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- LIVE COMMITMENT FEED ----------------------------------------- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-5 h-0.5 bg-blue-600 inline-block rounded" />
            People on record, right now
            <span className="w-5 h-0.5 bg-blue-600 inline-block rounded" />
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 text-center tracking-tight mb-3">
            Commitments from people &amp; companies
          </h2>
          <p className="text-gray-500 text-center text-base mb-12">Real accountability. Public. Timestamped. Cheerable.</p>
          <CommitmentFeed endpoint="/api/feed?limit=6" showFilters={false} />
          <div className="text-center mt-10">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
            >
              Explore all commitments ->
            </Link>
          </div>
        </div>
      </section>

      {/* -- WHY STATED WORKS --------------------------------------------- */}
      <section className="bg-gray-50 py-24 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-blue-600 inline-block rounded" />
            Why Stated works
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
            Most platforms reward{" "}
            <span className="italic text-orange-500">performance.</span>
            <br />We reward follow-through.
          </h2>
          <p className="text-gray-500 text-base mb-14 max-w-md">The accountability layer the internet has always been missing.</p>

          <div className="grid md:grid-cols-3 gap-4">
            {whyCards.map(({ icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display font-bold text-gray-900 text-base mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- CHALLENGES - COMING SOON ------------------------------------- */}
      <section className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-blue-600 inline-block rounded" />
            Coming soon - Challenges
          </p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
                Hire. Partner. Build.<br />
                <span className="text-blue-600">Based on work - not words.</span>
              </h2>
              <p className="text-gray-500 text-base max-w-lg">
                Post a challenge. Receive real work as responses. Find exactly who you need -
                with execution as the filter, not credentials or cold pitches.
              </p>
            </div>
            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold px-5 py-3 rounded-full whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-amber-400 pulse-dot" />
                Building now
              </div>
            </div>
          </div>

          {/* How challenges work - mini explainer */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
            <p className="text-sm font-semibold text-blue-800 mb-4">💡 How challenges work</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: "1", label: "Post",          desc: "Post your challenge with real context and expected output"    },
                { step: "2", label: "Get responses", desc: "People submit actual work - links, files, text, or images"    },
                { step: "3", label: "Evaluate",      desc: "Review all public submissions. Compare fairly by work quality" },
                { step: "4", label: "Decide",        desc: "Shortlist, connect, and hire or partner with confidence"       },
              ].map(({ step, label, desc }) => (
                <div key={step} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">{step}</div>
                  <div className="font-semibold text-blue-900 text-sm mb-1">{label}</div>
                  <div className="text-blue-700 text-xs leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge type cards - with coming soon overlay */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {challengeTypes.slice(0, 6).map(({ icon, title, for: forLabel, desc, price, top, bg, pc }) => (
              <div key={title} className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className={`h-1 w-full bg-gradient-to-r ${top}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center text-xl`}>{icon}</div>
                    <span className="text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">{forLabel}</span>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-base mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{desc}</p>
                  <span className={`font-display font-bold text-sm ${pc}`}>{price}</span>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
                  <div className="bg-white border border-gray-300 rounded-full px-4 py-1.5 text-xs font-bold text-gray-600 shadow-sm">
                    Coming soon
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NGO + Grant row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {challengeTypes.slice(6).map(({ icon, title, for: forLabel, desc, price, top, bg, pc }) => (
              <div key={title} className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className={`h-1 w-full bg-gradient-to-r ${top}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center text-xl`}>{icon}</div>
                    <span className="text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">{forLabel}</span>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-base mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{desc}</p>
                  <span className={`font-display font-bold text-sm ${pc}`}>{price}</span>
                </div>
                <div className="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
                  <div className="bg-white border border-gray-300 rounded-full px-4 py-1.5 text-xs font-bold text-gray-600 shadow-sm">
                    Coming soon
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- EXECUTION CHALLENGE ------------------------------------------ */}
      <section className="bg-gray-900 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-amber-400 inline-block rounded" />
            Execution Challenge
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
            Win for doing what you said.
          </h2>
          <p className="text-gray-400 text-base mb-14 max-w-md">
            Top executors get more than recognition - they get a platform.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {execRewards.map(({ icon, title, body }) => (
              <div key={title} className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 text-center hover:border-amber-400/40 hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="text-amber-400 font-semibold text-sm mb-2">{title}</div>
                <div className="text-gray-400 text-xs leading-relaxed">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- TRUST STRIP -------------------------------------------------- */}
      <div className="bg-blue-600 py-5 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-blue-500">
          {[
            { val: "Free",  label: "To start . no credit card"   },
            { val: "5",     label: "Free commitments included"    },
            { val: "100%",  label: "Public . no signup to browse" },
            { val: "🇮🇳",   label: "Built in India for the world" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center px-6 py-2">
              <div className="font-display text-2xl font-extrabold text-white leading-none mb-1">{val}</div>
              <div className="text-xs text-blue-200">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* -- FINAL CTA ---------------------------------------------------- */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-3xl p-12 md:p-16 text-center border border-gray-200 shadow-sm relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#eff6ff 0%,#f5f3ff 50%,#f0fdf4 100%)" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-300/25 blur-3xl rounded-full pointer-events-none" />

            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-5 relative">Your Turn</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5 relative">
              Put your word on the{" "}
              <span className="italic text-blue-600">line.</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-10 max-w-md mx-auto relative">
              Say it where it counts. Start free - post your first commitment in under 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 relative">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-10 py-4 rounded-xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
              >
                🚀 Commit publicly - it's free
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium text-base px-10 py-4 rounded-xl border border-gray-300 transition-all"
              >
                Browse first ->
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center relative">
              {["Free to start", "No credit card required", "5 commitments included", "No signup to browse"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span className="text-green-600 font-bold">✓</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
