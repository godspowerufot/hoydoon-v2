'use client';

/* eslint-disable */


import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import ContactAgent from '@/app/components/layouts/contactagent';
import {  images } from '@/constants';
import PropertyCard from '@/app/components/common/property';
import { usePathname } from 'next/navigation';
import { useGetAgentListingsQuery } from '@/store/slices/api/authapi';
import Spinner from '@/app/components/common/Spinner';


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
        <div className="flex ml-[33rem] 2xl:ml-[50rem] items-center gap-2">
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
  

  
  
const page = ({params}) => {
  const [activeTab, setActiveTab] = useState("all");
  const pathname = usePathname();
  const [listingData, setListingData] = useState(null);

  const userId = pathname?.split('/').pop();

  const { data: listing, isLoading, isError } = useGetAgentListingsQuery({userId});

console.log(listing,params.id)

  // console.log(listingData,userId)


  // useEffect(() => {
  //   if (listing) {
  //     setListingData(listing);
  //   }
  // }, [listing]);

  
  // if (isLoading) {
  //   return (
  //       <Spinner />
     
  //   );
  // }
  const tabs = [
    { id: "all", label: "All listings" },
    { id: "active", label: "Active listings" },
    { id: "sold", label: "Sold with Ruka" },
    { id: "bought", label: "Bought with Ruka" },
  ];


  return (
    <div className='mt-2  2xl:w-[1520px] '> <Breadcrumb/>
    <div className="grid grid-cols-5 gap-2 p-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`${
            index === 0 ? 'col-span-2 row-span-2' : ''
          } relative`}
        >
          <Image
            src={image}
            alt={`Gallery Image ${index + 1}`}
            width={index === 0 ? 500 : 250}
            height={index === 0 ? 400 : 200}
            className={`w-full ${index === 0 ? ' h-[380px] 2xl:h-[450px]' : ' h-[185px] 2xl:h-[217px]'} object-cover rounded-lg`}
          />
          {index >=0 && (
            <div className="flex gap-2 font-[500]  item-center justify-center absolute bottom-2 right-2 bg-white px-2 py-1  text-base 2xl:text-xl rounded shadow">
            <Image
                         alt="logo"
                         width={30}  
                         priority
                         quality={100}
                         objectFit='cover'
                         height={30}
                         className=' h-6 w-7 2xl:w-7 2xl:h-7 ' // Reduced size of logo
                         src={'/sold.png'}
                       /> 
                       <p> sold
                        </p>
            </div>
          )}
        </div>
      ))}
    </div>

{/* second div layout  */}
    <div className="bg-gray-100 mt-5 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

               {/* Profile Image */}
               <div className='flex gap-3'>
                <div className="w-[6rem] h-[6rem] relative">
                  <Image
                    src="/ruka.jpg" // Replace with actual image path
                    alt="Profile Picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
          
                {/* Text Section */}
              <div className='flex flex-col'>

             
        
          <h2 className="text-[1.7rem] font-bricolage font-semibold">Ruka Oyefeso</h2>
          <p className="text-[#1E1E1E] font-light">Lagos, Nigeria</p>
          <p className="text-[#1E1E1E] font-light">LA 98245</p>
         
         
          </div>
          </div>
        {/* Right Section */}
        <div className="text-right font-bricolage  text-[#1E1E1E] mt-4 md:mt-0">
        <Image
                    src="/mapple.png" // Replace with actual image path
                    alt="Profile Picture"
                    width={200}
                    height={200}
                    className="object-cover"
                  />          <div className="flex items-center justify-end text-gray-700 mt-1">
          <img src="/stargreen.png" alt="Favorite" className="w-4 h-4" />
          <span className="ml-1 font-medium ">4.85</span>
          </div>
          <p className="text-gray-600 text-sm">Avg lis.<b> $450,000.00</b></p>
        </div>
      </div>
    </div>
  

  {/* new layout
   */}
 <div className="w-full border-t border-b border-[#8F8F8F] py-3">
      <div className="flex items-center justify-center gap-[6.5rem] text-[#8F8F8F] font-bricolage text-sm 2xl:text-xl lg:text-base">
        <div className="flex items-center  text-[18px] gap-[8rem]">
         <span>
          <span className="font-bold text-black">20</span>
          <span> Listings</span></span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center text-[18px] gap-1">
          <span className="font-bold text-black">$25M </span>
          <span>Total value</span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center  text-[18px] gap-1">
          <span className="font-bold text-black">$450k - $2.8M </span>
          <span> Price range</span>
        </div>

     
      </div>
    </div>


    {/* second layout */}
    <div className=' w-full px-4 py-7'>
  <h1 className="text-[2rem] font-semibold ">    About Ruka Oyefeso
    </h1>
    <p className=' text-[#8F8F8F] font-bricolage text-[18px] w-[73rem] 2xl:w-full 2xl:text-xl py-2'>
    Welcome! I’m Ruka Oyefeso, a passionate and experienced Realtor with over four years of expertise in guiding clients through the dynamic and ever-evolving real estate market. My dedication to delivering exceptional service has established me as a trusted advisor in the Dallas-Fort Worth area.
    </p>
    <p className=' text-[#8F8F8F] font-bricolage text-[18px] w-[73rem] 2xl:w-full 2xl:text-xl py-2'>

    I specialize in a wide range of residential properties, including new construction, luxury homes, investment opportunities, and single-family rentals. Whether helping clients find their dream home or achieve their real estate investment goals, I pride myself on ensuring every transaction is seamless and successful through personalized attention and expert guidance.    </p>
    
    <p className=' text-[#8F8F8F] font-bricolage text-[18px] w-[73rem] 2xl:w-full 2xl:text-xl py-2'>
    Beyond my real estate expertise, I bring a well-rounded background to the table, including a degree in marketing, a certification in negotiations, and hands-on experience in homebuilding. My passion for interior design further enhances my ability to help clients see the full potential of every property. My mission is to exceed expectations, provide a competitive edge, and build lasting relationships grounded in trust and respect.
    </p>    
    <p className=' text-[#8F8F8F] font-bricolage text-[18px] w-[73rem] 2xl:w-full 2xl:text-xl py-2'>
    Outside of real estate, I enjoy traveling, exploring new cultures, and indulging in self-care activities. I’m a fitness enthusiast, a lover of all things fashion, and an avid listener of diverse music genres, motivational podcasts, and captivating audiobooks. My family means the world to me, including my fiancé, Justin, and our beloved goldendoodle, Teddy.    </p>    
  
    <p className=' text-[#8F8F8F] font-bricolage text-[18px] w-[73rem] 2xl:w-full 2xl:text-xl py-2'>
    Whether you’re a first-time buyer, a seasoned seller, or an investor looking for your next opportunity, I’m here to help. Contact me today, and let’s make your real estate dreams a reality!</p>  
</div>

    {/* description */}
 

   

    {/* map */}
    <div className="bg-gray-100 p-6 rounded-lg mb-3">
    <h1 className="text-[2rem] font-semibold "> Ruka’s Listings & Deals</h1>
    <div className="border-b border-gray ">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-2 text-base  transition-colors duration-300 ${
              activeTab === tab.id
                ? "text-black  font-semibold"
                : "text-[#8F8F8F]"
            }`}
          >
            {tab.label}

            {/* Underline for active tab */}
            {activeTab === tab.id && (
              <span className="absolute left-0 bottom-[-1px] w-full h-[2px] bg-primary"></span>
            )}
          </button>
        ))}
      </div>
    </div>
      {/* Map Container */}
      <div className=" mt-3 relative rounded-lg  flex items-center overflow-hidden">
        <Image
          src="/basemap-2.png" // Replace with actual map image
          alt="Map"
          width={700}
          height={400}
          className="w-[74rem] 2xl:w-full rounded-[20px] h-auto"
        />
     <div className="py-4 px-2 absolute bg-[#ffffff] w-[24rem] rounded-lg bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-700 text-sm">
    <span className="font-medium">1500 Homes available in Lagos</span> 
    <span className="text-primary cursor-pointer ml-2">Remove map boundary</span>
  </div>
      </div>

      {/* Distance Information */}
  
    </div>

<div className='w-full  px-4 py-6'>
<h1 className="text-[2rem] font-semibold ">   Ruka’s Active Listings</h1>
<div className=" flex mt-[1em] h-fit  -mb-[4rem] -ml-[3rem]  min-w-fit items-center lg:flex-row    justify-center  ">
  {/* Horizontal Scrollable Container on Mobile */}
    {/* Card 1 */}
    <PropertyCard imageSrc={'/house1.png'} altText={'rent6'} price={'18,000.00'} area={''} description={undefined} title={undefined} />
    <PropertyCard imageSrc={'/house1.png'} altText={'rent6'} price={'18,000.00'} area={''} description={undefined} title={undefined} />

  
    <PropertyCard imageSrc={'/house1.png'} altText={'rent6'} price={'18,000.00'} area={''} description={undefined} title={undefined} />



   
  </div>
</div>
    {/*contat agency  */}
    <ContactAgent/>







</div>
  )
}

export default page