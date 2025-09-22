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
import { PropertySkeleton } from "@/app/components/Loader";
const Breadcrumb = ({ showMap, setShowMap }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  // Add this state

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showHomeTypeDropdown, setShowHomeTypeDropdown] = useState(false);

  const [showAllFiltersDropdown, setShowAllFiltersDropdown] = useState(false);
  const [showBedBathDropdown, setShowBedBathDropdown] = useState(false);
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
  const modalRef = useRef(null);
  const bedBathRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const homeTypeDropdownRef = useRef(null);

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
      { label: "$100k - Above", value: "100000-10000000" },
    ],
  };

  const typeOptions = ["Buy", "Rent", "Land"];
  const selectedType =
    typeOptions.find((type) => filters["home-type"] === type.toLowerCase()) ||
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

    // Always map listingType for API
    const typeToApiValue = {
      buy: "sale",
      rent: "rent",
      land: "land",
    };
    if (filters["home-type"]) {
      newParams.set(
        "listingType",
        typeToApiValue[filters["home-type"]] || filters["home-type"]
      );
    }

    // Handle Other Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (key === "home-type") return; // already handled above
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

    setFilters({
      price: "",
      "home-type": "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      houseType: "",
    });
    setBedValue("");
    setBathValue("");
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

  return (
    <div className="lg:pt-[2.3rem]  -mb-[2.5rem] lg:mb-0    flex-col lg:flex-row lg:flex justify-between w-full">
      {/* Left Section: Filters */}
      <div className="flex items-center   p-[1rem] lg:p-0   gap-1 lg:gap-2">
        <button
          onClick={() => setShowAllFiltersDropdown(true)}
          className="px-2 lg:px-4 h-[37px] text-xs  lg:h-fit lg:text-sm lg:py-[6px] border rounded-[3px] text-[#8F8F8F] border-[#8F8F8F] flex items-center gap-2"
        >
          <Image
            src="/allfilter.png"
            alt="Filter"
            width={16}
            height={15}
            className="w-4 h-4 lg:w-[16px] lg:h-[16px]"
          />{" "}
          All Filters
        </button>
        {showAllFiltersDropdown && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[1110]"></div>

            <div className="absolute bg-white top-[20%] z-[1111] rounded-xl p-4 w-full max-w-[14rem] overflow-y-auto h-[400px] no-scrollbar">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm text-gray-600 font-[400]">Filters</h2>
                <button
                  className="text-sm text-primary font-[400]"
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
                      <span className="text-[12px] text-gray font-[400]">
                        {option}
                      </span>
                      <input
                        type="radio"
                        name="type"
                        className="w-3 h-3 accent-primary"
                        checked={filters["home-type"] === option.toLowerCase()}
                        onChange={() =>
                          handleFilterChange("home-type", option.toLowerCase())
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* price secction */}
              <div className="mb-4">
                <h3 className="text-sm text-gray-600 font-[400] mb-2">Price</h3>
                <ul className="flex flex-col gap-1.5">
                  {priceOptions[selectedType].map((option) => (
                    <li
                      key={option.value}
                      className="flex justify-between items-center border-b border-gray-300 pb-1.5"
                    >
                      <span className="text-[12px] text-gray font-[400]">
                        {option.label}
                      </span>
                      <input
                        type="radio"
                        name="price"
                        className="w-3 h-3 accent-primary"
                        checked={filters.price === option.value}
                        onChange={() =>
                          handleFilterChange("price", option.value)
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {/* Bed/Baths Filter */}
              {filters["home-type"] !== "land" && (
                <div className="mb-4">
                  <h3 className="text-sm text-gray-600 font-[400] mb-2">
                    Bed/Baths
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {["Any", "2–4", "5+"].map((option) => (
                      <li
                        key={option}
                        className="flex justify-between items-center border-b border-gray-300 pb-1.5"
                      >
                        <span className="text-[12px] text-gray font-[400]">
                          {option}
                        </span>
                        <input
                          type="radio"
                          name="bed-baths"
                          className="w-3 h-3 accent-primary"
                          checked={
                            (option === "Any" &&
                              filters.bedrooms === "" &&
                              filters.bathrooms === "") ||
                            (option === "2–4" &&
                              filters.bedrooms === "2" &&
                              filters.bathrooms === "2") ||
                            (option === "5+" &&
                              filters.bedrooms === "5+" &&
                              filters.bathrooms === "5+")
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
              )}

              {/* house tpe */}
              {filters["home-type"] !== "land" && (
                <div className="mb-4">
                  <h3 className="text-sm text-gray-600 font-[400] mb-2">
                    House type
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {["Bungalow", "Duplex", "Penthouse"].map((option) => (
                      <li
                        key={option}
                        className="flex justify-between items-center border-b border-gray-300 pb-1.5"
                      >
                        <span className="text-[12px] text-gray font-[400]">
                          {option}
                        </span>
                        <input
                          type="radio"
                          name="house-type"
                          className="w-3 h-3 accent-primary"
                          checked={filters.houseType === option.toLowerCase()}
                          onChange={() =>
                            handleFilterChange(
                              "houseType",
                              option.toLowerCase()
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* add a price section radion butt */}
              <div className=" hidden ">
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
                        checked={
                          filters.price === (option === "Any" ? "" : option)
                        }
                        onChange={() =>
                          handleFilterChange(
                            "price",
                            option === "Any" ? "" : option
                          )
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {["Price", "Type", "Bed/Baths"].map((option) => {
          const paramKey =
            option === "Type"
              ? "home-type"
              : option.toLowerCase().replace(/\s+/g, "-");
          const selectedValue = searchParams.get(paramKey) || "";

          if (option === "Bed/Baths") {
            return (
              <div className="relative" key={option}>
                <button
                  onClick={() => setShowBedBathDropdown(!showBedBathDropdown)}
                  className="border border-[#8F8F8F] bg-transparent text-[12.5px] font-light rounded-md text-[#8F8F8F] p-2 lg:pr-6 appearance-none flex items-center gap-2"
                >
                  {bedValue || bathValue
                    ? `${bedValue} Beds, ${bathValue} Baths`
                    : "Bed/Baths"}
                  <Image
                    width={500}
                    height={500}
                    src="/arrow-down.png"
                    alt="Dropdown"
                    className="w-3 h-2 ml-2 pointer-events-none"
                  />
                </button>
                {showBedBathDropdown && (
                  <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1110]"></div>
                    <div
                      className="absolute z-[11111111]  lg:top-[110%] left-0 bg-white shadow-md border border-gray-200 rounded-md p-4 w-[12rem] mt-7 lg:mt-0 lg:w-64"
                      ref={bedBathRef}
                    >
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
                  </>
                )}
              </div>
            );
          }

          // Modal for "Price" and "Home type" (Buy)
          const dropdownState =
            option === "Price" ? showPriceDropdown : showHomeTypeDropdown;
          const setDropdownState =
            option === "Price" ? setShowPriceDropdown : setShowHomeTypeDropdown;

          const options =
            option === "Price"
              ? [
                  { label: "$0–200", value: "0-200" },
                  { label: "$200–500", value: "200-500" },
                  { label: "$500–800", value: "500-800" },
                  { label: "$800+", value: "800-5000000" },
                ]
              : [
                  { label: "Rent", value: "rent" },
                  { label: "Buy", value: "buy" },
                  { label: "Land", value: "land" },
                ];

          return (
            <div className="relative" key={option}>
              <button
                type="button"
                className={`border border-[#8F8F8F] bg-transparent text-[12.5px] font-light rounded-md text-[#8F8F8F] p-2 lg:pr-2 flex items-center gap-2 ${
                  option == "Price" ? "hidden lg:flex" : ""
                }`}
                onClick={() => setDropdownState(!dropdownState)}
              >
                <span className="block lg:hidden">
                  {option === "Home type"
                    ? "Buy"
                    : options.find((o) => o.value === selectedValue)?.label ||
                      option}
                </span>
                <span className="hidden lg:block">
                  {option === "Home type"
                    ? "Home type"
                    : options.find((o) => o.value === selectedValue)?.label ||
                      option}
                </span>
                <Image
                  width={500}
                  height={300}
                  src="/arrow-down.png"
                  alt="Dropdown"
                  className="w-3 h-2 ml-2 pointer-events-none"
                />
              </button>
              {dropdownState && (
                <>
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-[1110]"></div>{" "}
                  <div
                    className="absolute z-[111111] left-[23%] top-[14%] lg:top-[110%] lg:left-0 bg-white  border border-[#8F8F8F] rounded-md px-2  mt-2 lg:mt-0 lg:w-[200px]"
                    ref={
                      option === "Price"
                        ? priceDropdownRef
                        : homeTypeDropdownRef
                    }
                  >
                    <div className="flex justify-between mb-2"></div>
                    <ul className="flex flex-col gap-2">
                      {option === "Price" &&
                        priceOptions[selectedType].map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded ${
                              selectedValue === opt.value
                                ? "bg-primary text-white"
                                : ""
                            } group`}
                          >
                            <input
                              type="radio"
                              name={paramKey}
                              value={opt.value}
                              checked={selectedValue === opt.value}
                              onChange={() => {
                                handleFilterChange(paramKey, opt.value);
                                setDropdownState(false);
                              }}
                              className={`w-4 h-4 accent-primary group-hover:accent-primary`}
                            />
                            <span className="text-sm">{opt.label}</span>
                          </label>
                        ))}
                      {option === "Type" &&
                        [
                          { label: "Rent", value: "rent" },
                          { label: "Buy", value: "buy" },
                          { label: "Land", value: "land" },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded ${
                              selectedValue === opt.value
                                ? "bg-primary text-white"
                                : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name={paramKey}
                              value={opt.value}
                              checked={selectedValue === opt.value}
                              onChange={() => {
                                handleFilterChange(paramKey, opt.value);
                                setDropdownState(false);
                              }}
                              className={`w-4 h-4 accent-primary`}
                            />
                            <span className="text-sm">{opt.label}</span>
                          </label>
                        ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          );
        })}

        <button
          onClick={async () => {
            setIsSearching(true);
            handleSearchClick();
            setIsSearching(false);
          }}
          className="px-4 py-[6px] bg-primary text-base text-white font-light rounded-md flex items-center justify-center"
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
      <div className=" hidden lg:flex w-[12rem] bg-[#F9FAFB] gap-[10px] p-3   border-[#8F8F8F]   justify-between border-solid border-[0.5px] items-center font-base rounded-[5px] lg:p-[3px]  relative">
        {["List", "Map"].map((option, index) => (
          <React.Fragment key={index}>
            <button
              className={`px-4 py-1 gap-3 flex  items-center justify-center w-[4.5rem] text-[16px] rounded-md transition-all duration-300 ${
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

  useEffect(() => {
    if (!isAllloading && allListings) {
      const firstThreeListings = allListings.listings;
      const flatListings = flattenListings(firstThreeListings);
      // Filter listings with valid coordinates
      const listingsWithCoords = flatListings.filter(
        (item) =>
          item?.item?.coordinate?.latitude && item?.item?.coordinate?.longitude
      );
      const images = flatListings.flatMap((item) => item.imageUrls || []);
      setImageUrls(images);

      setCoordinates(listingsWithCoords.map((item) => item.item.coordinate)); // set all coordinates for the map
      setDisplayListings(listingsWithCoords); // only show listings with coordinates
      setTotalPages(allListings.totalPages || 1);
      setCurrentPage(Number(searchParams.get("page")) || 1);
    }
    console.log("coordinae", allListings?.listings?.imageUrls);
  }, [allListings, isAllloading]);

  //  if (isAllloading) {
  //    return (
  //      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
  //        <div className="loader border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
  //      </div>
  //    );
  //  }
  return (
    <div className="lg:mt-[4rem] mt-[5rem] 2xl:mt-[3rem] flex-col flex justify-center items-center max-w-[1200px]">
      <Breadcrumb showMap={showMap} setShowMap={setShowMap} />'
      <div className="flex items-start p-4 lg:p-0  lg:mt-[1rem] w-full lg:justify-between flex-col  gap-3 lg:gap-0 lg:flex-row   ">
        <h1 className="text-black  hidden lg:block font-semibold text-2xl lg:text-4xl">
          All Real-estate & Homes for Sale
        </h1>
        <h1 className="text-black lg:hidden font-semibold text-2xl lg:text-4xl">
          All Homes for Sale
        </h1>
        <div className="text-gray-600  fex-end lg:-ml-[2rem] 2xl:ml-0 text-sm flex items-center space-x-4">
          <span className="flex gap-2">
            {displayListings.slice(0, 7).length}{" "}
            <p className="font-[300] text-gray"> of</p>
            {displayListings.length} Homes
          </span>
          <span className="text-black font-[400] flex gap-2  justify-center items-center cursor-pointer">
            Sort: <p className="text-primary"> New listings </p>{" "}
            <Image
              width={500}
              height={300}
              src="/arrow-down.png"
              alt="Dropdown"
              className="w-3 h-2   pointer-events-none"
            />
          </span>
        </div>
      </div>
      <div className="w-screen  lg:my-[1rem]   h-[2px] bg-[#D9D9D9] " />
      {showMap ? (
        <MapComponent coordinates={coordinates} />
      ) : (
        <>
          {isAllloading && (
            <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          )}
          {displayListings.length === 0 ? (
            <p className="text-gray-600 text-center mt-6">
              No listings found for your search.
            </p>
          ) : (
            <div className=" grid     grid-cols-1 md:grid-cols-3 gap-4 lg:gap-[1rem] mt-[1.5rem] lg:mt-[1rem]  p-5 lg:p-0 place-items-center">
              {[...displayListings].map((items, index) => (
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
                    "No description available for   ... click outside,click on any should  this property."
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
          <Pagination
            totalPages={totalPages}
            display={displayListings}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {/* second div layout  */}
    </div>
  );
};

export default page;
