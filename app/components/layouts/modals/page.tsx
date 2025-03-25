"use client";
import Image from "next/image";
type PropertyGalleryModalProps= {
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyGalleryModal({ isOpen, onClose }: PropertyGalleryModalProps) {
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
      <div className="bg-white w-11/12 md:w-3/4 lg:w-5/6 py-5 px-[4rem] shadow-lg relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          ✕
        </button>
        <div className="flex border-b mb-3 ">
      {/* Tabs */}
      <div className="flex space-x-6">
        <button className="border-b-2 border-primary text-black pb-2">Photos</button>
        <button className="text-gray pb-2">Map</button>
        <button className="text-gray pb-2">Street view</button>
      </div>

      {/* Icons (aligned right) */}
      <div className="ml-auto mb-3 flex space-x-2">
      <div className="flex pl-[33rem] 2xl:pl-[50rem] items-center gap-2">
        <div className="p-2 border border-[#8F8F8F] rounded-md">
        <Image src="/favorite.png" alt="Favorite" width={16} height={16} className="w-4 h-4" />
        </div>
        <div className="p-2 border border-[#8F8F8F] rounded-md">
        <Image src="/upload.png" alt="Download" width={16} height={16} className="w-4 h-4" />
        </div>
        <div className="p-2 border border-[#8F8F8F] rounded-md">
        <Image src="/image2.png" alt="Share" width={16} height={16} className="w-4 h-4" />
        </div>
      </div>
    </div>
    </div>
        {/* Title */}

        {/* Flexbox Layout for Images */}
        <div className="space-y-3 mt-[2rem]">
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
