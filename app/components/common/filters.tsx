"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Loader2, X } from "lucide-react";
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

const TYPE_OPTIONS = ["Buy", "Rent", "Land", "Shortlet"];
const BED_BATH_OPTIONS = ["Any", "0 - 2", "2 - 5", "5 & Above"];
const HOME_TYPE_OPTIONS = ["Any", "Bungalow", "Penthouse", "Duplex"];

const fieldClass =
  "w-full rounded-2xl border border-[#ececec] bg-[#f7f7f8] px-4 py-3 text-sm text-[#2a2a33] outline-none transition-colors focus:border-primary focus:bg-white md:text-base";

const sectionLabelClass =
  "text-xs font-semibold uppercase tracking-[0.18em] text-primary";

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (option: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selected
                ? "bg-primary text-white"
                : "border border-[#ececec] bg-white text-[#5c5c66] hover:border-primary hover:text-primary"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function FiltersDropdown({
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
  const [minInput, setMinInput] = React.useState("");
  const [maxInput, setMaxInput] = React.useState("");
  const modalRef = React.useRef<HTMLDivElement>(null);
  const currencySymbol = userCountrys === "nigeria" ? "₦" : "$";

  const typeOptions = React.useMemo(() => {
    if (userCountrys === "somalia") {
      return TYPE_OPTIONS.filter((option) => option !== "Shortlet");
    }
    return TYPE_OPTIONS;
  }, [userCountrys]);

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
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
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
    onFilterChange("price", `${values[0]}-${values[1]}`);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinInput(value);
    const numValue = Number.parseInt(value, 10);
    if (!Number.isNaN(numValue) && numValue >= 0) {
      setPriceRange([numValue, priceRange[1]]);
      onFilterChange("minPrice", numValue);
      onFilterChange("price", `${numValue}-${priceRange[1]}`);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxInput(value);
    const numValue = Number.parseInt(value, 10);
    if (!Number.isNaN(numValue) && numValue >= 0) {
      setPriceRange([priceRange[0], numValue]);
      onFilterChange("maxPrice", numValue);
      onFilterChange("price", `${priceRange[0]}-${numValue}`);
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

  const handleClearAll = () => {
    onFilterChange("home-type", "");
    onFilterChange("price", "");
    onFilterChange("bedrooms", "");
    onFilterChange("bathrooms", "");
    onFilterChange("houseType", "");
    onFilterChange("minPrice", 500);
    onFilterChange("maxPrice", 5000);
    setPriceRange([500, 5000]);
    setMinInput("");
    setMaxInput("");
  };

  if (!isOpen) return null;

  const selectedType = filters["home-type"] || "rent";
  const selectedHouseType = filters.houseType || "";
  const selectedBedBath = getBedBathSelected();

  const selectedTypeLabel =
    typeOptions.find((option) => option.toLowerCase() === selectedType) ||
    "Rent";

  const modal = (
    <>
      <div
        className="fixed inset-0 z-[1110] bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filters-dialog-title"
        className="fixed inset-y-0 right-0 z-[1111] flex w-full max-w-full flex-col bg-white shadow-[0_20px_60px_rgba(17,17,17,0.18)] sm:max-w-[480px]"
      >
        <div className="border-b border-[#ececec] bg-[#f3fbfb] px-5 py-5 md:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={sectionLabelClass}>Search</p>
              <h2
                id="filters-dialog-title"
                className="mt-1 font-heading text-xl font-semibold text-[#111] md:text-2xl"
              >
                All filters
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#5c5c66]">
                Refine results by type, price, beds, and property style.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ececec] bg-white text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
              aria-label="Close filters"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 md:px-6">
          <section className="mb-8">
            <h3 className={sectionLabelClass}>Listing type</h3>
            <div className="mt-3">
              <SegmentedControl
                options={typeOptions}
                value={selectedTypeLabel}
                onChange={(option) =>
                  onFilterChange("home-type", option.toLowerCase())
                }
              />
            </div>
          </section>

          <section className="mb-8 border-t border-[#ececec] pt-8">
            <h3 className={sectionLabelClass}>Price range</h3>
            <p className="mt-2 text-sm text-[#5c5c66]">
              Drag the slider or enter a min and max amount.
            </p>

            <div className="mt-6 px-1">
              <Slider
                value={priceRange}
                min={0}
                max={10000}
                step={100}
                minStepsBetweenThumbs={1}
                onValueChange={handlePriceRangeChange}
                className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-primary [&_[role=slider]]:bg-white [&>span:first-child]:h-1.5 [&>span:first-child]:rounded-full [&>span:first-child]:bg-[#ececec] [&>span>span]:bg-primary"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-sm font-medium text-[#2a2a33]">
              <span>
                {currencySymbol}
                {priceRange[0].toLocaleString()}
              </span>
              <span>
                {currencySymbol}
                {priceRange[1].toLocaleString()}+
              </span>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Min"
                value={minInput}
                onChange={handleMinInputChange}
                className={fieldClass}
              />
              <span className="text-sm text-[#8a8a8a]">to</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Max"
                value={maxInput}
                onChange={handleMaxInputChange}
                className={fieldClass}
              />
            </div>
          </section>

          {selectedType !== "land" ? (
            <>
              <section className="mb-8 border-t border-[#ececec] pt-8">
                <h3 className={sectionLabelClass}>Bed / baths</h3>
                <div className="mt-3">
                  <SegmentedControl
                    options={BED_BATH_OPTIONS}
                    value={selectedBedBath}
                    onChange={handleBedBathChange}
                  />
                </div>
              </section>

              <section className="mb-2 border-t border-[#ececec] pt-8">
                <h3 className={sectionLabelClass}>Home type</h3>
                <div className="mt-3">
                  <SegmentedControl
                    options={HOME_TYPE_OPTIONS}
                    value={
                      selectedHouseType
                        ? HOME_TYPE_OPTIONS.find(
                            (option) =>
                              option.toLowerCase() ===
                                selectedHouseType.toLowerCase() ||
                              option === selectedHouseType
                          ) || "Any"
                        : "Any"
                    }
                    onChange={(option) =>
                      onFilterChange(
                        "houseType",
                        option === "Any" ? "" : option
                      )
                    }
                  />
                </div>
              </section>
            </>
          ) : null}
        </div>

        <div className="border-t border-[#ececec] bg-white px-5 py-4 md:px-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-[#ececec] text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => {
                onSearch();
                onClose();
              }}
              disabled={isSearching}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-[#07757c] disabled:opacity-60"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching…
                </>
              ) : (
                "Show results"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  if (typeof document === "undefined") return null;

  return createPortal(modal, document.body);
}
