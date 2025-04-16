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

  const [selectedOptions, setSelectedOptions] = useState("List");
  const [showBedBathDropdown, setShowBedBathDropdown] = useState(false);
  const [bedValue, setBedValue] = useState("");
  const [bathValue, setBathValue] = useState("");
  const [filters, setFilters] = useState({
    price: "",
    "home-type": "",
    location: "",
    bedrooms: "",
    bathrooms: "",
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleSearchClick = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    // Map keys for URL params
    const filterMapping: Record<string, string> = {
      price: "price", // this will now be split below
      "home-type": "listingType",
      location: "location",
      bedrooms: "bedrooms",
      bathrooms: "bathrooms",
    };

    // Handle Price Filter
    if (filters.price) {
      if (filters.price === "") {
        newParams.delete("minPrice");
        newParams.delete("maxPrice");
      } else {
        const [min, max] = filters.price.split("-");
        newParams.set("minPrice", min);
        newParams.set("maxPrice", max);
      }
    }

    // Handle Other Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") {
        const paramKey = filterMapping[key] || key;
        newParams.set(paramKey, value);
      } else {
        const paramKey = filterMapping[key] || key;
        newParams.delete(paramKey);
      }
    });

    // Trigger search with the updated query parameters
    router.push(`/rent/searchlisting?${newParams.toString()}`);
  };

  return (
    <div className="pt-[2.3rem] px-4 lg:pl-[2rem] lg:pr-[4.5rem] 2xl:gap-[20rem] flex justify-between w-full">
      {/* Left Section: Filters */}
      <div className="flex items-center  2xl:-ml-[2.4rem] lg:ml-[2rem] gap-2">
        <button className="px-4 text-sm py-[6px] border rounded-[3px] text-[#8F8F8F] border-[#8F8F8F] flex items-center gap-2">
          <Image src="/allfilter.png" alt="Filter" width={16} height={15} /> All Filters
        </button>

        {["Price", "Bed/Baths", "Home type"].map((option) => {
          const paramKey = option.toLowerCase().replace(/\s+/g, "-");
          const selectedValue = searchParams.get(paramKey) || "";

          if (option === "Bed/Baths") {
            return (
              <div className="relative" key={option}>
                <button
                  onClick={() => setShowBedBathDropdown(!showBedBathDropdown)}
                  className="border border-[#8F8F8F] bg-transparent text-[12.5px] font-light rounded-md text-[#8F8F8F] p-2 pr-6 appearance-none flex items-center gap-2"
                >
                  {bedValue || bathValue
                    ? `${bedValue } Beds, ${bathValue } Baths`
                    : "Bed/Baths"}
                  <img
                    src="/arrow-down.png"
                    alt="Dropdown"
                    className="w-3 h-2 ml-2 pointer-events-none"
                  />
                </button>

                {showBedBathDropdown && (
                  <div className="absolute z-10 top-[110%] left-0 bg-white shadow-md border border-gray-200 rounded-md p-4 w-64">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-sm">Beds</span>
                      <button
                        onClick={() => {
                          setBedValue("");
                          handleFilterChange("bedrooms", "");
                        }}
                        className="text-xs text-primary"
                      >
                        Any
                      </button>
                    </div>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {["1", "2", "3", "4", "5+"].map((val) => (
                        <button
                          key={val}
                          onClick={() => {
                            setBedValue(val);
                            handleFilterChange("bedrooms", val);
                          }}
                          className={`px-2 py-1 text-sm rounded border ${
                            bedValue === val
                              ? "bg-teal-500 text-white"
                              : "text-[#8F8F8F] border-[#8F8F8F]"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-sm">Baths</span>
                      <button
                        onClick={() => {
                          setBathValue("");
                          handleFilterChange("bathrooms", "");
                        }}
                        className="text-xs text-primary"
                      >
                        Any
                      </button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {["1", "2", "3", "4", "5+"].map((val) => (
                        <button
                          key={val}
                          onClick={() => {
                            setBathValue(val);
                            handleFilterChange("bathrooms", val);
                          }}
                          className={`px-2 py-1 text-sm rounded border ${
                            bathValue === val
                              ? "bg-teal-500 text-white"
                              : "text-[#8F8F8F] border-[#8F8F8F]"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div className="relative flex items-center" key={option}>
              <select
                className="border border-[#8F8F8F] bg-transparent text-[12.5px] font-light rounded-md text-[#8F8F8F] p-2 pr-6 appearance-none"
                value={selectedValue}
                onChange={(e) => handleFilterChange(paramKey, e.target.value)}
              >
                <option value="">{option}</option>

                {option === "Price" && (
                  <>
                    <option value="0-200">$0–200</option>
                    <option value="200-500">$200–500</option>
                    <option value="500-800">$500–800</option>
                    <option value="800-1000">$800–1,000</option>
                  </>
                )}

                {option === "Home type" && (
                  <>
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                    <option value="land">Land</option>
                  </>
                )}
              </select>

              <img
                src="/arrow-down.png"
                alt="Dropdown"
                className="w-3 h-2 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          );
        })}

        <button
          onClick={handleSearchClick}
          className="px-4 py-[6px] bg-teal-600 text-base text-white font-light rounded-md"
        >
          Search
        </button>
      </div>

      {/* Right Section: List / Map Toggle */}
      <div className="flex bg-[#F9FAFB] border-[#8F8F8F] w-auto 2xl:-mr-[2rem] justify-between border-solid border-[1px] items-center font-base rounded-[10px] 2xl:p-[4px] lg:p-[2px] h-auto relative">
        {["List", "Map"].map((option, index) => (
          <React.Fragment key={index}>
            <button
              className={`px-4 py-2 2xl:w-[5.5rem] w-[4.5rem] text-[16px] rounded-md transition-all duration-300 ${
                selectedOptions === option
                  ? "bg-primary mr-[3rem] text-white"
                  : "text-[#8F8F8F]"
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
    <div className="lg:mt-[4rem] 2xl:mt-[3rem] 2xl:w-[94rem]  lg:w-[84rem]  flex-col flex justify-center items-center 2xl:items-stretch ">
      <Breadcrumb />'
      <div className="flex justify-between w-[76rem]  2xl:w-[90rem]  ">
        <h1 className="text-black font-semibold text-4xl">
          Lagos Real-estate & Homes for Sale
        </h1>
        <div className="text-gray-600  fex-end lg:-ml-[2rem] 2xl:ml-0 text-sm flex items-center space-x-4">
          <span className="flex gap-2">
            {displayListings.slice(0,7).length} <p className="font-[300] text-gray"> of</p>
            {displayListings.length} Homes
          </span>
          <span className="text-black font-[400] flex gap-2  justify-center items-center cursor-pointer">
            Sort: <p className="text-primary"> New listings </p>{" "}
            <img
              src="/arrow-down.png"
              alt="Dropdown"
              className="w-3 h-2   pointer-events-none"
            />
          </span>
        </div>
      </div>
      <div className="w-screen  lg:my-[2rem] 2xl:my-[2  rem]  h-[2px] bg-[#D9D9D9] " />
      {displayListings.length === 0 ? (
        <p className="text-gray-600 text-center mt-6">
          No listings found for your search.
        </p>
      ) : (
        <div className=" grid   lg:-ml-[2.8rem] 2xl:mr-[0]   mr-2  grid-cols-1 md:grid-cols-3 gap-4 lg:gap-y-[2rem] place-items-center">
          {[...displayListings]
            .map((items: any, index: number) => (
              <PropertyCard
                key={index}
                _id={items?._id}
                imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                altText={items?.imageUrls?.[0]?.altText ||
                  "Property image showcasing a beautiful home"}
                price={items?.item?.price || "Price not available"}
                area={items?.item?.squareFeet || "190 - 245 m² (Approximate area)"}
                description={items?.item?.description ||
                  "No description available for this property."}
                title={items?.item?.title || "Untitled Property"}
                rent={items?.item?.rent || "Rent details not provided"}           />
            ))}
        </div>
      )}
      <Pagination
        totalPages={totalPages}
        display={displayListings}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {/* second div layout  */}
    </div>
  );
}

export default page