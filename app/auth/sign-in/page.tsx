'use client'

import React from "react";
import Button from "@/app/components/common/Button";
import Link from "next/link";
import Input from "@/app/components/common/inputs/input";
import Image from 'next/image';

const page = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex gap-[6%] flex-row-reverse w-[90%] justify-center font-bricolage px-[8%] my-[2%] 2xl:my-[4%] py-1">
        <div className="h-[35%] w-[70%] 2xl:w-[45%]">
          <div className="text-xl font-bold">
            <Link href="/" className='flex items-center gap-2'>
              <Image
                alt="logo"
                width={50}  
                objectFit='cover'
                quality={100}
                height={50}
                priority
                className="w-[6em] h-[2em]"
                src={'/logo2.svg'}
              />
          
            </Link>
          </div>
          <div className="w-full h-[1px] bg-[#8F8F8F] mt-[2%]"/>
          <div className="mt-3 flex flex-col">
            <h3 className="font-bricolage text-center text-[#1E1E1E] text-2xl lg:text-[1.8em] font-semibold mb-2">
              Welcome Back
            </h3>
            <h4 className="font-bricolage  mt-2 text-center text-sm text-[#8F8F8F] mb-3 lg:mb-3">
              Please log in to continue
            </h4>
            <div className="flex flex-col">
              <div className="w-full font-bricolage">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Email address*"
                  className="mb-2 placeholder:px-3 placeholder:font-[18px] rounded-full border-[#d6d5d5] border-[0.7px] border-solid "
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Password*"
                  className="mb-2 placeholder:px-3 placeholder:font-[18px] rounded-full border-[#d6d5d5] border-[0.7px] border-solid "
                />
                <p className="font-bricolage text-[12px] mt-2 text-[#8F8F8F]">It must be a combination of 8 words, letters, numbers, symbols</p>
                <div className="w-full flex justify-between items-center my-3">
                  <label className="flex items-center text-[#000000] font-[300] cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 rounded-lg h-[18px] w-[22px] cursor-pointer"
                    />
                    Remember me
                  </label>
                  <button className="text-primary hover:text-primary-700">
                    Forgot password?
                  </button>
                </div>
              </div>
              <Button className="py-2 my-3 text-[1em] w-full">Log in</Button>
              <div className="w-full h-[0.8px] bg-[#b1b1b1] my-[3%]"/>
            </div>
          </div>
          <p className="text-black w-full text-end font-[600] mt-2 text-sm">
            Or log in with:
          </p>
          <div className="w-full flex gap-3 mt-[4%] mb-[5%]">
            <span className="w-[8em] gap-2 h-[2.2em] p-1 rounded-full border-gray border-solid border-[1px] flex items-center text-black font-[500] text-[1em] justify-center">
              <Image alt="logo" width={18} height={18} src={'/google.png'} /> Google
            </span>
            <span className="w-[8em] gap-2 h-[2.2em] p-1 rounded-full border-gray border-solid border-[1px] flex items-center text-black font-[500] text-[1em] justify-center">
              <Image alt="logo" width={18} height={18} src={'/apple.png'} /> Apple
            </span>
            <span className="w-[8em] gap-2 h-[2.2em] p-1 rounded-full border-gray border-solid border-[1px] flex items-center text-black font-[500] text-[1em] justify-center">
              <Image alt="logo" width={18} height={18} src={'/facebook.png'} /> Facebook
            </span>
          </div>
          <div className="w-full h-[0.8px] bg-[#b1b1b1] my-[2%]"/>
          <p className="text-black w-full text-end font-[600] mt-[3%] text-sm">
            No account yet? <Link href="/auth/sign-up" className="text-primary text-[1em] font-bricolage"> Sign Up </Link>
          </p>
        </div>
        <Image quality={100} src="/authBanner.png" alt="banner" width={500} height={450} className="w-[90%] 2xl:w-[50%] hidden lg:block h-[37em] 2xl:h-[40em] lg:rounded-[10px]" />
      </div>
    </div>
  );
};

export default page;
