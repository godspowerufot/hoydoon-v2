import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hoydoon Blog | Real Estate Tips & Market Insights",
    description:
        "Follow Hoydoon Blog for property tips, buying and renting guides, market insights, and advice from local experts to help you make smarter real estate decisions.",
    openGraph: {
        title: "Hoydoon Blog | Real Estate Tips & Market Insights",
        description:
            "Follow Hoydoon Blog for property tips, buying and renting guides, market insights, and advice from local experts to help you make smarter real estate decisions.",
        url: "https://www.hoydoon.com/helpcenter",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "Hoydoon Blog",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hoydoon Blog | Real Estate Tips & Market Insights",
        description:
            "Follow Hoydoon Blog for property tips, buying and renting guides, market insights, and advice from local experts to help you make smarter real estate decisions.",
        images: ["https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp"],
    },
};

export default function HelpCenterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
