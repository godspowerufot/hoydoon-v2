"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useGoogleAuthMutation,
  useLoginMutation,
} from "@/store/slices/api/authapi";
import { setUnverifiedEmail } from "@/store/slices/authslice";
import { sendDeviceInfo } from "@/utils/lib/devicinfo";
import { log } from "@/utils/log";
import AuthFormField from "./AuthFormField";
import AuthSocialButtons, { AuthSubmitButton } from "./AuthSocialButtons";
import AuthSplitLayout from "./AuthSplitLayout";

export default function SignInPageClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const [googleAuth, { isLoading: isGoogleLoading }] = useGoogleAuthMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const device = await sendDeviceInfo();
      const { region, ...deviceWithoutRegion } = device;
      log("Device info:", region);

      await login({ email, password, device: deviceWithoutRegion }).unwrap();
      toast.success("Login successful!");
      router.push("/");
    } catch (err: unknown) {
      const error = err as {
        status?: number;
        data?: { error?: string };
      };
      toast.error(error?.data?.error || "Login failed");

      if (error?.status === 409) {
        dispatch(setUnverifiedEmail(email));
        router.push("/auth/sign-up/verification");
      }
    }
  };

  return (
    <AuthSplitLayout
      imageSrc="/authBanner.webp"
      imageAlt="Beautiful home interior"
      imagePosition="object-[50%_40%]"
      quote="Pick up where you left off, saved homes, agents, and searches."
    >
      <div className="mb-8">
        <h1 className="font-heading text-[1.75rem] font-semibold tracking-tight text-[#111] md:text-3xl">
          Sign in
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-[#5c5c66]">
          Welcome back. Enter your details to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthFormField
          id="sign-in-email"
          label="Email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />

        <AuthFormField
          id="sign-in-password"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        <div className="flex justify-end pt-1">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-primary hover:text-[#076b72]"
          >
            Forgot password?
          </Link>
        </div>

        <AuthSubmitButton
          loading={isLoading}
          loadingLabel="Signing in…"
          disabled={isGoogleLoading}
        >
          Sign in
        </AuthSubmitButton>

        <AuthSocialButtons
          googleAuth={googleAuth}
          isGoogleLoading={isGoogleLoading}
          disabled={isLoading}
        />
      </form>

      <p className="mt-8 text-center text-[15px] text-[#5c5c66]">
        New to Hoydoon?{" "}
        <Link
          href="/auth/sign-up"
          className="font-semibold text-primary hover:text-[#076b72]"
        >
          Create account
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
