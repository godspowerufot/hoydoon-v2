"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useGetAllReviewsQuery } from "@/store/slices/api/authapi";
import { HomeContainer, SectionHeader, TextLink } from "./Section";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating || 0);
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < full ? "fill-primary text-primary" : "fill-[#e6e6e6] text-[#e6e6e6]"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#ececec] bg-white p-6" aria-hidden="true">
      <div className="shimmer h-4 w-24 rounded" />
      <div className="shimmer mt-4 h-16 w-full rounded" />
      <div className="mt-6 flex items-center gap-3">
        <div className="shimmer h-11 w-11 rounded-full" />
        <div className="shimmer h-4 w-28 rounded" />
      </div>
    </div>
  );
}

type ReviewItem = {
  _id?: string;
  rating?: number;
  comment?: string;
  user?: { fullname?: string; pictureUrl?: string };
};

export default function HomeTestimonials() {
  const { data, isLoading } = useGetAllReviewsQuery(undefined);
  const reviews = (data?.reviews || []).slice(0, 6);

  return (
    <section className="pb-16 md:pb-24" aria-labelledby="reviews-heading">
      <HomeContainer>
        <SectionHeader
          headingId="reviews-heading"
          eyebrow="Reviews"
          title="What people are saying"
          description="Buyers, renters, and agents sharing how they found the right place, without the usual runaround."
          action={<TextLink href="/review">Read all reviews</TextLink>}
          align="between"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d9d9d9] bg-white px-6 py-14 text-center">
            <p className="text-lg font-semibold text-[#111]">No reviews yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6b6b6b]">
              Be the first to share how Hoydoon helped you find a home or close a deal.
            </p>
            <Link
              href="/review"
              className="mt-6 inline-flex h-11 items-center rounded-full border border-primary px-5 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary hover:text-[#fff]"
            >
              Leave a review
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review: ReviewItem, index: number) => (
              <article
                key={review?._id || index}
                className="flex h-full flex-col rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)]"
              >
                <Stars rating={review?.rating || 0} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#3f3f3f] md:text-base">
                  “{review?.comment || "Great experience finding a home on Hoydoon."}”
                </blockquote>
                <footer className="mt-5 flex items-center gap-3 border-t border-[#f0f0f0] pt-4">
                  <Image
                    src={review?.user?.pictureUrl || "/Avatar.svg"}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#111]">
                      {review?.user?.fullname || "Hoydoon user"}
                    </p>
                    <p className="text-xs text-[#8a8a8a]">Verified review</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        )}
      </HomeContainer>
    </section>
  );
}
