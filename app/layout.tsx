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
export const metadata: Metadata = {
  title: "Hoydoon | Find Your Dream Property in Hoydoon",
  description:
    "Hoydoon is  leading real estate platform. Discover, buy, rent, or sell homes, apartments, and land with ease. Trusted agents, verified listings, and the best property deals.",
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
  ],
  authors: [{ name: "Hoydoon Team" }],
  icons: {
    icon: "/Logo.ico",
  },
  openGraph: {
    title: "Hoydoon | Find Your Dream Property in Hoydoon",
    description:
      "Discover, buy, rent, or sell homes, apartments, and land . Trusted agents, verified listings, and the best property deals.",
    url: "https://hoydoon.com",
    siteName: "Hoydoon",
    images: [
      {
        url: "/Logo.svg",
        width: 800,
        height: 600,
        alt: "Hoydoon Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoydoon | Find Your Dream Property in Hoydoon",
    description:
      "Discover, buy, rent, or sell homes, apartments, and land. Trusted agents, verified listings, and the best property deals.",
    images: ["/afforable-1.png"],
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
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
        <meta
          name="google-signin-client_id"
          content="438580118502-j5qth0chlkikrpreur0gjl9q1vm8a162.apps.googleusercontent.com"
        />

        <body className="lg:flex flex-col  flex-1 font-bricolage min-h-screen">
          {/* Main content area */}
          <Providers>
            <div className="absolute top-0 left-0 w-full z-10">
              <Navbar />
            </div>
            <AnimationWrapper>
              {/* wrap the client id */}

              <main className=" container flex-1 flex items-center justify-center flex-col ">
                <Suspense fallback={<Spinner />}>
                  <ToastContainer position="top-center" autoClose={3000} />

                  {children}
                </Suspense>
              </main>
              {/* Footer */}
            </AnimationWrapper>
          </Providers>

          <Appfooter />
        </body>
      </html>
    </>
  );
}
