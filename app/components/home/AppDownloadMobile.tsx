"use client";

import Image from "next/image";
import Link from "next/link";
import { getPhoneTypeLinks } from "@/utils";

type AppDownloadMobileProps = {
  storeLink: string;
};

export default function AppDownloadMobile({ storeLink }: AppDownloadMobileProps) {
  const stores = getPhoneTypeLinks();

  return (
    <div className="grid overflow-hidden rounded-3xl bg-[#0e3d40] md:hidden">
      <div className="relative min-h-[240px]">
        <Image
          src="/new-image/happy-young-couple-taking-selfie-garden.jpg"
          alt="Couple using the Hoydoon app outdoors"
          fill
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0e3d40] via-[#0e3d40]/20 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Mobile app
        </p>
        <h2
          id="app-heading"
          className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
        >
          Get alerts the moment the right home appears
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/75">
          Save searches, follow listings, and hear from agents on iOS or Android,
          without refreshing a browser tab.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={stores.iphone}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 active:opacity-90"
          >
            <Image
              src="/app1.svg"
              alt="Download on the App Store"
              width={140}
              height={42}
              className="h-11 w-auto"
            />
          </Link>
          <Link
            href={stores.android}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 active:opacity-90"
          >
            <Image
              src="/app2.svg"
              alt="Get it on Google Play"
              width={140}
              height={42}
              className="h-11 w-auto"
            />
          </Link>
        </div>

        <Link
          href={storeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-[#0e3d40] transition-colors duration-200 active:bg-[#f3f3f3]"
        >
          Download the app
        </Link>
      </div>
    </div>
  );
}
