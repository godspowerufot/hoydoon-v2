import type { Metadata } from "next";

const SEO_DESCRIPTION =
    "Find verified homes, apartments and land for sale or rent in Lagos, Abuja, Nairobi and across Nigeria, Kenya & Somalia. Browse thousands of listings on Hoydoon.";

export const metadata: Metadata = {
    title: "Find Trusted Real Estate Agents in Lagos, Nigeria, Kenya & Somalia | Hoydoon",
    description: SEO_DESCRIPTION,
    keywords: [
        "real estate agents Lagos",
        "property agents Lagos Nigeria",
        "real estate agents Abuja",
        "real estate agents Nigeria",
        "find property agent Nigeria",
        "trusted agents Nigeria",
        "buy sell rent agent Nigeria",
        "real estate agent Lagos Island",
        "property agent Lekki",
        "real estate agent Victoria Island",
        "real estate agents Somalia",
        "property agents Mogadishu",
        "verified real estate agents Nigeria",
        "top agents Nigeria",
        "real estate agents Nairobi",
        "property agents Kenya",
        "real estate agents Kenya",
        "find property agent Kenya",
        "trusted agents Nairobi",
        "top agents Kenya",
    ],
    alternates: {
        canonical: "https://www.hoydoon.com/agent",
    },
    openGraph: {
        title: "Find Trusted Real Estate Agents in Lagos, Nigeria, Kenya & Somalia | Hoydoon",
        description: SEO_DESCRIPTION,
        url: "https://www.hoydoon.com/agent",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "Find Agents in Nigeria, Kenya & Somalia",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Find Trusted Real Estate Agents in Lagos, Nigeria, Kenya & Somalia | Hoydoon",
        description: SEO_DESCRIPTION,
        images: ["https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp"],
    },
};

export default function AgentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
