"use client";

import Link from "next/link";

type NavAuthButtonsProps = {
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
  light?: boolean;
  stacked?: boolean;
};

export default function NavAuthButtons({
  isAuthenticated,
  isLoggingOut,
  onLogout,
  light = false,
  stacked = false,
}: NavAuthButtonsProps) {
  const layout = stacked
    ? "flex w-full flex-col gap-2.5"
    : "flex items-center gap-1.5";

  const ghostClass = light ? "site-nav-ghost-light" : "site-nav-ghost-dark";

  if (isAuthenticated) {
    return (
      <div className={layout}>
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className={`site-nav-cta ${stacked ? "w-full" : ""}`}
        >
          {isLoggingOut ? "Logging out" : "Logout"}
        </button>
      </div>
    );
  }

  return (
    <div className={layout}>
      <Link
        href="/auth/sign-in"
        className={`site-nav-ghost ${ghostClass} ${stacked ? "w-full" : ""}`}
      >
        Log in
      </Link>
      <Link
        href="/auth/sign-up"
        className={`site-nav-cta ${stacked ? "w-full" : ""}`}
      >
        Get started
      </Link>
    </div>
  );
}
