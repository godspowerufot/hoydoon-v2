import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rent Homes & Apartments in Somalia & Nigeria | Hoydoon",
    description:
        "Rent Homes & Apartments in Somalia & Nigeria. Browse verified rentals, filter by price and location, and contact landlords or agents on Hoydoon now.",
    openGraph: {
        title: "Rent Homes & Apartments in Somalia & Nigeria | Hoydoon",
        description:
            "Rent Homes & Apartments in Somalia & Nigeria. Browse verified rentals, filter by price and location, and contact landlords or agents on Hoydoon now.",
        url: "https://www.hoydoon.com/rent",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "Rent Homes & Apartments in Somalia & Nigeria",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rent Homes & Apartments in Somalia & Nigeria | Hoydoon",
        description:
            "Rent Homes & Apartments in Somalia & Nigeria. Browse verified rentals, filter by price and location, and contact landlords or agents on Hoydoon now.",
        images: ["https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp"],
    },
};

export default function RentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
