'use client'
import React from 'react'
import Image from 'next/image'
import Barsearch from '../components/layouts/barsearch'
import PropertyCard from '../components/common/property'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
const Buy= () => {
  return (
    <>
       <header className="relative h-[45em] lg:h-[52em] w-full ">
        {/* Background Image Div */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/rent.png')" }}
        ></div>
      
        {/* Content Section */}
        <div className="flex z-[1] relative gap-6 justify-center items-center flex-col">
          {/* Main Heading */}
          <h1 className="lg:w-[10em] mt-[2em] lg:mt-[1.4em] text-white text-[2em] w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
          Find Your Perfect Dream Home Today!
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
       <section className=" relative mt-10  p-4 lg:mt-[1em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-start pl-[5%]">
            <div className="flex w-[96%] flex-col items-center justify-center">
      

    <div className="flex   p-2 flex-col md:flex-row 2xl:gap-[20%] my-[2em] lg:flex-row md:gap-10     items-start ">
      <h1 className="text-black lg:ml-2 text-[26px] lg:text-23xl font-[600]   w-full ">Lagos Houses for Sale</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-5xl font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestylecrafted to fit your taste and needs.
</p>

      

</div>
    <div className=" flex mt-[3%]  w-[70%] lg:flex-row lg:w-full  flex-col  gap-x-5 justify-center  mb-[3%]">
      {/* Horizontal Scrollable Container on Mobile */}
        {/* Card 1 */}
        <div className="flex flex-col h-fit mb-3   border border-gray border-1 border-solid rounded-[20px]  lg:w-[30%] font-bricolage snap-center shrink-0">
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
              <p className="text-gray text-[14px] mt-4">
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
            quality={100}
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
   
      
        
        <PropertyCard imageSrc={'/rent3.png'} altText={'rent3'} price={'95000'} area={''} />
    
    
       
      </div>
      <div className=' flex   w-[90%] lg:w-full lg:flex-cola  flex-col  gap-x-5 justify-center '>
      <div className=" flex mt-3 pl-5 w-full lg:w-full lg:flex-row   flex-col   gap-x-5 justify-center  ">

        <PropertyCard imageSrc={'/rent4.png'} altText={'rent4'} price={'45,500.00'} area={''} />
        <PropertyCard imageSrc={'/rent5.png'} altText={'rent5'} price={'25,000.00'} area={''} />
        <PropertyCard imageSrc={'/rent6.png'} altText={'rent6'} price={'18,000.00'} area={''} />

   
       
        </div>
        <Link className='font-[500] text-primary  lg:mt-[3.7em] 2xl:mt-[5em]  text-[18px]    text-left ml-4' href={''}>
      See all 2500 Lagos houses for sale</Link>
    
        <div>
          
        </div>
   
    
      </div>
      
      <div></div>
 
      
    </div>
    <div className="w-full h-[1px] bg-[#8F8F8F] mt-[2%]"/>

   
          
          
          </section>
       <section className=" relative mt-10  p-5 lg:mt-[4em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
            <div className="flex flex-col items-center justify-center">
          <div className="flex  lg:w-[84em] p-2 flex-col md:flex-row lg:flex-row md:gap-10  lg:gap-10  justify-around items-center  md:items-start ">
          <h1 className="text-black lg:ml-2 text-[26px] lg:text-23xl font-[600]   w-full ">Lagos Houses for Sale</h1>
          <p className="text-gray  lg:p-0 text-base lg:text-5xl font-bricolage w-full lg:w-full">
          Discover a home where every detail enhances your lifestylecrafted to fit your taste and needs.
    </p>
    
          
    
    </div>
    <div className=" flex mt-[5%]  w-[90%] lg:flex-row lg:w-full  flex-col  gap-x-5 justify-center  mb-5">
      {/* Horizontal Scrollable Container on Mobile */}
        {/* Card 1 */}
        <div className="flex flex-col h-fit mb-3   border border-gray border-1 border-solid rounded-[20px]  lg:w-[30%] font-bricolage snap-center shrink-0">
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
   
      
        
        <PropertyCard imageSrc={'/rent3.png'} altText={'rent3'} price={'95000'} area={''} />
    
    
       
      </div>
      <div className=' flex mt-[5%]  w-[90%] lg:w-full lg:flex-row  flex-col  2xl:mt-[10%] gap-x-5 justify-center  mb-5'>
      <div className=" flex mt-8 pl-5 w-full lg:w-full lg:flex-row   flex-col   gap-x-5 justify-center  mb-8">

        <PropertyCard imageSrc={'/rent4.png'} altText={'rent4'} price={'45,500.00'} area={''} />
        <PropertyCard imageSrc={'/rent5.png'} altText={'rent5'} price={'25,000.00'} area={''} />
        <PropertyCard imageSrc={'/rent6.png'} altText={'rent6'} price={'18,000.00'} area={''} />

   
       
        </div>
   
        <div>
          
        </div>
   
    
      </div>
      <Link className='font-[500]  text-xl w-6/10 lg:mt-[70px] 2xl:mt-[10em] mb-[2em]  pl-3' href={''}>
        See all 2500 Lagos houses for sale</Link>
 
       
    
    </div>
          
          
          </section>
       <section className=" relative mt-10  p-5 lg:mt-[4em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
            <div className="flex flex-col items-center justify-center">
          <div className="flex  lg:w-[84em] p-2 flex-col md:flex-row lg:flex-row md:gap-10  lg:gap-10  justify-around items-center  md:items-start ">
          <h1 className="text-black lg:ml-2 text-[26px] lg:text-23xl font-[600]   w-full ">Lagos Houses for Sale</h1>
          <p className="text-gray  lg:p-0 text-base lg:text-5xl font-bricolage w-full lg:w-full">
          Discover a home where every detail enhances your lifestylecrafted to fit your taste and needs.
    </p>
    
          
    
    </div>
    <div className=" flex mt-[5%] p-5  w-[90%] lg:flex-row lg:w-full  flex-col  gap-x-5 justify-center  mb-5">
      {/* Horizontal Scrollable Container on Mobile */}
        {/* Card 1 */}
        <PropertyCard imageSrc={'/rent3.png'} altText={'rent3'} price={'95000'} area={''} />

        {/* CARD 2 */}
      
   
      
        
        <PropertyCard imageSrc={'/rent3.png'} altText={'rent3'} price={'95000'} area={''} />
        <PropertyCard imageSrc={'/rent3.png'} altText={'rent3'} price={'95000'} area={''} />
    
    
       
      </div>
      <div className=' flex mt-[5%]  w-[90%] lg:w-full lg:flex-row  flex-col  gap-x-5 justify-center  mb-5'>
      <div className=" flex mt-8 pl-5 w-full lg:w-full lg:flex-row   flex-col   gap-x-5 justify-center  mb-8">

        <PropertyCard imageSrc={'/rent4.png'} altText={'rent4'} price={'45,500.00'} area={''} />
        <PropertyCard imageSrc={'/rent5.png'} altText={'rent5'} price={'25,000.00'} area={''} />
        <PropertyCard imageSrc={'/rent6.png'} altText={'rent6'} price={'18,000.00'} area={''} />

   
       
        </div>
   
        <div>
          
        </div>
   
    
      </div>

    
    </div>
          
          
          </section>
       <section className=" relative mt-10  p-5 lg:mt-[4em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
            <div className="flex flex-col items-center justify-center">
          <div className="flex  lg:w-[84em] p-2 flex-col md:flex-row lg:flex-row md:gap-10  lg:gap-10  justify-around items-center  md:items-start ">
          <h1 className="text-black lg:ml-2 text-[26px] lg:text-23xl font-[600]   w-full ">Lagos Houses for Sale</h1>
          <p className="text-gray  lg:p-0 text-base lg:text-5xl font-bricolage w-full lg:w-full">
          Discover a home where every detail enhances your lifestylecrafted to fit your taste and needs.
    </p>
    
          
    
    </div>
    <div className=" flex mt-[5%] p-5  w-[90%] lg:flex-row lg:w-full  flex-col  gap-x-5 justify-center  mb-5">
      {/* Horizontal Scrollable Container on Mobile */}
        {/* Card 1 */}
        <PropertyCard imageSrc={'/rent3.png'} altText={'rent3'} price={'95000'} area={''} />

        {/* CARD 2 */}
      
   
      
        
        <PropertyCard imageSrc={'/rent3.png'} altText={'rent3'} price={'95000'} area={''} />
        <PropertyCard imageSrc={'/rent3.png'} altText={'rent3'} price={'95000'} area={''} />
    
    
       
      </div>
      <div className=' flex mt-[5%]  w-[90%] lg:w-full lg:flex-row  flex-col  gap-x-5 justify-center  mb-5'>
      <div className=" flex mt-8 pl-5 w-full lg:w-full lg:flex-row   flex-col   gap-x-5 justify-center  mb-8">

        <PropertyCard imageSrc={'/rent4.png'} altText={'rent4'} price={'45,500.00'} area={''} />
        <PropertyCard imageSrc={'/rent5.png'} altText={'rent5'} price={'25,000.00'} area={''} />
        <PropertyCard imageSrc={'/rent6.png'} altText={'rent6'} price={'18,000.00'} area={''} />

   
       
        </div>
   
        <div>
          
        </div>
   
    
      </div>

    
    </div>
          
          
          </section>
      
    </>
    
  )
}

export default Buy;