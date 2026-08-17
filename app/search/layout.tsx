import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Homes | Hoydoon",
  description:
    "Search homes for sale and rent across Nigeria, Somalia, and Kenya. Filter by price, beds, baths, and property type on Hoydoon.",
  openGraph: {
    title: "Search Homes | Hoydoon",
    description:
      "Search homes for sale and rent across Nigeria, Somalia, and Kenya. Filter by price, beds, baths, and property type on Hoydoon.",
    url: "https://www.hoydoon.com/search",
    siteName: "Hoydoon",
    images: [
      {
        url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
        width: 1200,
        height: 630,
        alt: "Search homes on Hoydoon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Homes | Hoydoon",
    description:
      "Search homes for sale and rent across Nigeria, Somalia, and Kenya. Filter by price, beds, baths, and property type on Hoydoon.",
    images: [
      "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
    ],
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
