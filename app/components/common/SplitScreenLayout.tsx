"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

type SplitScreenLayoutProps = {
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  quote?: string;
  children: React.ReactNode;
  contentMaxWidth?: string;
  contentAlign?: "center" | "start";
  closeHref?: string;
  closeLabel?: string;
};

export default function SplitScreenLayout({
  imageSrc,
  imageAlt,
  imagePosition = "object-center",
  quote = "Find a place you'll love on Hoydoon.",
  children,
  contentMaxWidth = "max-w-[400px]",
  contentAlign = "center",
  closeHref = "/",
  closeLabel = "Close and return home",
}: SplitScreenLayoutProps) {
  const alignClass =
    contentAlign === "start" ? "items-start pt-4 md:pt-8" : "items-center";

  return (
    <div className="split-screen flex min-h-[100dvh] w-full flex-col bg-[#0e3d40] lg:min-h-screen lg:flex-row lg:bg-white">
      {/* Mobile hero — lg:hidden */}
      <div className="relative h-[38vh] min-h-[220px] max-h-[320px] w-full shrink-0 lg:hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${imagePosition}`}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0e3d40] via-[#0e3d40]/55 to-black/25"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))]">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/logo-23.png"
              alt=""
              width={32}
              height={32}
              priority
              className="h-8 w-8 object-contain"
            />
            <span className="font-heading text-lg font-semibold tracking-tight text-white">
              Hoydoon
            </span>
          </Link>
          <Link
            href={closeHref}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors active:bg-white/25"
            aria-label={closeLabel}
          >
            <X className="h-5 w-5" />
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
            Hoydoon account
          </p>
          <p className="mt-2 max-w-[20rem] font-heading text-[1.45rem] font-semibold leading-snug tracking-tight text-white">
            {quote}
          </p>
        </div>
      </div>

      {/* Desktop left image — hidden on mobile */}
      <div className="relative hidden min-h-screen w-[44%] shrink-0 lg:block xl:w-1/2">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="50vw"
          className={`object-cover ${imagePosition}`}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"
          aria-hidden="true"
        />
        {quote ? (
          <div className="absolute bottom-0 left-0 right-0 p-10 xl:p-14">
            <p className="max-w-md font-heading text-2xl font-semibold leading-snug tracking-tight text-white xl:text-3xl">
              {quote}
            </p>
          </div>
        ) : null}
      </div>

      {/* Form panel — overlapping sheet on mobile, split pane on desktop */}
      <div className="relative z-10 -mt-8 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-t-[1.75rem] bg-white shadow-[0_-12px_40px_rgba(17,17,17,0.12)] lg:mt-0 lg:w-[56%] lg:rounded-none lg:shadow-none xl:w-1/2">
        {/* Desktop header */}
        <header className="hidden shrink-0 items-center justify-between px-5 py-4 md:px-8 md:py-5 lg:flex">
          <Link href="/" className="inline-flex">
            <Image
              src="/newlogo.svg"
              alt="Hoydoon"
              width={128}
              height={36}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>
          <Link
            href={closeHref}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#5c5c66] transition-colors hover:bg-[#f7f7f8] hover:text-[#111]"
            aria-label={closeLabel}
          >
            <X className="h-5 w-5" />
          </Link>
        </header>

        {/* Mobile sheet handle */}
        <div className="flex justify-center pt-3 lg:hidden" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-[#e5e5e5]" />
        </div>

        <div
          className={`flex flex-1 justify-center px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-5 md:px-8 lg:pb-12 lg:pt-2 ${alignClass}`}
        >
          <div className={`w-full ${contentMaxWidth}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
