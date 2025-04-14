/* eslint-disable */
"use client";
import { useEffect, useState } from "react";
import MapComponent from "../listingmap"; // Assuming this is a map component you already have
import StreetViewComponent from "../streetvie"


type PageProps = {
  isOpen: boolean;
  coordinates: any; // ideally, use a proper type like [number, number]
  onClose: () => void;
  image:any; // or appropriate type
};

// Full Screen Carousel Component
function FullScreenCarousel({ images, currentIndex, setCurrentIndex, onClose }:any) {
  const [imageurl, setimageurl] = useState("");
  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < images.length) {
      const indexImage = images[currentIndex]?.url;
      setimageurl(indexImage); // Set the image based on currentIndex
    } else {
      console.log("Invalid index");
    }
  }, [images, currentIndex]);
  if (!images || images.length === 0) return null;




  const handleNext = () => {
    setCurrentIndex((prev: number) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev: number) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[999] flex items-center justify-center transition-all duration-300">
      <button onClick={onClose} className="absolute top-5 right-5 text-white text-3xl">✕</button>

      <button onClick={handlePrev} className="absolute left-5 text-white text-4xl px-4 py-2 rounded hover:bg-white/10">
        &lt;
      </button>

      <div className="transition-all duration-300 ease-in-out max-w-[90%] max-h-[80%]">
        <img
          src={imageurl}
          alt="carousel"
          className="object-contain max-h-[80vh] w-full rounded-md"
        />
      </div>

      <button onClick={handleNext} className="absolute right-5 text-white text-4xl px-4 py-2 rounded hover:bg-white/10">
        &gt;
      </button>
    </div>
  );
}

// PropertyGalleryModal Component
export default function PropertyGalleryModal({ isOpen, coordinates, onClose, image }:PageProps) {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Default to first image
  const [activeTab, setActiveTab] = useState("photos"); // Tab state

  if (!isOpen) return null;

  const images = image || [];

  const handleImageClick = (index: number) => {
    setCurrentIndex(index); // Set clicked image index
    setIsCarouselOpen(true); // Open the carousel
  };

  const generateGridLayout = () => {
    const blocks = [];
    let index = 0;

    while (index < images.length) {
      const remaining = images.length - index;

      if (remaining === 1) {
        blocks.push(
          <div key={index} className="grid grid-cols-1 gap-3">
            <img
              src={images[index]?.url || "/house1.png"}
              onClick={() => handleImageClick(index)} // Use handleImageClickAlwaysFirst if needed
              alt={`Image ${index}`}
              className="w-full h-[400px] object-cover rounded-md cursor-pointer"
            />
          </div>
        );
        index += 1;
      } else if (remaining === 2) {
        blocks.push(
          <div key={index} className="grid grid-cols-2 gap-3">
            {images.slice(index, index + 2).map((img: any, i: number) => (
              <img
                key={i}
                src={img?.url || "/house1.png"}
                onClick={() => handleImageClick(index)} // Use handleImageClickAlwaysFirst if needed
                alt={`Image ${index + i}`}
                className="w-full h-[400px] object-cover rounded-md cursor-pointer"
              />
            ))}
          </div>
        );
        index += 2;
      } else {
        blocks.push(
          <div key={index} className="grid grid-cols-2 gap-3 grid-rows-2">
            <div className="col-span-2">
              <img
                src={images[index]?.url || "/house1.png"}
                onClick={() => handleImageClick(index)} // Use handleImageClickAlwaysFirst if needed
                alt={`Image ${index}`}
                className="w-full h-[400px] object-cover rounded-md cursor-pointer"
              />
            </div>
            {images.slice(index + 1, index + 3).map((img: any, i: number) => (
              <img
                key={i}
                src={img?.url || "/house1.png"}
                onClick={() => handleImageClick(index)} // Use handleImageClickAlwaysFirst if needed
                alt={`Image ${index + i + 1}`}
                className="w-full h-[360px] object-cover rounded-md cursor-pointer"
              />
            ))}
          </div>
        );
        index += 3;
      }
    }

    return <div className="flex flex-col space-y-2">{blocks}</div>;
  };

  // Switch between tabs
  const renderTabContent = () => {
    if (activeTab === "photos") {
      return <div className="space-y-6 mt-8">{generateGridLayout()}</div>;
    }
    if (activeTab === "map") {
      return <MapComponent coordinates={coordinates} />;
    }
    if (activeTab === "streetview") {
      return (
        <StreetViewComponent coordinates={coordinates} />

      );
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-11/12 md:w-3/4 lg:w-5/6 py-5 px-[2rem] shadow-lg relative max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          >
            ✕
          </button>

          {/* Tabs */}
          <div className="flex border-b mb-3">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("photos")}
                className={`pb-2 ${activeTab === "photos" ? "border-b-2 border-primary text-black" : "text-gray"}`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab("map")}
                className={`pb-2 ${activeTab === "map" ? "border-b-2 border-primary text-black" : "text-gray"}`}
              >
                Map
              </button>
              <button
                onClick={() => setActiveTab("streetview")}
                className={`pb-2 ${activeTab === "streetview" ? "border-b-2 border-primary text-black" : "text-gray"}`}
              >
                Street View
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}

        </div>
      </div>

      {/* Full Screen Carousel */}
      {isCarouselOpen && (
        <FullScreenCarousel
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setIsCarouselOpen(false)}
        />
      )}
    </>
  );
}
