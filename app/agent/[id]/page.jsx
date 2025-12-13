"use client";

/* eslint-disable */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContactAgent from "@/app/components/layouts/contactagent";
import { usePathname } from "next/navigation";
import { decodeId, truncateDescription } from "@/utils";
import {
  useGetAgentListingsQuery,
  useGetAgentsInfoQuery,
  useToggleFavoriteMutation,
} from "@/store/slices/api/authapi";
import Spinner from "@/app/components/common/Spinner";
import { log } from "@/utils/log";
import { useRouter } from "next/navigation";
import { handleShareClick } from "@/utils";
import PropertyListCard from "@/app/components/common/PropertyListing";
import { flattenListings, formatNumber } from "@/utils";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const DynamicImageGrid = dynamic(() =>
  import("../../components/layouts/dynamiclayout")
);
const DynamicImageMobile = dynamic(() =>
  import("../../components/layouts/mobiledynamic")
);

const MapComponent = dynamic(() =>
  import("../../components/layouts/listingmap")
);

const Breadcrumb = ({
  handleToggleListings,
  agentDetails,
  handleFavoriteClick,
}) => {
  return (
    <div className="hidden md:flex items-center justify-between  py-4 md:w-full mt-[5rem] bg-gray-100">
      {/* Left Section: Back Arrow and Breadcrumb */}
      <div className="flex items-start justify-center  gap-2 text-[1.08rem] font-bricolage w-full text-gray-600">
        {/* Back Arrow */}

        {/* Breadcrumb Links */}
        <div className="flex  w-full items-center gap-3 text-base text-gray-500">
          {/* Initial Back Arrow + Static Text */}
          <div className="flex font-light items-center gap-1">
            <Image
              src="/arrow-right.png"
              alt="arrow"
              height={12}
              width={12}
              onClick={() => window.history.back()}
              className=" w-4 h-4 object-contain"
            />{" "}
            <span>Search |</span>
          </div>

          {/* Breadcrumb item: Homes for Sale */}
          <div className="flex font-light items-center gap-1">
            <Image
              src="/arrow-right-top.png"
              alt="arrow"
              height={12}
              width={12}
            />
            <a href="/" className="text-primary">
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
              {agentDetails}
            </a>
          </div>
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center md:-ml-[4rem] gap-2">
        <div className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md">
          <Image
            width={500}
            height={300}
            onClick={handleFavoriteClick}
            src="/favorite.svg"
            alt="Favorite"
            className="w-4 h-4"
          />
        </div>
        <div
          style={{ cursor: "pointer" }}
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
          className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md"
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

const page = ({ params }) => {
  const [activeTab, setActiveTab] = useState("all");
  const pathname = usePathname();
  const [flattenedListings, setFlattenedListings] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [ListedBy, setListedBy] = useState([]);
  const [prices, setPrices] = useState([]);
  const [ActiveListings, setActiveListings] = useState([]);

  const Id = pathname?.split("/").pop();
  const userId = decodeId(Id);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter(); // Tab state
  const [showListings, setShowListings] = useState(true);

  // Function to toggle the listings section
  const handleToggleListings = () => {
    setShowListings((prev) => !prev);
  };
  // Handle the "See All" button click
  const handleSeeAllClick = () => {
    setShowAll(true);
  };
  const [coordinates, setCoordinates] = useState([]);
  const [allCoordinates, setAllCoordinates] = useState({
    all: [],
    active: [],
    sold: [],
    bought: [],
  });

  const {
    data: listing,
    isLoading,
    isError,
  } = useGetAgentListingsQuery({ userId });
  const { data: agentInfo } = useGetAgentsInfoQuery({ userId });
  const averagelisting =
    (agentInfo?.priceRange?.min + agentInfo?.priceRange?.max) / 2;
  // Recursive function to fully flatten nested listings
  const [toggleFavorite] = useToggleFavoriteMutation();

  useEffect(() => {
    if (listing?.listings) {
      const flatListings = flattenListings(listing.listings);
      const images = flatListings.flatMap((item) => item.imageUrls || []);
      const statusList = flatListings.map((item) => item.status || "Unknown");
      const totalReviewCount = flatListings.map((item) => item.reviewCount);
      const Price = flatListings.reduce(
        (sum, items) => sum + (items?.item?.price || 0),
        0
      );

      // Extract coordinates
      // Extract coordinates for active listings
      const groupedCoords = {
        all: [],
        active: [],
        sold: [],
        bought: [],
      };

      flatListings.forEach((item) => {
        const coord = item?.item?.coordinate;
        if (coord?.latitude && coord?.longitude) {
          groupedCoords.all.push(coord); // Add to "all"
          const status = item.status?.toLowerCase();
          if (groupedCoords[status]) {
            groupedCoords[status].push(coord);
          }
        }
      }); // ✅ update all state
      setAllCoordinates(groupedCoords);
      setCoordinates(groupedCoords["all"]); // ✅ show all listings on first load
      setActiveTab("all"); // ✅ default active tab

      setFlattenedListings(flatListings);
      setImageUrls(images);
      setStatuses(statusList);
      setListedBy(totalReviewCount);
      setActiveListings(
        flatListings.filter((item) => item.status === "active")
      );
      setPrices(Price);
    }
  }, [listing]);

  log("flattenedListings", listing?.listings[0]?._id);
  const listingId = listing?.listings[0]?._id; // Use the first listing's ID or the provided ID
  const handleFavoriteClick = async () => {
    try {
      await toggleFavorite({ listingId }).unwrap();
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error(error);
      console.error("Failed to favorite listing:", error);
      router.push("/auth/sign-in");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  const tabs = [
    { id: "all", label: "All listings" },
    { id: "active", label: "Active listings" },
    {
      id: "sold",
      label: `Sold with ${truncateDescription(agentInfo?.fullname, 1)}`,
    },
  ];

  // State to control visibility of the listings section

  return (
    <div className="md:max-w-[1240px] flex pt-2 flex-col items-center justify-center ">
      {" "}
      <Breadcrumb
        handleToggleListings={handleToggleListings}
        handleFavoriteClick={handleFavoriteClick}
        listingId={listingId}
        agentDetails={agentInfo?.region}
      />
      {showListings && (
        <div className="grid  w-full md:-mt-1  gap-2 p-3 md:p-0 ">
          <DynamicImageGrid
            statuses={statuses}
            coordinates={coordinates}
            images={imageUrls}
          />
          <DynamicImageMobile
            statuses={statuses}
            coordinates={coordinates}
            images={imageUrls}
          />
        </div>
      )}
      {/* second div layout  */}
      <div
        className={`bg-gray-100 mt-2   w-full md:mt-5 ${
          !showListings ? "mt-[2rem] md:mt-0" : ""
        } md:p-0  md:py-4 rounded-lg`}
      >
        <div className="flex flex-row px-4  md:p-0 justify-between items-start md:items-center">
          {/* Profile Image */}
          <div className="flex mt-4  items-center justify-center md:-mt-3 gap-3">
            <div className="w-[4rem] h-[4rem] relative">
              <Image
                src={agentInfo?.pictureUrl || "/Avatar.svg"} // Replace with actual image path
                alt="Profile Picture"
                fill
                className="rounded-full object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-start  md:mt-3">
              <h2 className="text-xl md:text-[1.7rem] font-bricolage font-semibold">
                {agentInfo?.fullname}
              </h2>
              <p className="text-[#1E1E1E] font-light">{agentInfo?.region}</p>
            </div>
          </div>
          {/* Right Section */}
          <div className="text-right font-bricolage  text-[#1E1E1E] mt-4 md:-mt-[2.5rem]">
            <div className="flex pr-3 md:pr-0 items-center justify-end  my-3 gap-2 md:gap-0 text-gray-700 mt-1">
              <Image
                width={500}
                height={300}
                src="/stargreen.png"
                alt="Favorite"
                className="w-4 h-4"
              />
              <span className="ml-1 font-medium ">{ListedBy}</span>
            </div>
            <p className="text-gray-600 md:mt-1 my-3 text-sm">
              Avg listing ${averagelisting}{" "}
            </p>
            <div className="flex md:hidden items-center justify-end gap-2 mt-3 w-full md:w-auto">
              <div
                onClick={handleFavoriteClick}
                className="p-2 border border-[#8F8F8F] rounded-md"
              >
                <Image
                  width={500}
                  height={300}
                  src="/favorite.svg"
                  alt="Favorite"
                  className="w-4 h-4"
                />
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
                  className="w-4 h-4 object-cover"
                />
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      {/* new layout
       */}
      <div className="w-full border-t border-b border-[#8F8F8F] mt-3 md:mt-0  py-3">
        <div className="flex items-center justify-center gap-2  md:gap-[6.5rem] text-[#8F8F8F] font-bricolage text-sm 2xl:text-xl md:text-base">
          <div className="flex items-center  font-light  test-sm md:text-[18px] gap-3  md:gap-[8rem]">
            <span>
              <span className="font-bold text-black">
                {agentInfo?.numberOfListings}
              </span>
              <span> Listings</span>
            </span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex items-center text-sm md:text-[18px] gap-1">
            <span className="font-bold text-black">
              ${formatNumber(prices)}{" "}
            </span>
            <span>Total value</span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex items-center  text-sm md:text-[18px] gap-1">
            <span className="font-bold text-black">
              ${formatNumber(agentInfo?.priceRange?.min)} - $
              {formatNumber(agentInfo?.priceRange?.max)}
            </span>
            <span> Price range</span>
          </div>
        </div>
      </div>
      {/* second layout */}
      <div className=" w-full mt-[3rem] px-[1.5rem] md:px-0 py-7">
        <h1 className=" text-xl md:text-[2rem] font-semibold ">
          {" "}
          About {agentInfo?.fullname}
        </h1>
        <p className=" text-[#8F8F8F] font-bricolage text-sm md:text-[18px] md:w-[73rem] 2xl:w-full 2xl:text-xl mt-4">
          {agentInfo?.profileDescription || "no description found"}
        </p>
      </div>
      {/* description */}
      {/* map */}
      <div className="bg-gray-100 mt-[3rem]  w-full md:p-0 rounded-lg mb-3">
        <h1 className="text-xl md:text-[2rem] md:py-2 ml-[1.7rem] md:ml-0 font-semibold ">
          {" "}
          {agentInfo?.fullname} Listings & Deals
        </h1>
        <div className="border-b  mt-4  px-[1.75rem] md:px-0  my-4 md:my-3  border-gray ">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCoordinates(allCoordinates[tab.id] || []); // Update map based on tab
                }}
                className={`relative py-2 text-sm md:text-base transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-black font-semibold"
                    : "text-[#8F8F8F]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute left-0 bottom-[-1px] w-full h-[2px] bg-primary"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Map Container */}
        <div className=" mt-3 relative rounded-lg  flex items-center overflow-hidden">
          <div className="relative  w-full">
            {coordinates.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                <div className="text-center text-gray-400 py-4 text-lg">
                  No listings found for this category.
                </div>
              </div>
            )}

            <MapComponent coordinates={coordinates} />
          </div>

          <div className="py-4 px-2 absolute bg-[#ffffff] w-[24rem] rounded-lg bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-700 text-sm">
            <span className="font-medium">
              {ActiveListings.length} Homes available in {agentInfo?.region}
            </span>
          </div>
        </div>

        {/* Distance Information */}
      </div>
      <div className="w-full md:mt-[3rem]  px-7 md:px-0 py-6">
        <h1 className="text-xl md:text-[2rem]   mb-7  font-semibold ">
          {" "}
          {agentInfo?.fullname} Active Listings
        </h1>
        <div className="grid  px-1 md:px-0 grid-cols-1 md:grid-cols-3 gap-1 gap-y-[2rem] place-items-center">
          {/* Display only 3 listings initially, or all listings if showAll is true */}
          {(showAll ? ActiveListings : ActiveListings.slice(0, 3)).map(
            (items, index) => (
              <PropertyListCard
                key={index}
                imageSrc={items?.imageUrls?.[0]?.url}
                altText={items?.imageUrls?.[0]?.altText}
                price={items?.item?.price}
                area={items?.item?.squareFeet}
                description={items?.item?.description}
                title={items?.item?.title}
                rent={items?.item?.rent}
                bathrooms={items?.item?.bathrooms}
                bedrooms={items?.item?.bedrooms}
                {...items}
              />
            )
          )}

          {/* Show "See All" link if we haven't displayed all listings yet */}
          {!showAll && ActiveListings.length > 3 && (
            <div className="w-full md:col-span-2 flex ml-1  -mt-[2rem] justify-start md:ml-0">
              <button
                onClick={handleSeeAllClick}
                className="text-[#09858D] mt-5 text-sm md:text-2xl font-medium"
              >
                See all active listings
              </button>
            </div>
          )}
        </div>
        {/* If we show all listings, display the "See less" button */}
        {showAll && ActiveListings.length > 0 && (
          <div className="w-full md:col-span-2 flex justify-start">
            <button
              onClick={() => setShowAll(false)}
              className="text-[#09858D] mt-5 text-2xl font-medium"
            >
              See less
            </button>
          </div>
        )}
      </div>
      {/*contat agency  */}
      <div className="w-full px-6 md:px-0">
        <ContactAgent
          listedBy={agentInfo?._id}
          location={agentInfo?.region}
          profileimage={agentInfo?.pictureUrl}
          fullname={agentInfo?.fullname}
        />
      </div>
    </div>
  );
};

export default page;
