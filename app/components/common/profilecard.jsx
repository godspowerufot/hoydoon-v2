import React from "react";
import Image from "next/image";
import Link from "next/link";
import { encodeId } from "@/utils";

const ListedCard = ({ name, picture, id }) => {
  return (
    <>
      <Link href={`/agent/${encodeId(id)}`}>
        <div className="w-full cursor-pointer bg-[#F9FAFB] max-w-[15rem] lg:max-w-[25rem] flex items-center gap-3 p-4 border rounded-xl bg-[#f1f1f166]">
          {/* Profile Image */}
          <div className="w-12 h-12 lg:w-16 lg:h-16 relative rounded-full overflow-hidden">
            <Image
              src={picture || "/Avatar.svg"}
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col">
            <span className="text-[1.23rem] lg:text-xl font-bold text-black font-bricolage">
              {name}
            </span>
            <span className="text-base text-[#8F8F8F] font-bricolage">
              {/* Adron Corporation */}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ListedCard;
