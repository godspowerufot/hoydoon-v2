"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "../common/Button";
import { FaBars, FaTimes } from "react-icons/fa";
import ListingNavbar from "./listingnavbar";
import HelpCenterNavbar from "./Helpnavbar";
import { useLogoutMutation } from "@/store/slices/api/authapi";
import { getAccessToken } from "@/utils/cookies";
import { toast } from "react-toastify";
import MobileNavbar from "./mobile";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Fetch user data
  const isAuthenticated = getAccessToken();
  const [logout] = useLogoutMutation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handlelogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout(null); // wait for mutation
      toast.success("Logged out successfully");
      window.location.href = "/auth/sign-in";
    } catch (error) {
      toast.error("Logout failed. Try again.");
      setIsLoggingOut(false);
    }
  };

  // Check routes to show/hide navbar
  const hideNavbar =
    pathname.startsWith("/rent/listing") ||
    /^\/agent\/[^/]+$/.test(pathname) ||
    /^\/rent\/[^/]+$/.test(pathname); // Hide on /agent/[id]
  const hideAuth = pathname.startsWith("/auth");
  const showNavbar =
    [
      "/listing",
      "/article/article-details",
      "/contact",
      "/rent/searchlisting",
      "/agent/all-agent",
      "/agent/agent-description",
      "/sell/sell-home",
      "/article",
      "/about",
    ].some((route) => pathname.includes(route)) ||
    /^\/agent\/[^/]+$/.test(pathname) ||
    /^\/rent\/[^/]+$/.test(pathname); // Matches /agent/{id}

  const helpcenter = pathname.startsWith("/helpcenter");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (showNavbar) {
    return <ListingNavbar />;
  }

  if (helpcenter) {
    return <HelpCenterNavbar />;
  }

  return (
    <>
      {!hideNavbar && !hideAuth && (
        <nav
          className={`text-xl max-w-full z-[999999] hidden font-bricolage  lg:flex fixed top-0  transition-all duration-300 ${
            scrolled
              ? "bg-white text-black shadow-md"
              : "bg-transparent text-white mt-3"
          }`}
        >
          <div className="flex-1  mx-9 lg:mx-0 flex w-screen items-center justify-around p-2">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <Link href="/" className="flex justify-center items-center gap-2">
                <Image
                  alt="logo"
                  width={100}
                  priority
                  quality={100}
                  height={100}
                  className="object-contain w-[150px] h-[50px]"
                  src={"/newlogo.svg"}
                />
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="ml-[4.5rem]  w-[31rem] text-lg sm:hidden max-md:hidden lg:flex items-center justify-center hidden md:hidden rounded-full lg:h-[37px] space-x-5 lg:gap-3 bg-primarytransparent text-white">
              <ul className="lg:flex items-center space-x-6 font-[300]">
                {[
                  { name: "Home", path: "/" },
                  { name: "Buy", path: "/buy" },
                  { name: "Rent", path: "/rent" },
                  { name: "Sell", path: "/sell" },
                  { name: "Find an agent", path: "/agent" },
                ].map(({ name, path }, index) => (
                  <li key={path}>
                    <div
                      className={`px-4 py-2 lg:text-base rounded-full${
                        index === 0 ? " pl-5 rounded-full" : " "
                      } ${
                        pathname === path
                          ? "bg-white text-primary font-light"
                          : scrolled
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      <Link href={path}>{name}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Authentication Buttons */}
            <div className="flex gap-2">
              {isAuthenticated ? (
                // Logout button when user is logged in
                <button
                  onClick={handlelogout}
                  disabled={isLoggingOut}
                  className={`px-4 py-1 rounded-full border-[1px] font-[300] text-base transition-all duration-200 ${
                    scrolled
                      ? "border-primary border-solid text-primary bg-white"
                      : "bg-primary border-none text-white"
                  } ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              ) : (
                // Login & Register buttons when user is not logged in
                <>
                  <Button
                    className={`p-1 w-[92px] ${
                      scrolled
                        ? "bg-white text-primary border-primary border-[1px] border-solid"
                        : "bg-transparent bg-primarytransparent text-black"
                    }`}
                  >
                    <Link
                      href="/auth/sign-in"
                      className={`text-base ${
                        scrolled ? "text-primary" : "text-white"
                      }`}
                    >
                      Login
                    </Link>
                  </Button>
                  <button className="font-bricolage h-auto p-1 rounded-full bg-primary flex justify-center items-center text-white hover:bg-primary w-[7.5rem]">
                    <Link
                      href="/auth/sign-up"
                      className="font-light h-[25px] text-base"
                    >
                      Register
                    </Link>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:block lg:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <FaTimes size={24} className="text-black" />
                ) : (
                  <FaBars size={24} className="text-black" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 bg-white right-0 h-full w-64 z-50 transform ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out md:hidden`}
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setMenuOpen(false)}>
                <FaTimes size={24} className="text-black" />
              </button>
            </div>
            <ul className="space-y-6 text-center pt-8 p-4">
              {[
                { name: "Home", path: "/" },
                { name: "Buy", path: "/buy" },
                { name: "Rent", path: "/rent" },
                { name: "Sell", path: "/sell" },
                { name: "Find an agent", path: "/agent" },
              ].map(({ name, path }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className={`block py-2 rounded-full ${
                      pathname === path
                        ? "bg-white text-green-600 font-light"
                        : "text-black"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-center mt-8">
              <Link
                href="/auth/sign-up"
                className="bg-primary px-5 py-2 rounded-md font-semibold hover:bg-orange-600"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      )}

      {<MobileNavbar />}
    </>
  );
}
