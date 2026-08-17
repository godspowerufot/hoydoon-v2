"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "../home/Section";
import HelpCenterSearch from "./HelpCenterSearch";

export default function HelpCenterHero({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <header className="home-bleed relative isolate flex min-h-[420px] items-center overflow-hidden md:min-h-[480px] lg:min-h-[720px]">
      <Image
        src="/new-image/help.jpg"
        alt="Person getting help on the phone at home"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65 pointer-events-none"
        aria-hidden="true"
      />

      <HomeContainer className="relative z-10 flex w-full flex-col items-center py-28 md:py-32">
        {/* <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
          Help center
        </p> */}
        <h1 className="mt-3 max-w-3xl text-center font-heading text-[2.1rem] font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
          Answers for buying, renting, and listing
        </h1>
        <p className="mt-3 max-w-xl text-center text-base text-white/85 md:text-lg">
          Guides, tips, and how-tos to help you move with confidence on Hoydoon.
        </p>
        <div className="mt-8 w-full max-w-[720px]">
          <HelpCenterSearch query={query} onQueryChange={onQueryChange} />
        </div>
        <p className="mt-5 text-center text-sm text-white/75">
          Can&apos;t find what you need?{" "}
          <Link
            href="/helpcenter/submit-request"
            className="font-medium text-white underline-offset-4 hover:underline"
          >
            Submit a request
          </Link>
        </p>
      </HomeContainer>
    </header>
  );
}
