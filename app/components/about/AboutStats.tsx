import { HomeContainer } from "../home/Section";

const STATS = [
  { value: "3", label: "Countries served", detail: "Nigeria, Kenya & Somalia" },
  { value: "1000+", label: "Listings", detail: "Homes, rentals & land" },
  { value: "Verified", label: "Agent network", detail: "Local market experts" },
  { value: "Free", label: "To get started", detail: "Browse & connect" },
];

export default function AboutStats() {
  return (
    <section className="relative z-10 -mt-14 md:-mt-16" aria-label="Hoydoon at a glance">
      <HomeContainer>
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#ececec] bg-white p-4 shadow-[0_16px_48px_rgba(17,17,17,0.08)] md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#ececec] md:p-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-2 py-3 text-center md:px-6 md:py-8">
              <p className="font-heading text-2xl font-semibold tracking-tight text-primary md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#111] md:text-base">
                {stat.label}
              </p>
              <p className="mt-0.5 text-xs text-[#8a8a8a] md:text-sm">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </HomeContainer>
    </section>
  );
}
