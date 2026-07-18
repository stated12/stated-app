import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SLUG = "dr-lenin-raghuvanshi";
const URL = `https://app.stated.in/principles/${SLUG}`;
const TITLE = "Dr. Lenin Raghuvanshi — 5 Principles, Stated";
const DESCRIPTION =
  "Human dignity is not a reward to be earned; it is a birthright that must be protected for everyone. Five principles from the Founder of PVCHR.";
const IMAGE = "https://app.stated.in/lenin-portrait.jpg";

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
    images: [{ url: IMAGE, width: 516, height: 387, alt: "Dr. Lenin Raghuvanshi" }],
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
    title: "Human Dignity Before Identity",
    quote: [
      "The principle that has guided my life is simple: every human being deserves dignity before any social, religious, caste, gender, or political identity. A society is not judged by how it treats the powerful, but by how it treats those whose voices are least heard.",
      "Working with survivors of caste discrimination, bonded labour, torture, violence against women, and marginalized communities has taught me that lasting change does not begin with laws alone. It begins when we choose to listen with empathy, challenge injustice without hatred, and create spaces where people can reclaim their voice and agency. Social transformation is not about defeating opponents; it is about transforming relationships built on fear into relationships built on trust and justice.",
      "I have also learned that democracy is more than elections and institutions. It is a daily practice of respecting diversity, protecting dissent, and ensuring that every person feels they belong. Whether I write about Kashi as a shared civilizational space or advocate for Dalit rights and human dignity, the underlying principle remains the same: our shared humanity is greater than the identities that divide us.",
      "In an increasingly polarized world, I believe courage lies not in speaking louder than others, but in listening more deeply, building bridges across differences, and standing with those who have been pushed to the margins. Human dignity is not a reward to be earned; it is a birthright that must be protected for everyone.",
      "When dignity becomes the foundation of our decisions, justice is no longer an aspiration — it becomes a way of life.",
    ],
    whatThisMeans:
      "Dr. Raghuvanshi is drawing a line before every other line: identity — caste, religion, gender, politics — comes after dignity, never before it. He measures a society not by how it treats power, but by how it treats the people with the least of it.",
    whyItMatters:
      "Decades of working with survivors of caste discrimination and torture led him to a conclusion that shapes every part of his work: laws alone don't create lasting change. Change begins in the daily, unglamorous practice of listening, and in treating democracy as something rebuilt every day — not something that ends at the ballot box.",
    reflect:
      "Where in your own decisions does identity quietly get weighed before dignity? What would change if dignity came first, every time?",
  },
  {
    number: "02",
    title: "Dignity Has to Be Named Before It Can Be Restored",
    quote: [
      "The principle emerged from my early work with bonded labourers, Dalit communities, and survivors of torture in eastern Uttar Pradesh. As a young activist, I realized that poverty alone could not explain why some communities remained trapped in generations of exclusion. Caste, discrimination, and the denial of dignity were at the heart of the problem.",
      "One experience has remained with me throughout my life. I met families who had accepted humiliation as their destiny because no one had ever told them that they had rights. Their greatest suffering was not only exploitation but the feeling that their lives had no value. That changed my understanding of justice forever.",
      "I learned that before people need legal remedies, they need someone who listens without prejudice and recognizes their humanity. This conviction inspired the founding of the People's Vigilance Committee on Human Rights (PVCHR), where we placed dignity, active listening, and non-violent dialogue at the centre of our work. Since then, every decision I make begins with one question: Does this restore human dignity?",
    ],
    whatThisMeans:
      "The defining moment wasn't a single event but a realization: entire families had accepted humiliation as destiny simply because no one had ever told them they had rights. The deepest injury was not the exploitation itself, but the feeling that their lives had no value.",
    whyItMatters:
      "This is why PVCHR was built around listening and non-violent dialogue before legal remedy, not instead of it. A right you don't know you have cannot be claimed. Recognition has to come first.",
    reflect:
      "Who in your own circle has stopped asking for something because they've quietly stopped believing they deserve it? What would it take for you to notice, before they have to say it?",
  },
  {
    number: "03",
    title: "Courage Without Hatred",
    quote: [
      "Yes, many times. Speaking against caste discrimination, torture, bonded labour, communal hatred, and violence has often meant facing threats, intimidation, false accusations, social isolation, and even physical attacks. There were moments when remaining silent would have been easier and safer.",
      "Yet those experiences strengthened rather than weakened my conviction. I realized that principles have value only when they are upheld during difficult times. Leadership is not about choosing the comfortable path; it is about choosing the ethical one.",
      "At the same time, I learned that courage should never become hatred. Our struggle has always been rooted in non-violence, dialogue, and reconciliation. Real change is not achieved by humiliating opponents but by transforming systems and relationships so that justice and peace can coexist.",
    ],
    whatThisMeans:
      "This principle has cost him directly — threats, false accusations, social isolation, physical attacks. He names the cost plainly, and names just as plainly that it deepened his conviction rather than eroding it: a principle only proves itself in the moment it becomes inconvenient.",
    whyItMatters:
      "The harder discipline here isn't speaking up — it's speaking up without letting courage curdle into hatred. He ties his life's work to non-violence and reconciliation even under attack, on the belief that transforming a system beats humiliating an opponent.",
    reflect:
      "Where have you gone quiet because speaking up felt costly? And separately — where has your own frustration started to sound like hatred instead of conviction?",
  },
  {
    number: "04",
    title: "Principles Over Popularity",
    quote: [
      "Never allow success to redefine your values. Today's world rewards speed, visibility, and popularity, but meaningful leadership is built through patience, integrity, and trust. Do not measure your life by the number of followers you have; measure it by the number of lives you help improve.",
      "Stay curious. Listen to people whose experiences are different from your own. Read widely, question your own assumptions, and never stop learning. The strongest leaders are those who remain humble enough to change their minds when confronted with truth.",
      "Most importantly, remember that disagreement is not the enemy of democracy; dehumanization is. Build bridges rather than walls. Protect your integrity even when it is inconvenient. Your principles should guide your ambition — not the other way around.",
    ],
    whatThisMeans:
      "Advice to young leaders and changemakers, aimed squarely at a culture that rewards speed and visibility. His counter-metric: not followers, but lives improved. Not certainty, but the humility to change your mind when confronted with truth.",
    whyItMatters:
      "The sharpest line he draws is between disagreement and dehumanization — the first is healthy for democracy, the second destroys it. That distinction is also the difference between ambition guided by principle and principle bent to serve ambition.",
    reflect:
      "Are your principles currently guiding your ambition — or has your ambition quietly started guiding your principles?",
  },
  {
    number: "05",
    title: "Choose to Build a Humane Future",
    quote: [
      "Every generation inherits two choices: to preserve the injustices of the past or to create a more humane future.",
      "The future of our societies will not be determined by technology alone or by economic growth alone. It will be determined by whether we can recognize the equal dignity of every human being, regardless of caste, religion, gender, ethnicity, or social status.",
      "I believe that human dignity is the foundation of democracy, justice, and lasting peace. When we listen before judging, include before excluding, and serve before seeking power, we create societies where everyone can flourish.",
      'My hope is that each of us asks one simple question every day: "Does my decision today increase another person\'s dignity?"',
      "If the answer is yes, then we are already helping to build a better world.",
    ],
    whatThisMeans:
      "He closes by naming the choice every generation actually faces: preserve the injustices inherited, or build something more humane. Neither technology nor economic growth decides this — recognition of equal dignity does.",
    whyItMatters:
      "This is the same principle from Issue 01, now handed to the reader as a daily practice: one question, asked every day, small enough to actually use — does my decision today increase another person's dignity?",
    reflect:
      "Ask yourself his question at the end of today: did your decisions increase another person's dignity? What would you do differently tomorrow if you asked it each morning instead?",
  },
];

const takeaways = [
  {
    title: "Dignity comes before identity.",
    body: "Caste, religion, gender, and politics are identities. Dignity is the birthright underneath all of them — and it isn't earned.",
  },
  {
    title: "People need to be heard before they can be represented.",
    body: "Legal remedies matter, but they only reach people who already believe they have rights worth claiming.",
  },
  {
    title: "Principles are proven under pressure, not in comfort.",
    body: "Threats, isolation, and false accusations tested this conviction — and it held. Courage that turns to hatred isn't courage anymore.",
  },
  {
    title: "Measure your life in lives improved, not followers gained.",
    body: "Popularity and meaningful leadership are not the same metric. Disagreement strengthens democracy; dehumanization destroys it.",
  },
  {
    title: "Ask one question daily.",
    body: '"Does my decision today increase another person\'s dignity?" A simple test, repeatable every day, for anyone.',
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
        / Dr. Lenin Raghuvanshi
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-6 text-center">
        <div className="mx-auto mb-6 w-40 overflow-hidden rounded-full ring-1 ring-neutral-200">
          <Image
            src="/lenin-portrait.jpg"
            alt="Dr. Lenin Raghuvanshi — Founder, PVCHR"
            width={516}
            height={387}
            className="h-40 w-40 object-cover object-top"
            priority
          />
        </div>
        <p className="text-sm text-neutral-500">
          Dr. Lenin Raghuvanshi · Founder, People&apos;s Vigilance Committee on Human Rights
          (PVCHR)
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          Stated Principles · Issue No. 002
        </p>

        <h1 className="mt-6 text-4xl font-serif italic tracking-tight md:text-5xl">
          Dr. Lenin <em>Raghuvanshi</em>
        </h1>

        <p className="mt-3 text-base font-medium">
          Founder, People&apos;s Vigilance Committee on Human Rights (PVCHR)
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Author,{" "}
          <a
            href="https://www.strandbooks.com/kashi-9789381043707.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-900"
          >
            Kashi: The Heartbeat of India&apos;s Civilizational Ethos
            <span className="sr-only"> (opens in new window)</span>
          </a>{" "}
          and <em>Dalits in Independent India</em>
        </p>

        <blockquote className="mx-auto mt-6 max-w-xl text-lg italic text-neutral-700">
          &ldquo;On what he stands for — five principles stated publicly, in his own words.&rdquo;
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
          <p className="font-medium">7 minutes</p>
        </div>
        <div>
          <p className="text-neutral-400">Principles</p>
          <p className="font-medium">5 stated</p>
        </div>
        <div>
          <p className="text-neutral-400">Published</p>
          <p className="font-medium">July 2026</p>
        </div>
      </section>

      {/* Tags */}
      <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-6 py-6 text-xs">
        {[
          "Human Rights Activist",
          "Founder, PVCHR",
          "Author",
          "Dalit Rights",
          "Civil Society Leader",
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
          &ldquo;We asked Dr. Lenin Raghuvanshi five questions. He gave us something better —
          five principles he lives by.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-neutral-700">
          Instead of a conventional interview, Dr. Lenin Raghuvanshi responded with the principles
          that have guided a lifetime of human rights work — from confronting caste
          discrimination and bonded labour in eastern Uttar Pradesh, to founding the
          People&apos;s Vigilance Committee on Human Rights (PVCHR), to writing about Kashi as a
          shared civilizational space.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-700">
          What follows is not a Q&amp;A. It is a record of what he stands for, stated publicly, in
          his own words. This is how <em>Stated Principles</em> works: the person states their
          beliefs. We make them visible. You decide what to carry forward.
        </p>
      </section>

      {/* Principles */}
      <section id="principles" className="mx-auto max-w-3xl px-6 py-6">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          Five principles · Stated by Dr. Lenin Raghuvanshi
        </p>
        <h2 className="mt-3 text-3xl font-serif">
          What he stands for — in his own words.
        </h2>

        <div className="mt-12 space-y-20">
          {principles.map((p) => (
            <article key={p.number} className="border-t border-neutral-200 pt-10">
              <p className="text-sm text-neutral-400">{p.number} of 05</p>
              <h3 className="mt-2 text-2xl font-serif">{p.title}</h3>

              <blockquote className="mt-5 space-y-4 border-l-2 border-neutral-300 pl-5 text-neutral-800">
                {p.quote.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </blockquote>
              <p className="mt-3 text-sm text-neutral-500">
                — Dr. Lenin Raghuvanshi, stated directly
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

      {/* Pull quote */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-3xl font-serif leading-snug">
          &ldquo;Human dignity is not a reward to be earned;
          <br />
          it is <em>a birthright</em> that must be protected for everyone.&rdquo;
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Dr. Lenin Raghuvanshi — Principle I, Stated
        </p>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs uppercase tracking-wide text-neutral-400">Key takeaways</p>
        <h2 className="mt-3 text-3xl font-serif">Five ideas worth carrying forward</h2>

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
          Post a commitment inspired by Dr. Lenin Raghuvanshi&apos;s principles. State it publicly
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
        <p className="mt-4 text-sm text-neutral-500">7 min read · 5 principles</p>
        <p className="text-sm text-neutral-400">app.stated.in/principles/{SLUG}</p>
        <Link href="/principles" className="mt-4 inline-block text-sm underline">
          All Stated Principles features
        </Link>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-3xl px-6 py-10 text-xs text-neutral-400">
        <div className="flex flex-wrap gap-4">
          <Link href="/">Home</Link>
          <a href="https://stated.in/privacy">Privacy Policy</a>
          <a href="https://stated.in/terms">Terms of Service</a>
          <a href="https://stated.in/refund">Refund Policy</a>
        </div>
        <p className="mt-4">© 2026 Stated • Built in India for the World</p>
      </footer>
    </main>
  );
}
