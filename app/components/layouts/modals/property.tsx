/* eslint-disable */
"use client";
import { useEffect, useRef, useState } from "react";
import MapComponent from "../listingmap";
import { useToggleFavoriteMutation } from "@/store/slices/api/authapi";
import { handleShareClick } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
type Coordinates = [number, number];

type ImageType = {
  url: string;
  [key: string]: any;
};

type PropertyModalProps = {
  isOpen: boolean;
  listingId: string;
  handleFavoriteClick: any;
  coordinates: Coordinates;
  onClose: () => void;
  image: ImageType[];
  video?: {
    url: string;
    description?: string;
  };
};

// Full Screen Carousel Component
const FullScreenCarousel = ({
  images,
  initialIndex,
  onClose,
}: {
  images: any[];
  initialIndex: number;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex); // ✅ Carousel manages its own index

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const imageUrl =
    typeof currentImage === "string"
      ? currentImage
      : currentImage?.url || currentImage?.imageUrl || "/house1.png";

  const handleNext = () => {
    setCurrentIndex((prev: number) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev: number) => (prev - 1 + images.length) % images.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[999] flex items-center justify-center transition-all duration-300">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl"
      >
        ✕
      </button>

      <button
        onClick={handlePrev}
        className="absolute left-5 text-white text-4xl px-4 py-2 rounded hover:bg-white/10"
      >
        <FaChevronLeft />
      </button>

      <div className="transition-all duration-300 ease-in-out max-w-full max-h-[80%]">
        <Image
          width={1200}
          height={800}
          src={imageUrl}
          alt="carousel"
          className="object-contain max-h-[80vh] w-full rounded-md"
          priority
        />
      </div>

      <button
        onClick={handleNext}
        className="absolute right-5 text-white text-4xl px-4 py-2 rounded hover:bg-white/10"
      >
        <FaChevronRight />
      </button>

      {/* Image counter */}
      <div className="absolute bottom-5 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// PropertyGalleryModal Component
const PropertyGalleryModal = ({
  isOpen,
  coordinates,
  onClose,
  image,
  video,
  handleFavoriteClick,
  initialIndex = 0,
  initialTab: propInitialTab = "photos",
}: PropertyModalProps & {
  initialIndex?: number;
  initialTab?: string;
  autoOpenCarousel?: boolean;
}) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0); // ✅ Tracks the clicked image index
  const [activeTab, setActiveTab] = useState(propInitialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(propInitialTab);
      setIsCarouselOpen(false);
    }
  }, [isOpen, propInitialTab]);

  const router = useRouter();
  const [showListings, setShowListings] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const images = image || [];

  // ✅ Fixed: capture the exact clicked index before opening carousel
  const handleImageClick = (index: number) => {
    setCarouselStartIndex(index);
    setIsCarouselOpen(true);
  };

  const getImageUrl = (img: any): string => {
    return typeof img === "string"
      ? img
      : img?.url || img?.imageUrl || "/house1.png";
  };

  const generateGridLayout = () => {
    const blocks = [];
    let index = 0;

    while (index < images.length) {
      const remaining = images.length - index;

      if (remaining === 1) {
        const imgUrl = getImageUrl(images[index]);
        const capturedIndex = index;
        blocks.push(
          <div key={index} className="grid grid-cols-1 gap-3">
            <Image
              src={imgUrl}
              onClick={() => handleImageClick(capturedIndex)}
              alt={`Image ${capturedIndex}`}
              width={500}
              height={500}
              className="w-full h-[400px] object-cover rounded-md cursor-pointer"
            />
          </div>
        );
        index += 1;
      } else if (remaining === 2) {
        const startIndex = index;
        blocks.push(
          <div key={index} className="grid grid-col-1 lg:grid-cols-2 gap-3">
            {images.slice(startIndex, startIndex + 2).map((img: any, i: number) => {
              const absoluteIndex = startIndex + i;
              const imgUrl = getImageUrl(img);
              return (
                <Image
                  width={500}
                  height={300}
                  key={i}
                  src={imgUrl}
                  onClick={() => handleImageClick(absoluteIndex)}
                  alt={`Image ${absoluteIndex}`}
                  className="w-full h-[400px] object-cover rounded-md cursor-pointer"
                />
              );
            })}
          </div>
        );
        index += 2;
      } else {
        const startIndex = index;
        blocks.push(
          <div
            key={index}
            className="grid grid-col-1 lg:grid-cols-2 gap-3 grid-rows-2 -mb-[2pc]"
          >
            <div className="col-span-2">
              <Image
                width={500}
                height={300}
                src={getImageUrl(images[startIndex])}
                onClick={() => handleImageClick(startIndex)}
                alt={`Image ${startIndex}`}
                className="w-full h-[400px] object-cover rounded-md cursor-pointer"
              />
            </div>
            {images.slice(startIndex + 1, startIndex + 3).map((img: any, i: number) => {
              const absoluteIndex = startIndex + 1 + i;
              const imgUrl = getImageUrl(img);
              return (
                <Image
                  width={500}
                  height={300}
                  key={i}
                  src={imgUrl}
                  onClick={() => handleImageClick(absoluteIndex)}
                  alt={`Image ${absoluteIndex}`}
                  className="w-full h-[360px] object-cover rounded-md cursor-pointer"
                />
              );
            })}
          </div>
        );
        index += 3;
      }
    }

    return <div className="flex flex-col space-y-2">{blocks}</div>;
  };

  const renderTabContent = () => {
    if (activeTab === "photos") {
      return (
        <div className="space-y-6 mt-8 -mb-[2pc]">{generateGridLayout()}</div>
      );
    }
    if (activeTab === "map") {
      return <MapComponent coordinates={coordinates} />;
    }
    if (activeTab === "video" && video?.url) {
      return (
        <div className="flex items-center justify-center bg-black rounded-lg overflow-hidden mt-8 h-[500px]">
          <video
            src={video.url}
            controls
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
  };

  const handleToggleListings = () => {
    setShowListings((prev) => !prev);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn"
        onClick={handleOverlayClick}
      >
        <div
          ref={modalRef}
          className="bg-white w-11/12 md:w-3/4 lg:w-5/6 pt-5 pb-[3.5rem] px-[1rem] md:px-[2rem] shadow-lg relative max-h-[90vh] overflow-y-auto animate-zoomOut"
        >
          {/* Tabs */}
          <div className="flex border-b mb-3">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("photos")}
                className={`pb-2 ${
                  activeTab === "photos"
                    ? "border-b-2 border-primary text-black"
                    : "text-gray"
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab("map")}
                className={`pb-2 ${
                  activeTab === "map"
                    ? "border-b-2 border-primary text-black"
                    : "text-gray"
                }`}
              >
                Map
              </button>
              {video?.url && (
                <button
                  onClick={() => setActiveTab("video")}
                  className={`pb-2 ${
                    activeTab === "video"
                      ? "border-b-2 border-primary text-black"
                      : "text-gray"
                  }`}
                >
                  Video
                </button>
              )}
            </div>
            <div className="flex justify-end pr-4 pb-2 flex-1 gap-2">
              <div
                onClick={handleFavoriteClick}
                className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md"
              >
                <Image
                  width={500}
                  height={500}
                  src="/favorite.svg"
                  alt="Favorite"
                  className="w-4 h-4"
                />
              </div>
              <div
                onClick={handleShareClick}
                className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md"
              >
                <Image
                  width={500}
                  height={500}
                  src="/upload.svg"
                  alt="Download"
                  className="w-4 h-4"
                />
              </div>
              <div
                onClick={handleToggleListings}
                className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md"
              >
                <Image
                  width={500}
                  height={300}
                  src="/image2.svg"
                  alt="Share"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {showListings && renderTabContent()}
        </div>
      </div>

      {/* ✅ Full Screen Carousel — initialIndex is passed as a snapshot, carousel owns its own state */}
      {isCarouselOpen && (
        <FullScreenCarousel
          images={images}
          initialIndex={carouselStartIndex}
          onClose={() => setIsCarouselOpen(false)}
        />
      )}
    </>
  );
};