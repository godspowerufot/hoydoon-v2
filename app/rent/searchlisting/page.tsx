/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import PropertyCard from '@/app/components/common/property';
import Pagination from '@/app/components/common/pagination';
import { useGetAllListingsQuery } from '@/store/slices/api/authapi';
import { useRouter, useSearchParams } from 'next/navigation';



const Breadcrumb: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState('Buy');
  const [selectedOptions, setSelectedOptions] = useState('List');

  // Handle filter change based on selected option
  const handleFilterChange = (filterName: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    // Map the filter names to the correct query parameters for the API
   const filterMapping: Record<string, string> = {
  price: 'minPrice',
  "bed/baths": 'bedrooms',
  "home type": 'listingType',
    location: 'location',
};

// Set the new filter value using the appropriate API parameter
newParams.set(filterMapping[filterName] || filterName, value);

// Update the URL with the new query parameters
router.push(`/rent/searchlisting?${newParams.toString()}`);

  }
  return (
<div className="pt-[2.3rem] px-4 lg:pl-[2rem] lg:pr-[4.5rem] flex justify-between w-full">
<div className="flex items-center ml-[2rem] gap-2">
        <button className="px-4   text-sm py-[6px] border rounded-[3px] text-[#8F8F8F] border-[#8F8F8F]  flex items-center gap-2">
          <Image src="/allfilter.png" alt="Filter" width={16} height={15} /> All Filters
        </button>

        {['Price', 'Bed/Baths', 'Home type'].map((option: any) => {
  const paramKey = option.toLowerCase().replace(/\s+/g, '-');
  const selectedValue = searchParams.get(paramKey) || '';

  return (
    <div className="relative flex items-center " key={option}>
      <select
        className="border border-[#8F8F8F] bg-transparent text-[12.5px] font-light rounded-md text-[#8F8F8F] p-2 pr-6 appearance-none"
        value={selectedValue}
        onChange={(e) => handleFilterChange(paramKey, e.target.value)}
      >
        <option value="">{option}</option>

        {option === 'Price' && (
          <>
            <option value="0-200">$0–200</option>
            <option value="200-500">$200–500</option>
            <option value="500-800">$500–800</option>
            <option value="800-1000">$800–1,000</option>
          </>
        )}

        {option === 'Bed/Baths' && (
          <>
            <option value="2-4">2–4 Beds</option>
            <option value="5+">5+ Beds</option>
          </>
        )}

        {option === 'Home type' && (
          <>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="land">Land</option>
          </>
        )}
      </select>

      {/* Custom dropdown arrow */}
      <img
        src="/arrow-down.png"
        alt="Dropdown"
        className="w-3 h-2 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
})}


        <button className="px-4  py-[6px] bg-teal-600 text-base text-white font-light rounded-md">Save Search</button>
      </div>

      {/* List and Map Toggle */}
      <div className="flex bg-[#F9FAFB] border-[#8F8F8F] w-auto 2xl:-mr-[2rem] justify-between border-solid border-[1px] items-center font-base rounded-[10px] 2xl:p-[4px] lg:p-[2px] h-auto relative">
        {['List', 'Map'].map((option:any, index: number) => (
          <React.Fragment key={index}>
            <button
              className={`px-4 py-2 2xl:w-[5.5rem] w-[4.5rem] text-[16px] rounded-md transition-all duration-300 ${
                selectedOptions === option ? 'bg-primary  mr-[3rem] text-white' : 'text-[#8F8F8F]'
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
  const searchParams = useSearchParams();
  
  const query = Object.fromEntries(searchParams.entries());

  const { data: allListings, isLoading:isAllloading, refetch } = useGetAllListingsQuery(query);

  const [displayListings, setDisplayListings] = useState([]);
  const router = useRouter();



  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      router.push(`/rent/searchlisting?${newParams.toString()}`);
    }
  };

  useEffect(() => {
    refetch();
  }, [query, refetch]);
  console.log("allListings", allListings);

     useEffect(() => {
       if (!isAllloading && allListings) {
         const firstThreeListings = allListings.listings;
         setDisplayListings(firstThreeListings);
         setTotalPages(allListings.totalPages || 1);
        setCurrentPage(Number(searchParams.get("page")) || 1); // Store in state
       }
     }, [allListings, isAllloading]);
    
      //  if (isAllloading) {
      //    return (
      //      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
      //        <div className="loader border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
      //      </div>
      //    );
      //  }
  return (
    
    <div className='mt-[4rem]  2xl:w-[100rem] lg:w-[84rem]  flex-col flex justify-center items-center  '> 
    <Breadcrumb/>'   
    <div className="flex justify-between w-[76rem]  2xl:w-[95rem]  ">
      <h1 className="text-black font-semibold text-4xl">
        Lagos Real-estate & Homes for Sale
      </h1>
      <div className="text-gray-600  text-sm flex items-center space-x-4">
        <span className='flex gap-2'>350 <p className='font-[300] text-gray'> of</p> 1,500 Homes</span>
        <span className="text-black font-[400] flex gap-2  justify-center items-center cursor-pointer">Sort: <p className='text-primary'>  New listings  </p>  <img
              src="/arrow-down.png"
              alt="Dropdown"
              className="w-3 h-2   pointer-events-none"
            /></span>
      </div>
    </div>
    <div className='w-full  mt-[1rem] mb-[2rem] h-[2px] bg-[#D9D9D9] '/>


    {displayListings.length === 0 ? (
        <p className="text-gray-600 text-center mt-6">No listings found for your search.</p>
      ) :
 (   <div className=" grid 2xl:mr-[4rem]   mr-4  grid-cols-1 md:grid-cols-3 gap-1 gap-y-[2rem] place-items-center">
    
 {[...displayListings].slice(0,9) // Create a shallow copy to avoid modifying the original array
    .map((items: any, index: number) => (
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
      </div>)}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      {/* second div layout  */}
  


</div>
  )
}

export default page