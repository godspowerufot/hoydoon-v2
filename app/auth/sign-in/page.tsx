/* eslint-disable */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Input from "@/app/components/common/inputs/input";
import Button from "@/app/components/common/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useSignupMutation,
} from "@/store/slices/api/authapi";
import { sendDeviceInfo } from "../../../utils/lib/devicinfo";
import { log } from "@/utils/log";
import LoginButtons from "@/app/components/common/googlebutton";
import { setUnverifiedEmail } from "@/store/slices/authslice";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { MobileSignIn } from "./mobile";
import { FaLink } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      return;
    }

    try {
      const device = await sendDeviceInfo();

      // Destructure to exclude region
      const { region, ...deviceWithoutRegion } = device;
      log("Device info:", region);
      // Send login request with device info (without region)
      await login({ email, password, device: deviceWithoutRegion }).unwrap();

      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.data?.error);

      // inside handleSubmit
      if (err?.data?.error === "account is not active") {
        toast.error(
          "Your account is not active. Please verify your email address."
        );
        dispatch(setUnverifiedEmail(email));
        router.push("/auth/sign-up/verification");
      }
    }
  };

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen ">
        {/* Left Side - Image */}
        <div className="flex-1 flex items-center justify-end pr-12 xl:pr-16 2xl:pr-20">
          <div className="relative">
            <Image
              alt="authBanner"
              width={600}
              height={750}
              loading="lazy"
              quality={100}
              src={"/authBanner.png"}
              className="rounded-[24px] w-[480px] h-[600px] lg:w-[750px] lg:h-[650px] xl:w-[580px] xl:h-[720px] 2xl:w-[750px] 2xl:h-[770px] object-cover "
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-start pl-12 xl:pl-16 2xl:pl-20">
          <div className="w-full max-w-[420px] xl:max-w-[460px] 2xl:max-w-[500px]">
            {/* Logo */}
            <div className="mb-5">
              <Link href="/" className="inline-block">
                <Image
                  alt="logo"
                  width={180}
                  height={60}
                  priority
                  quality={100}
                  src={"/logo2.svg"}
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <div className="w-full  my-2 h-[1px] bg-[#D9D9D9] " />
            </div>

            {/* Welcome Section */}
            <div className="mb-8 flex justify-center flex-col items-center">
              <h1 className="text-[32px] xl:text-[36px] 2xl:text-[40px] font-medium text-gray-900 mb-2 leading-tight">
                Welcome Back
              </h1>
              <p className="font-light text-gray xl:text-lg ">
                Please log in to continue
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5 mb-6">
              {/* Email Field */}
              <div>
                <label className="block text-lg font-light text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter Email Address "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg   outline-none text-base placeholder-gray-400"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-lg font-light text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Enter Password "
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      const passwordRegex =
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                      setIsPasswordValid(passwordRegex.test(e.target.value));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2  outline-none text-base placeholder-gray-400 pr-12"
                  />
                </div>

                {!isPasswordValid && (
                  <p className="text-xs text-gray mt-1 font-light">
                    It must be a combination of 8 words, letters, numbers,
                    symbols
                  </p>
                )}
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm xl:text-base text-gray-700 font-light cursor-pointer">
                <input
                  name="rememberme"
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded cursor-pointer"
                />
                Remember me
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-lg text-primary  font-normal"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-primary rounded-full text-white font-semibold py-3 px-4 text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-5"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>

            <div className="w-full  my-2 h-[1px] bg-[#D9D9D9] " />

            {/* Or Log in with */}
            <div className="text-right my-4">
              <p className="text-gray-700 text-sm font-normal">
                Or Log in with:
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-3 mb-8">
              <LoginButtons />

              <button
                onClick={() => signIn("apple")}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray rounded-full hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                <Image
                  alt="Apple"
                  width={18}
                  height={18}
                  src="/apple.png"
                  className="object-contain"
                />
                Apple
              </button>

              <button
                onClick={() => signIn("facebook")}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray rounded-full hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                <Image
                  alt="Facebook"
                  width={18}
                  height={18}
                  src="/facebook.png"
                  className="object-contain"
                />
                Facebook
              </button>
            </div>
            <div className="w-full  my-2 h-[1px] bg-[#D9D9D9] " />

            {/* Sign Up Link */}
            <div className="text-right mt-4">
              <p className="text-gray-700 text-sm">
                No account yet?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-primary text-lg font-normal"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Component */}
      <MobileSignIn />
    </>
  );
};

export default Signup;
