"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import AgentCard, {
  AgentCardSkeleton,
  type AgentListing,
} from "@/app/components/agent/AgentCard";
import { HomeContainer, SectionHeader } from "../home/Section";

export default function AboutAgentsShowcase() {
  const { data, isLoading, refetch } = useGetAgentsQuery({});
  const agents = (Array.isArray(data) ? data : []).slice(0, 4) as AgentListing[];

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <section
      className="home-bleed bg-[#f7f7f8] py-16 md:py-24"
      aria-labelledby="about-agents-heading"
    >
      <HomeContainer>
        <SectionHeader
          headingId="about-agents-heading"
          eyebrow="Our agents"
          title="Experts who know your market"
          description="Experienced professionals across Nigeria, Kenya, and Somalia ready to guide you from first viewing to final keys."
          align="between"
          action={
            <Link
              href="/agent/all-agent"
              className="inline-flex h-11 items-center rounded-full border border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              View all agents
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <AgentCardSkeleton key={i} />
              ))
            : agents.map((agent) => (
                <AgentCard key={agent._id} agent={agent} />
              ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/sell/sell-home"
            className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-[#07757c]"
          >
            Talk to an agent
          </Link>
          <Link
            href="/review"
            className="inline-flex h-12 items-center rounded-full border border-[#ececec] bg-white px-6 text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
          >
            Read reviews
          </Link>
        </div>
      </HomeContainer>
    </section>
  );
}
