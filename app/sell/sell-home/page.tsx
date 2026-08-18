import type { Metadata } from "next";
import SellHomePageClient from "@/app/components/sell/SellHomePageClient";

export const metadata: Metadata = {
  title: "Find an Agent to Sell Your Home | Hoydoon",
  description:
    "Connect with trusted local agents to sell your home in Lagos, Abuja, Nairobi, and across Nigeria, Kenya & Somalia. Free consultation, no obligation.",
  alternates: {
    canonical: "https://www.hoydoon.com/sell/sell-home",
  },
  openGraph: {
    title: "Find an Agent to Sell Your Home | Hoydoon",
    description:
      "Connect with trusted local agents to sell your home in Lagos, Abuja, Nairobi, and across Nigeria, Kenya & Somalia.",
    url: "https://www.hoydoon.com/sell/sell-home",
    siteName: "Hoydoon",
    type: "website",
  },
};

export default function SellHomePage() {
  return <SellHomePageClient />;
}
