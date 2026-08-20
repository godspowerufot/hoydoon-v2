import { HomeContainer } from "../home/Section";

const STATS = [
  { value: "3", label: "Countries served", detail: "Nigeria, Kenya & Somalia" },
  { value: "1000+", label: "Listings", detail: "Homes, rentals & land" },
  { value: "Verified", label: "Agent network", detail: "Local market experts" },
  { value: "Free", label: "To get started", detail: "Browse & connect" },
];

export default function AboutStats() {
  return (
    <section className="relative z-10 -mt-10 pb-2 md:-mt-16 md:pb-0" aria-label="Hoydoon at a glance">
      <HomeContainer>
        <div className="grid grid-cols-2 gap-2.5 rounded-2xl border border-[#ececec] bg-white p-3 shadow-[0_16px_48px_rgba(17,17,17,0.08)] sm:gap-3 sm:p-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#ececec] md:p-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-1.5 py-2.5 text-center sm:px-2 sm:py-3 md:px-6 md:py-8">
              <p className="font-heading text-xl font-semibold tracking-tight text-primary sm:text-2xl md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-[#111] sm:mt-1 sm:text-sm md:text-base">
                {stat.label}
              </p>
              <p className="mt-0.5 hidden text-xs text-[#8a8a8a] sm:block md:text-sm">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </HomeContainer>
    </section>
  );
}
