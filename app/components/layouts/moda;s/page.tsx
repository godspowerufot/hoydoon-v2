"use client";
import Image from "next/image";

export default function PropertyGalleryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const images = [
    "/rentHomePage.png",
    "/rentHomePage.png",
    "/rentHomePage.png",
    "/rentHomePage.png",
    "/rentHomePage.png",
    "/rentHomePage.png",
    "/rentHomePage.png",
    "/rentHomePage.png",
    "/rentHomePage.png",
    "/rentHomePage.png",
    "/rentHomePage.png",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 p-6 shadow-lg relative max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Property Photos</h2>

        {/* Flexbox Layout for Images */}
        <div className="space-y-3">
          {/* Row 1: Two images, both taking 50% width */}
          <div className="flex gap-2">
            <Image src={images[0]} alt="Property 1" width={500} height={500} className="w-1/2 h-auto object-cover rounded-none" />
            <Image src={images[1]} alt="Property 2" width={500} height={500} className="w-1/2 h-auto object-cover rounded-none" />
          </div>

          {/* Row 2: Three images, each taking 33.33% width */}
          <div className="flex gap-2">
            <Image src={images[2]} alt="Property 3" width={500} height={500} className="w-1/3 h-auto object-cover rounded-none" />
            <Image src={images[3]} alt="Property 4" width={500} height={500} className="w-1/3 h-auto object-cover rounded-none" />
            <Image src={images[4]} alt="Property 5" width={500} height={500} className="w-1/3 h-auto object-cover rounded-none" />
          </div>

          {/* Row 3: One full-width image */}
          <div className="flex">
            <Image src={images[5]} alt="Property 6" width={1000} height={500} className="w-full h-auto object-cover rounded-none" />
          </div>

          {/* Row 4: Two images, each taking 50% width */}
          <div className="flex gap-2">
            <Image src={images[6]} alt="Property 7" width={500} height={500} className="w-1/2 h-auto object-cover rounded-none" />
            <Image src={images[7]} alt="Property 8" width={500} height={500} className="w-1/2 h-auto object-cover rounded-none" />
          </div>

          {/* Row 6: Three images, each taking 33.33% width */}
          <div className="flex gap-2">
            <Image src={images[10]} alt="Property 11" width={500} height={500} className="w-1/3 h-auto object-cover rounded-none" />
            <Image src={images[0]} alt="Property 12" width={500} height={500} className="w-1/3 h-auto object-cover rounded-none" />
            <Image src={images[1]} alt="Property 13" width={500} height={500} className="w-1/3 h-auto object-cover rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
