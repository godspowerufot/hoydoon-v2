/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContactAgent from "@/app/components/layouts/contactagent";
import { highlights } from "@/constants";
import {
  useToggleFavoriteMutation,
  useGetAllListingsQuery,
  useGetListingBySlugQuery,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
} from "@/store/slices/api/authapi";
import HoverCard from "@/app/components/common/card";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/app/components/common/Spinner";
import ListedCard from "@/app/components/common/profilecard";
import MapComponent from "@/app/components/layouts/listingmap";
import {
  ImageGallerySkeleton,
  ImageGalleryMobileSkeleton,
  PropertyHeaderSkeleton,
  PropertyStatsSkeleton,
  HomeHighlightsSkeleton,
  DescriptionSkeleton,
  MapSkeleton,
  DistanceInfoSkeleton,
  RelatedListingsSkeleton,
  BreadcrumbSkeleton,
  ContactAgentSkeleton,
} from "@/app/components/Loader/RentDetailsSkeleton";
import { ProfileCardSkeleton } from "@/app/components/Loader";
import { toast } from "react-toastify";
import { handleShareClick, truncateDescription, flattenListings } from "@/utils";
import DynamicImageMobile from "@/app/components/layouts/mobiledynamic";
import DynamicImageGrid from "@/app/components/layouts/dynamiclayout";
import axios from "axios";
import { log } from "@/utils/log";
import { formatPrice } from "@/utils";
const PLACE_TYPES = [
  { type: "transit_station", icon: "/bus.png" },
  { type: "bank", icon: "/bank.png" },
  { type: "shopping_mall", icon: "/shopping.png" },
  { type: "school", icon: "/school.png" },
  { type: "pharmacy", icon: "/pharmacy.png" },
];

// Infer human-readable label from types array
const getLabelFromTypes = (types = []) => {
  const lowered = types.map((t) => t.toLowerCase());

  if (lowered.some((t) => t.includes("shop"))) return "Shopping Mall";
  if (lowered.includes("school")) return "School";
  if (lowered.includes("bank")) return "Bank";
  if (lowered.includes("pharmacy")) return "Pharmacy";
  if (lowered.includes("transit_station")) return "Public Transit";

  return "Nearby Place";
};

const DistanceComponent = ({ coordinates }) => {
  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!coordinates) return;

      setIsLoading(true);

      const fetchPromise = (async () => {
        const { latitude, longitude } = coordinates;
        const location = `${latitude},${longitude}`;
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        const foundPlaces = [];
        const destinations = [];

        // 1. Fetch nearest places for each type
        for (const { type, icon } of PLACE_TYPES) {
          const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2000&type=${type}&key=${API_KEY}`;
          const placesRes = await axios.get(
            `/api/proxy?url=${encodeURIComponent(placesUrl)}`
          );

          const place = placesRes.data.results?.[0];
          if (place) {
            foundPlaces.push({
              type,
              icon,
              name: place.name,
              types: place.types,
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            });

            destinations.push(
              `${place.geometry.location.lat},${place.geometry.location.lng}`
            );
          } else {
            destinations.push(""); // placeholder to maintain index
            foundPlaces.push(null);
          }
        }

        // 2. Fetch distances
        const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location}&destinations=${destinations.join(
          "|"
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_DISTANCE_API_KEY}`;
        const distanceRes = await axios.get(
          `/api/proxy?url=${encodeURIComponent(distanceUrl)}`
        );

        const distanceElements = distanceRes.data.rows?.[0]?.elements || [];

        // 3. Combine place info with distance
        const finalData = foundPlaces.map((place, idx) => {
          if (!place) return null;

          const distanceInfo = distanceElements?.[idx];
          const distanceText =
            distanceInfo?.status === "OK" ? distanceInfo.distance.text : null;

          return {
            ...place,
            label: getLabelFromTypes(place.types),
            distance: distanceText,
          };
        });

        return finalData.filter(Boolean);
      })();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 60000)
      );

      try {
        const result = await Promise.race([fetchPromise, timeoutPromise]);
        setPlacesData(result);
      } catch (error) {
        console.error("Error fetching distance data:", error);
        setPlacesData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coordinates]);

  if (isLoading) {
    return <DistanceInfoSkeleton />;
  }


  if (!placesData || placesData.length === 0) {
    return null;
  }

  return (
    <div className="grid p-4 md:my-[3rem] md:p-0 text-xs grid-cols-2 lg:grid-cols-3 gap-4 mt-6 2xl:text-base text-gray-700 md:text-sm">
      {placesData.map(({ type, icon, name, label, distance }) => (
        <div
          key={type}
          className={`flex items-start gap-2 ${type === "pharmacy" ? "hidden lg:flex" : ""
            }`}
        >
          <Image src={icon} alt={label} width={20} height={20} />
          <div className="flex flex-col">
            <span className="text-primary font-[500] lowercase">{name}</span>
            <span className="text-gray-500 text-xs">
              {label} {distance ? `· ${distance}` : ""}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Breadcrumb = ({
  handleToggleListings,
  region,
  address,
  isFavorite,
  listingId,
  handleFavoriteClick,
}) => {
  return (
    <div className="hidden md:flex items-center justify-around py-2 md:w-full mt-[5rem] bg-gray-100">
      {/* Left Section: Back Arrow and Breadcrumb */}
      <div className="flex w-full gap-1 text-[1.08rem]  items-center font-bricolage text-gray-600">
        {/* Back Arrow */}
        <Image
          src="/arrow-right.png"
          alt="arrow"
          height={12}
          width={12}
          onClick={() => window.history.back()}
          className=" w-4 h-4 object-contain"
        />

        {/* Breadcrumb Links */}
        <span className="text-gray-500">Search |</span>
        {/* Breadcrumb item: Homes for Sale */}
        <div className="flex font-light items-center gap-1">
          <a href="/search" className="text-primary">
            Homes for sale
          </a>
        </div>

        {/* Breadcrumb item: Nigeria */}
        <div className="flex items-center gap-1">
          <Image
            src="/arrow-right-top.png"
            alt="arrow"
            height={12}
            width={12}
          />
          <a href="#" className="text-primary">
            {region}
          </a>
        </div>

        {/* Breadcrumb item: Magodo Estate */}
        <div className="flex items-center gap-1">
          <Image
            src="/arrow-right-top.png"
            alt="arrow"
            height={12}
            width={12}
          />
          <a href="#" className="text-primary">
            {truncateDescription(address, 3)}
          </a>
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center md:-ml-[4rem] gap-2">
        <div
          onClick={handleFavoriteClick}
          className={`p-2 border cursor-pointer border-[#8F8F8F] rounded-md `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "#09858D" : "none"} // fill if favorite
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8F8F8F"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3.75a5.25 5.25 0 00-4.5 2.472A5.25 5.25 0 007.5 3.75 5.25 5.25 0 003 9c0 7.125 9 11.25 9 11.25s9-4.125 9-11.25a5.25 5.25 0 00-5.25-5.25z"
            />
          </svg>
        </div>
        <div
          onClick={handleShareClick}
          className="p-2 border border-[#8F8F8F] rounded-md"
        >
          <Image
            width={500}
            height={300}
            src="/upload.svg"
            alt="Download"
            className="w-4 h-4"
          />
        </div>
        <div
          onClick={handleToggleListings}
          className="p-2 border border-[#8F8F8F] rounded-md"
        >
          <Image
            width={500}
            height={300}
            src="/image2.svg"
            alt="Share"
            className="w-4 h-4"
          />
        </div>
      </div>

      <div></div>
    </div>
  );
};

const RentDetailsClient = () => {
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();
  const router = useRouter(); // Tab state

  const { data: listing, isLoading: isAllLoading } =
    useGetListingBySlugQuery({ slug });

  // Extract listingId from the response for favorites and other operations
  const listingId = listing?.listing?._id;

  const { data: allListings, refetch } = useGetAllListingsQuery({
    listingType: "rent",
  });

  const [displayListings, setDisplayListings] = useState([]);
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [isFavorite, setIsFavorite] = useState();
  const [removeFavorite] = useDeleteFavoriteMutation();
  const [showListings, setShowListings] = useState(true);

  const { data: favorites } = useGetFavoritesQuery();

  useEffect(() => {
    if (favorites && listingId) {
      // favorites is an array of favorite listings
      const found = favorites.some((fav) => fav.listingId === listingId);
      setIsFavorite(found);
    }
  }, [favorites, listingId]);
  log(isFavorite);
  // Function to toggle the listings se ction
  const handleToggleListings = () => {
    setShowListings((prev) => !prev);
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(listingId).unwrap();
        toast.success("Removed from favorites!");
        setIsFavorite(false);
      } else {
        await toggleFavorite({ listingId }).unwrap();
        toast.success("Added to favorites!");
        setIsFavorite(true);
      }
    } catch (error) {
      toast.error(error?.error || error?.message);
      router.push("/auth/sign-in");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!isAllLoading && allListings) {
      const firstThreeListings = allListings.listings?.slice(0, 3);
      setDisplayListings(firstThreeListings); // Store in state
    }
  }, [allListings, isAllLoading]);

  // These map the highlight text to the corresponding field(s) in the data
  const featureMap = {
    "Pet allowed": (item) => item?.petFriendly,
    Laundry: (item) => item?.laundryType?.length > 0,
    Balcony: (item) => item?.amenities?.length > 0,
    // airCondition: (item) => item?.airCondition?.length > 0,
    "Garage parking": (item) => item?.parkingType,
    // Add more mappings as needed
  };

  // Dynamically filter highlights based on what's in the listing.item
  const relevantHighlights = highlights.filter((highlight) =>
    featureMap[highlight.text]?.(listing?.listing?.item)
  );

  const {
    averageRating,
    createdAt,
    editingCount,
    clickCount,
    item, // This contains nested properties
    itemModel,
    listedBy,
    listingType,
    region,

    title,

    _id,
  } = listing?.listing || {}; // Provide a fallback to avoid errors when data is not available
  const { imageUrls } = listing?.listing || {};

  const images = imageUrls || [];
  const totalImages = 12; // 4 columns * 3 rows

  // Repeat images using mapping (no while loop)
  const extendedImages = Array.from({ length: totalImages }, (_, index) => {
    return images[index % images.length]; // loop over images if not enough
  });

  const {
    _id: itemId,
    title: itemTitle,
    bathrooms: bathrooms,
    address: address,
    bedrooms: bedrooms,
    type,
    squareFeet,
    coordinate: coordinate,
    description: description,
    private: isPrivate,
    price,

    landSize,
  } = item || {};

  // Destructuring `listedBy` if needed
  const { _id: listedById, fullname, pictureUrl } = listedBy || {};

  // Now you can use the variables directly

  if (isAllLoading) {
    return (
      <div className="w-screen flex justify-center flex-col items-center">
        <div className="md:max-w-[1240px] flex pt-8 flex-col items-center justify-center w-full">
          <BreadcrumbSkeleton />
          <ImageGallerySkeleton />
          <ImageGalleryMobileSkeleton />
          <PropertyHeaderSkeleton />
          <PropertyStatsSkeleton />
          <HomeHighlightsSkeleton />
          <DescriptionSkeleton />
          <div className="w-full px-4 py-6">
            <div className="h-6 bg-[#ecebebd7] rounded shimmer w-48 mb-4 animate-pulse" />
            <ProfileCardSkeleton />
          </div>
          <MapSkeleton />
          <ContactAgentSkeleton />
          <RelatedListingsSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className=" md:max-w-[1240px]   flex justify-center flex-col items-center ">
      <div className=" flex pt-8 flex-col items-center justify-center ">
        <Breadcrumb
          handleToggleListings={handleToggleListings}
          handleFavoriteClick={handleFavoriteToggle}
          listingId={listingId}
          address={address}
          region={region}
          isFavorite={isFavorite}
        />
        {showListings && (
          <div className="w-full">
            <DynamicImageGrid
              listingId={_id}
              images={images}
              handleFavoriteClick={handleFavoriteToggle}
              coordinates={coordinate}
            />

            <div className="lg:hidden">
              <DynamicImageMobile
                listingId={_id}
                images={images}
                handleFavoriteClick={handleFavoriteToggle}
                showListings={showListings}
                coordinates={coordinate}
              />
            </div>
          </div>
        )}

        {/* second div layout  */}

        <div
          className={`bg-gray-100 p-4 md:pt-[3rem] md:p-0  w-full rounded-lg ${!showListings ? "mt-[2rem] md:mt-0" : ""
            }`}
        >
          <div className="flex  md:flex-row justify-between items-start md:items-center  gap-6 md:gap-4">
            {/* Left Section */}
            <div className="flex-1 flex flex-col gap-2 md:flex">
              <h2 className="text-xl lg:text-[2rem] hidden md:block font-bricolage font-semibold">
                {truncateDescription(address, 10)}              </h2>
              <h2 className="text-xl md:text-[2rem] md:hidden font-bricolage font-semibold">
                {truncateDescription(address, 3)}
              </h2>

              {/* Address */}
              <div className=" text-black text-sm  font-light md:text-gray block md:text-base">
                {/* <p>{truncateDescription(address, 10)}</p> */}
                <p>{region}</p>
              </div>

              {/* Views moved to bottom row */}
            </div>

            <div className="text-right flex-1 md:-mt-[2.5rem]  flex flex-col  gap-[0.5rem] md:flex md:text-right w-full md:w-auto">
              <p className="text-[1.5rem] text-black font-[600] md:font-bold">
                {formatPrice(region, price)}
              </p>

              <div className="flex items-center  gap-3 justify-end mt-1 text-gray-700">
                <Image
                  width={500}
                  height={500}
                  src="/stargreen.png"
                  alt="Star"
                  className="w-5 h-5"
                />
                <span className=" font-light">{averageRating}</span>
              </div>

              {/* <p className=" md:text-gray  font-light text-sm md:text-base">
                Est. ${price}/month
              </p> */}

              {/* Actions moved to bottom row */}
            </div>
          </div>

          {/* New Row: Views and Actions */}
          <div className="flex flex-row justify-between items-center w-full mt-4 md:mt-2">
            {/* Views */}
            <div className="flex items-center gap-2 text-gray-700">
              <Image
                width={500}
                height={500}
                src="/eye.svg"
                alt="Views"
                className="w-5 h-5"
              />
              <span className="font-light text-sm md:text-base text-black">
                Total views {clickCount?.toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 md:hidden">
              <div
                onClick={handleFavoriteToggle}
                className="justify-center cursor-pointer flex items-center w-8 h-8 border border-[#8F8F8F] rounded-sm hover:bg-gray-50 bg-transparent"
              >
                <Image
                  width={20}
                  height={20}
                  src="/favorite.svg"
                  alt="Favorite"
                  className="w-4 h-4"
                />
              </div>
              <div
                onClick={handleShareClick}
                className="justify-center cursor-pointer flex items-center w-8 h-8 border border-[#8F8F8F] rounded-sm hover:bg-gray bg-transparent"
              >
                <Image
                  width={20}
                  height={20}
                  src="/upload.svg"
                  alt="Share"
                  className="w-4 h-4"
                />
              </div>
              <div
                onClick={handleToggleListings}
                className="justify-center cursor-pointer flex items-center w-8 h-8 border border-[#8F8F8F] rounded-sm hover:bg-gray-50 bg-transparent"
              >
                <Image
                  width={20}
                  height={20}
                  src="/image2.svg"
                  alt="Gallery"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-3 md:mt-[1.4rem] border-t border-b border-[#8F8F8F] py-3 ">
          <div className="flex items-center justify-center gap-[1.1rem] flex-wrap md:gap-[6.5rem] text-[#8F8F8F] font-bricolage text-sm 2xl:text-xl md:text-base">
            <div className="flex items-center gap-4  md:gap-[8rem]">
              <span className="flex items-center gap-1">
                <span className="font-light text-black">{bedrooms}</span>
                <span>Beds</span>
              </span>
            </div>

            <span className="text-gray-400">|</span>

            <div className="flex items-center gap-1">
              <span className="font-light text-black">{bathrooms}</span>
              <span>Baths</span>
            </div>

            <span className="text-gray-400">|</span>

            <div className="flex items-center gap-1">
              <span className="font-light text-black">
                {listingType === "land"
                  ? landSize
                  : listingType === "sale"
                    ? squareFeet
                    : "-"}
              </span>
              <span>sq ft</span>
            </div>

            <span className="text-gray-400">|</span>
            <div className="flex items-center gap-1">
              <span className="font-light text-black">
                {listingType === "rent"
                  ? "-"
                  : listingType === "land"
                    ? landSize
                      ? formatPrice(region, Number(price) / Number(landSize))
                      : "-"
                    : squareFeet
                      ? formatPrice(region, Number(price) / Number(squareFeet))
                      : "-"}
              </span>

              <span>price per sq ft</span>
            </div>
          </div>
        </div>

        <div className="w-full px-4 pt-6 md:px-0 md:pt-[2.5rem]">
          <h2 className="text-xl font-bold text-black font-bricolage">
            Home Highlights
          </h2>
          {relevantHighlights.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 text-[#8F8F8F] font-bricolage text-sm">
              {relevantHighlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Image
                    src={item.icon}
                    alt={item.text}
                    width={20}
                    height={20}
                    className="object-contain"
                    quality={100}
                  />
                  <span className="2xl:text-xl">{item.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#8F8F8F] font-bricolage text-sm mt-4">
              No home highlights found for this listing.
            </p>
          )}
        </div>

        {/* description */}
        <div className=" w-full px-4 pt-6 md:px-0 md:pt-[2.5rem]">
          <h2 className="text-xl font-bold text-black font-bricolage">
            Description
          </h2>
          <div>
            <p className=" text-[#8F8F8F] font-bricolage text-sm md:text-[18px] font-[300]  md:w-[73rem] 2xl:w-full 2xl:text-xl pt-4">
              {description}
            </p>
          </div>
        </div>

        {/* listed by agent */}
        <div className=" w-full px-4 md:px-0  py-6 md:py-[2.5rem] ">
          <h2 className="text-xl font-bold text-black  font-bricolage">
            Listed by Agent
          </h2>
          <div className="pt-4">
            <ListedCard id={listedById} name={fullname} picture={pictureUrl} />
          </div>
        </div>

        {/* map */}
        <div className="bg-gray-100   w-full rounded-lg">
          <h2 className="text-xl font-semibold mb-4 pl-4 md:pl-0 md:mt-[2rem]  md:ml-2 ">
            Map
          </h2>

          {/* Map Container */}
          <div className="w-screen  pt-4 md:w-full relative rounded-lg  flex items-center overflow-hidden ">
            <MapComponent coordinates={coordinate} listings={listing?.listing ? flattenListings([listing.listing]) : []} />
            {/* <div className="py-4  px-2 absolute bg-[#ffffff] w-[24rem] rounded-lg bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-700 text-sm">
              <span className="font-medium">
                {displayListings?.length} Homes available in{" "}
                {truncateDescription(address, 1)}
              </span>
            </div> */}
          </div>

          {/* Distance Information*/}
          <DistanceComponent coordinates={coordinate} />

          {/* <div className="grid p-4 md:p-0 text-xs grid-cols-2 md:grid-cols-3 md:grid-cols-3 gap-4 mt-6  2xl:text-base text-gray-700 md:text-sm">
          <div className="flex items-center gap-2">
            <Image src="/bus.png" alt="Bus" width={20} height={20} />
            <span className="text-primary  font-medium">.... 5 mins</span> to
            Public Transit
          </div>
          <div className="flex items-center gap-2">
            <Image src="/bank.png" alt="Bank" width={20} height={20} />
            <span className="text-primary font-medium">.... 15 mins</span> to
            Bank
          </div>
          <div className="flex items-center gap-2">
            <Image src="/shopping.png" alt="Shopping" width={20} height={20} />
            <span className="text-primary font-medium">.... 20 mins</span> to
            Shopping mall
          </div>
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="School" width={20} height={20} />
            <span className="text-primary font-medium">.... 10 mins</span> to
            School
          </div>
          <div className=" hidden md:flex items-center gap-2">
            <Image src="/pharmacy.png" alt="Pharmacy" width={20} height={20} />
            <span className="text-primary font-medium ">.... 15 mins</span> to
            Pharmacy
          </div>
        </div> */}
        </div>

        {/*contat agency  */}
        <ContactAgent
          location={region}
          listingId={listingId}
          profileimage={pictureUrl}
          fullname={fullname}
          listedBy={listedBy?._id}
        />
        {displayListings && (
          <div className="hidden md:mt-[1.5rem] md:-mb-[2rem]  md:block w-full">
            <section className="mt-[3rem]  hidden   font-bricolage md:flex  flex-col flex-1 ">
              <div className="flex flex-col items-start gap-6 justify-center md:max-w-[1200px]w-full">
                <div className="flex flex-col md:flex-row justify-between items-start w-full  mx-auto">
                  <h1 className="text-black text-[24px] mt-[32px] md:mt-0  md:text-[2.5rem] font-[600] w-full md:w-auto">
                    Single Family Homes for Rent
                  </h1>
                  <p className="text-gray font-light text-sm md:max-w-[30rem] md:text-xl font-bricolage w-full md:w-auto text-start md:text-left">
                    Browse curated listings that match your style, budget and
                    location preferences.
                  </p>
                </div>
                <div className="flex flex-col ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-[1em] min-w-fit items-center justify-center mb-2">
                    {displayListings
                      ?.filter((listing) => listing?._id !== listingId)
                      .map((listing, index) => (
                        <HoverCard
                          key={index}
                          {...listing}
                          _id={listing._id}
                          imageSrc={listing?.imageUrls?.[0]?.url || "/house1.png"}
                          altText={
                            listing?.imageUrls?.[0]?.altText ||
                            "Property image showcasing a beautiful home"
                          }
                          region={listing?.region || "Region not specified"}
                          price={listing?.item?.price || "Price not available"}
                          area={listing?.item?.squareFeet}
                          description={
                            listing?.item?.description ||
                            "No description available for this property."
                          }
                          title={listing?.item?.title || "Untitled Property"}
                          rent={
                            listing?.item?.rent || "Rent details not provided"
                          }
                        />
                      ))}
                  </div>
                </div>
              </div>
            </section>
          </div>)}



      </div>
    </div>
  );
};

export default RentDetailsClient;
