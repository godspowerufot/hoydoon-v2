"use client";
import Input from "../common/inputs/input";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Image from "next/image";
import HoverCard from "../common/card";
import Link from "next/link";
import { SkeletonCard } from "../Loader";
import { useIsMobile } from "@/hooks/usemobile";
const MapComponent = dynamic(() => import("../layouts/listingmap"));

const Buy = () => {
  const { data: allListings, isLoading: isAllLoading } = useGetAllListingsQuery(
    {}
  );
  const isMobile = useIsMobile();

  const [searchLocation, setSearchLocation] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const { data: listing } = useGetAllListingsQuery(
    { location: searchLocation }, // e.g. "Lekki" or Zip
    { skip: !searchLocation, pollingInterval: 60000 }
  );
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    setSearchLocation(inputValue.trim());
  };
  const flattenListings = (listings) => {
    return listings.flatMap((item) =>
      Array.isArray(item.listings) ? flattenListings(item.listings) : item
    );
  };
  useEffect(() => {
    if (listing?.listings) {
      const flatListings = flattenListings(listing.listings);

      // Extract coordinates
      // Extract coordinates for active listings
      const coords = flatListings
        ?.map((item) => item.item?.coordinate) // Get coordinate object from item
        .filter((coord) => coord?.latitude && coord?.longitude); // Ensure valid coordinates

      setCoordinates(coords); // Store coordinates for Google Maps
    }
  }, [listing]);

  return (
    <div>
      {" "}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/rent.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-5 lg:mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Find Your Perfect Dream Home Today!
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Discover the perfect place to call home,whether you're searching for a
          cozy apartment, a spacious family house, or a modern condo in the
          heart of the city. Explore beautiful locations, thoughtfully designed
          interiors, and a wide range of properties featuring the modern
          amenities you need for comfort and convenience. From vibrant
          neighborhoods to peaceful retreats, find a space that fits your
          lifestyle and your future. Your dream home is just a click away,start
          your search and make your move today!
        </p>
      </div>
      <div className="mt-5 lg:mt-[4.5rem]">
        <div className="flex flex-col items-start gap-6 justify-center max-w-[1200px] w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full  mx-auto">
            <h1 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Hoydoon Houses for Sale
            </h1>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col flex-wrap mt-[0.5em] lg:mt-[1em] gap-5 items-start lg:flex-row justify-start mb-2">
            {isAllLoading // Show skeleton loaders
              ? Array.from({ length: isMobile ? 1 : 3 }, (_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              : (allListings?.listings || [])
                  .slice(0, 9)
                  .map((items, index) => (
                    <HoverCard
                      _id={items?._id}
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
                      region={items?.item.region || "_"}
                      description={
                        items?.item?.description ||
                        "No description available for this property."
                      }
                      title={items?.item?.title || "Untitled Property"}
                      rent={items?.item?.rent || "Rent details not provided"}
                    />
                  ))}
            <Link
              href="/"
              className="text-[#09858D] lg:hidden mt-2 text-sm lg:my-5 lg:text-2xl font-[500] "
            >
              see all luxury houses for sale
            </Link>
          </div>
        </div>
      </div>
      <div className="w-screen  mt-5 lg:mt-[4.5rem] lg:mb-[2rem] h-[2px] bg-[#D9D9D9] " />
      {/* testimonials */}
      <div className="flex  gap-[4%]  flex-col-reverse  w-full  lg:flex-row  items-center   lg:justify-around ">
        <span className="flex  p-4 flex-col w-full lg:w-[45em] 2xl:w-[60em] ">
          <h1 className="text-black  mt-4 lg:mt-0 text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
            Get the Local Information
          </h1>
          <p className="text-gray text-sm lg:text-xl mt-3 2xl:mt-[1em] font-bricolage  w-full lg:w-9/10 2xl:text-[20px] 2xl:w-[70%]">
            Curious about local schools? Wondering if there are pet-friendly
            rentals? Find all the key information you need about the area that
            catches your interest.
          </p>

          <div className="  relative w-full  lg:w-[87%] mt-[1.5rem] 2xl:w-[75%]">
            <Input
              label=""
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="2xl:h-[4rem] rounded-[24px]"
              placeholder="Address, Neighborhood, Zip code..."
            />

            <div
              onClick={handleSearch}
              className="absolute right-2 top-[8%] 2xl:top-[13%] bg-primary ml-[6em] p-3  h-[40px] w-[40px] 2xl:w-[50px] 2xl:h-[50px] rounded-full flex items-center justify-center"
            >
              <Image
                alt="logo"
                width={30}
                loading="lazy"
                height={30}
                quality={100} // Ensures maximum quality
                src={"/search.png"}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </span>

        <span className="mt-8  w-screen lg:w-[40rem] h-[25rem] 2xl:w-[50rem] 2xl:h-[35rem] rounded-2xl lg:mt-0">
          <MapComponent coordinates={coordinates} />
        </span>
      </div>
    </div>
  );
};
export default Buy;
