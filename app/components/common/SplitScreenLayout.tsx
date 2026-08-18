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
    <div className="split-screen flex min-h-screen w-full bg-white">
      <div className="relative hidden min-h-screen w-[44%] xl:w-1/2 lg:block">
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

      <div className="flex min-h-screen w-full flex-col overflow-y-auto lg:w-[56%] xl:w-1/2">
        <div className="relative h-44 w-full shrink-0 lg:hidden">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover ${imagePosition}`}
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        </div>

        <header className="flex shrink-0 items-center justify-between px-5 py-4 md:px-8 md:py-5">
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

        <div
          className={`flex flex-1 justify-center px-5 pb-10 pt-2 md:px-8 md:pb-12 ${alignClass}`}
        >
          <div className={`w-full ${contentMaxWidth}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
