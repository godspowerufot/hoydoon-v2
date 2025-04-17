/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa6";
import ContactAgent from "@/app/components/layouts/contactagent";
import { highlights } from "@/constants";
import {  useGetAllListingsQuery, useGetSpecificListingsQuery } from "@/store/slices/api/authapi";
import { usePathname } from "next/navigation";
import Spinner from "@/app/components/common/Spinner";
import { log } from "@/utils/log";
import { truncateDescription } from "@/utils";
import ListedCard from "@/app/components/common/profilecard";
import MapComponent from "@/app/components/layouts/listingmap";
import PropertyCard from "@/app/components/common/property";
import DynamicImageGrid from "@/app/components/layouts/dynamiclayout"
const Breadcrumb = ({region,address}) => {
  return (
    <div className="flex  items-center justify-between gap-[0.2rem] pl-4 py-2 w-full  mt-[5rem]  bg-gray-100">
      {/* Left Section: Back Arrow and Breadcrumb */}
      <div className="flex items-start justify-start  gap-1 text-[1.08rem] font-bricolage text-gray-600">
        {/* Back Arrow */}
        <Image src="/arrow-right.png" alt="arrow" height={12} width={12} className="mt-[0.9] mr-2" />

        {/* Breadcrumb Links */}
        <span className="text-gray-500">Search |</span>
          {/* Breadcrumb item: Homes for Sale */}
          <div className="flex font-light items-center gap-1">
           <a href="#" className="text-primary">Homes for sale</a>
         </div>
       
         {/* Breadcrumb item: Nigeria */}
         <div className="flex items-center gap-1">
           <Image src="/arrow-right-top.png" alt="arrow" height={12} width={12} />
           <a href="#" className="text-primary">{region}</a>
         </div>
       
     
       
         {/* Breadcrumb item: Magodo Estate */}
         <div className="flex items-center gap-1">
           <Image src="/arrow-right-top.png" alt="arrow" height={12} width={12} />
           <a href="#" className="text-primary">{truncateDescription(address,3)}</a>
         </div>
     
      </div>

      {/* Right Section: Icons */}
      <div className="flex pl-[30rem] 2xl:pl-[50rem]  items-center gap-2">
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

      <div></div>
    </div>
  );
};

const page = () => {
    const pathname = usePathname();
  const listingId = pathname?.split('/').pop();

  const {
    data: listing,
    isloading:isAllLoading,

  } = useGetSpecificListingsQuery({listingId });

  const { data: allListings, refetch } = useGetAllListingsQuery( );

  const [displayListings, setDisplayListings] = useState([]);


  useEffect(() => {
    refetch(); // Refetch data on every mount
  }, [refetch]);

  useEffect(() => {
    if (!isAllLoading && allListings) {
      const firstThreeListings = allListings.listings?.slice(0, 3);
      setDisplayListings(firstThreeListings); // Store in state
    }
  }, [allListings, isAllLoading]);


  log("initial listing",displayListings)
     // These map the highlight text to the corresponding field(s) in the data
const featureMap = {
  "Pet allowed": (item) => item?.petFriendly,
  "Laundry": (item) => item?.laundryType?.length > 0,
  "Balcony": (item) => item?.amenities?.length > 0,
  "Garage parking": (item) => item?.parkingType,
  // Add more mappings as needed
};

// Dynamically filter highlights based on what's in the listing.item
const relevantHighlights = highlights.filter((highlight) =>
  featureMap[highlight.text]?.(listing?.listing?.item)
);


  

    const {
      averageRating,
      createdAt,
      editingCount,
      item, // This contains nested properties
      itemModel,
      listedBy,
      listingType,
      region,
      reviewCount,
      status,
      title,
      tour3d,
      updatedAt,
      _id,
    } = listing?.listing || {}; // Provide a fallback to avoid errors when data is not available
    const { imageUrls } = listing?.listing || {};
  
    const images = imageUrls || [];
    const totalImages = 12; // 4 columns * 3 rows
    
    // Repeat images using mapping (no while loop)
    const extendedImages = Array.from({ length: totalImages }, (_, index) => {
      return images[index % images.length]; // loop over images if not enough
    });
    
  // Further destructuring `item` if needed
  const { _id: itemId, title: itemTitle, bathrooms:bathrooms,
    address:address,
    bedrooms:bedrooms ,type,  
    coordinate:coordinate, description:description, private: isPrivate, price } = item || {};
  
  // Destructuring `listedBy` if needed
  const { _id: listedById, fullname, pictureUrl } = listedBy || {};
  
  // Now you can use the variables directly

  ; // Re-run only when data changes
  
  if (isAllLoading) {
    return (
       <Spinner />
    );
  } 
  return (
    <div className="lg:mt-8  2xl:w-[98rem] lg:w-[90%]  lg:ml-[2%] ">
      <Breadcrumb  address={address} region={region}/>
  
<DynamicImageGrid images={ images} coordinates={coordinate} />
      {/* second div layout  */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Section */}
          <div>
            <h2 className="text-[2rem] font-bricolage font-semibold">
              {title}
            </h2>
            <p className="text-gray text-base">{address}</p>
            <p className="text-gray text-base">{region}</p>

            <div className="flex items-center  gap-2 text-gray-700 mt-2">
              <FaRegEye className="text-gray" />
              <span className="font-meduim">Total views {editingCount}</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-right font-bricolage  text-[#1E1E1E] mt-4 md:mt-0">
            <p className="text-[1.7rem] text-black font-bold">${price}</p>
            <div className="flex items-center justify-end text-gray-700 mt-1">
              <img src="/stargreen.png" alt="Favorite" className="w-4 h-4" />
              <span className="ml-1 font-medium ">{averageRating}</span>
            </div>
            <p className="text-gray text-base">Est. ${price}/month</p>
          </div>
        </div>
      </div>

      {/* new layout
       */}
      <div className="w-full border-t border-b border-[#8F8F8F] py-3">
        <div className="flex items-center justify-center gap-[6.5rem] text-[#8F8F8F] font-bricolage text-sm 2xl:text-xl lg:text-base">
          <div className="flex items-center gap-[8rem]">
            <span className="flex items-center gap-1">
              <span className="font-bold text-black">{bedrooms}</span>
              <span>Beds</span>
            </span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex items-center gap-1">
            <span className="font-bold text-black">{bathrooms}</span>
            <span>Baths</span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex items-center gap-1">
            <span className="font-bold text-black">_</span>
            <span>sq ft</span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex items-center gap-1">
            <span className="font-bold text-black">_</span>
            <span>Price per sq ft</span>
          </div>
        </div>
      </div>

      {/* second layout */}
      <div className="w-full px-4 py-6">
        <h2 className="text-2xl font-bold text-black font-bricolage">
          Home Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-4 text-[#8F8F8F] font-bricolage text-sm">
  {relevantHighlights.map((item, index) => (
    <div key={index} className="flex items-center gap-2">
      <Image
        src={item.icon}
        alt={item.text}
        width={20}
        height={20}
        className="object-contain"
        quality={100}
      />
      <span className="2xl:text-xl">{item.text}</span>
    </div>
  ))}
</div>

      </div>

      {/* description */}
      <div className=" w-full px-4 py-6">
        <h2 className="text-2xl font-bold text-black font-bricolage">
          Description
        </h2>
        <div>
          <p className=" text-[#8F8F8F] font-bricolage text-[18px] font-[300]  w-[73rem] 2xl:w-full 2xl:text-xl pt-4">
            {description}
          </p>
        </div>
      </div>

      {/* listed by agent */}
      <div className=" w-full px-4 py-6">
        <h2 className="text-2xl font-bold text-black font-bricolage">
          Listed by Agent
        </h2>
        <div className="mt-5">
          <ListedCard  name={fullname} picture={pictureUrl} />
        </div>
      </div>

      {/* map */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Map</h2>

        {/* Map Container */}
        <div className=" relative rounded-lg  flex items-center overflow-hidden">
              <MapComponent coordinates={coordinate} />
          <div className="py-4 px-2 absolute bg-[#ffffff] w-[24rem] rounded-lg bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-700 text-sm">
            <span className="font-medium">{displayListings?.length} Homes available in {truncateDescription(address,1)}</span>
            <span className="text-primary cursor-pointer ml-2">
              Remove map boundary
            </span>
          </div>
        </div>

        {/* Distance Information */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6  2xl:text-base text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <Image src="/bus.png" alt="Bus" width={20} height={20} />
            <span className="text-primary  font-medium">.... 5 mins</span> to
            Public Transit
          </div>
          <div className="flex items-center gap-2">
            <Image src="/bank.png" alt="Bank" width={20} height={20} />
            <span className="text-primary font-medium">.... 15 mins</span> to
            Bank
          </div>
          <div className="flex items-center gap-2">
            <Image src="/shopping.png" alt="Shopping" width={20} height={20} />
            <span className="text-primary font-medium">.... 20 mins</span> to
            Shopping mall
          </div>
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="School" width={20} height={20} />
            <span className="text-primary font-medium">.... 10 mins</span> to
            School
          </div>
          <div className="flex items-center gap-2">
            <Image src="/pharmacy.png" alt="Pharmacy" width={20} height={20} />
            <span className="text-primary font-medium ">.... 15 mins</span> to
            Pharmacy
          </div>
        </div>
      </div>

      {/*contat agency  */}
      <ContactAgent location={region}  profileimage={pictureUrl}  fullname={fullname}/>

      <section className="mt-10  hidden  2xl:mt-[4em] lg:mt-[3em] w-[75rem]  2xl:w-[88rem]  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]  2xl:-mb-[5rem]    flex-col items-center justify-center">
          <div className="flex   p-2 flex-col w-[75rem]  2xl:w-[85rem]  md:flex-row 2xl:gap-[25%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
            <h1 className="text-black  text-[26px] lg:text-[1.8rem] font-[600]   w-full ">
              {" "}
              Single Family House Rents
            </h1>
            <p className="text-gray  lg:p-0 text-base  lg:text-xl font-bricolage w-full lg:w-full">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col  2xl:ml-[6rem]  ">
              <div className="flex mt-[1em] h-fit min-w-[70%] items-center lg:flex-row justify-center mb-2">
              {displayListings?.map((listing, index) => (
  <PropertyCard
    key={index}
    {...listing}
    _id={listing._id}
    imageSrc={listing?.imageUrls?.[0]?.url || "/house1.png"}
    altText={listing?.imageUrls?.[0]?.altText || "Property image showcasing a beautiful home"}
    price={listing?.item?.price || "Price not available"}
    area={listing?.item?.squareFeet || "190 - 245 m² (Approximate area)"}
    description={listing?.item?.description || "No description available for this property."}
    title={listing?.item?.title || "Untitled Property"}
    rent={listing?.item?.rent || "Rent details not provided"}
  />
))}

                     </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default page;
