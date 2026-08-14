"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const POPULAR = [
  { label: "Nigeria", query: "Nigeria" },
  { label: "Somalia", query: "Somalia" },
  { label: "Kenya", query: "Kenya" },
];

export default function BuySearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const goToSearch = (query: string) => {
    setIsSearching(true);
    const params = new URLSearchParams();
    if (query.trim()) params.append("location", query.trim());
    params.append("listingType", "sale");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative z-30 w-full max-w-[720px] pointer-events-auto">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          goToSearch(location);
        }}
        className="flex items-center gap-2 overflow-hidden rounded-2xl bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.22)] md:p-3"
        aria-label="Search homes for sale"
      >
        <label htmlFor="buy-location" className="sr-only">
          Location
        </label>
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a8a8a]"
            aria-hidden="true"
          />
          <input
            id="buy-location"
            type="search"
            enterKeyHint="search"
            autoComplete="address-level2"
            placeholder="Enter a city, neighborhood, or area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-12 w-full rounded-lg border-0 bg-transparent pl-11 pr-2 text-base text-[#2a2a33] placeholder:text-[#8a8a8a] md:h-14 md:text-lg"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="h-12 shrink-0 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#07757c] disabled:opacity-60 md:h-14 md:px-8 md:text-base"
        >
          {isSearching ? "Searching" : "Search"}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/70">
          Popular
        </span>
        {POPULAR.map((city) => (
          <button
            key={city.query}
            type="button"
            onClick={() => {
              setLocation(city.query);
              goToSearch(city.query);
            }}
            className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
          >
            {city.label}
          </button>
        ))}
      </div>
    </div>
  );
}
