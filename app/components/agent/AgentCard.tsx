import Image from "next/image";
import Link from "next/link";
import { encodeId, formatPrice } from "@/utils";

export type AgentListing = {
  _id?: string;
  pictureUrl?: string;
  fullname?: string;
  email?: string;
  region?: string;
  numberOfListings?: number | string;
  priceRange?: { min?: number; max?: number };
};

export function AgentCardSkeleton() {
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

export default function AgentCard({ agent }: { agent: AgentListing }) {
  const href = agent._id ? `/agent/${encodeId(agent._id)}` : "/agent/all-agent";
  const image = agent.pictureUrl || "/Avatar.svg";
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
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e8e8e8]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"
            aria-hidden="true"
          />
          <p className="absolute bottom-3 left-3 text-lg font-semibold tracking-tight text-white drop-shadow md:text-xl">
            {name}
          </p>
        </div>
        <div className="pt-3">
          <p className="text-sm text-[#5c5c66]">
            {sales} {sales === 1 ? "listing" : "listings"}
          </p>
          <h3 className="mt-0.5 text-[15px] font-medium leading-snug text-[#2a2a33]">
            {range}
          </h3>
          <p className="mt-0.5 text-sm text-[#6f6f78]">
            {region || "Hoydoon"}
          </p>
        </div>
      </Link>
    </article>
  );
}
