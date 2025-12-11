/* eslint-disable */

"use client";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import Pagination from "@/app/components/common/pagination";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyListCard from "@/app/components/common/PropertyListing";
import { flattenListings } from "@/utils";
import MapComponent from "@/app/components/layouts/listingmap";
import { PropertySkeleton } from "@/app/components/Loader";
import Breadcrumb from "../../components/layouts/breadcrumbs";

// ====================================
// MAIN PAGE COMPONENT - iOS OPTIMIZED
// ====================================
const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [displayListings, setDisplayListings] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const sortDropdownRef = useRef(null);

  // ====================================
  // Parse query params safely
  // ====================================
  const query = useMemo(() => {
    try {
      if (!searchParams) return {};
      return Object.fromEntries(searchParams.entries());
    } catch (error) {
      console.error("Error parsing search params:", error);
      return {};
    }
  }, [searchParams]);

  const {
    data: allListings,
    isLoading: isAllloading,
    error: listingsError,
  } = useGetAllListingsQuery(query);

  // ====================================
  // Handle page changes
  // ====================================
  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", page.toString());
        router.push(`/rent/searchlisting?${newParams.toString()}`, {
          scroll: false,
          shallow: true, // Better for iOS
        });
      }
    },
    [totalPages, searchParams, router]
  );

  // ====================================
  // FIXED: Event listener cleanup for iOS
  // ====================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setShowSortDropdown(false);
      }
    };

    // Always add listener (not conditionally)
    document.addEventListener("mousedown", handleClickOutside);

    // Always clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Removed showSortDropdown dependency

  // ====================================
  // FIXED: Ref cleanup for iOS
  // ====================================
  useEffect(() => {
    return () => {
      // Explicit cleanup for iOS Safari
      if (sortDropdownRef.current) {
        sortDropdownRef.current = null;
      }
    };
  }, []);

  // ====================================
  // OPTIMIZED: Process and sort listings (iOS friendly)
  // ====================================
  useEffect(() => {
    if (isAllloading || !allListings) return;

    try {
      const listings = allListings.listings;

      if (!listings || !Array.isArray(listings)) {
        setDisplayListings([]);
        setCoordinates([]);
        return;
      }

      const flatListings = flattenListings(listings);

      // Filter and sort in one pass (more efficient for mobile)
      const processedListings = flatListings
        .filter(
          (item) =>
            item?.item?.coordinate?.latitude &&
            item?.item?.coordinate?.longitude
        )
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || a.item?.createdAt);
          const dateB = new Date(b.createdAt || b.item?.createdAt);

          switch (sortBy) {
            case "newest":
              return dateB - dateA;
            case "oldest":
              return dateA - dateB;
            case "price-low":
              return (a.item?.price || 0) - (b.item?.price || 0);
            case "price-high":
              return (b.item?.price || 0) - (a.item?.price || 0);
            default:
              return dateB - dateA;
          }
        });

      // Batch state updates (React 18 automatic batching)
      setDisplayListings(processedListings);
      setCoordinates(processedListings.map((item) => item.item.coordinate));
      setTotalPages(allListings.totalPages || 1);
      setCurrentPage(Number(searchParams.get("page")) || 1);
    } catch (error) {
      console.error("Error processing listings:", error);
      setDisplayListings([]);
      setCoordinates([]);
    }
  }, [allListings, isAllloading, sortBy, searchParams]);

  // ====================================
  // FIXED: Component unmount cleanup for iOS
  // ====================================
  useEffect(() => {
    return () => {
      // Clear large state arrays on unmount
      // Critical for iOS memory management
      setDisplayListings([]);
      setCoordinates([]);
    };
  }, []);

  // ====================================
  // Error handling
  // ====================================
  if (listingsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <p className="text-red-600 text-center text-lg">
          Error loading listings. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-md"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="md:mt-[4rem] mt-[5rem] 2xl:mt-[3rem] flex-col flex justify-center items-center max-w-[1240px]">
      <Breadcrumb showMap={showMap} setShowMap={setShowMap} />

      <div className="flex items-start mt-3 p-4 md:p-0 md:mt-[1rem] w-full md:justify-between flex-col gap-3 md:gap-0 md:flex-row">
        <h1 className="text-black hidden md:block font-semibold text-2xl md:text-4xl">
          All Real-estate & Homes for Sale
        </h1>
        <h1 className="text-black md:hidden font-semibold text-2xl md:text-4xl">
          All Homes for Sale
        </h1>
        <div className="text-gray-600 fex-end md:ml-[0rem] 2xl:ml-0 text-sm flex items-center space-x-4">
          <span className="flex gap-2">
            {displayListings.slice(0, 7).length}{" "}
            <p className="font-[300] text-gray">of</p>
            {displayListings.length} Homes
          </span>
        </div>
      </div>

      <div className="w-screen md:my-[1rem] h-[2px] bg-[#D9D9D9]" />

      {showMap ? (
        <MapComponent coordinates={coordinates} />
      ) : (
        <>
          {isAllloading ? (
            <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 gap-6 p-5 md:p-0">
              {[...Array(6)].map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : displayListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-12 p-8">
              <p className="text-gray-600 text-center text-lg">
                No listings found for your search.
              </p>
              <p className="text-gray-400 text-center text-sm mt-2">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[1rem] mt-[1.5rem] md:mt-[1rem] w-full p-5 md:p-0 place-items-center">
              {displayListings.map((items, index) => {
                if (!items) return null;

                return (
                  <PropertyListCard
                    key={items?._id || index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={items?.imageUrls?.[0]?.altText || "Property image"}
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    region={items?.region}
                    description={
                      items?.item?.description || "No description available"
                    }
                    _id={items?._id}
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                    squareFeet={items?.item?.squareFeet}
                    landSize={items?.item?.landSize}
                    listingType={items?.listingType || "N/A"}
                  />
                );
              })}
            </div>
          )}

          {!isAllloading && displayListings.length > 0 && (
            <Pagination
              totalPages={totalPages}
              display={displayListings}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
