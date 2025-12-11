import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getAllListings() {
    try {
        // Fetch all listings to generate routes
        // Adjust the limit as needed or implement pagination handling if the API supports it for sitemaps
        const response = await fetch(`${BASE_URL}/v1/listings?limit=1000`, {
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error("Failed to fetch listings");
        }

        const data = await response.json();
        return data.listings || [];
    } catch (error) {
        console.error("Sitemap Error:", error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const listings = await getAllListings();

    const listingUrls = listings.map((listing: { _id: string; updatedAt: string; createdAt: string }) => ({
        url: `https://www.hoydoon.com/rent/${listing._id}`,
        lastModified: new Date(listing.updatedAt || listing.createdAt),
        changeFrequency: "daily" as const,
        priority: 0.8,
    }));

    return [
        {
            url: "https://www.hoydoon.com",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://www.hoydoon.com/buy",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: "https://www.hoydoon.com/rent",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: "https://www.hoydoon.com/sell",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://www.hoydoon.com/agent",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
        },
        {
            url: "https://www.hoydoon.com/helpcenter",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...listingUrls,
    ];
}
