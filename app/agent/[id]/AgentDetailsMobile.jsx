"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  MapPin,
  Share2,
} from "lucide-react";
import PropertyCard from "@/app/components/home/PropertyCard";
import { handleShareClick } from "@/utils";

const MapComponent = dynamic(
  () => import("@/app/components/layouts/listingmap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[220px] items-center justify-center bg-[#f4f4f4] text-sm text-[#8a8a8a]">
        Loading map…
      </div>
    ),
  }
);

const TABS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "sold", label: "Sold" },
];

export default function AgentDetailsMobile({
  agentInfo,
  firstName,
  region,
  stats,
  grouped,
  activeTab,
  setActiveTab,
  showAllListings,
  setShowAllListings,
  visibleListings,
  tabListings,
  tabCoords,
  tabMapListings,
  ContactCard,
}) {
  return (
    <div className="pb-28 md:hidden">
      {/* Top nav */}
      <nav className="flex items-center py-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5c5c66]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </nav>

      {/* Profile hero */}
      <section className="overflow-hidden rounded-3xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
        <div className="relative aspect-[5/4] bg-[#e8ecec]">
          <Image
            src={agentInfo?.pictureUrl || "/Avatar.svg"}
            alt={agentInfo?.fullname || "Agent profile"}
            fill
            className="object-cover object-[center_20%]"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10"
            aria-hidden="true"
          />
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
            Hoydoon agent
          </span>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-16">
            <h1 className="font-heading text-[1.75rem] font-semibold leading-tight tracking-tight text-white drop-shadow-sm">
              {agentInfo?.fullname || "Hoydoon agent"}
            </h1>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {region || "Nigeria & Somalia"}
            </p>
          </div>
        </div>

        <div className="flex gap-2 p-4">
          <a
            href="#contact-agent-mobile"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-primary text-[15px] font-semibold text-white"
          >
            Contact {firstName}
          </a>
          <button
            type="button"
            onClick={handleShareClick}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ececec] bg-[#f7f7f8] text-[#2a2a33]"
            aria-label="Share profile"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Stats */}
      <div className="-mx-1 mt-5 flex gap-3 overflow-x-auto px-1 pb-1 hide-scrollbar">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="min-w-[140px] shrink-0 rounded-2xl border border-[#ececec] bg-white px-4 py-4 shadow-sm"
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              <p className="mt-2 font-heading text-lg font-semibold tracking-tight text-[#111]">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-[#6f6f78]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* About */}
      <section id="about-mobile" className="mt-8">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-[#111]">
          About {firstName}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#5c5c66]">
          {agentInfo?.profileDescription ||
            `${agentInfo?.fullname || "This agent"} helps buyers, sellers, and renters across ${region || "the Hoydoon marketplace"}. Browse active listings below or send a message to start a conversation.`}
        </p>
      </section>

      {/* Listings & map */}
      <section id="listings-mobile" className="mt-10">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-[#111]">
          Listings &amp; map
        </h2>
        <p className="mt-1 text-sm text-[#5c5c66]">
          Properties {firstName} represents in {region || "your market"}.
        </p>

        <div
          className="mt-4 flex gap-1 overflow-x-auto rounded-full bg-[#ececec]/80 p-1 hide-scrollbar"
          role="tablist"
          aria-label="Listing categories"
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "bg-white text-[#111] shadow-sm"
                    : "text-[#5c5c66]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative mt-4 h-[240px] overflow-hidden rounded-2xl border border-[#ececec]">
          {tabCoords.length === 0 ? (
            <div className="flex h-full items-center justify-center bg-[#f7f7f8] text-sm text-[#8a8a8a]">
              No mapped listings in this category yet.
            </div>
          ) : (
            <MapComponent coordinates={tabCoords} listings={tabMapListings} />
          )}
          {tabListings.length > 0 ? (
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#2a2a33] shadow-md backdrop-blur">
              {tabListings.length}{" "}
              {tabListings.length === 1 ? "listing" : "listings"} on map
            </div>
          ) : null}
        </div>
      </section>

      {/* Active listings */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-heading text-xl font-semibold tracking-tight text-[#111]">
              Active listings
            </h2>
            <p className="mt-0.5 text-sm text-[#5c5c66]">
              Currently marketing by {firstName}.
            </p>
          </div>
          {grouped.active.length > 6 ? (
            <button
              type="button"
              onClick={() => setShowAllListings((prev) => !prev)}
              className="shrink-0 whitespace-nowrap text-sm font-semibold text-primary"
            >
              {showAllListings ? "Show less" : "See all"}
            </button>
          ) : null}
        </div>

        {grouped.active.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#e4e4e4] bg-white px-5 py-12 text-center">
            <p className="text-sm text-[#5c5c66]">
              No active listings right now. Check back soon or send a message.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-8">
            {visibleListings.map((item, index) => (
              <PropertyCard
                key={item._id || item.slug || index}
                listing={item}
              />
            ))}
          </div>
        )}
      </section>

      {/* Contact */}
      <div className="mt-10 scroll-mt-24">
        <ContactCard
          id="contact-agent-mobile"
          fullname={agentInfo?.fullname}
          location={region}
          profileimage={agentInfo?.pictureUrl}
          listedBy={agentInfo?._id}
        />
      </div>

      {/* Sticky contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#ececec] bg-white/95 px-4 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href="#contact-agent-mobile"
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-[15px] font-semibold text-white"
        >
          Message {firstName}
        </a>
      </div>
    </div>
  );
}
