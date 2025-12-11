"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";

interface FiltersDropdownProps {
  isOpen: boolean;
  userCountrys?: string;
  onClose: () => void;
  filters: {
    "home-type": string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    houseType: string;
    minPrice?: number;

    maxPrice?: number;
  };
  onFilterChange: (key: string, value: string | number) => void;
  onSearch: () => void;
  isSearching?: boolean;
}

const typeOptions = ["Shortlet", "Buy", "Rent", "Land"];
const bedBathOptions = ["Any", "0 - 2", "2 - 5", "5 & Above"];
const homeTypeOptions = ["Any", "Bungalow", "Penthouse", "Duplex"];

export default function FiltersDropdown({
  isOpen,
  onClose,
  filters,
  userCountrys,
  onFilterChange,
  onSearch,
  isSearching = false,
}: FiltersDropdownProps) {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    filters.minPrice || 500,
    filters.maxPrice || 5000,
  ]);
  const [minInput, setMinInput] = React.useState<string>("");
  const [maxInput, setMaxInput] = React.useState<string>("");
  const modalRef = React.useRef<HTMLDivElement>(null);
  const currencySymbol = userCountrys === "nigeria" ? "₦" : "$";
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      setPriceRange([filters.minPrice, filters.maxPrice]);
    }
  }, [filters.minPrice, filters.maxPrice]);

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    onFilterChange("minPrice", values[0]);
    onFilterChange("maxPrice", values[1]);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinInput(value);
    const numValue = Number.parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setPriceRange([numValue, priceRange[1]]);
      onFilterChange("minPrice", numValue);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxInput(value);
    const numValue = Number.parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setPriceRange([priceRange[0], numValue]);
      onFilterChange("maxPrice", numValue);
    }
  };

  const handleBedBathChange = (option: string) => {
    if (option === "Any") {
      onFilterChange("bedrooms", "");
      onFilterChange("bathrooms", "");
    } else if (option === "0 - 2") {
      onFilterChange("bedrooms", "0-2");
      onFilterChange("bathrooms", "0-2");
    } else if (option === "2 - 5") {
      onFilterChange("bedrooms", "2-5");
      onFilterChange("bathrooms", "2-5");
    } else {
      onFilterChange("bedrooms", "5+");
      onFilterChange("bathrooms", "5+");
    }
  };

  const getBedBathSelected = () => {
    if (filters.bedrooms === "" && filters.bathrooms === "") return "Any";
    if (filters.bedrooms === "0-2") return "0 - 2";
    if (filters.bedrooms === "2-5") return "2 - 5";
    if (filters.bedrooms === "5+") return "5 & Above";
    return "Any";
  };

  if (!isOpen) return null;

  const selectedType = filters["home-type"] || "buy";
  const selectedHouseType = filters.houseType || "";
  const selectedBedBath = getBedBathSelected();

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[1110]" onClick={onClose} />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed  md:pt-[4%] right-0 top-0 md:top-[2%] bottom-0 z-[1111] rounded-none md:rounded-none bg-[#ffffff] p-5 md:p-8 w-full md:max-w-[600px] lg:max-w-[600px] overflow-y-auto h-full"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-700 hover:text-gray-900 transition-colors p-1"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Type Filter - Segmented Pill Control */}
        <div className="mb-8   mt-[4rem] lg:mt-8 ">
          <div
            className="flex rounded-md p-1 border  border-[#8F8F8F]"
            style={{ backgroundColor: "#F9FAFB" }}
          >
            {typeOptions.map((option) => (
              <button
                key={option}
                onClick={() =>
                  onFilterChange("home-type", option.toLowerCase())
                }
                className={`flex-1 py-2.5 px-4 text-lg font-light rounded-md transition-all ${
                  selectedType === option.toLowerCase()
                    ? "text-white "
                    : "text-[#1E1E1E]  hover:text-gray-900"
                }`}
                style={{
                  backgroundColor:
                    selectedType === option.toLowerCase()
                      ? "#09858D"
                      : "transparent",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="-mx-5 md:-mx-8 w-screen  border-t border-[#8F8F8F] mb-6"></div>
        {/* Price Range Section */}
        <div className="mb-8">
          <h3 className="text-base font-medium md:text-lg text-black mb-8">
            Price range
          </h3>

          {/* Dual Slider */}

          <div className="px-1 mb-5">
            <Slider
              value={priceRange}
              min={0}
              max={10000}
              step={100}
              minStepsBetweenThumbs={1}
              onValueChange={handlePriceRangeChange}
              className="[&_[role=slider]]:border-1 [&_[role=slider]]:border-[#09858D] [&_[role=slider]]:bg-white [&_[role=slider]]:w-8 [&_[role=slider]]:h-8 [&>span:first-child]:h-[3px] [&>span:first-child]:bg-[#E5E5E5] [&>span>span]:bg-[#09858D]"
            />
          </div>

          {/* Price Range Labels */}
          <div className="flex justify-between font-light text-base text-[#8F8F8F] mb-4">
            <span>
              {currencySymbol}
              {priceRange[0]}
            </span>
            <span>
              {currencySymbol}
              {priceRange[1]}+
            </span>
          </div>

          {/* Min/Max Input Fields */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter min"
              value={minInput}
              onChange={handleMinInputChange}
              className="flex-1  w-[120px] md:w-full px-[0.8em] md:px-4 py-2 md:py-3 rounded-xl font-light border border-[#8F8F8F] text-base text-[#8F8F8F]  placeholder:text-[#8F8F8F] focus:outline-none focus:border-[#09858D] transition-colors"
            />
            <span className="text-[#8F8F8F] ">—</span>
            <input
              type="text"
              placeholder="Enter max"
              value={maxInput}
              onChange={handleMaxInputChange}
              className="flex-1 w-[120px] md:w-full px-[0.8em] md:px-4 py-2 md:py-3 rounded-xl font-light border border-[#8F8F8F] text-base text-[#8F8F8F]  placeholder:text-[#8F8F8F] focus:outline-none focus:border-[#09858D] transition-colors"
            />
          </div>
        </div>

        <div className="-mx-5 md:-mx-8 w-screen  border-t border-[#8F8F8F] mb-6"></div>

        {/* Bed/Baths Section - Hidden when Land is selected */}
        {selectedType !== "land" && (
          <div className="mb-8">
            <h3 className="text-base font-medium md:text-lg text-black mb-8">
              Bed/Baths
            </h3>
            <div
              className="flex rounded-md p-1 border  border-[#8F8F8F]"
              style={{ backgroundColor: "#F9FAFB" }}
            >
              {bedBathOptions.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleBedBathChange(option)}
                  className={`flex-1 py-2 px-2 text-sm md:text-lg font-light transition-all ${
                    index !== bedBathOptions.length - 1
                      ? "border-r border-[#E5E5E5] "
                      : ""
                  } ${
                    selectedBedBath === option
                      ? "text-white rounded-lg"
                      : "text-[#1E1E1E]  hover:text-gray-900"
                  }`}
                  style={{
                    backgroundColor:
                      selectedBedBath === option ? "#09858D" : "transparent",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="-mx-5 md:-mx-8 w-screen  border-t border-[#8F8F8F] mb-6"></div>

        {/* Home Type Section - Hidden when Land is selected */}
        {selectedType !== "land" && (
          <div className="mb-6">
            <h3 className="text-base font-medium md:text-lg text-black mb-8">
              Home Type
            </h3>
            <div
              className="flex rounded-lg px-2   py-2 border border-[#E5E5E5] overflow-hidden"
              style={{ backgroundColor: "#F9FAFB" }}
            >
              {homeTypeOptions.map((option, index) => (
                <button
                  key={option}
                  onClick={() =>
                    onFilterChange(
                      "houseType",
                      option === "Any" ? "" : option.toLowerCase()
                    )
                  }
                  className={`flex-1 py-2 px-2 text-lg font-light transition-all ${
                    index !== homeTypeOptions.length - 1
                      ? " border-[#E5E5E5]"
                      : ""
                  } ${
                    (option === "Any" && selectedHouseType === "") ||
                    selectedHouseType === option.toLowerCase()
                      ? "text-white rounded-lg"
                      : "text-[#1E1E1E]  hover:text-gray-900"
                  }`}
                  style={{
                    backgroundColor:
                      (option === "Any" && selectedHouseType === "") ||
                      selectedHouseType === option.toLowerCase()
                        ? "#09858D"
                        : "transparent",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Done Button */}
        <button
          onClick={() => {
            onSearch();
            onClose(); // close modal after search
          }}
          disabled={isSearching}
          className="w-full py-3 bg-[#09858D] text-white rounded-lg font-medium hover:bg-[#087a81] transition-colors disabled:opacity-70"
        >
          {isSearching ? "Searching..." : "Done"}
        </button>
      </div>
    </>
  );
}
