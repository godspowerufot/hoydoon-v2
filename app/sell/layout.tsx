import type { Metadata } from "next";

const SEO_DESCRIPTION =
    "Find verified homes, apartments and land for sale or rent in Lagos, Abuja, Nairobi and across Nigeria, Kenya & Somalia. Browse thousands of listings on Hoydoon.";

export const metadata: Metadata = {
    title: "Sell Property in Lagos, Abuja, Nairobi & Nigeria Fast | Hoydoon",
    description: SEO_DESCRIPTION,
    keywords: [
        "sell property Nigeria",
        "sell house Lagos",
        "sell property Lagos Nigeria",
        "sell house Abuja",
        "list property Nigeria",
        "property listing Nigeria",
        "sell land Nigeria",
        "how to sell property in Nigeria",
        "sell apartment Lagos",
        "property valuation Nigeria",
        "sell home fast Nigeria",
        "real estate selling Nigeria",
        "property agents for selling Nigeria",
        "sell property Kenya",
        "sell house Nairobi",
        "list property Kenya",
        "sell apartment Nairobi",
        "property valuation Kenya",
        "sell home fast Kenya",
        "real estate selling Kenya",
    ],
    alternates: {
        canonical: "https://www.hoydoon.com/sell",
    },
    openGraph: {
        title: "Sell Property in Lagos, Abuja, Nairobi & Nigeria Fast | Hoydoon",
        description: SEO_DESCRIPTION,
        url: "https://www.hoydoon.com/sell",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "Sell Homes & Property in Nigeria, Kenya & Somalia",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sell Property in Lagos, Abuja, Nairobi & Nigeria Fast | Hoydoon",
        description: SEO_DESCRIPTION,
        images: ["https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp"],
    },
};

export default function SellLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
