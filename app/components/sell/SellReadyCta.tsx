import Image from "next/image";
import Link from "next/link";
import { HomeContainer } from "../home/Section";

export default function SellReadyCta() {
  return (
    <section className="py-12 md:py-16" aria-labelledby="sell-ready-heading">
      <HomeContainer>
        <div className="grid overflow-hidden rounded-3xl bg-[#0f3d40] md:grid-cols-2">
          <div className="relative min-h-[260px] md:min-h-[420px]">
            <Image
              src="/sell-1.png"
              alt="Home ready to list with Hoydoon"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-10 text-white md:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Ready to sell
            </p>
            <h2
              id="sell-ready-heading"
              className="mt-3 font-heading text-3xl font-semibold leading-tight md:text-4xl"
            >
              Maximize your home&apos;s value without the stress
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
              Schedule a consultation and we will help you list, market, and
              close with a local agent who knows your neighborhood.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sell/sell-home"
                className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0f3d40] transition-colors duration-200 hover:bg-[#f3f3f3]"
              >
                Schedule a consult
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
