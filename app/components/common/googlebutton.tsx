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
    <button
      type="button"
      onClick={() => loginWithCode()}
      disabled={isGoogleLoading}
      className="flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-[#d1d1d6] bg-white text-[15px] font-medium text-[#111] transition-colors hover:border-[#111] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isGoogleLoading ? (
        <svg
          className="h-5 w-5 animate-spin text-[#2a2a33]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <Image alt="" width={18} height={18} src="/google.png" />
      )}
      {isGoogleLoading ? "Signing in…" : "Continue with Google"}
    </button>
  );
};

export default LoginButtons;
