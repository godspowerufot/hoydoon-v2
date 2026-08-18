"use client";

import { ChevronDown, Loader2, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiltersDropdown } from "@/app/components/common/filters";
import { getLocationRegion } from "@/utils/lib/index";
import {
  COUNTRY_FILTER_OPTIONS,
  COUNTRY_LABELS,
  HOME_TYPE_OPTIONS,
  TYPE_FILTER_OPTIONS_BASE,
  getPriceOptions,
  type SearchFiltersState,
} from "./searchUtils";

const filterBtn =
  "inline-flex h-10 items-center gap-2 rounded-full border border-[#ececec] bg-white px-4 text-sm font-medium text-[#2a2a33] transition-colors hover:border-primary hover:text-primary";

const dropdownPanel =
  "absolute left-0 top-[calc(100%+0.5rem)] z-50 min-w-[220px] overflow-hidden rounded-2xl border border-[#ececec] bg-white py-1 shadow-[0_12px_40px_rgba(17,17,17,0.12)] md:min-w-[280px]";

const dropdownItem =
  "flex w-full items-center justify-between px-4 py-3 text-left text-sm text-[#2a2a33] transition-colors hover:bg-[#f7f7f8]";

type SearchFiltersBarProps = {
  filters: SearchFiltersState;
  onFiltersChange: (filters: SearchFiltersState) => void;
  onSearch: (nextFilters?: SearchFiltersState) => void;
  showMap: boolean;
  setShowMap: (value: boolean) => void;
};

function FilterDropdown({
  label,
  value,
  open,
  onToggle,
  onClose,
  children,
}: {
  label: string;
  value: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <div className="relative" ref={ref}>
      <button type="button" className={filterBtn} onClick={onToggle}>
        <span className="max-w-[120px] truncate">{value || label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#8a8a8a] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? <div className={dropdownPanel}>{children}</div> : null}
    </div>
  );
}

export default function SearchFiltersBar({
  filters,
  onFiltersChange,
  onSearch,
  showMap,
  setShowMap,
}: SearchFiltersBarProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showAllFilters, setShowAllFilters] = useState(false);

  useEffect(() => {
    const getUserLocation = async () => {
      if (userCountry) return;
      const { country } = await getLocationRegion();
      if (country) setUserCountry(country);
    };
    getUserLocation();
  }, [userCountry]);

  const effectiveCountry = filters.region || userCountry;

  const priceOptions = useMemo(
    () => getPriceOptions(effectiveCountry),
    [effectiveCountry]
  );

  const typeFilterOptions = useMemo(() => {
    if (effectiveCountry !== "somalia") {
      return [...TYPE_FILTER_OPTIONS_BASE, { label: "Shortlet", value: "shortlet" }];
    }
    return TYPE_FILTER_OPTIONS_BASE;
  }, [effectiveCountry]);

  const typeOptions = useMemo(() => {
    const base = ["Buy", "Rent", "Land"];
    if (effectiveCountry !== "somalia") return [...base, "shortlet"];
    return base;
  }, [effectiveCountry]);

  const selectedType =
    typeOptions.find((type) => filters["home-type"] === type.toLowerCase()) ||
    "Rent";

  const priceOptionKey = selectedType as keyof ReturnType<typeof getPriceOptions>;

  const updateFilter = (filterName: string, value: string | number) => {
    onFiltersChange({ ...filters, [filterName]: String(value) });
  };

  const applyCountryFilter = (region: string) => {
    const countryChanged = filters.region !== region;
    const next: SearchFiltersState = {
      ...filters,
      region,
      price: countryChanged ? "" : filters.price,
      "home-type":
        region === "somalia" && filters["home-type"] === "shortlet"
          ? "rent"
          : filters["home-type"],
    };
    onFiltersChange(next);
    onSearch(next);
    setOpenDropdown(null);
  };

  const getCountryLabel = () => {
    if (!filters.region) return "All countries";
    return COUNTRY_LABELS[filters.region] || "Country";
  };

  const getPriceLabel = () => {
    if (!filters.price) return "Price";
    const option = priceOptions[priceOptionKey]?.find(
      (o) => o.value === filters.price
    );
    return option ? option.label : "Price";
  };

  const runSearch = async () => {
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    onSearch(filters);
    setIsSearching(false);
  };

  return (
    <div className="rounded-2xl border border-[#ececec] bg-white p-4 shadow-[0_8px_24px_rgba(17,17,17,0.04)] md:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown
            label="Country"
            value={getCountryLabel()}
            open={openDropdown === "country"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "country" ? null : "country")
            }
            onClose={() => setOpenDropdown(null)}
          >
            {COUNTRY_FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value || "all"}
                type="button"
                className={`${dropdownItem} ${filters.region === opt.value ? "bg-[#f3fbfb] text-primary" : ""}`}
                onClick={() => applyCountryFilter(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </FilterDropdown>

          <FilterDropdown
            label="Type"
            value={
              filters["home-type"]
                ? filters["home-type"].charAt(0).toUpperCase() +
                  filters["home-type"].slice(1)
                : "Type"
            }
            open={openDropdown === "type"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "type" ? null : "type")
            }
            onClose={() => setOpenDropdown(null)}
          >
            {typeFilterOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${dropdownItem} ${filters["home-type"] === opt.value ? "bg-[#f3fbfb] text-primary" : ""}`}
                onClick={() => {
                  updateFilter("home-type", opt.value);
                  setOpenDropdown(null);
                }}
              >
                {opt.label}
              </button>
            ))}
          </FilterDropdown>

          <FilterDropdown
            label="Price"
            value={getPriceLabel()}
            open={openDropdown === "price"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "price" ? null : "price")
            }
            onClose={() => setOpenDropdown(null)}
          >
            {(priceOptions[priceOptionKey] || []).map((opt) => (
              <button
                key={opt.value || "any"}
                type="button"
                className={`${dropdownItem} ${filters.price === opt.value ? "bg-[#f3fbfb] text-primary" : ""}`}
                onClick={() => {
                  updateFilter("price", opt.value);
                  setOpenDropdown(null);
                }}
              >
                {opt.label}
              </button>
            ))}
          </FilterDropdown>

          <FilterDropdown
            label="Bed/Baths"
            value={
              filters.bedBaths === "0-2"
                ? "0 - 2"
                : filters.bedBaths === "2-4"
                  ? "2 - 4"
                  : filters.bedBaths === "5+"
                    ? "5 & Above"
                    : "Bed/Baths"
            }
            open={openDropdown === "bedbath"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "bedbath" ? null : "bedbath")
            }
            onClose={() => setOpenDropdown(null)}
          >
            {[
              { label: "0 - 2", value: "0-2" },
              { label: "2 - 4", value: "2-4" },
              { label: "5 & Above", value: "5+" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${dropdownItem} ${filters.bedBaths === opt.value ? "bg-[#f3fbfb] text-primary" : ""}`}
                onClick={() => {
                  updateFilter("bedBaths", opt.value);
                  setOpenDropdown(null);
                }}
              >
                {opt.label}
              </button>
            ))}
          </FilterDropdown>

          <div className="relative hidden md:block">
            <FilterDropdown
              label="House type"
              value={filters.houseType || "House type"}
              open={openDropdown === "house"}
              onToggle={() =>
                setOpenDropdown(openDropdown === "house" ? null : "house")
              }
              onClose={() => setOpenDropdown(null)}
            >
              {HOME_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value || "any"}
                  type="button"
                  className={`${dropdownItem} ${filters.houseType === opt.value ? "bg-[#f3fbfb] text-primary" : ""}`}
                  onClick={() => {
                    updateFilter("houseType", opt.value);
                    setOpenDropdown(null);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </FilterDropdown>
          </div>

          <div className="relative">
            <button
              type="button"
              className={filterBtn}
              onClick={() => setShowAllFilters(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              All filters
            </button>
            {showAllFilters ? (
              <FiltersDropdown
                isOpen={showAllFilters}
                onClose={() => setShowAllFilters(false)}
                filters={filters}
                userCountrys={effectiveCountry || undefined}
                onFilterChange={updateFilter}
                onSearch={() => {
                  onSearch(filters);
                  setShowAllFilters(false);
                }}
                isSearching={isSearching}
              />
            ) : null}
          </div>

          <button
            type="button"
            onClick={runSearch}
            disabled={isSearching}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-[#07757c] disabled:opacity-60"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>

        <div
          className="inline-flex rounded-full border border-[#ececec] bg-[#f7f7f8] p-1"
          role="tablist"
          aria-label="Results view"
        >
          {(["List", "Map"] as const).map((option) => {
            const active = (showMap ? "Map" : "List") === option;
            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setShowMap(option === "Map")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-white text-primary shadow-sm"
                    : "text-[#5c5c66] hover:text-[#2a2a33]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
