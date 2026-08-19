import Image from "next/image";
import { Globe2, HeartHandshake, Sparkles } from "lucide-react";
import { HomeContainer, SectionHeader } from "../home/Section";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Trust first",
    body: "Honest listings, clear information, and respectful interactions on every search.",
  },
  {
    icon: Sparkles,
    title: "Always improving",
    body: "Smart tools and thoughtful design that make every step feel simpler than the last.",
  },
  {
    icon: Globe2,
    title: "Locally rooted",
    body: "Built for the markets we serve with agents and insights that actually know your city.",
  },
];

export default function AboutMission() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="about-mission-heading">
      <HomeContainer>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#e8e8e8] shadow-[0_20px_60px_rgba(17,17,17,0.1)] lg:aspect-auto lg:min-h-[540px]">
            <Image
              src="/new-image/about-2.jpg"
              alt="Couple taking a selfie in their new home"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm font-medium text-white/90">
                &ldquo;We&apos;re not just a marketplace, we&apos;re a community
                where people find places that feel like home.&rdquo;
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              headingId="about-mission-heading"
              eyebrow="Our mission"
              title="Empowering every property journey"
              description="Hoydoon is an all-in-one platform for buyers, renters, sellers, and agents. Whether it's your first apartment or your next investment, we bring clarity, confidence, and the right people to the table."
            />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#5c5c66] md:text-base">
              <p>
                We blend intuitive technology with real local insight so you can
                search, compare, and connect without the usual friction.
              </p>
              <p>
                Our leadership champions bold ideas and inclusive growth because
                innovation only matters when it helps real people move forward.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
          {VALUES.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_30px_rgba(17,17,17,0.04)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f6f6] text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-[#c7c7c7]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#111] md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c5c66] md:text-[15px]">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </HomeContainer>
    </section>
  );
}
