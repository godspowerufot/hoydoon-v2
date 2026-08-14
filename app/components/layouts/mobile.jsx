"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLogoutMutation } from "@/store/slices/api/authapi";
import { getAccessToken } from "@/utils/cookies";
import { getAppDownloadLink } from "@/utils";
import { toast } from "react-toastify";
import BrandLogo from "../common/BrandLogo";
import NavAuthButtons from "./nav/NavAuthButtons";
import NavLinks from "./nav/NavLinks";
import "./nav/nav.css";

export default function MobileNavbar({
  variant = "solid",
  helpCenter = false,
}) {
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logout] = useLogoutMutation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [downloadLink, setDownloadLink] = useState(
    "https://apps.apple.com/us/app/hoydoon/id6736393320"
  );

  const authPaths = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password"];
  const currentPath = pathname ?? "";
  const isHero = variant === "hero";
  const isSolid = !isHero || scrolled;
  const light = isHero && !scrolled;
  const isHelpCenter = currentPath.startsWith("/helpcenter") && !helpCenter;
  const isHelpCenterPage = helpCenter || currentPath.startsWith("/helpcenter");

  useEffect(() => {
    setIsAuthenticated(!!getAccessToken());
    setDownloadLink(getAppDownloadLink());
  }, []);

  useEffect(() => {
    if (!isHero) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHero]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout(null);
      toast.success("Logged out successfully");
      setSidebarOpen(false);
    } catch {
      toast.error("Logout failed. Try again.");
      setIsLoggingOut(false);
    }
  };

  if (authPaths.includes(currentPath) || isHelpCenter) return null;

  if (isHelpCenterPage) {
    return (
      <header className="site-nav pointer-events-auto fixed inset-x-0 top-0 z-50 lg:hidden">
        <div className="site-nav-shell site-nav-shell--solid">
          <div className="flex site-nav-bar items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo compact />
              <span className="text-sm font-medium text-[#6b7280]">Help Center</span>
            </Link>
            <Link href="/helpcenter/submit-request" className="site-nav-cta px-4">
              Submit request
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {isSidebarOpen ? (
        <div
          className="pointer-events-auto fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px] lg:hidden"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <header className="site-nav pointer-events-auto fixed inset-x-0 top-0 z-50 lg:hidden">
        <div
          className={`site-nav-shell ${
            isSolid ? "site-nav-shell--solid" : "site-nav-shell--transparent"
          }`}
        >
          <div className="flex site-nav-bar items-center justify-between gap-3 px-4">
            <BrandLogo compact light={light} />

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                light
                  ? "bg-white/15 text-white backdrop-blur-sm"
                  : "border border-[#e5e7eb] bg-white text-[#111827] shadow-sm"
              }`}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,380px)] flex-col bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out lg:hidden ${
          isSidebarOpen
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!isSidebarOpen}
      >
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
          <BrandLogo compact />
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827]"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <Link
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setSidebarOpen(false)}
            className="mb-6 inline-flex rounded-full bg-[#ecfafa] px-4 py-2.5 text-sm font-semibold text-[#09858d]"
          >
            Download app
          </Link>

          <NavLinks vertical onNavigate={() => setSidebarOpen(false)} />

          <div className="mt-6 space-y-1 border-t border-[#e5e7eb] pt-5">
            <Link
              href="/auth/sign-in"
              onClick={() => setSidebarOpen(false)}
              className="site-nav-drawer-link"
            >
              Become an agent
            </Link>
            <Link
              href="/helpcenter"
              onClick={() => setSidebarOpen(false)}
              className="site-nav-drawer-link"
            >
              Help
            </Link>
          </div>
        </div>

        <div className="border-t border-[#e5e7eb] p-5">
          <NavAuthButtons
            isAuthenticated={isAuthenticated}
            isLoggingOut={isLoggingOut}
            onLogout={handleLogout}
            stacked
          />
        </div>
      </aside>
    </>
  );
}
