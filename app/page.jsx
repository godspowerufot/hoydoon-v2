"use client";

import { useMemo } from "react";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { flattenListings } from "@/utils";
import {
  Hero,
  ListingGrid,
  Neighborhoods,
  IntentCards,
  SellCta,
  AppDownload,
  HomeFaq,
} from "./components/home";

function takeListings(payload, count) {
  const raw = payload?.listings || [];
  return flattenListings(raw).slice(0, count);
}

export default function Home() {
  const { data: saleListings, isLoading: isSaleLoading } = useGetAllListingsQuery({
    listingType: "sale",
  });
  const { data: rentListings, isLoading: isRentLoading } = useGetAllListingsQuery({
    listingType: "rent",
  });

  const homesForSale = useMemo(
    () => takeListings(saleListings, 8),
    [saleListings]
  );
  const homesForRent = useMemo(
    () => takeListings(rentListings, 8),
    [rentListings]
  );

  return (
    <div className="home-page">
      <Hero />
      <main>
        <ListingGrid
          id="homes-for-sale"
          title="Homes for sale"
          href="/search?listingType=sale"
          listings={homesForSale}
          isLoading={isSaleLoading && homesForSale.length === 0}
          emptyLabel="No sale listings to show yet. Check back shortly."
        />
        <ListingGrid
          id="homes-for-rent"
          title="Homes for rent"
          href="/search?listingType=rent"
          listings={homesForRent}
          isLoading={isRentLoading && homesForRent.length === 0}
          emptyLabel="No rentals to show yet. Browse the full rental search instead."
        />
        <Neighborhoods />
        <IntentCards />
        <SellCta />
        <AppDownload />
        <HomeFaq />
      </main>
      </div>
  );
}
