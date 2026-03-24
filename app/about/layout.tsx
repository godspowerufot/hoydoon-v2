import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Hoydoon | Real Estate Platform for Somalia, Nigeria  & Kenya",
    description:
        "Learn about Hoydoon—an all-in-one property platform helping people buy, sell, rent, and connect with trusted agents across Somalia, Nigeria and Kenya.",
    openGraph: {
        title: "About Hoydoon | Real Estate Platform for Somalia, Nigeria  & Kenya",
        description:
            "Learn about Hoydoon—an all-in-one property platform helping people buy, sell, rent, and connect with trusted agents across Somalia and Nigeria.",
        url: "https://www.hoydoon.com/about",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "About Hoydoon",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Hoydoon | Real Estate Platform for Somalia, Nigeria  & Kenya",
        description:
            "Learn about Hoydoon—an all-in-one property platform helping people buy, sell, rent, and connect with trusted agents across Somalia, Nigeria and Kenya.",
        images: ["https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp"],
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
