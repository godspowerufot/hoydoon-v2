"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useLogoutMutation } from "@/store/slices/api/authapi";
import { getAccessToken } from "@/utils/cookies";
import { getAppDownloadLink } from "@/utils";
import { toast } from "react-toastify";
import BrandLogo from "../common/BrandLogo";
import MobileMenuDrawer from "./nav/MobileMenuDrawer";
import "./nav/nav.css";

const MOBILE_SHELL_CLASS =
  "site-nav-shell site-nav-shell--mobile-white border-b border-[#ececec] bg-white";

export default function MobileNavbar({
  variant = "solid",
  helpCenter = false,
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logout] = useLogoutMutation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [downloadLink, setDownloadLink] = useState(
    "https://apps.apple.com/us/app/hoydoon/id6736393320"
  );

  const authPaths = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password"];
  const currentPath = pathname ?? "";
  const isHelpCenter = currentPath.startsWith("/helpcenter") && !helpCenter;
  const isHelpCenterPage = helpCenter || currentPath.startsWith("/helpcenter");

  useEffect(() => {
    setIsAuthenticated(!!getAccessToken());
    setDownloadLink(getAppDownloadLink());
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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
      <header className="site-nav pointer-events-auto z-[100] w-screen max-w-[100vw] lg:hidden">
        <div className={MOBILE_SHELL_CLASS}>
          <div className="site-nav-inner flex site-nav-bar items-center justify-between">
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
      <header className="site-nav pointer-events-auto z-[100] w-screen max-w-[100vw] lg:hidden">
        <div className={MOBILE_SHELL_CLASS}>
          <div className="site-nav-inner flex site-nav-bar items-center justify-between gap-3">
            <BrandLogo compact />

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
              aria-label="Open menu"
              aria-expanded={isSidebarOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenuDrawer
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        downloadLink={downloadLink}
        isAuthenticated={isAuthenticated}
        isLoggingOut={isLoggingOut}
        onLogout={handleLogout}
      />
    </>
  );
}
