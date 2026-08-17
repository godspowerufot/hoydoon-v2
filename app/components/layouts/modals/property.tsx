"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Share2, X } from "lucide-react";
import MapComponent from "../listingmap";
import { handleShareClick } from "@/utils";

type ImageType = {
  url?: string;
  imageUrl?: string;
  [key: string]: unknown;
};

type PropertyModalProps = {
  isOpen: boolean;
  listingId?: string;
  handleFavoriteClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coordinates?: any;
  onClose: () => void;
  image: Array<ImageType | string>;
  video?: {
    url: string;
    description?: string;
  };
  initialIndex?: number;
  initialTab?: string;
  autoOpenCarousel?: boolean;
  isFavorite?: boolean;
};

function srcOf(img: ImageType | string | undefined) {
  if (!img) return "/house1.png";
  if (typeof img === "string") return img;
  return img.url || img.imageUrl || "/house1.png";
}

export default function PropertyGalleryModal({
  isOpen,
  coordinates,
  onClose,
  image,
  video,
  handleFavoriteClick,
  initialIndex = 0,
  initialTab = "photos",
  isFavorite = false,
}: PropertyModalProps) {
  const photos = image?.length ? image : ["/house1.png"];
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [activeTab, setActiveTab] = useState(initialTab);
  const touchStartX = useRef(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "photos", label: "Photos" },
    { id: "map", label: "Map" },
    ...(video?.url ? [{ id: "video", label: "Video" }] : []),
  ];

  useEffect(() => {
    if (!isOpen) return;
    setCurrentIndex(Math.min(initialIndex, Math.max(photos.length - 1, 0)));
    setActiveTab(initialTab);
  }, [isOpen, initialIndex, initialTab, photos.length]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const goTo = (index: number) => {
    const total = photos.length;
    if (!total) return;
    setCurrentIndex((index + total) % total);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (activeTab !== "photos") return;
      if (event.key === "ArrowRight") goTo(currentIndex + 1);
      if (event.key === "ArrowLeft") goTo(currentIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, activeTab, currentIndex, onClose]);

  useEffect(() => {
    const node = thumbsRef.current?.querySelector<HTMLElement>(
      `[data-thumb="${currentIndex}"]`
    );
    node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [currentIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col bg-[#ffffff]"
      role="dialog"
      aria-modal="true"
      aria-label="Property photos"
    >
      <header className="flex shrink-0 flex-col gap-3 border-b border-[#ececec] px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f7f8] text-[#2a2a33] transition-colors hover:bg-[#ececec]"
            aria-label="Close photos"
          >
            <X className="h-5 w-5" />
          </button>
          <p className="text-sm font-semibold text-[#2a2a33]">
            {activeTab === "photos"
              ? `${currentIndex + 1} / ${photos.length}`
              : activeTab === "map"
                ? "Map"
                : "Video"}
          </p>
          </div>

        <div
          role="tablist"
          aria-label="Gallery views"
          className="flex gap-1 rounded-full bg-[#f7f7f8] p-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-[#ffffff] text-primary shadow-[0_8px_24px_rgba(20,20,30,0.06)]"
                  : "text-[#5c5c66] hover:text-[#2a2a33]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#ececec] px-3.5 text-sm font-semibold text-[#2a2a33] hover:bg-[#f7f7f8]"
          >
            <Heart
              className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`}
            />
            Save
          </button>
          <button
            type="button"
            onClick={handleShareClick}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#ececec] px-3.5 text-sm font-semibold text-[#2a2a33] hover:bg-[#f7f7f8]"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </header>

      {activeTab === "photos" ? (
        <>
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center bg-[#111]"
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              const delta = event.changedTouches[0].clientX - touchStartX.current;
              if (delta > 50) goTo(currentIndex - 1);
              if (delta < -50) goTo(currentIndex + 1);
            }}
          >
            <Image
              src={srcOf(photos[currentIndex])}
              alt={`Property photo ${currentIndex + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />

            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => goTo(currentIndex - 1)}
                  className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#ffffff] text-[#2a2a33] shadow-[0_8px_24px_rgba(20,20,30,0.16)] md:left-6"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(currentIndex + 1)}
                  className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#ffffff] text-[#2a2a33] shadow-[0_8px_24px_rgba(20,20,30,0.16)] md:right-6"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>

          {photos.length > 1 ? (
            <div
              ref={thumbsRef}
              className="flex shrink-0 gap-2 overflow-x-auto hide-scrollbar border-t border-[#ececec] bg-[#ffffff] px-4 py-3 md:px-6"
            >
              {photos.map((photo, index) => {
                const selected = index === currentIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    data-thumb={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl ${
                      selected
                        ? "ring-2 ring-primary ring-offset-2"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Show photo ${index + 1}`}
                    aria-current={selected}
                  >
                    <Image
                      src={srcOf(photo)}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </>
      ) : null}

      {activeTab === "map" ? (
        <div className="min-h-0 flex-1 bg-[#f7f7f8]">
          <MapComponent coordinates={coordinates} />
        </div>
      ) : null}

      {activeTab === "video" && video?.url ? (
        <div className="flex min-h-0 flex-1 items-center justify-center bg-[#111] p-4 md:p-8">
          <video
            src={video.url}
            controls
            className="max-h-full w-full max-w-5xl rounded-2xl object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : null}
      </div>
  );
}
