import Image from "next/image";
import Link from "next/link";
interface ProfileCardProps {
  image: string;
  name: string;
  estate: string;
  priceRange: string;
  sales: number;
}

export const ProfileCard = ({ image, name, estate, priceRange, sales }: ProfileCardProps) => {
    return (


      <Link href="/agent/agent-description">
      <div className="p-6 flex gap-5 h-[250px] justify-start bg-[#ffffff]  w-[36rem] 2xl:w-[43.8rem]">
        <Image
          alt={name}
          src={image}
          width={200}
          height={200}
          className="rounded-full aspect-square object-cover"
        />
        <div className="mt-[2em] font-bricolage ml-[0.3em]">
          <h2 className="font-bricolage font-bold text-[1.3em] text-black">{name}</h2>
          <p className="text-[#8F8F8F] text-[1em] font-[400] w-[200px]">{estate}</p>
  
          <div className="mt-4">
            <p className="text-black text-[1em] font-[400] w-[280px]">
              <b>{priceRange}</b> <b className="text-[#8F8F8F] font-[400]">Price range</b>
            </p>
            <p className="text-black text-[1em] font-[400] w-[200px]">
              <b>{sales}</b> <b className="text-[#8F8F8F] font-[300]">Total sales</b>
            </p>
          </div>
        </div>
      </div>
      </Link>
    );
  };