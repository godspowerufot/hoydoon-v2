"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "../home/Section";

export default function AboutHero() {
  return (
    <header className="home-bleed mobile-hero-flush relative isolate flex min-h-[440px] items-end overflow-hidden sm:min-h-[480px] md:min-h-[640px] md:items-center lg:h-[68vh] lg:max-h-[720px]">
      <Image
        src="/new-image/about-1.jpg"
        alt="Couple relaxing at home on the couch"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="pointer-events-none object-cover object-[50%_42%] md:object-[50%_35%]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 md:bg-gradient-to-b md:from-black/55 md:via-black/40 md:to-black/65"
        aria-hidden="true"
      />

      <HomeContainer className="relative z-20 flex w-full flex-col items-start pb-10 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] md:items-center md:py-24">
        <h1 className="max-w-4xl text-left font-heading text-[1.875rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-[2.1rem] md:text-center md:text-6xl md:leading-[1.08]">
          Property made simple, human, and built for you
        </h1>
        <p className="mt-3 max-w-2xl text-left text-[0.9375rem] leading-relaxed text-white/88 sm:text-base md:mt-4 md:text-center md:text-lg md:text-white/85">
          We&apos;re building the modern way to buy, rent, and sell across
          Nigeria, Kenya, and Somalia with verified listings and agents who
          know your market.
        </p>
        <div className="mt-6 flex w-full flex-col gap-3 sm:max-w-md sm:flex-row md:mt-8 md:max-w-none md:flex-wrap md:justify-center">
          <Link
            href="/search"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#0f3d40] transition-colors hover:bg-white/90 sm:w-auto"
          >
            Explore listings
          </Link>
          <Link
            href="/agent/all-agent"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
          >
            Meet our agents
          </Link>
        </div>
      </HomeContainer>
    </header>
  );
}
