import Link from "next/link";
import PropertyCard, {
  PropertyCardSkeleton,
  type HomeListing,
} from "./PropertyCard";
import { HomeContainer } from "./Section";

export default function ListingGrid({
  id,
  title,
  href,
  listings,
  isLoading,
  emptyLabel,
}: {
  id: string;
  title: string;
  href: string;
  listings: HomeListing[];
  isLoading: boolean;
  emptyLabel: string;
}) {
  const showEmpty = !isLoading && listings.length === 0;

  return (
    <section id={id} className="py-12 md:py-16" aria-labelledby={`${id}-heading`}>
      <HomeContainer>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2
            id={`${id}-heading`}
            className="text-2xl font-semibold tracking-tight text-[#2a2a33] md:text-3xl"
          >
            {title}
          </h2>
          <Link
            href={href}
            className="text-sm font-semibold text-primary transition-colors duration-200 hover:text-[#076b72] md:text-base"
          >
            See all
          </Link>
        </div>

        {showEmpty ? (
          <div className="rounded-xl border border-dashed border-[#e4e4e4] px-6 py-14 text-center">
            <p className="text-base text-[#5c5c66]">{emptyLabel}</p>
            <Link
              href={href}
              className="mt-4 inline-flex text-sm font-semibold text-primary"
            >
              Browse the marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <PropertyCardSkeleton key={`${id}-skeleton-${index}`} />
                ))
              : listings.map((listing, index) => (
                  <PropertyCard
                    key={listing._id || listing.slug || index}
                    listing={listing}
                  />
                ))}
          </div>
        )}
      </HomeContainer>
    </section>
  );
}
