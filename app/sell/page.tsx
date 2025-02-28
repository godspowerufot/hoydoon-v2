
'use client'
import React from 'react'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'

const Buy= () => {
  return (
  <>
      <header className="relative h-[45em] lg:h-[52em] w-full ">
    {/* Background Image Div */}
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
      style={{ backgroundImage: "url('/header3.svg')" }}
    ></div>
  
    {/* Content Section */}
    <div className="flex z-[1] relative gap-6 justify-center items-center flex-col">
      {/* Main Heading */}
      <h1 className="lg:w-[10em] mt-[2em] lg:mt-[1.4em] text-white text-[2em] w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
        Where Every House Feels Like Home
      </h1>
     
  
  
      {/* Subheading */}
      <h2 className="lg:text-[1.5em] 2xl:text-[1.6em]  font-[400] text-center text-[#FFFFFFB2] w-[33em]">
        From urban flats to rural getaways, Hoydoon effortlessly links you to the home of your dreams with trust and ease.
      </h2>
  
      {/* Large Screen Search Bar */}
      <div className="hidden lg:flex justify-center items-center w-full">
        <div className="flex pl-[2.5%] h-[4em] py-4 font-bricolage   items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[57em] ">
        <div className="w-[80%] flex justify-center items-center">
  
     
          {/* Location */}
          <div className="flex flex-col flex-1">
            <span className="text-[1em] font-semibold text-black">Location</span>
            <div className="text-[1em] text-gray">Search Locations</div>
          </div>
  
          {/* Vertical Divider */}
          <div className="h-10 w-[1px] bg-black mx-[2px] my-1"></div>
  
          {/* Type */}
          <div className="flex flex-col  w-[100px] flex-1 ml-[3%]">
            <span className="text-[1em] font-semibold text-black">Type</span>
            <div className="text-[1em] text-gray">Add type</div>
          </div>
  
          {/* Vertical Divider */}
          <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>
  
          {/* Price Range */}
          <div className="flex flex-col flex-1 ml-[3%]">
            <span className="text-[1em] font-semibold text-black">Price Range</span>
            <div className="text-[1em] text-gray">Add range</div>
          </div>
  
          {/* Vertical Divider */}
          <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>
  
          {/* Number of Guests */}
          <div className="flex flex-col flex-1 ml-[3%]">
            <span className="text-[1em] font-medium text-black">Number of Guests</span>
            <div className="text-[1em] text-gray">Add number</div>
          </div>
  
          {/* Search Button */}
         
        </div>
        <div className="relative p-1 ml-[10%] rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-white before:via-white/30 before:to-white/10 before:p-[1px]">
    <div className="relative bg-primary p-3 w-[50px] h-[50px] rounded-full flex items-center justify-center">
      <Image
        alt="logo"
        width={30}
        loading="lazy"
        height={30}
        quality={100} // Ensures maximum quality
         
        src={'/search.png'}
        style={{ objectFit: 'cover' }}
      />
    </div>
  </div>
  
        </div>
      </div>
  
      {/* Small Screen Search Bar */}
      <div className="lg:hidden justify-center items-center w-full px-2 py-3">
        <div className="flex h-[4em] font-bricolage items-center m-5 bg-white rounded-full shadow-md w-[89%] md:w-4/5 lg:w-3/5">
          <div className="flex flex-col flex-1">
            <div className="text-sm text-gray">
              Address, Neighborhood, City, Zip code...
            </div>
          </div>
          <div className="bg-primary p-3 mr-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
            <FaSearch className="text-white h-6 text-sm" />
          </div>
        </div>
      </div>
    </div>
  
    {/* Statistics Section */}
    <div className="absolute bottom-0 lg:flex font-bricolage lg:mt-8 justify-center items-center w-full py-10 px-4">
      <div className="flex items-center rounded-lg w-9/10 md:w-4/5 lg:w-7/10">
        {/* Hosts Section */}
        <div className="flex flex-1 text-center gap-2 px-4">
          <span className="text-13xl text-white">10M+</span>
          <span className="text-xl w-[175px] text-start text-white">
            hosts welcome guests worldwide
          </span>
        </div>
  
        {/* Vertical Divider */}
        <div className="h-12 w-[1px] bg-white mx-2 my-1"></div>
  
        {/* Unique Stays Section */}
        <div className="flex flex-1 text-center px-4 gap-2">
          <span className="text-13xl text-white">15M+</span>
          <span className="text-xl w-[179px] text-start text-white">
            Unique stays across 150K+ cities
          </span>
        </div>
  
        {/* Vertical Divider */}
        <div className="h-12 w-[1px] bg-white mx-2 my-1"></div>
  
        {/* Guest Arrivals Section */}
        <div className="flex gap-2 flex-1 text-center px-4">
          <span className="text-13xl text-white">12M+</span>
          <span className="text-xl w-[175px] text-start text-white">
            guest arrivals to date every month
          </span>
        </div>
      </div>
    </div>
  </header>
  </>
    
  )
}

export default Buy;