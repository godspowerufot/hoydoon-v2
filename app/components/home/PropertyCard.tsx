import Image from "next/image";
import Link from "next/link";
import { formatPrice, truncateDescription } from "@/utils";

export type HomeListing = {
  _id?: string;
  slug?: string;
  region?: string;
  title?: string;
  category?: string;
  houseType?: string;
  listingType?: string;
  imageUrls?: { url?: string; altText?: string }[];
  item?: {
    price?: number | string;
    squareFeet?: number | string;
    bathrooms?: number | string;
    bedrooms?: number | string;
    description?: string;
    address?: string;
    houseType?: string;
    listingType?: string;
  };
};

export function listingPrice(listing: HomeListing) {
  const amount = Number(listing.item?.price);
  if (!Number.isFinite(amount) || amount <= 0) return "Price on request";
  return formatPrice(listing.region || "", amount);
}

function metaLine(listing: HomeListing) {
  const beds = listing.item?.bedrooms;
  const baths = listing.item?.bathrooms;
  const area = listing.item?.squareFeet;
  const parts: string[] = [];
  if (beds != null && beds !== "") parts.push(`${beds} bed`);
  if (baths != null && baths !== "") parts.push(`${baths} bath`);
  if (area != null && area !== "") parts.push(`${area} sqft`);
  return parts.join(" · ");
}

export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl" aria-hidden="true">
      <div className="shimmer aspect-[4/3] w-full rounded-xl" />
      <div className="mt-3 space-y-2">
        <div className="shimmer h-5 w-1/2 rounded" />
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-4 w-1/3 rounded" />
      </div>
    </div>
  );
}

export default function PropertyCard({ listing }: { listing: HomeListing }) {
  const href = listing.slug ? `/rent/${listing.slug}` : "/search";
  const image = listing.imageUrls?.[0]?.url || "/house1.png";
  const alt =
    listing.imageUrls?.[0]?.altText ||
    listing.item?.address ||
    listing.title ||
    "Property listing";
  const address = listing.item?.address || listing.title || "Address available on request";
  const type =
    listing.item?.listingType ||
    listing.listingType ||
    listing.houseType ||
    "Home";

  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e8e8e8]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"
            aria-hidden="true"
          />
          <p className="absolute bottom-3 left-3 text-xl font-semibold tracking-tight text-white drop-shadow md:text-2xl">
            {listingPrice(listing)}
          </p>
        </div>
        <div className="pt-3">
          <p className="text-sm text-[#5c5c66]">{metaLine(listing) || type}</p>
          <h3 className="mt-0.5 text-[15px] font-medium leading-snug text-[#2a2a33]">
            {truncateDescription(address, 8)}
          </h3>
          <p className="mt-0.5 text-sm text-[#6f6f78]">
            {listing.region || "Nigeria"}
          </p>
        </div>
      </Link>
    </article>
  );
}
