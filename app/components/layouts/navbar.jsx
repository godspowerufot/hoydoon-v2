"use client";

import { usePathname } from "next/navigation";
import DesktopNavbar from "./nav/DesktopNavbar";
import HelpCenterNavbar from "./Helpnavbar";
import MobileNavbar from "./mobile";

function shouldUseHeroNav(pathname) {
  if (pathname === "/") return true;
  if (pathname === "/buy" || pathname.startsWith("/buy/")) return true;
  if (pathname === "/rent" || pathname === "/rent/fixes") return true;
  if (pathname === "/sell" || pathname.startsWith("/sell/")) return true;
  if (
    pathname === "/agent" ||
    pathname === "/agent/all-agent" ||
    pathname.startsWith("/agent/all-agent/")
  ) {
    return true;
  }
  if (pathname === "/about") return true;
  return false;
}

export default function Navbar() {
  const pathname = usePathname() ?? "";

  if (pathname.startsWith("/auth")) return null;

  if (pathname.startsWith("/helpcenter")) {
    return <HelpCenterNavbar />;
  }

  const variant = shouldUseHeroNav(pathname) ? "hero" : "solid";

  return (
    <>
      <DesktopNavbar variant={variant} />
      <MobileNavbar variant={variant} />
    </>
  );
}
