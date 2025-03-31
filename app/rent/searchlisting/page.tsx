/* eslint-disable */

'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import PropertyCard from '@/app/components/common/property';
import Pagination from '@/app/components/common/pagination';
import { properties } from '@/constants';

const Breadcrumb = () => {
      const [selectedOptions, setSelectedOptions] = useState("List");
    
  const [selectedOption, setSelectedOption] = useState("Buy");

  return (
    
    <div className="  pt-[2.3rem] lg:w-full  2xl:w-fit 2xl:gap-[37rem] px-4 lg:pl-[2rem] lg:pr-[4.5rem] 2xl:-ml-[3.2rem]   flex  items-center justify-between">
      {/* Filter Section */}
      <div className="flex items-center ml-[2rem] gap-2">
        <button className="px-4  py-2 h-auto border-solid border-[1px] text-gray border-[#8F8F8F] bg-[#F9FAFB]  rounded-md flex items-center gap-2">
          <Image src="/allfilter.png" alt="Filter" width={16} height={15} />
          All Filters
        </button>

        {/* Dropdown Buttons */}

        {['Buy', 'Price', 'Bed/Baths', 'Home type'].map((option) => (
          <div className="relative flex items-center">
            <select
              key={option}
              className="border border-[#8F8F8F] bg-[#F9FAFB]  text-[14.5px] rounded-md text-[#8F8F8F] h-auto w-auto flex items-center justify-center gap-2 p-2 text-gray-700 outline-none appearance-none pr-6"
              value={selectedOption === option ? selectedOption : ''}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option className="bg-[#F9FAFB] text-gray text-center">{option}</option>
            </select>
            <img
              src="/arrow-down.png"
              alt="Dropdown"
              className="w-3 h-2 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        ))}

        {/* Save Search Button */}
        <button className="px-4 py-2 h-a bg-teal-600 text-white rounded-md">Save Search</button>
      </div>

      {/* List and Map Toggle */}
      <div className="flex  bg-[#F9FAFB] border-[#8F8F8F] w-auto 2xl:-mr-[2rem]  justify-between border-solid border-[1px] items-center font-base rounded-[10px]  2xl:p-[4px] lg:p-[2px] h-auto relative">
        {["List", "Map"].map((option, index) => (
          <React.Fragment key={index}>
            <button
              className={`px-4 py-2   2xl:w-[5.5rem] w-[4.5rem]  text-[16px] rounded-md transition-all duration-300 ${
                selectedOptions === option ? "bg-primary  mr-[3rem] text-white" : "text-[#8F8F8F]"
              }`}
              onClick={() => setSelectedOptions(option)}
            >
              {option}
            </button>
            {index === 0 && (
              <div className="absolute w-[1px] h-[70%] bg-[#8F8F8F] left-1/2 transform -translate-x-1/2"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      
    </div>
  );
};


  
const page = () => {
  return (
    <div className='mt-[4rem]    w-full h-full   flex-col flex justify-center items-center  '> 
    <Breadcrumb/>'  
    <div className="flex justify-between gap-[19rem] 2xl:gap-[43rem] items-center  ">
      <h1 className="text-black 2xl:-ml-[2rem] font-semibold text-4xl">
        Lagos Real-estate & Homes for Sale
      </h1>
      <div className="text-gray-600 2xl:-ml-[8rem] text-sm flex items-center space-x-4">
        <span className='flex gap-2'>350 <p className='font-[300] text-gray'> of</p> 1,500 Homes</span>
        <span className="text-black font-[400] flex gap-2  justify-center items-center cursor-pointer">Sort: <p className='text-primary'>  New listings  </p>  <img
              src="/arrow-down.png"
              alt="Dropdown"
              className="w-3 h-2   pointer-events-none"
            /></span>
      </div>
    </div>
    <div className='w-full  mt-[1rem] mb-[2rem] h-[2px] bg-[#D9D9D9] '/>
    <div className=" grid 2xl:mr-[4rem]   mr-4  grid-cols-1 md:grid-cols-3 gap-1 gap-y-[2rem] place-items-center">
    

        {properties.map((property, index) => (
            <PropertyCard
                key={index}
                imageSrc={property.imageSrc}
                altText={property.altText}
                price={property.price}
                area={property.area}
            />
        ))}

      </div>
      <Pagination/>
{/* second div layout  */}
  


</div>
  )
}

export default page