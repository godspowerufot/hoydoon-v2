"use client";

import Link from "next/link";
import { MessageSquareQuote, Sparkles } from "lucide-react";
import ReviewStars from "./ReviewStars";
import type { ReviewItem } from "./ReviewCard";

function averageRating(reviews: ReviewItem[]) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((total, review) => total + (review.rating || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

type ReviewSummaryAsideProps = {
  reviews: ReviewItem[];
  totalCount: number;
  averageRating?: number;
  isLoading?: boolean;
};

export default function ReviewSummaryAside({
  reviews,
  totalCount,
  averageRating: averageFromApi,
  isLoading = false,
}: ReviewSummaryAsideProps) {
  const avg =
    averageFromApi && averageFromApi > 0
      ? averageFromApi
      : averageRating(reviews);
  const displayAvg = isLoading ? "—" : avg > 0 ? avg.toFixed(1) : "—";

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_12px_32px_rgba(17,17,17,0.06)]">
        <div className="relative bg-[#0f3d40] px-6 py-7 md:px-7 md:py-8">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(9,133,141,0.35),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                Hoydoon reviews
              </p>
              <h2 className="mt-1 font-heading text-xl font-semibold leading-snug text-white md:text-2xl">
                Trusted by buyers &amp; renters
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Real stories from people who found homes and agents through
                Hoydoon across Nigeria, Kenya, and Somalia.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 md:px-7">
          <div className="flex items-end gap-4">
            <p className="font-heading text-5xl font-semibold tracking-tight text-[#111]">
              {displayAvg}
            </p>
            <div className="pb-1">
              <ReviewStars rating={avg} />
              <p className="mt-1 text-sm text-[#5c5c66]">
                {isLoading
                  ? "Loading…"
                  : `${totalCount} ${totalCount === 1 ? "review" : "reviews"}`}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#ececec] bg-[#f7f7f8] px-6 py-5">
          <Link
            href="/search"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-[#07757c]"
          >
            Browse listings
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
        <div className="border-b border-[#ececec] px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3fbfb] text-primary">
              <MessageSquareQuote className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-[#111]">
                Share your experience
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5c5c66]">
                Used Hoydoon to buy, rent, or sell? We&apos;d love to hear how
                it went.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3 px-6 py-5">
          <Link
            href="/contact"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#ececec] bg-white text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
          >
            Contact us
          </Link>
          <Link
            href="/agent"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#ececec] bg-white text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
          >
            Find an agent
          </Link>
        </div>
      </div>
    </aside>
  );
}
