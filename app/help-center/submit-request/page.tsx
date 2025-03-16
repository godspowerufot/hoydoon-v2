// /* eslint-disable */

"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Input from "@/app/components/common/inputs/input";
import Image from "next/image";

const SubmitRequest = () => {
  const [category, setCategory] = useState(""); 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    "General Inquiry",
    "I'm seeking to update my contact details",
    "Assistance",
    "I'm an agent and I'm unable to edit my listings",
    "My listing was flagged for review"
  ];

  return (
    <div className="max-w-[75rem] 2xl:max-w-[100rem] mt-10 mx-auto p-6 bg-white">
      {/* 🔹 Breadcrumb */}
      <div className={  `flex items-center justify-between  pl-1 py-2 w-full bg-gray-100 ${category ? "gap-[32rem]" : "gap-[28rem] 2xl:gap-[42rem]"}`}> 
        <div className="flex items-center justify-center gap-2 text-[1.08rem] text-gray-600">
          <Image src="/arrow-right.png" alt="Back" width={500} height={500} className="w-3 h-4 mt-1" />
          <span className="text-primary">Hoydoon Help Center |</span>
          <a href="#" className="text-black">Submit a request</a>
        </div>

        {/* Search Bar */}
        <div className="relative w-[21rem] 2xl:w-[26rem]">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Image
              alt="Search"
              src={'/Search2.png'}
              width={20}
              height={20}
              quality={100}
              loading="lazy"
              className="text-gray"
            />
          </div>
          <Input
            label=""
            type="text"
            className="w-full 2xl:h-[4rem] p-5 pl-12 rounded-[15px]"
            placeholder="Search"
          />
        </div>
      </div>

      {/* 🔹 Form Layout */}
      <div className={`mt-6 ${category ? "grid grid-cols-3 gap-10 2xl:gap-[10rem] text-base" : "flex  text-base justify-between"}`}>
        {/* Left Section */}
        <div className={`${category ? "md:col-span-2" : "w-full "} max-w-[50rem]`}>
          <h1 className="text-3xl font-semibold mb-6">Submit a request</h1>

          {/* 🔹 Category Dropdown */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-base mb-2 2xl:text-[1.2em]">Please choose your issue below</label>
            <div
              className="border p-3 border-gray flex  text-base 2xl:text-xl justify-between items-center cursor-pointer bg-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {category || "Select an option"}
              <FaChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </div>
            {dropdownOpen && (
              <div className="absolute left-0 w-full border-gray  text-base  2xl:text-xl border mt-1 z-10 bg-white">
                {categories.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer  hover:bg-primary hover:text-white"
                    onClick={() => {
                      setCategory(item);
                      setDropdownOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🔹 Dynamic Form Fields */}
          {category && (
            <>
              <Input label="Enter your email address" type="email" className="w-full rounded-none border p-3 mb-4" />
              <Input label="Enter Subject" type="text" className="w-full border p-3 rounded-none mb-4" />
              <label className="block text-gray-700 text-base mb-2 2xl:text-[1.2em]">Enter Description</label>
              <textarea className="w-full border p-3 h-[10rem]  bg-transparent mb-4" placeholder="Enter description"></textarea>
            </>
          )}

          {category === "I'm seeking to update my contact details" && (
            <textarea className="w-full border p-3 bg-transparent  h-[10rem] mb-4" placeholder="Enter listing address and name to verify ownership of listing"></textarea>
          )}

          {category === "Assistance" && (
            <>
              <Input label="Mobile apps - What version of iOS or Android app are you using?" type="text" className="w-full border rounded-none p-3 mb-4" />
              <Input label="Website - What browser are you using?" type="text" className="w-full border rounded-none p-3 mb-4" />
            </>
          )}

          {category === "I'm an agent and I'm unable to edit my listings" && (
            <Input label="Provide listing's address or a link to the home" type="text" className="w-full rounded-none border p-3 mb-4" />
          )}

          {category === "My listing was flagged for review" && (
            <>
              <label className="block text-gray-700 text-base mb-2 2xl:text-[1.2em]">Attachments</label>
              <div className="border p-3 text-center cursor-pointer border-gray bg-white">
                <span className="text-primary cursor-pointer">Add files</span> or drop files here
                <input type="file" className="hidden" />
              </div>
            </>
          )}

          {category && (
            <>
              <label className="block text-gray-700 text-base mb-2 2xl:text-[1.2em]">Attachments</label>
              <div className="border p-3 text-center cursor-pointer border-gray bg-white">
                <span className="text-primary cursor-pointer">Add files</span> or drop files here
                <input type="file" className="hidden" />
              </div>

              <button className="w-[12rem] bg-primary mt-10 text-white py-3 rounded">Submit</button>
            </>
          )}
        </div>

        {/* 🔹 Right Section (Only show if a category is selected) */}
        {category && (
          <div className="w-full max-w-[25rem]">
            <h2 className="text-lg font-semibold mb-4">Articles in this section</h2>
            <div className="space-y-2">
              {[
                "Rental Scams Uncovered: How to Spot and Avoid Fraudulent Listings",
                "Do I Need a Real Estate Agent to Buy a Home?",
                "What Are Common Mistakes to Avoid When Buying a Home?",
                "What Do I Do If a Listing Has Incorrect Information?"
              ].map((article, index) => (
                <button key={index} className="w-full text-left p-3 border rounded-md border-gray text-gray hover:bg-gray-200">
                  {article}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitRequest;
