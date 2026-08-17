import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Hoydoon",
  description:
    "Learn how Hoydoon collects, uses, shares, and protects your personal information across our website and mobile application.",
  openGraph: {
    title: "Privacy Policy | Hoydoon",
    description:
      "Learn how Hoydoon collects, uses, shares, and protects your personal information across our website and mobile application.",
    url: "https://www.hoydoon.com/policy",
    siteName: "Hoydoon",
    images: [
      {
        url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
        width: 1200,
        height: 630,
        alt: "Hoydoon privacy policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Hoydoon",
    description:
      "Learn how Hoydoon collects, uses, shares, and protects your personal information across our website and mobile application.",
    images: [
      "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
    ],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
