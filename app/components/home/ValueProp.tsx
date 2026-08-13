import { Search, ShieldCheck, MessageCircle } from "lucide-react";
import Link from "next/link";
import { HomeContainer, SectionHeader } from "./Section";

const steps = [
  {
    icon: Search,
    title: "Search with intent",
    body: "Filter by city, price, beds, and listing type to surface homes that actually match how you live.",
  },
  {
    icon: ShieldCheck,
    title: "Review verified homes",
    body: "Every listing includes photos, size, and location details so you can compare options with confidence.",
  },
  {
    icon: MessageCircle,
    title: "Talk to an agent",
    body: "Reach a local professional when you are ready to tour, negotiate, or list a property of your own.",
  },
];

export default function ValueProp() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="how-hoydoon-works">
      <HomeContainer>
        <SectionHeader
          headingId="how-hoydoon-works"
          eyebrow="How it works"
          title="Find your next home without the noise"
          description="Simple tools, clear listings, and guidance from people who know the market, so the search does not become the hard part."
          action={
            <Link
              href="/search"
              className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-[#fff] transition-colors duration-200 hover:bg-[#07757c]"
            >
              Explore listings
            </Link>
          }
          align="between"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_30px_rgba(17,17,17,0.04)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f6f6] text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-[#b0b0b0]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#111]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                  {step.body}
                </p>
              </article>
            );
          })}
        </div>
      </HomeContainer>
    </section>
  );
}
