import type { AgentListing } from "./AgentCard";

export type AgentFiltersState = {
  region: string;
  listingType: string;
  spokenLanguage: string;
};

export const LISTING_TYPE_OPTIONS = [
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
  { label: "Sell", value: "sell" },
];

export const LANGUAGE_OPTIONS = [
  { label: "Any language", value: "" },
  { label: "English", value: "english" },
  { label: "Somalia", value: "somalia" },
  { label: "Arabic", value: "arabic" },
];

export function filtersFromSearchParams(
  searchParams: URLSearchParams
): AgentFiltersState {
  return {
    region: searchParams.get("region") || searchParams.get("location") || "",
    listingType: searchParams.get("listingType") || "",
    spokenLanguage: searchParams.get("spokenLanguage") || "",
  };
}

export function buildAgentsUrl(filters: AgentFiltersState, page?: number) {
  const params = new URLSearchParams();

  if (filters.region.trim()) {
    params.set("region", filters.region.trim().toLowerCase());
  }
  if (filters.listingType) {
    params.set("listingType", filters.listingType.toLowerCase());
  }
  if (filters.spokenLanguage) {
    params.set("spokenLanguage", filters.spokenLanguage.toLowerCase());
  }
  if (page && page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return `/agent/all-agent${query ? `?${query}` : ""}`;
}

export function normalizeAgentsResponse(data: unknown): {
  agents: AgentListing[];
  totalPages: number;
  totalCount: number;
} {
  if (!data) {
    return { agents: [], totalPages: 1, totalCount: 0 };
  }

  if (Array.isArray(data)) {
    return { agents: data, totalPages: 1, totalCount: data.length };
  }

  const payload = data as {
    agents?: AgentListing[];
    listings?: AgentListing[];
    data?: AgentListing[];
    totalPages?: number;
    totalAgents?: number;
    total?: number;
  };

  const agents =
    payload.agents || payload.listings || payload.data || [];

  return {
    agents,
    totalPages: Number(payload.totalPages) || 1,
    totalCount: Number(payload.totalAgents ?? payload.total ?? agents.length),
  };
}
