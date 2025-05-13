import Image from "next/image";
import Link from "next/link";
import { truncateDescription } from "@/utils";

export const ProfileCard = ({ 
  pictureUrl = "/default-picture.jpg", 
  _id = "", 
  fullname = "Unknown User", 
  email = "No email provided", 
  priceRange = { min: 0, max: 0 }, 
  sales = 0 
}) => {
    const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num;
  };
  return (<>
    <Link href={`/agent/${_id}`} className="flex flex-col w-full items-center justify-center">
    <div className="  lg:p-6 sm:h-fit flex rounded-[8px] lg:rounded-none  w-full h-[120px] gap-2 lg:gap-5 lg:h-[200px] justify-start bg-[#ffffff]  lg:w-[36rem] 2xl:w-[43.8rem]">
    <Image
  alt={fullname}
  src={pictureUrl}
  width={150}
  height={150}
  className="w-[150px] h-full rounded-tl-[8px] rounded-bl-[8px]   lg:w-[140px] lg:h-[140px]  lg:rounded-full brightness-75 aspect-square object-cover"
/>

    <div className="lg:mt-[1em]  p-[1rem] lg:p-0 w-fit  flex flex-col gap-y-1 lg:gap-y-2 lg:block  font-bricolage lg:ml-[0.3em]">
      <h2 className="font-bricolage  text-[15px] font-bold lg:text-[1.3em] text-black">{fullname}</h2>
      <p className="text-[#8F8F8F]  text-[12px] lg:text-[1em] font-[400] lg:w-[200px]">{email}</p>
  
      <div className="lg:mt-3">
      <p className="text-black text-[12px] lg:text-[1em]   font-[400] lg:w-[280px]">
        <b>${formatNumber(priceRange.min)} - ${formatNumber(priceRange.max)}</b> <b className="text-[#8F8F8F] font-[400]">Price range</b>
      </p>
      <p className="text-black text-[12px] lg:text-[1em] font-[400] lg:w-[200px]">
        <b>{sales}</b> <b className="text-[#8F8F8F] font-[300]">Total sales</b>
      </p>
      </div>
    </div>
    </div>
    </Link>
    </>
  );
  };