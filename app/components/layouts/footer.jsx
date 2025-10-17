"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
const Appfooter = () => {
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/auth");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        toast.success(data.message || "success");
        setEmail("");
      } else {
        setStatus("error");
        toast.error(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      toast.error("Subscription failed. Please try again.");
    }
  };
  return (
    <>
      {!hideNavbar && (
        <footer className="bg-primary font-bricolage lg:max-md:h-[42vh]  w-screen px-4 lg:p-0  text-white flex flex-col justify-center  items-center lg:mt-[5rem]">
          <div className="lg:max-w-[1240px] space-y-8  mt-[2rem] lg:px-0   lg:py-16 sm:px-6 lg:space-y-16 ">
            {/* Top Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Subscribe Section */}
              <div>
                <div className="flex flex-col  items-start  w-[50em] lg:w-0">
                  <h1 className="text-white font-bricolage lg:ml-2 text-[24px] lg:text-3xl 2xl:text-4xl lg:font-[600] lg:w-[25rem]">
                    Subscribe to our Newsletter
                  </h1>
                  <form
                    onSubmit={handleSubscribe}
                    className="flex items-center py-2 lg:w-[460px]  max-md:w-[35%] h-[43px] lg:h-[60px] rounded-[50px] border border-[#F9FAFB] pl-3 pr-1 mt-4"
                  >
                    <input
                      type="email"
                      placeholder="Enter your mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow bg-transparent outline-none font-[300]  placeholder:max-md:text-[14px] text-white placeholder-[#F9FAFB]  text-[16px] lg:text-base"
                      required
                    />
                    <button
                      type="submit"
                      className="ml-2 lg:w-[11em] lg:h-[3.2em]  text-sm  lg:text-base flex items-center justify-center h-[2.3rem] p-4 lg:p-0 max-md:ml-[-3.9rem]  bg-white text-black font-medium rounded-full px-4"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Subscribing..." : "Subscribe"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Links Section */}
              <div className="grid w-full md:w-10/12 lg:w-8/10 lg:ml-auto grid-cols-3 sm:grid-cols-3  lg:grid-cols-5 lg:gap-8 lg:col-span-2">
                {/* Explore Links */}
                <div>
                  <p className="font-medium text-[#F9FAFB]">Explore</p>
                  <ul className="mt-[0.8em] lg:mt-[4px]  space-y-2  text-[#F4F4F4] text-[12px] lg:text-sm">
                    <li>
                      <a href="" className="transition hover:opacity-75">
                        Home
                      </a>
                    </li>
                    {/* <li>
                      <a href="" className="transition hover:opacity-75">
                        Services
                      </a>
                    </li> */}
                    {/* <li>
                        <a href="" className="transition hover:opacity-75">
                          Project
                        </a>
                      </li> */}
                    <li>
                      <a href="/about" className="transition hover:opacity-75">
                        About us
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Social Links */}
                <div>
                  <p className="font-medium text-[#F9FAFB]">Social</p>
                  <ul className="lg:mt-[4px]  mt-3 space-y-2   text-[#F4F4F4] text-[12px] lg:text-sm">
                    <li>
                      <a
                        href=" https://www.linkedin.com/company/hoydoon/about/?viewAsMember=true "
                        className="transition hover:opacity-75"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://x.com/hoydoon_?s=11&t=nIieHzDuZ8BAPHDnr6Ikcw"
                        className="transition hover:opacity-75"
                      >
                        Twitter X
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/hoydoon/"
                        className="transition hover:opacity-75"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:devteam@quorvixconsulting.com"
                        className="transition hover:opacity-75"
                      >
                        Email
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Location */}
                <div>
                  <p className="font-medium text-[#F9FAFB]">Location</p>
                  <ul className="mt-1 lg:mt-[4px] space-y-2   text-[#F4F4F4] text-[12px] lg:text-sm">
                    <li>
                      <a href="#" className="transition  hover:opacity-75">
                        5, Elshadai Street, Erunwen
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="transition hover:opacity-75"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/helpcenter"
                        className="transition hover:opacity-75"
                      >
                        Help Center
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Legal Links */}
                <div className="hidden lg:block">
                  <p className="font-medium text-[#F9FAFB]">Legal</p>
                  <ul className=" mt-1 lg:mt-[4px] space-y-2 text-sm">
                    <li>
                      <a href="#" className="transition hover:opacity-75">
                        Terms of use
                      </a>
                    </li>
                    <li>
                      <a href="" className="transition hover:opacity-75">
                        Privacy policy
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="hidden lg:block">
                  <p className="font-medium text-[#F9FAFB]">Mobile App</p>
                  <ul className="mt-1 lg:mt-[4px] space-y-2 text-sm">
                    <li>
                      <Image
                        src="/app1.svg" // Use a high-quality image
                        alt="Hero section"
                        width={100}
                        height={200}
                        quality={100} // Ensures maximum quality
                        priority // Loads image faster
                      />
                    </li>
                    <li>
                      <Image
                        src="/app2.svg" // Use a high-quality image
                        alt="Hero section"
                        width={100}
                        height={200}
                        quality={100} // Ensures maximum quality
                        priority // Loads image faster
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className=" w-full h-[1px] bg-white lg:mt-[2%]" />

            {/* Bottom Section */}
            <div className="flex flex-col-reverse lg:flex-row  w-[100%]  justify-end lg:justify-between items-center gap-4  text-base">
              <p className="text-center font-[300] hidden lg:block">
                &copy; 2025. Company Name. All rights reserved.
              </p>
              <div className="flex flex-row gap-4 lg:mr-[1em]  ml-[3rem]  mt-[-1rem] lg:mt-0 lg:ml-0 text-sm lg:text-base mb-4 lg:mb-0">
                <p className="cursor-pointer hover:underline">
                  Terms and conditions
                </p>
                <p className="cursor-pointer hover:underline">Privacy policy</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Appfooter;
