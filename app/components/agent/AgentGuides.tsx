import Image from "next/image";
import Link from "next/link";
import { HomeContainer, SectionHeader, TextLink } from "../home/Section";

const guides = [
  {
    slug: "do-i-need-real-estate-agent",
    imageSrc: "/webp/3.webp",
    title: "Do I need a real estate agent to buy a home?",
    readTime: "3 min read",
    date: "March 2025",
    description:
      "When an agent is worth it, what they actually do, and how to decide if you should go it alone.",
  },
  {
    slug: "report-listing-problem",
    imageSrc: "/webp/6.webp",
    title: "How do I report a problem with a listing?",
    readTime: "3 min read",
    date: "March 2025",
    description:
      "Flag inaccurate details or policy issues on a listing and learn what happens after you submit a report.",
  },
];

export default function AgentGuides() {
  return (
    <section className="home-bleed bg-[#f7f7f8] py-14 md:py-20" aria-labelledby="agent-guides-heading">
      <HomeContainer>
        <SectionHeader
          headingId="agent-guides-heading"
          eyebrow="Agent guides"
          title="Work with someone who knows the market"
          description="Short reads on agents, listings, and what to expect when you connect with a local professional."
          action={<TextLink href="/helpcenter">Browse help center</TextLink>}
          align="between"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {guides.map((guide) => (
            <article key={guide.slug}>
              <Link
                href={`/article/${guide.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,17,17,0.08)]"
              >
                <div className="relative h-56 overflow-hidden md:h-64">
                  <Image
                    src={guide.imageSrc}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#8a8a8a]">
                    {guide.date} · {guide.readTime}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-[#111] group-hover:text-primary">
                    {guide.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                    {guide.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </HomeContainer>
    </section>
  );
}
