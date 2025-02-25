'use client'

import React, { useState } from "react";
import GoogleIcon from "../../../public/google.png";
import Button from "@/app/components/common/Button";
import Link from "next/link";
import Input from "@/app/components/common/inputs/input";
import Image from 'next/image';


 const page = () => {
  const [views, setViews] = useState(0);
  return (
    <div className="w-full flex items-center justify-center">
    <div className="flex  gap-[6%] flex-row-reverse w-[90%]  justify-center lg:items-center font-bricolage p-[6%] lg:justify-center py-1 mt-[5%]">
      <div className="p-8 h-[80%] pb-[5%] lg:w-[50%] 2xl:w-[80%] w-[60%]">
      <div className="text-2xl   font-bold">
          <Link href="/" className=' flex items-center  gap-2'>
            <Image
              alt="logo"
              width={50}  
              loading='lazy'
              objectFit='cover'
              height={50} // Reduced size of logo
              src={'/Logo.svg'}
            />
            <h3 className=' text-primary font-bricolage lg:font-[600] lg:text-[1em] lg:text-primary text-lg'>  {/* Reduced text size */}
              Hoydoon
            </h3>
          </Link>
        </div>
        <div className=" w-full h-[1px] bg-[#8F8F8F] mt-[4%]"/>
    
       
          <div className=" mt-6 flex flex-col    ">
            <h3 className="font-bricolage  text-center text-[#1E1E1E] text-3xl lg:text-4xl font-semibold mb-2">
            Create an Account
            </h3>
            <h4 className="font-bricolage text-center  text-base text-[#8F8F8F] mb-6 lg:mb-12">
            Sign up to create an account
            </h4>
            <div className="flex flex-col">
      
              <div className="w-full font-bricolage">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Email address*"
                  className="mb-4  rounded-full"
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Password*"
                  className="mb-4 rounded-full "
                />

                <p className="font-bricolage   text-[12px] text-[#8F8F8F] ">It must be a combination of 8 words, letters,  numbers, symbols</p>
                <div className="w-full flex justify-between items-center  my-4">
                  <label
                    id="rememberme"
                    className="flex items-center text-grey-700  cursor-pointer"
                  >
                    <input
                      name="rememberme"
                      type="checkbox"
                      className="mr-2 rounded-lg h-[20px] w-[25px]  cursor-pointer"
                    />
                    Remember me
                  </label>
                  <button className="text-primary hover:text-primary-700">
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button className="py-4 my-5 text-[1.3em] w-full"> sign up </Button>
              <div className=" w-full h-[0.8px] bg-[#b1b1b1] my-[3%]"/>

            </div>
          </div>
  

        <p className="text-black w-full text-end  font-[600] mt-2 text-base">
        Or sign up with:    </p>
          <div className="w-full flex gap-3 mt-[4%] mb-[5%]">
<span className="w-[10em] gap-3 h-[2.5em] p-1 rounded-full border-gray border-solid border-[1px]   flex items-center text-black font-[500] text-[1.2em] justify-center ">  <Image
              alt="logo"
              width={20}  
              loading='lazy'
              objectFit='cover'
              height={20} // Reduced size of logo
              src={'/google.png'}
            /> Google</span>
<span className="w-[10em] gap-3 h-[2.5em] p-1 rounded-full border-gray border-solid border-[1px]   flex items-center text-black font-[500] text-[1.2em] justify-center ">  <Image
              alt="logo"
              width={20}  
              loading='lazy'
              objectFit='cover'
              height={20} // Reduced size of logo
              src={'/apple.png'}
            /> Apple</span>
<span className="w-[10em] gap-3 h-[2.5em] p-1 rounded-full border-gray border-solid border-[1px]   flex items-center text-black font-[500] text-[1.2em] justify-center ">  <Image
              alt="logo"
              width={20}  
              loading='lazy'
              objectFit='cover'
              height={20} // Reduced size of logo
              src={'/facebook.png'}
            /> Facebook</span>
          </div>
    
        <div className=" w-full h-[0.8px] bg-[#b1b1b1]  my-[4%] "/>


        <p className="text-black w-full text-end  font-[600] mt-[3%] text-base">
        No account yet? <Link href="/auth/sign-in" className="text-primary text-[1.3em] font-bricolage">  Log In  </Link>  </p>

      </div>
   
   <img src="/authBanner.png" alt="banner" className="w-[56%] hidden lg:block h-[48em] 2xl:h-[52em] lg:rounded-[10px]" />
    </div>
    </div>
  );
};

export default page;