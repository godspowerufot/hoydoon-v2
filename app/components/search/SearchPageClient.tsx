"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import MapComponent from "@/app/components/layouts/listingmap";
import PropertyCard, {
  PropertyCardSkeleton,
  type HomeListing,
} from "@/app/components/home/PropertyCard";
import { HomeContainer } from "@/app/components/home/Section";
import HelpCenterPagination from "@/app/components/helpcenter/HelpCenterPagination";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { flattenListings } from "@/utils";
import SearchFiltersBar from "./SearchFiltersBar";
import {
  SORT_OPTIONS,
  buildResultsLabel,
  buildSearchTitle,
  buildSearchUrl,
  filtersFromSearchParams,
  type SearchFiltersState,
} from "./searchUtils";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<SearchFiltersState>(() =>
    filtersFromSearchParams(
      new URLSearchParams(searchParams?.toString() ?? "")
    )
  );

  useEffect(() => {
    setFilters(
      filtersFromSearchParams(
        new URLSearchParams(searchParams?.toString() ?? "")
      )
    );
  }, [searchParams]);

  const query = useMemo(
    () => Object.fromEntries(searchParams?.entries() ?? []),
    [searchParams]
  );

  const pageTitle = useMemo(
    () => buildSearchTitle(query, filters["home-type"]),
    [query, filters]
  );

  const resultsLabel = useMemo(
    () => buildResultsLabel(query, filters["home-type"]),
    [query, filters]
  );

  const { data: allListings, isLoading } = useGetAllListingsQuery(query);

  const [displayListings, setDisplayListings] = useState<HomeListing[]>([]);
  const [coordinates, setCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isLoading || !allListings) return;

    const flatListingsResult = flattenListings(allListings.listings || []);

    const isValidCoordinate = (coord?: {
      latitude?: number;
      longitude?: number;
    }) => {
      if (!coord) return false;
      const { latitude: lat, longitude: lng } = coord;
      return (
        typeof lat === "number" &&
        typeof lng === "number" &&
        !Number.isNaN(lat) &&
        !Number.isNaN(lng) &&
        Number.isFinite(lat) &&
        Number.isFinite(lng) &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
      );
    };

    const parseDate = (dateValue?: string) => {
      if (!dateValue) return new Date(0);
      const date = new Date(dateValue);
      return Number.isNaN(date.getTime()) ? new Date(0) : date;
    };

    const sortedListings = [...flatListingsResult].sort((a, b) => {
      const dateA = parseDate(a.createdAt || a.item?.createdAt);
      const dateB = parseDate(b.createdAt || b.item?.createdAt);

      switch (sortBy) {
        case "oldest":
          return dateA.getTime() - dateB.getTime();
        case "price-low": {
          const priceA = Number(a.item?.price) || 0;
          const priceB = Number(b.item?.price) || 0;
          return priceA - priceB;
        }
        case "price-high": {
          const priceA = Number(a.item?.price) || 0;
          const priceB = Number(b.item?.price) || 0;
          return priceB - priceA;
        }
        default:
          return dateB.getTime() - dateA.getTime();
      }
    });

    const coords = sortedListings
      .filter(
        (item) =>
          item?.item?.coordinate &&
          isValidCoordinate(item.item.coordinate)
      )
      .map((item) => item.item!.coordinate!);

    setCoordinates(coords);
    setDisplayListings(sortedListings);
    setTotalPages(allListings.totalPages || 1);
    setCurrentPage(Number(searchParams?.get("page")) || 1);
  }, [allListings, isLoading, sortBy, searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    }
    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSortDropdown]);

  const handleSearch = (nextFilters?: SearchFiltersState) => {
    const active = nextFilters ?? filters;
    if (nextFilters) setFilters(nextFilters);
    router.push(buildSearchUrl(active), { scroll: false });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const newParams = new URLSearchParams(searchParams?.toString() ?? "");
    newParams.set("page", page.toString());
    router.push(`/search?${newParams.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSort =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label || "Newest";

  return (
    <div className="listing-page min-h-screen bg-[#f7f7f8] pt-[5.25rem] lg:pt-24">
      <HomeContainer className="pb-16 md:pb-24">
        <header className="py-6 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Search
          </p>
          <h1 className="mt-2 font-heading text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#111] md:text-4xl">
            {pageTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#5c5c66] md:text-lg">
            Filter by country, type, price, beds, and more — then switch between
            list and map view to explore listings across Nigeria, Kenya, and
            Somalia.
          </p>
        </header>

        <SearchFiltersBar
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
          showMap={showMap}
          setShowMap={setShowMap}
        />

        <div className="mt-8 flex flex-col gap-4 border-b border-[#ececec] pb-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#5c5c66] md:text-base">
            {isLoading ? (
              "Loading results…"
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-[#111]">
                  {displayListings.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#111]">
                  {allListings?.totalListings ?? displayListings.length}
                </span>{" "}
                {resultsLabel}
              </>
            )}
          </p>

          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#ececec] bg-white px-4 text-sm font-medium text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
            >
              Sort: {activeSort}
              <ChevronDown
                className={`h-4 w-4 text-[#8a8a8a] transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
              />
            </button>
            {showSortDropdown ? (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[220px] overflow-hidden rounded-2xl border border-[#ececec] bg-white py-1 shadow-[0_12px_40px_rgba(17,17,17,0.12)]">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={`flex w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#f7f7f8] ${
                      sortBy === option.value
                        ? "bg-[#f3fbfb] font-semibold text-primary"
                        : "text-[#2a2a33]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <PropertyCardSkeleton key={`search-skeleton-${index}`} />
            ))}
          </div>
        ) : showMap ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
            <div className="min-h-[520px] lg:min-h-[640px]">
              <MapComponent
                coordinates={coordinates}
                listings={displayListings}
              />
            </div>
          </div>
        ) : displayListings.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#e4e4e4] bg-white px-6 py-16 text-center">
            <h2 className="font-heading text-xl font-semibold text-[#111]">
              No properties found
            </h2>
            <p className="mt-2 text-base text-[#5c5c66]">
              Try adjusting your filters or browse all listings on Hoydoon.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Nigeria", href: "/search?region=nigeria&listingType=rent" },
                { label: "Kenya", href: "/search?region=kenya&listingType=rent" },
                { label: "Somalia", href: "/search?region=somalia&listingType=rent" },
                { label: "Rent", href: "/search?listingType=rent" },
                { label: "Buy", href: "/search?listingType=sale" },
                { label: "Land", href: "/search?listingType=land" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-[#ececec] bg-[#f7f7f8] px-4 py-2 text-sm font-medium text-[#5c5c66] transition-colors hover:border-primary hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayListings.map((listing, index) => (
              <PropertyCard
                key={listing._id || listing.slug || index}
                listing={listing}
              />
            ))}
          </div>
        )}

        {!isLoading && totalPages > 1 ? (
          <HelpCenterPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : null}
      </HomeContainer>
    </div>
  );
}
