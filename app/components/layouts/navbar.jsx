'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '../common/Button';
import { FaBars, FaTimes } from 'react-icons/fa';
import ListingNavbar from './listingnavbar';
import HelpCenterNavbar from './Helpnavbar';
import { useLogoutMutation } from '@/store/slices/api/authapi';
import { getAccessToken } from '@/utils/cookies';
import { toast } from 'react-toastify';

const MobileNavbar = () => {
  const pathname = usePathname();
  const authPaths = ["/auth/sign-in", "/auth/register", "/auth/forgot-password"];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  if (authPaths.includes(pathname)) return null;

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const sections = {
    Buy: {
      title: "Homes for Sale",
      items: [
        { label: "Homes for Sale", href: "/buy" },
        { label: "Lagos Homes for Sale", href: "/buy/lagos" },
        { label: "Open Houses", href: "/buy/open-houses" },
        { label: "New Constructions", href: "/buy/new" },
        { label: "Lands for Sale", href: "/buy/lands" },
      ],
    },
    Rent: {
      title: "Discover Hoydoon Rentals",
      items: [
        { label: "Apartments for rent", href: "/rent/apartments" },
        { label: "Houses for rent", href: "/rent/houses" },
        { label: "All rentals listings", href: "/rent" },
        { label: "All rentals buildings", href: "/rent/buildings" },
      ],
    },
    Sell: {
      title: "Explore your rentals",
      items: [
        { label: "See your home’s Hoydoon Estimate", href: "/sell/estimate" },
        { label: "Lagos Housing market", href: "/sell/lagos" },
        { label: "Seller’s guide", href: "/sell/guide" },
      ],
    },
    "Find an Agent": {
      title: "Looking for pros?",
      items: [
        { label: "Real Estate Agents", href: "/agent" },
        { label: "Property Managers", href: "/agent/property-managers" },
        { label: "Real Estate Photographers", href: "/agent/photographers" },
        { label: "Home Builders", href: "/agent/builders" },
      ],
    },
  };
  

  return (
    <>
      <nav className="flex  items-center justify-between px-4 py-3 bg-white shadow-md lg:hidden">
        <div className="flex items-center space-x-2">
          <Image alt="logo" width={30} height={30} src="/Logo.svg" />
          <span className="font-semibold text-gray-800 text-[16px]">Hoydoon</span>
        </div>

        <div className="flex gap-3">
          <Button className="bg-[#008D8D] text-white text-sm px-4 py-[8px] rounded-full font-medium">
            Download App
          </Button>
          <button onClick={() => setSidebarOpen(true)} className="text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b  border-[#8F8F8F]">
          <Image alt="logo" width={100} height={100} src="/mobilelogo.png" />
          <button onClick={() => setSidebarOpen(false)} className="text-gray-800">
            <Image src="/close.svg" alt="close icon" width={10} height={10} />
          </button>
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-3">
            <Image alt="phone icon" width={20} height={20} src="/phone.png" />
            <span className="text-primary text-sm font-light">Download App</span>
          </div>

          {Object.entries(sections).map(([section, content]) => (
            <div key={section} className="border-b border-t border-[#E5E5E5] py-2">
              <button
                className="flex justify-between items-center w-full text-black text-sm h-[2.4rem]"
                onClick={() => toggleDropdown(section)}
              >
                {section}
                <Image
                  src={openDropdown === section ? "/arrowup-green.png" : "/arrowdown.png"}
                  alt="dropdown arrow"
                  width={16}
                  height={16}
                />
              </button>
              {openDropdown === section && (
  <div className="mt-1 pl-2">
    <p className="text-black font-medium text-sm mb-2">{content.title}</p>
    {content.items.map((item, index) => (
      <Link key={index} href={item.href}>
        <p
          onClick={() => setSidebarOpen(false)}
          className="text-[#007B7B] text-sm font-normal py-1 cursor-pointer"
        >
          {item.label}
        </p>
      </Link>
    ))}
  </div>
)}

            </div>
          ))}

<Link href="/auth/sign-in">
  <div
    onClick={() => setSidebarOpen(false)}
    className="py-4 text-primary border-b border-x-0 text-sm border-[#E5E5E5] border-[1px] border-solid cursor-pointer"
  >
    Become an Agent
  </div>
</Link>

<Link href="/helpcenter">
  <div
    onClick={() => setSidebarOpen(false)}
    className="py-4 text-sm text-gray-600 border-b border-[#E5E5E5] border-solid cursor-pointer"
  >
    Help
  </div>
</Link>

        </div>
      </div>
    </>
  );
};




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
  const hideNavbar = pathname.startsWith("/rent/listing") || /^\/agent\/[^/]+$/.test(pathname)||/^\/rent\/[^/]+$/.test(pathname); // Hide on /agent/[id]
  const hideAuth = pathname.startsWith("/auth");
  const showNavbar = [
    "/listing",
    "/article/article-details",
   
    "/rent/searchlisting",
    "/agent/all-agent",
    "/agent/agent-description",
    "/sell/sell-home"
  ].some(route => pathname.includes(route)) || /^\/agent\/[^/]+$/.test(pathname) ||/^\/rent\/[^/]+$/.test(pathname); // Matches /agent/{id}
  
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
        <nav className={`text-xl z-[999999] hidden font-bricolage  lg:flex fixed top-0 w-full transition-all duration-300 ${scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white mt-3"}`}>
          <div className="flex-1 mx-auto flex w-full items-center justify-around p-2">
            
            {/* Logo */}
            <div className="text-2xl font-bold">
              <Link href="/" className="flex justify-center items-center gap-2">
                <Image
                  alt="logo"
                  width={30}
                  priority
                  quality={100}
                  height={30}
                  src={'/Logo.svg'}
                />
                <h3 className="lg:font-[600] lg:text-[1em] text-lg">
                  Hoydoon
                </h3>
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
                  { name: "Find an agent", path: "/agent" }
                ].map(({ name, path },index) => (
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
              {isAuthenticated? (
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
                  <Button className={`p-1 w-[92px] ${scrolled ? "bg-white text-primary border-primary border-[1px] border-solid" : "bg-transparent bg-primarytransparent text-black"}`}>
                    <Link href="/auth/sign-in" className={`text-base ${scrolled ? "text-primary" : "text-white"}`}>
                      Login
                    </Link>
                  </Button>
                  <button className="font-bricolage h-auto p-1 rounded-full bg-primary flex justify-center items-center text-white hover:bg-primary w-[7.5rem]">
                    <Link href="/auth/sign-up" className="font-light h-[25px] text-base">
                      Register
                    </Link>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:block lg:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes size={24} className="text-black" /> : <FaBars size={24} className="text-black" />}
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
                { name: "Find an agent", path: "/agent" }
              ].map(({ name, path }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className={`block py-2 rounded-full ${
                      pathname === path ? "bg-white text-green-600 font-light" : "text-black"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-center mt-8">
              <Link href="/auth/sign-up" className="bg-primary px-5 py-2 rounded-md font-semibold hover:bg-orange-600">
                Register
              </Link>
            </div>
          </div>
        </nav>
      )}

      {
<MobileNavbar/>
        
      }
    </>
  );
}
