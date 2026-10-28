import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allBooks, authors, categories, categoryBySlug, bookBySlug } from "./data";
import { getApprovedReviews, summarize } from "./reviews";
import { Fonts, Eyebrow, Stars, BookCard } from "./ui";

export const metadata: Metadata = {
  title: "Stated Bookshelf -- Books Worth Discovering",
  description:
    "Explore books by distinguished authors, public servants, military leaders, educators, researchers, and thinkers. Read fellow readers' reviews and share your own.",
  metadataBase: new URL("https://app.stated.in"),
  openGraph: {
    title: "Stated Bookshelf",
    description: "Books Worth Discovering. Perspectives Worth Remembering.",
    url: "https://app.stated.in/books",
    siteName: "Stated",
    images: [{ url: "/policing-the-republic.jpg", width: 900, height: 1293, alt: "Policing the Republic" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Stated Bookshelf", images: ["/policing-the-republic.jpg"] },
  alternates: { canonical: "https://app.stated.in/books" },
};

const PAGE_SIZE = 12;
type SP = { q?: string; category?: string; sort?: string; page?: string };

const FAQ = [
  ["Is Stated Bookshelf free for readers?", "Yes. Browsing books, reading reviews and submitting a review are free."],
  ["How are books listed?", "Books are curated by the Stated team. Authors who would like a listing can write to us or read about author memberships."],
  ["How do reviews work?", "Anyone can submit a review. Every review is read by the Stated team and published only after approval. Reviewers can also disclose a free copy or a connection to the author."],
  ["Can an author pay for better reviews or approval?", "No. Membership never influences whether a review is approved, and it never confers editorial recognition."],
  ["What do author memberships include?", "A dedicated author profile, a number of book listings and a shareable bookshelf. See the For Authors page for plans, limits and pricing."],
  ["How do I report a review or ask for a correction?", "Write to hello@stated.in with the book and the details. Abuse, spam, impersonation and irrelevant content are removed; honest criticism is not."],
];

export default async function BooksPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = (sp.q || "").trim().toLowerCase();
  const cat = sp.category && categoryBySlug(sp.category) ? sp.category : "";
  const reviews = await getApprovedReviews();
  const stats = summarize(reviews);
  const anyReviews = reviews.length > 0;
  const sort = sp.sort === "recent" || (sp.sort === "reviewed" && anyReviews) ? sp.sort : "featured";

  let list = allBooks.filter(
    (b) =>
      (!cat || b.category === cat) &&
      (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
  );
  if (sort === "recent") list = [...list].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  if (sort === "reviewed")
    list = [...list].sort((a, b) => (stats.get(b.slug)?.n || 0) - (stats.get(a.slug)?.n || 0) || b.addedAt.localeCompare(a.addedAt));

  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(Math.max(parseInt(sp.page || "1", 10) || 1, 1), pages);
  const shown = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const filtering = Boolean(q || cat);

  const href = (o: Partial<SP>) => {
    const p = new URLSearchParams();
    const m = { q: sp.q, category: cat, sort: sort === "featured" ? "" : sort, page: "", ...o } as Record<string, string | undefined>;
    for (const [k, v] of Object.entries(m)) if (v) p.set(k, v);
    const s = p.toString();
    return "/books" + (s ? "?" + s : "") + "#explore";
  };

  const featuredBooks = allBooks.filter((b) => b.featured);
  const featuredAuthors = authors.filter((a) => a.featured);
  const recent = [...allBooks].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 4);
  const latestReviews = reviews.slice(0, 3);
  const bookCount = (slug: string) => allBooks.filter((b) => b.authorSlug === slug).length;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Fonts />

      {/* HERO */}
      <section className="border-b border-gray-200 px-6 pt-16 pb-12" style={{ background: "linear-gradient(180deg,#fafaf8 0%,#ffffff 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <Eyebrow>Stated Bookshelf</Eyebrow>
          <h1 className="serif text-5xl md:text-7xl font-light text-gray-900 leading-none tracking-tight mb-5">
            Books Worth Discovering.<br />
            <em className="italic text-amber-600">Perspectives Worth Remembering.</em>
          </h1>
          <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8">
            Explore books by distinguished authors, public servants, military leaders, educators, researchers, and thinkers.
            Discover their work, read fellow readers&rsquo; reviews, and share your own perspective.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#explore" className="inline-flex items-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline">Explore Books</a>
            <Link href="/books/for-authors" className="inline-flex items-center bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg transition-all no-underline">For Authors</Link>
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      {featuredBooks.length > 0 && !filtering ? (
        <section className="px-6 py-14 border-b border-amber-100" style={{ background: "#fffbeb" }}>
          <div className="max-w-4xl mx-auto">
            <Eyebrow>Featured books</Eyebrow>
            {featuredBooks.map((b) => {
              const st = stats.get(b.slug);
              return (
                <div key={b.slug} className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
                  <Link href={`/books/${b.slug}`} className="md:col-span-2 mx-auto w-full max-w-[280px] no-underline">
                    <div className="relative aspect-[2/3] cover rounded-sm overflow-hidden bg-stone-100">
                      <Image src={b.cover} alt={`Cover of ${b.title} by ${b.author}`} fill sizes="280px" priority className="object-cover" />
                    </div>
                  </Link>
                  <div className="md:col-span-3">
                    <h2 className="serif text-4xl md:text-5xl font-light text-gray-900 leading-tight tracking-tight mb-3">{b.title}</h2>
                    <p className="text-gray-500 text-base font-light leading-relaxed mb-4">{b.subtitle}</p>
                    <p className="text-gray-900 text-sm font-semibold mb-1">{b.author}</p>
                    {b.note ? <p className="text-gray-500 text-sm font-light mb-3">{b.note}</p> : null}
                    {st ? (
                      <p className="text-sm text-gray-600 mb-4">
                        <Stars n={Math.round(st.avg)} /> {st.avg.toFixed(1)} ({st.n} {st.n === 1 ? "review" : "reviews"})
                      </p>
                    ) : null}
                    <Link href={`/books/${b.slug}`} className="inline-flex items-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline">
                      View book and reviews
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* FEATURED AUTHORS */}
      {featuredAuthors.length > 0 && !filtering ? (
        <section className="px-6 py-12 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <Eyebrow>Featured authors</Eyebrow>
            <div className="grid sm:grid-cols-2 gap-4">
              {featuredAuthors.map((a) => (
                <Link key={a.slug} href={`/authors/${a.slug}`} className="block rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all no-underline">
                  <p className="serif text-2xl text-gray-900">{a.name}</p>
                  <p className="text-sm text-gray-500 font-light mt-1">{a.role}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* EXPLORE: SEARCH, FILTER, ALL BOOKS */}
      <section id="explore" className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <Eyebrow>{filtering ? "Search results" : "All books"}</Eyebrow>

          <form action="/books#explore" method="GET" className="flex gap-2 mb-4">
            <input type="hidden" name="category" value={cat} />
            <input type="hidden" name="sort" value={sort === "featured" ? "" : sort} />
            <label htmlFor="q" className="sr-only">Search by title or author</label>
            <input
              id="q"
              name="q"
              defaultValue={sp.q || ""}
              placeholder="Search by title or author"
              className="flex-1 min-w-0 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-gray-500"
            />
            <button type="submit" className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-5 rounded-lg">Search</button>
          </form>

          <div className="flex flex-wrap gap-2 mb-3">
            <Link href={href({ category: "" })} className={`text-xs px-3 py-1.5 rounded-full border no-underline ${!cat ? "bg-gray-900 text-white border-gray-900" : "text-gray-600 border-gray-300"}`}>All</Link>
            {categories.map((c) => (
              <Link key={c.slug} href={href({ category: c.slug })} className={`text-xs px-3 py-1.5 rounded-full border no-underline ${cat === c.slug ? "bg-gray-900 text-white border-gray-900" : "text-gray-600 border-gray-300"}`}>{c.name}</Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-8">
            <span>Sort:</span>
            <Link href={href({ sort: "" })} className={`no-underline ${sort === "featured" ? "text-gray-900 font-semibold" : ""}`}>Featured</Link>
            <Link href={href({ sort: "recent" })} className={`no-underline ${sort === "recent" ? "text-gray-900 font-semibold" : ""}`}>Recently added</Link>
            {anyReviews ? (
              <Link href={href({ sort: "reviewed" })} className={`no-underline ${sort === "reviewed" ? "text-gray-900 font-semibold" : ""}`}>Most reviewed</Link>
            ) : null}
            <span className="ml-auto">{list.length} {list.length === 1 ? "book" : "books"}</span>
          </div>

          {shown.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
              <p className="text-gray-700 text-sm mb-3">No books match your search.</p>
              <Link href="/books#explore" className="text-sm text-amber-700 hover:underline">Clear search and filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {shown.map((b) => (
                <BookCard key={b.slug} b={b} stat={stats.get(b.slug)} />
              ))}
            </div>
          )}

          {pages > 1 ? (
            <nav className="flex items-center justify-between mt-10 text-sm" aria-label="Pagination">
              {page > 1 ? <Link href={href({ page: String(page - 1) })} className="text-amber-700 hover:underline">Previous</Link> : <span />}
              <span className="text-gray-500">Page {page} of {pages}</span>
              {page < pages ? <Link href={href({ page: String(page + 1) })} className="text-amber-700 hover:underline">Next</Link> : <span />}
            </nav>
          ) : null}
        </div>
      </section>

      {!filtering ? (
        <>
          {/* RECENTLY ADDED */}
          <section className="px-6 py-14 border-t border-gray-100" style={{ background: "#fafaf8" }}>
            <div className="max-w-4xl mx-auto">
              <Eyebrow>Recently added</Eyebrow>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
                {recent.map((b) => (
                  <BookCard key={b.slug} b={b} stat={stats.get(b.slug)} />
                ))}
              </div>
            </div>
          </section>

          {/* BROWSE BY CATEGORY */}
          <section className="px-6 py-14 border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
              <Eyebrow>Browse by category</Eyebrow>
              <div className="grid sm:grid-cols-3 gap-4">
                {categories.map((c) => {
                  const n = allBooks.filter((b) => b.category === c.slug).length;
                  return (
                    <Link key={c.slug} href={href({ category: c.slug })} className="block rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all no-underline">
                      <p className="serif text-2xl text-gray-900">{c.name}</p>
                      <p className="text-sm text-gray-500 font-light mt-1 mb-3">{c.blurb}</p>
                      <p className="mono text-xs text-amber-600 tracking-widest uppercase">{n} {n === 1 ? "book" : "books"}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* READER REVIEWS */}
          {latestReviews.length > 0 ? (
            <section className="px-6 py-14 border-t border-gray-100" style={{ background: "#fafaf8" }}>
              <div className="max-w-4xl mx-auto">
                <Eyebrow>Reader reviews</Eyebrow>
                <div className="grid md:grid-cols-3 gap-6">
                  {latestReviews.map((r) => {
                    const b = bookBySlug(r.book_slug);
                    return (
                      <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm"><Stars n={r.rating} /></p>
                        <p className="text-gray-700 text-sm font-light leading-relaxed mt-2 line-clamp-6 whitespace-pre-line">{r.body}</p>
                        <p className="text-xs text-gray-400 mt-3">
                          {r.reviewer_name} on{" "}
                          {b ? <Link href={`/books/${b.slug}`} className="text-amber-700 hover:underline">{b.title}</Link> : "a book"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : null}

          {/* EXPLORE AUTHORS */}
          <section className="px-6 py-14 border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
              <Eyebrow>Explore authors</Eyebrow>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {authors.map((a) => (
                  <Link key={a.slug} href={`/authors/${a.slug}`} className="block rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all no-underline">
                    <p className="serif text-xl text-gray-900 leading-snug">{a.name}</p>
                    <p className="text-xs text-gray-500 font-light mt-1 mb-2">{a.role}</p>
                    <p className="mono text-xs text-amber-600 tracking-widest uppercase">{bookCount(a.slug)} {bookCount(a.slug) === 1 ? "book" : "books"}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* HOW REVIEWS WORK */}
          <section className="px-6 py-14 border-t border-gray-100" style={{ background: "#fffbeb" }}>
            <div className="max-w-4xl mx-auto">
              <Eyebrow>How reviews work</Eyebrow>
              <div className="grid md:grid-cols-4 gap-6 text-sm text-gray-600 font-light leading-relaxed">
                {[
                  ["1. Write", "Pick a book, give a star rating and write 20 to 1,200 characters. No links."],
                  ["2. Review", "The Stated team reads every submission before anything is published."],
                  ["3. Publish", "Approved reviews appear on the book page. Pending reviews are never public."],
                  ["4. Stay honest", "Payment never affects approval. Authors cannot edit or remove reader reviews."],
                ].map(([h, t]) => (
                  <div key={h}>
                    <p className="text-gray-900 font-semibold mb-1">{h}</p>
                    <p>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* AUTHOR INVITATION */}
          <section className="px-6 py-14 border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
              <Eyebrow>For authors</Eyebrow>
              <h2 className="serif text-3xl md:text-4xl font-light text-gray-900 leading-tight tracking-tight mb-3">Give Your Books a Lasting Home.</h2>
              <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed max-w-xl mb-6">
                Bring your books, author profile, and reader reviews together in one shareable place.
              </p>
              <Link href="/books/for-authors" className="inline-flex items-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline">Create a Stated Bookshelf</Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="px-6 py-14 border-t border-gray-100" style={{ background: "#fafaf8" }}>
            <div className="max-w-3xl mx-auto">
              <Eyebrow>Frequently asked questions</Eyebrow>
              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {FAQ.map(([qn, an]) => (
                  <details key={qn} className="py-4 group">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-900 list-none flex justify-between gap-4">
                      {qn}
                      <span className="text-amber-600 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-sm text-gray-600 font-light leading-relaxed mt-2">{an}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
