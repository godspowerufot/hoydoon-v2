"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyCardProps {
  imageSrc: string;
  altText: string;
  price: number | string;
  area: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ imageSrc, altText, price, area }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col h-[40rem] lg:w-[24rem] 2xl:w-[31rem] font-bricolage snap-center shrink-0 cursor-pointer overflow-hidden ml-8 relative 
      group transition-all duration-500 ${isHovered ? "border-solid rounded-2xl p-0 border-[1px] border-gray" : "border-none"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className={`overflow-hidden rounded-lg w-full transition-all duration-500 ${
          isHovered ? "h-[350px]" : "h-[450px] lg:h-[500px] 2xl:h-[550px]"
        }`}
      >
        <Image
          alt={altText}
          width={300}
          height={500}
          quality={100}
          src={imageSrc}
          className={`w-full h-full object-cover rounded-b-[1.6rem] transition-transform duration-500`
         }
        />
      </div>

      {/* Details Section */}
      <div
        className={`mt-8 px-5 transition-opacity duration-500 transform ${
          isHovered ? "opacity-100 translate-y-0" : "h-0 opacity-0 translate-y-5"
        }`}
      >
        <h1 className="text-black text-base lg:text-[25px] font-bold">
          Whispering Pines Estate
        </h1>
        <span className="flex-col flex mt-3">
          <span className="flex gap-1">
            <h4 className="text-gray text-label flex items-center justify-center font-light">From</h4>
            <h2 className="font-bold">${price}</h2>
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
        className={`mt-2 text-black transition-opacity duration-500 ${
          isHovered ? "opacity-0 hidden" : " block opacity-100"
        }`}
      >
        <span className="flex gap-3">
          <h4 className="text-gray font-light">From</h4>
          <h2 className="font-bold">${price}</h2>
        </span>
        <h4 className="text-gray font-light">{area} Area from 190 - 245 m²</h4>
      </div>

     
    </div>
  );
};

export default PropertyCard;
