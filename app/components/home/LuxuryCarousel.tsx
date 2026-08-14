"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Maximize2, Star } from "lucide-react";
import { getListingHref } from "@/utils";
import { HomeContainer, SectionHeader } from "./Section";

export type LuxurySlide = {
  imageUrl: string;
  title: string;
  rating: number;
  reviewCount: number;
  region: string;
  squareFeet: string | number;
  description: string;
  slug?: string;
};

export default function LuxuryCarousel({ slides }: { slides: LuxurySlide[] }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => {
      if (!slides.length) return;
      const wrapped = (next + slides.length) % slides.length;
      setIndex(wrapped);
    },
    [slides.length]
  );

  const current = slides[index];

  useEffect(() => {
    const node = regionRef.current;
    if (!node) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      }
    };

    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  if (!slides.length || !current) return null;

  return (
    <section className="pb-16 md:pb-24" aria-labelledby="luxury-heading">
      <HomeContainer>
        <SectionHeader
          headingId="luxury-heading"
          eyebrow="Luxury"
          title="Spaces designed for elevated living"
          description="Architecture, interiors, and locations chosen for people who want more than a listing photo."
        />

        <div
          ref={regionRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Luxury property gallery"
          className="relative overflow-hidden rounded-3xl outline-none"
          onTouchStart={(e) => {
            startX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (startX.current == null) return;
            const diff = startX.current - e.changedTouches[0].clientX;
            if (diff > 50) goTo(index + 1);
            if (diff < -50) goTo(index - 1);
            startX.current = null;
          }}
        >
          <div className="relative h-[28rem] w-full md:h-[36rem]">
            <Image
              src={current.imageUrl || "/house1.png"}
              alt={current.title || "Luxury property"}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 1180px) 100vw, 1180px"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10"
              aria-hidden="true"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4 md:p-8">
            <div className="max-w-2xl rounded-2xl bg-white/95 p-5 backdrop-blur-sm md:p-7">
              <p className="inline-flex items-center gap-1.5 text-sm text-[#6b6b6b]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {current.region || "Location TBC"}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[#111] md:text-2xl">
                {current.title || "Luxury residence"}
              </h3>
              {current.description ? (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                  {current.description}
                </p>
              ) : null}

              <dl className="mt-4 flex flex-wrap gap-6 text-sm">
                <div>
                  <dt className="text-[#8a8a8a]">Size</dt>
                  <dd className="mt-0.5 inline-flex items-center gap-1.5 font-semibold text-[#111]">
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                    {current.squareFeet || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#8a8a8a]">Rating</dt>
                  <dd className="mt-0.5 inline-flex items-center gap-1.5 font-semibold text-[#111]">
                    <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                    {Number(current.rating || 0).toFixed(1)}
                    <span className="font-normal text-[#8a8a8a]">
                      ({current.reviewCount || 0} reviews)
                    </span>
                  </dd>
                </div>
              </dl>

              {current.slug ? (
                <Link
                  href={getListingHref(current)}
                  prefetch={false}
                  className="mt-5 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-[#fff] transition-colors duration-200 hover:bg-[#07757c]"
                >
                  View this home
                </Link>
              ) : null}
            </div>
          </div>

          {slides.length > 1 ? (
            <div className="absolute right-4 top-4 flex gap-2 md:right-6 md:top-6">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous luxury home"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#111] shadow-sm transition-colors duration-200 hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next luxury home"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#111] shadow-sm transition-colors duration-200 hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>

        {slides.length > 1 ? (
          <div
            className="mt-4 flex justify-center gap-2"
            role="tablist"
            aria-label="Luxury slides"
          >
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.slug || slide.title || slideIndex}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-label={`Show luxury home ${slideIndex + 1}`}
                onClick={() => goTo(slideIndex)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  slideIndex === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-[#d4d4d4] hover:bg-[#bdbdbd]"
                }`}
              />
            ))}
          </div>
        ) : null}
      </HomeContainer>
    </section>
  );
}
