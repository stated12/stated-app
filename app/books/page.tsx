import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { featured, shelf, type Book } from "./data";
import BookReviews from "./book-reviews";

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
    images: [{ url: "/policing-the-republic.jpg", width: 900, height: 1293, alt: "Policing the Republic" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stated Bookshelf",
    description: "Books by leaders in public service.",
    images: ["/policing-the-republic.jpg"],
  },
  alternates: { canonical: "https://app.stated.in/books" },
};

export const revalidate = 60;

type Review = { id: string; book_slug: string; reviewer_name: string; rating: number; body: string; created_at: string };

async function getReviews(): Promise<Review[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return [];
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data } = await supabase
      .from("book_reviews")
      .select("id, book_slug, reviewer_name, rating, body, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(60);
    return (data as Review[]) || [];
  } catch {
    return [];
  }
}

const Stars = ({ n }: { n: number }) => (
  <span className="text-amber-500" aria-label={`${n} out of 5`}>
    {"★".repeat(n)}
    <span className="text-gray-300">{"★".repeat(5 - n)}</span>
  </span>
);

const NOMINATION_MAIL =
  "mailto:hello@stated.in?subject=" + encodeURIComponent("Book suggestion for the Stated Bookshelf");

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default async function BooksPage() {
  const reviews = await getReviews();
  const stat = (slug: string) => {
    const r = reviews.filter((x) => x.book_slug === slug);
    if (!r.length) return null;
    return { avg: r.reduce((t, x) => t + x.rating, 0) / r.length, n: r.length };
  };
  const BookBlock = ({ b, big = false }: { b: Book; big?: boolean }) => {
    const rs = reviews.filter((x) => x.book_slug === b.slug);
    const st = stat(b.slug);
    return (
      <article id={b.slug} className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
        <div className={`md:col-span-2 mx-auto w-full ${big ? "max-w-[300px]" : "max-w-[240px]"}`}>
          <Image src={b.cover} alt={`${b.title} by ${b.author}`} width={b.w} height={b.h} priority={big} className="cover w-full h-auto rounded-sm" />
        </div>
        <div className="md:col-span-3">
          <h2 className={`serif font-light text-gray-900 leading-tight tracking-tight mb-3 ${big ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}>{b.title}</h2>
          <p className="text-gray-500 text-base font-light leading-relaxed mb-4">{b.subtitle}</p>
          <p className="text-gray-900 text-sm font-semibold mb-1">{b.author}</p>
          {b.note ? <p className="text-gray-500 text-sm font-light mb-1">{b.note}</p> : null}
          <p className="mono text-xs text-gray-400 tracking-widest uppercase mb-4">
            {[b.publisher, b.language].filter(Boolean).join(" · ")}
          </p>
          {st ? (
            <a href={`#reviews-${b.slug}`} className="text-sm text-gray-600 no-underline inline-block mb-4">
              <Stars n={Math.round(st.avg)} /> {st.avg.toFixed(1)} ({st.n} {st.n === 1 ? "review" : "reviews"})
            </a>
          ) : null}
          {b.about ? (
            <details className="mb-4 group">
              <summary className="cursor-pointer text-sm font-medium text-amber-700 list-none">
                <span className="group-open:hidden">About this book →</span>
                <span className="hidden group-open:inline">Hide description</span>
              </summary>
              <div className="mt-3 space-y-3 text-gray-600 text-sm font-light leading-relaxed">
                {b.about.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </details>
          ) : null}
          {b.link ? (
            <a href={b.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline">
              Get the book
            </a>
          ) : null}
          <BookReviews slug={b.slug} title={b.title} reviews={rs} />
        </div>
      </article>
    );
  };
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
          <BookBlock b={featured} big />
        </div>
      </section>

      {/* SHELF */}
      <section className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <span className="w-5 h-px bg-amber-600 inline-block" />
            <span className="mono text-amber-600 text-xs tracking-widest uppercase">More on the shelf</span>
          </div>
          <div className="space-y-14">
            {shelf.map((b) => (
              <div key={b.slug} className="pb-14 border-b border-gray-100 last:border-0 last:pb-0">
                <BookBlock b={b} />
              </div>
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
