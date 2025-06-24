/* eslint-disable */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import PropertyListCard from "@/app/components/common/PropertyListing";
import Button from "@/app/components/common/Button";
import Link from "next/link";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
interface Property {
  imageUrls?: { url?: string; altText?: string }[];
  item?: {
    price?: string;
    squareFeet?: number;
    bathrooms?: number;
    bedrooms?: number;
    description?: string;
    title?: string;
    rent?: string;
  };
}
const Breadcrumb = () => {
  return (
    <div className="flex  items-center justify-between gap-[0.2rem] pl-4 py-2 w-full  mt-[5rem]  bg-gray-100">
      {/* Left Section: Back Arrow and Breadcrumb */}
      <div className="flex items-start justify-center  gap-2 text-[1.08rem] font-bricolage text-gray-600">
        {/* Back Arrow */}
        <img src="/arrow-right.png" alt="Back" className="w-3 h-4 mt-1" />

        {/* Breadcrumb Links */}
        <span className="text-gray-500">Search |</span>
        <a href="#" className="text-primary">
          Homes for sale
        </a>
        <span>{">"}</span>
        <a href="#" className="text-primary">
          Nigeria
        </a>
        <span>{">"}</span>
        <a href="#" className="text-primary">
          Lagos
        </a>
        <span>{">"}</span>
        <a href="#" className="text-primary">
          Magodo Estate
        </a>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Breadcrumb />
    </div>
  );
};

export default page;
