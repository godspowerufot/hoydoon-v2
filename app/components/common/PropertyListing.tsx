"use client";

import Image from "next/image";
import { useState } from "react";
import { truncateDescription } from "@/utils";
interface PropertyCardProps {
  imageSrc?: string;
  altText?: string;
  price?: number | string;
  area?: number | string;
  description?: string;
  title?: string;
  address?: string;
  bathrooms?: number;
  bedrooms?: number;
  squareFeet?: number;
  houseType?: string;
  rent?:string
}

const PropertyListCard: React.FC<PropertyCardProps> = ({
  imageSrc = "/default-image.jpg",
  altText = "Property Image",
  price = "N/A",
  area = "N/A",
  description = "No description available",
  title = "Untitled Property",
  bathrooms,
  bedrooms,
  squareFeet=""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col rounded-[1.5rem]  h-[550px] 2xl:h-[38rem] lg:w-[23.6rem] 2xl:w-[28rem] font-bricolage snap-center shrink-0 cursor-pointer overflow-hidden ml-4 relative 
    group transition-all duration-[1500ms] ease-in-out ${
      isHovered ? "border-solid p-0 border-[1px] border-gray" : "border-none"
    }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className={`overflow-hidden  w-full    lg:h-[28rem] transition-all  duration-[1500ms] ease-in-out ${
          isHovered ? "max-h-[300px] 2xl:max-h-[330px]" : "max-h-[450px] "
        }`}
      >
          <Image
            alt={altText}
            width={300}
            height={500}
            quality={100}
            src={imageSrc}
            className="w-full h-full  object-cover rounded-b-[1.6rem] transition-all duration-[2000ms] ease-in-out"
          />
      </div>

      {/* Details Section */}
      <span
        className={`mt-4 px-5  transition-all duration-[1500ms] ease-in-out ${
          isHovered
            ? "opacity-100 translate-y-0 max-h-[200px]"
            : "h-0 opacity-0 translate-y-5 max-h-0"
        }`}
      >
        <h1 className="text-black text-base lg:text-[25px] font-bold">
        { truncateDescription(title,2)}{" "}
        </h1>
        <span className="flex-col flex mt-3">
          <span className="flex gap-1 items-center">
          <span className="flex  items-center ">
          <h2 className="font-bold lg:text-[23px]">
            ${price}.00
          
          </h2>  <p className="text-gray mt-[2px] font-[400] text-[14px] ">
              /mth
            </p>
        </span>
            <h4 className="lg:ml-[5rem] 2xl:ml-[10rem] text-label text-gray font-light">
              Area from {area}{" "}
            </h4>
          </span>

          <div className="flex   mt-2 justify-start gap-3 items-start font-[400] text-base 2xl:text-base  text-gray">
            <span className="flex  text-[13px] items-center gap-2">
              <Image src="/bed.png" alt="Icon" width={18} height={18} />
              <p>{bedrooms} beds</p> {/* Rooms */}
            </span>
            <span className="flex items-center gap-2">
              <Image src="/bath.png" alt="Icon" width={18} height={18} />
              <p> {bathrooms} bath</p>
            </span>
            <span className="flex items-center gap-2">
              <Image src="/home.png" alt="Icon" width={18} height={18} />
              <p> {area}sq.</p>
            </span>
          </div>
          <p className="text-gray  w-[20rem] text-[14px] 2xltext-xl mt-4">{truncateDescription (description,10)}</p>
          <div className="mt-5 2xl:mt-9   flex justify-between items-center">
            <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1]">
              Luxury Oasis
            </div>
            <Image
              alt="image1"
              width={35}
              height={35}
              src={"/export.png"}
              className="rounded-full"
            />
          </div>
        </span>
      </span>

      {/* Base Details (Always Visible) */}
      <div
        className={`mt-2 text-black transition-opacity duration-500 ${
          isHovered ? "opacity-0 hidden" : " block opacity-100"
        }`}
      >
        <span className="flex  items-center ">
          <h2 className="font-bold lg:text-[24px]">
            ${price}.00
          
          </h2>  <p className="text-gray mt-[2px] font-[400] text-[14px] ">
              /mth
            </p>
        </span>
        <div className="flex  mt-2 justify-start gap-5   text-[13px] items-start font-[400] text-base 2xl:text-base  text-gray">
          <span className="flex items-center gap-2">
            <Image src="/bed.png" alt="Icon" width={18} height={18} />
            <p>{bedrooms} beds</p> {/* Rooms */}
          </span>
          <span className="flex items-center gap-2">
            <Image src="/bath.png" alt="Icon" width={18} height={18} />
            <p> {bathrooms} bath</p>
          </span>
          <span className="flex items-center gap-2">
            <Image src="/home.png" alt="Icon" width={18} height={18} />
            <p> {squareFeet}sq.</p>
          </span>
        </div>
        {/* Toilets */}
      </div>
    </div>
  );
};

export default PropertyListCard;
