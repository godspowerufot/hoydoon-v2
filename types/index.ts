export interface Property {
  imageUrls?: { url?: string; altText?: string }[];
  listingType?: string;
  _id?: string;
  item?: {
    price?: string;
    squareFeet?: number;
    bathrooms?: number;
    bedrooms?: number;
    description?: string;
    title?: string;
    rent?: string;
    region?: string;
    petFriendly: boolean;
    landSize?: number | string;
  };
}
