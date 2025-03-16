"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyCardProps {
  imageSrc: string;
  altText: string;
}

const ArticleCard: React.FC<PropertyCardProps> = ({ imageSrc, altText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col mt-5 rounded-[1.5rem] h-[37rem] 2xl:h-[38rem] lg:w-[24rem] 2xl:w-[30rem] font-bricolage snap-center shrink-0 cursor-pointer overflow-hidden ml-8 relative 
      group transition-all duration-[1500ms] ease-in-out ${
        isHovered ? "border-solid rounded-2xl p-0 border-[1px] border-gray" : "border-none"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className={`overflow-hidden rounded-lg w-full transition-all duration-[1500ms] ease-in-out ${
          isHovered ? "max-h-[350px]" : "max-h-[550px]"
        }`}
      >
        <Image
          alt={altText}
          width={300}
          height={500}
          quality={150}
          src={imageSrc}
          className="w-full h-full object-cover rounded-b-[1.6rem] transition-all duration-[1500ms] ease-in-out"
        />
      </div>

      {/* Details Section */}
      <div
        className={`mt-8 px-5 transition-all duration-[1500ms] ease-in-out ${
          isHovered ? "opacity-150 translate-y-0 max-h-[300px]" : "h-0 opacity-0 translate-y-5 max-h-0"
        }`}
      >
        <h1 className="text-black text-base lg:text-[25px] font-bold">
          Whispering Pines Estate
        </h1>
        <span className="flex-col flex mt-3">
          <span className="flex gap-1">
            <h4 className="text-gray text-label flex items-center justify-center font-light">From</h4>
            <h4 className="ml-9 text-label text-gray font-light">Area from 190 - 245 m²</h4>
          </span>
          <p className="text-gray text-[16px] mt-4">
            A cozy 3-bedroom home with an open living area and a private backyard. Perfect for comfort and relaxation.
          </p>
          <div className="mt-9 flex justify-between items-center">
            <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1]">
              Luxury Oasis
            </div>
            <Image alt="export icon" width={50} height={50} src={"/export.png"} className="rounded-full" />
          </div>
        </span>
      </div>

      {/* Base Details (Always Visible) */}
      <div
        className={`-mt-5 2xl:ml-3 text-black transition-opacity duration-500 ${
          isHovered ? "opacity-0 hidden" : "block opacity-150"
        }`}
      >
        <span className="flex flex-col text-black">
          <span className="font-medium flex gap-2 text-sm items-center ">             <Image alt="export icon" width={20} height={15} src={"/mage_file.png"} />
          General</span>
          <h3 className="font-bold text-lg  mt-3 leading-tight w-[20rem]">What Does "Sold" Mean in Real Estate?</h3>
        </span>
        <span className="flex items-center gap-4  font-[400] text-sm mt-3">
          <span className="mr-2 flex gap-2">    <Image alt="export icon" width={20} height={15} src={"/time.png"} /> 1 min read</span>
          <span className="flex gap-2"> <Image alt="export icon" width={20} height={15} src={"/calender.png"} />March 28, 1525</span>
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
