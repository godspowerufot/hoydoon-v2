"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useGoogleAuthMutation,
  useSignupMutation,
} from "@/store/slices/api/authapi";
import { setUnverifiedEmail } from "@/store/slices/authslice";
import { sendDeviceInfo } from "@/utils/lib/devicinfo";
import AuthFormField from "./AuthFormField";
import AuthSocialButtons, { AuthSubmitButton } from "./AuthSocialButtons";
import AuthSplitLayout from "./AuthSplitLayout";

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignUpPageClient() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [signup, { isLoading }] = useSignupMutation();
  const [googleAuth, { isLoading: isGoogleLoading }] = useGoogleAuthMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams?.get("referral");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!PASSWORD_REGEX.test(password)) {
      setIsPasswordValid(false);
      return;
    }

    try {
      const { region, ...device } = await sendDeviceInfo();

      await signup({
        fullname,
        email,
        password,
        role: "buyer",
        device,
        region,
        referralCode: referralCode || undefined,
      }).unwrap();

      dispatch(setUnverifiedEmail(email));
      toast.success("Check your email for the verification code.");
      router.push("/auth/sign-up/verification");
    } catch (err: unknown) {
      const error = err as {
        status?: number;
        data?: { error?: string };
        error?: string;
        message?: string;
      };

      const message =
        error?.status === 409
          ? "This email is already registered"
          : error?.error ||
            error?.data?.error ||
            error?.message ||
            "Sign up failed";

      toast.error(message);
    }
  };

  return (
    <AuthSplitLayout
      imageSrc="/signup.jpg"
      imageAlt="Modern home exterior"
      imagePosition="object-[50%_30%]"
      quote="Create a free account to save homes and connect with local agents."
    >
      <div className="mb-6 lg:mb-8">
        <h1 className="font-heading text-[1.65rem] font-semibold tracking-tight text-[#111] lg:text-3xl">
          Create account
        </h1>
        <p className="mt-1.5 text-[15px] leading-relaxed text-[#5c5c66]">
          Join Hoydoon to save listings and track your home search.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthFormField
          id="sign-up-name"
          label="Full name"
          type="text"
          placeholder="First and last name"
          value={fullname}
          onChange={setFullname}
          autoComplete="name"
        />

        <AuthFormField
          id="sign-up-email"
          label="Email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />

        <AuthFormField
          id="sign-up-password"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(value) => {
            setPassword(value);
            setIsPasswordValid(
              PASSWORD_REGEX.test(value) || value.length === 0
            );
          }}
          error={
            !isPasswordValid
              ? "Use 8+ characters with letters, numbers, and symbols."
              : undefined
          }
          autoComplete="new-password"
        />

        <p className="text-xs leading-relaxed text-[#8a8a8a]">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <AuthSubmitButton
          loading={isLoading}
          loadingLabel="Creating account…"
          disabled={isGoogleLoading}
        >
          Create account
        </AuthSubmitButton>

        <AuthSocialButtons
          googleAuth={googleAuth}
          isGoogleLoading={isGoogleLoading}
          disabled={isLoading}
        />
      </form>

      <p className="mt-8 text-center text-[15px] text-[#5c5c66]">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="font-semibold text-primary hover:text-[#076b72]"
        >
          Sign in
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
