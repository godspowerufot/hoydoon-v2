import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "./Section";

export default function SellCta() {
  return (
    <section className="py-12 md:py-16" aria-labelledby="sell-heading">
      <HomeContainer>
        <div className="grid overflow-hidden rounded-3xl bg-[#0f3d40] md:grid-cols-2">
          <div className="relative min-h-[260px] md:min-h-[420px]">
            <Image
              src="/about-us.png"
              alt="Bright living room in a home ready to list"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-10 text-white md:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Selling
            </p>
            <h2
              id="sell-heading"
              className="mt-3 text-3xl font-semibold leading-tight md:text-4xl"
            >
              List with an agent who knows your market
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
              Get in front of serious buyers on Hoydoon. Share your property
              details and we&apos;ll help you take the next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sell"
                className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0f3d40] transition-colors duration-200 hover:bg-[#f3f3f3]"
              >
                Sell your home
              </Link>
              <Link
                href="/agent"
                className="inline-flex h-11 items-center rounded-full border border-white/40 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Find an agent
              </Link>
            </div>
          </div>
        </div>
      </HomeContainer>
    </section>
  );
}
