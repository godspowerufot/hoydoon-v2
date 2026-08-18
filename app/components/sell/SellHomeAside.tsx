"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { encodeId, formatPrice } from "@/utils";
import AgentCard, {
  AgentCardSkeleton,
  type AgentListing,
} from "@/app/components/agent/AgentCard";

const SELL_TIPS = [
  {
    title: "Prepare your home for showings",
    body: "Small updates and good staging can help buyers see your home at its best.",
  },
  {
    title: "Price with local market data",
    body: "Agents use recent sales and demand in your area to recommend the right list price.",
  },
  {
    title: "Compare agent proposals",
    body: "Review pricing, services, and track records before choosing who to work with.",
  },
];

function AgentListItem({ agent }: { agent: AgentListing }) {
  const href = agent._id ? `/agent/${encodeId(agent._id)}` : "/agent/all-agent";
  const name = agent.fullname || "Hoydoon agent";
  const sales = Number(agent.numberOfListings) || 0;
  const min = Number(agent.priceRange?.min) || 0;
  const max = Number(agent.priceRange?.max) || 0;
  const region = agent.region || "";
  const range =
    min > 0 || max > 0
      ? `${formatPrice(region, min)} - ${formatPrice(region, max)}`
      : "Price range on request";

  return (
    <li>
      <Link
        href={href}
        className="group flex items-start gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-[#f7f7f8]"
      >
        <span className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#e8e8e8]">
          <Image
            src={agent.pictureUrl || "/Avatar.svg"}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium leading-snug text-[#2a2a33] transition-colors group-hover:text-primary md:text-[15px]">
            {name}
          </span>
          <span className="mt-1 block text-xs text-[#8a8a8a]">{range}</span>
          <span className="mt-0.5 block text-xs text-[#8a8a8a]">
            {sales} {sales === 1 ? "listing" : "listings"}
          </span>
        </span>
        <ChevronRight
          className="mt-2 h-4 w-4 shrink-0 text-[#c7c7c7] transition-colors group-hover:text-primary"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}

type SellHomeAsideProps = {
  agents: AgentListing[];
  isLoading: boolean;
};

export default function SellHomeAside({ agents, isLoading }: SellHomeAsideProps) {
  const featuredAgents = agents.slice(0, 3);

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_12px_32px_rgba(17,17,17,0.06)]">
        <div className="relative bg-[#0f3d40] px-6 py-7 md:px-7 md:py-8">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(9,133,141,0.35),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
              <Home className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                Before you submit
              </p>
              <h3 className="mt-1 font-heading text-xl font-semibold leading-snug text-white md:text-2xl">
                Selling tips
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                A few things to keep in mind as you start your home-selling
                journey.
              </p>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-[#ececec] px-2 py-2">
          {SELL_TIPS.map((tip) => (
            <li key={tip.title} className="px-4 py-4">
              <p className="text-sm font-medium leading-snug text-[#2a2a33] md:text-[15px]">
                {tip.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#8a8a8a]">
                {tip.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="border-t border-[#ececec] bg-[#f7f7f8] px-6 py-5">
          <Link
            href="/sell"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#ececec] bg-white text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
          >
            Explore selling options
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
        <div className="border-b border-[#ececec] px-6 py-5">
          <h3 className="font-heading text-lg font-semibold text-[#111]">
            Featured agents
          </h3>
          <p className="mt-1 text-sm text-[#5c5c66]">
            Or browse agents directly while you wait.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 p-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <AgentCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredAgents.length > 0 ? (
          <ul className="divide-y divide-[#ececec] px-2 py-2">
            {featuredAgents.map((agent) => (
              <AgentListItem key={agent._id} agent={agent} />
            ))}
          </ul>
        ) : (
          <div className="grid grid-cols-1 gap-4 p-4">
            <AgentCard agent={{ fullname: "Browse all agents" }} />
          </div>
        )}

        <div className="border-t border-[#ececec] bg-[#f7f7f8] px-6 py-5">
          <Link
            href="/agent/all-agent"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#ececec] bg-white text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
          >
            Browse all agents
          </Link>
        </div>
      </div>
    </aside>
  );
}
