'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '../common/Button';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname=usePathname()
  const hideNavbar = pathname.startsWith("/auth");

  const isActive = (path) => router.prefetch === path;

  return (
<>
    {!hideNavbar &&
    
    <nav className="text-xl z-[999999]     relative  mt-3  w-full bg-white lg:bg-transparent font-bricolage text-white">
      <div className="flex-1 mx-auto flex  2xl:w-[100rem] items-center justify-around p-2">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className='flex justify-center items-center gap-2'>
            <Image
              alt="logo"
              width={30}  
              priority
              quality={100}
              objectFit='cover'
              height={30} // Reduced size of logo
              src={'/Logo.svg'}
            />
            <h3 className=' text-black lg:font-[600] lg:text-[1em] lg:text-white text-lg'>  {/* Reduced text size */}
              Hoydoon
            </h3>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="pr-5 ml-[6%]  w-fit text-lg sm:hidden max-md:hidden lg:flex   items-center justify-center hidden  md:hidden rounded-full  lg:h-[50px] space-x-7 lg:gap-3 bg-primarytransparent text-white">
          <ul className="lg:flex items-center  space-x-5 font-[300] ">
            <li>
              <div className={`px-7  lg:text-xl py-3 font-bricolage rounded-full ${isActive('/') ? 'bg-white  lg:w-[95px] lg:h-[30px] text-primary' : 'bg-white hover:text-primary'}`}>
                <Link href="/" className='text-primary  text-[1em]'>Home</Link>
              </div>
            </li>
            <li>
              <div className={`px-4 py-1   lg:text-xl rounded-full `}>
                <Link href="/buy">Buy</Link>
              </div>
            </li>
            <li>
              <div className={`px-4 py-1   lg:text-xl rounded-full `}>
                <Link href="/rent">Rent</Link>
              </div>
            </li>
            <li>
              <div className={`px-4 py-1   lg:text-xl rounded-full `}>
                <Link href="/sell">Sell</Link>
              </div>
            </li>
            <li>
              <div className={`px-4 py-1   lg:text-xl rounded-full `}>
                <Link href="/agent text-[1em]">Find an agent</Link>
              </div>
            </li>
          </ul>
        </div>

         {/* Desktop Action Buttons */}
         <div className='flex gap-4'>

       
         <Button className='bg-primarytransparent  w-[92px] h-[40px] bg-transparent'>
          
          <Link href="/auth/sign-in" className=' text-xl'> {/* Reduced width and padding */}
              Login
            </Link></Button> 
          <Button  className='w-[7.5rem] h-[2.5rem] '>
          <Link href="/auth/sign-up"  className='font-light  text-xl'> {/* Reduced width and padding */}
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
          <li><Link href="/buy" onClick={() => setMenuOpen(false)}>Buy</Link></li>
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
    </nav>}
    </>
  );
}
