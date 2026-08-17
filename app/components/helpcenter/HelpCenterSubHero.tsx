"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "../home/Section";

type HelpCenterSubHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
};

export default function HelpCenterSubHero({
  eyebrow = "Help center",
  title,
  description,
  imageSrc = "/new-image/help-2.jpg",
  imageAlt = "Hoydoon support",
  imagePosition = "object-[50%_28%] md:object-[50%_22%]",
}: HelpCenterSubHeroProps) {
  return (
    <header className="home-bleed relative isolate flex min-h-[360px] items-end overflow-hidden md:min-h-[420px] lg:min-h-[480px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className={`pointer-events-none object-cover ${imagePosition}`}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/30 pointer-events-none"
        aria-hidden="true"
      />

      <HomeContainer className="relative z-10 w-full pb-12 pt-[5.5rem] md:pb-14 md:pt-36 lg:pt-40">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/75">
          <Link href="/helpcenter" className="hover:text-white">
            Help center
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white">{title}</span>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
          {eyebrow}
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
