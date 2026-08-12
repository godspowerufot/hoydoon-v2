import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "./Section";

const INTENTS = [
  {
    title: "Buy a home",
    body: "Find verified listings, compare prices, and tour with a local agent.",
    href: "/buy",
    cta: "Search homes",
    image: "/authBanner.webp",
  },
  {
    title: "Sell a home",
    body: "See what your property could list for, then connect with an agent.",
    href: "/sell",
    cta: "Start selling",
    image: "/agentheader.png",
  },
  {
    title: "Rent a home",
    body: "Apartments and houses ready when you are — filter by beds and budget.",
    href: "/rent",
    cta: "Find rentals",
    image: "/afforable-2.png",
  },
];

export default function IntentCards() {
  return (
    <section className="home-bleed bg-[#f7f7f8] py-12 md:py-16" aria-labelledby="intent-heading">
      <HomeContainer>
          <h2
            id="intent-heading"
            className="mb-2 text-2xl font-semibold tracking-tight text-[#2a2a33] md:text-3xl"
          >
            Whether you&apos;re buying, selling, or renting
          </h2>
          <p className="mb-8 max-w-2xl text-base text-[#5c5c66]">
            We can help you move forward — search listings, talk to an agent, or
            list your home.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {INTENTS.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(20,20,30,0.06)]"
              >
                <div className="relative h-44">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2a2a33]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c5c66]">
                    {item.body}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex h-10 items-center rounded-full border border-primary px-4 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-[#fff]"
                  >
                    {item.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </HomeContainer>
    </section>
  );
}
