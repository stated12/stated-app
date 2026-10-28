// Use inside app/sitemap.ts:  import { bookshelfSitemap } from "./books/sitemap-bookshelf";  ...  return [...yourExisting, ...bookshelfSitemap()];
import { allBooks, authors } from "./data";

export function bookshelfSitemap() {
  const base = "https://app.stated.in";
  return [
    { url: `${base}/books` },
    { url: `${base}/books/for-authors` },
    ...allBooks.map((b) => ({ url: `${base}/books/${b.slug}`, lastModified: new Date(b.addedAt) })),
    ...authors.map((a) => ({ url: `${base}/authors/${a.slug}` })),
  ];
}
