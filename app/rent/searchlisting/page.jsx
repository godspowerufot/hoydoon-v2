/* eslint-disable */

'use client';

import React, { useEffect,useMemo,useRef, useState } from 'react'
import Image from 'next/image';
import PropertyCard from '@/app/components/common/property';
import Pagination from '@/app/components/common/pagination';
import { useGetAllListingsQuery } from '@/store/slices/api/authapi';
import { useRouter, useSearchParams } from 'next/navigation';
import PropertyListCard from '@/app/components/common/PropertyListing';
import { flattenListings } from '@/utils';


const PropertySkeleton = () => {
  return (
    <div className="space-y-4 w-full  mt-[3rem] lg:mt-0 max-w-sm rounded-xl border border-gray p-4 shadow-sm bg-white">
      <div className="h-48 rounded-md shimmer" />
      <div className="h-4 rounded shimmer w-3/4" />
      <div className="h-4 rounded shimmer w-1/2" />
      <div className="h-3 rounded shimmer w-5/6" />
      <div className="flex space-x-2 mt-2">
        <div className="h-3 w-1/4 rounded shimmer" />
        <div className="h-3 w-1/4 rounded shimmer" />
        <div className="h-3 w-1/4 rounded shimmer" />
      </div>
    </div>
  );
};

const Breadcrumb = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Add this state
const [showAllFiltersDropdown, setShowAllFiltersDropdown] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false); // New state for modal
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
  const modalRef = useRef<HTMLDivElement>(null);
  const bedBathRef = useRef<HTMLDivElement>(null);


  const handleFilterChange = (filterName, value) => {
    
    
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
  const handleSearchClick = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    // Map keys for URL params
    const filterMapping = {
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
        if (!isNaN(Number(min)) && !isNaN(Number(max))) {
          newParams.set("minPrice", min);
          newParams.set("maxPrice", max);
        }
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
  useEffect(() => {
    function handleClickOutside(event) {
      if (bedBathRef.current && !bedBathRef.current.contains(event.target)) {
        setShowBedBathDropdown(false);
      }
    }
  
    if (showBedBathDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBedBathDropdown]);
    // Close on outside click
    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowAllFiltersDropdown(false);
        }
      }
    
      if (showAllFiltersDropdown) {
        document.addEventListener("mousedown", handleClickOutside);
      }
    
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showAllFiltersDropdown]);
    
  

  return (
    <div className="lg:pt-[2.3rem]   px-4 lg:pl-[2rem] lg:pr-[4.5rem] 2xl:gap-[20rem] flex-col lg:flex-row lg:flex justify-between w-full">
      {/* Left Section: Filters */}
      <div className="flex items-center  2xl:-ml-[2.4rem] lg:ml-[2rem] gap-1 lg:gap-2">
      <button
          onClick={() =>  setShowAllFiltersDropdown(true)}
          className="px-2 lg:px-4 h-[37px] text-xs  lg:h-fit lg:text-sm lg:py-[6px] border rounded-[3px] text-[#8F8F8F] border-[#8F8F8F] flex items-center gap-2"
        >
          <Image src="/allfilter.png" alt="Filter" width={16} height={15} className='w-4 h-4 lg:w-[16px] lg:h-[16px]' /> All Filters
        </button>
        {showAllFiltersDropdown && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[1110]"></div>

            <div

  className="absolute bg-white top-[20%] z-[1111] rounded-xl p-4 w-full max-w-[14rem]"
>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-sm text-gray-600 font-[400]">Filters</h2>
    <button
      className="text-sm text-teal-600 font-[400]"
      onClick={() => {
        handleSearchClick();
        setShowAllFiltersDropdown(false);
      }}
    >
      Done
    </button>
  </div>

  {/* Type Filter */}
  <div className="mb-4">
    <h3 className="text-sm text-gray-600 font-[400] mb-2">Type</h3>
    <ul className="flex flex-col gap-1.5">
      {["Buy", "Rent", "Land"].map((option) => (
        <li
          key={option}
          className="flex justify-between items-center border-b border-gray-300 pb-1.5"
        >
          <span className="text-[12px] text-gray font-[400]">{option}</span>
          <input
            type="radio"
            name="type"
            className="w-3 h-3 accent-primary"
            checked={filters["home-type"] === option.toLowerCase()}
            onChange={() => handleFilterChange("home-type", option.toLowerCase())}
          />
        </li>
      ))}
    </ul>
  </div>

  {/* Bed/Baths Filter */}
  <div className="mb-4">
    <h3 className="text-sm text-gray-600 font-[400] mb-2">Bed/Baths</h3>
    <ul className="flex flex-col gap-1.5">
      {["Any", "2–4", "5+"].map((option) => (
        <li
          key={option}
          className="flex justify-between items-center border-b border-gray-300 pb-1.5"
        >
          <span className="text-[12px] text-gray font-[400]">{option}</span>
          <input
            type="radio"
            name="bed-baths"
            className="w-3 h-3 accent-primary"
            checked={
              (option === "Any" && filters.bedrooms === "" && filters.bathrooms === "") ||
              (option === "2–4" && filters.bedrooms === "2" && filters.bathrooms === "2") ||
              (option === "5+" && filters.bedrooms === "5+" && filters.bathrooms === "5+")
            }
            onChange={() => {
              if (option === "Any") {
                handleFilterChange("bedrooms", "");
                handleFilterChange("bathrooms", "");
              } else if (option === "2–4") {
                handleFilterChange("bedrooms", "2");
                handleFilterChange("bathrooms", "2");
              } else {
                handleFilterChange("bedrooms", "5+");
                handleFilterChange("bathrooms", "5+");
              }
            }}
          />
        </li>
      ))}
    </ul>
  </div>

  {/* Price Filter */}
  <div className='lg:block hidden '>
    <h3 className="text-sm text-gray-600 font-[400] mb-2">Price</h3>
    <ul className="flex flex-col gap-1.5">
      {["Any", "50-200"].map((option) => (
        <li
          key={option}
          className="flex justify-between items-center border-b border-gray-300 pb-1.5"
        >
          <span className="text-[12px] text-gray font-[400]">
            {option === "Any" ? "Any" : "$50 – $200"}
          </span>
          <input
            type="radio"
            name="price"
            className="w-3 h-3 accent-primary"
            checked={filters.price === (option === "Any" ? "" : option)}
            onChange={() => handleFilterChange("price", option === "Any" ? "" : option)}
          />
        </li>
      ))}
    </ul>
  </div>
</div>
</>

 
  )}

        {["Price", "Home type","Bed/Baths" ].map((option) => {
          const paramKey = option.toLowerCase().replace(/\s+/g, "-");
          const selectedValue = searchParams.get(paramKey) || "";

          if (option === "Bed/Baths") {
            return (
              <div className="relative"   key={option}>
                <button
                  onClick={() => setShowBedBathDropdown(!showBedBathDropdown)}
                  className="border border-[#8F8F8F] bg-transparent text-[12.5px] font-light rounded-md text-[#8F8F8F] p-2 lg:pr-6 appearance-none flex items-center gap-2"
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
                  <div className="absolute z-10  lg:top-[110%] left-0 bg-white shadow-md border border-gray-200 rounded-md p-4 w-[12rem] mt-7 lg:mt-0 lg:w-64">
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
              className={`${
                option === "Price" ? "hidden lg:block" : "block"
              } border outline-none focus:outline-none border-[#8F8F8F] bg-transparent text-[12.5px] w-[67px] font-light rounded-md text-[#8F8F8F] p-2 pr-[0.5rem] lg:pr-6 appearance-none`}
              value={selectedValue}
              onChange={(e) => handleFilterChange(paramKey, e.target.value)}
            >
              {/* Label Option */}
           
          
 {option === "Home type" ? (
                <>
                  <option className="block lg:hidden" value="">
                    Buy
                  </option>
                  <option className="hidden lg:block" value="">
                    Home type
                  </option>
                </>
              ) : (
                <option value="">{option}</option>
              )}
              {/* Price Options */}
              {option === "Price" && (
                <>
                  <option value="0-200">$0–200</option>
                  <option value="200-500">$200–500</option>
                  <option value="500-800">$500–800</option>
                  <option value="800-5000000">$800+</option>
                </>
              )}
          
              {/* Home Type Options */}
              {option === "Home type" && (
                <>
               
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                  <option value="land">Land</option>
                </>
              )}
            </select>
          
            {/* Arrow icon */}
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
      <div className=" hidden lg:flex w-[12rem] bg-[#F9FAFB] gap-[10px] p-4  border-[#8F8F8F]  2xl:-mr-[2rem] justify-between border-solid border-[1px] items-center font-base rounded-[10px] 2xl:p-[4px] lg:p-[2px] h-auto relative">
        {["List", "Map"].map((option, index) => (
          <React.Fragment key={index}>
            <button
              className={`px-4 py-2 gap-3 flex 2xl:w-[5.5rem] w-[4.5rem] text-[16px] rounded-md transition-all duration-300 ${
                selectedOptions === option
                  ? "bg-primary gap-[10px] flex text-white"
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
  
  const query = useMemo(() => {
    return Object.fromEntries(searchParams?.entries() ?? []);
  }, [searchParams]);
  const { data: allListings, isLoading:isAllloading, refetch } = useGetAllListingsQuery(query);

  const [displayListings, setDisplayListings] = useState([]);
  const router = useRouter();


  const [coordinates, setCoordinates] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      router.push(`/rent/searchlisting?${newParams.toString()}`);
    }
  };


     useEffect(() => {
       if (!isAllloading && allListings) {
         const firstThreeListings = allListings.listings;
         const flatListings = flattenListings(firstThreeListings);
         flatListings.forEach((item) => {
          const coord = item?.item?.coordinate;
          if (coord?.latitude && coord?.longitude) {
            setCoordinates(coord); // ✅ show all listings on first load
        
          }
        }); // ✅ update all state
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
    <div className="lg:mt-[4rem] mt-[5rem] 2xl:mt-[3rem] 2xl:w-[94rem]  lg:w-[84rem]  flex-col flex justify-center items-center 2xl:items-stretch ">
      <Breadcrumb />'
      <div className="flex items-start p-4 lg:p-0  w-full lg:justify-between flex-col  gap-3 lg:gap-0 lg:flex-row lg:w-[76rem]  2xl:w-[90rem]  ">
        <h1 className="text-black  hidden lg:block font-semibold text-2xl lg:text-4xl">
           All Real-estate & Homes for Sale
        </h1>
        <h1 className="text-black lg:hidden font-semibold text-2xl lg:text-4xl">
         All   Homes for Sale
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
  
      {isAllloading && (
  <div className="grid grid-cols-1 w-[90%] sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <PropertySkeleton key={index} />
    ))}
  </div>
) }
      {displayListings.length === 0 ? (
        <p className="text-gray-600 text-center mt-6">
          No listings found for your search.
        </p>
      ) : (
        <div className=" grid    lg:-ml-[2.8rem] 2xl:mr-[0]   lg:mr-2  grid-cols-1 md:grid-cols-3 gap-4 lg:gap-y-[2rem]  p-5 lg:p-0 place-items-center">
          {[...displayListings]
            .map((items, index) => (
             <PropertyListCard
                                   key={index}
                                   imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                                   altText={
                                     items?.imageUrls?.[0]?.altText ||
                                     "Property image showcasing a beautiful home"
                                   }
                                   price={items?.item?.price || "Price not available"}
                                   area={items?.item?.squareFeet}
                                   bathrooms={items?.item?.bathrooms}
                                   bedrooms={items?.item?.bedrooms}
                                   description={
                                     items?.item?.description ||
                                     "No description available for this property."
                                   }
                                   _id={items?._id}
             
                                   title={items?.item?.title || "Untitled Property"}
                                   rent={items?.item?.rent || "Rent details not provided"}
                                   squareFeet={items?.item?.squareFeet}
                                 />     ))}
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