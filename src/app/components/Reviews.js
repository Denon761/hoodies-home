"use client";

import { Star } from "lucide-react";
import Reveal from "./Reveal";
import { reviews as allReviews, getReviewsForCollection, getAverageRating } from "../data/reviews";
import { getVariantById } from "../data/product";

function StarRow({ rating, size = "h-3.5 w-3.5" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${size} ${n <= rating ? "fill-ink text-ink" : "fill-none text-line"}`}
        />
      ))}
    </div>
  );
}

export default function Reviews({ variantId, limit = 6, index = "03", heading = "What They're Saying" }) {
  const variant = variantId ? getVariantById(variantId) : null;
  const pool = variant ? getReviewsForCollection(variant.collection) : allReviews;
  const shown = pool.slice(0, limit);
  const avg = getAverageRating(pool);

  if (shown.length === 0) return null;

  return (
    <Reveal className="w-full">
      <section className="w-full py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-4 pb-4 sm:px-6">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-lg text-ink">{index}</span>
            <h2 className="font-display text-lg uppercase tracking-tight text-ink">{heading}</h2>
          </div>
          <div className="flex items-center gap-2">
            <StarRow rating={Math.round(avg)} />
            <p className="text-xs text-zinc-500">
              {avg.toFixed(1)} out of 5 &middot; {pool.length} review{pool.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((review) => (
            <div key={review.id} className="flex flex-col gap-3 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <StarRow rating={review.rating} />
                {review.verified && (
                  <span className="text-[10px] font-bold uppercase tracking-wide text-success">
                    Verified Buyer
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold uppercase tracking-tight text-ink">{review.title}</p>
              <p className="flex-1 text-sm leading-relaxed text-zinc-600">{review.text}</p>
              <div className="flex items-center justify-between border-t border-line pt-3">
                <p className="text-xs font-bold text-ink">{review.name}</p>
                <p className="text-[11px] text-zinc-400">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
