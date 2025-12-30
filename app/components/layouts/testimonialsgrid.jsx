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

    for (let i = 0; i < 9; i++) {
      testimonials.push(reviewsArray[i % reviewsArray.length]);
    }

    return testimonials;
  };

  const testimonials = isLoading
    ? Array(9).fill(null)
    : generateNineTestimonials(GetAllReviews?.reviews);

  if (
    !isLoading &&
    (!GetAllReviews?.reviews || GetAllReviews.reviews.length === 0)
  ) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 w-full text-center">
        <div className="  p-10 md:p-14 max-w-[600px] ">
          <h2 className="text-black text-2xl md:text-3xl font-semibold mb-4">
            No reviews
          </h2>
          <p className="text-gray text-sm md:text-lg leading-relaxed font-light">
            See how Hoydoon is helping buyers and agents find exactly what they
            need, quickly and confidently.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 md:-mt-[1em] md:max-w-[1300px] w-full justify-center items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:w-full auto-rows-auto">
      {[0, 1, 2].map((columnIndex) => (
        <span
          key={columnIndex}
          className={`flex gap-y-5 flex-col ${columnIndex === 0 || columnIndex === 2
              ? "pt-[4.5rem]  md:pt-[9rem] hidden sm:flex" // 👈 Added responsive padding
              : columnIndex === 1
                ? "" // Middle column - no padding
                : "hidden md:flex"
            }`}
        >
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
