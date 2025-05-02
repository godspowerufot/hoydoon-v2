import Image from "next/image";

export default function TestimonialCard() {
  return (
    <div className="w-full h-full lg:h-[96%] bg-[#ecebebd7] rounded-xl shadow p-6 flex flex-col justify-between">
      {/* Stars */}
      <div className="flex space-x-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill="#09858D"
              viewBox="0 0 24 24"
              stroke="none"
              className="w-5 h-5"
            >
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.84L19.336 24 12 19.897 4.664 24 6 15.59 0 9.75l8.332-1.595L12 .587z" />
            </svg>
          ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-[#8F8F8F] font-400 font-bricolage  font-medium lg:text-[12px] mt-4 leading-relaxed">
        “The services was exceptional! From start to finish, the team made the
        process smooth and stress-free. I found the perfect place to call home,
        and I couldn’t be happier.”
      </p>

      {/* User Info */}
      <div className="flex items-center mt-4">
        <Image
          src="/avater-2.png"
          alt="User photo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3">
          <p className="font-semibold text-black text-[90%]">Godspower Upoku</p>
          <p className="text-[#8F8F8F] text-[80%]">Renter</p>
        </div>
      </div>
    </div>
  );
}
