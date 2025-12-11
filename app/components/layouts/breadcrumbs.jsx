/* eslint-disable */
"use client";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { getLocationWithTimeout } from "@/utils/lib";
import FiltersDropdown from "../common/filters";

export default function Breadcrumb({ showMap, setShowMap }) {
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

  // Refs for cleanup tracking
  const isMountedRef = useRef(true);
  const timeoutRef = useRef(null);
  const locationAttemptedRef = useRef(false);

  // Single ref object for all dropdowns
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
    // Prevent multiple calls
    if (
      locationAttemptedRef.current ||
      isLoadingLocation ||
      userCountry !== null
    ) {
      return;
    }

    locationAttemptedRef.current = true;
    setIsLoadingLocation(true);

    const getUserLocation = async () => {
      try {
        const { country } = await getLocationWithTimeout(5000);
        if (isMountedRef.current) {
          setUserCountry(country || "default");
        }
      } catch (error) {
        console.error("Error getting location:", error);
        if (isMountedRef.current) {
          setUserCountry("default");
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoadingLocation(false);
        }
      }
    };

    getUserLocation();

    return () => {
      isMountedRef.current = false;
    };
  }, []); // Only run once on mount

  // ====================================
  // OPTIMIZED: Sync filters with URL params
  // ====================================
  useEffect(() => {
    if (!isMountedRef.current) return;

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

      setBedValue(bedrooms || "");
      setBathValue(bathrooms || "");
    } catch (error) {
      console.error("Error parsing search params:", error);
    }
  }, [searchParams]);

  // ====================================
  // OPTIMIZED: Single useEffect for ALL click-outside handlers
  // iOS FIX: Use passive event listeners for better performance
  // ====================================
  useEffect(() => {
    const isAnyDropdownOpen =
      showBedBathDropdown ||
      showAllFiltersDropdown ||
      showPriceDropdown ||
      showHomeTypeDropdown ||
      showHouseTypeDropdown;

    if (!isAnyDropdownOpen) return;

    const handleClickOutside = (event) => {
      if (!isMountedRef.current) return;

      const refs = dropdownRefs.current;

      if (
        showBedBathDropdown &&
        refs.bedBath &&
        !refs.bedBath.contains(event.target)
      ) {
        setShowBedBathDropdown(false);
      }
      if (
        showAllFiltersDropdown &&
        refs.modal &&
        !refs.modal.contains(event.target)
      ) {
        setShowAllFiltersDropdown(false);
      }
      if (
        showPriceDropdown &&
        refs.price &&
        !refs.price.contains(event.target)
      ) {
        setShowPriceDropdown(false);
      }
      if (
        showHomeTypeDropdown &&
        refs.homeType &&
        !refs.homeType.contains(event.target)
      ) {
        setShowHomeTypeDropdown(false);
      }
      if (
        showHouseTypeDropdown &&
        refs.houseType &&
        !refs.houseType.contains(event.target)
      ) {
        setShowHouseTypeDropdown(false);
      }
    };

    // iOS: Use capture phase for better touch handling
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    document.addEventListener("touchstart", handleClickOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [
    showBedBathDropdown,
    showAllFiltersDropdown,
    showPriceDropdown,
    showHomeTypeDropdown,
    showHouseTypeDropdown,
  ]);

  // ====================================
  // Cleanup on unmount
  // ====================================
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Clear all dropdown refs
      Object.keys(dropdownRefs.current).forEach((key) => {
        dropdownRefs.current[key] = null;
      });
    };
  }, []);

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

  const homeTypeOptions = useMemo(
    () => [
      { label: "Any", value: "" },
      { label: "Bungalow", value: "Bungalow" },
      { label: "Penthouse", value: "Penthouse" },
      { label: "Duplex", value: "Duplex" },
    ],
    []
  );

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

  const selectedType = useMemo(
    () =>
      typeOptions?.find(
        (type) => filters["home-type"] === type.toLowerCase()
      ) || "Rent",
    [typeOptions, filters]
  );

  // ====================================
  // OPTIMIZED: Memoized callbacks
  // ====================================
  const handleFilterChange = useCallback(
    (filterName, value) => {
      if (!isMountedRef.current) return;

      if (!hasInteracted) {
        setHasInteracted(true);
        router.replace("/rent/searchlisting", { scroll: false });
      }
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: value,
      }));
    },
    [hasInteracted, router]
  );

  const handleSearchClick = useCallback(() => {
    if (!isMountedRef.current) return;

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
  // OPTIMIZED: Search with debounce and cleanup
  // ====================================
  const handleSearchWithLoading = useCallback(async () => {
    if (!isMountedRef.current) return;

    setIsSearching(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        handleSearchClick();
        setIsSearching(false);
      }
    }, 300);
  }, [handleSearchClick]);

  // Prevent rendering dropdowns if component is unmounting
  const shouldRenderDropdowns = isMountedRef.current;

  return (
    <div className="flex items-center justify-between w-full gap-4 py-4">
      {/* Left Section: Filters */}
      <div className="flex items-center gap-2 md:gap-4 flex-wrap">
        {/* Bed/Baths Filter */}
        <div className="relative">
          <button
            onClick={() => setShowBedBathDropdown(true)}
            className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
          >
            {filters.bedBaths === "0-2"
              ? "0 - 2"
              : filters.bedBaths === "2-4"
              ? "2 - 4"
              : filters.bedBaths === "5+"
              ? "5 & Above"
              : "Bed/Baths"}
          </button>

          {shouldRenderDropdowns && showBedBathDropdown && (
            <>
              <div
                onClick={() => setShowBedBathDropdown(false)}
                className="fixed inset-0 z-[2999]"
              />
              <div
                ref={(el) => (dropdownRefs.current.bedBath = el)}
                className="absolute w-[164px] top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-[3000] md:w-[350px] overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium">Select</p>
                  {!filters.bedBaths && (
                    <p className="text-xs text-gray-500 mt-1">Any</p>
                  )}
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
                    {opt.label}
                    <div className="w-5 h-5">
                      {filters.bedBaths === opt.value && (
                        <Image
                          src="/assets/icons/check.svg"
                          alt="selected"
                          width={20}
                          height={20}
                        />
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
            onClick={() => setShowHomeTypeDropdown(!showHomeTypeDropdown)}
            className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
          >
            {filters["home-type"]
              ? filters["home-type"].charAt(0).toUpperCase() +
                filters["home-type"].slice(1)
              : "Type"}
          </button>

          {shouldRenderDropdowns && showHomeTypeDropdown && (
            <>
              <div
                onClick={() => setShowHomeTypeDropdown(false)}
                className="fixed inset-0 z-[111110]"
              />
              <div
                ref={(el) => (dropdownRefs.current.homeType = el)}
                className="absolute z-[111111] left-[23%] top-[14%] md:top-[110%] md:left-0 bg-white border border-[#8F8F8F] rounded-md px-2 py-2 mt-2 md:mt-0 md:w-[350px]"
              >
                <p className="text-sm font-medium mb-2">*</p>
                {typeFilterOptions.map((opt) => {
                  const isSelected = filters["home-type"] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilterChange("home-type", opt.value);
                        setShowHomeTypeDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between"
                    >
                      {opt.label}
                      <div className="w-5 h-5">
                        {isSelected && (
                          <Image
                            src="/assets/icons/check.svg"
                            alt="selected"
                            width={20}
                            height={20}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Price Filter */}
        <div className="relative">
          <button
            onClick={() => setShowPriceDropdown(!showPriceDropdown)}
            className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
          >
            {getPriceLabel()}
          </button>

          {shouldRenderDropdowns && showPriceDropdown && (
            <>
              <div
                onClick={() => setShowPriceDropdown(false)}
                className="fixed inset-0 z-[111110]"
              />
              <div
                ref={(el) => (dropdownRefs.current.price = el)}
                className="absolute z-[111111] left-[23%] top-[14%] md:top-[110%] md:left-0 bg-white border border-[#8F8F8F] rounded-md px-2 py-2 mt-2 md:mt-0 md:w-[350px]"
              >
                <p className="text-sm font-medium mb-2">*</p>
                {priceOptions[selectedType]?.map((opt) => {
                  const isSelected = filters.price === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilterChange("price", opt.value);
                        setShowPriceDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between"
                    >
                      {opt.label}
                      <div className="w-5 h-5">
                        {isSelected && (
                          <Image
                            src="/assets/icons/check.svg"
                            alt="selected"
                            width={20}
                            height={20}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* House Type Filter */}
        <div className="relative">
          <button
            onClick={() => setShowHouseTypeDropdown(!showHouseTypeDropdown)}
            className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
          >
            {filters.houseType || "Duplex"}
          </button>

          {shouldRenderDropdowns && showHouseTypeDropdown && (
            <>
              <div
                onClick={() => setShowHouseTypeDropdown(false)}
                className="fixed inset-0 z-[111110]"
              />
              <div
                ref={(el) => (dropdownRefs.current.houseType = el)}
                className="absolute z-[111111] left-[23%] top-[14%] md:top-[110%] md:left-0 bg-white border border-[#8F8F8F] rounded-md px-2 py-2 mt-2 md:mt-0 md:w-[350px]"
              >
                <p className="text-sm font-medium mb-2">*</p>
                {homeTypeOptions.map((opt) => {
                  const isSelected = filters.houseType === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFilterChange("houseType", opt.value);
                        setShowHouseTypeDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between"
                    >
                      {opt.label}
                      <div className="w-5 h-5">
                        {isSelected && (
                          <Image
                            src="/assets/icons/check.svg"
                            alt="selected"
                            width={20}
                            height={20}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => setShowAllFiltersDropdown(true)}
          className="border border-[#8F8F8F] bg-transparent text-sm md:text-base font-light rounded-md text-[#8F8F8F] py-2 px-2 md:py-2 md:px-4 flex items-center justify-between md:min-w-[140px] gap-2"
        >
          All Filters
        </button>

        {shouldRenderDropdowns && showAllFiltersDropdown && (
          <FiltersDropdown
            showAllFiltersDropdown={showAllFiltersDropdown}
            setShowAllFiltersDropdown={setShowAllFiltersDropdown}
            filters={filters}
            userCountrys={userCountry}
            onFilterChange={handleFilterChange}
            onSearch={handleSearchClick}
            isSearching={isSearching}
          />
        )}

        <button
          onClick={handleSearchWithLoading}
          disabled={isSearching}
          className="bg-[#FF0000] text-white py-2 px-4 rounded-md disabled:opacity-50"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Right Section: List / Map Toggle */}
      <div className="flex items-center gap-2">
        {["List", "Map"].map((option, index) => (
          <button
            key={option}
            onClick={() => setShowMap(option === "Map")}
            className={`py-2 px-4 rounded-md ${
              (option === "List" && !showMap) || (option === "Map" && showMap)
                ? "bg-[#FF0000] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {option}
            {index === 0 && <span className="ml-2 text-xs">|</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
