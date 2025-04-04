import React from "react";
import Image from "next/image";

const ListedCard = ({name,picture}) => {
  return (
    <div className="w-full max-w-[25rem] flex items-center gap-3 p-4 border rounded-xl  bg-[#f1f1f166]">
      {/* Profile Image */}
      <div className="w-[6rem] h-[6rem] relative">
        <Image
          src={picture} // Replace with actual image path
          alt="Profile Picture"
          fill
          className="rounded-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col">
        <span className="text-xl font-bold text-black font-bricolage">
     {name}
        </span>
        <span className="text-base text-[#8F8F8F] font-bricolage">
          Adron Corporation
        </span>
      </div>
    </div>
  );
};

export default ListedCard;
