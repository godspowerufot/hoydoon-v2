import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Apartments & Houses for Rent in Lagos, Abuja & Nigeria | Hoydoon",
    description:
        "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
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
    ],
    //add canonical
    alternates: {
        canonical: "https://www.hoydoon.com/rent",
    },
    openGraph: {
        title: "Apartments & Houses for Rent in Lagos, Abuja & Nigeria | Hoydoon",
        description:
            "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
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
        title: "Apartments & Houses for Rent in Lagos, Abuja & Nigeria | Hoydoon",
        description:
            "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
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
