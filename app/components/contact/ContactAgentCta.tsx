import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { HomeContainer } from "../home/Section";

export default function ContactAgentCta() {
  return (
    <section
      className="home-bleed border-t border-[#ececec] bg-white py-14 md:py-16"
      aria-labelledby="contact-agent-heading"
    >
      <HomeContainer>
        <div className="overflow-hidden rounded-3xl border border-[#ececec] bg-[#0e3d40] shadow-[0_16px_48px_rgba(14,61,64,0.18)]">
          <div className="grid md:grid-cols-2">
            {/* Image — top on mobile, right on desktop */}
            <div className="relative order-1 min-h-[220px] md:order-2 md:min-h-[360px]">
              <Image
                src="/new-image/agent-wallpaper.jpg"
                alt="Real estate agent meeting with clients"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[50%_35%]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0e3d40] via-[#0e3d40]/25 to-transparent md:bg-gradient-to-l md:from-[#0e3d40] md:via-transparent md:to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            <div className="order-2 flex flex-col justify-center px-6 py-8 md:order-1 md:px-10 md:py-12 lg:px-12">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Looking for an agent?
              </p>
              <h2
                id="contact-agent-heading"
                className="mt-2 font-heading text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl"
              >
                Connect with a local expert
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75 md:text-base">
                Whether you&apos;re buying, renting, or selling, we&apos;ll match
                you with trusted professionals who know your market.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/agent"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0e3d40] transition-colors hover:bg-white/90 md:h-11"
                >
                  Find an agent
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/sell"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:h-11"
                >
                  Sell your home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </HomeContainer>
    </section>
  );
}
