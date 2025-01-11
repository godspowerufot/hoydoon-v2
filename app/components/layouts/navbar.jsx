'use client';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../common/Button';
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const isActive = (path) => router.prefetch === path;

  return (
    <header className="text-xl z-10 relative   bg-white lg:bg-transparent font-bricolage text-white">
      <div className="flex-1 mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className='flex justify-center items-center gap-2'>
            <Image
              alt="logo"
              width={40}  
              loading='lazy'
              objectFit='cover'
              height={40} // Reduced size of logo
              src={'/logo.svg'}
            />
            <h3 className=' text-black lg:text-white text-lg'>  {/* Reduced text size */}
              Hoydoon
            </h3>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="pr-5 text-lg sm:hidden max-md:hidden lg:flex hidden  md:hidden rounded-full  lg:h-[54px] space-x-7 lg:gap-3 bg-primarytransparent text-white">
          <ul className="lg:flex items-center space-x-5">
            <li>
              <div className={`px-7  py-3 rounded-full ${isActive('/') ? 'bg-white  lg:w-[95px] lg:h-[47px] text-primary' : 'bg-white hover:text-primary'}`}>
                <Link href="/" className='text-primary'>Home</Link>
              </div>
            </li>
            <li>
              <div className={`px-4 py-1 rounded-full ${isActive('/about') ? 'bg-white text-primary' : 'hover:bg-white hover:text-primary'}`}>
                <Link href="/about">Buy</Link>
              </div>
            </li>
            <li>
              <div className={`px-4 py-1 rounded-full ${isActive('/services') ? 'bg-white text-primary' : 'hover:bg-white hover:text-primary'}`}>
                <Link href="/services">Rent</Link>
              </div>
            </li>
            <li>
              <div className={`px-4 py-1 rounded-full ${isActive('/sell') ? 'bg-white text-primary' : 'hover:bg-white hover:text-primary'}`}>
                <Link href="/sell">Sell</Link>
              </div>
            </li>
            <li>
              <div className={`px-4 py-1 rounded-full ${isActive('/agent') ? 'bg-white text-primary' : 'hover:bg-white hover:text-primary'}`}>
                <Link href="/agent">Find an agent</Link>
              </div>
            </li>
          </ul>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex md:hidden lg:gap-4  mr-3">
        <Button className='bg-primarytransparent h-[54px] bg-transparent'>
          
        <Link href="/login"> {/* Reduced width and padding */}
            Login
          </Link></Button>  
          <Button >
          <Link href="/register" > {/* Reduced width and padding */}
            Register
          </Link>
          </Button>
         
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:block lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24}  className='text-black'/> : <FaBars size={24}  className='text-black'/>} {/* Reduced icon size */}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0  bg-white right-0 h-full bg-gray-800 text-black w-64 z-50 transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <FaTimes size={24}  className='text-black'/> {/* Reduced icon size */}
          </button>
        </div>
        <ul className="space-y-6 text-center pt-8 p-4 "> {/* Reduced padding */}
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/about" onClick={() => setMenuOpen(false)}>Buy</Link></li>
          <li><Link href="/services" onClick={() => setMenuOpen(false)}>Rent</Link></li>
          <li><Link href="/sell" onClick={() => setMenuOpen(false)}>Sell</Link></li>
          <li><Link href="/agent" onClick={() => setMenuOpen(false)}>Find an agent</Link></li>
        </ul>
        <div className="text-center mt-8"> {/* Reduced margin */}
          <Link href="/register" className="bg-primary px-5 py-2 rounded-md font-semibold hover:bg-orange-600"> {/* Reduced padding */}
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
