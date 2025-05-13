"use client";

import { convertToCSV } from "@/utils/log";
import Link from "next/link";
import Image from "next/image";
interface PaginationProps {
  totalPages: number;       // total number of pages
  currentPage: number;     
  display:string[]; // current page number
  onPageChange: (page: number) => void; // function to handle page change, takes a number (new page) as an argument
}

const Pagination = ({ totalPages, currentPage, onPageChange,display}: PaginationProps) => {

  const handleDownloadCSV = () => {
    if (!display.length) return;
  
    const csv = convertToCSV(display);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'listings_page.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="text-gray-700   w-full justify-center items-center  flex flex-col gap-2 text-center mt-[3rem]">
      {/* Viewing Status */}
      <p className=" font-bricolage lg:font-[500] lg:text-xl">
        Viewing page <span className="font-semibold">{currentPage}</span> of {totalPages}{" "}
        <span   onClick={handleDownloadCSV}  className="text-primary font-medium hover:underline">
          (Download all)
        </span>
      </p>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center gap-1">
        {/* Left Arrow (Disabled on first page) */}
       

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-2 py-2 text-center font-bricolage rounded-md text-gray-600 text-base ${
            currentPage === index + 1
              ? "bg-[#F9FAFB] w-[3rem] font-bold"
              : "hover:text-black text-[#8F8F8F]"
          }`}
        >
          {index + 1}
        </button>
      ))}
        {/* Right Arrow (Disabled on last page) */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        >
                 <Image src="/arrow-right-top.png" alt="arrow" height={12} width={12} />

        </button>
      </div>

      {/* Breadcrumbs */}
      <div className="flex gap-3  text-primary lg:text-[19px]">
        <Link href="/" className="hover:underline">Hoydoon</Link>                    <Image src="/arrow-right-top.png" alt="arrow" height={12} width={12} />


        <Link href="/agent" className="hover:underline "> Find an agent</Link>         
        

      </div>
    </div>
  );
};

export default Pagination;
