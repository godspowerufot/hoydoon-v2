'use client';

/* eslint-disable */


import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import MapComponent from "@/app/components/layouts/listingmap"
import ContactAgent from '@/app/components/layouts/contactagent';
import PropertyCard from '@/app/components/common/property';
import { usePathname } from 'next/navigation';
import { useGetAgentListingsQuery, useGetAgentsInfoQuery } from '@/store/slices/api/authapi';
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
  const [flattenedListings, setFlattenedListings] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [ListedBy, setListedBy] = useState([]);
  const [prices, setPrices] = useState([]);
  const [ActiveListings, setActiveListings] = useState([])
  const userId = pathname?.split('/').pop();
  const [coordinates, setCoordinates] = useState([]);
  const { data: listing, isLoading, isError } = useGetAgentListingsQuery({ userId });
  const { data: agentInfo } = useGetAgentsInfoQuery({ userId });
  const averagelisting=(agentInfo?.priceRange?.min +agentInfo?.priceRange?.max)/2;
  // Recursive function to fully flatten nested listings
  const flattenListings = (listings) => {
    return listings.flatMap((item) => 
      Array.isArray(item.listings) ? flattenListings(item.listings) : item
    );

  };
  console.log("total:",ActiveListings.length);

  useEffect(() => {
    if (listing?.listings) {
      const flatListings = flattenListings(listing.listings);
      const images = flatListings.flatMap((item) => item.imageUrls || []);
      const statusList = flatListings.map((item) => item.status || "Unknown");
      const totalReviewCount = flatListings.map((item) =>  (item.reviewCount ));
      const Price = flatListings.reduce((sum, items) => sum + (items?.item?.price || 0), 0);
      const activeListings = flatListings.filter(item => item.status === "active");  
      
      // Extract coordinates
    // Extract coordinates for active listings
    const coords = flatListings?.map((item) => item.item?.coordinate) // Get coordinate object from item
      .filter((coord) => coord?.latitude && coord?.longitude); // Ensure valid coordinates

    setCoordinates(coords); // Store coordinates for Google Maps
  
    setCoordinates(coords);
      
      setFlattenedListings(flatListings);
      setImageUrls(images);
      setStatuses(statusList);
      setListedBy(totalReviewCount)
      setActiveListings(activeListings); 
      setPrices(Price)
    }
  }, [listing]);
  
  // console.log(listingData,userId)




  
  if (isLoading) {
    return (
        <Spinner />
     
    );
  }
  const tabs = [
    { id: "all", label: "All listings" },
    { id: "active", label: "Active listings" },
    { id: "sold", label: "Sold with Ruka" },
    { id: "bought", label: "Bought with Ruka" },
  ];


  return (
    <div className='mt-2 w-[90%] 2xl:w-[1520px] '> <Breadcrumb/>
    <div className="grid grid-col-3 lg:grid-cols-5 gap-2 p-4">
    {flattenedListings?.slice(0, 7).map((listing, index) => (
  <div
    key={index}
    className={`${
      index === 0 ? 'col-span-2 row-span-2' : ''
    } relative`}
  >
    <Image
      src={listing?.imageUrls?.[0]?.url || "/house1.png"}
      alt={listing?.imageUrls?.[0]?.altText || "Property image showcasing a beautiful home"}
      width={index === 0 ? 500 : 250}
      height={index === 0 ? 400 : 200}
      className={`w-full ${index === 0 ? ' h-[380px] 2xl:h-[450px]' : ' h-[185px] 2xl:h-[217px]'} object-cover rounded-lg`}
    />
    <div className="flex gap-2 font-[500] item-center justify-center absolute bottom-2 right-2 bg-white px-2 py-1 text-base 2xl:text-xl rounded shadow">
      <Image
        alt="logo"
        width={30}
        priority
        quality={100}
        height={30}
        className='h-6 w-7 2xl:w-7 2xl:h-7'
        src={'/sold.png'}
      />
      <p>{listing?.status || "Unknown"}</p>  
    </div>
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
                    src={agentInfo?.pictureUrl}// Replace with actual image path
                    alt="Profile Picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
          
                {/* Text Section */}
              <div className='flex flex-col'>

             
        
          <h2 className="text-[1.7rem] font-bricolage font-semibold">{agentInfo?.fullname}</h2>
          <p className="text-[#1E1E1E] font-light">{agentInfo?.region}</p>
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
          <span className="ml-1 font-medium ">{ListedBy}</span>
          </div>
          <p className="text-gray-600 text-sm">Avg lis.<b> ${averagelisting}</b></p>
        </div>
      </div>
    </div>
  

  {/* new layout
   */}
 <div className="w-full border-t border-b border-[#8F8F8F] py-3">
      <div className="flex items-center justify-center gap-[6.5rem] text-[#8F8F8F] font-bricolage text-sm 2xl:text-xl lg:text-base">
        <div className="flex items-center  text-[18px] gap-[8rem]">
         <span>
          <span className="font-bold text-black">{agentInfo?.
numberOfListings
}</span>
          <span> Listings</span></span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center text-[18px] gap-1">
          <span className="font-bold text-black">${prices} </span>
          <span>Total value</span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center  text-[18px] gap-1">
          <span className="font-bold text-black">${agentInfo?.priceRange?.min} - ${agentInfo?.priceRange?.max}</span>
          <span> Price range</span>
        </div>

     
      </div>
    </div>


    {/* second layout */}
    <div className=' w-full px-4 py-7'>
  <h1 className="text-[2rem] font-semibold ">    About {agentInfo?.fullname}
    </h1>
    <p className=' text-[#8F8F8F] font-bricolage text-[18px] w-[73rem] 2xl:w-full 2xl:text-xl py-2'>

{agentInfo?.profileDescription ||  "no description found"}
    </p>
 
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
      <MapComponent coordinates={coordinates} />
     <div className="py-4 px-2 absolute bg-[#ffffff] w-[24rem] rounded-lg bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-700 text-sm">
    <span className="font-medium">{ActiveListings.length} Homes available in {agentInfo?.region}</span> 
    <span className="text-primary cursor-pointer ml-2">Remove map boundary</span>
  </div>
      </div>

      {/* Distance Information */}
  
    </div>

<div className='w-full  px-4 py-6'>
<h1 className="text-[2rem] ml-[2rem] mb-5  font-semibold ">   Ruka’s Active Listings</h1>
<div className=" grid 2xl:mr-[4rem]   -ml-2  grid-cols-1 md:grid-cols-3 gap-1 gap-y-[3rem] place-items-center">  {/* Horizontal Scrollable Container on Mobile */}
  {ActiveListings?.map((items, index) => (
  <PropertyCard
    key={index}   
    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
    altText={items?.imageUrls?.[0]?.altText || "Property image showcasing a beautiful home"}
    price={items?.item?.price || "Price not available"}
    area={items?.item?.squareFeet || "190 - 245 m² (Approximate area)"}
    description={items?.item?.description || "No description available for this property."}
    title={items?.item?.title || "Untitled Property"}
    rent={items?.item?.rent || "Rent details not provided"}
  />
))}

   
  </div>
</div>
    {/*contat agency  */}
    <ContactAgent location={agentInfo?.region}  profileimage={agentInfo?.pictureUrl}  fullname={agentInfo?.fullname}/>







</div>
  )
}

export default page