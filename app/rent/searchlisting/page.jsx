/* eslint-disable */

"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import PropertyCard from "@/app/components/common/property";
import Pagination from "@/app/components/common/pagination";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyListCard from "@/app/components/common/PropertyListing";
import { flattenListings, log } from "@/utils";
import MapComponent from "@/app/components/layouts/listingmap";
import { getLocationRegion } from "@/utils/lib/index";
import { PropertySkeleton } from "@/app/components/Loader";
import { FiltersDropdown } from "@/app/components/common/filters";
const Breadcrumb = ({ showMap, setShowMap }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [userCountry, setUserCountry] = useState(null);

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showHomeTypeDropdown, setShowHomeTypeDropdown] = useState(false);
  const [showAllFiltersDropdown, setShowAllFiltersDropdown] = useState(false);
  const [showBedBathDropdown, setShowBedBathDropdown] = useState(false);
  const [showHouseTypeDropdown, setShowHouseTypeDropdown] = useState(false);

  const [bedValue, setBedValue] = useState("");
  const [bathValue, setBathValue] = useState("");

  const [filters, setFilters] = useState({
    price: "",
    "home-type": "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    houseType: "",
  });

  // Sync filters with URL params on mount and when searchParams change
  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const listingType = searchParams.get("listingType");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const houseType = searchParams.get("houseType");

    // Reconstruct price range from minPrice and maxPrice
    const priceValue = minPrice && maxPrice ? `${minPrice}-${maxPrice}` : "";

    // Map API listing type back to filter value
    const typeMapping = {
      sale: "buy",
      rent: "rent",
      land: "land",
    };
    const homeTypeValue = listingType
      ? typeMapping[listingType] || listingType
      : "";

    setFilters({
      price: priceValue,
      "home-type": homeTypeValue,
      location: searchParams.get("location") || "",
      bedrooms: bedrooms || "",
      bathrooms: bathrooms || "",
      houseType: houseType || "",
    });

    // Update bed/bath display values
    setBedValue(bedrooms || "");
    setBathValue(bathrooms || "");
  }, [searchParams]);

  useEffect(() => {
    const getUserLocation = async () => {
      const { country } = await getLocationRegion();
      setUserCountry(country);
    };
    getUserLocation();
  }, []);

  const modalRef = useRef(null);
  const bedBathRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const homeTypeDropdownRef = useRef(null);
  const houseTypeDropdownRef = useRef(null);

  const priceOptions = {
    Buy: [
      { label: "Any", value: "" },
      { label: "$0k - $30k", value: "0-30000" },
      { label: "$30k - $60k", value: "30000-60000" },
      { label: "$60k - $100k", value: "60000-100000" },
      { label: "$100k - Above", value: "100000-10000000" },
    ],
    Rent: [
      { label: "Any", value: "" },
      { label: "$50 - $200", value: "0-200" },
      { label: "$200 - $500", value: "200-500" },
      { label: "$500 - $800", value: "500-800" },
      { label: "$800 - $1000", value: "800-1000" },
    ],
    Land: [
      { label: "Any", value: "" },
      { label: "$0k - $30k", value: "0-30000" },
      { label: "$30k - $60k", value: "30000-60000" },
      { label: "$60k - $100k", value: "60000-100000" },
      { label: "$100k - Above", value: "100000-10000000000" },
    ],
    shortlet: [
      { label: "Any", value: "" },
      { label: "$50k - $200k", value: "0-200000" },
      { label: "$200k - $500k", value: "200000-500000" },
      { label: "$500k - above", value: "500000-500000000" },
    ],
  };

  const homeTypeOptions = [
    { label: "Any", value: "" },
    { label: "Bungalow", value: "Bungalow" },
    { label: "Penthouse", value: "Penthouse" },
    { label: "Duplex", value: "Duplex" },
  ];

  const typeOptions = useMemo(() => {
    const baseOptions = ["Buy", "Rent", "Land"];
    if (userCountry !== "somalia") {
      return [...baseOptions, "shortlet"];
    }
    return baseOptions;
  }, [userCountry]);

  const typeFilterOptions = useMemo(() => {
    const baseOptions = [
      { label: "Rent", value: "rent" },
      { label: "Buy", value: "buy" },
      { label: "Land", value: "land" },
    ];

    // Only add shortlet for Nigeria
    if (userCountry !== "somalia") {
      baseOptions.push({ label: "Shortlet", value: "shortlet" });
    }

    return baseOptions;
  }, [userCountry]);

  const selectedType =
    typeOptions?.find((type) => filters["home-type"] === type.toLowerCase()) ||
    "Rent";

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
      price: "price",
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

    // Always map listingType for API
    const typeToApiValue = {
      buy: "sale",
      rent: "rent",
      land: "land",
      shortlet: "shortlet",
    };
    if (filters["home-type"]) {
      newParams.set(
        "listingType",
        typeToApiValue[filters["home-type"]] || filters["home-type"]
      );
    } else {
      newParams.delete("listingType");
    }

    // Handle Other Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (key === "home-type" || key === "price") return; // already handled above
      if (value !== "") {
        const paramKey = filterMapping[key] || key;
        newParams.set(paramKey, value);
      } else {
        const paramKey = filterMapping[key] || key;
        newParams.delete(paramKey);
      }
    });

    if (filters.houseType) {
      newParams.set("houseType", filters.houseType);
    } else {
      newParams.delete("houseType");
    }

    router.push(`/rent/searchlisting?${newParams.toString()}`);

    // DON'T reset filters here - they will be synced from URL params via useEffect
  };

  // Close dropdowns on outside click
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target)
      ) {
        setShowPriceDropdown(false);
      }
    }
    if (showPriceDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPriceDropdown]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        homeTypeDropdownRef.current &&
        !homeTypeDropdownRef.current.contains(event.target)
      ) {
        setShowHomeTypeDropdown(false);
      }
    }
    if (showHomeTypeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHomeTypeDropdown]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        houseTypeDropdownRef.current &&
        !houseTypeDropdownRef.current.contains(event.target)
      ) {
        setShowHouseTypeDropdown(false);
      }
    }
    if (showHouseTypeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHouseTypeDropdown]);

  // Helper function to get the display label for price based on current filters
  const getPriceLabel = () => {
    if (!filters.price) return "Price";
    const option = priceOptions[selectedType]?.find(
      (o) => o.value === filters.price
    );
    return option ? option.label : "Price";
  };

  return (
    <div className="md:pt-[2.3rem] flex-wrap -mb-[2.5rem] md:mb-0 flex-col md:flex-row md:flex justify-between w-full">
      {/* Left Section: Filters */}
      <div className="flex items-center p-[1rem] md:p-0 flex-wrap gap-[4px] md:gap-3">
        {/* Individual Filter Buttons */}
        {["Type", "Price", "Bed/Baths", "House Type"].map((option) => {
          if (option === "Bed/Baths") {
            return (
              <div className="relative" key={option}>
                {/* BUTTON */}
                <button
                  onClick={() => setShowBedBathDropdown(true)}
                  className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
                >
                  <span>
                    {filters.bedBaths === "0-2"
                      ? "0 - 2"
                      : filters.bedBaths === "2-4"
                      ? "2 - 4"
                      : filters.bedBaths === "5+"
                      ? "5 & Above"
                      : "Bed/Baths"}
                  </span>

                  <Image
                    width={500}
                    height={500}
                    src="/arrow-down.png"
                    alt="Dropdown"
                    className="w-3 h-2 pointer-events-none flex-shrink-0"
                  />
                </button>

                {/* DROPDOWN */}
                {showBedBathDropdown && (
                  <>
                    {/* BACKDROP */}
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 z-[2000]"
                      onClick={() => setShowBedBathDropdown(false)}
                    />

                    {/* PANEL */}
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-[3000] md:w-[350px] overflow-hidden">
                      {/* Header */}
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-black md:text-lg text-base ">
                            Select
                          </span>

                          <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                            {!filters.bedBaths && (
                              <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* OPTIONS */}
                      {[
                        { label: "0 - 2", value: "0-2" },
                        { label: "2 - 4", value: "2-4" },
                        { label: "5 & Above", value: "5+" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            handleFilterChange("bedBaths", opt.value);
                            setShowBedBathDropdown(false);
                          }}
                          className="w-full px-4 py-3 flex items-center justify-between border-b border-gray-100 last:border-0 text-sm"
                        >
                          <span className="text-black text-sm md:text-lg">
                            {opt.label}
                          </span>

                          <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                            {filters.bedBaths === opt.value && (
                              <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          }

          // House Type dropdown
          // Find this section in your code (around line 420-490) and add the `hidden md:block` classes:

          // House Type dropdown
          if (option === "House Type") {
            return (
              <div className="relative hidden md:block" key={option}>
                {" "}
                {/* Added hidden md:block */}
                <button
                  type="button"
                  className="border border-[#8F8F8F] bg-transparent text-sm  md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
                  onClick={() =>
                    setShowHouseTypeDropdown(!showHouseTypeDropdown)
                  }
                >
                  <span>{filters.houseType || "Duplex"}</span>
                  <Image
                    width={500}
                    height={300}
                    src="/arrow-down.png"
                    alt="Dropdown"
                    className="w-3 h-2 pointer-events-none flex-shrink-0"
                  />
                </button>
                {showHouseTypeDropdown && (
                  <>
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 z-[1110]"
                      onClick={() => setShowHouseTypeDropdown(false)}
                    ></div>
                    <div
                      className="absolute z-[111111] left-[23%] top-[14%] md:top-[110%] md:left-0 bg-white border border-[#8F8F8F] rounded-md px-2 py-2 mt-2 md:mt-0 md:w-[350px]"
                      ref={houseTypeDropdownRef}
                    >
                      <ul className="flex flex-col gap-2">
                        {homeTypeOptions.map((opt) => {
                          const isSelected = filters.houseType === opt.value;

                          return (
                            <label
                              key={opt.value}
                              className="w-full h-[3.2em] px-3 sm:px-4 py-2 sm:py-3 border-b border-gray last:border-b-0 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFilterChange("houseType", opt.value);
                                setShowHouseTypeDropdown(false);
                              }}
                            >
                              <span className="text-black text-sm md:text-lg">
                                {opt.label}
                              </span>

                              {/* Circle radio container */}
                              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 border-primary">
                                {/* Inner filled circle when selected */}
                                {isSelected && (
                                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            );
          }

          // Price and Type dropdowns
          const dropdownState =
            option === "Price" ? showPriceDropdown : showHomeTypeDropdown;
          const setDropdownState =
            option === "Price" ? setShowPriceDropdown : setShowHomeTypeDropdown;

          const options =
            option === "Price" ? priceOptions[selectedType] : typeFilterOptions;

          return (
            <div className="relative" key={option}>
              <button
                type="button"
                className={`border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2 ${
                  option === "Price" ? "hidden md:flex" : ""
                }`}
                onClick={() => setDropdownState(!dropdownState)}
              >
                <span>
                  {option === "Type"
                    ? filters["home-type"]
                      ? filters["home-type"].charAt(0).toUpperCase() +
                        filters["home-type"].slice(1)
                      : "Type"
                    : option === "Price"
                    ? getPriceLabel()
                    : option}
                </span>
                <Image
                  width={500}
                  height={300}
                  src="/arrow-down.png"
                  alt="Dropdown"
                  className="w-3 h-2 pointer-events-none flex-shrink-0"
                />
              </button>
              {dropdownState && (
                <>
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[1110]"
                    onClick={() => setDropdownState(false)}
                  ></div>
                  <div
                    className="absolute z-[111111] left-[23%] top-[14%] md:top-[110%] md:left-0 bg-white border border-[#8F8F8F] rounded-md px-2 py-2 mt-2 md:mt-0 md:w-[350px]"
                    ref={
                      option === "Price"
                        ? priceDropdownRef
                        : homeTypeDropdownRef
                    }
                  >
                    <ul className="flex flex-col gap-2">
                      {options.map((opt) => {
                        const isSelected =
                          option === "Price"
                            ? filters.price === opt.value
                            : filters["home-type"] === opt.value;

                        return (
                          <label
                            key={opt.value}
                            className="w-full h-[3.2em] px-3 sm:px-4 py-2 sm:py-3 border-b border-gray last:border-b-0 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (option === "Price") {
                                handleFilterChange("price", opt.value);
                                setShowPriceDropdown(false);
                              } else {
                                handleFilterChange("home-type", opt.value);
                                setShowHomeTypeDropdown(false);
                              }
                            }}
                          >
                            <span className="text-black text-sm md:text-lg">
                              {opt.label}
                            </span>

                            {/* Circle radio container */}
                            <div
                              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected ? "border-primary" : "border-primary"
                              }`}
                            >
                              {/* Inner filled circle when selected */}
                              {isSelected && (
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}
            </div>
          );
        })}

        <button
          onClick={() => setShowAllFiltersDropdown(true)}
          className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
        >
          <span className="flex items-center gap-2">
            <Image
              src="/allfilter.png"
              alt="Filter"
              width={16}
              height={15}
              className="w-4 h-4"
            />
            All Filters
          </span>
        </button>
        <FiltersDropdown
          isOpen={showAllFiltersDropdown}
          onClose={() => setShowAllFiltersDropdown(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearchClick}
          isSearching={isSearching}
        />
        <button
          onClick={async () => {
            setIsSearching(true);
            await new Promise((resolve) => setTimeout(resolve, 500));
            handleSearchClick();
            await new Promise((resolve) => setTimeout(resolve, 300));
            setIsSearching(false);
          }}
          className="px-4 py-2 bg-primary text-base text-white font-light rounded-md flex items-center md:w-[150px] justify-center"
          disabled={isSearching}
        >
          {isSearching ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Right Section: List / Map Toggle */}
      <div className="hidden md:flex w-[15rem] bg-[#F9FAFB] gap-[10px] p-3 border-[#8F8F8F] justify-between border-solid border-[0.5px] items-center font-base rounded-[5px] md:p-[3px] relative">
        {["List", "Map"].map((option, index) => (
          <React.Fragment key={index}>
            <button
              className={`px-4 py-2 gap-3 flex items-center justify-center w-[6.5rem] text-base rounded-md transition-all duration-300 ${
                (showMap ? "Map" : "List") === option
                  ? "bg-primary gap-[10px] flex text-white"
                  : "text-[#8F8F8F]"
              }`}
              onClick={() => setShowMap(option === "Map")}
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
  const [showMap, setShowMap] = useState(false);
  const query = useMemo(() => {
    return Object.fromEntries(searchParams?.entries() ?? []);
  }, [searchParams]);
  const {
    data: allListings,
    isLoading: isAllloading,
    refetch,
  } = useGetAllListingsQuery(query);

  const [displayListings, setDisplayListings] = useState([]);
  const router = useRouter();
  // Add these state variables at the top of your page component (around line 600)
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // default to newest
  const sortDropdownRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      router.push(`/rent/searchlisting?${newParams.toString()}`);
    }
  };

  // Update the useEffect that sets displayListings (around line 650)
  useEffect(() => {
    if (!isAllloading && allListings) {
      const firstThreeListings = allListings.listings;
      const flatListings = flattenListings(firstThreeListings);

      // Filter listings with valid coordinates
      const listingsWithCoords = flatListings.filter(
        (item) =>
          item?.item?.coordinate?.latitude && item?.item?.coordinate?.longitude
      );

      // Sort listings based on sortBy state
      const sortedListings = [...listingsWithCoords].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.item?.createdAt);
        const dateB = new Date(b.createdAt || b.item?.createdAt);

        switch (sortBy) {
          case "newest":
            return dateB - dateA; // newest first
          case "oldest":
            return dateA - dateB; // oldest first
          case "price-low":
            return (a.item?.price || 0) - (b.item?.price || 0);
          case "price-high":
            return (b.item?.price || 0) - (a.item?.price || 0);
          default:
            return dateB - dateA;
        }
      });

      const images = flatListings.flatMap((item) => item.imageUrls || []);
      setImageUrls(images);

      setCoordinates(sortedListings.map((item) => item.item.coordinate));
      setDisplayListings(sortedListings);
      setTotalPages(allListings.totalPages || 1);
      setCurrentPage(Number(searchParams.get("page")) || 1);
    }
  }, [allListings, isAllloading, sortBy]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setShowSortDropdown(false);
      }
    }
    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  //  if (isAllloading) {
  //    return (
  //      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
  //        <div className="loader border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
  //      </div>
  //    );
  //  }
  return (
    <div className="md:mt-[4rem] mt-[5rem] 2xl:mt-[3rem] flex-col flex justify-center items-center max-w-[1240px]">
      <Breadcrumb showMap={showMap} setShowMap={setShowMap} />'
      <div className="flex items-start p-4 md:p-0  md:mt-[1rem] w-full md:justify-between flex-col  gap-3 md:gap-0 md:flex-row   ">
        <h1 className="text-black  hidden md:block font-semibold text-2xl md:text-4xl">
          All Real-estate & Homes for Sale
        </h1>
        <h1 className="text-black md:hidden font-semibold text-2xl md:text-4xl">
          All Homes for Sale
        </h1>
        <div className="text-gray-600  fex-end md:ml-[0rem] 2xl:ml-0 text-sm flex items-center space-x-4">
          <span className="flex gap-2">
            {displayListings.slice(0, 7).length}{" "}
            <p className="font-[300] text-gray"> of</p>
            {displayListings.length} Homes
          </span>
        </div>
      </div>
      <div className="w-screen  md:my-[1rem]   h-[2px] bg-[#D9D9D9] " />
      {showMap ? (
        <MapComponent coordinates={coordinates} />
      ) : (
        <>
          {isAllloading ? (
            <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 gap-6 p-5 md:p-0">
              {[...Array(6)].map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : displayListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-12 p-8">
              <p className="text-gray-600 text-center text-lg">
                No listings found for your search.
              </p>
              <p className="text-gray-400 text-center text-sm mt-2">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[1rem] mt-[1.5rem] md:mt-[1rem] w-full p-5 md:p-0 place-items-center">
              {displayListings.map((items, index) => (
                <PropertyListCard
                  key={items?._id || index}
                  imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                  altText={
                    items?.imageUrls?.[0]?.altText ||
                    "Property image showcasing a beautiful home"
                  }
                  price={items?.item?.price || "Price not available"}
                  area={items?.item?.squareFeet}
                  bathrooms={items?.item?.bathrooms}
                  bedrooms={items?.item?.bedrooms}
                  region={items?.item?.region}
                  description={
                    items?.item?.description ||
                    "No description available for this property."
                  }
                  _id={items?._id}
                  title={items?.item?.title || "Untitled Property"}
                  rent={items?.item?.rent || "Rent details not provided"}
                  squareFeet={items?.item?.squareFeet}
                  landSize={items?.item?.landSize}
                  listingType={items?.listingType || "N/A"}
                />
              ))}
            </div>
          )}
          {!isAllloading && displayListings.length > 0 && (
            <Pagination
              totalPages={totalPages}
              display={displayListings}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      {/* second div layout  */}
    </div>
  );
};

export default page;
