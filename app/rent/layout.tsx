import type { Metadata } from "next";

const SEO_DESCRIPTION =
    "Find verified homes, apartments and land for sale or rent in Lagos, Abuja, Nairobi and across Nigeria, Kenya & Somalia. Browse thousands of listings on Hoydoon.";

export const metadata: Metadata = {
    title: "Apartments & Houses for Rent in Lagos, Abuja, Nairobi & Nigeria | Hoydoon",
    description: SEO_DESCRIPTION,
    keywords: [
        "apartments for rent in Lagos",
        "houses for rent Lagos",
        "rent apartment Lagos Nigeria",
        "property to rent in Abuja",
        "rental homes Nigeria",
        "rent flat Lagos",
        "short let Lagos",
        "long let Nigeria",
        "Lekki apartments for rent",
        "Victoria Island apartments rent",
        "Ikoyi flat for rent",
        "rental property Nigeria",
        "houses for rent Somalia",
        "apartments Mogadishu",
        "verified rental listings Nigeria",
        "apartments for rent Nairobi",
        "houses for rent Kenya",
        "rent apartment Nairobi Kenya",
        "rental homes Kenya",
        "short let Nairobi",
        "Kilimani apartments for rent",
        "Westlands flat for rent",
        "rental property Kenya",
    ],
    alternates: {
        canonical: "https://www.hoydoon.com/rent",
    },
    openGraph: {
        title: "Apartments & Houses for Rent in Lagos, Abuja, Nairobi & Nigeria | Hoydoon",
        description: SEO_DESCRIPTION,
        url: "https://www.hoydoon.com/rent",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "Rent Homes & Apartments in Nigeria, Kenya & Somalia",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Apartments & Houses for Rent in Lagos, Abuja, Nairobi & Nigeria | Hoydoon",
        description: SEO_DESCRIPTION,
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
