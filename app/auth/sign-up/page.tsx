import { Suspense } from "react";
import SignUpPageClient from "@/app/components/auth/SignUpPageClient";

function SignUpFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpFallback />}>
      <SignUpPageClient />
    </Suspense>
  );
}
