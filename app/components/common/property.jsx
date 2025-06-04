"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { truncateDescription } from "@/utils";
import Link from "next/link";

const PropertyCard = ({ 
  imageSrc = "/default-image.jpg", 
  altText = "Default Alt Text", 
  price = "N/A",
  _id, 
  bathrooms,
  bedrooms,
  area = "_", 
  description = "No description available", 
  title = "Untitled Property",
  rent = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width to determine mobile state
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Tailwind lg breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showDetails = isMobile || isHovered;

  return (
    <Link href={`/rent/${_id}`}>
      <div
        className={`hidden lg:flex flex-col rounded-[16px] lg:rounded-[1.5rem]  border-[1px] border-gray 2xl:h-[40rem]  h-[32rem] lg:h-[600px] lg:w-[23rem] 2xl:w-[28rem] font-bricolage snap-center shrink-0 cursor-pointer overflow-hidden lg:ml-8 relative group transition-all duration-[1500ms] ease-in-out ${
          isHovered ? "border-solid rounded-2xl p-0 border-[1px] border-gray" : " border lg:border-none"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div
          className={`overflow-hidden  rounded-b-[20px] lg:rounded-lg  h-full lg:h-[25rem] lg:rounded-b-[27px] w-full transition-all duration-[1500ms] ease-in-out ${
            isHovered ? "h-[500px] lg:h-[450px] 2xl:max-h-[350px]" : "2xl:max-h-[500px]"
          }`}
        >
          <Image
            alt={altText}
            width={300}
            height={500}
            quality={100}
            src={imageSrc}
            className="object-cover w-full lg:h-[500px] 2xl:h-[500px] rounded-b-[32px] transition-all duration-[2000ms] ease-in-out"
          />
        </div>

        {/* Details Section - Always open on mobile */}
        <div
          className={`mt-3 lg:mt-5 px-5 transition-all duration-[1500ms] ease-in-out ${
            showDetails ? "opacity-100 translate-y-0  h-fit lg:h-[175px]" : "h-0 opacity-0 translate-y-5 max-h-0"
          }`}
        >
          <h1 className="text-black text-[24px] lg:text-[28px] font-bold">
            {truncateDescription(title, 2)}
          </h1>
          <span className=" hidden flex-col justify-between lg:flex mt-3">
            <span className="flex justify-between items-center gap-1">
              <div className="flex">
                <h4 className="text-gray text-label flex items-center justify-center font-light">From</h4>
                <h2 className="font-bold lg:text-[28px]">${price}</h2>
              </div>
              <h4 className="text-label text-gray font-light">Area from {area}</h4>
            </span>
            <p className="text-gray mb-[1.1rem] text-[16px] mt-4">
              {truncateDescription(description, 12)}
            </p>
            <div className="mt-[6px] mb-1 flex justify-between items-center">
              <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1]">
                Luxury Oasis
              </div>
              <Image alt="export icon" width={50} height={50} quality={100} src={"/export.png"} className="rounded-full" />
            </div>
          </span>
          <span className="flex-col  lg:hidden flex mt-3">
                    <span className="flex gap-1 items-center justify-between w-full">
                      <span className="flex  items-center">
                        <h2 className="font-bold text-[23px]">${price}.00</h2>

                      </span>
                      <h4 className="lg:ml-[5rem] 2xl:ml-[10rem] text-label text-gray font-light">
                        Area from {area}
                      </h4>
                    </span>
        
                    <div className="flex mt-1 justify-start gap-3 items-start font-[400] text-base text-gray">
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
        
                    <p className="text-gray w-[16rem] text-[14px] mt-4">
                      {truncateDescription(description, 10)}
                    </p>
        
                    <div className="my-8 flex justify-between items-center">
                      <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light w-1/2 h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1]">
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
        </div>

        {/* Base Info - Hidden if details are shown */}
        <div
          className={`mt-2 hidden lg:block text-black transition-opacity duration-500 ${
            showDetails ? "opacity-0 hidden" : "block opacity-100"
          }`}
        >
          <span className="flex items-center gap-3">
            <h4 className="text-gray font-light">From</h4>
            <h2 className="font-bold text-[28px]">${price}</h2>
          </span>
          <h4 className="text-gray font-light ml-3"> Area from {`${area}`}</h4>
        </div>
      </div>
      <div className="flex lg:hidden flex-col border border-gray h-auto w-full max-w-[25rem] font-bricolage overflow-hidden rounded-[16px]">
  {/* Image */}
  <div className="w-full h-[19rem] rounded-b-[20px] overflow-hidden">
    <Image
      src={imageSrc} // Replace with your image path
      alt="Hebron Homes"
      width={500}
      height={300}
      quality={100}
      className="object-cover w-full h-full "
    />
  </div>

  {/* Details */}
  <div className="px-5 py-3 bg-white">
    <h1 className="text-black text-[24px] font-bold">Hebron Homes</h1>

    <div className="mt-2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-[20px]">${price}.00</h2>
        <h4 className="text-sm text-gray font-light">Area from {area}</h4>
      </div>

      <div className="flex gap-3 text-gray text-[13px]">
        <span className="flex items-center gap-1">
          <Image src="/bed.png" alt="Icon" width={12} height={12} />
          <p>{bedrooms} beds</p>
        </span>
        <span className="flex items-center gap-1">
          <Image src="/bath.png" alt="Icon" width={12} height={12} />
          <p>{bathrooms} bath</p>
        </span>
        <span className="flex items-center gap-1">
          <Image src="/home.png" alt="Icon" width={12} height={11} />
          <p>{area}sq.</p>
        </span>
      </div>

      <p className="text-gray text-sm mt-1 w-full">
        {truncateDescription(description, 10)}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm flex justify-center items-center rounded-full font-light w-1/2 h-[41px] bg-[#D8F0F1] text-[#1E1E1E]">
          Luxury Oasis
        </div>
        <Image
          alt="export"
          width={35}
          height={35}
          src="/export.png"
          className="rounded-full"
        />
      </div>
    </div>
  </div>
</div>


    </Link>
  );
};

export default PropertyCard;
