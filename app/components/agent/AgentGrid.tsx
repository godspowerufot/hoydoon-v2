import Link from "next/link";
import AgentCard, { AgentCardSkeleton, type AgentListing } from "./AgentCard";
import { HomeContainer } from "../home/Section";

export default function AgentGrid({
  id,
  title,
  href,
  agents,
  isLoading,
  emptyLabel,
}: {
  id: string;
  title: string;
  href: string;
  agents: AgentListing[];
  isLoading: boolean;
  emptyLabel: string;
}) {
  const showEmpty = !isLoading && agents.length === 0;

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
              Browse all agents
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <AgentCardSkeleton key={`${id}-skeleton-${index}`} />
                ))
              : agents.map((agent, index) => (
                  <AgentCard
                    key={agent._id || index}
                    agent={agent}
                  />
                ))}
          </div>
        )}
      </HomeContainer>
    </section>
  );
}
