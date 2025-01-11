import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Appfooter from "./components/layouts/footer"
import Navbar from "./components/layouts/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                   <div className="absolute top-0 left-0 w-full z-10">
            <Navbar />
          </div>

        {children}
        <Appfooter/>
      </body>
     
      
    </html>
    </>
  );
}
