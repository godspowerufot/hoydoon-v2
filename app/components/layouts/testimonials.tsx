import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TestimonialCard({ testimonial }: any) {
  // If no testimonial data, return null or a fallback
  if (!testimonial) {
    return null;
  }

  const { comment, rating, user } = testimonial;

  // Function to render stars with conditional coloring
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        // If rating is 5, color all stars. Otherwise, color based on rating and make the last one gray
        let starColor;
        if (rating === 5) {
          starColor = "#09858D"; // All stars colored if rating is 5
        } else {
          if (i < rating) {
            starColor = "#09858D"; // Colored stars based on rating
          } else if (i === 4) {
            starColor = "#D1D5DB"; // Last star gray
          } else {
            starColor = "#D1D5DB"; // Unfilled stars gray
          }
        }

        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={starColor}
            viewBox="0 0 24 24"
            stroke="none"
            className="w-5 h-5"
          >
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.84L19.336 24 12 19.897 4.664 24 6 15.59 0 9.75l8.332-1.595L12 .587z" />
          </svg>
        );
      });
  };

  return (
    <div className="w-full lg:w-[390px] h-full lg:h-[96%] bg-[#ecebebd7] rounded-xl shadow p-6 flex flex-col justify-between">
      {/* Stars */}
      <div className="flex space-x-1">{renderStars()}</div>

      {/* Testimonial Text */}
      <p className="text-[#8F8F8F] font-[300] font-bricolage lg:font-medium lg:text-[12px] text-sm mt-4 leading-relaxed">
        &ldquo;
        {comment ||
          "Amazing service! Highly recommend this platform for anyone looking for quality accommodations."}
        &ldquo;
      </p>

      {/* User Info */}
      <div className="flex items-center mt-4">
        <Image
          src={user?.pictureUrl}
          alt="User photo"
          width={40}
          height={40}
          className="rounded-full h-[40px] w-[40px] object-cover"
        />
        <div className="ml-3">
          <p className="font-semibold text-black text-[90%]">
            {user?.fullname || "Anonymous User"}
          </p>
          <p className="text-[#8F8F8F] text-[80%]">Renter</p>
        </div>
      </div>
    </div>
  );
}
