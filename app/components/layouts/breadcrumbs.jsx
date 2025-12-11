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
import { getLocationWithTimeout } from "./../../../utils/index";
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

  const [filters, setFilters] = useState({
    price: "",
    "home-type": "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    houseType: "",
  });

  // ✅ Individual refs (iOS Safari requirement)
  const bedBathRef = useRef(null);
  const modalRef = useRef(null);
  const priceRef = useRef(null);
  const homeTypeRef = useRef(null);
  const houseTypeRef = useRef(null);
  const isMountedRef = useRef(true);
  const locationFetchedRef = useRef(false);

  // ✅ Get user location ONCE
  useEffect(() => {
    if (
      locationFetchedRef.current ||
      isLoadingLocation ||
      userCountry !== null
    ) {
      return;
    }

    let isMounted = true;
    locationFetchedRef.current = true;
    setIsLoadingLocation(true);

    const getUserLocation = async () => {
      try {
        const { country } = await getLocationWithTimeout(5000);
        if (isMounted && isMountedRef.current) {
          setUserCountry(country || "default");
        }
      } catch (error) {
        console.error("Error getting location:", error);
        if (isMounted && isMountedRef.current) {
          setUserCountry("default");
        }
      } finally {
        if (isMounted && isMountedRef.current) {
          setIsLoadingLocation(false);
        }
      }
    };

    getUserLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Sync filters with URL
  useEffect(() => {
    if (!searchParams) return;

    try {
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const listingType = searchParams.get("listingType");
      const bedrooms = searchParams.get("bedrooms");
      const bathrooms = searchParams.get("bathrooms");
      const houseType = searchParams.get("houseType");

      const priceValue = minPrice && maxPrice ? `${minPrice}-${maxPrice}` : "";
      const typeMapping = { sale: "buy", rent: "rent", land: "land" };
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
    } catch (error) {
      console.error("Error parsing search params:", error);
    }
  }, [searchParams]);

  // ✅ CRITICAL: Always attach listener (iOS Safari fix)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Batch all checks in requestAnimationFrame (iOS optimization)
      requestAnimationFrame(() => {
        if (!isMountedRef.current) return;

        if (
          showBedBathDropdown &&
          bedBathRef.current &&
          !bedBathRef.current.contains(event.target)
        ) {
          setShowBedBathDropdown(false);
        }
        if (
          showAllFiltersDropdown &&
          modalRef.current &&
          !modalRef.current.contains(event.target)
        ) {
          setShowAllFiltersDropdown(false);
        }
        if (
          showPriceDropdown &&
          priceRef.current &&
          !priceRef.current.contains(event.target)
        ) {
          setShowPriceDropdown(false);
        }
        if (
          showHomeTypeDropdown &&
          homeTypeRef.current &&
          !homeTypeRef.current.contains(event.target)
        ) {
          setShowHomeTypeDropdown(false);
        }
        if (
          showHouseTypeDropdown &&
          houseTypeRef.current &&
          !houseTypeRef.current.contains(event.target)
        ) {
          setShowHouseTypeDropdown(false);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    showBedBathDropdown,
    showAllFiltersDropdown,
    showPriceDropdown,
    showHomeTypeDropdown,
    showHouseTypeDropdown,
  ]);

  // ✅ Explicit cleanup (iOS Safari critical)
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      bedBathRef.current = null;
      modalRef.current = null;
      priceRef.current = null;
      homeTypeRef.current = null;
      houseTypeRef.current = null;
    };
  }, []);

  // ✅ Memoized options
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
    if (userCountry !== "somalia") return [...baseOptions, "shortlet"];
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

  const handleFilterChange = useCallback(
    (filterName, value) => {
      if (!hasInteracted) {
        setHasInteracted(true);
        router.replace("/rent/searchlisting", { scroll: false });
      }
      setFilters((prev) => ({ ...prev, [filterName]: value }));
    },
    [hasInteracted, router]
  );

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

  const handleSearchWithLoading = useCallback(async () => {
    setIsSearching(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      handleSearchClick();
    } finally {
      setIsSearching(false);
    }
  }, [handleSearchClick]);

  // ✅ Dropdown component to reduce duplication
  const Dropdown = ({ show, onClose, refProp, children, className = "" }) => (
    <div style={{ display: show ? "block" : "none" }}>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[2000]"
        onClick={onClose}
      />
      <div
        ref={refProp}
        className={`absolute bg-white rounded-lg shadow-lg z-[3000] overflow-hidden ${className}`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="md:pt-[2.3rem] flex-wrap -mb-[2.5rem] md:mb-0 flex-col md:flex-row md:flex justify-between w-full">
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

          <Dropdown
            show={showBedBathDropdown}
            onClose={() => setShowBedBathDropdown(false)}
            refProp={bedBathRef}
            className="w-[164px] top-full left-0 right-0 mt-2 md:w-[350px]"
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
          </Dropdown>
        </div>

        {/* Similar pattern for other dropdowns - use Dropdown component */}

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

      {/* List / Map Toggle */}
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
              <div className="absolute w-[1px] h-[70%] bg-[#8F8F8F] left-1/2 transform -translate-x-1/2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
