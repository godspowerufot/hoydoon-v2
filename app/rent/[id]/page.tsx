import { Metadata } from "next";
import RentDetailsClient from "./RentDetailsClient";
import Script from "next/script";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: "Property | Hoydoon",
    description: "View this property listing on Hoydoon.",
    alternates: {
      canonical: `https://www.hoydoon.com/rent/${id}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Script
        id="real-estate-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            url: `https://www.hoydoon.com/rent/${id}`,
          }),
        }}
      />
      <RentDetailsClient />
    </>
  );
}
