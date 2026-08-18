"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useGetAllReviewsQuery } from "@/store/slices/api/authapi";
import HelpCenterPagination from "@/app/components/helpcenter/HelpCenterPagination";
import { HomeContainer } from "@/app/components/home/Section";
import ReviewCard, {
  ReviewCardSkeleton,
  type ReviewItem,
} from "./ReviewCard";
import ReviewSummaryAside from "./ReviewSummaryAside";

type ReviewsResponse = {
  reviews?: ReviewItem[];
  totalPages?: number;
  limit?: number;
  totalReviews?: number;
  totalCount?: number;
  averageRating?: number;
};

type SummarySnapshot = {
  reviews: ReviewItem[];
  totalCount: number;
  averageRating?: number;
};

export default function ReviewPageClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [summary, setSummary] = useState<SummarySnapshot | null>(null);

  const { data, isLoading, isFetching } = useGetAllReviewsQuery({
    page: currentPage,
  });

  const response = data as ReviewsResponse | undefined;
  const reviews = response?.reviews || [];
  const totalPages = response?.totalPages || 1;
  const itemsPerPage = response?.limit || 9;

  const totalCount = useMemo(() => {
    return (
      response?.totalReviews ||
      response?.totalCount ||
      summary?.totalCount ||
      reviews.length
    );
  }, [response, summary?.totalCount, reviews.length]);

  useEffect(() => {
    if (!response || currentPage !== 1) return;

    setSummary({
      reviews: response.reviews || [],
      totalCount:
        response.totalReviews ||
        response.totalCount ||
        response.reviews?.length ||
        0,
      averageRating: response.averageRating,
    });
  }, [response, currentPage]);

  const statsReviews = summary?.reviews || reviews;
  const showGridLoading = isLoading || (isFetching && reviews.length === 0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="home-bleed bg-[#f7f7f8] py-12 md:py-16">
      <HomeContainer>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div>
            <div className="mb-6 flex flex-col gap-2 border-b border-[#ececec] pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  All reviews
                </p>
                <h2 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
                  What people are saying
                </h2>
              </div>
              <p className="text-sm text-[#5c5c66] md:text-base">
                {showGridLoading ? (
                  "Loading reviews…"
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-[#111]">
                      {reviews.length}
                    </span>{" "}
                    on this page
                  </>
                )}
              </p>
            </div>

            {showGridLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: Math.min(itemsPerPage, 6) }).map(
                  (_, index) => (
                    <ReviewCardSkeleton key={`review-skeleton-${index}`} />
                  )
                )}
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#e4e4e4] bg-white px-6 py-16 text-center">
                <h3 className="font-heading text-xl font-semibold text-[#111]">
                  No reviews yet
                </h3>
                <p className="mx-auto mt-2 max-w-md text-base text-[#5c5c66]">
                  Be the first to share how Hoydoon helped you find a home,
                  rent an apartment, or connect with an agent.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/search"
                    className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-[#07757c]"
                  >
                    Browse listings
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center rounded-full border border-[#ececec] bg-white px-5 text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isFetching ? "opacity-80" : ""}`}
              >
                {reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            )}

            {!showGridLoading && totalPages > 1 ? (
              <HelpCenterPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ) : null}
          </div>

          <ReviewSummaryAside
            reviews={statsReviews}
            totalCount={totalCount}
            averageRating={summary?.averageRating}
            isLoading={isLoading && !summary}
          />
        </div>
      </HomeContainer>
    </main>
  );
}
