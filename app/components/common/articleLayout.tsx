"use client";

import { truncateDescription } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface PropertyCardProps {
  id: string;
  imageSrc: string;
  altText: string;
  title: string;
  articleType: string;
  readTime: string;
  date: string;
  description?: string; // Added description prop
}

const ArticleCard: React.FC<PropertyCardProps> = ({
  id,
  imageSrc,
  altText,
  title,
  articleType,
  readTime,
  date,
  description = "Explore this insightful article that dives deep into the latest trends and developments. Discover valuable insights and expert perspectives that will enhance your understanding of the topic.",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Simple mobile detection
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

  return (
    <>
      <Link href={`/article/${id}`}>
        <div
          className={`relative w-full h-fit  lg:w-[23rem] max-w-[500px] mx-auto lg:h-[570px] bg-white overflow-hidden flex-col transition-all duration-[1500ms] ${isHovered && !isMobile
            ? "border border-gray rounded-xl "
            : "border border-gray lg:border-0   rounded-xl"
            }`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
          {/* Image container */}
          <div
            className={`relative w-full ${isMobile
              ? "h-[350px]"
              : `transition-all duration-[1000ms] ease-in-out ${isHovered ? "h-[300px]" : "h-fit lg:h-[400px]"
              }`
              }`}
          >
            <Image
              alt={altText}
              width={500}
              height={300}
              quality={100}
              src={imageSrc || "/placeholder.svg"}
              className="w-full h-full object-cover rounded-xl transition-all duration-[1500ms] ease-in-out"
            />
          </div>

          {/* Content - Always visible on mobile */}
          <div
            className={` hidden lg:block p-4 lg:p-2 py-5 flex-1  ${isHovered ? "p-4 lg:p-4 lg:hidden " : "lg:py-5  p-0"
              }`}
          >
            {/* Category */}
            <div className="flex items-center gap-2 mb-2">
              <Image alt="tag" width={18} height={18} src="/mage_file.png" />
              <span className="text-xs text-black">{articleType}</span>
            </div>

            {/* Title */}
            <h3 className="font-medium text-[1.3em] text-black mb-2">
              {title}
            </h3>

            {/* Description - Hidden by default on desktop, shown on hover */}

            {/* Footer - Always visible */}
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
              <div className="flex items-center gap-1.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 7V12L15 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {readTime}
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="15"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3 10H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 3V7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 3V7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {date}
              </div>
            </div>
          </div>
          {/* second div */}
          <div
            className={`p-3 lg:p-3 ${isMobile
              ? "opacity-100 max-h-full"
              : `transition-all ease-in-out ${isHovered
                ? "duration-[2000ms] p-3 pt-[1.3em]  opacity-100 max-h-[200px]"
                : "duration-300 opacity-0 max-h-0 overflow-hidden"
              }`
              }`}
          >
            {" "}
            <div className="flex items-center gap-2 mb-2">
              <Image alt="tag" width={18} height={18} src="/mage_file.png" />
              <span className="text-xs text-black">{articleType}</span>
            </div>
            {/* Title */}
            <h3 className="font-medium text-[1.2em] text-black mb-2">
              {title}
            </h3>
            {/* Description - Hidden by default on desktop, shown on hover */}
            <p className="text-gray text-sm mb-4 leading-relaxed">
              {truncateDescription(description, 40)}
            </p>
            {/* Footer - Always visible */}
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
              <div className="flex items-center gap-1.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 7V12L15 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {readTime}
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="15"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3 10H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 3V7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 3V7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {date}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArticleCard;
