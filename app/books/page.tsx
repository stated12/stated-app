import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Stated Bookshelf -- Books by Leaders in Public Service",
  description:
    "A curated shelf of books by police officers, administrators and soldiers who have served the republic -- led by Policing the Republic by Yashovardhan Azad.",
  metadataBase: new URL("https://app.stated.in"),
  openGraph: {
    title: "Stated Bookshelf",
    description: "Books by leaders in public service, led by Policing the Republic by Yashovardhan Azad.",
    url: "https://app.stated.in/books",
    siteName: "Stated",
    images: [{ url: "/books/policing-the-republic.jpg", width: 900, height: 1293, alt: "Policing the Republic" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stated Bookshelf",
    description: "Books by leaders in public service.",
    images: ["/books/policing-the-republic.jpg"],
  },
  alternates: { canonical: "https://app.stated.in/books" },
};

// ── DATA ──────────────────────────────────────────────────────────────────────
// Details below are taken from the book covers only. Add buy links by filling `link`.
const featured = {
  title: "Policing the Republic",
  subtitle: "An Inside View of How India Fights Corruption and Crime, and Protects Rights",
  author: "Yashovardhan Azad",
  note: "Foreword by M.K. Narayanan",
  publisher: "Bloomsbury",
  cover: "/books/policing-the-republic.jpg",
  w: 900,
  h: 1293,
  link: "", // e.g. "https://www.bloomsbury.com/..."
};

const shelf = [
  {
    title: "Dynamic D.M.",
    subtitle: "सहयोग से सुशासन, सुशासन से समृद्धि",
    author: "Dr. Heera Lal, IAS · Kumud Verma",
    language: "Hindi",
    cover: "/books/dynamic-dm.jpg",
    w: 862,
    h: 1300,
    link: "",
  },
  {
    title: "Khaki in Action",
    subtitle: "Unsuni Case Files (Hindi edition of Crime, Grime & Gumption)",
    author: "O.P. Singh, Former Director General of Police",
    language: "Hindi",
    cover: "/books/khaki-in-action.jpg",
    w: 900,
    h: 1285,
    link: "",
  },
  {
    title: "Kashmir in the Line of Fire",
    subtitle: "A Memoir of Its Unordinary People and Soldiers",
    author: "Maj Gen Ranjan Mahajan",
    language: "English",
    cover: "/books/kashmir-in-the-line-of-fire.jpg",
    w: 896,
    h: 1300,
    link: "",
  },
];

const NOMINATION_MAIL =
  "mailto:hello@stated.in?subject=" + encodeURIComponent("Book suggestion for the Stated Bookshelf");

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function BooksPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@300;400&display=swap');
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .mono  { font-family: 'DM Mono', monospace; }
        .cover { box-shadow: 0 18px 40px -14px rgba(17,24,39,.45), 0 4px 10px -4px rgba(17,24,39,.25); }
      `}</style>

      {/* HERO */}
      <section
        className="border-b border-gray-200 px-6 pt-16 pb-10"
        style={{ background: "linear-gradient(180deg,#fafaf8 0%,#ffffff 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">Stated Bookshelf</span>
          </div>
          <h1 className="serif text-5xl md:text-7xl font-light text-gray-900 leading-none tracking-tight mb-5">
            Books by those who{" "}
            <em className="italic text-amber-600">served the republic.</em>
          </h1>
          <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-xl">
            Memoirs and field accounts from police officers, administrators and soldiers, in their own words.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 py-14 border-b border-amber-100" style={{ background: "#fffbeb" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">Featured</span>
          </div>
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2 mx-auto w-full max-w-[300px]">
              <Image
                src={featured.cover}
                alt={`${featured.title} by ${featured.author}`}
                width={featured.w}
                height={featured.h}
                priority
                className="cover w-full h-auto rounded-sm"
              />
            </div>
            <div className="md:col-span-3">
              <h2 className="serif text-4xl md:text-5xl font-light text-gray-900 leading-tight tracking-tight mb-3">
                {featured.title}
              </h2>
              <p className="text-gray-500 text-base font-light leading-relaxed mb-5">{featured.subtitle}</p>
              <p className="text-gray-900 text-sm font-semibold mb-1">{featured.author}</p>
              <p className="text-gray-500 text-sm font-light mb-1">{featured.note}</p>
              <p className="mono text-xs text-gray-400 tracking-widest uppercase mb-6">{featured.publisher}</p>
              {featured.link ? (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline"
                >
                  Get the book
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* SHELF */}
      <section className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">More on the shelf</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {shelf.map((b) => (
              <article key={b.title} className="flex flex-col">
                <div className="mx-auto w-full max-w-[240px] mb-5">
                  <Image
                    src={b.cover}
                    alt={`${b.title} by ${b.author}`}
                    width={b.w}
                    height={b.h}
                    className="cover w-full h-auto rounded-sm"
                  />
                </div>
                <h3 className="serif text-2xl font-normal text-gray-900 leading-snug mb-1">{b.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-2">{b.subtitle}</p>
                <p className="text-gray-900 text-sm font-medium mb-2">{b.author}</p>
                <p className="mono text-xs text-amber-600 tracking-widest uppercase">{b.language}</p>
                {b.link ? (
                  <a
                    href={b.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-sm text-amber-600 hover:underline"
                  >
                    Get the book
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUGGEST */}
      <section className="px-6 py-12 border-t border-gray-200" style={{ background: "#fafaf8" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 text-sm font-light mb-4 max-w-xl">
            Written a book, or know one that belongs on this shelf? Tell us.
          </p>
          <a
            href={NOMINATION_MAIL}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg transition-all no-underline"
          >
            Suggest a book
          </a>
        </div>
      </section>
    </div>
  );
}
