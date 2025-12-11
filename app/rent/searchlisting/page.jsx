/* eslint-disable */
"use client";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { flattenListings } from "@/utils";
import { PropertySkeleton } from "@/app/components/Loader";

// ✅ Lazy load heavy components
const PropertyListCard = dynamic(
  () => import("@/app/components/common/PropertyListing"),
  {
    loading: () => <PropertySkeleton />,
    ssr: false, // Disable SSR for this component to reduce initial load
  }
);

const MapComponent = dynamic(
  () => import("@/app/components/layouts/listingmap"),
  {
    loading: () => <div className="w-full h-96 bg-gray-200 animate-pulse" />,
    ssr: false,
  }
);

const Pagination = dynamic(() => import("@/app/components/common/pagination"), {
  ssr: false,
});

const Breadcrumb = dynamic(
  () => import("../../components/layouts/breadcrumbs"),
  { ssr: false }
);

// ====================================
// MEMOIZED PROPERTY CARD COMPONENT
// ====================================
const MemoizedPropertyCard = memo(
  ({ items, index }) => {
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
        description={items?.item?.description || "No description available"}
        _id={items?._id}
        title={items?.item?.title || "Untitled Property"}
        rent={items?.item?.rent || "Rent details not provided"}
        squareFeet={items?.item?.squareFeet}
        landSize={items?.item?.landSize}
        listingType={items?.listingType || "N/A"}
      />
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for performance
    return prevProps.items?._id === nextProps.items?._id;
  }
);

MemoizedPropertyCard.displayName = "MemoizedPropertyCard";

// ====================================
// INTERSECTION OBSERVER HOOK FOR LAZY LOADING
// ====================================
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [options.threshold, options.rootMargin]);

  return [targetRef, isIntersecting];
};

// ====================================
// LAZY LOADED LISTING ITEM
// ====================================
const LazyListingItem = memo(({ items, index }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div ref={ref} className="w-full">
      {isVisible ? (
        <div>testing</div>
      ) : (
        // <MemoizedPropertyCard items={items} index={index} />
        <PropertySkeleton />
      )}
    </div>
  );
});

LazyListingItem.displayName = "LazyListingItem";

// ====================================
// MAIN PAGE COMPONENT
// ====================================
const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // ✅ Use refs to avoid unnecessary re-renders
  const coordinatesRef = useRef([]);
  const sortDropdownRef = useRef(null);
  const isMountedRef = useRef(true);

  // ====================================
  // Parse query params (memoized)
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

  // ====================================
  // Fetch listings with automatic caching
  // ====================================
  const {
    data: allListings,
    isLoading: isAllloading,
    error: listingsError,
  } = useGetAllListingsQuery(query, {
    // ✅ RTK Query optimization
    refetchOnMountOrArgChange: 300, // Cache for 5 minutes
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  // ====================================
  // MEMOIZED: Process listings (only recalculate when needed)
  // ====================================
  const { displayListings, coordinates, totalPages, currentPage } =
    useMemo(() => {
      if (isAllloading || !allListings?.listings) {
        return {
          displayListings: [],
          coordinates: [],
          totalPages: 1,
          currentPage: 1,
        };
      }

      try {
        const listings = allListings.listings;
        if (!Array.isArray(listings)) {
          return {
            displayListings: [],
            coordinates: [],
            totalPages: 1,
            currentPage: 1,
          };
        }

        const flatListings = flattenListings(listings);

        // ✅ Single pass filter + sort for performance
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

        const coords = processedListings.map((item) => item.item.coordinate);

        // Update ref for map component
        coordinatesRef.current = coords;

        return {
          displayListings: processedListings,
          coordinates: coords,
          totalPages: allListings.totalPages || 1,
          currentPage: Number(searchParams?.get("page")) || 1,
        };
      } catch (error) {
        console.error("Error processing listings:", error);
        return {
          displayListings: [],
          coordinates: [],
          totalPages: 1,
          currentPage: 1,
        };
      }
    }, [allListings, isAllloading, sortBy, searchParams]);

  // ====================================
  // OPTIMIZED: Page change handler
  // ====================================
  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        const newParams = new URLSearchParams(searchParams?.toString());
        newParams.set("page", page.toString());

        router.push(`/rent/searchlisting?${newParams.toString()}`, {
          scroll: false,
        });

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages, searchParams, router]
  );

  // ====================================
  // Click outside handler (always attached)
  // ====================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        // Use requestAnimationFrame for iOS Safari
        requestAnimationFrame(() => {
          if (isMountedRef.current) {
            // Handle dropdown close here if needed
          }
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ====================================
  // Cleanup on unmount (iOS Safari critical)
  // ====================================
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      sortDropdownRef.current = null;
      coordinatesRef.current = [];
    };
  }, []);

  // ====================================
  // Preload next page images (optional optimization)
  // ====================================
  useEffect(() => {
    if (typeof window === "undefined" || displayListings.length === 0) return;

    // Preload first 3 images only
    const imagesToPreload = displayListings.slice(0, 3);

    imagesToPreload.forEach((item) => {
      const imgUrl = item?.imageUrls?.[0]?.url;
      if (imgUrl && imgUrl !== "/house1.png") {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = imgUrl;
        document.head.appendChild(link);
      }
    });
  }, [displayListings, currentPage]);

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
          className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="md:mt-[4rem] mt-[5rem] 2xl:mt-[3rem] flex-col flex justify-center items-center max-w-[1240px]">
      <Breadcrumb showMap={showMap} setShowMap={setShowMap} />

      {/* Header Section */}
      <div className="flex items-start mt-3 p-4 md:p-0 md:mt-[1rem] w-full md:justify-between flex-col gap-3 md:gap-0 md:flex-row">
        <h1 className="text-black hidden md:block font-semibold text-2xl md:text-4xl">
          All Real-estate & Homes for Sale
        </h1>
        <h1 className="text-black md:hidden font-semibold text-2xl md:text-4xl">
          All Homes for Sale
        </h1>
        <div className="text-gray-600 fex-end md:ml-[0rem] 2xl:ml-0 text-sm flex items-center space-x-4">
          <span className="flex gap-2">
            {Math.min(displayListings.length, 7)}{" "}
            <p className="font-[300] text-gray">of</p>
            {displayListings.length} Homes
          </span>
        </div>
      </div>

      <div className="w-screen md:my-[1rem] h-[2px] bg-[#D9D9D9]" />

      {/* Main Content */}
      {showMap ? (
        <MapComponent coordinates={coordinates} />
      ) : (
        <>
          {isAllloading ? (
            <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 gap-6 p-5 md:p-0">
              {[...Array(6)].map((_, index) => (
                <PropertySkeleton key={`skeleton-${index}`} />
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
            <>
              {/* ✅ Lazy loaded grid with intersection observer */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[1rem] mt-[1.5rem] md:mt-[1rem] w-full p-5 md:p-0 place-items-center"
                style={{
                  // iOS Safari optimization
                  contentVisibility: "auto",
                  containIntrinsicSize: "1px 500px",
                }}
              >
                {displayListings.map((items, index) => (
                  <LazyListingItem
                    key={items?._id || `listing-${index}`}
                    items={items}
                    index={index}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  display={displayListings}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

// ✅ Export memoized component
export default memo(Page);
