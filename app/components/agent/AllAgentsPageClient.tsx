"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import HelpCenterPagination from "@/app/components/helpcenter/HelpCenterPagination";
import { HomeContainer } from "@/app/components/home/Section";
import HomeFaq from "@/app/components/home/HomeFaq";
import AgentCard, { AgentCardSkeleton } from "./AgentCard";
import AgentConnect from "./AgentConnect";
import AllAgentsFiltersBar from "./AllAgentsFiltersBar";
import AllAgentsSubHero from "./AllAgentsSubHero";
import {
  buildAgentsUrl,
  filtersFromSearchParams,
  normalizeAgentsResponse,
  type AgentFiltersState,
} from "./allAgentsUtils";

export default function AllAgentsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<AgentFiltersState>(() =>
    filtersFromSearchParams(
      new URLSearchParams(searchParams?.toString() ?? "")
    )
  );

  useEffect(() => {
    setFilters(
      filtersFromSearchParams(
        new URLSearchParams(searchParams?.toString() ?? "")
      )
    );
  }, [searchParams]);

  const query = useMemo(
    () => Object.fromEntries(searchParams?.entries() ?? []),
    [searchParams]
  );

  const { data, isLoading } = useGetAgentsQuery(query);

  const { agents, totalPages, totalCount } = useMemo(
    () => normalizeAgentsResponse(data),
    [data]
  );

  const currentPage = Number(searchParams?.get("page")) || 1;

  const handleSearch = (next?: AgentFiltersState) => {
    router.push(buildAgentsUrl(next ?? filters), { scroll: false });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(buildAgentsUrl(filters, page), { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resultsLabel =
    filters.region.trim() || filters.listingType || filters.spokenLanguage
      ? "matching agents"
      : "agents on Hoydoon";

  return (
    <div className="listing-page home-page min-h-screen bg-[#f7f7f8]">
      <AllAgentsSubHero />

      <HomeContainer className="pb-16 md:pb-24">
        <div className="-mt-8 relative z-10 md:-mt-10">
          <AllAgentsFiltersBar
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-b border-[#ececec] pb-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#5c5c66] md:text-base">
            {isLoading ? (
              "Loading agents…"
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-[#111]">{agents.length}</span>
                {totalCount > agents.length ? (
                  <>
                    {" "}
                    of{" "}
                    <span className="font-semibold text-[#111]">
                      {totalCount}
                    </span>
                  </>
                ) : null}{" "}
                {resultsLabel}
              </>
            )}
          </p>
          <Link
            href="/agent"
            className="text-sm font-semibold text-primary transition-colors hover:text-[#076b72]"
          >
            Back to agent home
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <AgentCardSkeleton key={`agent-skeleton-${index}`} />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#e4e4e4] bg-white px-6 py-16 text-center">
            <h2 className="font-heading text-xl font-semibold text-[#111]">
              No agents found
            </h2>
            <p className="mt-2 text-base text-[#5c5c66]">
              Try a different location, specialty, or language — or browse all
              agents on Hoydoon.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Nigeria", href: "/agent/all-agent?region=nigeria" },
                { label: "Somalia", href: "/agent/all-agent?region=somalia" },
                { label: "All agents", href: "/agent/all-agent" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-[#ececec] bg-[#f7f7f8] px-4 py-2 text-sm font-medium text-[#5c5c66] transition-colors hover:border-primary hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agents.map((agent, index) => (
              <AgentCard key={agent._id || index} agent={agent} />
            ))}
          </div>
        )}

        {!isLoading && totalPages > 1 ? (
          <HelpCenterPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : null}
      </HomeContainer>

      <AgentConnect />
      <HomeFaq />
    </div>
  );
}
