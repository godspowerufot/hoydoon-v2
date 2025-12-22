"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Pagination from "@/app/components/common/pagination";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { useRouter, useSearchParams } from "next/navigation";
import { flattenListings } from "@/utils";
import MapComponent from "@/app/components/layouts/listingmap";
import { getLocationRegion } from "@/utils/lib/index";
import { SkeletonCard } from "@/app/components/Loader";
import { FiltersDropdown } from "@/app/components/common/filters";
import ErrorBoundary from "@/app/components/common/error-boundary";
import PropertyListCardLite from "../components/common/PropertyListingLite";

const Page = () => {
  const searchParams = useSearchParams();
  const [showMap, setShowMap] = useState(false);
  const query = useMemo(() => {
    return Object.fromEntries(searchParams?.entries() ?? []);
  }, [searchParams]);

  const {
    data: allListings,
    isLoading: isAllloading,
  } = useGetAllListingsQuery(query);

  const [displayListings, setDisplayListings] = useState([]);
  const router = useRouter();
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const sortDropdownRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // CRITICAL: Progressive rendering state
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      
      // Reset visible count when changing pages
      setVisibleCount(12);
      
      router.push(`/search?${newParams.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (!isAllloading && allListings) {
      try {
        const firstThreeListings = allListings.listings;
        const flatListings = flattenListings(firstThreeListings);

        const isValidCoordinate = (coord) => {
          if (!coord) return false;
          const lat = coord.latitude;
          const lng = coord.longitude;
          return (
            typeof lat === "number" &&
            typeof lng === "number" &&
            !isNaN(lat) &&
            !isNaN(lng) &&
            isFinite(lat) &&
            isFinite(lng) &&
            lat >= -90 &&
            lat <= 90 &&
            lng >= -180 &&
            lng <= 180
          );
        };

        const parseDate = (dateValue) => {
          if (!dateValue) return new Date(0);
          const date = new Date(dateValue);
          if (isNaN(date.getTime())) return new Date(0);
          return date;
        };

        const listingsWithCoords = flatListings.filter((item) => {
          const hasCoords =
            item?.item?.coordinate?.latitude &&
            item?.item?.coordinate?.longitude;
          if (hasCoords) {
            return isValidCoordinate(item.item.coordinate);
          }
          return false;
        });

        const sortedListings = [...listingsWithCoords].sort((a, b) => {
          try {
            const dateA = parseDate(a.createdAt || a.item?.createdAt);
            const dateB = parseDate(b.createdAt || b.item?.createdAt);

            switch (sortBy) {
              case "newest":
                return dateB.getTime() - dateA.getTime();
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
          } catch (error) {
            console.error("Error during sorting:", error);
            return 0;
          }
        });

        setCoordinates(sortedListings.map((item) => item.item.coordinate));
        setDisplayListings(sortedListings);
        setTotalPages(allListings.totalPages || 1);
        setCurrentPage(Number(searchParams.get("page")) || 1);
      } catch (error) {
        console.error("Critical error in data processing:", error);
        setDisplayListings([]);
        setCoordinates([]);
      }
    }
  }, [allListings, isAllloading, sortBy, searchParams]);

  // CRITICAL: Progressive loading with Intersection Observer
  useEffect(() => {
    if (displayListings.length === 0 || showMap) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoadingMore && visibleCount < displayListings.length) {
            setIsLoadingMore(true);
            
            // Load 6 more items after a small delay
            setTimeout(() => {
              setVisibleCount((prev) => Math.min(prev + 6, displayListings.length));
              setIsLoadingMore(false);
            }, 100);
          }
        });
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const sentinel = containerRef.current?.querySelector("#load-more-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
    };
  }, [displayListings.length, visibleCount, isLoadingMore, showMap]);

  // Reset visible count when sort changes
  useEffect(() => {
    setVisibleCount(12);
  }, [sortBy]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setShowSortDropdown(false);
      }
    }
    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showSortDropdown]);

  // Get only visible listings for rendering
  const visibleListings = useMemo(() => {
    return displayListings.slice(0, visibleCount);
  }, [displayListings, visibleCount]);

  return (
    <div className="w-full min-h-screen md:mt-[2rem] bg-white">
      <div className="max-w-7xl mx-auto px-0 md:px-4 py-8">
        
        {isAllloading ? (
          <div className="mt-[8rem] md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mt-[4rem] md:flex-row justify-between items-start md:items-center md:mt-10 mb-4">
              <h2 className="text-xl md:text-4xl font-meduim">
                All Real-estate & Homes
              </h2>
              <div className="relative text-sm flex gap-2">
                <span className="flex gap-2">
                  {allListings?.totalListings}{" "}
                  <p className="font-[300] text-gray">of</p>
                  {displayListings?.length} Homes
                </span>{" "}
                Sort:{" "}
                <div
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="text-sm font-[400] flex gap-2 justify-center items-center text-primary cursor-pointer"
                >
                  {sortBy === "newest"
                    ? "Newest"
                    : sortBy === "oldest"
                    ? "Oldest"
                    : sortBy === "price-low"
                    ? "Price Low-High"
                    : "Price High-Low"}
                  <Image
                    width={500}
                    height={500}
                    src="/arrow-down.png"
                    alt="Dropdown"
                    className="w-3 h-2 pointer-events-none"
                  />
                </div>
                {showSortDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSortDropdown(false)}
                    />
                    <div
                      ref={sortDropdownRef}
                      className="absolute right-0 mt-8 w-48 bg-white border border-gray-300 rounded-md z-20"
                    >
                      {[
                        { label: "Newest", value: "newest" },
                        { label: "Oldest", value: "oldest" },
                        { label: "Price: Low to High", value: "price-low" },
                        { label: "Price: High to Low", value: "price-high" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                            sortBy === option.value ? "bg-[#d8d8d8] font-medium" : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-screen md:my-[3rem] md:-ml-[5.5rem] h-[2px] bg-[#D9D9D9]" />

            {/* Map or List View */}
            {showMap ? (
              <div className="mt-6">
                <MapComponent
                  coordinates={coordinates}
                  listings={displayListings}
                />
              </div>
            ) : (
              <div ref={containerRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {visibleListings.map((listing, index) => (
                    <PropertyListCardLite
                      key={`${listing._id}-${index}`}
                      _id={listing._id}
                      imageSrc={
                        listing.imageUrls?.[0]?.url || "/default-image.jpg"
                      }
                      altText={listing.item?.title || "Property"}
                      price={listing.item?.price}
                      area={listing.item?.area}
                      region={listing?.region}
                      description={listing.item?.description}
                      title={listing.item?.title}
                      bathrooms={listing.item?.bathrooms}
                      bedrooms={listing.item?.bedrooms}
                      squareFeet={listing.item?.squareFeet}
                      listingType={listing.item?.listingType}
                      landSize={listing.item?.landSize}
                    />
                  ))}
                </div>

                {/* Sentinel for infinite scroll */}
                {visibleCount < displayListings.length && (
                  <div id="load-more-sentinel" className="h-10 mt-6">
                    <div className="flex justify-center">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {displayListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No properties found matching your criteria
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const WrappedPage = () => (
  <ErrorBoundary>
    <Page />
  </ErrorBoundary>
);

export default WrappedPage;