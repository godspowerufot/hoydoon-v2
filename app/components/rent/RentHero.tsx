"use client";

import Image from "next/image";
import RentSearchBar from "./RentSearchBar";
import { HomeContainer } from "../home/Section";

export default function RentHero() {
  return (
    <header className="home-bleed relative isolate flex min-h-[620px] items-center overflow-hidden md:min-h-[700px] lg:h-[80vh] lg:max-h-[880px]">
      <a
        href="#homes-for-rent"
        className="absolute left-4 top-4 z-20 -translate-y-16 rounded-lg bg-white px-3 py-2 text-sm text-[#111] transition-transform focus:translate-y-0"
      >
        Skip to homes for rent
      </a>

      <Image
        src="/new-image/rent-page.jpg"
        alt="Looking back in a bright modern rental home"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_18%] pointer-events-none md:object-[75%_12%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60 pointer-events-none"
        aria-hidden="true"
      />

      <HomeContainer className="relative z-20 flex w-full flex-col items-center py-28 md:py-24">
        <h1 className="max-w-3xl text-center font-heading text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-white md:text-6xl">
          Find a place you&apos;ll love living in
        </h1>
        <p className="mt-3 max-w-xl text-center text-base text-white/85 md:text-lg">
          Browse verified rentals across Nigeria, Somalia, and Kenya with photos,
          pricing, and flexible options from apartments to shortlets.
        </p>
        <div className="mt-8 flex w-full justify-center">
          <RentSearchBar />
        </div>
      </HomeContainer>
    </header>
  );
}
