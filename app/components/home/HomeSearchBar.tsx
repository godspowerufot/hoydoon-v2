"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SearchTab = "buy" | "rent" | "sell";

const TABS: { id: SearchTab; label: string }[] = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "sell", label: "Sell" },
];

const POPULAR = [
  { label: "Nigeria", query: "Nigeria" },
  { label: "Somalia", query: "Somalia" },
  { label: "Kenya", query: "Kenya" },
];

const PLACEHOLDERS: Record<SearchTab, string> = {
  buy: "Enter a city, neighborhood, or area",
  rent: "Enter a city or neighborhood to rent",
  sell: "Enter your home's city or neighborhood",
};

export default function HomeSearchBar({
  defaultTab = "buy",
}: {
  defaultTab?: SearchTab;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<SearchTab>(defaultTab);
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const goToSearch = (query: string) => {
    setIsSearching(true);

    if (tab === "sell") {
      router.push("/sell");
      return;
    }

    const params = new URLSearchParams();
    if (query.trim()) params.append("location", query.trim());
    params.append("listingType", tab === "buy" ? "sale" : "rent");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative z-30 w-full max-w-[720px] pointer-events-auto">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
        <div
          role="tablist"
          aria-label="Search type"
          className="grid grid-cols-3 border-b border-[#eee]"
        >
          {TABS.map((item) => {
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setTab(item.id);
                }}
                className={`relative cursor-pointer py-3.5 text-sm font-semibold transition-colors duration-200 md:text-base ${
                  selected
                    ? "bg-[#f3fbfb] text-primary"
                    : "bg-white text-[#5c5c66] hover:bg-[#f7f7f8] hover:text-[#2a2a33]"
                }`}
              >
                {item.label}
                {selected ? (
                  <span
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            goToSearch(location);
          }}
          className="flex items-center gap-2 p-2 md:p-3"
          aria-label={`${tab} homes`}
        >
          <label htmlFor="home-location" className="sr-only">
            Location
          </label>
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a8a8a]"
              aria-hidden="true"
            />
            <input
              id="home-location"
              type="search"
              enterKeyHint="search"
              autoComplete="address-level2"
              placeholder={PLACEHOLDERS[tab]}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 w-full rounded-lg border-0 bg-transparent pl-11 pr-2 text-base text-[#2a2a33] placeholder:text-[#8a8a8a] md:h-14 md:text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="h-12 shrink-0 rounded-lg bg-primary px-5 text-sm font-semibold text-[#fff] transition-colors duration-200 hover:bg-[#07757c] disabled:opacity-60 md:h-14 md:px-8 md:text-base"
          >
            {tab === "sell" ? "Get started" : isSearching ? "Searching" : "Search"}
          </button>
        </form>
      </div>

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
