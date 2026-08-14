"use client";

import Link from "next/link";
import BrandLogo from "../common/BrandLogo";
import MobileNavbar from "./mobile";
import "./nav/nav.css";

export default function HelpCenterNavbar() {
  return (
    <>
      <header className="site-nav pointer-events-auto fixed inset-x-0 top-0 z-50 hidden lg:block">
        <div className="site-nav-shell site-nav-shell--solid">
          <div className="home-container">
            <div className="site-nav-bar flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <BrandLogo compact />
                <span className="border-l border-[#e5e7eb] pl-3 text-sm font-medium text-[#6b7280]">
                  Help Center
                </span>
              </Link>

              <div className="flex items-center gap-1.5">
                <Link
                  href="/helpcenter/submit-request"
                  className="site-nav-ghost site-nav-ghost-dark"
                >
                  Submit a request
                </Link>
                <Link href="/auth/sign-up" className="site-nav-cta">
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileNavbar variant="solid" helpCenter />
    </>
  );
}
