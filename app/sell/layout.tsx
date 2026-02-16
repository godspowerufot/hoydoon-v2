import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sell Homes & Property in Somalia & Nigeria | Hoydoon",
    description:
        "Sell Homes & Property in Somalia & Nigeria with Hoydoon. List faster with verified leads, pricing support, and agent help to close confidently today.",
    openGraph: {
        title: "Sell Homes & Property in Somalia & Nigeria | Hoydoon",
        description:
            "Sell Homes & Property in Somalia & Nigeria with Hoydoon. List faster with verified leads, pricing support, and agent help to close confidently today.",
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
        title: "Sell Homes & Property in Somalia & Nigeria | Hoydoon",
        description:
            "Sell Homes & Property in Somalia & Nigeria with Hoydoon. List faster with verified leads, pricing support, and agent help to close confidently today.",
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
