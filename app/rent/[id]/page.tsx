import { Metadata, ResolvingMetadata } from "next";
import RentDetailsClient from "./RentDetailsClient";
import Script from "next/script";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getListing(slug: string) {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    console.log("URL => ", url);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/listings/slug/${slug}`,
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const data = await getListing(id);
    const listing = data?.listing;

    if (!listing) {
        return {
            title: "Listing Not Found | Hoydoon",
            description: "The requested property listing could not be found.",
        };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const listingImages = listing.imageUrls?.map((img: { url: string }) => img.url) || [];

    return {
        title: `${listing.item.title} | Hoydoon`,
        description: listing.item.description || "Check out this property on Hoydoon!",
        openGraph: {
            title: listing.item.title,
            description: listing.item.description,
            images: [...listingImages, ...previousImages],
        },
    };
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    const data = await getListing(id);
    const listing = data?.listing;

    // Generate RealEstateListing structured data
    const realEstateSchema = listing ? {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": listing.item?.title || listing.item?.address || "Property Listing",
        "description": listing.item?.description || "Property available for rent on Hoydoon.",
        "url": `https://www.hoydoon.com/rent/${id}`,
        "price": listing.item?.rent || listing.item?.price || "0",
        "priceCurrency": "NGN",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": listing.item?.address || "Lagos",
            "addressLocality": listing.region || "Lagos",
            "addressCountry": "NG"
        },
        "numberOfRooms": listing.item?.bedrooms || 0,
        "image": listing.imageUrls?.[0]?.url || "https://www.hoydoon.com/house1.png"
    } : null;

    return (
        <>
            {realEstateSchema && (
                <Script
                    id="real-estate-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(realEstateSchema),
                    }}
                />
            )}
            <RentDetailsClient />
        </>
    );
}
