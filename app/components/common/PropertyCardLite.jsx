"use client";

import { useState, useEffect } from "react";
import { truncateDescription, encodeId } from "@/utils";
import Link from "next/link";
import Image from "next/image";

const PropertyCardLite = ({
    imageSrc = "/default-image.jpg",
    altText = "Default Alt Text",
    price = "N/A",
    _id,
    bathrooms,
    bedrooms,
    area = "_",
    description = "No description available",
    title = "Untitled Property",
    rent = "",
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const showDetails = isMobile || isHovered;

    return (
        <Link href={`/rent/${encodeId(_id)}`}>
            <div
                className={`hidden lg:flex flex-col rounded-[16px] lg:rounded-[1.5rem] border-[1px] border-gray 2xl:h-[40rem] h-[32rem] lg:h-[600px] lg:w-[23rem] 2xl:w-[28rem] font-bricolage snap-center shrink-0 cursor-pointer overflow-hidden lg:ml-8 relative group transition-all duration-[1500ms] ease-in-out ${isHovered
                    ? "border-solid rounded-2xl p-0 border-[1px] border-gray"
                    : " border lg:border-none"
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image container */}
                <div className="overflow-hidden rounded-b-[20px] lg:rounded-lg h-full lg:h-[25rem] lg:rounded-b-[27px] w-full transition-all duration-[1500ms] ease-in-out relative">
                    <Image
                        src={imageSrc || "/affordable-1.png"}
                        alt={altText}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-all duration-[1500ms] ease-in-out"
                    />
                </div>

                {/* Details Section */}
                <div
                    className={`mt-3 lg:mt-5 px-5 transition-all duration-[1500ms] ease-in-out ${showDetails
                        ? "opacity-100 translate-y-0 h-fit lg:h-[175px]"
                        : "h-0 opacity-0 translate-y-5 max-h-0"
                        }`}
                >
                    <h1 className="text-black text-[24px] lg:text-[28px] font-bold">
                        {truncateDescription(title, 2)}
                    </h1>
                    <span className="hidden flex-col justify-between lg:flex mt-3">
                        <span className="flex justify-between items-center gap-1">
                            <div className="flex">
                                <h4 className="text-gray text-label flex items-center justify-center font-light">
                                    From
                                </h4>
                                <h2 className="font-bold lg:text-[28px]">${price}</h2>
                            </div>
                            <h4 className="text-label text-gray font-light">
                                Area from {area}
                            </h4>
                        </span>
                        <p className="text-gray mb-[1.1rem] text-[16px] mt-4">
                            {truncateDescription(description, 11)}
                        </p>
                        <div className="mt-[6px] mb-1 flex justify-between items-center">
                            <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1]">
                                Luxury Oasis
                            </div>
                            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full"></div>
                        </div>
                    </span>
                    <span className="flex-col lg:hidden flex mt-3">
                        <span className="flex gap-1 items-center justify-between w-full">
                            <span className="flex items-center">
                                <h2 className="font-bold text-[23px]">${price}.00</h2>
                            </span>
                            <h4 className="lg:ml-[5rem] 2xl:ml-[10rem] text-label text-gray font-light">
                                Area from {area}
                            </h4>
                        </span>

                        <div className="flex mt-2 justify-start gap-3 items-start font-[400] text-base text-gray">
                            <span className="flex text-[13px] items-center gap-1">
                                <span className="w-3 h-3 bg-gray-300 rounded"></span>
                                <p>{bedrooms} beds</p>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-gray-300 rounded"></span>
                                <p>{bathrooms} bath</p>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-gray-300 rounded"></span>
                                <p>{area}sq.</p>
                            </span>
                        </div>

                        <p className="text-gray w-[20rem] text-[14px] mt-4">
                            {truncateDescription(description, 10)}
                        </p>

                        <div className="mt-5 flex justify-between items-center">
                            <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light h-[41px] w-1/2 lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1]">
                                Luxury Oasis
                            </div>
                            <div className="w-[35px] h-[35px] bg-gray-300 rounded-full"></div>
                        </div>
                    </span>
                </div>

                {/* Base Info - shown when not hovered */}
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-white p-4 z-0 transition-opacity duration-500 ease-in-out ${isHovered ? "opacity-0" : "opacity-100"
                        }`}
                >
                    <span className="flex items-center">
                        <h2 className="font-bold lg:text-[24px]">${price}</h2>
                        <p className="text-gray mt-[2px] font-[400] text-[14px]">/mth</p>
                    </span>
                    <div className="flex mt-2 justify-start gap-5 text-[13px] font-[400] text-gray">
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-gray-300 rounded"></span>
                            <p>{bedrooms} beds</p>
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-gray-300 rounded"></span>
                            <p>{bathrooms} bath</p>
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-gray-300 rounded"></span>
                            <p>{area}sq.</p>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCardLite;
