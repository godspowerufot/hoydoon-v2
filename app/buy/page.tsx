"use client";

import { useMemo } from "react";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { flattenListings } from "@/utils";
import ListingGrid from "../components/home/ListingGrid";
import {
  BuyHero,
  BuyCategoryChips,
  BuyMapExplore,
  BuyGuides,
} from "../components/buy";

function takeListings(payload: { listings?: unknown[] } | undefined, count: number) {
  const raw = payload?.listings || [];
  return flattenListings(raw).slice(0, count);
}

export default function BuyPage() {
  const { data: saleListings, isLoading: isSaleLoading } = useGetAllListingsQuery({
    listingType: "sale",
  });
  const { data: affordableListings, isLoading: isAffordableLoading } =
    useGetAllListingsQuery({ category: "affordable", listingType: "sale" });
  const { data: openHouseListings, isLoading: isOpenHouseLoading } =
    useGetAllListingsQuery({ category: "open-house", listingType: "sale" });
  const { data: luxuryListings, isLoading: isLuxuryLoading } = useGetAllListingsQuery({
    category: "luxury",
    listingType: "sale",
  });
  const { data: upcomingListings, isLoading: isUpcomingLoading } =
    useGetAllListingsQuery({ category: "upcoming", listingType: "sale" });

  const allHomes = useMemo(() => takeListings(saleListings, 8), [saleListings]);
  const affordableHomes = useMemo(
    () => takeListings(affordableListings, 8),
    [affordableListings]
  );
  const openHouses = useMemo(
    () => takeListings(openHouseListings, 8),
    [openHouseListings]
  );
  const luxuryHomes = useMemo(
    () => takeListings(luxuryListings, 8),
    [luxuryListings]
  );
  const newListings = useMemo(
    () => takeListings(upcomingListings, 8),
    [upcomingListings]
  );

  return (
    <div className="home-page">
      <BuyHero />
      <BuyCategoryChips />

      <main>
        <ListingGrid
          id="homes-for-sale"
          title="Homes for sale"
          href="/search?listingType=sale"
          listings={allHomes}
          isLoading={isSaleLoading && allHomes.length === 0}
          emptyLabel="No homes for sale yet. Check back shortly or browse all listings."
        />

        <ListingGrid
          id="affordable-homes"
          title="Affordable homes"
          href="/search?category=affordable&listingType=sale"
          listings={affordableHomes}
          isLoading={isAffordableLoading && affordableHomes.length === 0}
          emptyLabel="No affordable listings right now. Try adjusting your search filters."
        />

        <ListingGrid
          id="open-houses"
          title="Open houses"
          href="/search?category=open-house&listingType=sale"
          listings={openHouses}
          isLoading={isOpenHouseLoading && openHouses.length === 0}
          emptyLabel="No open houses scheduled. Browse all homes for sale instead."
        />

        <ListingGrid
          id="luxury-homes"
          title="Luxury homes"
          href="/search?category=luxury&listingType=sale"
          listings={luxuryHomes}
          isLoading={isLuxuryLoading && luxuryHomes.length === 0}
          emptyLabel="No luxury listings to show yet."
        />

        <ListingGrid
          id="new-listings"
          title="New on the market"
          href="/search?category=upcoming&listingType=sale"
          listings={newListings}
          isLoading={isUpcomingLoading && newListings.length === 0}
          emptyLabel="No new listings this week. Explore all homes for sale."
        />

        <BuyMapExplore />
        <BuyGuides />
      </main>
    </div>
  );
}
