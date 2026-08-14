import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "../home/Section";

const PATHS = [
  {
    eyebrow: "Personalized proposals",
    title: "Choose the right agent",
    body: "Share a few details and review local agents by pricing, services, and ratings before you commit.",
    href: "/sell/sell-home",
    cta: "Get started",
    image: "https://hoydoonstorage.blob.core.windows.net/web-images/sell1.webp",
  },
  {
    eyebrow: "Marketplace",
    title: "Browse agents directly",
    body: "Compare trusted professionals in your area and connect with someone who already knows your market.",
    href: "/agent/all-agent",
    cta: "Visit marketplace",
    image: "https://hoydoonstorage.blob.core.windows.net/web-images/sell2.webp",
  },
  {
    eyebrow: "List with Hoydoon",
    title: "Put your home in front of buyers",
    body: "Schedule a consultation and get listed where serious buyers are already searching.",
    href: "/sell/sell-home",
    cta: "Schedule a consult",
    image: "https://hoydoonstorage.blob.core.windows.net/web-images/sell3.webp",
  },
];

export default function SellPaths() {
  return (
    <section id="sell-paths" className="py-12 md:py-16" aria-labelledby="sell-paths-heading">
      <HomeContainer>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2
            id="sell-paths-heading"
            className="text-2xl font-semibold tracking-tight text-[#2a2a33] md:text-3xl"
          >
            Ways to sell on Hoydoon
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PATHS.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(20,20,30,0.06)]"
            >
              <div className="relative h-44">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-[#2a2a33]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c5c66]">
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#07757c]"
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
