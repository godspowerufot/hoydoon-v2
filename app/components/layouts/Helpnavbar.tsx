/* eslint-disable */

"use client";
import Link from "next/link";
import Image from "next/image";

export default function HelpCenterNavbar() {
  return (
    <nav className="w-full border-b border-gray-300 bg-[#f1f1f1] py-2">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-2">
          <Image src="/Logo.svg" alt="Hoydoon Logo" width={30} height={30} priority />
          <span className="text-gray-800  gap-3  flex font-medium text-lg">Hoydoon | <p className="font-[300]"> Help Center</p></span>
        </div>

        {/* Right: Links */}
        <div className="flex items-center space-x-4">
          <Link href="/help-center/submit-request" className="text-gray hover:text-gray text-base">Submit a request</Link>
          <Link href="/auth/sign-up" className="bg-primary text-white text-base px-4 py-1.5 rounded-full">Register</Link>
        </div>
      </div>
    </nav>
  );
}
