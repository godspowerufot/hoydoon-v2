"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Pagination from "@/app/components/common/pagination";
// import { useGetAllListingsQuery } from "@/store/slices/api/authapi"; // DISABLED
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

  // DISABLED API CALL
  // const {
  //   data: allListings,
  //   isLoading: isAllloading,
  // } = useGetAllListingsQuery(query);

  // Mock data instead of API
  const allListings = null;
  const isAllloading = false;

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
  const containerRef = useRef(null);

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
                    <h1 key={index}>testing</h1>
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