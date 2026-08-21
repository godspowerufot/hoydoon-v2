"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import LoginButtons from "@/app/components/common/googlebutton";

const outlineBtn =
  "flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-[#ececec] bg-white text-[15px] font-medium text-[#111] transition-colors hover:border-[#111] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-50 lg:rounded-lg lg:border-[#d1d1d6]";

export default function AuthSocialButtons({
  googleAuth,
  isGoogleLoading,
  disabled = false,
}: {
  googleAuth: unknown;
  isGoogleLoading: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[#e5e5ea]" />
        </div>
        <p className="relative mx-auto w-fit bg-white px-3 text-xs font-medium uppercase tracking-wider text-[#8a8a8a]">
          Or
        </p>
      </div>

      <div className="[&_button]:h-12 [&_button]:rounded-full [&_button]:border-[#ececec] [&_button]:text-[15px] [&_button]:font-medium [&_button]:hover:border-[#111] lg:[&_button]:rounded-lg lg:[&_button]:border-[#d1d1d6]">
        <LoginButtons
          googleAuth={googleAuth}
          isGoogleLoading={isGoogleLoading}
        />
      </div>

      <button
        type="button"
        onClick={() => toast.info("Apple sign-in is not available yet.")}
        disabled={disabled || isGoogleLoading}
        className={outlineBtn}
      >
        <Image src="/apple.png" alt="" width={20} height={20} />
        Continue with Apple
      </button>
    </div>
  );
}

export function AuthSubmitButton({
  children,
  loading,
  loadingLabel,
  disabled,
}: {
  children: React.ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-white transition-colors hover:bg-[#07757c] disabled:cursor-not-allowed disabled:opacity-50 lg:rounded-lg"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingLabel || "Please wait…"}
        </>
      ) : (
        children
      )}
    </button>
  );
}
