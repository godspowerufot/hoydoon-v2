import Image from "next/image";
import Link from "next/link";
import { HomeContainer, SectionHeader } from "../home/Section";

const MARKETS = [
  {
    name: "Nigeria",
    body: "Lagos, Abuja & beyond",
    href: "/search?region=nigeria&listingType=sale",
    image: "/new-image/nigeria.jpg",
  },
  {
    name: "Kenya",
    body: "Nairobi & growing cities",
    href: "/search?region=kenya&listingType=sale",
    image: "/new-image/kenya.jpg",
  },
  {
    name: "Somalia",
    body: "Mogadishu & coastal markets",
    href: "/search?region=somalia&listingType=sale",
    image: "/new-image/somalia.jpg",
  },
];

export default function AboutMarkets() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="about-markets-heading">
      <HomeContainer>
        <SectionHeader
          headingId="about-markets-heading"
          eyebrow="Where we operate"
          title="Built for Africa's key property markets"
          description="Search verified homes and connect with local agents in the countries we know best."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {MARKETS.map((market) => (
            <Link
              key={market.name}
              href={market.href}
              className="group relative block h-72 overflow-hidden rounded-3xl md:h-80"
            >
              <Image
                src={market.image}
                alt={`Homes in ${market.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 transition-opacity group-hover:from-black/80"
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-heading text-2xl font-semibold text-white md:text-3xl">
                  {market.name}
                </p>
                <p className="mt-1 text-sm text-white/80">{market.body}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-white/90 underline-offset-4 group-hover:underline">
                  Browse listings →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </HomeContainer>
    </section>
  );
}
