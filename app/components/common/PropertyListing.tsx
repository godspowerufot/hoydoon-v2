"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { truncateDescription } from "@/utils";
import Link from "next/link";

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
  rent?: string;
  _id?: string;
}

const PropertyListCard: React.FC<PropertyCardProps> = ({
  imageSrc = "_",
  altText = "_",
  price = "_",
  area = "_",
  description = "_",
  title = "_",
  bathrooms="_",
  bedrooms="_",
  _id,
  squareFeet = "_"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // If screen is mobile, force hover state true
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Link href={`/rent/${_id}`}>
      <div
        className={`flex flex-col  rounded-[18px] lg:rounded-[1.5rem] lg:h-[550px] 2xl:h-[38rem] lg:w-[23.6rem] 2xl:w-[28rem] font-bricolage snap-center shrink-0 cursor-pointer overflow-hidden  lg:ml-4 relative 
        group transition-all duration-[1500ms] ease-in-out ${
          isHovered ? "border-solid p-0 border-[1px] border-gray" : "border-none"
        }`}
        onMouseEnter={() => {
          if (window.innerWidth >= 1024) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 1024) setIsHovered(false);
        }}
      >
        {/* Image */}
        <div
          className={`overflow-hidden rounded-b-[20px] w-full lg:h-[28rem] h-[20rem] transition-all duration-[1500ms] ease-in-out ${
            isHovered ? "max-h-[300px] 2xl:max-h-[330px]" : "max-h-[450px]"
          }`}
        >
          <Image
            alt={altText}
            width={300}
            height={500}
            quality={100}
            src={imageSrc}
            className="w-full h-full object-cover lg:transition-all lg:duration-[2000ms] lg:ease-in-out"
          />
        </div>

        {/* Details Section */}
        <span
          className={`mt-4 px-5 transition-all duration-[1500ms] ease-in-out ${
            isHovered
              ? "opacity-100 translate-y-0  h-[230px] lg:max-h-[200px]"
              : "h-0 opacity-0 translate-y-5 max-h-0"
          }`}
        >
          <h1 className="text-black text-[22px] lg:text-[25px] font-bold">
            {truncateDescription(title, 2)}
          </h1>

          <span className="flex-col flex mt-[6px] lg:mt-3">
            <span className="flex gap-1 justify-between items-center">
              <span className="flex  items-center">
                <h2 className="font-bold text-[23px]">${price?.toLocaleString()}.00</h2>
                <p className="text-gray mt-[2px] font-[400] text-[14px]">/mth</p>
              </span>
              <h4 className="lg:ml-[5rem] 2xl:ml-[10rem] text-label text-gray font-light">
                Area from {area}
              </h4>
            </span>

            <div className="flex mt-2 justify-start gap-3 items-start font-[400] text-base text-gray">
              <span className="flex text-[13px] items-center gap-2">
                <Image src="/bed.png" alt="Icon" width={18} height={18} />
                <p>{bedrooms} beds</p>
              </span>
              <span className="flex items-center gap-2">
                <Image src="/bath.png" alt="Icon" width={18} height={18} />
                <p>{bathrooms} bath</p>
              </span>
              <span className="flex items-center gap-2">
                <Image src="/home.png" alt="Icon" width={18} height={18} />
                <p>{area}sq.</p>
              </span>
            </div>

            <p className="text-gray w-[20rem] text-[14px] mt-4">
              {truncateDescription(description, 10)}
            </p>

            <div className="mt-5 flex justify-between items-center">
              <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light h-[41px] w-1/2   lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1]">
                Luxury Oasis
              </div>
              <Image
                alt="export"
                width={35}
                height={35}
                src={"/export.png"}
                className="rounded-full"
              />
            </div>
          </span>
        </span>

        {/* Base Details */}
        <div
          className={`mt-2 text-black transition-opacity duration-500 ${
            isHovered ? "opacity-0 hidden" : "block opacity-100"
          } lg:block hidden`} // Force hidden on mobile
        >
          <span className="flex items-center">
            <h2 className="font-bold lg:text-[24px]">${price}.00</h2>
            <p className="text-gray mt-[2px] font-[400] text-[14px]">/mth</p>
          </span>
          <div className="flex mt-2 justify-start gap-5 text-[13px] font-[400] text-gray">
            <span className="flex items-center gap-2">
              <Image src="/bed.png" alt="Icon" width={18} height={18} />
              <p>{bedrooms} beds</p>
            </span>
            <span className="flex items-center gap-2">
              <Image src="/bath.png" alt="Icon" width={18} height={18} />
              <p>{bathrooms} bath</p>
            </span>
            <span className="flex items-center gap-2">
              <Image src="/home.png" alt="Icon" width={18} height={18} />
              <p>{squareFeet}sq.</p>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyListCard;
