"use client";

import PropertyListCard from "../components/common/PropertyListing";
import SearchBar from "../components/common/searchcomponent";
import Article from "../components/common/Article";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Property } from "@/types";
export default function Home() {
  const { data: allListings, isLoading: isAllLoading } = useGetAllListingsQuery(
    {}
  );
  const { data: familyFriendlyListings } = useGetAllListingsQuery({
    category: "family-friendly",
  });
  const { data: rentListings } = useGetAllListingsQuery({
    listingType: "rent",
  });
  const { data: regionListings } = useGetAllListingsQuery({
    location: "somalia",
  });

  const displayListings = Array.isArray(allListings?.listings)
    ? allListings.listings
    : [];

  const [petFriendlyListings, setPetFriendlyListings] = useState([]);

  useEffect(() => {
    if (Array.isArray(allListings?.listings)) {
      const filtered = allListings.listings?.filter(
        (item: Property) => item?.item?.petFriendly === false
      );
      setPetFriendlyListings(filtered);
    }
  }, [allListings]);

  if (isAllLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
        <div className="loader border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <header className="relative h-[25rem]   p-2 lg:h-[85vh] w-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-screen h-full bg-center bg-cover bg-no-repeat z-[-1]"
          style={{
            backgroundImage: "url('/rentHomePage.png')",
            minHeight: "100%",
            minWidth: "100vw",
          }}
        ></div>

        {/* Content Section */}
        <div className="flex flex-col items-center relative z-[1]  mt-[3rem] lg:mt-[6rem]   lg:gap-4 h-full ">
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
            Hoydoon connects you to your dream home — easily and reliably.{" "}
          </h2>

          <SearchBar />
        </div>

        {/* Statistics Section */}
      </header>
      {/* this hold the images */}

      {/* explore */}
      <section className="mt-1 p-5 lg:p-0  lg:my-[5em] w-full font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col  items-start  lg:max-w-[1200px] ">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full  mx-auto">
            <h1 className="text-black text-[24px]  mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              All Houses for Sale
            </h1>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Discover a home where every detail enhances your lifestyle crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col mt-[3em] lg:my-[2em] gap-[2em] lg:gap-5 items-start lg:flex-row justify-start mb-2">
            {displayListings
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
                  area={items?.item?.squareFeet}
                  bathrooms={items?.item?.bathrooms}
                  bedrooms={items?.item?.bedrooms}
                  description={
                    items?.item?.description ||
                    "No description available for this property."
                  }
                  _id={items?._id}
                  title={items?.item?.title || "Untitled Property"}
                  rent={items?.item?.rent || "Rent details not provided"}
                  squareFeet={items?.item?.squareFeet}
                  landSize={items?.item?.landSize}
                  listingType={items?.listingType || "N/A"}
                />
              ))}
            <Link
              href="/rent/searchlisting"
              className="text-[#09858D] lg:hidden mt-2 text-sm lg:my-5 lg:text-xl font-[500] "
            >
              see housing for sale
            </Link>
          </div>
        </div>
      </section>

      <div className="w-screen  mt-[3rem] lg:my-0 h-[2px] bg-[#D9D9D9] " />

      {/* afforable component */}

      <section className="mt-4  p-5 lg:p-0  lg:my-[5em]  w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col items-start gap-6 justify-center lg:max-w-[1200px] w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full  mx-auto">
            <h1 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Explore Rentals in Somalia
            </h1>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...(rentListings?.listings || [])]
                ?.slice(2, 5)
                ?.sort(() => Math.random() - 0.5)
                ?.map((items: Property, index: number) => (
                  <PropertyListCard
                    key={index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    _id={items?._id}
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                    squareFeet={items?.item?.squareFeet}
                    landSize={items?.item?.landSize}
                    listingType={items?.listingType || "N/A"}
                  />
                ))}
            </div>
            <Link
              href={"/rent/searchlisting"}
              className="text-[#09858D]  text-base  my-5 lg:mt-3 lg:text-xl font-[500] "
            >
              see all explore listings for rent
            </Link>
          </div>
        </div>
      </section>
      <div className="w-screen mt-[3rem] lg:mt-0  h-[2px] bg-[#D9D9D9]" />

      <section className="mt-4 p-5 lg:p-0 lg:my-[5em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col items-start gap-6  lg:max-w-[1200px]w-full">
          <div className="flex flex-col lg:gap-[12rem] lg:flex-row justify-between items-start w-full  mx-auto">
            <h1 className="text-black text-[24px] mt-[32px] lg:mt-0  text-left lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Explore Rentals in Nigeria
            </h1>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
            {!regionListings?.listings ||
            regionListings.listings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No listings found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
                {[...(regionListings?.listings || [])]
                  ?.slice(2, 5)
                  ?.map((items: Property, index: number) => (
                    <PropertyListCard
                      key={index}
                      imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                      altText={
                        items?.imageUrls?.[0]?.altText ||
                        "Property image showcasing a beautiful home"
                      }
                      price={items?.item?.price || "Price not available"}
                      area={items?.item?.squareFeet}
                      bathrooms={items?.item?.bathrooms}
                      bedrooms={items?.item?.bedrooms}
                      description={
                        items?.item?.description ||
                        "No description available for this property."
                      }
                      _id={items?._id}
                      title={items?.item?.title || "Untitled Property"}
                      rent={items?.item?.rent || "Rent details not provided"}
                      squareFeet={items?.item?.squareFeet}
                      landSize={items?.item?.landSize}
                      listingType={items?.listingType || "N/A"}
                    />
                  ))}
              </div>
            )}
            <Link
              href={"/rent/searchlisting"}
              className="text-[#09858D]  text-base  my-5 lg:text-xl font-[500] "
            >
              see all explore listings for rent
            </Link>
          </div>
        </div>
      </section>
      <div className="w-screen h-[2px] bg-[#D9D9D9] " />

      <section className=" p-5 lg:p-0 lg:my-[5em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col items-start gap-6 justify-center lg:max-w-[1200px]w-full">
          <div className="flex flex-col lg:gap-[21rem] lg:flex-row justify-between items-start w-full  mx-auto">
            <h1 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              pet-friendly Rentals
            </h1>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
            {petFriendlyListings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No listings found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
                {[...petFriendlyListings]
                  .slice(0, 3)
                  .sort(() => Math.random() - 0.5)
                  ?.map((items: Property, index: number) => (
                    <PropertyListCard
                      key={index}
                      imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                      altText={
                        items?.imageUrls?.[0]?.altText ||
                        "Property image showcasing a beautiful home"
                      }
                      price={items?.item?.price || "Price not available"}
                      area={items?.item?.squareFeet}
                      bathrooms={items?.item?.bathrooms}
                      bedrooms={items?.item?.bedrooms}
                      description={
                        items?.item?.description ||
                        "No description available for this property."
                      }
                      _id={items?._id}
                      title={items?.item?.title || "Untitled Property"}
                      rent={items?.item?.rent || "Rent details not provided"}
                      squareFeet={items?.item?.squareFeet}
                      landSize={items?.item?.landSize}
                      listingType={items?.listingType || "N/A"}
                    />
                  ))}
              </div>
            )}

            <Link
              href={"/rent/searchlisting"}
              className="text-[#09858D]  text-base  my-5 lg:text-xl font-[500] "
            >
              see all pet-friendly houses for rent
            </Link>
          </div>
        </div>
      </section>

      {/* luxury */}
      <div className="w-screen h-[2px] bg-[#D9D9D9] " />

      {/* testimonials */}
      <section className=" p-5 lg:p-0 lg:my-[5em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col items-start gap-6 justify-center lg:max-w-[1200px]w-full">
          <div className="flex flex-col lg:flex-row justify-between items-start w-full  mx-auto">
            <h1 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Single Family Homes for Rent
            </h1>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...(familyFriendlyListings?.listings || [])]
                .slice(1, 4)
                ?.map((items: Property, index: number) => (
                  <PropertyListCard
                    key={index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    _id={items?._id}
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                    squareFeet={items?.item?.squareFeet}
                    landSize={items?.item?.landSize}
                    listingType={items?.listingType || "N/A"}
                  />
                ))}
            </div>

            <Link
              href={"/rent/searchlisting"}
              className="text-[#09858D]  text-base  my-5 lg:text-xl font-[500] "
            >
              see all family House for rent
            </Link>
          </div>
        </div>
      </section>

      {/* New-articles */}
      <div className=" w-full lg:max-w-[1200px] lg:mt-[2em]">
        <Article />
      </div>
    </>
  );
}
