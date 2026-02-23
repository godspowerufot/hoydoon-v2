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
        "@type": listing.listingType === "sale" ? "SingleFamilyResidence" : "Apartment",
        "name": listing.item?.title || "Property Listing",
        "description": listing.item?.description || "Property available for rent",
        "image": listing.imageUrls?.map((img: { url: string }) => img.url) || [],
        "address": {
            "@type": "PostalAddress",
            "addressRegion": listing.region || "Available",
            "addressCountry": "US"
        },
        "numberOfRooms": (listing.item?.bedrooms || 0) + (listing.item?.bathrooms || 0),
        "numberOfBedrooms": listing.item?.bedrooms || 0,
        "numberOfBathroomsTotal": listing.item?.bathrooms || 0,
        "floorSize": {
            "@type": "QuantitativeValue",
            "value": listing.item?.squareFeet || 0,
            "unitCode": "SQF"
        },
        "petsAllowed": listing.item?.petFriendly || false,
        "offers": {
            "@type": "Offer",
            "url": `https://www.hoydoon.com/rent/${id}`,
            "priceCurrency": "USD",
            "price": listing.item?.rent || listing.item?.price || "0",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "US",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
            },
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "USD"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "US",
                    "addressRegion": listing.region || "Available"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 3,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 0,
                        "maxValue": 1,
                        "unitCode": "DAY"
                    }
                }
            }
        }
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
