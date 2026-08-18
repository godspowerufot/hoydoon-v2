"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "../home/Section";

type AllAgentsSubHeroProps = {
  title?: string;
  description?: string;
};

export default function AllAgentsSubHero({
  title = "All real estate agents",
  description = "Browse verified Hoydoon agents by location, specialty, and language — then connect with someone who knows your market.",
}: AllAgentsSubHeroProps) {
  return (
    <header className="home-bleed relative isolate flex min-h-[360px] items-end overflow-hidden md:min-h-[420px] lg:min-h-[480px]">
      <Image
        src="/new-image/agent-wallpaper.jpg"
        alt="Real estate agents on Hoydoon"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-[center_62%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/30 pointer-events-none"
        aria-hidden="true"
      />

      <HomeContainer className="relative z-10 w-full pb-12 pt-[5.5rem] md:pb-14 md:pt-36 lg:pt-40">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/75">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/agent" className="hover:text-white">
            Agents
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white">All agents</span>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
          Agent directory
        </p>
        <h1 className="mt-2 max-w-2xl font-heading text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          {description}
        </p>
      </HomeContainer>
    </header>
  );
}
