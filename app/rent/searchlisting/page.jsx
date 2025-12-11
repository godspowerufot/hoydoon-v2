/* eslint-disable */

"use client";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
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

// ====================================
// OPTIMIZED getLocationRegion with timeout
// ====================================
const getLocationWithTimeout = async (timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await getLocationRegion({ signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn('Location request timed out');
    }
    throw error;
  }
};

const Breadcrumb = ({ showMap, setShowMap }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [userCountry, setUserCountry] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

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

  // ====================================
  // OPTIMIZED: Single ref object for all dropdowns
  // ====================================
  const dropdownRefs = useRef({
    modal: null,
    bedBath: null,
    price: null,
    homeType: null,
    houseType: null,
  });

  // ====================================
  // OPTIMIZED: Get user location ONCE with proper cleanup
  // ====================================
  useEffect(() => {
    let isMounted = true;
    let hasAttempted = false;

    const getUserLocation = async () => {
      // Prevent multiple calls
      if (hasAttempted || isLoadingLocation || userCountry !== null) return;

      hasAttempted = true;
      setIsLoadingLocation(true);

      try {
        const { country } = await getLocationWithTimeout(5000);

        if (isMounted) {
          setUserCountry(country || "default");
        }
      } catch (error) {
        console.error("Error getting location:", error);

        if (isMounted) {
          // Always set a fallback to prevent infinite retries
          setUserCountry("default");
        }
      } finally {
        if (isMounted) {
          setIsLoadingLocation(false);
        }
      }
    };

    getUserLocation();

    return () => {
      isMounted = false;
    };
  }, []); // Only run once on mount

  // ====================================
  // OPTIMIZED: Sync filters with URL params
  // ====================================
  useEffect(() => {
    try {
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const listingType = searchParams.get("listingType");
      const bedrooms = searchParams.get("bedrooms");
      const bathrooms = searchParams.get("bathrooms");
      const houseType = searchParams.get("houseType");

      const priceValue = minPrice && maxPrice ? `${minPrice}-${maxPrice}` : "";

      const typeMapping = {
        sale: "buy",
        rent: "rent",
        land: "land",
      };
      const homeTypeValue = listingType ? typeMapping[listingType] || listingType : "";

      setFilters({
        price: priceValue,
        "home-type": homeTypeValue,
        location: searchParams.get("location") || "",
        bedrooms: bedrooms || "",
        bathrooms: bathrooms || "",
        houseType: houseType || "",
      });

      setBedValue(bedrooms || "");
      setBathValue(bathrooms || "");
    } catch (error) {
      console.error("Error parsing search params:", error);
    }
  }, [searchParams]);

  // ====================================
  // OPTIMIZED: Single useEffect for ALL click-outside handlers
  // ====================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = dropdownRefs.current;

      if (showBedBathDropdown && refs.bedBath && !refs.bedBath.contains(event.target)) {
        setShowBedBathDropdown(false);
      }

      if (showAllFiltersDropdown && refs.modal && !refs.modal.contains(event.target)) {
        setShowAllFiltersDropdown(false);
      }

      if (showPriceDropdown && refs.price && !refs.price.contains(event.target)) {
        setShowPriceDropdown(false);
      }

      if (showHomeTypeDropdown && refs.homeType && !refs.homeType.contains(event.target)) {
        setShowHomeTypeDropdown(false);
      }

      if (showHouseTypeDropdown && refs.houseType && !refs.houseType.contains(event.target)) {
        setShowHouseTypeDropdown(false);
      }
    };

    // Only attach listener if at least one dropdown is open
    const isAnyDropdownOpen =
      showBedBathDropdown ||
      showAllFiltersDropdown ||
      showPriceDropdown ||
      showHomeTypeDropdown ||
      showHouseTypeDropdown;

    if (isAnyDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showBedBathDropdown, showAllFiltersDropdown, showPriceDropdown, showHomeTypeDropdown, showHouseTypeDropdown]);

  // ====================================
  // MEMOIZED: Price options
  // ====================================
  const priceOptions = useMemo(() => {
    if (userCountry === "nigeria") {
      return {
        Buy: [
          { label: "Any", value: "" },
          { label: "₦1m - ₦5m", value: "1000000-5000000" },
          { label: "₦5m - ₦20m", value: "5000001-20000000" },
          { label: "₦20m & Above", value: "20000001-1000000000" },
        ],
        Rent: [
          { label: "Any", value: "" },
          { label: "Less than ₦1m", value: "0-1000000" },
          { label: "₦1m - ₦5m", value: "1000001-5000000" },
          { label: "₦5m to ₦10m", value: "5000001-10000000" },
          { label: "₦10m Above", value: "10000001-100000000" },
        ],
        Land: [
          { label: "Any", value: "" },
          { label: "₦1m - ₦5m", value: "1000000-5000000" },
          { label: "₦5m - ₦20m", value: "5000001-20000000" },
          { label: "₦20m & Above", value: "20000001-1000000000" },
        ],
        shortlet: [
          { label: "Any", value: "" },
          { label: "₦50k - ₦200k", value: "50000-200000" },
          { label: "₦200k - ₦500k", value: "200001-500000" },
          { label: "₦500k & Above", value: "500001-50000000" },
        ],
      };
    }

    return {
      Buy: [
        { label: "Any", value: "" },
        { label: "$0k - $30k", value: "0-30000" },
        { label: "$30k - $60k", value: "30001-60000" },
        { label: "$60k - $100k", value: "60001-100000" },
        { label: "$100k - Above", value: "100001-10000000" },
      ],
      Rent: [
        { label: "Any", value: "" },
        { label: "$50 - $200", value: "50-200" },
        { label: "$200 - $500", value: "201-500" },
        { label: "$500 - $800", value: "501-800" },
        { label: "$800 - $1000", value: "801-1000" },
        { label: "$1000 - Above", value: "1001-100000" },
      ],
      Land: [
        { label: "Any", value: "" },
        { label: "$0k - $30k", value: "0-30000" },
        { label: "$30k - $60k", value: "30001-60000" },
        { label: "$60k - $100k", value: "60001-100000" },
        { label: "$100k - Above", value: "100001-10000000" },
      ],
      shortlet: [
        { label: "Any", value: "" },
        { label: "$50k - $200k", value: "50000-200000" },
        { label: "$200k - $500k", value: "200001-500000" },
        { label: "$500k - Above", value: "500001-50000000" },
      ],
    };
  }, [userCountry]);

  const homeTypeOptions = useMemo(() => [
    { label: "Any", value: "" },
    { label: "Bungalow", value: "Bungalow" },
    { label: "Penthouse", value: "Penthouse" },
    { label: "Duplex", value: "Duplex" },
  ], []);

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

    if (userCountry !== "somalia") {
      baseOptions.push({ label: "Shortlet", value: "shortlet" });
    }

    return baseOptions;
  }, [userCountry]);

  const selectedType = useMemo(() =>
    typeOptions?.find((type) => filters["home-type"] === type.toLowerCase()) || "Rent",
    [typeOptions, filters]
  );

  // ====================================
  // OPTIMIZED: Memoized callbacks
  // ====================================
  const handleFilterChange = useCallback((filterName, value) => {
    if (!hasInteracted) {
      setHasInteracted(true);
      router.replace("/rent/searchlisting", { scroll: false });
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }, [hasInteracted, router]);

  const handleSearchClick = useCallback(() => {
    const newParams = new URLSearchParams();

    if (filters.price) {
      const [min, max] = filters.price.split("-");
      if (!isNaN(Number(min)) && !isNaN(Number(max))) {
        newParams.set("minPrice", min);
        newParams.set("maxPrice", max);
      }
    }

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
    }

    if (filters.location) newParams.set("location", filters.location);
    if (filters.bedrooms) newParams.set("bedrooms", filters.bedrooms);
    if (filters.bathrooms) newParams.set("bathrooms", filters.bathrooms);
    if (filters.houseType) newParams.set("houseType", filters.houseType);

    const queryString = newParams.toString();
    router.push(`/rent/searchlisting${queryString ? `?${queryString}` : ""}`);
  }, [filters, router]);

  const getPriceLabel = useCallback(() => {
    if (!filters.price) return "Price";
    const option = priceOptions[selectedType]?.find(
      (o) => o.value === filters.price
    );
    return option ? option.label : "Price";
  }, [filters.price, priceOptions, selectedType]);

  // ====================================
  // OPTIMIZED: Search with debounce
  // ====================================
  const handleSearchWithLoading = useCallback(async () => {
    setIsSearching(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      handleSearchClick();
    } finally {
      setIsSearching(false);
    }
  }, [handleSearchClick]);

  return (
    <div className="md:pt-[2.3rem] flex-wrap -mb-[2.5rem] md:mb-0 flex-col md:flex-row md:flex justify-between w-full">
      {/* Left Section: Filters */}
      <div className="flex items-center p-[1rem] md:p-0 flex-wrap gap-[4px] md:gap-3">
        {/* Bed/Baths Filter */}
        <div className="relative">
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

          {showBedBathDropdown && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[2000]"
                onClick={() => setShowBedBathDropdown(false)}
              />
              <div
                ref={(el) => (dropdownRefs.current.bedBath = el)}
                className="absolute w-[164px] top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-[3000] md:w-[350px] overflow-hidden"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black md:text-lg text-base">Select</span>
                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                      {!filters.bedBaths && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </div>

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
                    <span className="text-black text-sm md:text-lg">{opt.label}</span>
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

        {/* Type Filter */}
        <div className="relative">
          <button
            type="button"
            className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
            onClick={() => setShowHomeTypeDropdown(!showHomeTypeDropdown)}
          >
            <span>
              {filters["home-type"]
                ? filters["home-type"].charAt(0).toUpperCase() + filters["home-type"].slice(1)
                : "Type"}
            </span>
            <Image
              width={500}
              height={300}
              src="/arrow-down.png"
              alt="Dropdown"
              className="w-3 h-2 pointer-events-none flex-shrink-0"
            />
          </button>

          {showHomeTypeDropdown && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[1110]"
                onClick={() => setShowHomeTypeDropdown(false)}
              />
              <div
                ref={(el) => (dropdownRefs.current.homeType = el)}
                className="absolute z-[111111] left-[23%] top-[14%] md:top-[110%] md:left-0 bg-white border border-[#8F8F8F] rounded-md px-2 py-2 mt-2 md:mt-0 md:w-[350px]"
              >
                <ul className="flex flex-col gap-2">
                  {typeFilterOptions.map((opt) => {
                    const isSelected = filters["home-type"] === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className="w-full gap-[4em] md:gap-0 h-[3.2em] px-3 sm:px-4 py-2 sm:py-3 border-b border-gray last:border-b-0 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterChange("home-type", opt.value);
                          setShowHomeTypeDropdown(false);
                        }}
                      >
                        <span className="text-black text-sm md:text-lg">{opt.label}</span>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 border-primary">
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

        {/* Price Filter */}
        <div className="relative hidden md:block">
          <button
            type="button"
            className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
            onClick={() => setShowPriceDropdown(!showPriceDropdown)}
          >
            <span>{getPriceLabel()}</span>
            <Image
              width={500}
              height={300}
              src="/arrow-down.png"
              alt="Dropdown"
              className="w-3 h-2 pointer-events-none flex-shrink-0"
            />
          </button>

          {showPriceDropdown && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[1110]"
                onClick={() => setShowPriceDropdown(false)}
              />
              <div
                ref={(el) => (dropdownRefs.current.price = el)}
                className="absolute z-[111111] left-[23%] top-[14%] md:top-[110%] md:left-0 bg-white border border-[#8F8F8F] rounded-md px-2 py-2 mt-2 md:mt-0 md:w-[350px]"
              >
                <ul className="flex flex-col gap-2">
                  {priceOptions[selectedType]?.map((opt) => {
                    const isSelected = filters.price === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className="w-full gap-[4em] md:gap-0 h-[3.2em] px-3 sm:px-4 py-2 sm:py-3 border-b border-gray last:border-b-0 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterChange("price", opt.value);
                          setShowPriceDropdown(false);
                        }}
                      >
                        <span className="text-black text-sm md:text-lg">{opt.label}</span>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 border-primary">
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

        {/* House Type Filter */}
        <div className="relative hidden md:block">
          <button
            type="button"
            className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
            onClick={() => setShowHouseTypeDropdown(!showHouseTypeDropdown)}
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
              />
              <div
                ref={(el) => (dropdownRefs.current.houseType = el)}
                className="absolute z-[111111] left-[23%] top-[14%] md:top-[110%] md:left-0 bg-white border border-[#8F8F8F] rounded-md px-2 py-2 mt-2 md:mt-0 md:w-[350px]"
              >
                <ul className="flex flex-col gap-2">
                  {homeTypeOptions.map((opt) => {
                    const isSelected = filters.houseType === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className="w-full gap-[4rem] md:gap-0 h-[3.2em] px-3 sm:px-4 py-2 sm:py-3 border-b border-gray last:border-b-0 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterChange("houseType", opt.value);
                          setShowHouseTypeDropdown(false);
                        }}
                      >
                        <span className="text-black text-sm md:text-lg">{opt.label}</span>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 border-primary">
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
          userCountrys={userCountry}
          onFilterChange={handleFilterChange}
          onSearch={handleSearchClick}
          isSearching={isSearching}
        />

        <button
          onClick={handleSearchWithLoading}
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Right Section: List / Map Toggle */}
      <div className="hidden md:flex w-[15rem] bg-[#F9FAFB] gap-[10px] p-3 border-[#8F8F8F] justify-between border-solid border-[0.5px] items-center font-base rounded-[5px] md:p-[3px] relative">
        {["List", "Map"].map((option, index) => (
          <React.Fragment key={index}>
            <button
              className={`px-4 py-2 gap-3 flex items-center justify-center w-[6.5rem] text-base rounded-md transition-all duration-300 ${(showMap ? "Map" : "List") === option
                  ? "bg-primary gap-[10px] flex text-white"
                  : "text-[#8F8F8F]"
                }`}
              onClick={() => setShowMap(option === "Map")}
            >
              {option}
            </button>
            {index === 0 && (
              <div className="absolute w-[1px] h-[70%] bg-[#8F8F8F] left-1/2 transform -translate-x-1/2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ====================================
// MAIN PAGE COMPONENT - OPTIMIZED
// ====================================
const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [displayListings, setDisplayListings] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const sortDropdownRef = useRef(null);

  // ====================================
  // OPTIMIZED: Parse query params safely
  // ====================================
  const query = useMemo(() => {
    try {
      if (!searchParams) return {};
      return Object.fromEntries(searchParams.entries());
    } catch (error) {
      console.error("Error parsing search params:", error);
      return {};
    }
  }, [searchParams]);

  const {
    data: allListings,
    isLoading: isAllloading,
    error: listingsError,
  } = useGetAllListingsQuery(query);

  // ====================================
  // OPTIMIZED: Handle page changes
  // ====================================
  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      router.push(`/rent/searchlisting?${newParams.toString()}`, { scroll: false });
    }
  }, [totalPages, searchParams, router]);

  // ====================================
  // OPTIMIZED: Process and sort listings
  // ====================================
  useEffect(() => {
    if (isAllloading || !allListings) return;

    try {
      const listings = allListings.listings;

      if (!listings || !Array.isArray(listings)) {
        setDisplayListings([]);
        setCoordinates([]);
        setImageUrls([]);
        return;
      }

      const flatListings = flattenListings(listings);

      // Filter listings with valid coordinates
      const listingsWithCoords = flatListings.filter(
        (item) =>
          item?.item?.coordinate?.latitude &&
          item?.item?.coordinate?.longitude
      );

      // Sort listings
      const sortedListings = [...listingsWithCoords].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.item?.createdAt);
        const dateB = new Date(b.createdAt || b.item?.createdAt);

        switch (sortBy) {
          case "newest":
            return dateB - dateA;
          case "oldest":
            return dateA - dateB;
          case "price-low":
            return (a.item?.price || 0) - (b.item?.price || 0);
          case "price-high":
            return (b.item?.price || 0) - (a.item?.price || 0);
          default:
            return dateB - dateA;
        }
      });

      const images = flatListings.flatMap((item) => item.imageUrls || []);

      // Batch state updates
      setImageUrls(images);
      setCoordinates(sortedListings.map((item) => item.item.coordinate));
      setDisplayListings(sortedListings);
      setTotalPages(allListings.totalPages || 1);
      setCurrentPage(Number(searchParams.get("page")) || 1);
    } catch (error) {
      console.error("Error processing listings:", error);
      setDisplayListings([]);
      setCoordinates([]);
      setImageUrls([]);
    }
  }, [allListings, isAllloading, sortBy, searchParams]);

  // ====================================
  // OPTIMIZED: Close sort dropdown on outside click
  // ====================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSortDropdown]);

  // ====================================
  // OPTIMIZED: Error handling
  // ====================================
  if (listingsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <p className="text-red-600 text-center text-lg">
          Error loading listings. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-md"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="md:mt-[4rem] mt-[5rem] 2xl:mt-[3rem] flex-col flex justify-center items-center max-w-[1240px]">
      <Breadcrumb showMap={showMap} setShowMap={setShowMap} />

      <div className="flex items-start mt-3 p-4 md:p-0 md:mt-[1rem] w-full md:justify-between flex-col gap-3 md:gap-0 md:flex-row">
        <h1 className="text-black hidden md:block font-semibold text-2xl md:text-4xl">
          All Real-estate & Homes for Sale
        </h1>
        <h1 className="text-black md:hidden font-semibold text-2xl md:text-4xl">
          All Homes for Sale
        </h1>
        <div className="text-gray-600 fex-end md:ml-[0rem] 2xl:ml-0 text-sm flex items-center space-x-4">
          <span className="flex gap-2">
            {displayListings.slice(0, 7).length}{" "}
            <p className="font-[300] text-gray">of</p>
            {displayListings.length} Homes
          </span>
        </div>
      </div>

      <div className="w-screen md:my-[1rem] h-[2px] bg-[#D9D9D9]" />

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
              {displayListings.map((items, index) => {
                if (!items) return null;

                return (
                  <PropertyListCard
                    key={items?._id || index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={items?.imageUrls?.[0]?.altText || "Property image"}
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    region={items?.region}
                    description={items?.item?.description || "No description available"}
                    _id={items?._id}
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                    squareFeet={items?.item?.squareFeet}
                    landSize={items?.item?.landSize}
                    listingType={items?.listingType || "N/A"}
                  />
                );
              })}
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
    </div>
  );
};

export default Page