import Image from "next/image";

export default function ContactAgent({fullname,location, profileimage}) {
  return (
    <div className="bg-[#ffffffec] mt-[2rem]  text-[#8F8F8F] rounded-lg px-10 w-fit    py-10  2xl:w-[90rem] mx-auto border border-[#8F8F8F]">
      {/* Header */}
      <h2 className="text-3xl font-bold text-black font-bricolage  mb-4 ">Contact Hoydoon Agent {fullname}</h2>

      {/* Agent Info */}
      <div className="flex items-center gap-4">
        <Image
          src={ profileimage} // Replace with actual image
          alt="Agent Ruka Oyefeso"
          width={60}
          height={60}
          className="w-[6rem]   h-[6rem] rounded-full object-cover"
        />
        <div className="text-[#8F8F8F]">
          <p className="font-semibold text-xl text-black ">{fullname}</p>
          <p className="text-base">{location}</p>
          <p className="text-base ">
            {fullname} will respond in about{" "}
            <span className="text-primary font-medium">10 mins</span>
          </p>
        </div>
      </div>

    {/* Message Box with Buttons Inside */}
    <div className="my-6  border border-[#8F8F8F] rounded-[24px] p-5">
        <textarea
          className="w-full outline-none h-[10rem] font-light text-xl border-none focus:ring-0 text-gray-500"
          placeholder="Write a message..."
        />

        {/* Quick Reply Buttons Inside Message Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          <button className="border px-4 py-2 rounded-[20px] 2xl:text-xl  border-primary border-solid border-thin  text-gray-600 text-base">
            Can you share more details about the home?
          </button>
          <button className="border px-4 py-2 rounded-[20px] 2xl:text-xl border-primary border-solid  border-thin text-gray-600 text-base">
            I want to buy the home. What’s next?
          </button>
          <button className="border px-4 py-2 rounded-[20px]  2xl:text-xl border-primary border-solid border-thin  text-gray-600 text-base">
            Can you share more details about the home?
          </button>
          <button className="border px-4 py-2 rounded-[20px] 2xl:text-xl  border-primary border-solid border-thin  text-gray-600 text-base">
            Is this home still available for purchase?
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button className="bg-primary w-[9rem] 2xl:w-[15rem] rounded-full text-white text-base px-4  py-2 2xl:py-4 ">
          Ask a question
        </button>
        <button className="border px-4 py-2  w-[9rem] 2xl:w-[15rem] rounded-full border-primary text-gray-600">
          Reviews
        </button>
      </div>
    </div>
  );
}
