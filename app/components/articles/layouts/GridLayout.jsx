"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import HoverCard from "../../common/card";

const Breadcrumb = ({ id, slug, title }) => {
  return (
    <div className="hidden lg:flex items-center justify-around py-2 lg:w-full my-[1rem] bg-gray-100">
      {/* Left Section */}
      <div className="flex w-full gap-1 text-[1.08rem] items-center font-bricolage text-gray-600">
        <Image
          src="/arrow-right.png"
          alt="arrow"
          height={12}
          width={12}
          className="w-4 h-4 object-contain"
        />
        <span className="text-gray-500">Home page |</span>

        <div className="flex font-light items-center gap-1">
          <a href="#" className="text-primary">
            Help Center
          </a>
        </div>

        <div className="flex items-center gap-1">
          <Image
            src="/arrow-right-top.png"
            alt="arrow"
            height={12}
            width={12}
          />
          <a href="#" className="text-primary">
            Article
          </a>
        </div>

        <div className="flex items-center gap-1">
          <Image
            src="/arrow-right-top.png"
            alt="arrow"
            height={12}
            width={12}
          />
          <a href="#" className="text-primary">
            {title || slug || `Page ${id}`}
          </a>
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center lg:-ml-[4rem] gap-2">
        <div className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md">
          {/* Favorite Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8F8F8F"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3.75a5.25 5.25 0 00-4.5 2.472A5.25 5.25 0 007.5 3.75 5.25 5.25 0 003 9c0 7.125 9 11.25 9 11.25s9-4.125 9-11.25a5.25 5.25 0 00-5.25-5.25z"
            />
          </svg>
        </div>
        <div className="p-2 border border-[#8F8F8F] rounded-md">
          <img src="/upload.svg" alt="Download" className="w-4 h-4" />
        </div>
        <div className="p-2 border border-[#8F8F8F] rounded-md">
          <img src="/image2.svg" alt="Share" className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

const GridLayout = ({ pageData }) => {
  const { data: allListings, isLoading } = useGetAllListingsQuery({});

  return (
    <div className="max-w-[1200px] mt-[4rem] mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        id={pageData?.id}
        slug={pageData?.slug}
        title={pageData?.title}
      />

      {/* Hero Image */}
      {pageData?.heroImage && (
        <div className="relative w-screen lg:w-full h-[400px] md:h-[500px] lg:rounded-md overflow-hidden">
          <Image
            src={pageData.heroImage}
            alt={pageData.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Page Title */}
      <h1 className="lg:text-[2rem] mt-8 lg:max-w-[42rem] text-xl leading-9 font-semibold">
        {pageData?.title}
      </h1>

      {/* Dynamic Sections */}
      {pageData?.sections?.map((section, index) => (
        <div key={index} className="mt-[3rem]">
          {section.heading && (
            <h2 className="lg:text-[2rem] lg:max-w-[42rem] text-xl leading-9 font-semibold">
              {section.heading}
            </h2>
          )}

          {/* Paragraphs */}
          {section.paragraphs?.map((para, pIndex) => (
            <p
              key={pIndex}
              className="text-gray font-light text-[12px] lg:text-xl font-bricolage w-full leading-5 mt-4"
            >
              {para}
            </p>
          ))}

          {/* Optional section image */}
          {section.image && (
            <div className="relative mt-[3rem] w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
              <Image
                src={section.image}
                alt={section.heading}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default GridLayout;
