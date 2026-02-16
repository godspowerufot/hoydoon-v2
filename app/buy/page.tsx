"use client";
/* eslint-disable */
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import PropertyCard from "../components/common/property";
import Input from "../components/common/inputs/input";
import Link from "next/link";
import Article from "../components/common/Article";
import { useEffect, useState } from "react";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { log } from "@/utils/log";
import MapComponent from "../components/layouts/listingmap";
import { Property } from "@/types";
import { SkeletonCard } from "../components/Loader";
import PropertySearchBar from "../components/common/headerSearch";
import InlineSpinner from "../components/common/InlineSpinner";
import PropertyListCard from "../components/common/PropertyListing";
// Add mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

export default function Home() {
  const { data: allListings, isLoading: isAllLoading } = useGetAllListingsQuery(
    {},
    { pollingInterval: 60000 }
  );
  const {
    data: luxuryListings,
    isLoading: isLuxuryLoading,
    refetch: refetchLuxury,
  } = useGetAllListingsQuery({ category: "luxury" });
  const {
    data: affordableListings,
    isLoading: isAffordableLoading,
    refetch: refetchAffordable,
  } = useGetAllListingsQuery({ category: "affordable" });
  const {
    data: openHouseListings,
    isLoading: isOpenHouseLoading,
    refetch: refetchOpenHouse,
  } = useGetAllListingsQuery({ category: "open-house" });
  const {
    data: upcomingListings,
    isLoading: isUpcomingLoading,
    refetch: refetchUpcoming,
  } = useGetAllListingsQuery({ category: "upcoming" });
  const [displayListings, setDisplayListings] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [mapListings, setMapListings] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { data: listing } = useGetAllListingsQuery(
    { location: searchLocation }, // e.g. "Lekki" or Zip
    { skip: !searchLocation, pollingInterval: 60000 }
  );
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    if (inputValue.trim()) {
      setIsSearching(true);
      setSearchLocation(inputValue.trim());
    }
  };
  const flattenListings = (listings: any) => {
    return listings.flatMap((item: any) =>
      Array.isArray(item.listings) ? flattenListings(item.listings) : item
    );
  };
  useEffect(() => {
    if (listing?.listings) {
      const flatListings = flattenListings(listing.listings);

      // Extract coordinates
      // Extract coordinates for active listings

      setMapListings(flatListings); // Store raw listings for Google Maps

      log(flatListings, "locationlisitng");
      setIsSearching(false); // Search completed
    } else if (searchLocation && !listing) {
      // If search was triggered but no results yet, keep searching state
      setIsSearching(false);
    }
  }, [listing, searchLocation]);

  const isMobile = useIsMobile();
  useEffect(() => {
    if (!isAllLoading && allListings) {
      setIsDataReady(false); // Start processing
      const firstThreeListings = allListings.listings;
      setDisplayListings(firstThreeListings); // Store in state
      // Small delay to ensure data is fully processed before showing
      setTimeout(() => setIsDataReady(true), 100);
    } else if (isAllLoading) {
      setIsDataReady(false);
    }
  }, [allListings, isAllLoading]);

  return (
    <>
      <header className="relative overflow-hidden h-[60dvh] md:h-[100vh]  p-[2rem] md:p-2 lg:h-[100vh]  w-screen">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-screen h-full bg-center bg-cover bg-no-repeat z-[-1] object-cover"
          style={{
            backgroundImage: "url('/rent.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div
          className="absolute lg:hidden top-0 left-0 w-full h-full bg-cover bg-center z-[-1] object-cover"
          style={{
            backgroundImage: "url('/rentmobile.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="flex flex-col items-center justify-center relative z-[1] gap-1 lg:gap-4 h-full ">
          <h1 className="text-white text-center     relative  font-bricolage font-semibold leading-tight  text-[36px] lg:text-[clamp(4em,4vw,4em)] lg:w-[60%] max-w-[700px] 2xl:max-w-[700px]">
            Find Your Dream Home Today!
          </h1>
          <h2 className="text-[#FFFFFFB2]  hidden  lg:-mt-2 text-center  lg:flex item-center justify-center font-[300]  text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
            Discover the perfect property to call home. Beautiful locations,
            modern amenities, and endless possibilities,make your move today!
          </h2>

          <h2 className="text-[#FFFFFFB2]  lg:hidden lg:-mt-2 text-center  flex item-center justify-center font-[300]  text-sm lg:text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
            Find your dream home,great locations, modern amenities, endless
            possibilities. Move in today!{" "}
          </h2>
          <PropertySearchBar />
        </div>

        {/* Statistics Section */}
      </header>
      {/* this hold the images */}

      {/* explore */}
      <section className=" p-2 lg:max-w-[1200px] lg:p-0 w-full font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col lg:my-[3em] md:items-start gap-6 justify-center max-w-[1200px] w-full">
          <div className="flex flex-col lg:flex-row  justify-between  items-center w-full  mx-auto">
            <h2 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              All Houses for Sale
            </h2>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="grid  w-full grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
            {isAllLoading || !isDataReady
              ? // Show skeleton loaders during API loading and data processing
              Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
              : displayListings
                .slice(0, 3)
                .map((items: Property, index: number) => (
                  <PropertyListCard
                    key={index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet || ""}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    region={items?.region || ""}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    slugs={items?.slug}
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                  />
                ))}
          </div>
          <Link
            href="/search"
            className="text-[#09858D]   -mt-[0.5rem] text-sm lg:-mt-3 lg:text-2xl font-[500] "
          >
            see housing for sale
          </Link>
        </div>
      </section>

      {/* afforable component */}

      <div className="w-screen  mt-[3rem] lg:my-0 h-[2px] bg-[#D9D9D9] " />

      <section className="lg:my-[5em] p-2 lg:p-0 w-full max-w-[1200px] font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col md:items-start  justify-center max-w-[1200px] w-full">
          <div className="flex flex-col lg:flex-row gap-6  justify-between items-center w-full  mx-auto">
            <h2 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Affordable Homes
            </h2>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Explore affordable living options tailored to your style, needs,
              and price range.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
            {isAffordableLoading ? (
              // Show skeleton loaders during API loading and data processing
              Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            ) : affordableListings?.listings?.length === 0 ? (
              // Show "No listing" message
              <p className="text-gray-500 text-base px-2">No listings found</p>
            ) : (
              // Show actual listings
              (affordableListings?.listings || [])
                .slice(0, 3)
                .map((items: Property, index: number) => (
                  <PropertyListCard
                    key={index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet || ""}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    region={items?.region || ""}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    slugs={items?.slug}
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                  />
                ))
            )}
          </div>

          {!isAffordableLoading && (
            <Link
              href="/search?category=affordable"
              className="text-[#09858D]   mt-[1rem] text-sm lg:my-5 lg:text-2xl font-[500] "
            >
              see all afforable houses for sale
            </Link>
          )}
        </div>
      </section>
      <div className="w-screen  mt-[3rem] lg:my-0 h-[2px] bg-[#D9D9D9] " />

      <section className="lg:my-[5em] p-2 lg:p-0 w-full max-w-[1200px] font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col md:items-start gap-6 justify-center max-w-[1200px] w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full  mx-auto">
            <h2 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Upcoming Open Houses for Sale
            </h2>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              See it before you seal it. Explore open homes and take the next
              step with confidence.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
            {isOpenHouseLoading
              ? // Show skeleton loaders during API loading and data processing
              Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
              : (openHouseListings?.listings || [])
                .slice(0, 3)
                .map((items: Property, index: number) => (
                  <PropertyListCard
                    key={index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet || ""}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    region={items?.region || ""}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    slugs={items?.slug}
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                  />
                ))}
          </div>
          {!isOpenHouseLoading && (
            <Link
              href="/search?category=open-house`"
              className="text-[#09858D]   -mt-[0.4rem]   mb-[1rem]  text-sm lg:my-5 lg:text-2xl font-[500] "
            >
              see all open houses for sale
            </Link>
          )}
        </div>
      </section>
      <div className="w-screen  lg:hidden   h-[2px] bg-[#D9D9D9] " />

      <section className="lg:my-[5em] p-2 lg:p-0 w-full lg:max-w-[1200px] font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col md:items-start gap-6 justify-center max-w-[1200px] w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full  mx-auto">
            <h2 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Luxury Homes Houses for Sale
            </h2>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Where comfort meets prestige. Explore homes built for distinction
              and refined taste.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
            {isLuxuryLoading
              ? // Show skeleton loaders during API loading and data processing
              Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
              : (luxuryListings?.listings || [])
                .slice(0, 3)
                .map((items: Property, index: number) => (
                  <PropertyListCard
                    key={index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    region={items?.region || ""}
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet || ""}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    slugs={items?.slug}
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                  />
                ))}
          </div>

          <Link
            href="/search?category=luxury"
            className="text-[#09858D]   -mt-[0.5rem] text-sm lg:my-5 lg:text-2xl font-[500] "
          >
            see all luxury houses for sale
          </Link>
        </div>
      </section>
      <div className="w-screen  mt-[3rem] lg:mt-0 h-[2px] bg-[#D9D9D9] " />
      {/* testimonials */}

      <section className="lg:max-w-[1200px] font-bricolage lg:flex  justify-center flex-col flex-1 items-center ">
        <div className="flex  gap-[4%]  lg:my-[5em] flex-col-reverse  w-full   lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex  p-4 flex-col   w-full lg:w-[45em] 2xl:w-[60em] ">
            <h2 className="text-black  mt-4 lg:mt-0 text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
              Explore the Neighborhood
            </h2>
            <p className="text-gray text-sm lg:text-xl mt-3 2xl:mt-[1em] font-bricolage  w-full lg:w-9/10 ">
              Want to know more about schools nearby, healthcare facilities, or
              commute times? Get the full picture of the area before making your
              move, right from the map.
            </p>

            <div className="  relative w-full  lg:w-[87%] mt-[1.5rem] ">
              <Input
                label=""
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="!rounded-full"
                placeholder="Address, Neighborhood, Zip code..."
              />

              <div
                onClick={handleSearch}
                className="absolute right-2 top-[8%] 2xl:top-[13%] bg-primary ml-[6em] p-[0.95rem]  h-[40px] w-[50px]  rounded-full flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90"
              >
                {isSearching ? (
                  <InlineSpinner size={24} color="white" />
                ) : (
                  <Image
                    alt="logo"
                    width={50}
                    loading="lazy"
                    height={30}
                    quality={100} // Ensures maximum quality
                    src={"/search.png"}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
            </div>
          </span>

          <div className="mt-8 w-screen lg:w-[40rem] h-[25rem] 2xl:w-[50rem] rounded-2xl lg:mt-0">
            <MapComponent listings={mapListings} />
          </div>
        </div>
      </section>

      <div className="w-full  justify-center flex items-center  lg:mt-[3em]">
        <Article />
      </div>
    </>
  );
}
