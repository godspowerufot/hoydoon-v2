import Image from "next/image";
import { useState, useEffect } from "react";
import { truncateDescription, encodeId } from "@/utils";
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
  listingType?: string;
  _id?: string;
  landSize?: number | string;
}

const PropertyListCard: React.FC<PropertyCardProps> = ({
  imageSrc = "_",
  altText = "_",
  price = "_",
  area = "_",
  description = "_",
  title = "_",
  bathrooms = "_",
  bedrooms = "_",
  _id,
  squareFeet = "_",
  listingType ,
  landSize = "_",
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
      <Link href={`/rent/${encodeId(_id)}`}>
        <div
          className={`relative lg:flex  lg:w-[380px] h-[600px] bg-white overflow-hidden flex-col border transition-all duration-[1500ms] ${
            isHovered && !isMobile
              ? "border-gray rounded-[20px]"
              : "lg:border-transparent border border-gray rounded-[20px] "
          }`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
          {/* Image container */}
          <div
            className={`relative w-full ${
              isMobile
                ? "h-[350px]"
                : `transition-all duration-[2000ms] ease-in-out ${
                    isHovered ? "h-[350px]" : "h-[500px]"
                  }`
            }`}
          >
            <Image
              src={imageSrc || "/affordable-1.png"}
              alt={altText}
              fill
              style={{ objectFit: "cover", borderRadius: 20 }}
              className="transition-all duration-[1500ms] ease-in-out rounded-[20px]"
            />
          </div>

          {/* Description below image (details section) */}
          <div
            className={`flex-1 flex-col justify-start px-4 py-2 flex ${
              isMobile
                ? "opacity-100 max-h-full"
                : `transition-all ease-in-out ${
                    isHovered
                      ? "duration-[2000ms] opacity-100 max-h-[1000px]"
                      : "duration-300 opacity-0 max-h-0 pointer-events-none"
                  }`
            }`}
          >
            <h1 className="text-black text-[22px] lg:text-[25px] font-bold">
              {truncateDescription(title, 2)}
            </h1>

            <span className="flex-col flex mt-[6px] lg:mt-3">
              <span className="flex gap-1 justify-between items-center">
                <span className="flex  items-center">
                  <h2 className="font-bold text-[23px]">
                    ${price?.toLocaleString()}.00
                  </h2>
                  <p className="text-gray mt-[2px] font-[400] text-[14px]">
                    /mth
                  </p>
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
          </div>

          {/* basenow  */}
          {!isMobile && (
            <div
              className={`absolute bottom-0 left-0 right-0 bg-white p-4 z-0 transition-opacity duration-500 ease-in-out ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="flex items-center">
                <h2 className="font-bold lg:text-[24px]">${price}.00</h2>
                <p className="text-gray mt-[2px] font-[400] text-[14px]">
                  /mth
                </p>
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
                  <p>                  {listingType === 'land' ? landSize : listingType === 'sale' ? squareFeet : area}sq.</p>

                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default PropertyListCard;
