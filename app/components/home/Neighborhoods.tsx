import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "./Section";

const COUNTRIES = [
  {
    name: "Nigeria",
    href: "/search?location=Nigeria&listingType=sale",
    image: "/new-image/nigeria.jpg",
    caption: "Homes for sale",
  },
  {
    name: "Somalia",
    href: "/search?location=Somalia&listingType=sale",
    image: "/new-image/somalia.jpg",
    caption: "Homes for sale",
  },
  {
    name: "Kenya",
    href: "/search?location=Kenya&listingType=sale",
    image: "/new-image/kenya.jpg",
    caption: "Homes for sale",
  },
];

export default function Neighborhoods() {
  return (
    <section className="py-12 md:py-16" aria-labelledby="countries-heading">
      <HomeContainer>
        <h2
          id="countries-heading"
          className="mb-6 text-2xl font-semibold tracking-tight text-[#2a2a33] md:text-3xl"
        >
          Explore homes by city
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {COUNTRIES.map((country) => (
            <Link
              key={country.name}
              href={country.href}
              className="group relative block h-64 overflow-hidden rounded-2xl md:h-80"
            >
              <Image
                src={country.image}
                alt={`${country.name} homes`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-2xl font-semibold">{country.name}</p>
                <p className="mt-1 text-sm text-white/85">{country.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </HomeContainer>
    </section>
  );
}
