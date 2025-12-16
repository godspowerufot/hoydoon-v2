import type { Metadata } from "next";
import "./globals.css";
import Appfooter from "./components/layouts/footer";
import Navbar from "./components/layouts/navbar";
import AnimationWrapper from "@/utils/lib/_app";
import { Providers } from "@/store/provider";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/common/Spinner";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hoydoon.com"),
  title: "Hoydoon: Real Estate, Apartments, Mortgages & Home Values",
  description:
    "The leading real estate marketplace. Search millions of for-sale and rental listings, compare Hoydoon® home values and connect with local professionals.",
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
    title: "Hoydoon: Real Estate, Apartments, Mortgages & Home Values",
    description:
      "The leading real estate marketplace. Search millions of for-sale and rental listings, compare home values and connect with local professionals.",
    url: "https://www.hoydoon.com",
    siteName: "Hoydoon",
    images: [
      {
        url: "/og-image.jpg",
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
    title: "Hoydoon: Real Estate, Apartments, Mortgages & Home Values",
    description:
      "The leading real estate marketplace. Search millions of for-sale and rental listings.",
    images: ["/twitter-image.jpg"],
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
        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hoydoon",
              alternateName: "Hoydoon Real Estate",
              url: "https://www.hoydoon.com",
              logo: "https://www.hoydoon.com/favicon.ico",
              description:
                "Leading real estate platform. Discover, buy, rent, or sell homes, apartments, and land with ease. Trusted agents, verified listings.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SO",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                url: "https://www.hoydoon.com/contact",
              },
             
            }),
          }}
        />

        {/* Website Schema with SearchAction */}
        

      

        {/* Breadcrumb Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.hoydoon.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Buy",
                  item: "https://www.hoydoon.com/buy",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Rent",
                  item: "https://www.hoydoon.com/rent",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Sell",
                  item: "https://www.hoydoon.com/sell",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Agents",
                  item: "https://www.hoydoon.com/agent",
                },
              ],
            }),
          }}
        />

        <meta
          name="google-signin-client_id"
          content="438580118502-j5qth0chlkikrpreur0gjl9q1vm8a162.apps.googleusercontent.com"
        />

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