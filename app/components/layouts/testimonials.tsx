'use client';

import React, { useState } from "react";
import { testimonials } from "@/constants";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="lg:w-8/10 w-full mx-auto px-4 py-8 mt-5">
      {/* Testimonial Text Container */}
      <div className="relative flex justify-center items-center flex-col  text-center">
        <div className="text-4xl flex items-center justify-center w-full text-[#1E1E1E] mb-4">

            <Image
            height={40}
            width={40}
            alt="qout"
            src="/qoute.png"/>
        </div>
        <p className=" lg:text-lg text-gray-700   font-bricolage w-8/10 lg:w-6/10 mb-4">
          {testimonials[currentIndex].text}
        </p>
       

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-4 w-full ">
          <div
            onClick={handlePrev}
          >
                <Image
            height={40}
            width={40}
            alt="qout"
            src="/prev.png"/>
          </div>
          <div
           
            onClick={handleNext}
          >
    <Image
            height={40}
            width={40}
            alt="qout"
            src="/next.png"/>          </div>
        </div>
      </div> 

      {/* Avatars Section */}
      <div className="flex justify-center gap-[19rem] mt-8 w-full">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex  items-center space-y-2 ${
              index === currentIndex ? "opacity-100" : "hidden lg:flex lg:opacity-50"
            } transition-opacity duration-300`}
          >
            <Image
            width={500}
            height={500}
              src={testimonial.image}
              alt={testimonial.name}
              className={`w-16 h-16 rounded-full  border-2 ${
                index === currentIndex
                  ? "border-primary"
                  : "border-gray-300"
              }`}
            />
            <div className="flex  w-full items-start flex-col  ml-1">
            <p className="text-sm lg:w-[13em]  text-start font-semibold text-gray-700">
              {testimonial.name}
            </p>
            <p className="text-sm text-gray-500">
          {testimonial.role}
        </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
