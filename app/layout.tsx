import type { Metadata } from "next";
import "./globals.css";
import Appfooter from "./components/layouts/footer";
import Navbar from "./components/layouts/navbar";
import AnimationWrapper from "@/utils/lib/_app";
import { Providers } from "@/store/provider";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

import Spinner from "./components/common/Spinner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hoydoon.com"),
  title: "Hoydoon | Homes & Real Estate in Somalia & Nigeria",
  description:
    "Real estate marketplace. Search millions of for-sale and rental listings in Somalia & Nigeria, compare Hoydoon home values, and connect with local professionals",
  keywords: [
    "real estate",
    "Somalia",
    "property",
    "buy home",
    "rent apartment",
    "sell house",
    "land",
    "agents",
    "listings",
    "hoydoon",
    "home values",
    "mortgages",
  ],
  authors: [{ name: "Hoydoon Team" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Hoydoon | Homes & Real Estate in Somalia & Nigeria",
    description:
      "Real estate marketplace. Search millions of for-sale and rental listings in Somalia & Nigeria, compare Hoydoon home values, and connect with local professionals",
    url: "https://www.hoydoon.com",
    siteName: "Hoydoon",
    images: [
      {
        url: "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
        width: 1200,
        height: 630,
        alt: "Hoydoon - Find Your Dream Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoydoon | Homes & Real Estate in Somalia & Nigeria",
    description:
      "Real estate marketplace. Search millions of for-sale and rental listings in Somalia & Nigeria, compare Hoydoon home values, and connect with local professionals",
    images: ["https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta
            name="google-signin-client_id"
            content="438580118502-j5qth0chlkikrpreur0gjl9q1vm8a162.apps.googleusercontent.com"
          />
          <meta
            name="google-site-verification"
            content="6tevUXnxT89TubXC_lXDm_M9Qis3qs2zzrU1aGoXYHc"
          />
          <meta name="apple-mobile-web-app-title" content="hoydoon" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Google Analytics */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-VQ35E1Y7XL"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VQ35E1Y7XL');
            `}
          </Script>

          {/* Schema Markup */}
          <Script
            id="schema-markup"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": "https://www.hoydoon.com/#organization",
                    "name": "Hoydoon",
                    "alternateName": "Hoydoon Real Estate",
                    "url": "https://www.hoydoon.com/",
                    "logo": {
                      "@type": "ImageObject",
                      "@id": "https://www.hoydoon.com/#logo",
                      "url": "https://www.hoydoon.com/newlogo2.png"
                    },
                    "description": "The leading real estate marketplace. Search millions of for-sale and rental listings, compare Hoydoon® home values and connect with local professionals.",
                    "email": "support@hoydoon.com",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "5, Elshadai Street, Erunwen"
                    },
                    "sameAs": [
                      "https://www.instagram.com/hoydoon/",
                      "https://x.com/hoydoon_?s=11&t=nIieHzDuZ8BAPHDnr6Ikcw",
                      "https://www.facebook.com/share/1YwJpJwiGT/?mibextid=wwXIfr",
                      "https://www.linkedin.com/company/hoydoon/about/?viewAsMember=true"
                    ],
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "contactType": "customer support",
                      "telephone": "+2347043058500",
                      "email": "support@hoydoon.com",
                      "availableLanguage": "en",
                      "areaServed": ["NG", "SO"]
                    }
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://www.hoydoon.com/#website",
                    "url": "https://www.hoydoon.com/",
                    "name": "Hoydoon",
                    "description": "The leading real estate marketplace. Search millions of for-sale and rental listings, compare Hoydoon® home values and connect with local professionals.",
                    "publisher": {
                      "@id": "https://www.hoydoon.com/#organization"
                    },
                    "inLanguage": "en",
                    "potentialAction": {
                      "@type": "SearchAction",
                      "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://www.hoydoon.com/search?q={search_term_string}"
                      },
                      "query-input": "required name=search_term_string"
                    }
                  },
                  {
                    "@type": "MobileApplication",
                    "@id": "https://www.hoydoon.com/#app-ios",
                    "name": "Hoydoon",
                    "operatingSystem": "iOS",
                    "applicationCategory": "BusinessApplication",
                    "downloadUrl": "https://apps.apple.com/us/app/hoydoon/id6736393320",
                    "url": "https://www.hoydoon.com/"
                  },
                  {
                    "@type": "MobileApplication",
                    "@id": "https://www.hoydoon.com/#app-android",
                    "name": "Hoydoon",
                    "operatingSystem": "Android",
                    "applicationCategory": "BusinessApplication",
                    "downloadUrl": "https://play.google.com/store/apps/details?id=com.hoydoon.app",
                    "url": "https://www.hoydoon.com/"
                  }
                ]
              })
            }}
          />
        </head>

        {/* Organization Schema */}


        <body className="lg:flex overflow-x-hidden flex-col flex-1 font-bricolage min-h-screen">
          <Providers>
            <div className="absolute top-0 left-0 w-full z-10">
              <Navbar />
            </div>
            <AnimationWrapper>
              <main className="container flex-1 flex items-center justify-center flex-col">
                <Suspense fallback={<Spinner />}>
                  <ToastContainer position="top-center" autoClose={3000} />
                  {children}
                </Suspense>
              </main>
            </AnimationWrapper>
          </Providers>
          <Appfooter />
        </body>
      </html>
    </>
  );
}
