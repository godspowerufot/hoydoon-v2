import { Suspense } from "react";
import AllAgentsPageClient from "@/app/components/agent/AllAgentsPageClient";

function AllAgentsFallback() {
  return (
    <div className="listing-page min-h-screen bg-[#f7f7f8]">
      <div className="home-bleed h-[360px] animate-pulse bg-[#ececec] md:h-[420px]" />
      <div className="home-container pb-16 md:pb-24">
        <div className="-mt-8 h-24 animate-pulse rounded-2xl bg-[#ececec] md:-mt-10" />
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={`agent-fallback-${index}`} className="space-y-3">
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

export default function AllAgentsPage() {
  return (
    <Suspense fallback={<AllAgentsFallback />}>
      <AllAgentsPageClient />
    </Suspense>
  );
}
