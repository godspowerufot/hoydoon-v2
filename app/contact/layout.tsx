import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Hoydoon | Customer Support",
    description:
        "Contact Hoydoon for help with listings, the app, or finding a trusted agent. Reach our support team by email, WhatsApp, or the help center.",
    openGraph: {
        title: "Contact Hoydoon | Customer Support",
        description:
            "Contact Hoydoon for help with listings, the app, or finding a trusted agent. Reach our support team by email, WhatsApp, or the help center.",
        url: "https://www.hoydoon.com/contact",
        siteName: "Hoydoon",
        images: [
            {
                url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
                width: 1200,
                height: 630,
                alt: "Contact Hoydoon",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Hoydoon | Customer Support",
        description:
            "Contact Hoydoon for help with listings, the app, or finding a trusted agent. Reach our support team by email, WhatsApp, or the help center.",
        images: ["https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp"],
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
