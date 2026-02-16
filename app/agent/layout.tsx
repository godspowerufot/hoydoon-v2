import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Find Agents in Somalia & Nigeria | Hoydoon",
    description:
        "Browse trusted real estate agents in Somalia and Nigeria on Hoydoon. Connect with local experts to buy, sell, or rent property with confidence.",
    openGraph: {
        title: "Find Agents in Somalia & Nigeria | Hoydoon",
        description:
            "Browse trusted real estate agents in Somalia and Nigeria on Hoydoon. Connect with local experts to buy, sell, or rent property with confidence.",
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
        title: "Find Agents in Somalia & Nigeria | Hoydoon",
        description:
            "Browse trusted real estate agents in Somalia and Nigeria on Hoydoon. Connect with local experts to buy, sell, or rent property with confidence.",
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
