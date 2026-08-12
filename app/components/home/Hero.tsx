"use client";

import Image from "next/image";
import HomeSearchBar from "./HomeSearchBar";
import { HomeContainer } from "./Section";

export default function Hero() {
  return (
    <header className="home-bleed relative isolate flex min-h-[560px] items-center overflow-hidden md:min-h-[640px] lg:h-[72vh] lg:max-h-[760px]">
      <a
        href="#homes-for-sale"
        className="absolute left-4 top-4 z-20 -translate-y-16 rounded-lg bg-white px-3 py-2 text-sm text-[#111] transition-transform focus:translate-y-0"
      >
        Skip to featured homes
      </a>

      <Image
        src="/new-image/happy-young-couple-taking-selfie-garden.jpg"
        alt="Couple taking a selfie in a garden"
        fill
        priority
        sizes="100vw"
        className="object-cover object-left pointer-events-none"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55 pointer-events-none"
        aria-hidden="true"
      />

      <HomeContainer className="relative z-20 flex w-full flex-col items-center py-28 md:py-24">
        <h1 className="max-w-3xl text-center font-heading text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-white md:text-6xl">
          Find a home you&apos;ll love
        </h1>
        <p className="mt-3 max-w-xl text-center text-base text-white/85 md:text-lg">
          Buy, rent, or sell across Nigeria, Somalia, and Kenya.
        </p>
        <div className="mt-8 flex w-full justify-center">
          <HomeSearchBar />
        </div>
      </HomeContainer>
    </header>
  );
}
