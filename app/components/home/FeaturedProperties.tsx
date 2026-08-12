import Link from "next/link";
import PropertyCard, {
  PropertyCardSkeleton,
  type HomeListing,
} from "./PropertyCard";
import { HomeContainer, SectionHeader, TextLink } from "./Section";

export default function FeaturedProperties({
  listings,
  isLoading,
}: {
  listings: HomeListing[];
  isLoading: boolean;
}) {
  const showEmpty = !isLoading && listings.length === 0;

  return (
    <section
      id="featured-homes"
      className="pb-16 md:pb-24"
      aria-labelledby="featured-heading"
    >
      <HomeContainer>
        <SectionHeader
          headingId="featured-heading"
          eyebrow="Featured"
          title="Homes worth a closer look"
          description="Hand-picked listings with the details that matter: price, size, and location — always visible, no hover required."
          action={
            <TextLink href="/search?category=Featured">
              View all featured homes
            </TextLink>
          }
          align="between"
        />

        {showEmpty ? (
          <div className="rounded-2xl border border-dashed border-[#d9d9d9] bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-[#111]">
              Featured homes are on the way
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6b6b6b]">
              Browse the full marketplace while we refresh this collection.
            </p>
            <Link
              href="/search"
              className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-[#fff] transition-colors duration-200 hover:bg-[#07757c]"
            >
              Browse all listings
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <PropertyCardSkeleton key={`featured-skeleton-${index}`} />
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
