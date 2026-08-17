import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Hoydoon",
  description:
    "Read Hoydoon's terms of use, including eligibility, listings, user responsibilities, payments, privacy, and platform policies.",
  openGraph: {
    title: "Terms of Use | Hoydoon",
    description:
      "Read Hoydoon's terms of use, including eligibility, listings, user responsibilities, payments, privacy, and platform policies.",
    url: "https://www.hoydoon.com/terms",
    siteName: "Hoydoon",
    images: [
      {
        url: "https://hoydoonstorage.blob.core.windows.net/web-images/terms.png",
        width: 1200,
        height: 630,
        alt: "Hoydoon terms of use",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Hoydoon",
    description:
      "Read Hoydoon's terms of use, including eligibility, listings, user responsibilities, payments, privacy, and platform policies.",
    images: [
      "https://hoydoonstorage.blob.core.windows.net/web-images/terms.png",
    ],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
