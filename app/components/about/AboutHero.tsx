"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "../home/Section";

export default function AboutHero() {
  return (
    <header className="home-bleed relative isolate flex min-h-[560px] items-center overflow-hidden md:min-h-[640px] lg:h-[68vh] lg:max-h-[720px]">
      <Image
        src="/new-image/about-1.jpg"
        alt="Couple relaxing at home on the couch"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-[50%_35%] pointer-events-none"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65 pointer-events-none"
        aria-hidden="true"
      />

      <HomeContainer className="relative z-20 flex w-full flex-col items-center py-28 md:py-24">
        <h1 className="max-w-4xl text-center font-heading text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-white md:text-6xl">
          Property made simple, human, and built for you
        </h1>
        <p className="mt-4 max-w-2xl text-center text-base leading-relaxed text-white/85 md:text-lg">
          We&apos;re building the modern way to buy, rent, and sell across
          Nigeria, Kenya, and Somalia with verified listings and agents who
          know your market.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/search"
            className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-[#0f3d40] transition-colors hover:bg-white/90"
          >
            Explore listings
          </Link>
          <Link
            href="/agent/all-agent"
            className="inline-flex h-12 items-center rounded-full border border-white/35 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Meet our agents
          </Link>
        </div>
      </HomeContainer>
    </header>
  );
}
