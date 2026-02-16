import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Buy Homes & Property in Somalia & Nigeria | Hoydoon",
    description:
        "Buy Homes & Property in Somalia & Nigeria with verified listings. Explore houses, apartments, and land for sale, compare prices, and contact agents!",
    openGraph: {
        title: "Buy Homes & Property in Somalia & Nigeria | Hoydoon",
        description:
            "Buy Homes & Property in Somalia & Nigeria with verified listings. Explore houses, apartments, and land for sale, compare prices, and contact agents!",
        url: "https://www.hoydoon.com/buy",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "Buy Homes & Property in Somalia & Nigeria",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Buy Homes & Property in Somalia & Nigeria | Hoydoon",
        description:
            "Buy Homes & Property in Somalia & Nigeria with verified listings. Explore houses, apartments, and land for sale, compare prices, and contact agents!",
        images: ["https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp"],
    },
};

export default function BuyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
