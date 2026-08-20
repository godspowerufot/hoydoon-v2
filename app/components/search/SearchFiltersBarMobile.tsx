"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Loader2, SlidersHorizontal } from "lucide-react";
import { getLocationRegion } from "@/utils/lib/index";
import MobileAllFiltersSheet from "./MobileAllFiltersSheet";
import MobileFilterSheet, { SheetOption } from "./MobileFilterSheet";
import {
  COUNTRY_FILTER_OPTIONS,
  COUNTRY_LABELS,
  HOME_TYPE_OPTIONS,
  TYPE_FILTER_OPTIONS_BASE,
  getPriceFilterLabel,
  getPriceOptionKey,
  getPriceOptions,
  type SearchFiltersState,
} from "./searchUtils";

type SearchFiltersBarMobileProps = {
  filters: SearchFiltersState;
  onFiltersChange: (filters: SearchFiltersState) => void;
  onSearch: (nextFilters?: SearchFiltersState) => void;
  showMap: boolean;
  setShowMap: (value: boolean) => void;
};

type ActiveSheet = "country" | "price" | "bedbath" | "house" | null;

const chipBase =
  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors";

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${chipBase} ${
        active
          ? "border-primary bg-[#ecfafa] text-primary"
          : "border-[#ececec] bg-white text-[#2a2a33]"
      }`}
    >
      <span className="max-w-[8.5rem] truncate">{label}</span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
    </button>
  );
}

export default function SearchFiltersBarMobile({
  filters,
  onFiltersChange,
  onSearch,
  showMap,
  setShowMap,
}: SearchFiltersBarMobileProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);
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

  const priceOptionKey = getPriceOptionKey(filters["home-type"] || "rent");
  const currentPriceOptions = priceOptions[priceOptionKey] ?? priceOptions.Rent ?? [];

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
    setActiveSheet(null);
  };

  const getCountryLabel = () => {
    if (!filters.region) return "Country";
    return COUNTRY_LABELS[filters.region] || "Country";
  };

  const getPriceLabel = () =>
    getPriceFilterLabel(
      filters.price,
      priceOptions,
      filters["home-type"] || "rent",
      effectiveCountry
    );

  const getBedBathLabel = () => {
    if (filters.bedBaths === "0-2") return "0–2 beds";
    if (filters.bedBaths === "2-4") return "2–4 beds";
    if (filters.bedBaths === "5+") return "5+ beds";
    return "Beds";
  };

  const activeFilterCount = [
    filters.region,
    filters.price,
    filters.bedBaths,
    filters.houseType,
  ].filter(Boolean).length;

  const runSearch = async () => {
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    onSearch(filters);
    setIsSearching(false);
  };

  const selectListingType = (value: string) => {
    const next = { ...filters, "home-type": value };
    onFiltersChange(next);
    onSearch(next);
  };

  return (
    <div className="space-y-3 md:hidden">
      {/* Buy / Rent / Land tabs — Zillow-style */}
      <div
        className="flex gap-1 overflow-x-auto rounded-full bg-[#ececec]/80 p-1 hide-scrollbar"
        role="tablist"
        aria-label="Listing type"
      >
        {typeFilterOptions.map((opt) => {
          const active = filters["home-type"] === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectListingType(opt.value)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                active
                  ? "bg-white text-[#111] shadow-sm"
                  : "text-[#5c5c66]"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Horizontal filter chips — Redfin-style scroll row */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 hide-scrollbar">
        <FilterChip
          label={getCountryLabel()}
          active={Boolean(filters.region)}
          onClick={() => setActiveSheet("country")}
        />
        <FilterChip
          label={getPriceLabel()}
          active={Boolean(filters.price)}
          onClick={() => setActiveSheet("price")}
        />
        <FilterChip
          label={getBedBathLabel()}
          active={Boolean(filters.bedBaths)}
          onClick={() => setActiveSheet("bedbath")}
        />
        <FilterChip
          label={filters.houseType || "Home type"}
          active={Boolean(filters.houseType)}
          onClick={() => setActiveSheet("house")}
        />
        <button
          type="button"
          onClick={() => setShowAllFilters(true)}
          className={`${chipBase} border-[#2a2a33] bg-[#2a2a33] text-white`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          Filters
          {activeFilterCount > 0 ? (
            <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
              {activeFilterCount}
            </span>
          ) : null}
        </button>
      </div>

      {/* Search + List/Map */}
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          onClick={runSearch}
          disabled={isSearching}
          className="inline-flex h-12 min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-white disabled:opacity-60"
        >
          {isSearching ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching
            </>
          ) : (
            "Search homes"
          )}
        </button>
        <div
          className="inline-flex h-12 shrink-0 items-center rounded-full border border-[#ececec] bg-white p-1"
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
                className={`inline-flex h-full items-center rounded-full px-4 text-sm font-semibold transition-colors ${
                  active ? "bg-primary text-white" : "text-[#5c5c66]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom sheets */}
      <MobileFilterSheet
        open={activeSheet === "country"}
        title="Country"
        onClose={() => setActiveSheet(null)}
      >
        <div className="space-y-1">
          {COUNTRY_FILTER_OPTIONS.map((opt) => (
            <SheetOption
              key={opt.value || "all"}
              label={opt.label}
              selected={filters.region === opt.value}
              onSelect={() => applyCountryFilter(opt.value)}
            />
          ))}
        </div>
      </MobileFilterSheet>

      <MobileFilterSheet
        open={activeSheet === "price"}
        title="Price"
        onClose={() => setActiveSheet(null)}
      >
        <div className="space-y-1">
          {currentPriceOptions.length > 0 ? (
            currentPriceOptions.map((opt) => (
              <SheetOption
                key={opt.value || "any"}
                label={opt.label}
                selected={filters.price === opt.value}
                onSelect={() => {
                  updateFilter("price", opt.value);
                  setActiveSheet(null);
                  onSearch({ ...filters, price: opt.value });
                }}
              />
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-[#5c5c66]">
              No price ranges available for this listing type.
            </p>
          )}
        </div>
      </MobileFilterSheet>

      <MobileFilterSheet
        open={activeSheet === "bedbath"}
        title="Beds & baths"
        onClose={() => setActiveSheet(null)}
      >
        <div className="space-y-1">
          {[
            { label: "Any", value: "" },
            { label: "0 – 2", value: "0-2" },
            { label: "2 – 4", value: "2-4" },
            { label: "5 & above", value: "5+" },
          ].map((opt) => (
            <SheetOption
              key={opt.value || "any"}
              label={opt.label}
              selected={filters.bedBaths === opt.value}
              onSelect={() => {
                updateFilter("bedBaths", opt.value);
                setActiveSheet(null);
                onSearch({ ...filters, bedBaths: opt.value });
              }}
            />
          ))}
        </div>
      </MobileFilterSheet>

      <MobileFilterSheet
        open={activeSheet === "house"}
        title="Home type"
        onClose={() => setActiveSheet(null)}
      >
        <div className="space-y-1">
          {HOME_TYPE_OPTIONS.map((opt) => (
            <SheetOption
              key={opt.value || "any"}
              label={opt.label}
              selected={filters.houseType === opt.value}
              onSelect={() => {
                updateFilter("houseType", opt.value);
                setActiveSheet(null);
                onSearch({ ...filters, houseType: opt.value });
              }}
            />
          ))}
        </div>
      </MobileFilterSheet>

      <MobileAllFiltersSheet
        open={showAllFilters}
        onClose={() => setShowAllFilters(false)}
        filters={filters}
        effectiveCountry={effectiveCountry}
        isSearching={isSearching}
        onApply={(next) => {
          onFiltersChange(next);
          onSearch(next);
        }}
      />
    </div>
  );
}
