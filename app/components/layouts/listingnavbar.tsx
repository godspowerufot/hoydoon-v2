"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLogoutMutation } from "@/store/slices/api/authapi";
import { getAccessToken } from "@/utils/cookies";
import { toast } from "react-toastify";
import BrandLogo from "../common/BrandLogo";

const LINKS = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/agent", label: "Find an agent" },
];

export default function ListingNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logout] = useLogoutMutation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [location, setLocation] = useState("");

  useEffect(() => {
    setIsAuthenticated(!!getAccessToken());
  }, []);

  const handleSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    const query = params.toString();
    router.push(query ? `/search?${query}` : "/search");
  };

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
    <nav className="hidden w-full border-b border-[#ececec] bg-[#ffffff] lg:block">
      <div className="home-container flex h-16 items-center gap-6">
        <BrandLogo />

        <form
          onSubmit={handleSearch}
          className="flex h-11 min-w-0 flex-1 max-w-md items-center rounded-full bg-[#f7f7f8] pl-4 pr-1.5"
          role="search"
        >
          <Search className="h-4 w-4 shrink-0 text-[#8a8a8a]" aria-hidden="true" />
          <input
            type="search"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="City, neighborhood, or address"
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#2a2a33] outline-none placeholder:text-[#8a8a8a]"
            aria-label="Search homes"
          />
          <button
            type="submit"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[#fff] transition-colors hover:bg-[#07757c]"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
        </form>

        <ul className="flex items-center gap-5 text-sm font-medium">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    active
                      ? "text-primary"
                      : "text-[#5c5c66] hover:text-[#2a2a33]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex h-10 min-w-[6.75rem] items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-[#fff] transition-colors hover:bg-[#07757c] disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out" : "Logout"}
            </button>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="inline-flex h-10 min-w-[6.75rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-[#2a2a33] transition-colors hover:bg-[#f7f7f8]"
              >
                Login
              </Link>
              <Link
                href="/auth/sign-up"
                className="inline-flex h-10 min-w-[6.75rem] items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-[#fff] transition-colors hover:bg-[#07757c]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
