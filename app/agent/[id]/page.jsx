'use client';

/* eslint-disable */


import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import MapComponent from "@/app/components/layouts/listingmap"
import ContactAgent from '@/app/components/layouts/contactagent';
import { usePathname } from 'next/navigation';
import { truncateDescription } from '@/utils';
import { useGetAgentListingsQuery, useGetAgentsInfoQuery,useToggleFavoriteMutation} from '@/store/slices/api/authapi';
import Spinner from '@/app/components/common/Spinner';
import { log } from '@/utils/log';
import { useRouter } from "next/navigation";
import { handleShareClick } from '@/utils';
import DynamicImageGrid  from '@/app/components/layouts/dynamiclayout';
import PropertyListCard from '@/app/components/common/PropertyListing';
import Link from 'next/link';
import DynamicImageMobile from '@/app/components/layouts/mobiledynamic';
import { flattenListings,formatNumber } from '@/utils';
import { toast } from 'react-toastify';
const Breadcrumb = ({ handleToggleListings,agentDetails,handleFavoriteClick }) => {


    return (
      <div className=" hidden lg:flex  ml-[2rem] items-center justify-between gap-[0.2rem] px-4 py-2  mt-[5rem] w-full  bg-gray-100">
      {/* Left Section: Back Arrow and Breadcrumb */}
      <div className="flex items-start justify-center  gap-2 text-[1.08rem] font-bricolage text-gray-600">
        {/* Back Arrow */}
       
        {/* Breadcrumb Links */}
        <div className="flex  w-[30rem] items-center gap-3 text-base text-gray-500">
        {/* Initial Back Arrow + Static Text */}
        <div className="flex font-light items-center gap-1">
          <img src="/arrow-right.png" alt="Back" className="w-3 h-5" />
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
        <div className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md">
        <img onClick={handleFavoriteClick} src="/favorite.svg" alt="Favorite" className="w-4 h-4" />
        </div>
        <div  style={{ cursor: "pointer" }}
          onClick={handleShareClick}  className="p-2 border border-[#8F8F8F] rounded-md">
        <img src="/upload.svg" alt="Download" className="w-4 h-4" />
        </div>
        <div onClick={handleToggleListings} className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md">
        <img 
          src="/image2.svg"
          alt="Share"
          className="w-4 h-4"
         
        />
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
  const router=useRouter() // Tab state
  const [showListings, setShowListings] = useState(true);

  // Function to toggle the listings section
  const handleToggleListings = () => {
    setShowListings((prev) => !prev);
  };
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
  const [toggleFavorite] = useToggleFavoriteMutation();



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

  log("flattenedListings", listing?.listings[0]?._id);
const listingId = listing?.listings[0]?._id; // Use the first listing's ID or the provided ID
  const handleFavoriteClick = async () => {
   
    try {
      await toggleFavorite({ listingId }).unwrap();
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error(error)
      console.error("Failed to favorite listing:", error);
      router.push("/auth/sign-in")
    }
  };




 log("agentDetails", listing);  
  if (isLoading) {
    return (
        <Spinner />
     
    );
  }
  const tabs = [
    { id: "all", label: "All listings" },
    { id: "active", label: "Active listings" },
    { id: "sold", label:  `Sold with ${truncateDescription(agentInfo?.fullname,1)}` },
    { id: "bought", label: `Bought with ${truncateDescription(agentInfo?.fullname,1)}` },
  ];

  // State to control visibility of the listings section


  return (
    <div className='mt-2 lg:w-[90%] 2xl:w-[1520px] '> <Breadcrumb  handleToggleListings={handleToggleListings} handleFavoriteClick={handleFavoriteClick} listingId={listingId } agentDetails={agentInfo?.region}/>
    {showListings && (  <div className="grid  lg:-mt-1  gap-2 p-3">
    <DynamicImageGrid statuses={statuses} coordinates={coordinates} images={imageUrls} />
<DynamicImageMobile
     statuses={statuses} coordinates={coordinates} images={imageUrls} />
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
    </div>)}
  
  

{/* second div layout  */}
    <div className="bg-gray-100 mt-2 lg:mt-5 lg:p-4 rounded-lg">
      <div className="flex flex-row mx-[1.2rem] lg:p-0 justify-between items-start md:items-center">

               {/* Profile Image */}
               <div className='flex mt-4 lg:-mt-3 gap-3'>
                <div className="w-[4rem] h-[4rem] lg:w-[6rem] lg:h-[6rem] relative">
                  <Image
                    src={agentInfo?.pictureUrl || "/Avatar.svg"}// Replace with actual image path
                    alt="Profile Picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
          
                {/* Text Section */}
              <div className='flex flex-col lg:mt-3'>

             
        
          <h2 className="text-xl lg:text-[1.7rem] font-bricolage font-semibold">{agentInfo?.fullname}</h2>
          <p className="text-[#1E1E1E] font-light">{agentInfo?.region}</p>
          <p className="text-[#1E1E1E] font-light">LA 98245</p>
         
         
          </div>
          </div>
        {/* Right Section */}
        <div className="text-right font-bricolage  text-[#1E1E1E] mt-4 md:-mt-[2.5rem]">
               <div className="flex pr-3 lg:pr-0 items-center justify-end  my-3 gap-2 lg:gap-0 text-gray-700 mt-1">
          <img src="/stargreen.png" alt="Favorite" className="w-4 h-4" />
          <span className="ml-1 font-medium ">{ListedBy}</span>
          </div>
          <p className="text-gray-600 lg:mt-1 my-3 text-sm">Avg lis .${averagelisting} </p>
      
          <div className="flex lg:hidden items-center justify-end gap-2 mt-3 w-full md:w-auto">
        <div  onClick={handleFavoriteClick} className="p-2 border border-[#8F8F8F] rounded-md">
          <img  src="/favorite.svg" alt="Favorite" className="w-4 h-4" />
        </div>
        <div onClick={handleShareClick} className="p-2 border border-[#8F8F8F] rounded-md">
          <img src="/upload.svg" alt="Download" className="w-4 h-4" />
        </div>
        <div onClick={handleToggleListings} className="p-2 border border-[#8F8F8F] rounded-md">
          <img src="/image2.svg" alt="Share" className="w-4 h-4 object-cover" />
        </div>
      </div>  </div>
      </div>
    </div>
  
  {/* new layout
   */}
 <div className="w-full border-t border-b border-[#8F8F8F] mt-3 lg:mt-0  py-3">
      <div className="flex items-center justify-center gap-2  lg:gap-[6.5rem] text-[#8F8F8F] font-bricolage text-sm 2xl:text-xl lg:text-base">
        <div className="flex items-center  font-light  test-sm lg:text-[18px] gap-3  lg:gap-[8rem]">
         <span>
          <span className="font-bold text-black">{agentInfo?.
numberOfListings
}</span>
          <span> Listings</span></span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center text-sm lg:text-[18px] gap-1">
          <span className="font-bold text-black">${formatNumber(prices)} </span>
          <span>Total value</span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center  text-sm lg:text-[18px] gap-1">
          <span className="font-bold text-black">${formatNumber(agentInfo?.priceRange?.min)} - ${formatNumber(agentInfo?.priceRange?.max)}</span>
          <span> Price range</span>
        </div>

     
      </div>
    </div>



    {/* second layout */}
    <div className=' w-full px-[1.5rem] lg:px-4 py-7'>
  <h1 className=" text-xl lg:text-[2rem] font-semibold ">    About {agentInfo?.fullname}
    </h1>
    <p className=' text-[#8F8F8F] font-bricolage text-sm lg:text-[18px] lg:w-[73rem] 2xl:w-full 2xl:text-xl py-2'>

{agentInfo?.profileDescription ||  "no description found"}
    </p>
 
</div>

    {/* description */}
 

   

    {/* map */}
    <div className="bg-gray-100 lg:p-6 rounded-lg mb-3">
    <h1 className="text-xl lg:text-[2rem] lg:py-2 ml-[1.7rem] lg:ml-0 font-semibold "> {agentInfo?.fullname} Listings & Deals</h1>
    <div className="border-b  px-[1.75rem] lg:px-0  my-4 lg:my-0  border-gray ">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
        <button
        key={tab.id}
        onClick={() => {
          setActiveTab(tab.id);
          setCoordinates(allCoordinates[tab.id] || []); // Update map based on tab
        }}
        className={`relative py-2 text-sm lg:text-base transition-colors duration-300 ${
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

<div className='w-full lg:mt-4  px-7 lg:px-0 py-6'>
<h1 className="text-xl lg:text-[2rem] lg:ml-5   mb-7  font-semibold ">   {agentInfo?.fullname} Active Listings</h1>
<div className="grid 2xl:mr-[4rem] px-1 lg:px-0 lg:-ml-5 grid-cols-1 md:grid-cols-3 gap-1 gap-y-[2rem] place-items-center">
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
    <div className='w-full px-6 lg:px-0'>
    <ContactAgent listedBy={agentInfo?._id} location={agentInfo?.region}  profileimage={agentInfo?.pictureUrl}  fullname={agentInfo?.fullname}/>

    </div>



</div>


  )
}

export default page