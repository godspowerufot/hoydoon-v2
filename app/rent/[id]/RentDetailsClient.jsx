/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useToggleFavoriteMutation,
  useGetAllListingsQuery,
  useGetListingBySlugQuery,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
  useSendMessageMutation,
} from "@/store/slices/api/authapi";
import { usePathname, useRouter } from "next/navigation";
import MapComponent from "@/app/components/layouts/listingmap";
import { toast } from "react-toastify";
import {
  handleShareClick,
  flattenListings,
  formatPrice,
  encodeId,
} from "@/utils";
import ListingGallery from "@/app/components/listing/ListingGallery";
import PropertyCard from "@/app/components/home/PropertyCard";
import { highlights } from "@/constants";
import axios from "axios";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Eye,
  LandPlot,
  Mail,
  MapPin,
  Star,
} from "lucide-react";

const PLACE_TYPES = [
  { type: "transit_station", icon: "/bus.png" },
  { type: "bank", icon: "/bank.png" },
  { type: "shopping_mall", icon: "/shopping.png" },
  { type: "school", icon: "/school.png" },
  { type: "pharmacy", icon: "/pharmacy.png" },
];

const JUMP_LINKS = [
  ["overview", "Overview"],
  ["facts", "Facts & features"],
  ["nearby", "Nearby"],
];

const getLabelFromTypes = (types = []) => {
  const lowered = types.map((t) => t.toLowerCase());
  if (lowered.some((t) => t.includes("shop"))) return "Shopping";
  if (lowered.includes("school")) return "School";
  if (lowered.includes("bank")) return "Bank";
  if (lowered.includes("pharmacy")) return "Pharmacy";
  if (lowered.includes("transit_station")) return "Transit";
  return "Nearby";
};

function DistanceComponent({ coordinates }) {
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
            });
            destinations.push(
              `${place.geometry.location.lat},${place.geometry.location.lng}`
            );
          } else {
            destinations.push("");
            foundPlaces.push(null);
          }
        }

        const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location}&destinations=${destinations.join(
          "|"
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_DISTANCE_API_KEY}`;
        const distanceRes = await axios.get(
          `/api/proxy?url=${encodeURIComponent(distanceUrl)}`
        );
        const distanceElements = distanceRes.data.rows?.[0]?.elements || [];

        return foundPlaces
          .map((place, idx) => {
            if (!place) return null;
            const distanceInfo = distanceElements?.[idx];
            return {
              ...place,
              label: getLabelFromTypes(place.types),
              distance:
                distanceInfo?.status === "OK" ? distanceInfo.distance.text : null,
            };
          })
          .filter(Boolean);
      })();

      try {
        const result = await Promise.race([
          fetchPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 60000)
          ),
        ]);
        setPlacesData(result);
      } catch {
        setPlacesData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coordinates]);

  if (isLoading) {
    return (
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="shimmer h-20 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!placesData.length) return null;

  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {placesData.map(({ type, icon, name, label, distance }) => (
        <div
          key={type}
          className="flex items-start gap-3 rounded-2xl border border-[#ececec] bg-[#ffffff] px-4 py-3"
        >
          <Image src={icon} alt="" width={18} height={18} className="mt-0.5" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#2a2a33]">{name}</p>
            <p className="text-xs text-[#6f6f78]">
              {label}
              {distance ? ` · ${distance}` : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactCard({
  fullname,
  location,
  listingId,
  profileimage,
  listedBy,
  formId,
}) {
  const [message, setMessage] = useState(
    "I am interested in this home. Please send more details."
  );
  const [sendMessage] = useSendMessageMutation();
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!message.trim()) return;
    setIsSending(true);
    try {
      await sendMessage({ message, listedBy, listingId }).unwrap();
      setMessage("");
      toast.success("Message sent successfully.");
    } catch (err) {
      if (err?.data?.error === "ACCESS DENIED: No token provided") {
        toast.error("Kindly sign in to contact the agent.");
        router.push("/auth/sign-in");
      } else {
        toast.error("Could not send the message. Try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <aside
      id={formId}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-[#ececec] bg-[#ffffff] shadow-[0_8px_24px_rgba(20,20,30,0.06)]"
    >
      <div className="bg-[#f3fbfb] px-6 py-5">
        <p className="font-heading text-lg font-semibold text-[#111]">
          Request a tour
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#5c5c66]">
          {fullname || "A Hoydoon agent"} typically replies within 10 minutes.
        </p>
      </div>
      <div className="px-6 py-5">
        <Link
          href={listedBy ? `/agent/${encodeId(listedBy)}` : "/agent"}
          className="flex items-center gap-3"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#eee]">
            <Image
              src={profileimage || "/Avatar.svg"}
              alt={fullname || "Agent"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2a2a33]">
              {fullname || "Hoydoon agent"}
            </p>
            <p className="text-xs capitalize text-[#6f6f78]">
              {location || "Local agent"}
            </p>
          </div>
        </Link>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-4 w-full resize-none rounded-2xl border border-[#ececec] bg-[#f7f7f8] px-4 py-3 text-sm text-[#2a2a33] outline-none transition-colors focus:border-primary focus:bg-[#ffffff]"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isSending}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-[#fff] transition-colors duration-200 hover:bg-[#07757c] disabled:opacity-60"
        >
          <Mail className="h-4 w-4" />
          {isSending ? "Sending" : "Request a tour"}
        </button>
        <p className="mt-3 text-center text-xs leading-relaxed text-[#8a8a8a]">
          By sending, you agree to be contacted about this listing.
        </p>
      </div>
    </aside>
  );
}

function FactGroup({ title, rows }) {
  const items = rows.filter((row) => row.value || row.value === 0);
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#2a2a33]">{title}</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl border border-[#ececec] bg-[#ffffff] px-4 py-3"
          >
            <p className="text-xs text-[#6f6f78]">{row.label}</p>
            <p className="mt-1 text-sm font-medium capitalize text-[#2a2a33]">
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListingSkeleton() {
  return (
    <div className="listing-page pt-14 lg:pt-16">
      <div className="home-container py-6">
        <div className="shimmer aspect-[4/3] w-full rounded-2xl md:h-[460px] md:aspect-auto lg:h-[520px]" />
        <div className="mt-8 shimmer h-10 w-48 rounded-xl" />
        <div className="mt-3 shimmer h-5 w-80 rounded-xl" />
      </div>
    </div>
  );
}

const featureMap = {
  "Solar power system": (item) =>
    item?.amenities?.some((a) => a.toLowerCase().includes("solar")),
  "Walk-in closet": (item) =>
    item?.amenities?.some((a) => a.toLowerCase().includes("walk-in closet")),
  "Garage parking": (item) =>
    item?.parkingType ||
    item?.amenities?.some((a) => a.toLowerCase().includes("garage")),
  Balcony: (item) =>
    item?.amenities?.some((a) => a.toLowerCase().includes("balcony")),
  "Covered patio or porch": (item) =>
    item?.amenities?.some(
      (a) => a.toLowerCase().includes("patio") || a.toLowerCase().includes("porch")
    ),
  Laundry: (item) =>
    item?.laundryType?.length > 0 ||
    item?.amenities?.some((a) => a.toLowerCase().includes("laundry")),
  "Pet allowed": (item) =>
    item?.petFriendly || item?.amenities?.some((a) => a.toLowerCase().includes("pet")),
  "Heating available": (item) =>
    item?.amenities?.some((a) => a.toLowerCase().includes("heating")),
};

export default function RentDetailsClient() {
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();
  const router = useRouter();
  const [descOpen, setDescOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const { data: listing, isLoading } = useGetListingBySlugQuery({ slug });
  const listingId = listing?.listing?._id;
  const currentType = listing?.listing?.listingType || "rent";

  const { data: allListings, refetch } = useGetAllListingsQuery({
    listingType: currentType,
  });
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [removeFavorite] = useDeleteFavoriteMutation();
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: favorites } = useGetFavoritesQuery();

  useEffect(() => {
    if (favorites && listingId) {
      setIsFavorite(favorites.some((fav) => fav.listingId === listingId));
    }
  }, [favorites, listingId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const ids = JUMP_LINKS.map(([id]) => id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.45] }
    );

    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [listingId]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(listingId).unwrap();
        toast.success("Removed from favorites.");
        setIsFavorite(false);
      } else {
        await toggleFavorite({ listingId }).unwrap();
        toast.success("Added to favorites.");
        setIsFavorite(true);
      }
    } catch (error) {
      toast.error(error?.error || error?.message || "Please sign in.");
      router.push("/auth/sign-in");
    }
  };

  if (isLoading) return <ListingSkeleton />;

  const {
    averageRating,
    clickCount,
    item,
    listedBy,
    listingType,
    region,
    _id,
  } = listing?.listing || {};
  const { imageUrls, video } = listing?.listing || {};
  const images = imageUrls || [];
  const {
    bathrooms,
    address,
    bedrooms,
    squareFeet,
    coordinate,
    description,
    price,
    landSize,
    houseType,
    parkingType,
    laundryType,
    petFriendly,
    dateAvailable,
    amenities,
    title,
  } = item || {};
  const { _id: listedById, fullname, pictureUrl } = listedBy || {};

  const relevantHighlights = highlights.filter((highlight) =>
    featureMap[highlight.text]?.(item)
  );
  const related = flattenListings(allListings?.listings || [])
    .filter((entry) => entry?._id !== listingId)
    .slice(0, 4);

  const areaValue = listingType === "land" ? landSize : squareFeet;
  const pricePerSqft =
    listingType === "rent" || !areaValue || !price
      ? null
      : formatPrice(region, Number(price) / Number(areaValue));

  const typeLabel =
    listingType === "sale"
      ? "For sale"
      : listingType === "rent"
        ? "For rent"
        : listingType === "land"
          ? "Land"
          : "Listing";

  const longDescription = (description || "").trim().length > 360;
  const shownDescription =
    longDescription && !descOpen
      ? `${(description || "").trim().slice(0, 360).trim()}...`
      : (description || "").trim();

  const displayPrice = formatPrice(region, price);
  const priceSuffix = listingType === "rent" ? "/mo" : "";

  const metrics = [
    bedrooms != null && bedrooms !== ""
      ? { label: "Beds", value: bedrooms, icon: BedDouble }
      : null,
    bathrooms != null && bathrooms !== ""
      ? { label: "Baths", value: bathrooms, icon: Bath }
      : null,
    areaValue
      ? { label: "Sqft", value: areaValue, icon: LandPlot }
      : null,
  ].filter(Boolean);

  const parkingLabel =
    Array.isArray(parkingType) && parkingType.length
      ? parkingType.join(", ")
      : null;
  const laundryLabel =
    Array.isArray(laundryType) && laundryType.length
      ? laundryType.join(", ")
      : null;
  const petsLabel =
    petFriendly === true ? "Allowed" : petFriendly === false ? "Not allowed" : null;
  const interiorRows = [
    { label: "Beds", value: bedrooms },
    { label: "Baths", value: bathrooms },
    { label: "Laundry", value: laundryLabel },
    { label: "Pets", value: petsLabel },
  ];
  const propertyRows = [
    { label: "Type", value: houseType || listingType },
    { label: "Size", value: areaValue ? `${areaValue} sqft` : null },
    { label: "Price / sqft", value: pricePerSqft },
    { label: "Available", value: dateAvailable },
  ];
  const parkingRows = [{ label: "Parking", value: parkingLabel }];
  const hasFacts = [...interiorRows, ...propertyRows, ...parkingRows].some(
    (row) => row.value || row.value === 0
  );
  const amenityLabels = amenities?.length
    ? amenities
    : relevantHighlights.map((itemHighlight) => itemHighlight.text);

  return (
    <div className="listing-page pb-24 lg:pb-0">
      <div className="home-container pt-14 lg:pt-16">
        <nav className="flex items-center gap-2 py-5 text-sm text-[#6f6f78]">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 rounded-full px-1 py-1 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <span aria-hidden="true">/</span>
          <Link href="/search" className="hover:text-primary">
            Search
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/search?listingType=${listingType || "sale"}`}
            className="hover:text-primary"
          >
            {typeLabel}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="capitalize text-[#2a2a33]">{region}</span>
        </nav>

        <ListingGallery
          images={images}
          video={video}
          listingId={_id}
          coordinates={coordinate}
          isFavorite={isFavorite}
          onFavorite={handleFavoriteToggle}
          onShare={handleShareClick}
        />

        <div className="grid items-start gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 lg:py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {typeLabel}
            </p>
            <h1 className="mt-2 font-heading text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-[#111] md:text-5xl">
              {displayPrice}
              {priceSuffix ? (
                <span className="ml-1.5 text-2xl font-medium text-[#5c5c66]">
                  {priceSuffix}
                </span>
              ) : null}
            </h1>
            <p className="mt-3 flex items-start gap-2 text-base text-[#5c5c66] md:text-lg">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span>
                {address || "Address available on request"}
                {region ? `, ${region}` : ""}
              </span>
            </p>
            {title ? (
              <p className="mt-1 text-sm text-[#6f6f78]">{title}</p>
            ) : null}

            {metrics.length ? (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-[#ececec] bg-[#f7f7f8] px-3 py-4 md:px-5"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <p className="mt-3 font-heading text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs text-[#6f6f78] md:text-sm">
                        {metric.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#6f6f78]">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-primary text-primary" />
                {averageRating || 0} rating
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {clickCount?.toLocaleString() || 0} views
              </span>
            </div>

            <div className="listing-jump mt-8">
              <div className="flex gap-1 rounded-full bg-[#f7f7f8] p-1">
                {JUMP_LINKS.map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`flex-1 rounded-full px-3 py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
                      activeSection === id
                        ? "bg-[#ffffff] text-primary shadow-[0_8px_24px_rgba(20,20,30,0.06)]"
                        : "text-[#5c5c66] hover:text-[#2a2a33]"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <section id="overview" className="scroll-mt-36 pb-4">
              <h2 className="font-heading text-xl font-semibold leading-none tracking-tight text-[#2a2a33] md:text-2xl">
                Overview
              </h2>
              <p className="mt-0.5 max-w-2xl whitespace-pre-line text-sm leading-5 text-[#5c5c66]">
                {(shownDescription || "No description has been added for this listing.").trim()}
              </p>
              {longDescription ? (
                <button
                  type="button"
                  onClick={() => setDescOpen((open) => !open)}
                  className="mt-1 text-sm font-semibold text-primary transition-colors duration-200 hover:text-[#076b72]"
                >
                  {descOpen ? "Show less" : "Show more"}
                </button>
              ) : null}
            </section>

            <section id="facts" className="scroll-mt-36 py-10">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#2a2a33] md:text-3xl">
                Facts & features
              </h2>
              {hasFacts ? (
                <div className="mt-6 space-y-8 rounded-2xl bg-[#f7f7f8] p-5 md:p-6">
                  <FactGroup title="Interior" rows={interiorRows} />
                  <FactGroup title="Property" rows={propertyRows} />
                  <FactGroup title="Parking" rows={parkingRows} />
                </div>
              ) : null}

              {amenityLabels.length ? (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-[#2a2a33]">
                    Interior & amenities
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {amenityLabels.map((label) => (
                      <li
                        key={label}
                        className="rounded-full border border-[#ececec] bg-[#f7f7f8] px-3.5 py-1.5 text-sm text-[#3f3f3f]"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>

            <section className="py-10">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#2a2a33] md:text-3xl">
                Listed by
              </h2>
              <Link
                href={listedById ? `/agent/${encodeId(listedById)}` : "/agent"}
                className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#ececec] bg-[#ffffff] p-5 shadow-[0_8px_24px_rgba(20,20,30,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#eee]">
                    <Image
                      src={pictureUrl || "/Avatar.svg"}
                      alt={fullname || "Agent"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2a2a33]">
                      {fullname || "Hoydoon agent"}
                    </p>
                    <p className="text-sm capitalize text-[#6f6f78]">
                      {region || "Local specialist"}
                    </p>
                  </div>
                </div>
                <span className="hidden h-10 shrink-0 items-center rounded-full border border-primary px-4 text-sm font-semibold text-primary sm:inline-flex">
                  View profile
                </span>
              </Link>
            </section>

            <section id="nearby" className="scroll-mt-36 py-10">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#2a2a33] md:text-3xl">
                Nearby
              </h2>
              <p className="mt-2 max-w-xl text-base text-[#5c5c66]">
                Schools, shops, and transit around this home.
              </p>
              <div className="mt-5 h-[320px] overflow-hidden rounded-2xl border border-[#ececec] md:h-[380px]">
                <MapComponent
                  coordinates={coordinate}
                  listings={
                    listing?.listing ? flattenListings([listing.listing]) : []
                  }
                />
              </div>
              <DistanceComponent coordinates={coordinate} />
            </section>

            <div className="pb-6 lg:hidden">
              <ContactCard
                formId="contact"
                location={region}
                listingId={listingId}
                profileimage={pictureUrl}
                fullname={fullname}
                listedBy={listedById}
              />
            </div>
          </div>

          <div className="hidden lg:sticky lg:top-24 lg:block">
            <ContactCard
              location={region}
              listingId={listingId}
              profileimage={pictureUrl}
              fullname={fullname}
              listedBy={listedById}
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="home-bleed bg-[#f7f7f8] py-12 md:py-16">
          <div className="home-container">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-[#2a2a33] md:text-3xl">
                Similar homes
              </h2>
              <Link
                href={`/search?listingType=${listingType || "sale"}`}
                className="text-sm font-semibold text-primary transition-colors duration-200 hover:text-[#076b72] md:text-base"
              >
                See all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((entry, index) => (
                <PropertyCard
                  key={entry._id || entry.slug || index}
                  listing={entry}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ececec] bg-[#ffffff]/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-heading text-lg font-semibold leading-none text-[#111]">
              {displayPrice}
              {priceSuffix}
            </p>
            <p className="mt-1 truncate text-xs text-[#6f6f78]">
              {address || typeLabel}
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-[#fff]"
          >
            Request a tour
          </a>
        </div>
      </div>
    </div>
  );
}
