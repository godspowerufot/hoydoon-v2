'use client'
import React from 'react'
import Image from 'next/image'
import Barsearch from '../components/layouts/barsearch'
const Buy= () => {
  return (
    <>
          <header className="relative h-[45em] lg:h-[70em]   w-full">
      
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          alt="Header-background"
          src="/rent.png"
          layout="fill"
          loading='lazy'
          objectFit="cover"
          quality={100}
          className="z-[-1]  "
        />
      </div>
    
    
    
      {/* Content Section */}
      <div className="p-4 flex  gap-6 justify-center items-center flex-col">
        {/* Main Heading */}
        <h1 className="lg:w-[10em] mt-[4em] lg:mt-[13%] text-white text-[2.3rem] w-full text-center lg:text-60xl  font-bricolage font-bold">
        Find Your Perfect Dream Home Today!
        </h1>
    
        {/* Subheading */}
        <h2 className="text-base font-normal lg:text-13xl text-center text-[#FFFFFFB2] w-full lg:w-[1000px]">
        Discover the perfect property to call home. Beautiful locations, modern amenities, and endless possibilities—make your move <br />today!    </h2>
    
     <Barsearch/>
      </div>
   
    </header>
       <section className="mt-10  hidden lg:mt-[4em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
            <div className="flex flex-col items-center justify-center">
          <div className="flex  lg:w-[84em] p-2 flex-col md:flex-row lg:flex-row md:gap-10  lg:gap-10  justify-around items-center  md:items-start ">
          <h1 className="text-black lg:ml-2 text-[26px] lg:text-23xl font-[600]   w-full ">Lagos Houses for Sale</h1>
          <p className="text-gray  lg:p-0 text-base lg:text-5xl font-bricolage w-full lg:w-full">
          Discover a home where every detail enhances your lifestylecrafted to fit your taste and needs.
    </p>
    
          
    
    </div>
    <div className=" flex mt-3  w-full lg:flex-row   gap-x-5 justify-center  mb-5">
      {/* Horizontal Scrollable Container on Mobile */}
        {/* Card 1 */}
        <div className="flex flex-col h-fit   border border-gray border-1 border-solid rounded-[20px]  lg:w-[30%] font-bricolage snap-center shrink-0">
        <Image
            alt="image1"
            width={400}
            height={200}
            src={'/rentimg.png'}
            className="rounded-b-lg  w-full  object-cover h-auto"
          />
         <span className="mt-4 mb-2  ml-5 w-9/10 text-black flex-col">
            <h1 className="text-black text-base lg:text-[25px] font-bold">
              Whispering Pines Estate
            </h1>
            <span className="flex-col flex mt-3">
              <span className="flex gap-1">
                <h4 className="text-gray text-label flex items-center justify-center font-light">
                  From
                </h4>
                <h2 className="font-bold">$2500.00</h2>
                <h4 className="ml-9 text-label text-gray font-light">
                  Area from 190 - 245 m²
                </h4>
              </span>
              <p className="text-gray text-[16px] mt-4">
                A cozy 3-bedroom home with an open living area and a private
                backyard. Perfect for comfort and relaxation.
              </p>
              <div className=" mt-9  flex justify-between items-center ">
                <div className="text-base  flex justify-center font-bricolage items-center  rounded-full font-light h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1] ">
                  Luxury Oasis
                </div>
                <Image
            alt="image1"
            width={50}
            height={50}
            src={'/export.png'}
            className="rounded-full "
          />
              </div>
            </span>
          </span>
        </div>
        {/* CARD 2 */}
        <div className="flex flex-col h-[500px] lg:w-[32%] font-bricolage snap-center shrink-0">
          <Image
            alt="image1"
            width={300}
            height={400}
            src={'/rent2.png'}
            className="rounded-lg w-full"
          />
          <span className="mt-4 text-black">
            <span className="flex gap-3">
              <h4 className="text-gray font-light">From</h4>
              <h2 className="font-bold">$2500.00</h2>
            </span>
            <h4 className="text-gray font-light">Area from 190 - 245 m²</h4>
          </span>
        </div>
   
        <div className="flex flex-col h-[500px] lg:w-[32%] font-bricolage snap-center shrink-0">
          <Image
            alt="image1"
            width={300}
            height={400}
            src={'/rent3.png'}
            className="rounded-lg w-full"
          />
          <span className="mt-4 text-black">
            <span className="flex gap-3">
              <h4 className="text-gray font-light">From</h4>
              <h2 className="font-bold">$2500.00</h2>
            </span>
            <h4 className="text-gray font-light">Area from 190 - 245 m²</h4>
          </span>
        </div>
    
    
       
      </div>
    
    
    </div>
          
          </section>
    </>
    
  )
}

export default Buy;