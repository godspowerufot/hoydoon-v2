import Image from 'next/image';

interface PropertyCardProps {
  imageSrc: string;
  altText: string;
  price: number | string;
  area: string;
  fontFamily?: string; // Optional prop
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  imageSrc,
  altText,
  price,
  area,
  fontFamily = 'font-bricolage',
}) => {
  return (
    <div className={`flex flex-col h-[500px] lg:w-[32%] ${fontFamily} snap-center shrink-0`}>
      <Image
        alt={altText}
        width={300}
        height={400}
        src={imageSrc}
        className="rounded-lg w-full"
      />
      <span className="mt-4 text-black">
        <span className="flex gap-3">
          <h4 className="text-gray font-light">From</h4>
          <h2 className="font-bold">${price}</h2>
        </span>
        <h4 className="text-gray font-light"> {area} Area from 190 - 245 m²</h4>
        </span>
    </div>
  );
};

export default PropertyCard;
