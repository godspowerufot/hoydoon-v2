import TestimonialCard from "./testimonials";
import { useGetAllReviewsQuery } from "@/store/slices/api/authapi";
import { TestimonialSkeleton } from "../Loader/index";

const TestimonialGrid = () => {
  const { data: GetAllReviews, isLoading } = useGetAllReviewsQuery();

  // Function to duplicate reviews to always have 9 items
  const generateNineTestimonials = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return Array(9).fill(null);
    }

    const testimonials = [];
    const reviewsArray = reviews;

    // Keep adding reviews until we have 9
    for (let i = 0; i < 9; i++) {
      testimonials.push(reviewsArray[i % reviewsArray.length]);
    }

    return testimonials;
  };

  const testimonials = isLoading
    ? Array(9).fill(null)
    : generateNineTestimonials(GetAllReviews?.reviews);

  return (
    <div className="mt-5 lg:-mt-[1em] lg:max-w-[1300px] w-full justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-full auto-rows-auto">
      {[0, 1, 2].map((columnIndex) => (
        <span
          key={columnIndex}
          className={`flex gap-y-5 flex-col ${
            // Add top padding to first and last columns (0 and 2) on large screens
            columnIndex === 0 || columnIndex === 2
              ? "pt-[9rem] hidden lg:flex"
              : columnIndex === 1
              ? "" // Middle column - no special classes
              : "hidden lg:flex" // For safety, though this shouldn't be reached
          }`}
        >
          {/* Display 3 testimonials per column */}
          {testimonials
            .slice(columnIndex * 3, (columnIndex + 1) * 3)
            .map((testimonial, testimonialIndex) => (
              <div key={`${columnIndex}-${testimonialIndex}`}>
                {isLoading ? (
                  <TestimonialSkeleton />
                ) : (
                  <TestimonialCard
                    testimonial={testimonial}
                    index={columnIndex * 3 + testimonialIndex}
                  />
                )}
              </div>
            ))}
        </span>
      ))}
    </div>
  );
};

export default TestimonialGrid;
