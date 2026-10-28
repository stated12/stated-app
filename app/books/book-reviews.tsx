"use client";

import { useState } from "react";
import ReviewForm from "./review-form";

type R = { id: string; reviewer_name: string; rating: number; body: string; disclosure?: string | null; created_at: string };

const Stars = ({ n }: { n: number }) => (
  <span className="text-amber-500" aria-label={`${n} out of 5`}>
    {"★".repeat(n)}
    <span className="text-gray-300">{"★".repeat(5 - n)}</span>
  </span>
);

export default function BookReviews({ slug, title, reviews, defaultWriting = false }: { slug: string; title: string; reviews: R[]; defaultWriting?: boolean }) {
  const [all, setAll] = useState(false);
  const [writing, setWriting] = useState(defaultWriting);
  const n = reviews.length;
  const avg = n ? reviews.reduce((t, r) => t + r.rating, 0) / n : 0;
  const shown = all ? reviews : reviews.slice(0, 2);

  return (
    <div className="mt-6 border-t border-gray-200 pt-5" id="write-review">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-700">
          {n ? (
            <>
              <Stars n={Math.round(avg)} /> <span className="font-semibold">{avg.toFixed(1)}</span>
              <span className="text-gray-500"> · {n} {n === 1 ? "review" : "reviews"}</span>
            </>
          ) : (
            <span className="text-gray-500">No reviews yet</span>
          )}
        </p>
        <button
          type="button"
          onClick={() => setWriting((v) => !v)}
          className="text-sm font-medium text-amber-700 hover:underline"
        >
          {writing ? "Close" : "Write a review"}
        </button>
      </div>

      {writing ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
          <ReviewForm books={[{ slug, title }]} bookSlug={slug} />
        </div>
      ) : null}

      {shown.length ? (
        <div className="mt-4 space-y-4">
          {shown.map((r) => (
            <div key={r.id} className="text-sm">
              <Stars n={r.rating} />
              <p className="text-gray-700 font-light leading-relaxed mt-1 whitespace-pre-line">{r.body}</p>
              {r.disclosure ? <p className="text-xs text-gray-500 italic mt-1">Disclosure: {r.disclosure}</p> : null}
              <p className="text-xs text-gray-400 mt-1">
                {r.reviewer_name} · {new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
          ))}
          {n > 2 ? (
            <button type="button" onClick={() => setAll((v) => !v)} className="text-sm text-gray-500 hover:underline">
              {all ? "Show fewer" : `See all ${n} reviews`}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
