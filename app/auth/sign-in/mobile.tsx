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

export const MobileSignIn = () => {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setfullname] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [login, { isLoading }] = useLoginMutation();
  const [signup] = useSignupMutation();

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

  const role = "buyer";

  const handleSignup = async (e: any) => {
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
      toast.success("check your email for OTP code");
      router.push("/auth/sign-up/verification");
    } catch (err: any) {
      toast.error(err?.data?.error);
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex flex-col  lg:hidden items-center  justify-start w-full min-h-screen px-5 py-2 font-bricolage">
      {/* Logo */}
      <div className="w-full flex justify-between items-center mb-3">
        <Link href={"/"}>
          <Image src="/mobilelog.png" alt="logo" width={40} height={40} />
        </Link>
        <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
          <Image src="/close.svg" alt="close icon" width={20} height={20} />
        </div>
      </div>

      {/* Header */}
      <h1 className="text-2xl  mt-[18px] font-semibold text-center text-black">
        Welcome to Hoydoon
      </h1>

      {/* Tabs */}
      <div className="mt-5 mb-4 w-full flex justify-start border-b border-b-[#8F8F8F]">
        <button
          onClick={() => setTab("login")}
          className={`px-4 py-2 text-base font-[400 ] ${
            tab === "login"
              ? "border-b-2 border-primary text-[#1E1E1E99]"
              : "text-[#1E1E1E99]"
          }`}
        >
          Log In
        </button>
        <button
          onClick={() => setTab("signup")}
          className={`px-4 py-2 text-base font-[400] ${
            tab === "signup"
              ? "border-b-2 border-primary text-[#1E1E1E99]"
              : "text-[#1E1E1E99]"
          }`}
        >
          New Account
        </button>
      </div>

      {/* Form */}
      <div className="w-full  mt-4 flex flex-col gap-5">
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            const passwordRegex =
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            setIsPasswordValid(passwordRegex.test(e.target.value));
          }}
        />

        {!isPasswordValid && (
          <p className="text-xs -mt-2 text-[#1E1E1E99]">
            Must include 8 characters, numbers, and symbols
          </p>
        )}

        {tab === "signup" && (
          <Input
            label="fullname"
            type="text"
            placeholder="Enter fullname"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
          />
        )}
        <div className="mt- 5">
          <Button
            type="submit"
            onClick={tab === "login" ? handleSubmit : handleSignup}
            disabled={isLoading}
            className="w-full rounded-md"
          >
            {isLoading
              ? tab === "signup"
                ? "Signing up..."
                : "Logging in..."
              : tab === "signup"
              ? "Sign Up"
              : "Log In"}
          </Button>
        </div>
        {tab === "login" && (
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary text-center"
          >
            Forgot your password?
          </Link>
        )}
        {tab === "signup" && (
          <span className="text-sm text-[#1E1E1E99] text-center">
            By submitting, I accept Hoydoon’s{" "}
            <span className="text-primary">terms of use.</span>
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="my-4 w-full h-px bg-[#8F8F8F]" />

      {/* Social Logins */}
      <div className="w-full flex flex-col gap-5">
        <p className="text-center text-black font-light">Or Log In with:</p>
        <LoginButtons />
        <div className="flex  flex-col gap-5">
          <span
            onClick={() => signIn("apple")}
            className="lg:w-[9em]  cursor-pointer lg:hidden gap-3 h-[2.5em] 2xl:text-[1.em] w-full lg:rounded-full p-3 2xl:h-[3em] 2x:p-4 border-[#8F8F8F] border-solid border-[0.8px] flex items-center text-black text-[1em] justify-center lg:justify-center sm:justify-start"
          >
            <Image
              alt="logo"
              width={20}
              loading="lazy"
              objectFit="cover"
              height={20}
              src={"/apple.png"}
              className="mr-2"
            />
            <span className="text-center w-full sm:w-auto">
              Continue with Apple
            </span>
          </span>
          <span
            onClick={() => signIn("facebook")}
            className="lg:w-[9em] cursor-pointer lg:hidden gap-3 h-[2.5em] 2xl:text-[1.em] w-full lg:rounded-full p-3 2xl:h-[3em] 2x:p-4 border-[#8F8F8F] border-solid border-[0.8px] flex items-center text-black text-[1em] justify-center lg:justify-center sm:justify-start"
          >
            <Image
              alt="logo"
              width={20}
              loading="lazy"
              objectFit="cover"
              height={20}
              src="/facebook.png"
              className="mr-2"
            />
            <span className="text-center w-full sm:w-auto">
              Continue with Facebook
            </span>
          </span>
        </div>
      </div>

      {/* Footer Switch */}
    </div>
  );
};
