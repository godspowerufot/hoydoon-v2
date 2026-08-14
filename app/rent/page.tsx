"use client";

import { useMemo } from "react";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { flattenListings } from "@/utils";
import ListingGrid from "../components/home/ListingGrid";
import {
  RentHero,
  RentCategoryChips,
  RentMapExplore,
  RentGuides,
} from "../components/rent";

function takeListings(payload: { listings?: unknown[] } | undefined, count: number) {
  const raw = payload?.listings || [];
  return flattenListings(raw).slice(0, count);
}

export default function RentPage() {
  const { data: rentListings, isLoading: isRentLoading } = useGetAllListingsQuery({
    listingType: "rent",
  });
  const { data: nigeriaListings, isLoading: isNigeriaLoading } =
    useGetAllListingsQuery({ location: "nigeria", listingType: "rent" });
  const { data: somaliaListings, isLoading: isSomaliaLoading } =
    useGetAllListingsQuery({ location: "somalia", listingType: "rent" });
  const { data: shortletListings, isLoading: isShortletLoading } =
    useGetAllListingsQuery({ listingType: "shortlet" });
  const { data: familyListings, isLoading: isFamilyLoading } =
    useGetAllListingsQuery({ category: "family-friendly", listingType: "rent" });

  const allRentals = useMemo(() => takeListings(rentListings, 8), [rentListings]);
  const nigeriaRentals = useMemo(
    () => takeListings(nigeriaListings, 8),
    [nigeriaListings]
  );
  const somaliaRentals = useMemo(
    () => takeListings(somaliaListings, 8),
    [somaliaListings]
  );
  const shortlets = useMemo(
    () => takeListings(shortletListings, 8),
    [shortletListings]
  );
  const familyHomes = useMemo(
    () => takeListings(familyListings, 8),
    [familyListings]
  );

  return (
    <div className="home-page">
      <RentHero />
      <RentCategoryChips />

      <main>
        <ListingGrid
          id="homes-for-rent"
          title="Homes for rent"
          href="/search?listingType=rent"
          listings={allRentals}
          isLoading={isRentLoading && allRentals.length === 0}
          emptyLabel="No rentals to show yet. Check back shortly or browse all listings."
        />

        <ListingGrid
          id="nigeria-rentals"
          title="Rentals in Nigeria"
          href="/search?location=Nigeria&listingType=rent"
          listings={nigeriaRentals}
          isLoading={isNigeriaLoading && nigeriaRentals.length === 0}
          emptyLabel="No Nigeria rentals right now. Try a broader search."
        />

        <ListingGrid
          id="somalia-rentals"
          title="Rentals in Somalia"
          href="/search?location=somalia&listingType=rent"
          listings={somaliaRentals}
          isLoading={isSomaliaLoading && somaliaRentals.length === 0}
          emptyLabel="No Somalia rentals right now. Try a broader search."
        />

        <ListingGrid
          id="shortlet-rentals"
          title="Shortlet apartments"
          href="/search?listingType=shortlet"
          listings={shortlets}
          isLoading={isShortletLoading && shortlets.length === 0}
          emptyLabel="No shortlet listings available. Browse all rentals instead."
        />

        <ListingGrid
          id="family-rentals"
          title="Family-friendly rentals"
          href="/search?category=family-friendly&listingType=rent"
          listings={familyHomes}
          isLoading={isFamilyLoading && familyHomes.length === 0}
          emptyLabel="No family-friendly rentals to show yet."
        />

        <RentMapExplore />
        <RentGuides />
      </main>
    </div>
  );
}
