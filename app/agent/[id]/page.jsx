'use client';

/* eslint-disable */


import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import MapComponent from "@/app/components/layouts/listingmap"
import ContactAgent from '@/app/components/layouts/contactagent';
import { usePathname } from 'next/navigation';
import { useGetAgentListingsQuery, useGetAgentsInfoQuery } from '@/store/slices/api/authapi';
import Spinner from '@/app/components/common/Spinner';
import { log } from '@/utils/log';
import DynamicImageGrid  from '@/app/components/layouts/dynamiclayout';
import PropertyListCard from '@/app/components/common/PropertyListing';
import Link from 'next/link';
import { flattenListings } from '@/utils';
const Breadcrumb = ({ agentDetails}) => {
    return (
      <div className="flex  items-center justify-between gap-[0.2rem] px-4 py-2  mt-[5rem] w-full  bg-gray-100">
        {/* Left Section: Back Arrow and Breadcrumb */}
        <div className="flex items-start justify-center  gap-2 text-[1.08rem] font-bricolage text-gray-600">
          {/* Back Arrow */}
         
          {/* Breadcrumb Links */}
          <div className="flex  w-[30rem] items-center gap-3 text-base text-gray-500">
  {/* Initial Back Arrow + Static Text */}
  <div className="flex font-light items-center gap-1">
    <img src="/arrow-right.png" alt="Back" className="w-3 h-4" />
   <Link href={"/search"}><span>Search |</span></Link> 
  </div>

  {/* Breadcrumb item: Homes for Sale */}
  <div className="flex font-light items-center gap-1">
    <Image src="/arrow-right-top.png" alt="arrow" height={12} width={12} />
    <a href="#" className="text-primary">Homes for sale</a>
  </div>

  {/* Breadcrumb item: Nigeria */}
  <div className="flex items-center gap-1">
    <Image src="/arrow-right-top.png" alt="arrow" height={12} width={12} />
    <a href="#" className="text-primary">{agentDetails}</a>
  </div>


</div>


        </div>
  
        {/* Right Section: Icons */}
        <div className="flex ml-[33rem] 2xl:ml-[50rem] items-center gap-2">
  <div className="p-2 border border-[#8F8F8F] rounded-md">
  <Link href={"/auth/login"}>  <img src="/favorite.png" alt="Favorite" className="w-4 h-4" /></Link>
  </div>
  <div className="p-2 border border-[#8F8F8F] rounded-md">
  <Link href={"/auth/login"}> <img src="/upload.png" alt="Download" className="w-4 h-4" /></Link>
  </div>
  <div className="p-2 border border-[#8F8F8F] rounded-md">
  <Link href={"/auth/login"}>  <img src="/image2.png" alt="Share" className="w-4 h-4" /></Link>
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
  const [showAll, setShowAll] = useState(false);

  // Handle the "See All" button click
  const handleSeeAllClick = () => {
    setShowAll(true);
  };
  const [coordinates, setCoordinates] = useState([]);
  const [allCoordinates, setAllCoordinates] = useState({
    all:[],
    active: [],
    sold: [],
    bought: [],
  });
  
  const { data: listing, isLoading, isError } = useGetAgentListingsQuery({ userId });
  const { data: agentInfo } = useGetAgentsInfoQuery({ userId });
  const averagelisting=(agentInfo?.priceRange?.min +agentInfo?.priceRange?.max)/2;
  // Recursive function to fully flatten nested listings



  useEffect(() => {
    if (listing?.listings) {
      const flatListings = flattenListings(listing.listings);
      const images = flatListings.flatMap((item) => item.imageUrls || []);
      const statusList = flatListings.map((item) => item.status || "Unknown");
      const totalReviewCount = flatListings.map((item) =>  (item.reviewCount ));
      const Price = flatListings.reduce((sum, items) => sum + (items?.item?.price || 0), 0);
      
      // Extract coordinates
    // Extract coordinates for active listings
    const groupedCoords = {
      all: [],
      active: [],
      sold: [],
      bought: [],
    };

    flatListings.forEach((item) => {
      const coord = item?.item?.coordinate;
      if (coord?.latitude && coord?.longitude) {
        groupedCoords.all.push(coord); // Add to "all"
        const status = item.status?.toLowerCase();
        if (groupedCoords[status]) {
          groupedCoords[status].push(coord);
        }
      }
    }); // ✅ update all state
    setAllCoordinates(groupedCoords);
    setCoordinates(groupedCoords["all"]); // ✅ show all listings on first load
    setActiveTab("all"); // ✅ default active tab

  
      
      setFlattenedListings(flatListings);
      setImageUrls(images);
      setStatuses(statusList);
      setListedBy(totalReviewCount)
      setActiveListings(flatListings.filter((item) => item.status === "active"));      setPrices(Price)
    }
  }, [listing]);
  





 log("agentDetails", agentInfo);  
  if (isLoading) {
    return (
        <Spinner />
     
    );
  }
  const tabs = [
    { id: "all", label: "All listings" },
    { id: "active", label: "Active listings" },
    { id: "sold", label:  `Sold with ${agentInfo?.fullname}` },
    { id: "bought", label: `Bought with ${agentInfo?.fullname}` },
  ];


  return (
    <div className='mt-2 w-[90%] 2xl:w-[1520px] '> <Breadcrumb agentDetails={agentInfo?.region}/>
    <div className="grid  lg:mt-2  gap-2 p-4">
    <DynamicImageGrid statuses={statuses} coordinates={coordinates} images={imageUrls} />
{/* <div className="flex gap-2 font-[500] items-center justify-center absolute bottom-2 right-2 bg-white px-2 py-1 text-base 2xl:text-xl rounded shadow">
          <Image
            alt="logo"
            width={30}
            priority
            quality={100}
            height={30}
            className="h-6 w-7 2xl:w-7 2xl:h-7"
            src="/sold.png"
          />
          <p>{statuses[0] || "Unknown"}</p>
        </div> */}
    </div>

{/* second div layout  */}
    <div className="bg-gray-100 mt-5 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

               {/* Profile Image */}
               <div className='flex gap-3'>
                <div className="w-[6rem] h-[6rem] relative">
                  <Image
                    src={agentInfo?.pictureUrl || ""}// Replace with actual image path
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
          <p className="text-gray-600 lg:mt-1 text-sm">Avg lis.<b> ${averagelisting}</b></p>
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
    <h1 className="text-[2rem] font-semibold "> {agentInfo?.fullname} Listings & Deals</h1>
    <div className="border-b border-gray ">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
        <button
        key={tab.id}
        onClick={() => {
          setActiveTab(tab.id);
          setCoordinates(allCoordinates[tab.id] || []); // Update map based on tab
        }}
        className={`relative py-2 text-base transition-colors duration-300 ${
          activeTab === tab.id ? "text-black font-semibold" : "text-[#8F8F8F]"
        }`}
      >
        {tab.label}
        {activeTab === tab.id && (
          <span className="absolute left-0 bottom-[-1px] w-full h-[2px] bg-primary"></span>
        )}
      </button>
      
        ))}
      </div>
    </div>
      {/* Map Container */}
      <div className=" mt-3 relative rounded-lg  flex items-center overflow-hidden">
      <div className="relative h-[500px] w-full">
  {coordinates.length === 0 && (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
      <div className="text-center text-gray-400 py-4 text-lg">
        No listings found for this category.
      </div>
    </div>
  )}

  <MapComponent coordinates={coordinates} />
</div>

     <div className="py-4 px-2 absolute bg-[#ffffff] w-[24rem] rounded-lg bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-700 text-sm">
    <span className="font-medium">{ActiveListings.length} Homes available in {agentInfo?.region}</span> 
    <span className="text-primary cursor-pointer ml-2">Remove map boundary</span>
  </div>
      </div>

      {/* Distance Information */}
  
    </div>

<div className='w-full lg:mt-4  px-0 py-6'>
<h1 className="text-[2rem] lg:ml-5   mb-7  font-semibold ">   {agentInfo?.fullname} Active Listings</h1>
<div className="grid 2xl:mr-[4rem] lg:-ml-5 grid-cols-1 md:grid-cols-3 gap-1 gap-y-[3rem] place-items-center">
      {/* Display only 3 listings initially, or all listings if showAll is true */}
      {(showAll ? ActiveListings : ActiveListings.slice(0, 3)).map((items, index) => (
        <PropertyListCard
          key={index}
          imageSrc={items?.imageUrls?.[0]?.url}
          altText={items?.imageUrls?.[0]?.altText }
          price={items?.item?.price }
          area={items?.item?.squareFeet }
          description={items?.item?.description }
          title={items?.item?.title}
          rent={items?.item?.rent }
          {...items}
        />
      ))}

      {/* Show "See All" link if we haven't displayed all listings yet */}
      {!showAll && ActiveListings.length > 3 && (
        <div className="w-full md:col-span-2 flex ml-[5rem] -mt-[2rem] justify-start">
          <button onClick={handleSeeAllClick} className="text-[#09858D] mt-5 text-2xl font-medium">
            See all listings
          </button>
        </div>
      )}

    

   
    </div>
      {/* If we show all listings, display the "See less" button */}
      {showAll && ActiveListings.length > 0 && (
        <div className="w-full md:col-span-2 flex justify-start">
          <button onClick={() => setShowAll(false)} className="text-[#09858D] mt-5 text-2xl font-medium">
            See less
          </button>
        </div>
      )}
</div>
    {/*contat agency  */}
    <ContactAgent listedBy={agentInfo?._id} location={agentInfo?.region}  profileimage={agentInfo?.pictureUrl}  fullname={agentInfo?.fullname}/>







</div>
  )
}

export default page