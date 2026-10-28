import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, createHmac } from "crypto";
import { allBooks } from "../../books/data";

export const runtime = "nodejs";

const ADMIN_EMAIL = process.env.REVIEW_ADMIN_EMAIL || "hello@stated.in";
const FROM = process.env.REVIEW_FROM_EMAIL || "Stated <hello@stated.in>";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://app.stated.in";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export async function POST(req: Request) {
  const secret = process.env.REVIEW_SECRET;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret || !url || !key) {
    return NextResponse.json({ error: "Reviews are not configured yet." }, { status: 500 });
  }

  let b: any;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this. Pretend success so bots move on.
  if (typeof b.website === "string" && b.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const slug = String(b.book_slug || "");
  const book = allBooks.find((x) => x.slug === slug);
  const name = String(b.name || "").trim();
  const email = String(b.email || "").trim().toLowerCase();
  const body = String(b.body || "").trim();
  const rating = Number(b.rating);
  const disclosure =
    b.disclosure === "free-copy" ? "Received a free copy" : b.disclosure === "connected" ? "Knows the author or publisher" : null;

  if (!book) return NextResponse.json({ error: "Please choose a book." }, { status: 400 });
  if (name.length < 2 || name.length > 80) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return NextResponse.json({ error: "Please give a star rating." }, { status: 400 });
  if (body.length < 20 || body.length > 1200) return NextResponse.json({ error: "Please write 20 to 1200 characters." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "That email looks invalid." }, { status: 400 });
  if (/https?:\/\/|www\./i.test(body)) return NextResponse.json({ error: "Please remove links from your review." }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const ipHash = createHash("sha256").update(ip + secret).digest("hex");

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Rate limit: 3 submissions per IP per 24h
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count } = await supabase
    .from("book_reviews")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if ((count ?? 0) >= 3) {
    return NextResponse.json({ error: "Too many submissions today. Please try again tomorrow." }, { status: 429 });
  }

  // One review per email per book
  if (email) {
    const { count: dup } = await supabase
      .from("book_reviews")
      .select("id", { count: "exact", head: true })
      .eq("book_slug", slug)
      .eq("reviewer_email", email);
    if ((dup ?? 0) > 0) {
      return NextResponse.json({ error: "You have already reviewed this book." }, { status: 409 });
    }
  }

  const { data, error } = await supabase
    .from("book_reviews")
    .insert({ book_slug: slug, reviewer_name: name, reviewer_email: email || null, rating, body, disclosure, ip_hash: ipHash })
    .select("id")
    .single();
  if (error || !data) {
    return NextResponse.json({ error: "Could not save your review. Please try again." }, { status: 500 });
  }

  // Notify admin with one-tap moderation links (signed)
  const token = createHmac("sha256", secret).update(data.id).digest("hex");
  const link = `${SITE}/api/book-reviews/moderate?id=${data.id}&t=${token}`;
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM,
          to: [ADMIN_EMAIL],
          subject: `New book review to approve: ${book.title} (${rating}/5)`,
          html: `<div style="font-family:Arial,sans-serif;max-width:520px">
            <h3>${esc(book.title)} — ${"★".repeat(rating)}${"☆".repeat(5 - rating)}</h3>
            <p style="white-space:pre-wrap">${esc(body)}</p>
            ${disclosure ? `<p><i>Disclosure: ${disclosure}</i></p>` : ""}
            <p><b>${esc(name)}</b><br>${email ? esc(email) : "no email given"}</p>
            <p><a href="${link}" style="background:#111827;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none">Review &amp; approve</a></p>
          </div>`,
        }),
      });
    } catch {
      /* the review is saved; the admin can still approve from the database */
    }
  }

  return NextResponse.json({ ok: true });
}
