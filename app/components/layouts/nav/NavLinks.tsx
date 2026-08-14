"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, NAV_LINKS_INNER } from "./constants";

type NavLinksProps = {
  light?: boolean;
  innerLinks?: boolean;
  className?: string;
  onNavigate?: () => void;
  vertical?: boolean;
};

export default function NavLinks({
  light = false,
  innerLinks = false,
  className = "",
  onNavigate,
  vertical = false,
}: NavLinksProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const links = innerLinks ? NAV_LINKS_INNER : NAV_LINKS;

  if (vertical) {
    return (
      <ul className={`flex flex-col gap-1 ${className}`.trim()}>
        {links.map((link) => {
          const active =
            currentPath === link.href ||
            (link.href !== "/" && currentPath.startsWith(link.href));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                data-active={active}
                className="site-nav-drawer-link"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav aria-label="Main navigation" className={className}>
      <ul className="flex items-center justify-center gap-0.5">
        {links.map((link) => {
          const active =
            currentPath === link.href ||
            (link.href !== "/" && currentPath.startsWith(link.href));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                data-active={active}
                className={`site-nav-link ${light ? "site-nav-link-light" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
