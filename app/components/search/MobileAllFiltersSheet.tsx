"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import MobileFilterSheet, { SheetOption } from "./MobileFilterSheet";
import {
  COUNTRY_FILTER_OPTIONS,
  HOME_TYPE_OPTIONS,
  TYPE_FILTER_OPTIONS_BASE,
  getPriceOptionKey,
  getPriceOptions,
  type SearchFiltersState,
} from "./searchUtils";

type MobileAllFiltersSheetProps = {
  open: boolean;
  onClose: () => void;
  filters: SearchFiltersState;
  effectiveCountry: string | null;
  onApply: (next: SearchFiltersState) => void;
  isSearching?: boolean;
};

const BED_BATH_OPTIONS = [
  { label: "Any", value: "" },
  { label: "0 – 2", value: "0-2" },
  { label: "2 – 4", value: "2-4" },
  { label: "5 & above", value: "5+" },
];

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#ececec] py-5 last:border-b-0">
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {title}
      </h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function PillGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value || "any"}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              selected
                ? "bg-primary text-white shadow-sm"
                : "border border-[#ececec] bg-white text-[#2a2a33]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function MobileAllFiltersSheet({
  open,
  onClose,
  filters,
  effectiveCountry,
  onApply,
  isSearching = false,
}: MobileAllFiltersSheetProps) {
  const [draft, setDraft] = useState<SearchFiltersState>(filters);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

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

  const priceOptionKey = getPriceOptionKey(draft["home-type"] || "rent");
  const currentPriceOptions =
    priceOptions[priceOptionKey] ?? priceOptions.Rent ?? [];

  const updateDraft = (key: keyof SearchFiltersState, value: string) => {
    setDraft((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "region" && prev.region !== value) {
        next.price = "";
        if (value === "somalia" && prev["home-type"] === "shortlet") {
          next["home-type"] = "rent";
        }
      }
      if (key === "bedBaths") {
        next.bedrooms = value;
        next.bathrooms = value;
      }
      return next;
    });
  };

  const handleClearAll = () => {
    setDraft({
      price: "",
      "home-type": "rent",
      location: filters.location,
      region: "",
      bedrooms: "",
      bathrooms: "",
      houseType: "",
      bedBaths: "",
    });
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const showBedBath = draft["home-type"] !== "land";

  return (
    <MobileFilterSheet
      open={open}
      title="All filters"
      subtitle="Refine your search, then view results."
      tall
      onClose={onClose}
      footer={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-[#ececec] text-sm font-semibold text-[#2a2a33]"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={isSearching}
            className="inline-flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white disabled:opacity-60"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching
              </>
            ) : (
              "Show results"
            )}
          </button>
        </div>
      }
    >
      <FilterSection title="Country">
        <PillGroup
          options={COUNTRY_FILTER_OPTIONS.map((opt) => ({
            label: opt.label,
            value: opt.value,
          }))}
          value={draft.region || ""}
          onChange={(value) => updateDraft("region", value)}
        />
      </FilterSection>

      <FilterSection title="Listing type">
        <PillGroup
          options={typeFilterOptions}
          value={draft["home-type"] || "rent"}
          onChange={(value) => updateDraft("home-type", value)}
        />
      </FilterSection>

      <FilterSection title="Price">
        <div className="space-y-1">
          {currentPriceOptions.length > 0 ? (
            currentPriceOptions.map((opt) => (
              <SheetOption
                key={opt.value || "any"}
                label={opt.label}
                selected={draft.price === opt.value}
                onSelect={() => updateDraft("price", opt.value)}
              />
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-[#5c5c66]">
              No price ranges available for this listing type.
            </p>
          )}
        </div>
      </FilterSection>

      {showBedBath ? (
        <>
          <FilterSection title="Beds & baths">
            <div className="space-y-1">
              {BED_BATH_OPTIONS.map((opt) => (
                <SheetOption
                  key={opt.value || "any"}
                  label={opt.label}
                  selected={(draft.bedBaths || "") === opt.value}
                  onSelect={() => updateDraft("bedBaths", opt.value)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Home type">
            <div className="space-y-1">
              {HOME_TYPE_OPTIONS.map((opt) => (
                <SheetOption
                  key={opt.value || "any"}
                  label={opt.label}
                  selected={draft.houseType === opt.value}
                  onSelect={() => updateDraft("houseType", opt.value)}
                />
              ))}
            </div>
          </FilterSection>
        </>
      ) : null}
    </MobileFilterSheet>
  );
}
