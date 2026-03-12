import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Houses & Property for Sale in Lagos, Abuja & Nigeria | Hoydoon",
    description:
        "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
    keywords: [
        "houses for sale in Lagos",
        "property for sale in Lagos Nigeria",
        "homes for sale Lagos",
        "buy house in Lagos",
        "property for sale Abuja",
        "houses for sale Abuja Nigeria",
        "buy property Nigeria",
        "real estate for sale Nigeria",
        "apartments for sale Lagos",
        "land for sale Lagos",
        "Lekki property for sale",
        "Victoria Island property",
        "Ikoyi homes for sale",
        "duplex for sale Lagos",
        "property for sale Mogadishu",
        "houses for sale Somalia",
        "Nigerian property listings",
        "verified property listings Nigeria",
    ],
    alternates: {
        canonical: "https://www.hoydoon.com/buy",
    },
    openGraph: {
        title: "Houses & Property for Sale in Lagos, Abuja & Nigeria | Hoydoon",
        description:
            "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
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
        title: "Houses & Property for Sale in Lagos, Abuja & Nigeria | Hoydoon",
        description:
            "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
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
