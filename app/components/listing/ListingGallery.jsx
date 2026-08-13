"use client";

import { useState } from "react";
import Image from "next/image";
import PropertyGalleryModal from "@/app/components/layouts/modals/property";
import { Heart, Share2 } from "lucide-react";

function srcOf(img) {
  if (!img) return "/house1.png";
  if (typeof img === "string") return img;
  return img.url || img.imageUrl || "/house1.png";
}

function PhotoTile({ src, alt, onClick, className = "", priority, sizes }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block h-full w-full overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <span
        className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/15"
        aria-hidden="true"
      />
    </button>
  );
}

export default function ListingGallery({
  images = [],
  video,
  listingId,
  coordinates,
  isFavorite,
  onFavorite,
  onShare,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [initialTab, setInitialTab] = useState("photos");
  const [mobileIndex, setMobileIndex] = useState(0);

  const photos = images.length ? images : ["/house1.png"];
  const count = photos.length + (video?.url ? 1 : 0);
  const extras = photos.slice(1, 5);

  const openAt = (index, tab = "photos") => {
    setInitialIndex(index);
    setInitialTab(tab);
    setIsModalOpen(true);
  };

  const onMobileScroll = (event) => {
    const width = event.currentTarget.offsetWidth;
    if (!width) return;
    setMobileIndex(Math.round(event.currentTarget.scrollLeft / width));
  };

  const mosaicClass =
    extras.length >= 3
      ? "md:grid-cols-[1.7fr_1fr] lg:grid-cols-[2fr_1fr_1fr]"
      : extras.length > 0
        ? "md:grid-cols-[1.7fr_1fr]"
        : "md:grid-cols-1";

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-[#e8e8e8]">
        <div
          className={`hidden h-[420px] gap-2 overflow-hidden md:grid md:h-[460px] md:grid-rows-2 lg:h-[520px] ${mosaicClass}`}
        >
          <PhotoTile
            src={srcOf(photos[0])}
            alt="Property photo"
            onClick={() => openAt(0)}
            priority
            sizes="60vw"
            className="row-span-2 rounded-none"
          />
          {extras.map((img, index) => {
            const hideOnTablet = extras.length >= 3 && index >= 2;
            return (
              <PhotoTile
                key={index}
                src={srcOf(img)}
                alt={`Property photo ${index + 2}`}
                onClick={() => openAt(index + 1)}
                sizes="30vw"
                className={hideOnTablet ? "hidden lg:block" : ""}
              />
            );
          })}
        </div>

        <div
          className="flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto hide-scrollbar md:hidden"
          onScroll={onMobileScroll}
        >
          {photos.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => openAt(index)}
              className="relative h-full w-full shrink-0 snap-center"
            >
              <Image
                src={srcOf(img)}
                alt={`Property photo ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-end p-3 md:p-4">
          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={onFavorite}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#ffffff]/95 px-3.5 text-sm font-semibold text-[#2a2a33] shadow-[0_8px_24px_rgba(20,20,30,0.12)]"
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`}
              />
              Save
            </button>
            <button
              type="button"
              onClick={onShare}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#ffffff]/95 px-3.5 text-sm font-semibold text-[#2a2a33] shadow-[0_8px_24px_rgba(20,20,30,0.12)]"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-[#fff] md:hidden">
          {mobileIndex + 1} / {photos.length}
        </div>

        <button
          type="button"
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 hidden rounded-full bg-[#ffffff] px-4 py-2 text-sm font-semibold text-[#2a2a33] shadow-[0_8px_24px_rgba(20,20,30,0.12)] md:inline-flex"
        >
          See all {count} photos
        </button>
      </div>

      <PropertyGalleryModal
        image={photos}
        video={video}
        listingId={listingId}
        coordinates={coordinates}
        handleFavoriteClick={onFavorite}
        isFavorite={isFavorite}
        isOpen={isModalOpen}
        initialIndex={initialIndex}
        initialTab={initialTab}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
