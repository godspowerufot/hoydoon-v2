import { Suspense } from "react";
import SearchPageClient from "@/app/components/search/SearchPageClient";

function SearchFallback() {
  return (
    <div className="listing-page min-h-screen bg-[#f7f7f8] pt-[5.25rem] lg:pt-24">
      <div className="home-container pb-16 md:pb-24">
        <div className="py-6 md:py-8">
          <div className="h-4 w-20 animate-pulse rounded bg-[#ececec]" />
          <div className="mt-3 h-10 w-2/3 max-w-lg animate-pulse rounded bg-[#ececec]" />
          <div className="mt-3 h-5 w-full max-w-xl animate-pulse rounded bg-[#ececec]" />
        </div>
        <div className="h-24 animate-pulse rounded-2xl bg-[#ececec]" />
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={`search-fallback-${index}`} className="space-y-3">
              <div className="aspect-[4/3] animate-pulse rounded-xl bg-[#ececec]" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-[#ececec]" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-[#ececec]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchPageClient />
    </Suspense>
  );
}
