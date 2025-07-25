// /* eslint-disable */

"use client";

import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  id: string;
  imageSrc: string;
  altText: string;
  title: string;
  articleType: string;
  readTime: string;
  date: string;
}

const ArticleCard: React.FC<PropertyCardProps> = ({
  id,
  imageSrc,
  altText,
  title,
  articleType,
  readTime,
  date,
}) => {
  return (
    <>
      <Link href={`/article/${id}`}>
        <div className="w-full lg:w-[23rem] max-w-[500px] mx-auto bg-white rounded-xl overflow-hidden border border-thin border-solid border-[#8F8F8F] ">
          {/* Image */}
          <div className="w-full h-fit">
            <Image
              alt={altText}
              width={500}
              height={250}
              quality={100}
              src={imageSrc || "/placeholder.svg"}
              className="w-full h-[350px] object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category */}
            <div className="flex items-center gap-1.5 mb-2">
              <Image alt="tag" width={18} height={18} src="/mage_file.png" />
              <span className="text-xs text-black">{articleType}</span>
            </div>

            {/* Title */}
            <h3 className="font-meduim text-xl  text-black mb-2">{title}</h3>

            {/* Description */}

            {/* Footer */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
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
