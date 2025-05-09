import { useState } from "react";
import Image from "next/image";
import { useSendMessageMutation } from "@/store/slices/api/authapi";
import { toast } from "react-toastify";
export default function ContactAgent({ fullname, location, profileimage, listedBy }) {
  const [message, setMessage] = useState("");
  const [isMessageLoading, setIsMessageLoading] = useState(false); // Loading state for "Ask a question"
  const [isReviewLoading, setIsReviewLoading] = useState(false);   // Loading state for "Reviews"
  const [sendMessage, { isSuccess, isError }] = useSendMessageMutation();

  const handleSend = async (type) => {
    if (!message.trim()) return;

    try {
      if (type === "message") {
        setIsMessageLoading(true); // Set loading for message
      } else if (type === "review") {
        setIsReviewLoading(true); // Set loading for review
      }

      await sendMessage({ message, listedBy }).unwrap();
      setMessage(""); // Clear after sending
      toast.success("Message sent successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      if (type === "message") {
        setIsMessageLoading(false); // Reset message loading
      } else if (type === "review") {
        setIsReviewLoading(false); // Reset review loading
      }
    }
  };

  return (
    <div className="lg:bg-[#ffffffec] mt-[2rem] text-[#8F8F8F] rounded-lg p-5 *:lg:px-10 w-fit lg:py-10 2xl:w-[90rem] mx-auto lg:border border-[#8F8F8F]">
      <h2 className="text-xl lg:text-3xl font-bold text-black font-bricolage mb-4">
        Contact Hoydoon Agent {fullname}
      </h2>

      <div className="flex items-center gap-4">
       
      <div className="flex relative h-[5.5rem] w-[6rem] lg:w-[120px] lg:h-[120px] items-center gap-4">
       <Image
          src={profileimage}
          alt={`Agent ${fullname}`}
          fill
          className="rounded-full object-cover"
        />
        </div>
        <div>
          <p className="font-semibold text-xl text-black">{fullname}</p>
          <p className="text-sm lg:text-base">{location}</p>
          <p className="text-sm lg:text-base">
            {fullname} will respond in about <span className="text-primary font-medium">10 mins</span>
          </p>
        </div>
      </div>

      {/* Message Box */}
      <div className="my-6 border  lg:ml-[3rem]  border-[#8F8F8F] rounded-md lg:rounded-[24px] p-5">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full max-md:bg-transparent  outline-none h-[10rem] font-light text-sm lg:text-xl border-none focus:ring-0 text-black"
          placeholder="Write a message..."
        />
        {/* Optional: Quick Replies */}
        <div className="hidden lg:grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {["Can you share more details about the home?", 
            "I want to buy the home. What’s next?", 
            "Is this home still available for purchase?"].map((text, i) => (
            <button
              key={i}
              onClick={() => setMessage(text)}
              className="border px-4 py-2 rounded-[20px] 2xl:text-xl border-primary text-gray-600 text-base"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => handleSend("message")}
          className="bg-primary w-[9rem] 2xl:w-[15rem]  rounded-md lg:rounded-full text-white text-base px-4 py-2 2xl:py-4"
          disabled={isMessageLoading}
        >
          {isMessageLoading ? "Sending..." : "Ask a question"}
        </button>
        <button
          onClick={() => handleSend("review")} // Send the current message for reviews
          className="border px-4 py-2 w-[9rem] 2xl:w-[15rem] rounded-md lg:rounded-full border-primary text-gray-600"
          disabled={isReviewLoading}
        >
          {isReviewLoading ? "Sending..." : "Reviews"}
        </button>
      </div>
    </div>
  );
}
