"use client";

import Image from "next/image";
import BuySearchBar from "./BuySearchBar";
import { HomeContainer } from "../home/Section";

export default function BuyHero() {
  return (
    <header className="home-bleed relative isolate flex min-h-[560px] items-center overflow-hidden md:min-h-[640px] lg:h-[72vh] lg:max-h-[760px]">
      <a
        href="#homes-for-sale"
        className="absolute left-4 top-4 z-20 -translate-y-16 rounded-lg bg-white px-3 py-2 text-sm text-[#111] transition-transform focus:translate-y-0"
      >
        Skip to homes for sale
      </a>

      <Image
        src="/new-image/buy-wallpaper.jpg"
        alt="Opening the doors to a modern home"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60 pointer-events-none"
        aria-hidden="true"
      />

      <HomeContainer className="relative z-20 flex w-full flex-col items-center py-28 md:py-24">
        <h1 className="max-w-3xl text-center font-heading text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-white md:text-6xl">
          Find a home worth owning
        </h1>
        <p className="mt-3 max-w-xl text-center text-base text-white/85 md:text-lg">
          Browse verified homes for sale across Nigeria, Somalia, and Kenya with
          photos, pricing, and local agents ready to help.
        </p>
        <div className="mt-8 flex w-full justify-center">
          <BuySearchBar />
        </div>
      </HomeContainer>
    </header>
  );
}
