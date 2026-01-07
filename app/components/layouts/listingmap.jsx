"use client";
import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import Link from "next/link";
import Image from "next/image";
import { formatPrice, encodeId } from "@/utils";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = "a618b8ba2def9141";

function MapPopup({ property, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // robustly handle images from property.images (objects/strings) or property.image (string)
  const images = property.images && property.images.length > 0 ? property.images : [property.image];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper to get URL and Alt from image entry
  const getImageUrl = (img) => img?.url || img || "/house1.png";
  const getImageAlt = (img) => img?.altText || property.title || "Property";

  return (
    <div className="w-[320px] overflow-y-auto overflow-x-hidden bg-white rounded-2xl shadow-xl font-bricolage animate-in fade-in zoom-in duration-300">
      <div className="relative h-[180px] w-full group shrink-0">
        {/* Sliding Carousel Container */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((img, index) => (
            <div key={index} className="relative w-full h-full shrink-0">
              <Image
                src={getImageUrl(img)}
                alt={getImageAlt(img)}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm transition-all z-10"
            >
              <FaChevronLeft size={10} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm transition-all z-10"
            >
              <FaChevronRight size={10} />
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full backdrop-blur-sm transition-colors z-10"
        >
          <FaTimes size={10} />
        </button>

        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-full backdrop-blur-sm z-10">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      <div className="p-3 w-[87%]">
        <div className="flex justify-between items-start mb-1.5">
          <div>
            <h3 className="font-bold text-base text-black leading-tight mb-0.5">
              {property.region ? formatPrice(property.region, Number(property.price)) : `$${property.price}`}
            </h3>
            <p className="text-gray-500 text-[10px] truncate max-w-[170px]">{property.title}</p>
          </div>
        </div>

        <div className="flex gap-3 text-gray-600 text-[10px] mb-3">
          <div className="flex items-center gap-1">
            <Image src="/bed.png" alt="Icon" width={14} height={14} />
            <span>{property.bedrooms || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/bath.png" alt="Icon" width={14} height={14} />
            <span>{property.bathrooms || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/home.png" alt="Icon" width={14} height={14} />
            <span>{property.area || 0} sqft</span>
          </div>
        </div>

        <Link
          href={`/rent/${encodeId(property._id)}`}
          className="block w-full text-center bg-[#09858D] hover:bg-[#077279] text-white py-1.5 rounded-lg text-xs font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

function InnerMap({ coordinates }) {
  const map = useMap();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const safeCoordinates = Array.isArray(coordinates)
    ? coordinates
    : [coordinates];

  const mainLocation =
    safeCoordinates.length > 0 &&
      !isNaN(safeCoordinates[0]?.latitude) &&
      !isNaN(safeCoordinates[0]?.longitude)
      ? { lat: safeCoordinates[0].latitude, lng: safeCoordinates[0].longitude }
      : { lat: 6.5244, lng: 3.3792 };

  useEffect(() => {
    if (!map) return;
    map.setZoom(14);
    map.panTo(mainLocation);
  }, [map, coordinates]);

  return (
    <>
      <Map
        defaultZoom={13}
        defaultCenter={mainLocation}
        mapId={MAP_ID}
        style={{ width: "100%", height: "400px", borderRadius: "1rem" }}
        disableDefaultUI={true}
        gestureHandling={"greedy"}
        reuseMaps={true}
        onClick={() => setSelectedProperty(null)}
      >
        {safeCoordinates.map((coord, i) =>
          coord?.latitude && coord?.longitude ? (
            <React.Fragment key={i}>
              <AdvancedMarker
                position={{ lat: coord.latitude, lng: coord.longitude }}
                className="custom-marker"
                onClick={() => setSelectedProperty(coord)}
              >
                <div className={`relative group cursor-pointer transition-all duration-300 ${selectedProperty === coord ? 'scale-125 z-10' : 'hover:scale-110'}`}>
                  <div className={`w-12 h-12 rounded-full border-2 ${selectedProperty === coord ? 'border-[#09858D]' : 'border-white'} shadow-lg overflow-hidden !bg-transparent`}>
                    {coord.image ? (
                      <img
                        src={coord.image}
                        alt={coord.title || "Property"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#09858D] flex items-center justify-center text-white text-xs font-bold">
                        H
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white shadow-sm"></div>
                </div>
              </AdvancedMarker>
            </React.Fragment>
          ) : null
        )}

        {selectedProperty && (
          <InfoWindow
            position={{ lat: selectedProperty.latitude, lng: selectedProperty.longitude }}
            onCloseClick={() => setSelectedProperty(null)}
            pixelOffset={[0, -50]}
            headerDisabled={true}
            className="!p-0 !overflow-hidden !bg-none !rounded-2xl"
          >
            <MapPopup property={selectedProperty} onClose={() => setSelectedProperty(null)} />
          </InfoWindow>
        )}
      </Map>
    </>
  );
}

/**
 * @param {{ coordinates?: any[], listings?: any[] }} props
 */
export default function MapComponent({ coordinates = [], listings = [] }) {
  const mapData = listings?.length
    ? listings
      .map((item) => ({
        latitude: item.item?.coordinate?.latitude,
        longitude: item.item?.coordinate?.longitude,
        image: item.imageUrls?.[0]?.url,
        images: item.imageUrls || [],
        price: item.item?.price,
        title: item.item?.title,
        bedrooms: item.item?.bedrooms,
        bathrooms: item.item?.bathrooms,
        area: item.item?.squareFeet,
        _id: item._id,
        description: item.item?.description,
        region: item.region,
        listingData: item,
      }))
      .filter((coord) => coord?.latitude && coord?.longitude)
    : coordinates;

  return (
    <APIProvider apiKey={API_KEY}>
      <style jsx global>{`
        .gm-style-iw-c {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .gm-style-iw-d {
          overflow: auto !important;
          background: transparent !important;
          max-height: none !important;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .gm-style-iw-d::-webkit-scrollbar {
          display: none;
        }
        .gm-style .gm-style-iw-t::after {
          display: none !important;
        }
        button.gm-ui-hover-effect {
          display: none !important;
        }
      `}</style>
      <InnerMap coordinates={mapData} />
    </APIProvider>
  );
}
