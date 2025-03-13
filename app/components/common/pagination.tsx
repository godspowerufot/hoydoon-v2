"use client";

import { useState } from "react";
import Link from "next/link";

const Pagination = ({ totalPages = 9 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="text-gray-700    flex flex-col gap-2 text-center mt-[3rem]">
      {/* Viewing Status */}
      <p className=" font-bricolage font-[500] text-xl">
        Viewing page <span className="font-semibold">{currentPage}</span> of {totalPages}{" "}
        <Link href="#" className="text-primary font-medium hover:underline">
          (Download all)
        </Link>
      </p>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center gap-1">
        {/* Left Arrow (Disabled on first page) */}
       

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-2  py-2 text-center   font-bricolage  rounded-md text-gray-600 text-base ${
              currentPage === index + 1
                ? "bg-[#F9FAFB]   w-[3rem] font-bold "
                : "hover:text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Right Arrow (Disabled on last page) */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        >
          &gt;
        </button>
      </div>

      {/* Breadcrumbs */}
      <div className=" text-primary text-[19px]">
        <Link href="#" className="hover:underline">Hoydorn</Link>          <span className="text-gray"> {'>'}</span>

        <Link href="#" className="hover:underline"> Find an agent</Link>          <span className="text-gray">{'>'}</span>

        <Link href="#" className="hover:underline"> Lagos</Link>
      </div>
    </div>
  );
};

export default Pagination;
