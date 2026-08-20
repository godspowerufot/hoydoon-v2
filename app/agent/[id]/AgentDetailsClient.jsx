"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Mail,
  MapPin,
  Share2,
  TrendingUp,
} from "lucide-react";
import {
  useGetAgentListingsQuery,
  useGetAgentsInfoQuery,
  useSendMessageMutation,
} from "@/store/slices/api/authapi";
import PropertyCard from "@/app/components/home/PropertyCard";
import { decodeId, flattenListings, formatPrice, handleShareClick } from "@/utils";
import AgentDetailsMobile from "./AgentDetailsMobile";

const MapComponent = dynamic(
  () => import("@/app/components/layouts/listingmap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] items-center justify-center bg-[#f4f4f4] text-sm text-[#8a8a8a]">
        Loading map…
      </div>
    ),
  }
);

const TABS = [
  { id: "all", label: "All listings" },
  { id: "active", label: "Active" },
  { id: "sold", label: "Sold" },
];

const QUICK_PROMPTS = [
  "I am interested in your active listings.",
  "Can we schedule a call this week?",
  "I am looking to buy in your area.",
];

function AgentSkeleton() {
  return (
    <div className="listing-page pt-[5.25rem] lg:pt-24">
      <div className="home-container py-6">
        <div className="shimmer h-5 w-48 rounded" />
        <div className="mt-8 flex gap-5">
          <div className="shimmer h-28 w-28 shrink-0 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="shimmer h-10 w-64 rounded-xl" />
            <div className="shimmer h-5 w-40 rounded" />
            <div className="shimmer h-20 w-full max-w-lg rounded-2xl" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="shimmer aspect-[4/3] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  fullname,
  location,
  profileimage,
  listedBy,
  id = "contact-agent",
}) {
  const [message, setMessage] = useState(
    "Hi, I found your profile on Hoydoon and would like to connect."
  );
  const [sendMessage] = useSendMessageMutation();
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!message.trim()) return;
    setIsSending(true);
    try {
      await sendMessage({ message, listedBy }).unwrap();
      setMessage("");
      toast.success("Message sent successfully.");
    } catch (err) {
      if (err?.data?.error === "ACCESS DENIED: No token provided") {
        toast.error("Sign in to contact this agent.");
        router.push("/auth/sign-in");
      } else {
        toast.error("Could not send the message. Try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <aside
      id={id}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(20,20,30,0.06)] lg:sticky lg:top-28"
    >
      <div className="bg-[#f3fbfb] px-6 py-5">
        <p className="font-heading text-lg font-semibold text-[#111]">
          Contact {fullname?.split(" ")[0] || "agent"}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#5c5c66]">
          Typically responds within 10 minutes.
        </p>
      </div>
      <div className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#eee]">
            <Image
              src={profileimage || "/Avatar.svg"}
              alt={fullname || "Agent"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2a2a33]">{fullname}</p>
            <p className="text-xs capitalize text-[#6f6f78]">{location}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setMessage(prompt)}
              className="rounded-full border border-[#ececec] bg-[#f7f7f8] px-3 py-1.5 text-left text-xs text-[#5c5c66] transition-colors hover:border-primary hover:text-primary"
            >
              {prompt}
            </button>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-4 w-full resize-none rounded-2xl border border-[#ececec] bg-[#f7f7f8] px-4 py-3 text-sm text-[#2a2a33] outline-none transition-colors focus:border-primary focus:bg-white"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isSending}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-[#07757c] disabled:opacity-60"
        >
          <Mail className="h-4 w-4" />
          {isSending ? "Sending…" : "Send message"}
        </button>
      </div>
    </aside>
  );
}

function groupListings(listings) {
  const flat = flattenListings(listings);
  const withCoords = flat.filter(
    (item) => item?.item?.coordinate?.latitude && item?.item?.coordinate?.longitude
  );

  return {
    flat,
    all: flat,
    active: flat.filter((item) => item.status?.toLowerCase() === "active"),
    sold: flat.filter((item) => item.status?.toLowerCase() === "sold"),
    coords: {
      all: withCoords.map((item) => item.item.coordinate),
      active: withCoords
        .filter((item) => item.status?.toLowerCase() === "active")
        .map((item) => item.item.coordinate),
      sold: withCoords
        .filter((item) => item.status?.toLowerCase() === "sold")
        .map((item) => item.item.coordinate),
    },
    mapListings: {
      all: withCoords,
      active: withCoords.filter((item) => item.status?.toLowerCase() === "active"),
      sold: withCoords.filter((item) => item.status?.toLowerCase() === "sold"),
    },
  };
}

export default function AgentDetailsClient() {
  const params = useParams();
  const encodedId = params?.id;
  const userId = decodeId(encodedId);
  const [activeTab, setActiveTab] = useState("all");
  const [showAllListings, setShowAllListings] = useState(false);

  const {
    data: listing,
    isLoading: listingsLoading,
    isError: listingsError,
  } = useGetAgentListingsQuery({ userId }, { skip: !userId });
  const { data: agentInfo, isLoading: agentLoading } = useGetAgentsInfoQuery(
    { userId },
    { skip: !userId }
  );

  const grouped = useMemo(
    () => groupListings(listing?.listings || []),
    [listing]
  );

  const tabListings = grouped[activeTab] || [];
  const tabCoords = grouped.coords[activeTab] || [];
  const tabMapListings = grouped.mapListings[activeTab] || [];

  const region = agentInfo?.region || "";
  const minPrice = Number(agentInfo?.priceRange?.min) || 0;
  const maxPrice = Number(agentInfo?.priceRange?.max) || 0;
  const avgPrice =
    minPrice > 0 && maxPrice > 0 ? (minPrice + maxPrice) / 2 : 0;
  const listingCount = Number(agentInfo?.numberOfListings) || grouped.flat.length;
  const visibleListings = showAllListings
    ? grouped.active
    : grouped.active.slice(0, 6);
  const firstName = agentInfo?.fullname?.split(" ")[0] || "Agent";

  if (!userId) {
    return (
      <div className="listing-page pt-[5.25rem] lg:pt-24">
        <div className="home-container py-24 text-center">
          <h1 className="font-heading text-3xl font-semibold text-[#111]">
            Agent not found
          </h1>
          <Link
            href="/agent"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white"
          >
            Browse agents
          </Link>
        </div>
      </div>
    );
  }

  if (listingsLoading || agentLoading) return <AgentSkeleton />;

  if (listingsError && !agentInfo) {
    return (
      <div className="listing-page pt-[5.25rem] lg:pt-24">
        <div className="home-container py-24 text-center">
          <h1 className="font-heading text-3xl font-semibold text-[#111]">
            Could not load this agent
          </h1>
          <Link
            href="/agent/all-agent"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white"
          >
            Back to agents
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Listings",
      value: listingCount,
      icon: Building2,
    },
    {
      label: "Price range",
      value:
        minPrice > 0 || maxPrice > 0
          ? `${formatPrice(region, minPrice)} – ${formatPrice(region, maxPrice)}`
          : "On request",
      icon: TrendingUp,
    },
    {
      label: "Avg. listing",
      value: avgPrice > 0 ? formatPrice(region, avgPrice) : "—",
      icon: BarChart3,
    },
  ];

  return (
    <div className="listing-page pt-[5.25rem] lg:pt-24">
      <div className="home-container pb-16 md:pb-24">
        <AgentDetailsMobile
          agentInfo={agentInfo}
          firstName={firstName}
          region={region}
          stats={stats}
          grouped={grouped}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showAllListings={showAllListings}
          setShowAllListings={setShowAllListings}
          visibleListings={visibleListings}
          tabListings={tabListings}
          tabCoords={tabCoords}
          tabMapListings={tabMapListings}
          ContactCard={ContactCard}
        />

        <div className="hidden md:block">
        <nav className="flex flex-wrap items-center gap-2 py-5 text-sm text-[#6f6f78]">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 rounded-full px-1 py-1 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <span aria-hidden="true">/</span>
          <Link href="/agent" className="hover:text-primary">
            Agents
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#2a2a33]">{agentInfo?.fullname || "Agent"}</span>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div className="order-2 min-w-0 lg:order-1">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-[#ececec] bg-[#f7f7f8] shadow-sm sm:h-32 sm:w-32">
                <Image
                  src={agentInfo?.pictureUrl || "/Avatar.svg"}
                  alt={agentInfo?.fullname || "Agent profile"}
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Hoydoon agent
                </p>
                <h1 className="mt-2 font-heading text-[2rem] font-semibold leading-tight tracking-tight text-[#111] md:text-4xl">
                  {agentInfo?.fullname || "Hoydoon agent"}
                </h1>
                <p className="mt-2 flex items-center gap-2 text-base text-[#5c5c66]">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  {region || "Nigeria & Somalia"}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="#contact-agent"
                    className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-[#07757c]"
                  >
                    Contact {firstName}
                  </a>
                  <button
                    type="button"
                    onClick={handleShareClick}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[#ececec] bg-white px-5 text-sm font-medium text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[#ececec] bg-[#f7f7f8] px-4 py-4 md:px-5"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <p className="mt-3 font-heading text-xl font-semibold tracking-tight text-[#111] md:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-[#6f6f78] md:text-sm">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <section id="about" className="scroll-mt-28 mt-10 border-t border-[#ececec] pt-10">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
                About {firstName}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5c5c66] md:text-lg">
                {agentInfo?.profileDescription ||
                  `${agentInfo?.fullname || "This agent"} helps buyers, sellers, and renters across ${region || "the Hoydoon marketplace"}. Browse active listings below or send a message to start a conversation.`}
              </p>
            </section>

            <section id="listings" className="scroll-mt-28 mt-12">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
                Listings &amp; map
              </h2>
              <p className="mt-2 max-w-xl text-base text-[#5c5c66]">
                Explore properties {firstName} represents across{" "}
                {region || "the market"}.
              </p>

              <div className="mt-6 flex gap-6 border-b border-[#ececec]">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-3 text-sm font-medium transition-colors md:text-base ${
                      activeTab === tab.id
                        ? "text-[#111]"
                        : "text-[#8a8a8a] hover:text-[#5c5c66]"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id ? (
                      <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                    ) : null}
                  </button>
                ))}
              </div>

              <div className="relative mt-5 h-[320px] overflow-hidden rounded-2xl border border-[#ececec] md:h-[400px]">
                {tabCoords.length === 0 ? (
                  <div className="flex h-full items-center justify-center bg-[#f7f7f8] text-sm text-[#8a8a8a]">
                    No mapped listings in this category yet.
                  </div>
                ) : (
                  <MapComponent
                    coordinates={tabCoords}
                    listings={tabMapListings}
                  />
                )}
                {tabListings.length > 0 ? (
                  <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-[#2a2a33] shadow-md backdrop-blur">
                    {tabListings.length}{" "}
                    {tabListings.length === 1 ? "listing" : "listings"} on map
                  </div>
                ) : null}
              </div>
            </section>

            <section className="mt-12">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
                    Active listings
                  </h2>
                  <p className="mt-1 text-sm text-[#5c5c66] md:text-base">
                    Homes and rentals {firstName} is currently marketing.
                  </p>
                </div>
                {grouped.active.length > 6 ? (
                  <button
                    type="button"
                    onClick={() => setShowAllListings((prev) => !prev)}
                    className="shrink-0 whitespace-nowrap text-sm font-semibold text-primary hover:text-[#07757c]"
                  >
                    {showAllListings ? "Show less" : "See all"}
                  </button>
                ) : null}
              </div>

              {grouped.active.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#e4e4e4] px-6 py-14 text-center">
                  <p className="text-base text-[#5c5c66]">
                    No active listings right now. Check back soon or send a message.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleListings.map((item, index) => (
                    <PropertyCard
                      key={item._id || item.slug || index}
                      listing={item}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="order-1 lg:order-2 lg:pt-2">
            <ContactCard
              fullname={agentInfo?.fullname}
              location={region}
              profileimage={agentInfo?.pictureUrl}
              listedBy={agentInfo?._id}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
