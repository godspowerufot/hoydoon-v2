/* eslint-disable */

'use client';

import React from 'react'
import Image from 'next/image';
import { FaRegEye} from "react-icons/fa6";
import ListedCard from '@/app/components/common/profilecard';
import ContactAgent from '@/app/components/layouts/contactagent';
import PropertyListCard from '@/app/components/common/PropertyListing';



const images = [
  '/afforable-1.png',
  '/afforable-2.png',
  '/house1.png',
  '/house1.png',
  '/house1.png',
  '/house1.png',
  '/house1.png',
];

const highlights = [
    { icon: "/solar.png", text: "Solar power system" },
    { icon: "/walkin.png", text: "Walk-in closet" },
    { icon: "/garage.png", text: "Garage parking" },
    { icon: "/balcony.png", text: "Balcony" },
    { icon: "/patio.png", text: "Covered patio or porch" },
    { icon: "/laundry.png", text: "Laundry" },
    { icon: "/pet.png", text: "Pet allowed" },
    { icon: "/heating.png", text: "Heating available" },
  ];
const Breadcrumb = () => {
    return (
      <div className="flex  items-center justify-between gap-[0.2rem] px-4 py-2  mt-[5rem] w-full  bg-gray-100">
        {/* Left Section: Back Arrow and Breadcrumb */}
        <div className="flex items-start justify-center  gap-2 text-[1.08rem] font-bricolage text-gray-600">
          {/* Back Arrow */}
          <img src="/arrow-right.png" alt="Back" className="w-3 h-4 mt-1" />
  
          {/* Breadcrumb Links */}
          <span className="text-gray-500">Search |</span>
          <a href="#" className="text-primary">Homes for sale</a>
          <span>{'>'}</span>
          <a href="#" className="text-primary">Nigeria</a>
          <span>{'>'}</span>
          <a href="#" className="text-primary">Lagos</a>
          <span>{'>'}</span>
          <a href="#" className="text-primary">Magodo Estate</a>
        </div>
  
        {/* Right Section: Icons */}
        <div className="flex ml-[33rem] items-center gap-2">
  <div className="p-2 border border-[#8F8F8F] rounded-md">
    <img src="/favorite.png" alt="Favorite" className="w-4 h-4" />
  </div>
  <div className="p-2 border border-[#8F8F8F] rounded-md">
    <img src="/upload.png" alt="Download" className="w-4 h-4" />
  </div>
  <div className="p-2 border border-[#8F8F8F] rounded-md">
    <img src="/image2.png" alt="Share" className="w-4 h-4" />
  </div>
</div>





        <div>
        </div>
      </div>
    );
  };
  

  
const page = () => {
  return (
    <div className='mt-8  2xl:w-[1520px] '> <Breadcrumb/>
    <div>
        hi
    </div>
   

{/* second div layout  */}
  


</div>
  )
}

export default page