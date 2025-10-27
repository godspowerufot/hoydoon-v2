/* eslint-disable */

"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import { useLogoutMutation } from "@/store/slices/api/authapi";
import { getAccessToken } from "@/utils/cookies";
import { toast } from "react-toastify";
import MobileNavbar from "./mobile";

export default function ListingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = getAccessToken();
  const [logout] = useLogoutMutation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      ...(formData.location && { location: formData.location }),
    }).toString();

    router.push(`/rent/searchlisting?${queryParams}`);
  };

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

  return (
    <>
      <nav className="hidden lg:flex justify-between  items-center  relative z-[9999] w-full  ">
        <div className="  mx-auto flex gap-[20rem] justify-between py-3 px-5 lg:px-0">
          {/* Left: Logo & Search Bar */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-3-transparent.svg"
                alt="logo"
                width={100}
                height={200}
                priority
                className="object-contain w-[141px]"
              />{" "}
            </Link>{" "}
            <div className="relative  w-[20rem]  h-[3rem] hidden border-[#8F8F8F] border-solid border-[1px]  lg:flex items-center bg-gray-100 rounded-[14px] px-2 py-2">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // prevents form submission if inside a form
                    handleSearch();
                  }
                }}
                placeholder="City, Address, State, Zip..."
                className="bg-transparent  placeholder:fonr-[300] placeholder:font-[1em] lg:pl-2 placeholder:text-[#8F8F8F]  focus:outline-none text-black text-sm w-full"
              />
              <button
                onClick={handleSearch}
                className="ml-2 bg-primary text-white p-2 rounded-md"
              >
                <Image
                  alt="logo"
                  width={20}
                  loading="lazy"
                  height={10}
                  quality={100} // Ensures maximum quality
                  src={"/arrow-left.png"}
                  style={{ objectFit: "cover" }}
                />{" "}
              </button>
            </div>
          </div>

          {/* Center: Navigation Links + Auth Buttons */}
          <div className="hidden lg:flex items-center gap-x-2">
            {/* Navigation Links */}
            <ul className="flex  gap-[1rem] lg:mr-[2rem] text-[#8F8F8F] text-[1rem]">
              <li>
                <Link href="/buy" className="hover:text-primary">
                  Buy
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-primary">
                  Sell
                </Link>
              </li>
              <li>
                <Link href="/agent" className="hover:text-primary">
                  Find an agent
                </Link>
              </li>
            </ul>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <button
                onClick={handlelogout}
                disabled={isLoggingOut}
                className={`rounded-full border border-primary px-4 py-1 font-[300] text-base transition-all duration-200 ${
                  isLoggingOut
                    ? "bg-primary text-white opacity-50 cursor-not-allowed"
                    : "bg-primary text-white"
                }`}
              >
                Logout
              </button>
            ) : (
              <>
                <Button className="!bg-black text-white hover:bg-primary px-4 !py-2 rounded-full  text-base font-bricolage">
                  <Link href="/auth/sign-in">Login</Link>
                </Button>
                <Button className="px-4 !py-2  w-[92px] rounded-full">
                  <Link href="/auth/sign-up" className="font-light text-base">
                    Register
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes size={24} className="text-black" />
              ) : (
                <FaBars size={24} className="text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex justify-end p-4">
            <button onClick={() => setMenuOpen(false)}>
              <FaTimes size={24} className="text-black" />
            </button>
          </div>
          <ul className="text-black text-lg text-center pt-5">
            <li className="py-3">
              <Link href="/buy" onClick={() => setMenuOpen(false)}>
                Buy
              </Link>
            </li>
            <li className="py-3">
              <Link href="/sell" onClick={() => setMenuOpen(false)}>
                Sell
              </Link>
            </li>
            <li className="py-3">
              <Link href="/agent" onClick={() => setMenuOpen(false)}>
                Find an agent
              </Link>
            </li>
          </ul>
          <div className="text-center mt-5">
            {isAuthenticated ? (
              <button
                onClick={handlelogout}
                className="block bg-black text-white py-2 px-5 rounded-md my-2"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="block bg-black text-white py-2 px-5 rounded-md my-2"
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="block bg-primary  text-white py-2 px-5 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {<MobileNavbar />}
    </>
  );
}
