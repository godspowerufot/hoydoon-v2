"use client";

import { ChevronDown, Loader2, MapPin, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getLocationRegion } from "@/utils/lib/index";
import {
  LANGUAGE_OPTIONS,
  LISTING_TYPE_OPTIONS,
  type AgentFiltersState,
} from "./allAgentsUtils";

const filterBtn =
  "inline-flex h-10 items-center gap-2 rounded-full border border-[#ececec] bg-white px-4 text-sm font-medium text-[#2a2a33] transition-colors hover:border-primary hover:text-primary";

const dropdownPanel =
  "absolute left-0 top-[calc(100%+0.5rem)] z-50 min-w-[220px] overflow-hidden rounded-2xl border border-[#ececec] bg-white py-1 shadow-[0_12px_40px_rgba(17,17,17,0.12)]";

const dropdownItem =
  "flex w-full items-center justify-between px-4 py-3 text-left text-sm text-[#2a2a33] transition-colors hover:bg-[#f7f7f8]";

type AllAgentsFiltersBarProps = {
  filters: AgentFiltersState;
  onFiltersChange: (filters: AgentFiltersState) => void;
  onSearch: (nextFilters?: AgentFiltersState) => void;
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
        <span className="max-w-[140px] truncate">{value || label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#8a8a8a] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? <div className={dropdownPanel}>{children}</div> : null}
    </div>
  );
}

export default function AllAgentsFiltersBar({
  filters,
  onFiltersChange,
  onSearch,
}: AllAgentsFiltersBarProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  const languageLabel =
    LANGUAGE_OPTIONS.find((opt) => opt.value === filters.spokenLanguage)
      ?.label || "Language";

  const listingLabel =
    LISTING_TYPE_OPTIONS.find(
      (opt) => opt.value === filters.listingType.toLowerCase()
    )?.label || "Specialty";

  return (
    <div className="rounded-2xl border border-[#ececec] bg-white p-4 shadow-[0_8px_24px_rgba(17,17,17,0.04)] md:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <div className="relative min-w-[200px] flex-1 sm:min-w-[240px] sm:max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8a8a]"
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
              className="h-10 w-full rounded-full border border-[#ececec] bg-[#f7f7f8] pl-10 pr-4 text-sm text-[#2a2a33] outline-none transition-colors focus:border-primary focus:bg-white"
            />
          </div>

          <FilterDropdown
            label="Specialty"
            value={filters.listingType ? listingLabel : "Specialty"}
            open={openDropdown === "type"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "type" ? null : "type")
            }
            onClose={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              className={`${dropdownItem} ${!filters.listingType ? "bg-[#f3fbfb] text-primary" : ""}`}
              onClick={() => {
                setOpenDropdown(null);
                applyFilters({ ...filters, listingType: "" });
              }}
            >
              Any specialty
            </button>
            {LISTING_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${dropdownItem} ${filters.listingType.toLowerCase() === opt.value ? "bg-[#f3fbfb] text-primary" : ""}`}
                onClick={() => {
                  setOpenDropdown(null);
                  applyFilters({ ...filters, listingType: opt.value });
                }}
              >
                {opt.label}
              </button>
            ))}
          </FilterDropdown>

          <FilterDropdown
            label="Language"
            value={languageLabel}
            open={openDropdown === "language"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "language" ? null : "language")
            }
            onClose={() => setOpenDropdown(null)}
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value || "any"}
                type="button"
                className={`${dropdownItem} ${filters.spokenLanguage === opt.value ? "bg-[#f3fbfb] text-primary" : ""}`}
                onClick={() => {
                  setOpenDropdown(null);
                  applyFilters({ ...filters, spokenLanguage: opt.value });
                }}
              >
                {opt.label}
              </button>
            ))}
          </FilterDropdown>

          <button
            type="button"
            onClick={useMyLocation}
            disabled={isLocating}
            className={filterBtn}
          >
            {isLocating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MapPin className="h-4 w-4 text-primary" />
            )}
            Near me
          </button>

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
      </div>
    </div>
  );
}
