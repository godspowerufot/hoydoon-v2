/* eslint-disable */

"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../common/Button";

export default function ListingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router=useRouter()
const [formData, setFormData] = useState({
    location: "",
  
  });
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      ...(formData.location && { location: formData.location }),
  }).toString();

    router.push(`/rent/searchlisting?${queryParams}`);
  };

  return (
    <>
     
        <nav className="relative z-[9999] w-full  ">
          <div className="2xl:max-w-[1520px] max-w-[1230px] mx-auto flex items-center justify-between py-3 px-5 lg:px-0">
            
            {/* Left: Logo & Search Bar */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/Logo.svg"
                  alt="logo"
                  width={35}
                  height={35}
                  priority
                />
                <h3 className="ml-2 text-lg font-semibold text-black">Hoydoon</h3>
              </Link>
              <div className="relative  w-[20rem]  h-[3rem] hidden border-[#8F8F8F] border-solid border-[1px]  lg:flex items-center bg-gray-100 rounded-[14px] px-2 py-2">
                <input 
                   type="text"
                   name="location"
                   value={formData.location}
                   onChange={handleChange}
                  placeholder="City, Address, State, Zip..."
                  className="bg-transparent  placeholder:fonr-[300] placeholder:font-[1em] lg:pl-2 placeholder:text-[#8F8F8F]  focus:outline-none text-black text-sm w-full"
                />
                <button onClick={handleSearch} className="ml-2 bg-primary text-white p-2 rounded-md">
 <Image
          alt="logo"
          width={20}
          loading="lazy"
          height={10}
          quality={100} // Ensures maximum quality
          src={'/arrow-left.png'}
          style={{ objectFit: 'cover' }}
        />                </button>
              </div>
            </div>

            {/* Center: Navigation Links */}
            <ul className="hidden lg:flex space-x-6 2xl:-mr-[33rem]  -mr-[16rem]  justify-center items-center text-[#8F8F8F] text-[1rem]">
              <li className="flex  gap-2  items-center justify-center"><Link href="/buy" className="hover:text-primary">Buy</Link>  <img src="/arrow-down.png" alt="Back" className="w-3 h-2 mt-1" /></li>
              <li className="flex  gap-2 items-center justify-center"><Link href="/sell" className="hover:text-primary">Sell</Link>  <img src="/arrow-down.png" alt="Back" className="w-3  h-2 mt-1" /></li>
              <li className="flex gap-2 items-center justify-center"><Link href="/agent" className="hover:text-primary">Find an agent</Link>  <img src="/arrow-down.png" alt="Back" className="w-3  h-2 mt-1" />   </li>
            </ul>

            {/* Right: Action Buttons */}
            <div className="hidden lg:flex  justify-center items-center gap-3">
            
         <button className='bg-black      "flex   font-bricolage  rounded-full   flex justify-center items-center  text-white hover:bg-primary p-3  w-[92px] h-[37px] '>
          
          <Link href="/auth/sign-in" className='  text-white text-base'> {/* Reduced width and padding */}
              Login
            </Link></button> 
          <Button  className='w-[7.5rem] p-2 h-[32px] '>
          <Link href="/auth/sign-up"  className='font-light  text-base'> {/* Reduced width and padding */}
            Register
          </Link>
          </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes size={24} className="text-black" /> : <FaBars size={24} className="text-black" />}
              </button>
            </div>
          </div>

          {/* Mobile Sidebar Menu */}
          <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden`}>
            <div className="flex justify-end p-4">
              <button onClick={() => setMenuOpen(false)}>
                <FaTimes size={24} className="text-black" />
              </button>
            </div>
            <ul className="text-black text-lg text-center pt-5">
              <li className="py-3"><Link href="/buy" onClick={() => setMenuOpen(false)}>Buy</Link>          
              </li>
              <li className="py-3"><Link href="/sell" onClick={() => setMenuOpen(false)}>Sell</Link></li>
              <li className="py-3"><Link href="/agent" onClick={() => setMenuOpen(false)}>Find an agent</Link></li>
            </ul>
            <div className="text-center mt-5">
              <Link href="/auth/sign-in" className="block bg-black text-white py-2 px-5 rounded-md my-2">Login</Link>
              <Link href="/auth/sign-up" className="block bg-primary text-white py-2 px-5 rounded-md">Register</Link>
            </div>
          </div>
        </nav>
    
    </>
  );
}
