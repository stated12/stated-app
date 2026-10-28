import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBooks, authors, authorBySlug } from "../../books/data";
import { getApprovedReviews, summarize } from "../../books/reviews";
import { Fonts, Eyebrow, Stars, BookCard } from "../../books/ui";
import ShareBar from "../../books/share-bar";

export const revalidate = 60;
const SITE = "https://app.stated.in";

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = authorBySlug(slug);
  if (!a) return { title: "Author not found" };
  const url = `${SITE}/authors/${a.slug}`;
  const desc = `${a.role}. ${a.bio[0]}`.slice(0, 200);
  const cover = allBooks.find((b) => b.authorSlug === a.slug)?.cover;
  return {
    title: `${a.name} | Stated Bookshelf`,
    description: desc,
    metadataBase: new URL(SITE),
    alternates: { canonical: url },
    openGraph: { title: a.name, description: desc, url, siteName: "Stated", type: "profile", ...(cover ? { images: [{ url: cover }] } : {}) },
    twitter: { card: "summary", title: a.name, description: desc },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = authorBySlug(slug);
  if (!a) notFound();

  const books = allBooks.filter((b) => b.authorSlug === a.slug);
  const slugs = new Set(books.map((b) => b.slug));
  const all = await getApprovedReviews();
  const rs = all.filter((r) => slugs.has(r.book_slug));
  const stats = summarize(all);
  const title = (s: string) => allBooks.find((b) => b.slug === s)?.title;
  const mail = `mailto:hello@stated.in?subject=${encodeURIComponent("Author profile correction: " + a.name)}`;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    description: a.role,
    url: `${SITE}/authors/${a.slug}`,
    ...(books.length ? { author: books.map((b) => ({ "@type": "Book", name: b.title, url: `${SITE}/books/${b.slug}` })) } : {}),
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Fonts />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      <section className="px-6 pt-10 pb-12 border-b border-gray-200" style={{ background: "linear-gradient(180deg,#fafaf8 0%,#ffffff 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
            <Link href="/books" className="hover:underline">Bookshelf</Link> / Authors
          </nav>
          <Eyebrow>Author</Eyebrow>
          <h1 className="serif text-4xl md:text-6xl font-light text-gray-900 leading-tight tracking-tight mb-3">{a.name}</h1>
          <p className="text-gray-500 text-base font-light mb-6">{a.role}</p>
          <div className="space-y-4 text-gray-600 text-base font-light leading-relaxed mb-6">
            {a.bio.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-5">
            {a.principlesUrl ? (
              <Link href={a.principlesUrl} className="text-sm font-medium text-amber-700 hover:underline">Read the Stated Principles feature</Link>
            ) : null}
            <a href={mail} className="text-sm text-gray-500 hover:underline">Request a correction</a>
          </div>
          <ShareBar path={`/authors/${a.slug}`} title={a.name} />
        </div>
      </section>

      <section className="px-6 py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Eyebrow>{books.length === 1 ? "Book" : "Books"}</Eyebrow>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {books.map((b) => <BookCard key={b.slug} b={b} stat={stats.get(b.slug)} />)}
          </div>
        </div>
      </section>

      {rs.length > 0 ? (
        <section className="px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <Eyebrow>Reader reviews</Eyebrow>
            <div className="space-y-6">
              {rs.map((r) => (
                <div key={r.id} className="border-b border-gray-100 pb-5 text-sm">
                  <Stars n={r.rating} />
                  <p className="text-gray-700 font-light leading-relaxed mt-1 whitespace-pre-line">{r.body}</p>
                  {r.disclosure ? <p className="text-xs text-gray-500 italic mt-1">Disclosure: {r.disclosure}</p> : null}
                  <p className="text-xs text-gray-400 mt-1">
                    {r.reviewer_name} on <Link href={`/books/${r.book_slug}`} className="text-amber-700 hover:underline">{title(r.book_slug)}</Link>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
