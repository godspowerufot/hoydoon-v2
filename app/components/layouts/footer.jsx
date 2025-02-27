'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
const Appfooter = () => {
  const [email, setEmail] = useState('');
 const pathname=usePathname()
  const hideNavbar = pathname.startsWith("/auth");

  return (

    <>
    {!hideNavbar &&
    <footer className="bg-primary font-bricolage w-full  text-white flex flex-col justify-center items-center mt-[4%]">
      <div className="w-full 2xl:flex 2xl:items-center 2xl:flex-col 2xl:justify-center space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Subscribe Section */}
          <div>
            <div className="flex flex-col items-start">
              <h1 className="text-white font-bricolage lg:ml-2 text-[24px] lg:text-[32px] font-[600] w-full">
                Subscribe to our Newsletter
              </h1>
              <div className="flex items-center py-2 lg:w-[460px] w-full h-[60px] rounded-[50px] border border-[#F9FAFB] pl-3 pr-1 mt-4">
                <input
                  type="email"
                  placeholder="Enter your mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-transparent outline-none text-white placeholder-[#F9FAFB] text-base"
                />
                <button className="ml-2 lg:w-[11em] lg:h-[3.2em] p-4 lg:p-0 bg-white text-black font-medium rounded-full px-4">
                   Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid w-full md:w-10/12 lg:w-8/10 lg:ml-auto grid-cols-3 sm:grid-cols-3  lg:grid-cols-5 lg:gap-8 lg:col-span-2">
            {/* Explore Links */}
            <div>
              <p className="font-medium text-[#F9FAFB]">Explore</p>
              <ul className="mt-1 lg:mt-6 space-y-2 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Project
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    About us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <p className="font-medium text-[#F9FAFB]">Social</p>
              <ul className="lg:mt-6  mt-1 space-y-2 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Twitter X
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Email
                  </a>
                </li>
              </ul>
            </div>
 {/* Location */}
 <div>
              <p className="font-medium text-[#F9FAFB]">Location</p>
              <ul className="mt-1 lg:mt-6 space-y-2 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    123, Yorkshire Lane, New York, USA
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    +234 813 2254
                  </a>
                </li>
              </ul>
            </div>
            {/* Legal Links */}
            <div className='hidden lg:block'>
              <p className="font-medium text-[#F9FAFB]">Legal</p>
              <ul className=" mt-1 lg:mt-6 space-y-2 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Terms of use
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>

           
            <div>
              <p className="font-medium text-[#F9FAFB]">Mobile App</p>
              <ul className="mt-1 lg:mt-6 space-y-2 text-sm">
                <li>
                   <Image
                              alt="logo"
                              width={60}  
                              loading='lazy'
                              objectFit='cover'
                              height={60} // Reduced size of logo
                              src={'/app1.png'}
                            />
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    +234 813 2254
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col-reverse lg:flex-row  w-screen justify-between items-center gap-4 2xl:px-[8%] text-base">
          <p className="text-center font-[300]">&copy; 2022. Company Name. All rights reserved.</p>
          <div className="flex flex-row gap-4 lg:mr-[5em]">
            <p className="cursor-pointer hover:underline">Terms and conditions</p>
            <p className="cursor-pointer hover:underline">Privacy policy</p>
          </div>
        </div>
      </div>
    </footer>}</>
  );
};

export default Appfooter;
