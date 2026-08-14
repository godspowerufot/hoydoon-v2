"use client";

import { useEffect, useState } from "react";
import { useLogoutMutation } from "@/store/slices/api/authapi";
import { getAccessToken } from "@/utils/cookies";
import { toast } from "react-toastify";
import BrandLogo from "../../common/BrandLogo";
import NavAuthButtons from "./NavAuthButtons";
import NavLinks from "./NavLinks";
import "./nav.css";

type DesktopNavbarProps = {
  variant?: "hero" | "solid";
};

export default function DesktopNavbar({
  variant = "solid",
}: DesktopNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logout] = useLogoutMutation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isHero = variant === "hero";
  const isSolid = !isHero || scrolled;
  const light = isHero && !scrolled;

  useEffect(() => {
    setIsAuthenticated(!!getAccessToken());
  }, []);

  useEffect(() => {
    if (!isHero) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHero]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout(null);
      toast.success("Logged out successfully");
      window.location.href = "/auth/sign-in";
    } catch {
      toast.error("Logout failed. Try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50 hidden lg:block">
      <div
        className={`site-nav-shell ${
          isSolid ? "site-nav-shell--solid" : "site-nav-shell--transparent"
        }`}
      >
        <div className="home-container">
          <div className="site-nav-bar grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div className="justify-self-start">
              <BrandLogo light={light} />
            </div>

            <div className="justify-self-center">
              <NavLinks light={light} />
            </div>

            <div className="justify-self-end">
              <NavAuthButtons
                isAuthenticated={isAuthenticated}
                isLoggingOut={isLoggingOut}
                onLogout={handleLogout}
                light={light}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
