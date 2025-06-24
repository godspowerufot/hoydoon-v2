/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContactAgent from "@/app/components/layouts/contactagent";
import { highlights } from "@/constants";
import {
  useToggleFavoriteMutation,
  useGetAllListingsQuery,
  useGetSpecificListingsQuery,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
} from "@/store/slices/api/authapi";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/app/components/common/Spinner";
import ListedCard from "@/app/components/common/profilecard";
import MapComponent from "@/app/components/layouts/listingmap";
import PropertyCard from "@/app/components/common/property";
import { toast } from "react-toastify";
import { handleShareClick, decodeId, truncateDescription } from "@/utils";
import DynamicImageMobile from "@/app/components/layouts/mobiledynamic";
import DynamicImageGrid from "@/app/components/layouts/dynamiclayout";
import axios from "axios";
import { log } from "@/utils/log";
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

  useEffect(() => {
    const fetchData = async () => {
      if (!coordinates) return;

      const { latitude, longitude } = coordinates;
      const location = `${latitude},${longitude}`;
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const DISTANCE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DISTANCE_API_KEY;

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

      const distanceElements = distanceRes.data.rows[0].elements;

      // 3. Combine place info with distance
      const finalData = foundPlaces.map((place, idx) => {
        if (!place || distanceElements[idx].status !== "OK") return null;

        return {
          ...place,
          label: getLabelFromTypes(place.types),
          distance: distanceElements[idx].distance.text,
        };
      });

      setPlacesData(finalData.filter(Boolean)); // remove nulls
    };

    fetchData();
  }, [coordinates]);
  console.log("placedata", placesData);
  return (
    <div className="grid p-4 lg:p-0 text-xs grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6 2xl:text-base text-gray-700 lg:text-sm">
      {placesData.map(({ type, icon, name, label, distance }) => (
        <div
          key={type}
          className={`flex items-start gap-2 ${
            type === "pharmacy" ? "hidden lg:flex" : ""
          }`}
        >
          <Image src={icon} alt={label} width={20} height={20} />
          <div className="flex flex-col">
            <span className="text-primary font-[500] lowercase">{name}</span>
            <span className="text-gray-500 text-xs">
              {label} · {distance}
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
    <div className="hidden lg:flex items-center justify-between gap-[0.2rem] pl-4 py-2 w-[99%] mt-[5rem] bg-gray-100">
      {/* Left Section: Back Arrow and Breadcrumb */}
      <div className="flex w-1/2 items-start justify-start gap-1 text-[1.08rem] font-bricolage text-gray-600">
        {/* Back Arrow */}
        <Image
          src="/arrow-right.png"
          alt="arrow"
          height={12}
          width={12}
          className="mt-[0.9] mr-2"
        />

        {/* Breadcrumb Links */}
        <span className="text-gray-500">Search |</span>
        {/* Breadcrumb item: Homes for Sale */}
        <div className="flex font-light items-center gap-1">
          <a href="#" className="text-primary">
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
      <div className="flex items-center w-1/2 justify-end gap-2">
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
          <img src="/upload.svg" alt="Download" className="w-4 h-4" />
        </div>
        <div
          onClick={handleToggleListings}
          className="p-2 border border-[#8F8F8F] rounded-md"
        >
          <img src="/image2.svg" alt="Share" className="w-4 h-4" />
        </div>
      </div>

      <div></div>
    </div>
  );
};

const page = () => {
  const pathname = usePathname();
  const Id = pathname?.split("/").pop();
  const listingId = decodeId(Id);
  const router = useRouter(); // Tab state

  const { data: listing, isloading: isAllLoading } =
    useGetSpecificListingsQuery({ listingId });

  const { data: allListings, refetch } = useGetAllListingsQuery();

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
    item, // This contains nested properties
    itemModel,
    listedBy,
    squareFeet,
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
    coordinate: coordinate,
    description: description,
    private: isPrivate,
    price,
  } = item || {};

  // Destructuring `listedBy` if needed
  const { _id: listedById, fullname, pictureUrl } = listedBy || {};

  // Now you can use the variables directly

  if (isAllLoading) {
    return <Spinner />;
  }
  return (
    <div className="lg:mt-8  2xl:w-[98rem] lg:w-[87%]  lg:ml-[2%] ">
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

          <DynamicImageMobile
            listingId={_id}
            images={images}
            handleFavoriteClick={handleFavoriteToggle}
            showListings={showListings}
            coordinates={coordinate}
          />
        </div>
      )}

      {/* second div layout  */}

      <div
        className={`bg-gray-100 p-4 rounded-lg ${
          !showListings ? "mt-[2rem] lg:mt-0" : ""
        }`}
      >
        <div className="flex  md:flex-row justify-between items-start md:items-center  gap-6 lg:gap-4">
          {/* Left Section */}
          <div className="flex-1 flex flex-col  gap-1  lg:flex">
            <h2 className="text-xl lg:text-[2rem] hidden  lg:block font-bricolage font-semibold">
              {title}
            </h2>
            <h2 className="text-xl lg:text-[2rem] lg:hidden font-bricolage font-semibold">
              {truncateDescription(title, 3)}
            </h2>

            {/* Address */}
            <div className=" text-black text-sm  font-light lg:text-gray block lg:text-base">
              <p>{truncateDescription(address, 10)}</p>
              <p>{region}</p>
            </div>

            {/* Views */}
            <div className="flex items-center gap-2 text-gray-700  mt-[0.5rem] lg:mt-2">
              <img
                src="/eye.svg"
                alt="Share"
                className="w-3 h-3 lg:w-5 lg:h-5"
              />
              <span className="lg:font-medium   lg:mt-0 text-base font-light text-black lg:text-black">
                Total views {editingCount?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-right flex-1 lg:-mt-[2.5rem]  flex flex-col  gap-1 lg:flex md:text-right w-full md:w-auto">
            <p className="text-[1.5rem] text-black font-[600] lg:font-bold">
              ${price}
            </p>

            <div className="flex items-center justify-end mt-1 text-gray-700">
              <img src="/stargreen.png" alt="Star" className="w-4 h-4" />
              <span className="ml-1 font-medium">{averageRating}</span>
            </div>

            <p className=" lg:text-gray  font-light text-sm lg:text-base">
              Est. ${price}/month
            </p>

            <div className="flex items-center lg:hidden  lg:p-2 justify-end gap-2 mt-2 w-full md:w-auto">
              <div
                onClick={handleFavoriteToggle}
                className="justify-center flex items-center w-6 h-6 border border-[#8F8F8F] rounded-sm"
              >
                <img src="/favorite.svg" alt="Favorite" className="w-3 h-3" />
              </div>
              <div
                onClick={handleShareClick}
                className=" justify-center lg:p-2 flex items-center w-6 h-6 border border-[#8F8F8F] rounded-sm"
              >
                <img src="/upload.svg" alt="Download" className="w-3 h-3" />
              </div>
              <div
                onClick={handleToggleListings}
                className="justify-center lg:p-2 flex items-center w-6 h-6 border border-[#8F8F8F] rounded-sm"
              >
                <img src="/image2.svg" alt="Share" className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-3 lg:mt-0 border-t border-b border-[#8F8F8F] py-3">
        <div className="flex items-center justify-center gap-[1.1rem] lg:gap-[6.5rem] text-[#8F8F8F] font-bricolage text-sm 2xl:text-xl lg:text-base">
          <div className="flex items-center gap-4  lg:gap-[8rem]">
            <span className="flex items-center gap-1">
              <span className="font-bold text-black">{bedrooms}</span>
              <span>Beds</span>
            </span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex items-center gap-1">
            <span className="font-bold text-black">{bathrooms}</span>
            <span>Baths</span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex items-center gap-1">
            <span className="font-bold text-black">_</span>
            <span>sq ft</span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex items-center gap-1">
            <span className="font-bold text-black">_</span>
            <span>Price per sq ft</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-6">
        <h2 className="text-xl font-bold text-black font-bricolage">
          Home Highlights
        </h2>
        {relevantHighlights.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-[#8F8F8F] font-bricolage text-sm">
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
      <div className=" w-full px-4 py-6">
        <h2 className="text-xl font-bold text-black font-bricolage">
          Description
        </h2>
        <div>
          <p className=" text-[#8F8F8F] font-bricolage text-sm lg:text-[18px] font-[300]  lg:w-[73rem] 2xl:w-full 2xl:text-xl pt-4">
            {description}
          </p>
        </div>
      </div>

      {/* listed by agent */}
      <div className=" w-full px-4 py-6">
        <h2 className="text-xl font-bold text-black font-bricolage">
          Listed by Agent
        </h2>
        <div className="mt-5">
          <ListedCard name={fullname} picture={pictureUrl} />
        </div>
      </div>

      {/* map */}
      <div className="bg-gray-100 lg:p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 pl-4 p-0">Map</h2>

        {/* Map Container */}
        <div className="w-screen lg:w-full relative rounded-lg  flex items-center overflow-hidden">
          <MapComponent coordinates={coordinate} />
          <div className="py-4 px-2 absolute bg-[#ffffff] w-[24rem] rounded-lg bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-700 text-sm">
            <span className="font-medium">
              {displayListings?.length} Homes available in{" "}
              {truncateDescription(address, 1)}
            </span>
          </div>
        </div>

        {/* Distance Information*/}
        <DistanceComponent coordinates={coordinate} />

        {/* <div className="grid p-4 lg:p-0 text-xs grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6  2xl:text-base text-gray-700 lg:text-sm">
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
          <div className=" hidden lg:flex items-center gap-2">
            <Image src="/pharmacy.png" alt="Pharmacy" width={20} height={20} />
            <span className="text-primary font-medium ">.... 15 mins</span> to
            Pharmacy
          </div>
        </div> */}
      </div>

      {/*contat agency  */}
      <ContactAgent
        location={region}
        profileimage={pictureUrl}
        fullname={fullname}
        listedBy={listedBy?._id}
      />
      <div className="hidden lg:block w-full">
        <section className="mt-10  hidden  2xl:mt-[4em] lg:mt-[3em] w-[75rem]  2xl:w-[88rem]  font-bricolage lg:flex  flex-col flex-1 ">
          <div className="flex   w-[92%]  2xl:-mb-[5rem]    flex-col">
            <div className="flex   p-2 flex-col w-[75rem]  2xl:w-[85rem]  md:flex-row 2xl:gap-[25%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
              <h1 className="text-black  text-[26px] lg:text-[1.8rem] font-[600]   w-full ">
                {" "}
                Single Family House Rents
              </h1>
              <p className="text-gray  lg:p-0 text-base  lg:text-xl font-bricolage w-full lg:w-full">
                Discover a home where every detail enhances your
                lifestyle-crafted to fit your taste and needs.
              </p>
            </div>
            <div className="flex flex-col lg:-ml-[2em]  ">
              <div className="flex mt-[1em] h-fit w-full lg:flex-row mb-2">
                {displayListings
                  ?.filter((listing) => listing?._id !== listingId)
                  .map((listing, index) => (
                    <PropertyCard
                      key={index}
                      {...listing}
                      _id={listing._id}
                      imageSrc={listing?.imageUrls?.[0]?.url || "/house1.png"}
                      altText={
                        listing?.imageUrls?.[0]?.altText ||
                        "Property image showcasing a beautiful home"
                      }
                      price={listing?.item?.price || "Price not available"}
                      area={listing?.item?.squareFeet}
                      description={
                        listing?.item?.description ||
                        "No description available for this property."
                      }
                      title={listing?.item?.title || "Untitled Property"}
                      rent={listing?.item?.rent || "Rent details not provided"}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
