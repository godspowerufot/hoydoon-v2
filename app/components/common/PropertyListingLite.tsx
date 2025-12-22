import { useState, useEffect, useRef } from "react";
import { truncateDescription, encodeId, formatPrice } from "@/utils";
import Link from "next/link";
import Image from "next/image";

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
    listingType?: string;
    _id?: string;
    region?: string;
    landSize?: number | string;
}

const PropertyListCardLite: React.FC<PropertyCardProps> = ({
    imageSrc = "_",
    altText = "_",
    price = "_",
    area = "_",
    region = " _",
    description = "_",
    title = "_",
    bathrooms = "_",
    bedrooms = "_",
    _id,
    squareFeet = "_",
    listingType,
    landSize = "_",
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            if (typeof window !== "undefined") {
                setIsMobile(
                    window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent)
                );
            }
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Intersection Observer for lazy rendering
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: "50px",
                threshold: 0.01,
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // Don't render content until in view
    if (!isInView) {
        return (
            <div
                ref={cardRef}
                className="relative lg:flex lg:w-[380px] h-[600px] bg-gray-100 rounded-[20px]"
            />
        );
    }

    return (
        <Link href={`/rent/${encodeId(_id)}`}>
            <div
                ref={cardRef}
                className={`relative lg:flex lg:w-[380px] h-[600px] bg-white overflow-hidden flex-col border rounded-[20px] ${
                    isHovered && !isMobile ? "border-gray" : "lg:border-transparent border border-gray"
                }`}
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
                style={{
                    // Add will-change for optimized animations
                    willChange: isHovered ? "transform" : "auto",
                }}
            >
                {/* Image container - CRITICAL FIXES */}
                <div
                    className={`relative w-full overflow-hidden ${
                        isMobile ? "h-[350px]" : isHovered ? "h-[350px]" : "h-[500px]"
                    }`}
                    style={{
                        borderRadius: 20,
                        // Remove transition on iOS to prevent memory issues
                        transition: isMobile ? "none" : "height 0.3s ease-in-out",
                    }}
                >
                    <Image
                        src={imageSrc || "/affordable-1.png"}
                        alt={altText}
                        loading="lazy"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                        quality={75}
                        style={{
                            objectFit: "cover",
                            borderRadius: 20,
                        }}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                </div>

                {/* Description - Remove complex opacity transitions */}
                <div
                    className={`flex-1 flex-col justify-start px-4 py-2 flex ${
                        isMobile
                            ? "opacity-100"
                            : isHovered
                            ? "opacity-100"
                            : "opacity-0 max-h-0 pointer-events-none"
                    }`}
                    style={{
                        // Simplify transition, remove will-change
                        transition: isMobile ? "none" : "opacity 0.2s ease-in-out",
                    }}
                >
                    <h1 className="text-black text-[22px] lg:text-[25px] font-bold">
                        {truncateDescription(title, 2)}
                    </h1>

                    <span className="flex-col flex mt-[6px] lg:mt-3">
                        <span className="flex gap-1 justify-between items-center">
                            <span className="flex items-center">
                                <h2 className="font-bold text-[23px]">
                                    {formatPrice(region, Number(price))}
                                </h2>
                                {listingType === "rent" && (
                                    <p className="text-gray mt-[2px] font-[400] text-[14px]">
                                        /mth
                                    </p>
                                )}
                            </span>
                            {area && (
                                <h4 className="lg:ml-[5rem] 2xl:ml-[10rem] text-label text-gray font-light">
                                    Area from {area}
                                </h4>
                            )}
                        </span>

                        <div className="flex mt-2 justify-start gap-3 items-start font-[400] text-base text-gray">
                            <span className="flex text-[13px] items-center gap-2">
                                <p>{bedrooms} beds</p>
                            </span>
                            <span className="flex items-center gap-2">
                                <p>{bathrooms} bath</p>
                            </span>
                            <span className="flex items-center gap-2">
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

                {/* Base info - simplified transition */}
                {!isMobile && (
                    <div
                        className={`absolute bottom-0 left-0 right-0 bg-white p-4 z-0 ${
                            isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                        style={{
                            transition: "opacity 0.2s ease-in-out",
                        }}
                    >
                        <span className="flex items-center">
                            <h2 className="font-bold lg:text-[24px]">
                                {formatPrice(region, Number(price))}
                            </h2>
                            <p className="text-gray mt-[2px] font-[400] text-[14px]">/mth</p>
                        </span>
                        <div className="flex mt-2 justify-start gap-5 text-[13px] font-[400] text-gray">
                            <span className="flex items-center gap-2">
                                <span className="w-[18px] h-[18px] bg-gray-300 rounded"></span>
                                <p>{bedrooms} beds</p>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-[18px] h-[18px] bg-gray-300 rounded"></span>
                                <p>{bathrooms} bath</p>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-[18px] h-[18px] bg-gray-300 rounded"></span>
                                <p>
                                    {listingType === "land"
                                        ? landSize
                                        : listingType === "sale"
                                        ? squareFeet
                                        : area}
                                    sq.
                                </p>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default PropertyListCardLite;