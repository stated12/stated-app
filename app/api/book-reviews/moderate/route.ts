import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { allBooks } from "../../../books/data";

export const runtime = "nodejs";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
function page(inner: string, status = 200) {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Review moderation</title></head>
     <body style="font-family:Arial,sans-serif;max-width:520px;margin:32px auto;padding:0 16px;color:#111827">${inner}</body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } }
  );
}
function validToken(id: string, t: string, secret: string) {
  const good = createHmac("sha256", secret).update(id).digest("hex");
  const a = Buffer.from(good);
  const b = Buffer.from(t);
  return a.length === b.length && timingSafeEqual(a, b);
}
function db() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

// GET only shows the review and buttons (safe against email link scanners)
export async function GET(req: Request) {
  const secret = process.env.REVIEW_SECRET;
  const u = new URL(req.url);
  const id = u.searchParams.get("id") || "";
  const t = u.searchParams.get("t") || "";
  if (!secret || !id || !validToken(id, t, secret)) return page("<p>Invalid link.</p>", 403);

  const { data } = await db().from("book_reviews").select("*").eq("id", id).single();
  if (!data) return page("<p>Review not found.</p>", 404);
  const book = allBooks.find((b) => b.slug === data.book_slug);

  return page(`
    <h3>${esc(book?.title || data.book_slug)} — ${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)}</h3>
    <p style="white-space:pre-wrap">${esc(data.body)}</p>
    <p><b>${esc(data.reviewer_name)}</b><br>${data.reviewer_email ? esc(data.reviewer_email) : "no email given"}</p>
    <p>Current status: <b>${esc(data.status)}</b></p>
    <form method="POST" style="display:flex;gap:12px">
      <input type="hidden" name="id" value="${esc(id)}"><input type="hidden" name="t" value="${esc(t)}">
      <button name="action" value="approve" style="flex:1;padding:14px;background:#15803d;color:#fff;border:0;border-radius:8px;font-size:16px">Approve</button>
      <button name="action" value="reject" style="flex:1;padding:14px;background:#b91c1c;color:#fff;border:0;border-radius:8px;font-size:16px">Reject</button>
    </form>`);
}

export async function POST(req: Request) {
  const secret = process.env.REVIEW_SECRET;
  const f = await req.formData();
  const id = String(f.get("id") || "");
  const t = String(f.get("t") || "");
  const action = String(f.get("action") || "");
  if (!secret || !id || !validToken(id, t, secret)) return page("<p>Invalid link.</p>", 403);
  if (action !== "approve" && action !== "reject") return page("<p>Invalid action.</p>", 400);

  const { error } = await db()
    .from("book_reviews")
    .update({ status: action === "approve" ? "approved" : "rejected", moderated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return page("<p>Could not update. Please try again.</p>", 500);

  revalidatePath("/books");
  return page(`<h3>${action === "approve" ? "Approved — now live on /books" : "Rejected"}</h3>`);
}
