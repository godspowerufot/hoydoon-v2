"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { flattenListings } from "@/utils";
import MapComponent from "../layouts/listingmap";
import { HomeContainer, SectionHeader } from "../home/Section";
import InlineSpinner from "../common/InlineSpinner";

export default function RentMapExplore() {
  const [inputValue, setInputValue] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { data: rentListings } = useGetAllListingsQuery({ listingType: "rent" });
  const { data: locationListings, isFetching } = useGetAllListingsQuery(
    { location: searchLocation, listingType: "rent" },
    { skip: !searchLocation }
  );

  const defaultMapListings = useMemo(
    () => flattenListings(rentListings?.listings || []).slice(0, 40),
    [rentListings]
  );

  const mapListings = useMemo(() => {
    if (!searchLocation) return defaultMapListings;
    if (!locationListings?.listings) return [];
    return flattenListings(locationListings.listings);
  }, [searchLocation, locationListings, defaultMapListings]);

  useEffect(() => {
    if (!isFetching && searchLocation) {
      setIsSearching(false);
    }
  }, [isFetching, searchLocation]);

  const handleSearch = () => {
    const query = inputValue.trim();
    if (!query) return;
    setIsSearching(true);
    setSearchLocation(query);
  };

  return (
    <section className="py-14 md:py-20" aria-labelledby="rent-map-heading">
      <HomeContainer>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
          <div>
            <SectionHeader
              headingId="rent-map-heading"
              eyebrow="Explore on the map"
              title="See what's for rent near you"
              description="Search a neighborhood, city, or area to preview rental listings on the map before you dive into details."
            />

            <div className="relative mt-2">
              <label htmlFor="rent-map-search" className="sr-only">
                Search location on map
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a8a8a]"
                aria-hidden="true"
              />
              <input
                id="rent-map-search"
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="City, neighborhood, or area"
                className="h-14 w-full rounded-2xl border border-[#e5e7eb] bg-white pl-12 pr-28 text-base text-[#2a2a33] shadow-[0_8px_24px_rgba(17,17,17,0.04)] placeholder:text-[#8a8a8a] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="absolute right-2 top-1/2 inline-flex h-10 -translate-y-1/2 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-[#07757c] disabled:opacity-60"
              >
                {isSearching ? (
                  <InlineSpinner size={18} color="white" />
                ) : (
                  "Search"
                )}
              </button>
            </div>

            <p className="mt-4 text-sm text-[#6b7280]">
              {searchLocation
                ? `${mapListings.length} rentals found near "${searchLocation}"`
                : `Showing ${defaultMapListings.length} rentals across active markets`}
            </p>
          </div>

          <div className="h-[320px] overflow-hidden rounded-2xl border border-[#ececec] shadow-[0_12px_40px_rgba(15,23,42,0.08)] md:h-[420px]">
            <MapComponent listings={mapListings} />
          </div>
        </div>
      </HomeContainer>
    </section>
  );
}
