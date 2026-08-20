"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ChevronRight,
  HelpCircle,
  Home,
  Key,
  LogOut,
  Search,
  Smartphone,
  Tag,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import BrandLogo from "../../common/BrandLogo";
import { NAV_LINKS } from "./constants";

const NAV_ICONS: Record<string, typeof Home> = {
  "/": Home,
  "/buy": Key,
  "/rent": Building2,
  "/sell": Tag,
  "/agent": Users,
};

type MobileMenuDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  downloadLink: string;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
};

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  downloadLink,
  isAuthenticated,
  isLoggingOut,
  onLogout,
}: MobileMenuDrawerProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? "";

  return (
    <>
      {isOpen ? (
        <div
          className="pointer-events-auto fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
          aria-hidden="false"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(92vw,400px)] flex-col bg-[#f7f7f8] shadow-[-8px_0_40px_rgba(15,23,42,0.12)] transition-transform duration-300 ease-out lg:hidden ${
          isOpen
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between border-b border-[#ececec] bg-white px-5 py-4">
          <BrandLogo compact />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ececec] bg-[#f7f7f8] text-[#111827] transition-colors hover:bg-[#ececec]"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-5">
          <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a8a8a]">
            Explore
          </p>
          <nav aria-label="Main navigation">
            <ul className="space-y-1.5">
              {NAV_LINKS.map((link) => {
                const Icon = NAV_ICONS[link.href] ?? Home;
                const active =
                  currentPath === link.href ||
                  (link.href !== "/" && currentPath.startsWith(link.href));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      data-active={active}
                      className={`mobile-nav-link group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                        active
                          ? "bg-primary text-white shadow-[0_8px_24px_rgba(9,133,141,0.28)]"
                          : "bg-white text-[#2a2a33] shadow-[0_2px_12px_rgba(17,17,17,0.04)] hover:bg-white hover:shadow-[0_4px_16px_rgba(17,17,17,0.06)]"
                      }`}
                    >
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-[#e8f6f6] text-primary"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-[15px] font-semibold">
                        {link.label}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          active ? "text-white/80" : "text-[#c7c7c7]"
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <Link
              href="/search"
              onClick={onClose}
              className="flex flex-col gap-2 rounded-2xl border border-[#ececec] bg-white p-4 shadow-[0_2px_12px_rgba(17,17,17,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(17,17,17,0.06)]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f6f6] text-primary">
                <Search className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-[#2a2a33]">Search</span>
            </Link>
            <Link
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex flex-col gap-2 rounded-2xl border border-[#ececec] bg-white p-4 shadow-[0_2px_12px_rgba(17,17,17,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(17,17,17,0.06)]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f6f6] text-primary">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-[#2a2a33]">Get app</span>
            </Link>
          </div>

          <p className="mb-3 mt-6 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a8a8a]">
            More
          </p>
          <div className="space-y-1.5">
            <Link
              href="/auth/sign-in"
              onClick={onClose}
              className="mobile-nav-secondary flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-[15px] font-medium text-[#2a2a33] shadow-[0_2px_12px_rgba(17,17,17,0.04)]"
            >
              <UserPlus className="h-5 w-5 text-primary" aria-hidden="true" />
              Become an agent
            </Link>
            <Link
              href="/helpcenter"
              onClick={onClose}
              className="mobile-nav-secondary flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-[15px] font-medium text-[#2a2a33] shadow-[0_2px_12px_rgba(17,17,17,0.04)]"
            >
              <HelpCircle className="h-5 w-5 text-primary" aria-hidden="true" />
              Help center
            </Link>
          </div>
        </div>

        <div className="border-t border-[#ececec] bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={onLogout}
              disabled={isLoggingOut}
              className="mobile-nav-btn-primary flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-[#07757c] disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {isLoggingOut ? "Logging out…" : "Log out"}
            </button>
          ) : (
            <div className="flex flex-col gap-2.5">
              <Link
                href="/auth/sign-in"
                onClick={onClose}
                className="mobile-nav-btn-outline flex h-12 w-full items-center justify-center rounded-full border border-[#ececec] bg-white text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
              >
                Log in
              </Link>
              <Link
                href="/auth/sign-up"
                onClick={onClose}
                className="mobile-nav-btn-primary flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-[#07757c]"
              >
                Get started free
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
