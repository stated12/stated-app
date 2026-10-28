import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBooks, authorBySlug, bookBySlug, categoryBySlug } from "../data";
import { getApprovedReviews, summarize } from "../reviews";
import { Fonts, Eyebrow, RatingLine, BookCard } from "../ui";
import BookReviews from "../book-reviews";
import ShareBar from "../share-bar";

export const revalidate = 60;
const SITE = "https://app.stated.in";

export function generateStaticParams() {
  return allBooks.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = bookBySlug(slug);
  if (!b) return { title: "Book not found" };
  const desc = (b.about?.[0] || b.subtitle).slice(0, 200);
  const url = `${SITE}/books/${b.slug}`;
  return {
    title: `${b.title} by ${b.author} | Stated Bookshelf`,
    description: desc,
    metadataBase: new URL(SITE),
    alternates: { canonical: url },
    openGraph: { title: `${b.title} by ${b.author}`, description: desc, url, siteName: "Stated", images: [{ url: b.cover, width: b.w, height: b.h, alt: `Cover of ${b.title}` }], type: "book" },
    twitter: { card: "summary_large_image", title: `${b.title} by ${b.author}`, description: desc, images: [b.cover] },
  };
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ review?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const b = bookBySlug(slug);
  if (!b) notFound();

  const all = await getApprovedReviews();
  const mine = all.filter((r) => r.book_slug === b.slug);
  const stat = summarize(mine).get(b.slug);
  const author = b.authorSlug ? authorBySlug(b.authorSlug) : undefined;
  const cat = categoryBySlug(b.category);
  const more = allBooks.filter((x) => x.slug !== b.slug && (x.category === b.category || x.authorSlug === b.authorSlug)).slice(0, 4);

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: b.title,
    description: b.about?.[0] || b.subtitle,
    image: SITE + b.cover,
    url: `${SITE}/books/${b.slug}`,
    author: { "@type": "Person", name: author?.name || b.author },
    ...(b.language ? { inLanguage: b.language === "Hindi" ? "hi" : "en" } : {}),
    ...(b.publisher ? { publisher: { "@type": "Organization", name: b.publisher } } : {}),
    ...(stat ? { aggregateRating: { "@type": "AggregateRating", ratingValue: Number(stat.avg.toFixed(1)), reviewCount: stat.n } } : {}),
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Fonts />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      <section className="px-6 pt-10 pb-14 border-b border-gray-200" style={{ background: "linear-gradient(180deg,#fafaf8 0%,#ffffff 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
            <Link href="/books" className="hover:underline">Bookshelf</Link>
            {cat ? <> / <Link href={`/books?category=${cat.slug}#explore`} className="hover:underline">{cat.name}</Link></> : null}
          </nav>
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
            <div className="md:col-span-2 mx-auto w-full max-w-[300px]">
              <Image src={b.cover} alt={`Cover of ${b.title} by ${b.author}`} width={b.w} height={b.h} priority className="cover w-full h-auto rounded-sm" />
            </div>
            <div className="md:col-span-3">
              <h1 className="serif text-4xl md:text-5xl font-light text-gray-900 leading-tight tracking-tight mb-3">{b.title}</h1>
              <p className="text-gray-500 text-base font-light leading-relaxed mb-4">{b.subtitle}</p>
              <p className="text-gray-900 text-sm font-semibold mb-1">
                {author ? <Link href={`/authors/${author.slug}`} className="hover:underline">{b.author}</Link> : b.author}
              </p>
              {b.note ? <p className="text-gray-500 text-sm font-light mb-1">{b.note}</p> : null}
              <p className="mono text-xs text-gray-400 tracking-widest uppercase mb-4">
                {[b.publisher, b.language, cat?.name].filter(Boolean).join(" · ")}
              </p>
              <div className="mb-5"><RatingLine stat={stat} /></div>
              <div className="flex flex-wrap gap-3 mb-5">
                {b.link ? (
                  <a href={b.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline">Get the book</a>
                ) : null}
                <a href="#write-review" className="inline-flex items-center bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg transition-all no-underline">Write a review</a>
              </div>
              <ShareBar path={`/books/${b.slug}`} title={b.title} slug={b.slug} />
            </div>
          </div>
        </div>
      </section>

      {b.about ? (
        <section className="px-6 py-12 border-b border-gray-100">
          <div className="max-w-2xl mx-auto">
            <Eyebrow>About this book</Eyebrow>
            <div className="space-y-4 text-gray-600 text-base font-light leading-relaxed">
              {b.about.map((t, i) => <p key={i}>{t}</p>)}
            </div>
            {author ? (
              <p className="text-sm text-gray-500 mt-6">
                About the author: <Link href={`/authors/${author.slug}`} className="text-amber-700 hover:underline">{author.name}</Link>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="px-6 py-12 border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <Eyebrow>Reader reviews</Eyebrow>
          <p className="text-gray-500 text-sm font-light mb-2">
            Have you read this book? Share your honest review and help other readers discover it. Reviews are published after approval by the Stated team.
          </p>
          <BookReviews slug={b.slug} title={b.title} reviews={mine} defaultWriting={sp.review === "1"} />
        </div>
      </section>

      {more.length > 0 ? (
        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <Eyebrow>More on the bookshelf</Eyebrow>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {more.map((x) => <BookCard key={x.slug} b={x} />)}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
