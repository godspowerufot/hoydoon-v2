export type SearchFiltersState = {
  price: string;
  "home-type": string;
  location: string;
  region: string;
  bedrooms: string;
  bathrooms: string;
  houseType: string;
  bedBaths?: string;
};

export const COUNTRY_FILTER_OPTIONS = [
  { label: "All countries", value: "" },
  { label: "Nigeria", value: "nigeria" },
  { label: "Kenya", value: "kenya" },
  { label: "Somalia", value: "somalia" },
] as const;

export const COUNTRY_LABELS: Record<string, string> = {
  nigeria: "Nigeria",
  kenya: "Kenya",
  somalia: "Somalia",
};

export type PriceOption = { label: string; value: string };

export function getPriceOptions(userCountry: string | null) {
  if (userCountry === "nigeria") {
    return {
      Buy: [
        { label: "Any", value: "" },
        { label: "₦1m - ₦5m", value: "1000000-5000000" },
        { label: "₦5m - ₦20m", value: "5000001-20000000" },
        { label: "₦20m & Above", value: "20000001-1000000000" },
      ],
      Rent: [
        { label: "Any", value: "" },
        { label: "Less than ₦1m", value: "0-1000000" },
        { label: "₦1m - ₦5m", value: "1000001-5000000" },
        { label: "₦5m to ₦10m", value: "5000001-10000000" },
        { label: "₦10m Above", value: "10000001-100000000" },
      ],
      Land: [
        { label: "Any", value: "" },
        { label: "₦1m - ₦5m", value: "1000000-5000000" },
        { label: "₦5m - ₦20m", value: "5000001-20000000" },
        { label: "₦20m & Above", value: "20000001-1000000000" },
      ],
      shortlet: [
        { label: "Any", value: "" },
        { label: "₦50k - ₦200k", value: "50000-200000" },
        { label: "₦200k - ₦500k", value: "200001-500000" },
        { label: "₦500k & Above", value: "500001-50000000" },
      ],
    } satisfies Record<string, PriceOption[]>;
  }

  if (userCountry === "kenya") {
    return {
      Buy: [
        { label: "Any", value: "" },
        { label: "KSh 5m - KSh 20m", value: "5000000-20000000" },
        { label: "KSh 20m - KSh 50m", value: "20000001-50000000" },
        { label: "KSh 50m & Above", value: "50000001-1000000000" },
      ],
      Rent: [
        { label: "Any", value: "" },
        { label: "Less than KSh 50k", value: "0-50000" },
        { label: "KSh 50k - KSh 150k", value: "50001-150000" },
        { label: "KSh 150k - KSh 300k", value: "150001-300000" },
        { label: "KSh 300k & Above", value: "300001-10000000" },
      ],
      Land: [
        { label: "Any", value: "" },
        { label: "KSh 1m - KSh 10m", value: "1000000-10000000" },
        { label: "KSh 10m - KSh 30m", value: "10000001-30000000" },
        { label: "KSh 30m & Above", value: "30000001-1000000000" },
      ],
      shortlet: [
        { label: "Any", value: "" },
        { label: "KSh 5k - KSh 20k", value: "5000-20000" },
        { label: "KSh 20k - KSh 50k", value: "20001-50000" },
        { label: "KSh 50k & Above", value: "50001-5000000" },
      ],
    } satisfies Record<string, PriceOption[]>;
  }

  return {
    Buy: [
      { label: "Any", value: "" },
      { label: "$0k - $30k", value: "0-30000" },
      { label: "$30k - $60k", value: "30001-60000" },
      { label: "$60k - $100k", value: "60001-100000" },
      { label: "$100k - Above", value: "100001-10000000" },
    ],
    Rent: [
      { label: "Any", value: "" },
      { label: "$50 - $200", value: "50-200" },
      { label: "$200 - $500", value: "201-500" },
      { label: "$500 - $800", value: "501-800" },
      { label: "$800 - $1000", value: "801-1000" },
      { label: "$1000 - Above", value: "1001-100000" },
    ],
    Land: [
      { label: "Any", value: "" },
      { label: "$0k - $30k", value: "0-30000" },
      { label: "$30k - $60k", value: "30001-60000" },
      { label: "$60k - $100k", value: "60001-100000" },
      { label: "$100k - Above", value: "100001-10000000" },
    ],
    shortlet: [
      { label: "Any", value: "" },
      { label: "$50k - $200k", value: "50000-200000" },
      { label: "$200k - $500k", value: "200001-500000" },
      { label: "$500k - Above", value: "500001-50000000" },
    ],
  } satisfies Record<string, PriceOption[]>;
}

export type PriceOptionsMap = ReturnType<typeof getPriceOptions>;

export function getPriceOptionKey(
  homeType: string
): keyof PriceOptionsMap {
  const map: Record<string, keyof PriceOptionsMap> = {
    buy: "Buy",
    rent: "Rent",
    land: "Land",
    shortlet: "shortlet",
  };
  return map[homeType?.toLowerCase()] ?? "Rent";
}

function formatCompactPrice(value: number, country: string | null) {
  const symbol =
    country === "nigeria" ? "₦" : country === "kenya" ? "KSh " : "$";
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${symbol}${millions % 1 === 0 ? millions : millions.toFixed(1)}m`;
  }
  if (value >= 1_000) {
    const thousands = value / 1_000;
    return `${symbol}${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}k`;
  }
  return `${symbol}${value.toLocaleString()}`;
}

export function getPriceFilterLabel(
  price: string,
  priceOptions: PriceOptionsMap,
  homeType: string,
  country: string | null = null
): string {
  if (!price) return "Price";

  const key = getPriceOptionKey(homeType);
  const matched = priceOptions[key]?.find((option) => option.value === price);
  if (matched) return matched.label;

  for (const options of Object.values(priceOptions)) {
    const fallback = options.find((option) => option.value === price);
    if (fallback) return fallback.label;
  }

  const [minRaw, maxRaw] = price.split("-");
  const min = Number(minRaw);
  const max = Number(maxRaw);
  if (!Number.isNaN(min) && !Number.isNaN(max)) {
    if (min === 0) return `Up to ${formatCompactPrice(max, country)}`;
    if (max >= 1_000_000_000) return `${formatCompactPrice(min, country)}+`;
    return `${formatCompactPrice(min, country)} – ${formatCompactPrice(max, country)}`;
  }

  return "Price";
}

export const HOME_TYPE_OPTIONS = [
  { label: "Any", value: "" },
  { label: "Bungalow", value: "Bungalow" },
  { label: "Penthouse", value: "Penthouse" },
  { label: "Duplex", value: "Duplex" },
];

export const TYPE_FILTER_OPTIONS_BASE = [
  { label: "Rent", value: "rent" },
  { label: "Buy", value: "buy" },
  { label: "Land", value: "land" },
];

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
];

export function buildSearchTitle(
  query: Record<string, string>,
  homeTypeFilter?: string
) {
  const typeToApi: Record<string, string> = {
    buy: "sale",
    rent: "rent",
    land: "land",
    shortlet: "shortlet",
  };

  const listingType = (
    homeTypeFilter
      ? typeToApi[homeTypeFilter.toLowerCase()] || homeTypeFilter
      : query.listingType || "rent"
  ).toLowerCase();

  const location = query.location?.trim();
  const region = query.region?.trim().toLowerCase();
  const countryLabel = region ? COUNTRY_LABELS[region] : "";
  const inCountry = countryLabel ? ` in ${countryLabel}` : "";

  if (listingType === "land") {
    return location
      ? `Land for sale in ${location}`
      : `All land for sale${inCountry}`;
  }

  if (listingType === "shortlet") {
    return location
      ? `Shortlets in ${location}`
      : `All shortlets for rent${inCountry}`;
  }

  if (listingType === "sale" || listingType === "buy") {
    return location
      ? `Homes for sale in ${location}`
      : `All homes for sale${inCountry}`;
  }

  return location
    ? `Homes for rent in ${location}`
    : `All homes for rent${inCountry}`;
}

export function buildResultsLabel(
  query: Record<string, string>,
  homeTypeFilter?: string
) {
  const typeToApi: Record<string, string> = {
    buy: "sale",
    rent: "rent",
    land: "land",
    shortlet: "shortlet",
  };

  const listingType = (
    homeTypeFilter
      ? typeToApi[homeTypeFilter.toLowerCase()] || homeTypeFilter
      : query.listingType || "rent"
  ).toLowerCase();

  if (listingType === "land") return "land listings";
  if (listingType === "shortlet") return "shortlets";
  return "homes";
}

export function filtersFromSearchParams(
  searchParams: URLSearchParams
): SearchFiltersState {
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const listingType = searchParams.get("listingType");
  const priceValue = minPrice && maxPrice ? `${minPrice}-${maxPrice}` : "";

  const typeMapping: Record<string, string> = {
    sale: "buy",
    rent: "rent",
    land: "land",
    shortlet: "shortlet",
  };

  return {
    price: priceValue,
    "home-type": listingType ? typeMapping[listingType] || listingType : "",
    location: searchParams.get("location") || "",
    region: searchParams.get("region") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
    houseType: searchParams.get("houseType") || "",
  };
}

export function buildSearchUrl(filters: SearchFiltersState) {
  const newParams = new URLSearchParams();

  if (filters.price) {
    const [min, max] = filters.price.split("-");
    if (!Number.isNaN(Number(min)) && !Number.isNaN(Number(max))) {
      newParams.set("minPrice", min);
      newParams.set("maxPrice", max);
    }
  }

  const typeToApiValue: Record<string, string> = {
    buy: "sale",
    rent: "rent",
    land: "land",
    shortlet: "shortlet",
  };

  if (filters["home-type"]) {
    newParams.set(
      "listingType",
      typeToApiValue[filters["home-type"]] || filters["home-type"]
    );
  }

  if (filters.location) newParams.set("location", filters.location);
  if (filters.region) newParams.set("region", filters.region.toLowerCase());
  if (filters.bedrooms) newParams.set("bedrooms", filters.bedrooms);
  if (filters.bathrooms) newParams.set("bathrooms", filters.bathrooms);
  if (filters.houseType) newParams.set("houseType", filters.houseType);

  return `/search${newParams.toString() ? `?${newParams.toString()}` : ""}`;
}
