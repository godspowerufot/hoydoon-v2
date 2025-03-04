import type { Metadata } from "next";
import "./globals.css";
import Appfooter from "./components/layouts/footer"
import Navbar from "./components/layouts/navbar";
import AnimationWrapper from "@/utils/lib/_app"

export const metadata: Metadata = {
  title: "Hoydoon",
  description: "Property Listing made simple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    
    <html lang="en">
 
    <body className="flex flex-col font-bricolage min-h-screen">
      {/* Main content area */}
      
      <div className="absolute top-0 left-0 w-full z-10">
            <Navbar />
         </div>
         <AnimationWrapper>

      <main className="flex-1 ">{children}</main>

      {/* Footer */}
    </AnimationWrapper>
       

      
        <Appfooter/>
      
      </body>
     
      
    </html>
    </>
  );
}
