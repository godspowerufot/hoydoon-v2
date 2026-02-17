import Image from "next/image";
import { useState } from "react";
import { truncateDescription, encodeId, formatPrice } from "@/utils";
import Link from "next/link";
const HoverCard = ({
  imageSrc = "/default-image.jpg",
  altText = "Default Alt Text",
  price = "N/A",
  _id,
  region,
  bathrooms,
  slugs,
  bedrooms,
  area,
  description = "No description available",
  title = "Untitled Property",
  rent = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Link href={`/rent/${slugs}`}>
        <div
          className={`relative lg:flex hidden w-[93%] h-[500px] bg-white overflow-hidden flex-col border transition-all duration-[1500ms] ${isHovered ? "border-gray rounded-[20px]" : "border-transparent"
            }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image container */}
          <div
            className={`relative w-full transition-all duration-[2000ms] ease-in-out ${isHovered ? "h-[300px]" : "h-[410px]"
              }`}
          >
            <Image
              src={imageSrc || "/affordable-1.png"}
              alt={altText}
              fill
              style={{ objectFit: "cover", borderRadius: 20 }}
              className="transition-all -mt-[2px] duration-[1500ms] ease-in-out rounded-[20px]"
            />
          </div>

          {/* Description below image (details section) */}
          <div
            className={`flex-1 flex-col justify-start px-4 py-2 flex transition-all ease-in-out ${isHovered
              ? "duration-[2000ms] opacity-100 max-h-[1000px]"
              : "duration-300 opacity-0 max-h-0 pointer-events-none"
              }`}
          >
            <h2 className="text-[#000000] text-[20px] lg:text-md font-medium mb-2">
              {truncateDescription(title, 6)}
            </h2>
            <span className="hidden flex-col justify-between lg:flex mt-1">
              <span className="flex justify-between items-center gap-1">
                <div className="flex">
                  <h4 className="text-gray text-label flex items-center justify-center font-light">
                    From
                  </h4>
                  <p className="font-bold lg:text-[22px] ml-2">
                    {formatPrice(region, Number(price))}
                  </p>
                </div>
                <h4 className="text-label text-gray font-light">
                  Area from {area}
                </h4>
              </span>
              <p className="text-gray mb-2 text-[14px] mt-2">
                {truncateDescription(description, 13)}
              </p>
              <div className="mt-2 mb-1 flex justify-between items-center">
                <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light h-[32px] lg:w-[120px] text-[#1E1E1E] bg-[#D8F0F1]">
                  Luxury Oasis
                </div>
                <Image
                  alt="export icon"
                  width={32}
                  height={32}
                  quality={100}
                  src={"/export.png"}
                  className="rounded-full"
                />
              </div>
            </span>
            <span className="flex-col lg:hidden flex mt-1">
              <span className="flex gap-1 items-center justify-between w-full">
                <span className="flex items-center">
                  <h2 className="font-bold text-[18px]">
                    {" "}
                    {formatPrice(region, Number(price))}
                  </h2>
                </span>
                <h4 className="text-label text-gray font-light">
                  Area from {area}
                </h4>
              </span>
              <div className="flex mt-1 justify-start gap-3 items-start font-[400] text-base text-gray">
                <span className="flex text-[12px] items-center gap-2">
                  <Image src="/bed.png" alt="Icon" width={16} height={16} />
                  <p>{bedrooms} bends</p>
                </span>
                <span className="flex items-center gap-2">
                  <Image src="/bath.png" alt="Icon" width={16} height={16} />
                  <p>{bathrooms} bath</p>
                </span>
                <span className="flex items-center gap-2">
                  <Image src="/home.png" alt="Icon" width={16} height={16} />
                  <p>{area}sq.</p>
                </span>
              </div>
              <p className="text-gray w-full text-[13px] mt-2">{description}</p>
              <div className="my-4 flex justify-between items-center">
                <div className="text-base flex justify-center font-bricolage items-center rounded-full font-light w-1/2 h-[32px] text-[#1E1E1E] bg-[#D8F0F1]">
                  Luxury Oasis
                </div>
                <Image
                  alt="export"
                  width={28}
                  height={28}
                  src={"/export.png"}
                  className="rounded-full"
                />
              </div>
            </span>
          </div>

          {/* basenow  */}
          <div
            className={`absolute -bottom-[10px] left-0 right-0 bg-white p-4 z-0 transition-opacity duration-500 ease-in-out ${isHovered ? "opacity-0" : "opacity-100"
              }`}
          >
            <span className="flex items-center gap-3">
              <h4 className="text-gray font-light">From</h4>
              <h2 className="font-bold text-[28px]">
                {formatPrice(region, Number(price))}
              </h2>
            </span>
            <h4 className="text-gray font-light "> Area from {`${area}`}</h4>
          </div>
        </div>

        <div className="flex lg:hidden flex-col border border-gray h-auto w-full max-w-full lg:max-w-[25rem] font-bricolage overflow-hidden rounded-[16px]">
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
            <h2 className="text-black text-[24px] font-bold">Hebron Homes</h2>

            <div className="mt-2 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-[20px]">
                  {formatPrice(region, Number(price))}
                </h2>
                <h4 className="text-sm text-gray font-light">
                  Area from {area}
                </h4>
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
                  <Image src="/home.png" alt="Icon" width={12} height={12} />
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
    </>
  );
};

export default HoverCard;
