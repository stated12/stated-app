import { createClient } from "@supabase/supabase-js";

export type Review = {
  id: string;
  book_slug: string;
  reviewer_name: string;
  rating: number;
  body: string;
  disclosure: string | null;
  created_at: string;
};

// Server-only helper: reads APPROVED reviews with the service role. Never import from a client component.
export async function getApprovedReviews(limit = 500): Promise<Review[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return [];
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data } = await supabase
      .from("book_reviews")
      .select("id, book_slug, reviewer_name, rating, body, disclosure, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data as Review[]) || [];
  } catch {
    return [];
  }
}

export type Stat = { n: number; avg: number };
export function summarize(reviews: Review[]): Map<string, Stat> {
  const m = new Map<string, { n: number; sum: number }>();
  for (const r of reviews) {
    const c = m.get(r.book_slug) || { n: 0, sum: 0 };
    c.n += 1;
    c.sum += r.rating;
    m.set(r.book_slug, c);
  }
  return new Map([...m].map(([k, v]) => [k, { n: v.n, avg: v.sum / v.n }]));
}
