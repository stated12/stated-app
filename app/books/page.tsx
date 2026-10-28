import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { featured, shelf, allBooks } from "./data";
import ReviewForm from "./review-form";

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
              <p className="mono text-xs text-gray-400 tracking-widest uppercase mb-4">{featured.publisher}</p>
              {stat(featured.slug) ? (
                <p className="text-sm text-gray-600 mb-6">
                  <Stars n={Math.round(stat(featured.slug)!.avg)} /> {stat(featured.slug)!.avg.toFixed(1)} ({stat(featured.slug)!.n})
                </p>
              ) : null}
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
                {stat(b.slug) ? (
                  <p className="text-sm text-gray-600 mt-2">
                    <Stars n={Math.round(stat(b.slug)!.avg)} /> {stat(b.slug)!.avg.toFixed(1)} ({stat(b.slug)!.n})
                  </p>
                ) : null}
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

      {/* REVIEWS */}
      <section id="reviews" className="px-6 py-14 border-t border-gray-200">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-5 h-px bg-amber-600 inline-block" />
              <span className="mono text-amber-600 text-xs tracking-widest uppercase">Reader reviews</span>
            </div>
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm font-light">No reviews yet. Be the first to share what you thought.</p>
            ) : (
              <div className="space-y-6">
                {reviews.map((r) => (
                  <div key={r.id} className="border-b border-gray-100 pb-5">
                    <p className="text-sm"><Stars n={r.rating}></Stars></p>
                    <p className="text-gray-700 text-sm font-light leading-relaxed mt-2 whitespace-pre-line">{r.body}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {r.reviewer_name} on {allBooks.find((b) => b.slug === r.book_slug)?.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-5 h-px bg-amber-600 inline-block" />
              <span className="mono text-amber-600 text-xs tracking-widest uppercase">Write a review</span>
            </div>
            <ReviewForm books={allBooks.map((b) => ({ slug: b.slug, title: b.title }))} />
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
