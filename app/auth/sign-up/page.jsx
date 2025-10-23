// ============================================
// Updated Signup component with Google Auth Loading
// ============================================

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Input from "@/app/components/common/inputs/input";
import Button from "@/app/components/common/Button";
import {
  useSignupMutation,
  useGoogleAuthMutation,
} from "@/store/slices/api/authapi";
import { useRouter } from "next/navigation";
import LoginButtons from "@/app/components/common/googlebutton";
import { sendDeviceInfo } from "@/utils/lib/devicinfo";
import { log } from "@/utils/log";
import { setUnverifiedEmail } from "@/store/slices/authslice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MobileSignIn } from "../sign-in/mobile";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullname, setfullname] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { isLoading }] = useSignupMutation();
  const [googleAuth, { isLoading: isGoogleLoading }] = useGoogleAuthMutation();
  const [errormessage, seterror] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const dispatch = useDispatch();
  const role = "buyer";

  const router = useRouter();
  let errorMessage;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      return;
    }

    try {
      const { region, ...device } = await sendDeviceInfo();
      // Send login request with device info

      const res = await signup({
        fullname,
        email,
        password,
        role,
        device,
        region,
      }).unwrap();
      dispatch(setUnverifiedEmail(email));

      console.log("Signup successful:", res);
      toast.success("check your email for OTP code");
      router.push("/auth/sign-up/verification");
    } catch (err) {
      // Check for 409 status code (conflict - email already exists)
      if (err?.status === 409) {
        errorMessage = "This email has already been taken";
      } else {
        // Otherwise use the error message from response
        errorMessage =
          err?.error || err?.data?.error || err?.message || "Sign up failed";
      }
      toast.error(errorMessage || "Sign up failed");
      seterror(err?.error);
      console.error("Login failed:", errorMessage);
    }
  };

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen lg:-mt-[3em] 2xl:mt-0 ">
        {/* Left Side - Image */}
        <div className="flex-1 flex items-center justify-end pr-[0.3em] 2xl:pr-[2em]">
          <div className="relative">
            <Image
              alt="authBanner"
              width={600}
              height={750}
              loading="lazy"
              quality={100}
              src={"/signup.jpg"}
              className="rounded-[24px] w-[480px] h-[600px] lg:w-[800px] lg:h-[650px] xl:w-[580px] xl:h-[720px] 2xl:w-[800px] 2xl:h-[770px] object-cover  brightness-75"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-start pt-[5em] pl-12 xl:pl-16 2xl:pl-10">
          <div className="w-full max-w-[420px] xl:max-w-[460px] 2xl:max-w-[500px]">
            {/* Logo */}
            <div className="mb-3">
              <Link href="/" className="inline-block">
                <Image
                  alt="logo"
                  width={180}
                  height={60}
                  priority
                  quality={100}
                  src={"/newlogo.svg"}
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <div className="w-full  my-2 h-[1px] bg-[#D9D9D9] " />
            </div>

            {/* Welcome Section */}
            <div className="mb-8 flex justify-center flex-col items-center">
              <h1 className="text-[32px] xl:text-[36px] 2xl:text-[40px] font-medium text-gray-900 mb-2 leading-tight">
                Create an Account
              </h1>
              <p className="font-light text-gray xl:text-lg ">
                Sign up to create an account
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
                  placeholder="Enter email address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-base placeholder-gray-400"
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
                    placeholder="Enter password*"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      const passwordRegex =
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                      setIsPasswordValid(passwordRegex.test(e.target.value));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-base placeholder-gray-400 pr-12"
                  />
                </div>

                {!isPasswordValid && (
                  <p className="text-xs text-gray mt-1 font-light">
                    It must be a combination of 8 words, letters, numbers,
                    symbols
                  </p>
                )}
              </div>

              {/* Username Field */}
              <div>
                <label className="block text-lg font-light text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter username*"
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-base placeholder-gray-400 pr-12"
                  />
                </div>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center mb-6">
              <label className="flex items-center text-sm xl:text-base text-gray-700 font-light cursor-pointer">
                <input
                  name="rememberme"
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded cursor-pointer"
                />
                Remember me
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || isGoogleLoading}
              className="w-full bg-primary rounded-full text-white font-semibold py-3 px-4 text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-5"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="w-full  my-2 h-[1px] bg-[#D9D9D9] " />

            {/* Or sign up with */}
            <div className="text-right my-4">
              <p className="text-gray-700 text-sm font-normal">
                {" "}
                Or sign up with:
              </p>
            </div>

            {/* Social Login Buttons - Pass props */}
            <div className="flex gap-3 mb-8">
              <LoginButtons
                googleAuth={googleAuth}
                isGoogleLoading={isGoogleLoading}
              />

              <button
                onClick={() => signIn("apple")}
                disabled={isLoading || isGoogleLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray rounded-full hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isLoading || isGoogleLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray rounded-full hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Login Link */}
            <div className="text-right mt-4">
              <p className="text-gray-700 text-sm">
                {" "}
                Already have an account?{" "}
                <Link
                  href="/auth/sign-in"
                  className="text-primary text-lg font-normal"
                >
                  Log In
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
