// ============================================
// 1. Update LoginButtons component (googlebutton.tsx)
// ============================================

"use client";

import React from "react";
import { Credentials } from "google-auth-library";
import { type SuccessAuthCodeResponse } from "google-oauth-gsi";

import { provider } from "@/utils";
import { sendDeviceInfo } from "@/utils/lib/devicinfo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { log } from "@/utils/log";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoginButtons = ({ googleAuth, isGoogleLoading }: any) => {
  const router = useRouter();

  async function onGoogleLoginSuccess(tokenResponse: SuccessAuthCodeResponse) {
    console.log("(auth-code) tokenResponse: ", tokenResponse);
    const { code } = tokenResponse;
    try {
      const device = await sendDeviceInfo();
      const { region, ...deviceWithoutRegion } = device;
      log(region);

      const response = await fetch(`/api/google`, {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: { "Content-Type": "application/json" },
      });

      const data = (await response.json()) as Credentials;
      if (!data.id_token) {
        return console.error("Failed to login with google");
      }

      // Construct payload for backend authentication
      const payload = {
        credential: data.id_token,
        role: "buyer",
        device: deviceWithoutRegion,
      };

      // Send the payload to the backend
      await googleAuth({
        ...payload,
      }).unwrap();

      toast.success("Login Success!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to login with Google");
    }
  }

  const loginWithCode = provider.useGoogleLogin({
    flow: "auth-code",
    onSuccess: onGoogleLoginSuccess,
    onError: (res) => {
      console.error("Failed to login with google", res);
      toast.error("Google authentication failed");
    },
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
  });

  return (
    <>
      {/* Desktop Button */}
      <button
        onClick={() => loginWithCode()}
        disabled={isGoogleLoading}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray rounded-full hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGoogleLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          <Image
            alt="logo"
            width={20}
            loading="lazy"
            objectFit="cover"
            height={20}
            src={"/google.png"}
          />
        )}
        {isGoogleLoading ? "Signing in..." : "Google"}
      </button>

      {/* Mobile Button */}
      <button
        onClick={() => loginWithCode()}
        disabled={isGoogleLoading}
        className="lg:w-[9em] lg:hidden gap-3 h-[2.5em] 2xl:text-[1.em] w-full lg:rounded-full p-3 2xl:h-[3em] 2x:p-4 border-[#8F8F8F] border-solid border-[0.8px] flex items-center text-black text-[1em] justify-center lg:justify-center sm:justify-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGoogleLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          <Image
            alt="logo"
            width={20}
            loading="lazy"
            objectFit="cover"
            height={20}
            src={"/google.png"}
            className="mr-2"
          />
        )}
        <span className="text-center w-full sm:w-auto">
          {isGoogleLoading ? "Signing in..." : "Continue with Google"}
        </span>
      </button>
    </>
  );
};

export default LoginButtons;
