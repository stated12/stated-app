"use client";

import { useState } from "react";

type Opt = { slug: string; title: string };

export default function ReviewForm({ books, bookSlug, onDone }: { books: Opt[]; bookSlug?: string; onDone?: () => void }) {
  const [rating, setRating] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/book-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_slug: bookSlug || f.get("book_slug"),
          name: f.get("name"),
          email: f.get("email"),
          body: f.get("body"),
          disclosure: f.get("disclosure"),
          website: f.get("website"),
          rating,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(j.error || "Something went wrong.");
        setState("idle");
        return;
      }
      setState("done");
      onDone?.();
    } catch {
      setError("Network error. Please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-6 text-sm text-gray-700">
        Thank you. Your review has been received and will appear once it is approved.
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-500";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {bookSlug ? null : <select name="book_slug" required defaultValue="" className={input}>
        <option value="" disabled>Choose the book</option>
        {books.map((b) => (
          <option key={b.slug} value={b.slug}>{b.title}</option>
        ))}
      </select>}

      <div>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              className={`text-3xl leading-none ${n <= rating ? "text-amber-500" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <input name="name" required minLength={2} maxLength={80} placeholder="Your name" className={input} />
      <input name="email" type="email" placeholder="Email (optional, never shown publicly)" className={input} />
      <textarea
        name="body"
        required
        minLength={20}
        maxLength={1200}
        rows={5}
        placeholder="Your review (20 to 1200 characters, no links)"
        className={input}
      />
      <select name="disclosure" defaultValue="" className={input} aria-label="Disclosure (optional)">
        <option value="">Disclosure (optional): none</option>
        <option value="free-copy">I received a free copy</option>
        <option value="connected">I know the author or publisher</option>
      </select>
      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={state === "sending" || rating === 0}
        className="inline-flex items-center bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all"
      >
        {state === "sending" ? "Sending..." : "Submit review"}
      </button>
      <p className="text-xs text-gray-400 font-light">Reviews are published after approval by the Stated team.</p>
    </form>
  );
}
