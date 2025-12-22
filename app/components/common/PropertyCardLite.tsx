import React from 'react';

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
      {/* Image Section - Disabled */}

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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
            </svg>
            <span className="text-base">{bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span className="text-base">{bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

