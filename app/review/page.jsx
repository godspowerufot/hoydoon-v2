"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetAllReviewsQuery } from "@/store/slices/api/authapi";
import ArticlesSection from "../components/common/Article";
import Pagination from "../components/common/pagination";
// Pagination Component for Reviews
function ReviewPagination({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="text-gray-700 w-full justify-center items-center flex flex-col gap-2 text-center mt-12">
      {/* Viewing Status */}
      <p className="font-bricolage lg:font-[500] lg:text-xl">
        Viewing page <span className="font-semibold">{currentPage}</span> of{" "}
        {totalPages}
      </p>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center gap-1">
        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-2 py-2 text-center font-bricolage rounded-md text-gray-600 text-base ${
              currentPage === index + 1
                ? "bg-[#F9FAFB] w-[3rem] font-bold"
                : "hover:text-black text-[#8F8F8F]"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Right Arrow (Disabled on last page) */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <Image
            src="/arrow-right-top.png"
            alt="arrow"
            height={12}
            width={12}
          />
        </button>
      </div>
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({ testimonial }) {
  if (!testimonial) return null;

  const { comment, rating, user } = testimonial;

  // Function to render stars with half-star logic
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="#0D9488"
            viewBox="0 0 24 24"
            stroke="none"
            className="w-6 h-6"
          >
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.84L19.336 24 12 19.897 4.664 24 6 15.59 0 9.75l8.332-1.595L12 .587z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <div key={i} className="relative w-6 h-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#D1D5DB"
              viewBox="0 0 24 24"
              stroke="none"
              className="absolute inset-0 w-6 h-6"
            >
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.84L19.336 24 12 19.897 4.664 24 6 15.59 0 9.75l8.332-1.595L12 .587z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#0D9488"
              viewBox="0 0 24 24"
              stroke="none"
              className="absolute inset-0 w-6 h-6 overflow-hidden"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            >
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.84L19.336 24 12 19.897 4.664 24 6 15.59 0 9.75l8.332-1.595L12 .587z" />
            </svg>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="#D1D5DB"
            viewBox="0 0 24 24"
            stroke="none"
            className="w-6 h-6"
          >
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.84L19.336 24 12 19.897 4.664 24 6 15.59 0 9.75l8.332-1.595L12 .587z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="py-8 w-full border-b border-[#8F8F8F] last:border-b-0">
      {/* Stars */}
      <div className="flex gap-1 mb-4">{renderStars()}</div>

      {/* Testimonial Text */}
      <p className="text-[#8F8F8F] text-base leading-relaxed mb-6">
        &ldquo;{comment}&rdquo;
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          <Image
            src={user?.pictureUrl || "/Avatar.svg"}
            alt={user?.fullname || "User"}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-[#1E1E1E] text-base">
            {user?.fullname || "Anonymous User"}
          </p>
        </div>
      </div>
    </div>
  );
}

// Skeleton Loader Component
function TestimonialSkeleton() {
  return (
    <div className="py-8 w-full border-b border-[#8F8F8F] last:border-b-0 animate-pulse">
      {/* Stars skeleton */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-[#8F8F8F]/20 rounded" />
        ))}
      </div>

      {/* Comment skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-[#8F8F8F]/20 rounded w-full" />
        <div className="h-4 bg-[#8F8F8F]/20 rounded w-5/6" />
        <div className="h-4 bg-[#8F8F8F]/20 rounded w-4/6" />
      </div>

      {/* User info skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#8F8F8F]/20 flex-shrink-0" />
        <div className="space-y-2">
          <div className="h-4 bg-[#8F8F8F]/20 rounded w-32" />
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Pass page parameter to API
  const { data: GetAllReviews, isLoading } = useGetAllReviewsQuery({
    page: currentPage,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get pagination data from API response
  const totalPages = GetAllReviews?.totalPages || 1;
  const reviews = GetAllReviews?.reviews || [];
  const itemsPerPage = GetAllReviews?.limit || 10;

  return (
    <div className="w-full md:pt-[3rem] bg-white">
      <div className="w-full max-w-[1240px] mx-auto px-2 py-12">
        {isLoading ? (
          <>
            {[...Array(itemsPerPage)].map((_, index) => (
              <TestimonialSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {reviews.map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            ))}

            {
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            }
          </>
        )}

        <div className="mt-[3rem] md:mt-[5rem]">
          <ArticlesSection />
        </div>
      </div>
    </div>
  );
}
