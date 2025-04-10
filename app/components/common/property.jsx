"use client";

import { useState } from "react";
import Image from "next/image";
import { truncateDescription } from "@/utils";


const PropertyCard = ({ 
  imageSrc = "/default-image.jpg", 
  altText = "Default Alt Text", 
  price = "N/A", 
  area = "N/A", 
  description = "No description available", 
  title = "Untitled Property" ,
  rent=""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col rounded-[1.5rem] h-[520px] border-[1px] border-gray  2xl:h-[40rem] lg:w-[23rem] 2xl:w-[28rem] font-bricolage snap-center shrink-0 cursor-pointer overflow-hidden ml-8 relative 
      group transition-all duration-[1500ms] ease-in-out ${
        isHovered ? "border-solid rounded-2xl p-0 border-[1px] border-gray" : "border-none"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with smooth height transition */}
      <div
        className={`overflow-hidden rounded-lg  rounded-b-[27px] w-full transition-all duration-[1500ms] ease-in-out ${
          isHovered ? "h-[400px] 2xl:max-h-[350px]" : "2xl:max-h-[500px]"
        }`}
      >
        <Image
          alt={altText}
          width={300}
          height={500}
          quality={100}
          src={imageSrc}
          className="object-cover w-full h-[400px]  rounded-b-[32px]  transition-all duration-[2000ms] ease-in-out"
        />
      </div>

      {/* Details Section */}
      <div
        className={`mt-8 px-5 transition-all duration-[1500ms] ease-in-out ${
          isHovered ? "opacity-100 translate-y-0 max-h-[300px]" : "h-0 opacity-0 translate-y-5 max-h-0"
        }`}
      >
        <h1 className="text-black text-base lg:text-[28px] font-bold">
          { truncateDescription(title,2)}
        </h1>
        <span className="flex-col justify-between  flex mt-3">
          <span className="flex justify-between  items-center gap-1">
            <div className="flex">
            <h4 className="text-gray text-label flex items-center justify-center font-light">From</h4>
            <h2 className="font-bold lg:text-[28px]">${price}</h2></div>
            <h4 className=" text-label text-gray font-light">Area from {area}</h4>
          </span>
          <p className="text-gray mb-[1.3rem]  text-[16px] mt-4">
       {   truncateDescription (description,12)}
          </p>
          <div className="mt-[1rem] mb-2 flex justify-between items-center">
            <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1]">
              Luxury Oasis
            </div>
            <Image alt="export icon" width={50} height={50} quality={`100`} src={"/export.png"} className="rounded-full" />
          </div>
        </span>
      </div>

      {/* Base Details (Always Visible) */}
      <div
        className={`mt-2 text-black transition-opacity duration-500 ${
          isHovered ? "opacity-0 hidden" : " block opacity-100"
        }`}
      >
        <span className="flex items-center gap-3">
          <h4 className="text-gray font-light">From</h4>
          <h2 className="font-bold text-[28px]">${price}</h2>
        </span>
        <h4 className="text-gray font-light"> Area from {`${area}`}</h4>
      </div>
    </div>
  );
};

export default PropertyCard;
