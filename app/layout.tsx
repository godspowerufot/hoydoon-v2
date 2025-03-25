import type { Metadata } from "next";
import "./globals.css";
import Appfooter from "./components/layouts/footer"
import Navbar from "./components/layouts/navbar";
import AnimationWrapper from "@/utils/lib/_app"
import { Providers } from '@/store/provider';
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
 
    <body className="lg:flex flex-col  hidden font-bricolage min-h-screen">
      {/* Main content area */}
      <Providers>
      <div className="absolute top-0 left-0 w-full z-10">
            <Navbar />
         </div>
         <AnimationWrapper>

      <main className="flex-1 flex items-center justify-center flex-col ">
     {children}</main>

      {/* Footer */}
    </AnimationWrapper>
       
    </Providers>
      
        <Appfooter/>
      
      </body>
     
      
    </html>
    </>
  );
}
