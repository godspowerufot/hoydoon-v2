import type { Metadata } from "next";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Appfooter from "./components/layouts/footer"
import Navbar from "./components/layouts/navbar";
import AnimationWrapper from "@/utils/lib/_app"
import { Providers } from '@/store/provider';
import { Suspense } from "react";
import Spinner from "./components/common/Spinner";
export const metadata: Metadata = {
  title: "Hoydoon",
  description: "Property Listing made simple",
  icons: {
    icon: "/Logo.ico" // Path to your favicon file
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
              <GoogleOAuthProvider
                clientId={`438580118502-j5qth0chlkikrpreur0gjl9q1vm8a162.apps.googleusercontent.com`}
              >
                <main className="flex-1 flex items-center justify-center flex-col ">
                  <Suspense fallback={<Spinner />}>{children}</Suspense>
                </main>
              </GoogleOAuthProvider>
              {/* Footer */}
            </AnimationWrapper>
          </Providers>

          <Appfooter />
        </body>
      </html>
    </>
  );
}
