import { Metadata, ResolvingMetadata } from "next";
import RentDetailsClient from "./RentDetailsClient";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getListing(id: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/listings/${id}`,
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

export default function Page() {
    return <RentDetailsClient />;
}
