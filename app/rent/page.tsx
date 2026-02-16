"use client";

import PropertyListCard from "../components/common/PropertyListing";
import Article from "../components/common/Article";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Property } from "@/types";
import { SkeletonCard } from "../components/Loader";
import { getLocationRegion } from "@/utils/lib";
import PropertySearchBar from "../components/common/headerSearch";
export default function Home() {
  const { data: allListings, isLoading: isAllLoading } = useGetAllListingsQuery(
    {}
  );
  const { data: familyFriendlyListings } = useGetAllListingsQuery({
    category: "family-friendly",
  });
  const [userCountry, setUserCountry] = useState<string>("");
  const [shortletListings, setShortletListings] = useState([]);
  const { data: regionListings } = useGetAllListingsQuery({
    location: "somalia",
  });
  const { data: NigeriaListings } = useGetAllListingsQuery({
    location: "nigeria",
  });

  const displayListings = Array.isArray(allListings?.listings)
    ? allListings.listings
    : [];

  const [petFriendlyListings, setPetFriendlyListings] = useState([]);

  useEffect(() => {
    if (Array.isArray(allListings?.listings)) {
      const petFriendlyFiltered = allListings.listings?.filter(
        (item: Property) => item?.item?.petFriendly === false
      );

      const shortletFiltered = allListings.listings?.filter(
        (item: Property) => item?.listingType === "shortlet"
      );

      setPetFriendlyListings(petFriendlyFiltered);
      setShortletListings(shortletFiltered); // You'll need this state
    }
  }, [allListings]);
  useEffect(() => {
    const getUserLocation = async () => {
      if (userCountry) return; // Already have it
      const { country } = await getLocationRegion();
      if (country) setUserCountry(country);
    };
    getUserLocation();
  }, [userCountry]);

  return (
    <>
      <header className="relative h-[60dvh]   p-5 md:p-0 lg:h-[100vh] w-screen ">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-screen h-full bg-center bg-cover bg-no-repeat z-[-1]"
          style={{
            backgroundImage:
              "url('https://hoydoonstorage.blob.core.windows.net/web-images/rentHomePage.webp')",
            minHeight: "100%",
            minWidth: "100vw",
          }}
        ></div>

        {/* Content Section */}
        <div className="flex flex-col lg:mt-[2rem] items-center   justify-center relative z-[1] lg:gap-4 h-full ">
          {/* Main Heading */}
          <h1 className="text-white text-center    relative  font-bricolage font-semibold leading-tight  text-[38px] lg:text-[clamp(4em,4vw,4em)] lg:w-[60%] max-w-[700px] 2xl:max-w-[700px]">
            Find Your Future, Feel at Home!{" "}
          </h1>

          {/* Subheading */}
          <h2 className="text-[#FFFFFFB2]  hidden  lg:-mt-2 text-center  lg:flex item-center justify-center font-[300]  text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
            Find the perfect place for you and your loved ones, where comfort,
            community, and convenience come together.{" "}
          </h2>
          <h2 className="text-[#FFFFFFB2]  lg:hidden lg:-mt-2 text-center  flex item-center justify-center font-[300]  text-sm lg:text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
            Hoydoon connects you to your dream home , easily and reliably.{" "}
          </h2>

          <PropertySearchBar />
        </div>

        {/* Statistics Section */}
      </header>
      {/* this hold the images */}

      {/* explore */}
      <section className="mt-4 p-[0.2rem]  lg:p-0 lg:my-[5em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col lg:gap-[2rem] w-full md:items-start  lg:max-w-[1200px] ">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full  mx-auto">
            <h2 className="text-black text-[24px]  mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Newest Listings
            </h2>
            <p className="text-gray font-light text-sm lg:max-w-[31rem] lg:text-xl font-bricolage w-full lg:w-auto text-start ">
              Explore the latest listings tailored to your lifestyle. Discover
              homes that feel just right, wherever you are.
            </p>
          </div>
          <div className="grid  w-full grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
            {isAllLoading
              ? // Show skeleton loaders
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
                    area={String(items?.item?.squareFeet || "")}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    region={items?.region}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    slugs={items?.slug}
                    title={items?.item?.address || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                    squareFeet={items?.item?.squareFeet}
                    landSize={items?.item?.landSize}
                    listingType={items?.listingType || "N/A"}
                  />
                ))}
          </div>
          {!isAllLoading && (
            <Link
              href="/search"
              className="text-[#09858D] -mt-[1rem]  text-sm mb-4 lg:-mt-[0.8rem] lg:text-xl font-[500] "
            >
              see all new listings for rents
            </Link>
          )}
        </div>
      </section>

      <div className="w-screen  mt-[3rem] lg:my-0 h-[2px] bg-[#D9D9D9] " />

      {/* afforable component */}

      <section className="mt-4 p-[0.2rem] lg:my-[5em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col md:items-start gap-6  lg:max-w-[1200px] w-full">
          <div className="flex flex-col lg:gap-[12rem] lg:flex-row justify-between items-start w-full  mx-auto">
            <h2 className="text-black text-[24px] mt-[32px] lg:mt-0  text-left lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Explore Rentals in Somalia
            </h2>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-left">
              Find a place to rent that fits your lifestyle. From cozy homes to
              modern apartments, explore options designed to meet your needs and
              taste.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
            {isAllLoading ? (
              // Show skeleton loaders during API loading and data processing
              Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            ) : regionListings?.listings?.length === 0 ? (
              // Show "No listing" message
              <p className="text-gray-500 text-base px-2">No listings found</p>
            ) : (
              // Show actual listings
              (regionListings?.listings || [])
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
                    title={items?.item?.address || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                  />
                ))
            )}
          </div>

          {!isAllLoading && (
            <Link
              href={"/search?location=somalia&listingType=rent"}
              className="text-[#09858D] -mt-[1rem]  text-sm mb-4 lg:-mt-[0.5em] lg:text-xl font-[500] "
            >
              see all somalia listings for rent
            </Link>
          )}
        </div>
      </section>
      <div className="w-screen mt-[3rem] lg:mt-0  h-[2px] bg-[#D9D9D9]" />

      <section className="mt-4 p-[0.2rem] lg:my-[5em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col md:items-start gap-6  lg:max-w-[1200px]w-full">
          <div className="flex flex-col lg:gap-[12rem] lg:flex-row justify-between items-start w-full  mx-auto">
            <h2 className="text-black text-[24px] mt-[32px] lg:mt-0  text-left lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Explore Rentals in Nigeria
            </h2>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-left">
              Find a place to rent that fits your lifestyle. From cozy homes to
              modern apartments, explore options designed to meet your needs and
              taste.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
            {isAllLoading ? (
              // Show skeleton loaders during API loading and data processing
              Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            ) : NigeriaListings?.listings?.length === 0 ? (
              // Show "No listing" message
              <p className="text-gray-500 text-base px-2">No listings found</p>
            ) : (
              // Show actual listings
              (NigeriaListings?.listings || [])
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
                    title={items?.item?.address || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                  />
                ))
            )}
          </div>

          {!isAllLoading && (
            <Link
              href={"/search?location=Nigeria&listingType=rent"}
              className="text-[#09858D] -mt-[1rem]  text-sm mb-4 lg:-mt-[1em] lg:text-xl font-[500] "
            >
              see all Nigeria listings for rent
            </Link>
          )}
        </div>
      </section>
      <div className="w-screen h-[2px] bg-[#D9D9D9] " />

      <section className=" p-[0.2rem]  lg:my-[5em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col md:items-start gap-6 justify-center lg:max-w-[1200px] w-full">
          <div className="flex flex-col lg:gap-[21rem] lg:flex-row justify-between items-start w-full  mx-auto">
            <h2 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              pet-friendly Rentals
            </h2>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-left">
              Find homes that welcome your furry friends.Comfort, convenience,
              and pet-friendly living await.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
            {isAllLoading ? (
              // Show skeleton loaders during API loading and data processing
              Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            ) : petFriendlyListings.length === 0 ? (
              // Show "No listing" message
              <p className="text-gray-500 text-center text-base px-2">No listings found</p>
            ) : (
              // Show actual listings
              ([...petFriendlyListings])
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
                    title={items?.item?.address || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                  />
                ))
            )}
          </div>
          <Link
            href={"/search"}
            className="text-[#09858D] -mt-[1rem]  text-sm mb-4 lg:-mt-[1em] lg:text-xl font-[500] "
          >
            see all pet-friendly houses for rent
          </Link>
        </div>
      </section>

      <div className="w-screen mt-[3rem] lg:mt-0  h-[2px] bg-[#D9D9D9]" />

      {userCountry !== "somalia" && (
        <section className="p-[0.2rem] lg:my-[5em] w-full font-bricolage lg:flex justify-center flex-col flex-1 items-center">
          <div className="flex flex-col md:items-start gap-6 justify-center lg:max-w-[1200px] w-full">
            <div className="flex flex-col lg:gap-[20rem] lg:flex-row justify-between items-start w-full mx-auto">
              <h2 className="text-black text-[24px] mt-[32px] lg:mt-0 lg:text-[2.5rem] font-[600] w-full lg:w-auto">
                Shortlet Apartments
              </h2>
              <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-left">
                Need a place for a few days, weeks, or months?Discover stylish,
                flexible stays ready when you are.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
              {isAllLoading ? (
                // Show skeleton loaders during API loading and data processing
                Array.from({ length: 3 }, (_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              ) : shortletListings.length === 0 ? (
                // Show "No listing" message
                <p className="text-gray-500 text-center text-base px-2">No listings found</p>
              ) : (
                // Show actual listings
                ([...shortletListings])
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
                      listingType={items?.listingType || ""}
                      title={items?.item?.address || "Untitled Property"}
                      rent={items?.item?.rent || "Rent details not provided"}
                    />
                  ))
              )}
            </div>
            <Link
              href="/search?listingType=shortlet"
              className="text-[#09858D] -mt-[1rem]  text-sm mb-4 lg:-mt-[1em] lg:text-xl font-[500] "
            >
              see all shortlet houses for rent
            </Link>
          </div>
        </section>
      )}

      {/* // Then conditionally render the section */}
      <div className="w-screen mt-[3rem] lg:mt-0  h-[2px] bg-[#D9D9D9]" />

      {/* Single Family Homes - Only show if there are listings */}
      {!isAllLoading && familyFriendlyListings?.listings?.length > 0 && (
        <section className=" p-[0.2rem]  lg:my-[5em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
          <div className="flex flex-col md:items-start gap-6 justify-center lg:max-w-[1200px] w-full">
            <div className="flex flex-col lg:flex-row justify-between items-start w-full  mx-auto">
              <h2 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
                Single Family Homes for Rent
              </h2>
              <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
                Explore cozy and spacious single family homes for rent,Designed to
                offer privacy, comfort, and room for your lifestyle.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 lg:grid-cols-3 mt-[0.5em] lg:my-[1em] gap-5 mb-2">
              {isAllLoading ? (
                // Show skeleton loaders during API loading and data processing
                Array.from({ length: 3 }, (_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              ) : familyFriendlyListings.listings?.length === 0 ? (
                // Show "No listing" message
                <p className="text-gray-500 text-base px-2">No listings found</p>
              ) : (
                // Show actual listings
                [...(familyFriendlyListings?.listings || [])]
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
                      title={items?.item?.address || "Untitled Property"}
                      rent={items?.item?.rent || "Rent details not provided"}
                    />
                  ))
              )}
            </div>

            <Link
              href={"/search"}
              className="text-[#09858D] -mt-[1rem]  text-sm mb-4 lg:-mt-[1em] lg:text-xl font-[500] "
            >
              see all family House for rent
            </Link>
          </div>
        </section>
      )}

      {/* New-articles */}
      <div className=" w-full lg:max-w-[1200px] lg:mt-[2em]">
        <Article />
      </div>
    </>
  );
}
