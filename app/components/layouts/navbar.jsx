'use client';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '../common/Button';
import { FaBars, FaTimes } from 'react-icons/fa';
import ListingNavbar from './listingnavbar';
import HelpCenterNavbar from './Helpnavbar';
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const hideNavbar = pathname.startsWith("/rent/listing");
  const hideAuth = pathname.startsWith("/auth");
  const showNavbar = ["/listing", "/article/article-details","/rent/searchlisting", "/agent/all-agent", "/agent/agent-description", "/sell/sell-home"].some(route =>
    pathname.includes(route)
  );
  const helpcenter=pathname.startsWith("/helpcenter");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); 
  if (showNavbar) {
    return <ListingNavbar />;
  }

  if(helpcenter){
    return <HelpCenterNavbar />;
  }
  return (
    <>
      {!hideNavbar && !hideAuth && (
        <nav className={`text-xl z-[999999]  font-bricolage fixed top-0 w-full  transition-all duration-300 ${scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white  mt-3 "} `}>
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
                <h3 className=" lg:font-[600] lg:text-[1em] text-lg">
                  Hoydoon
                </h3>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className=" ml-[4.5rem] w-[30rem] text-lg sm:hidden max-md:hidden lg:flex items-center justify-center hidden md:hidden rounded-full lg:h-[37px] space-x-7 lg:gap-3 bg-primarytransparent text-white">
              <ul className="lg:flex items-center space-x-5 font-[300]">
                {[
                  { name: "Home", path: "/" },
                  { name: "Buy", path: "/buy" },
                  { name: "Rent", path: "/rent" },
                  { name: "Sell", path: "/sell" },
                  { name: "Find an agent", path: "/agent" }
                ].map(({ name, path }) => (
                  <li key={path}>
                    <div
                      className={`px-4 py-2 lg:text-base rounded-full ${
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

            {/* Desktop Action Buttons */}
            <div className="flex gap-2">
              <Button className={` p-1 w-[92px]   ${scrolled ?  "bg-white text-primary  border-primary border-[1px] border-solid" :"bg-transparent bg-primarytransparent text-black" }}`}>
                <Link href="/auth/sign-in" className={`text-base  ${scrolled ? "text-primary " : "text-white  "}`}>
                  Login
                </Link>
              </Button>
              <button className=" font-bricolage   h-auto p-1 rounded-full bg-primary  flex justify-center items-center  text-white hover:bg-primary w-[7.5rem] ">
                <Link href="/auth/sign-up" className="font-light h-[25px] text-base">
                  Register
                </Link>
              </button>
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
              <Link href="/register" className="bg-primary px-5 py-2 rounded-md font-semibold hover:bg-orange-600">
                Register
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
