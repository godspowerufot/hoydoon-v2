'use client'

import React from 'react';
import { Bed, Bath, Home, ArrowUpRight } from 'lucide-react';

interface PropertyCardProps {
  imageSrc?: string;
  altText?: string;
  price?: number | string;
  area?: number | string;
  description?: string;
  title?: string;
  address?: string;
  bathrooms?: number;
  bedrooms?: number;
  squareFeet?: number;
  houseType?: string;
  rent?: string;
  listingType?: string;
  _id?: string;
  region?: string;
  landSize?: number | string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  imageSrc = '',
  altText = 'Property image',
  price = 180000,
  area = 1200,
  description = 'This beautifully presented one-bedroom flat offers a bright living space,...',
  title = 'Gp inn',
  address = 'Luxury Oasis',
  bathrooms = 1,
  bedrooms = 1,
  squareFeet = 1200,
}) => {
  const formatPrice = (price: number | string) => {
    if (typeof price === 'number') {
      return `₦${price.toLocaleString()}`;
    }
    return price;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-lg">
      {/* Image Section */}
      <div className="relative w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 rounded-lg"></div>
            <div className="absolute bottom-8 left-8 w-16 h-12 bg-white/30 rounded-lg"></div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>

        {/* Price and Area */}
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(price)}
          </span>
          <span className="text-gray-500 text-lg">/mth</span>
          <span className="ml-auto text-gray-400 text-base">
            Area from {area}
          </span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-6 mb-6 text-gray-500">
          <div className="flex items-center gap-2">
            <Bed className="w-6 h-6" />
            <span className="text-base">{bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-6 h-6" />
            <span className="text-base">{bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6" />
            <span className="text-base">{squareFeet}sq.</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-base mb-6 leading-relaxed">
          {description}
        </p>

        {/* Address Button */}
        <div className="flex items-center justify-between">
          <button className="flex-1 bg-teal-50 hover:bg-teal-100 text-gray-700 text-lg font-medium py-4 px-6 rounded-full transition-colors">
            {address}
          </button>
          <button className="ml-4 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full transition-colors">
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

