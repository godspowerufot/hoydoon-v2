"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  imageSrc: string;
  altText: string;
  price: number | string;
  area: string;
}

const PropertyListCard: React.FC<PropertyCardProps> = ({ imageSrc, altText, price, area }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    
    <div
    className={`flex flex-col rounded-[1.5rem]    h-[37rem] 2xl:h-[38rem] lg:w-[24.2rem] 2xl:w-[29rem] font-bricolage snap-center shrink-0 cursor-pointer overflow-hidden ml-8 relative 
    group transition-all duration-[1500ms] ease-in-out ${
      isHovered ? "border-solid p-0 border-[1px] border-gray" : "border-none"
    }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className={`overflow-hidden  w-full transition-all  duration-[1500ms] ease-in-out ${
          isHovered ? "max-h-[350px]" : "max-h-[550px]"
        }`}
      >
        <Link href="/rent/listingdetails">
        <Image
          alt={altText}
          width={300}
          height={500}
          quality={100}
          src={imageSrc}
          className="w-full h-full object-cover rounded-b-[1.6rem] transition-all duration-[2000ms] ease-in-out"

        />
        </Link>
      </div>

      {/* Details Section */}
      <span
        className={`mt-8 px-5 transition-all duration-[1500ms] ease-in-out ${
          isHovered ? "opacity-100 translate-y-0 max-h-[300px]" : "h-0 opacity-0 translate-y-5 max-h-0"
        }`}
      >
        <h1 className="text-black text-base lg:text-[25px] font-bold">
        Maplewood Cottage
        </h1>
        <span className="flex-col flex mt-3">
          <span className="flex gap-1 items-center">
            <h2 className="font-bold text-xl">${price} 
            <sub className="text-gray font-[300] text-base mt-1 2xl:text-[16px]">
                /mth
            </sub>
          </h2>            <h4 className="ml-9 text-label text-gray font-light">Area from 190 - 245 m² {area} </h4>
          </span>

          <div className="flex  mt-2 justify-start gap-3 items-start font-[400] text-base 2xl:text-base  text-gray">
              <span className="flex items-center gap-2">
                <Image src="/bed.png" alt="Icon" width={25} height={25} />
                <p>{3} beds</p> {/* Rooms */}
              </span>
              <span className="flex items-center gap-2">
                <Image
                  src="/bath.png"
                  alt="Icon"
                  width={25}
                  height={25}
                />
                <p> {4} bath</p> 
                </span>
              <span className="flex items-center gap-2">
                <Image
                  src="/home.png"
                  alt="Icon"
                  width={25}
                  height={25}
                />
                <p> {4}1,885sq.</p> 
                </span>
                </div>
          <p className="text-gray text-[16px] 2xltext-xl mt-4">
            A cozy 3-bedroom home with an open living area and a private backyard. Perfect for comfort and relaxation.
          </p>
          <div className="mt-9 flex justify-between items-center">
            <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1]">
              Luxury Oasis
            </div>
            <Image alt="image1" width={50} height={50} src={"/export.png"} className="rounded-full" />
          </div>
        </span>
      </span>

      {/* Base Details (Always Visible) */}
      <div
        className={`mt-2 text-black transition-opacity duration-500 ${
          isHovered ? "opacity-0 hidden" : " block opacity-100"
        }`}
      >
        <span className="flex gap-3">
          <h2 className="font-bold 2xl:text-2xl xt-3xl">${price} 
            <sub className="text-gray font-[400] text-base 2xl:text-[20px]">
                /mth
            </sub>
          </h2>
        </span>
        <div className="flex  mt-2 justify-start gap-5 items-start font-[400] text-base 2xl:text-base  text-gray">
              <span className="flex items-center gap-2">
                <Image src="/bed.png" alt="Icon" width={20} height={20} />
                <p>{3} beds</p> {/* Rooms */}
              </span>
              <span className="flex items-center gap-2">
                <Image
                  src="/bath.png"
                  alt="Icon"
                  width={20}
                  height={20}
                />
                <p> {4} bath</p> 
                </span>
              <span className="flex items-center gap-2">
                <Image
                  src="/home.png"
                  alt="Icon"
                  width={20}
                  height={20}
                />
                <p> {4}1,885sq.</p> 
                </span>
                </div>{/* Toilets */}
      </div>
    </div>
  );
};

export default PropertyListCard;
