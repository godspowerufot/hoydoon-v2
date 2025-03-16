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
    <div className="w-full  py-[2.3rem] px-4 lg:pl-[2.5rem] lg:pr-[4.5rem] 2xl:-px-[1.2rem]  flex  items-center justify-between">
      {/* Filter Section */}
      <div className="flex items-center ml-[2rem] gap-2">
        <button className="px-4  py-[0.6rem] border-solid border-[1px] text-gray border-[#8F8F8F] bg-[#F9FAFB]  rounded-md flex items-center gap-2">
          <Image src="/allfilter.png" alt="Filter" width={16} height={15} />
          All Filters
        </button>

        {/* Dropdown Buttons */}

        {['Buy', 'Price', 'Bed/Baths', 'Home type'].map((option) => (
        
        <div className="relative">  <select
            key={option}
            className="border border-[#8F8F8F] bg-[#F9FAFB] rounded-md px-4 text-[#8F8F8F] w-[8rem] 2xl:w-[2rem]  py-2 text-gray-700 outline-none appearance-none "     
                   value={selectedOption === option ? selectedOption : ''}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option className=' bg-[#F9FAFB] text-gray'>{option}</option>
          </select>
          <img src="/arrow-down.png" alt="Dropdown" className="w-3 h-2 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />

          </div>
        ))}

        {/* Save Search Button */}
        <button className="px-4 py-2 bg-teal-600 text-white rounded-md">Save Search</button>
      </div>

      {/* List and Map Toggle */}
      <div className="flex  h-fit bg-[#F9FAFB]  border-[#8F8F8F]   w-[10rem] 2xl:w-[10rem] justify-between border-solid border-[1px] items-center font-bricolage  rounded-[10px] p-1">
          {["List", "Map"].map((option) => (
            <button
              key={option}
              className={`px-4 py-1 w-[8rem]  text-[18px] rounded-md transition-all duration-300 ${
                selectedOptions === option ? "bg-primary  text-white" : "text-[#8F8F8F] "
              }`}
              onClick={() => setSelectedOptions(option)}
            >
              {option}
            </button>
          ))}
        </div>
    </div>
  );
};


  
const page = () => {
  return (
    <div className='mt-10  2xl:w-[1580px]  '> 
    <Breadcrumb/>
 <div className="lg:ml-[4rem] 2xl:ml-[2rem] grid w-[88%] 2xl:w-[95%]  grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
    

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