"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2, MapPin, Search } from "lucide-react";
import { getLocationRegion } from "@/utils/lib/index";
import MobileFilterSheet, { SheetOption } from "../search/MobileFilterSheet";
import {
  LANGUAGE_OPTIONS,
  LISTING_TYPE_OPTIONS,
  type AgentFiltersState,
} from "./allAgentsUtils";

type AllAgentsFiltersBarMobileProps = {
  filters: AgentFiltersState;
  onFiltersChange: (filters: AgentFiltersState) => void;
  onSearch: (nextFilters?: AgentFiltersState) => void;
};

type ActiveSheet = "specialty" | "language" | null;

const chipBase =
  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2.5 text-sm font-medium transition-colors";

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
      <span className="max-w-[9rem] truncate">{label}</span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
    </button>
  );
}

export default function AllAgentsFiltersBarMobile({
  filters,
  onFiltersChange,
  onSearch,
}: AllAgentsFiltersBarMobileProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);
  const [regionInput, setRegionInput] = useState(filters.region);

  useEffect(() => {
    setRegionInput(filters.region);
  }, [filters.region]);

  const applyFilters = (next: AgentFiltersState) => {
    onFiltersChange(next);
    onSearch(next);
  };

  const runSearch = async () => {
    setIsSearching(true);
    const next = { ...filters, region: regionInput.trim() };
    applyFilters(next);
    await new Promise((resolve) => setTimeout(resolve, 150));
    setIsSearching(false);
  };

  const useMyLocation = async () => {
    setIsLocating(true);
    try {
      const { country } = await getLocationRegion();
      if (country && country !== "default") {
        setRegionInput(country);
        applyFilters({ ...filters, region: country });
      }
    } finally {
      setIsLocating(false);
    }
  };

  const specialtyLabel =
    LISTING_TYPE_OPTIONS.find(
      (opt) => opt.value === filters.listingType.toLowerCase()
    )?.label || "Specialty";

  const languageLabel =
    LANGUAGE_OPTIONS.find((opt) => opt.value === filters.spokenLanguage)
      ?.label || "Any language";

  return (
    <div className="space-y-3 md:hidden">
      {/* Search input */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8a8a]"
          aria-hidden="true"
        />
        <input
          type="search"
          value={regionInput}
          onChange={(e) => setRegionInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              runSearch();
            }
          }}
          placeholder="Search by city or region"
          className="h-12 w-full rounded-full border border-[#ececec] bg-white pl-11 pr-4 text-[15px] text-[#2a2a33] shadow-[0_4px_16px_rgba(17,17,17,0.06)] outline-none transition-colors focus:border-primary"
        />
      </div>

      {/* Filter chips */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 hide-scrollbar">
        <FilterChip
          label={filters.listingType ? specialtyLabel : "Specialty"}
          active={Boolean(filters.listingType)}
          onClick={() => setActiveSheet("specialty")}
        />
        <FilterChip
          label={languageLabel}
          active={Boolean(filters.spokenLanguage)}
          onClick={() => setActiveSheet("language")}
        />
        <button
          type="button"
          onClick={useMyLocation}
          disabled={isLocating}
          className={`${chipBase} border-[#ececec] bg-white text-[#2a2a33] disabled:opacity-60`}
        >
          {isLocating ? (
            <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-primary" />
          ) : (
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          )}
          <span className="whitespace-nowrap">Near you</span>
        </button>
      </div>

      {/* Search button */}
      <button
        type="button"
        onClick={runSearch}
        disabled={isSearching}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-white disabled:opacity-60"
      >
        {isSearching ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Searching
          </>
        ) : (
          "Search agents"
        )}
      </button>

      {/* Specialty sheet */}
      <MobileFilterSheet
        open={activeSheet === "specialty"}
        title="Specialty"
        subtitle="What type of agent are you looking for?"
        onClose={() => setActiveSheet(null)}
      >
        <div className="space-y-1">
          <SheetOption
            label="Any specialty"
            selected={!filters.listingType}
            onSelect={() => {
              applyFilters({ ...filters, listingType: "" });
              setActiveSheet(null);
            }}
          />
          {LISTING_TYPE_OPTIONS.map((opt) => (
            <SheetOption
              key={opt.value}
              label={opt.label}
              selected={filters.listingType.toLowerCase() === opt.value}
              onSelect={() => {
                applyFilters({ ...filters, listingType: opt.value });
                setActiveSheet(null);
              }}
            />
          ))}
        </div>
      </MobileFilterSheet>

      {/* Language sheet */}
      <MobileFilterSheet
        open={activeSheet === "language"}
        title="Language"
        subtitle="Find an agent who speaks your language."
        onClose={() => setActiveSheet(null)}
      >
        <div className="space-y-1">
          {LANGUAGE_OPTIONS.map((opt) => (
            <SheetOption
              key={opt.value || "any"}
              label={opt.label}
              selected={filters.spokenLanguage === opt.value}
              onSelect={() => {
                applyFilters({ ...filters, spokenLanguage: opt.value });
                setActiveSheet(null);
              }}
            />
          ))}
        </div>
      </MobileFilterSheet>
    </div>
  );
}
