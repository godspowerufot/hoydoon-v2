import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sell Property in Lagos, Abuja & Nigeria Fast | Hoydoon",
    description:
        "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
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
    ],
    alternates: {
        canonical: "https://www.hoydoon.com/sell",
    },
    openGraph: {
        title: "Sell Property in Lagos, Abuja & Nigeria Fast | Hoydoon",
        description:
            "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
        url: "https://www.hoydoon.com/sell",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "Sell Homes & Property in Somalia & Nigeria",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sell Property in Lagos, Abuja & Nigeria Fast | Hoydoon",
        description:
            "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
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
