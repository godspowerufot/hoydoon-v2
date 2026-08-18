import { GoogleOAuthProvider } from "google-oauth-gsi";
import { toast } from "react-toastify";
export const truncateDescription = (text: string, wordLimit: number) => {
  const words = text?.split(" ");
  return words?.length > wordLimit
    ? words?.slice(0, wordLimit).join(" ") + "..."
    : text;
};
// Recursive function to fully flatten nested listings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flattenListings = (listings: any): any[] => {
  if (!Array.isArray(listings)) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return listings.flatMap((item: any) => {
    if (!item || typeof item !== "object") return [];
    if (Array.isArray(item.listings) && item.listings.length > 0) {
      return flattenListings(item.listings);
    }
    return [item.listing && typeof item.listing === "object" ? item.listing : item];
  });
};

function isUsableSlug(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "" && value !== "undefined";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getListingSlug(listing?: any): string | undefined {
  const candidates = [
    listing?.slug,
    listing?.slugs,
    listing?.listing?.slug,
    listing?.item?.slug,
  ];
  return candidates.find(isUsableSlug);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getListingHref(listing?: any): string {
  const slug = getListingSlug(listing);
  return slug ? `/rent/${slug}` : "/search";
}

export const handleShareClick = () => {
  if (typeof window !== "undefined") {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Page URL copied! You can now share it.");
    });
  }
};

export const provider = new GoogleOAuthProvider({
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  onScriptLoadError: () => console.log("onScriptLoadError"),
  onScriptLoadSuccess: () => {
    console.log("onScriptLoadSuccess");
    // oneTap();
  },
});

export const formatNumber = (num: number) => {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(1).replace(/\.0$/, "") + "T";
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
};
// const oneTap = provider.useGoogleOneTapLogin({
// 	cancel_on_tap_outside: true,
// 	onSuccess: (tokenResponse) => {
// 		console.log('(one-tap) tokenResponse: ', tokenResponse);
// 	}
// });

// encrypt id
export function encodeId(id?: string) {
  if (!id) return "";
  if (typeof window !== "undefined") {
    return btoa(id);
  }
  return Buffer.from(id).toString("base64");
}

export function decodeId(encoded?: string) {
  if (!encoded) return "";
  if (typeof window !== "undefined") {
    return atob(encoded);
  }
  return Buffer.from(encoded, "base64").toString();
}
export function formatPrice(region: string, amount: number) {
  const normalized = typeof region === "string" ? region.trim().toLowerCase() : "";
  const symbol =
    normalized === "nigeria" ? "₦" : normalized === "kenya" ? "KSh" : "$";

  return `${symbol}${formatNumber(amount)}`;
}

export const getPhoneTypeLinks = () => {
  return {
    android: "https://play.google.com/store/apps/details?id=com.hoydoon.app",
    iphone: "https://apps.apple.com/us/app/hoydoon/id6736393320",
  };
};

export const getAppDownloadLink = () => {
  if (typeof window === "undefined")
    return "https://apps.apple.com/us/app/hoydoon/id6736393320";

  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  // More robust iOS detection
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || // iPadOS
    (/Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1);

  const links = getPhoneTypeLinks();
  return isIOS ? links.iphone : links.android;
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
