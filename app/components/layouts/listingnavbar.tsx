/* eslint-disable */

"use client";
import { useState, useEffect } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logout] = useLogoutMutation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getAccessToken());
  }, []);

  const [formData, setFormData] = useState({
    location: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = () => {
    console.log("Searching with data:", formData);
    const queryParams = new URLSearchParams({
      ...(formData.location && { location: formData.location }),
    }).toString();

    router.push(`/search?${queryParams}`);
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
              <img src="/newlogo2.png" alt="logo" className="w-[141px] object-contain" />
              {" "}
            </Link>{" "}
            <form
              className="relative w-[20rem] h-[3rem] hidden lg:flex items-center bg-gray-100 border border-[#8F8F8F] rounded-[14px] px-2 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Address, State, Zip..."
                className="bg-transparent placeholder:text-[#8F8F8F] focus:outline-none text-black text-sm w-full"
              />

              <button
                type="submit"
                className="ml-2 bg-primary text-white p-2 rounded-md"
              >
                <Image
                  alt="search"
                  width={20}
                  height={20}
                  src="/arrow-left.png"
                  className="object-cover"
                />
              </button>
            </form>
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
                className={`rounded-full border border-primary px-4 py-1 font-[300] text-base transition-all duration-200 ${isLoggingOut
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
        </div>
      </nav>
    </>
  );
}
