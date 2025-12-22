"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Pagination from "@/app/components/common/pagination";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { useRouter, useSearchParams } from "next/navigation";
import { flattenListings } from "@/utils";
import MapComponent from "@/app/components/layouts/listingmap";
import { getLocationRegion } from "@/utils/lib/index";
import { SkeletonCard } from "@/app/components/Loader";
import { FiltersDropdown } from "@/app/components/common/filters";
import ErrorBoundary from "@/app/components/common/error-boundary";
import { PropertyCard } from "../components/common/PropertyCardLite";
const Breadcrumb = ({ showMap, setShowMap }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [userCountry, setUserCountry] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showHomeTypeDropdown, setShowHomeTypeDropdown] = useState(false);
  const [showAllFiltersDropdown, setShowAllFiltersDropdown] = useState(false);
  const [showBedBathDropdown, setShowBedBathDropdown] = useState(false);
  const [showHouseTypeDropdown, setShowHouseTypeDropdown] = useState(false);

  const [filters, setFilters] = useState({
    price: "",
    "home-type": "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    houseType: "",
  });

  useEffect(() => {
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
  }, [searchParams]);

  useEffect(() => {
    const getUserLocation = async () => {
      if (userCountry) return; // Already have it
      const { country } = await getLocationRegion();
      if (country) setUserCountry(country);
    };
    getUserLocation();
  }, [userCountry]);

  const modalRef = useRef(null);
  const bedBathRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const homeTypeDropdownRef = useRef(null);
  const houseTypeDropdownRef = useRef(null);

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

    if (userCountry !== "somalia") {
      baseOptions.push({ label: "Shortlet", value: "shortlet" });
    }

    return baseOptions;
  }, [userCountry]);

  const selectedType =
    typeOptions?.find((type) => filters["home-type"] === type.toLowerCase()) ||
    "Rent";

  const handleFilterChange = (filterName, value) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleSearchClick = () => {
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

    if (filters.location) {
      newParams.set("location", filters.location);
    }
    if (filters.bedrooms) {
      newParams.set("bedrooms", filters.bedrooms);
    }
    if (filters.bathrooms) {
      newParams.set("bathrooms", filters.bathrooms);
    }
    if (filters.houseType) {
      newParams.set("houseType", filters.houseType);
    }

    const queryString = newParams.toString();
    router.push(`/search${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  const getPriceLabel = () => {
    if (!filters.price) return "Price";
    const option = priceOptions[selectedType]?.find(
      (o) => o.value === filters.price
    );
    return option ? option.label : "Price";
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (bedBathRef.current && !bedBathRef.current.contains(event.target)) {
        setShowBedBathDropdown(false);
      }
    }
    if (showBedBathDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
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
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
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
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
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
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
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
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showHouseTypeDropdown]);

  return (
    <div className="md:pt-[2.3rem] flex-wrap -mb-[2.5rem] md:mb-0 flex-col md:flex-row md:flex justify-between w-full">
      <div className="flex items-center p-0 mt-[3rem] md:mt-0 md:p-0 flex-wrap gap-[4px] md:gap-3">
        {["Type", "Price", "Bed/Baths", "House Type"].map((option) => {
          if (option === "Bed/Baths") {
            return (
              <div className="relative" key={option}>
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
                  <span className="text-xs">
                    {" "}
                    <Image
                      width={500}
                      height={500}
                      src="/arrow-down.png"
                      alt="Dropdown"
                      className="w-3 h-2 pointer-events-none flex-shrink-0"
                    />
                  </span>
                </button>

                {showBedBathDropdown && (
                  <>
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 z-[2000]"
                      onClick={() => setShowBedBathDropdown(false)}
                    />
                    <div className="absolute w-[164px] top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-[3000] md:w-[350px] overflow-hidden">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-black md:text-lg text-base">
                            Select
                          </span>
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

          if (option === "House Type") {
            return (
              <div className="relative hidden md:block" key={option}>
                <button
                  type="button"
                  className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
                  onClick={() =>
                    setShowHouseTypeDropdown(!showHouseTypeDropdown)
                  }
                >
                  <span>{filters.houseType || "Duplex"}</span>
                  <span className="text-xs">
                    {" "}
                    <Image
                      width={500}
                      height={500}
                      src="/arrow-down.png"
                      alt="Dropdown"
                      className="w-3 h-2 pointer-events-none flex-shrink-0"
                    />
                  </span>
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
                              className="w-full gap-[4rem] md:gap-0 h-[3.2em] px-3 sm:px-4 py-2 sm:py-3 border-b border-gray last:border-b-0 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFilterChange("houseType", opt.value);
                                setShowHouseTypeDropdown(false);
                              }}
                            >
                              <span className="text-black text-sm md:text-lg">
                                {opt.label}
                              </span>
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
            );
          }

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
                <span className="text-xs">
                  {" "}
                  <Image
                    width={500}
                    height={500}
                    src="/arrow-down.png"
                    alt="Dropdown"
                    className="w-3 h-2 pointer-events-none flex-shrink-0"
                  />
                </span>
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
                            className="w-full gap-[4em] md:gap-0 h-[3.2em] px-3 sm:px-4 py-2 sm:py-3 border-b border-gray last:border-b-0 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
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
                            <div
                              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected ? "border-primary" : "border-primary"
                              }`}
                            >
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
              height={16}
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
          ) : (
            "Search"
          )}
        </button>
      </div>
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

const Page = () => {
  const searchParams = useSearchParams();
  const [showMap, setShowMap] = useState(false);
  const query = useMemo(() => {
    return Object.fromEntries(searchParams?.entries() ?? []);
  }, [searchParams]);

  const { data: allListings, isLoading: isAllloading } =
    useGetAllListingsQuery(query);

  const [displayListings, setDisplayListings] = useState([]);
  const router = useRouter();
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const sortDropdownRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // CRITICAL: Progressive rendering state
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef(null);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());

      // Reset visible count when changing pages
      setVisibleCount(12);

      router.push(`/search?${newParams.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (!isAllloading && allListings) {
      try {
        const firstThreeListings = allListings.listings;
        const flatListings = flattenListings(firstThreeListings);

        const isValidCoordinate = (coord) => {
          if (!coord) return false;
          const lat = coord.latitude;
          const lng = coord.longitude;
          return (
            typeof lat === "number" &&
            typeof lng === "number" &&
            !isNaN(lat) &&
            !isNaN(lng) &&
            isFinite(lat) &&
            isFinite(lng) &&
            lat >= -90 &&
            lat <= 90 &&
            lng >= -180 &&
            lng <= 180
          );
        };

        const parseDate = (dateValue) => {
          if (!dateValue) return new Date(0);
          const date = new Date(dateValue);
          if (isNaN(date.getTime())) return new Date(0);
          return date;
        };

        const listingsWithCoords = flatListings.filter((item) => {
          const hasCoords =
            item?.item?.coordinate?.latitude &&
            item?.item?.coordinate?.longitude;
          if (hasCoords) {
            return isValidCoordinate(item.item.coordinate);
          }
          return false;
        });

        const sortedListings = [...listingsWithCoords].sort((a, b) => {
          try {
            const dateA = parseDate(a.createdAt || a.item?.createdAt);
            const dateB = parseDate(b.createdAt || b.item?.createdAt);

            switch (sortBy) {
              case "newest":
                return dateB.getTime() - dateA.getTime();
              case "oldest":
                return dateA.getTime() - dateB.getTime();
              case "price-low": {
                const priceA = Number(a.item?.price) || 0;
                const priceB = Number(b.item?.price) || 0;
                return priceA - priceB;
              }
              case "price-high": {
                const priceA = Number(a.item?.price) || 0;
                const priceB = Number(b.item?.price) || 0;
                return priceB - priceA;
              }
              default:
                return dateB.getTime() - dateA.getTime();
            }
          } catch (error) {
            console.error("Error during sorting:", error);
            return 0;
          }
        });

        setCoordinates(sortedListings.map((item) => item.item.coordinate));
        setDisplayListings(sortedListings);
        setTotalPages(allListings.totalPages || 1);
        setCurrentPage(Number(searchParams.get("page")) || 1);
      } catch (error) {
        console.error("Critical error in data processing:", error);
        setDisplayListings([]);
        setCoordinates([]);
      }
    }
  }, [allListings, isAllloading, sortBy, searchParams]);

  // CRITICAL: Progressive loading with Intersection Observer
  useEffect(() => {
    if (displayListings.length === 0 || showMap) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !isLoadingMore &&
            visibleCount < displayListings.length
          ) {
            setIsLoadingMore(true);

            // Load 6 more items after a small delay
            setTimeout(() => {
              setVisibleCount((prev) =>
                Math.min(prev + 6, displayListings.length)
              );
              setIsLoadingMore(false);
            }, 100);
          }
        });
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const sentinel = containerRef.current?.querySelector("#load-more-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
    };
  }, [displayListings.length, visibleCount, isLoadingMore, showMap]);

  // Reset visible count when sort changes
  useEffect(() => {
    setVisibleCount(12);
  }, [sortBy]);

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
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showSortDropdown]);

  // Get only visible listings for rendering
  const visibleListings = useMemo(() => {
    return displayListings.slice(0, visibleCount);
  }, [displayListings, visibleCount]);

  return (
    <div className="w-full min-h-screen md:mt-[2rem] bg-white">
      <div className="max-w-7xl mx-auto px-0 md:px-4 py-8">
       
        {isAllloading ? (
          <div className="mt-[8rem] md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mt-[4rem] md:flex-row justify-between items-start md:items-center md:mt-10 mb-4">
              <h2 className="text-xl md:text-4xl font-meduim">
                All Real-estate & Homes
              </h2>
              <div className="relative text-sm flex gap-2">
                <span className="flex gap-2">
                  {allListings?.totalListings}{" "}
                  <p className="font-[300] text-gray">of</p>
                  {displayListings?.length} Homes
                </span>{" "}
                Sort:{" "}
                <div
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="text-sm font-[400] flex gap-2 justify-center items-center text-primary cursor-pointer"
                >
                  {sortBy === "newest"
                    ? "Newest"
                    : sortBy === "oldest"
                    ? "Oldest"
                    : sortBy === "price-low"
                    ? "Price Low-High"
                    : "Price High-Low"}
                  <Image
                    width={500}
                    height={500}
                    src="/arrow-down.png"
                    alt="Dropdown"
                    className="w-3 h-2 pointer-events-none"
                  />
                </div>
                {showSortDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSortDropdown(false)}
                    />
                    <div
                      ref={sortDropdownRef}
                      className="absolute right-0 mt-8 w-48 bg-white border border-gray-300 rounded-md z-20"
                    >
                      {[
                        { label: "Newest", value: "newest" },
                        { label: "Oldest", value: "oldest" },
                        { label: "Price: Low to High", value: "price-low" },
                        { label: "Price: High to Low", value: "price-high" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                            sortBy === option.value
                              ? "bg-[#d8d8d8] font-medium"
                              : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-screen md:my-[3rem] md:-ml-[5.5rem] h-[2px] bg-[#D9D9D9]" />

            {/* Map or List View */}
            {showMap ? (
              <div className="mt-6">
                <MapComponent
                  coordinates={coordinates}
                  listings={displayListings}
                />
              </div>
            ) : (
              <div ref={containerRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {visibleListings.map((listing, index) => (
                    <PropertyCard
                      key={`${listing._id}-${index}`}
                      _id={listing._id}
                      imageSrc={
                        listing.imageUrls?.[0]?.url || "/default-image.jpg"
                      }
                      altText={listing.item?.title || "Property"}
                      price={listing.item?.price}
                      area={listing.item?.area}
                      region={listing?.region}
                      description={listing.item?.description}
                      title={listing.item?.title}
                      bathrooms={listing.item?.bathrooms}
                      bedrooms={listing.item?.bedrooms}
                      squareFeet={listing.item?.squareFeet}
                      listingType={listing.item?.listingType}
                      landSize={listing.item?.landSize}
                    />
                  ))}
                </div>

                {/* Sentinel for infinite scroll */}
                {visibleCount < displayListings.length && (
                  <div id="load-more-sentinel" className="h-10 mt-6">
                    <div className="flex justify-center">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {displayListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No properties found matching your criteria
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const WrappedPage = () => (
  <ErrorBoundary>
    <Page />
  </ErrorBoundary>
);

export default WrappedPage;
