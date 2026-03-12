import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Find Trusted Real Estate Agents in Lagos, Nigeria & Somalia | Hoydoon",
    description:
        "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
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
    ],
    alternates: {
        canonical: "https://www.hoydoon.com/agent",
    },
    openGraph: {
        title: "Find Trusted Real Estate Agents in Lagos, Nigeria & Somalia | Hoydoon",
        description:
            "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
        url: "https://www.hoydoon.com/agent",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "Find Agents in Somalia & Nigeria",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Find Trusted Real Estate Agents in Lagos, Nigeria & Somalia | Hoydoon",
        description:
            "Find verified homes, apartments and land for sale or rent in Lagos, Abuja and across Nigeria & Somalia. Browse thousands of listings on Hoydoon.",
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
