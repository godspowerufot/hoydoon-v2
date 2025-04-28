"use client";  // Add this at the top to make it a client-side component

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function CustomAuthButtons() {
  return (
    <div className="flex gap-2">
      {/* Apple Login Button */}
      <span
        onClick={() => signIn("apple")}  // Trigger Apple sign-in
        className="w-[9em] gap-3 h-[2.5em]  2xl:text-[1.em] rounded-full p-3  2xl:h-[3em] 2xl:p-4 border-gray border-solid border-[1px] flex items-center text-black font-[500] text-[1em] justify-center cursor-pointer"
      >
        <Image
          alt="Apple logo"
          width={20}
          height={20}  // Reduced size of logo
          src="/apple.png"
          loading="lazy"
          objectFit="cover"
        />
        Apple
      </span>

      {/* Facebook Login Button */}
      <span
        onClick={() => signIn("facebook")}  // Trigger Facebook sign-in
        className="w-[9em] gap-3 h-[2.5em]  2xl:text-[1.em] rounded-full p-3  2xl:h-[3em] 2xl:p-4 border-gray border-solid border-[1px] flex items-center text-black font-[500] text-[1em] justify-center cursor-pointer"
      >
        <Image
          alt="Facebook logo"
          width={20}
          height={20}  // Reduced size of logo
          src="/facebook.png"
          loading="lazy"
          objectFit="cover"
        />
        Facebook
      </span>
    </div>
  );
}
