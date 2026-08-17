"use client";

import Image from "next/image";
import SellSearchBar from "./SellSearchBar";
import { HomeContainer } from "../home/Section";

export default function SellHero() {
  return (
    <header className="home-bleed relative isolate flex min-h-[560px] items-center overflow-hidden md:min-h-[640px] lg:h-[72vh] lg:max-h-[760px]">
      <a
        href="#sell-paths"
        className="absolute left-4 top-4 z-20 -translate-y-16 rounded-lg bg-white px-3 py-2 text-sm text-[#111] transition-transform focus:translate-y-0"
      >
        Skip to selling options
      </a>

      <Image
        src="/new-image/sell-wallpaper.jpg"
        alt="Agent reviewing a listing with a homeowner"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_28%] pointer-events-none"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60 pointer-events-none"
        aria-hidden="true"
      />

      <HomeContainer className="relative z-20 flex w-full flex-col items-center py-28 md:py-24">
        <h1 className="max-w-3xl text-center font-heading text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-white md:text-6xl">
          Sell with an agent who knows your market
        </h1>
        <p className="mt-3 max-w-xl text-center text-base text-white/85 md:text-lg">
          Get free, customized proposals from local agents across Nigeria,
          Somalia, and Kenya. Fast, easy, and no obligation.
        </p>
        <div className="mt-8 flex w-full justify-center">
          <SellSearchBar />
        </div>
      </HomeContainer>
    </header>
  );
}
