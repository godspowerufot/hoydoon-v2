"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Button from "./Button";

type PropertyType = "shortlet" | "rent" | "buy" | "land" | "sell" | "";

interface Filters {
  location: string;
  price: string;
  type: PropertyType;
  bedBaths: string;
}

// Price options based on property type
const priceOptionsByType: Record<string, { label: string; value: string }[]> = {
  shortlet: [
    { label: "$0 - $1500", value: "0-1500" },
    { label: "$1500 - $3500", value: "1500-3500" },
    { label: "$3500 - $5000", value: "3500-5000" },
    { label: "$5000 - $7500", value: "5000-7500" },
  ],
  rent: [
    { label: "$0 - $1500", value: "0-1500" },
    { label: "$1500 - $3500", value: "1500-3500" },
    { label: "$3500 - $5000", value: "3500-5000" },
    { label: "$5000 - $7500", value: "5000-7500" },
  ],
  buy: [
    { label: "$0k - $30k", value: "0-30000" },
    { label: "$30k - $60k", value: "30000-60000" },
    { label: "$60k - $100k", value: "60000-100000" },
    { label: "$100k - Above", value: "100000-10000000" },
  ],
  land: [
    { label: "$0k - $30k", value: "0-30000" },
    { label: "$30k - $60k", value: "30000-60000" },
    { label: "$60k - $100k", value: "60000-100000" },
    { label: "$100k - Above", value: "100000-10000000" },
  ],
};

const typeOptions = [
  { label: "Shortlet", value: "shortlet" },
  { label: "Rent", value: "rent" },
  { label: "Buy", value: "buy" },
  { label: "Land", value: "land" },
];

const bedBathOptions = [
  { label: "0 - 2", value: "0-2" },
  { label: "2 - 4", value: "2-5" },
  { label: "5 & Above", value: "5+" },
];

const getPropertyTypeFromPath = (pathname: string | null): PropertyType => {
  if (pathname?.includes("/buy")) return "buy";
  if (pathname?.includes("/rent")) return "rent";
  if (pathname?.includes("/sell")) return "sell";
  if (pathname?.includes("/shortlet")) return "shortlet";
  if (pathname?.includes("/land")) return "land";
  return "";
};

export default function PropertySearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    location: "",
    price: "",
    type: getPropertyTypeFromPath(pathname),
    bedBaths: "",
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const priceRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const bedBathRef = useRef<HTMLDivElement>(null);

  // Update type when route changes
  useEffect(() => {
    const defaultType = getPropertyTypeFromPath(pathname);
    setFilters((prev) => ({ ...prev, type: defaultType }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Reset searching state when path or params change
  useEffect(() => {
    setIsSearching(false);
  }, [pathname, searchParams]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        priceRef.current &&
        !priceRef.current.contains(event.target as Node) &&
        typeRef.current &&
        !typeRef.current.contains(event.target as Node) &&
        bedBathRef.current &&
        !bedBathRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset price when type changes (since different types have different price ranges)
  useEffect(() => {
    if (filters.type) {
      setFilters((prev) => ({ ...prev, price: "" }));
    }
  }, [filters.type]);

  const handleSearch = () => {
    setIsSearching(true);
    const { location, price, type, bedBaths } = filters;

    // Build query params only with filled values
    const queryParams = new URLSearchParams();

    if (location) queryParams.append("location", location);

    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      queryParams.append("minPrice", minPrice);
      queryParams.append("maxPrice", maxPrice);
    }

    if (type) {
      queryParams.append("listingType", type === "buy" ? "sale" : type);
    }

    if (bedBaths) {
      const [minBed] = bedBaths.split("-");
      queryParams.append("bedrooms", minBed === "4+" ? "4" : minBed);
    }

    const queryString = queryParams.toString();
    const targetUrl = `/search${queryString ? `?${queryString}` : ""}`;

    // Only push if the URL is different to avoid redundant reloads
    if (
      typeof window !== "undefined" &&
      window.location.pathname + window.location.search !== targetUrl
    ) {
      router.push(targetUrl);
    } else if (typeof window === "undefined") {
      router.push(targetUrl);
    }
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const getDisplayLabel = (key: keyof Filters) => {
    const value = filters[key];
    if (!value) return "Select";

    if (key === "price") {
      const options =
        priceOptionsByType[filters.type || "rent"] || priceOptionsByType.rent;
      return options.find((o) => o.value === value)?.label || "Select";
    }
    if (key === "type") {
      return typeOptions.find((o) => o.value === value)?.label || "Select";
    }
    if (key === "bedBaths") {
      return bedBathOptions.find((o) => o.value === value)?.label || "Select";
    }
    return value;
  };

  const currentPriceOptions =
    priceOptionsByType[filters.type || "rent"] || priceOptionsByType.rent;

  return (
    <div
      style={{
        background:
          "linear-gradient(129.42deg, rgba(255, 255, 255, 0.2) -11.83%, rgba(255, 255, 255, 0.3) 48.36%, rgba(255, 255, 255, 0.2) 107.36%)",

        backdropFilter: "blur(4px)",
        borderImageSlice: 1,
      }}
      className="w-full border-[#ffffff33] border-[2px] max-w-3xl rounded-xl  z-[1111111] mx-auto mt-3 p-4"
    >
      {/* Filter Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {/* Location Input */}
        <div>
          <label className="block text-white text-xs md:text-xl sm:text-sm  mb-1 sm:mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full  h-[3.2em] px-3 sm:px-4 py-4 sm:py-3 bg-white rounded-lg  sm:rounded-xl text-sm sm:text-base text-black placeholder-black"
          />
        </div>

        {/* Price Range Dropdown */}
        <div ref={priceRef} className="relative">
          <label className="block text-white text-xs  md:text-xl sm:text-sm  mb-1 sm:mb-2">
            Price Range
          </label>
          <button
            onClick={() => toggleDropdown("price")}
            className="w-full h-[3.2em] px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl text-left flex items-center justify-between text-sm sm:text-base"
          >
            <span
              className={`truncate ${
                filters.price ? "text-gray" : "text-gray-400"
              }`}
            >
              {getDisplayLabel("price")}
            </span>
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ml-1 ${
                openDropdown === "price" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="#8F8F8F"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openDropdown === "price" && (
            <div className="absolute top-full  left-0 right-0 mt-1 sm:mt-2 bg-white rounded-lg sm:rounded-xl  z-50 overflow-hidden">
              {currentPriceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange("price", option.value)}
                  className="w-full h-[3.2em] px-3 sm:px-4 py-2 sm:py-3   border-b border-gray last:border-b-0 flex items-center justify-between hover:bg-gray-50  text-sm sm:text-base"
                >
                  <span className="text-gray text-sm">{option.label}</span>
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      filters.price === option.value
                        ? "border-primary"
                        : "border-primary"
                    }`}
                  >
                    {filters.price === option.value && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Type Dropdown */}
        <div ref={typeRef} className="relative">
          <label className="block text-white md:text-xl text-xs sm:text-sm  mb-1 sm:mb-2">
            Type
          </label>
          <button
            onClick={() => toggleDropdown("type")}
            className="w-full h-[3.2em]   px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl text-left flex items-center justify-between text-sm sm:text-base"
          >
            <span
              className={`truncate ${
                filters.type ? "text-black" : "text-black"
              }`}
            >
              {getDisplayLabel("type")}
            </span>
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ml-1 ${
                openDropdown === "type" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="#8F8F8F"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openDropdown === "type" && (
            <div className="absolute top-full left-0 right-0 mt-1 sm:mt-2 bg-white rounded-lg sm:rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm sm:text-base">
                  <span className="text-gray">Select</span>
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      !filters.type ? "border-primary" : "border-primary"
                    }`}
                  >
                    {!filters.type && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              </div>
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange("type", option.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between   border-b border-gray last:border-b-0 text-sm sm:text-base"
                >
                  <span className="text-gray">{option.label}</span>
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      filters.type === option.value
                        ? "border-primary"
                        : "border-primary"
                    }`}
                  >
                    {filters.type === option.value && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bed/Baths Dropdown */}
        <div ref={bedBathRef} className="relative">
          <label className="block text-white md:text-xl text-xs sm:text-sm  mb-1 sm:mb-2">
            Bed/Baths
          </label>
          <button
            onClick={() => toggleDropdown("bedBaths")}
            className="w-full h-[3.2em] px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl text-left flex items-center justify-between text-sm sm:text-base"
          >
            <span
              className={`truncate ${
                filters.bedBaths ? "text-black" : "text-black"
              }`}
            >
              {getDisplayLabel("bedBaths")}
            </span>
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ml-1 ${
                openDropdown === "bedBaths" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="#8F8F8F"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openDropdown === "bedBaths" && (
            <div className="absolute top-full left-0 right-0 mt-1 sm:mt-2 bg-white rounded-lg sm:rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-3 sm:px-4 py-2 sm:py-2 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm sm:text-base">
                  <span className="text-gray">Select</span>
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      !filters.bedBaths ? "border-primary" : "border-primary"
                    }`}
                  >
                    {!filters.bedBaths && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              </div>
              {bedBathOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange("bedBaths", option.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between  border-b border-gray last:border-b-0  text-sm sm:text-base"
                >
                  <span className="text-gray">{option.label}</span>
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      filters.bedBaths === option.value
                        ? "border-primary"
                        : "border-primary"
                    }`}
                  >
                    {filters.bedBaths === option.value && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className="w-1/2 md:!w-[300px] bg-primary px-8 py-2 md:py-3 text-white !text-base md:!text-xl font-light !rounded-[5.7px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>
    </div>
  );
}
