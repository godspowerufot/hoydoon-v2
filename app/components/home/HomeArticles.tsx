import Image from "next/image";
import Link from "next/link";
import { HomeContainer, SectionHeader, TextLink } from "./Section";

const articles = [
  {
    id: "6",
    imageSrc: "/webp/6.webp",
    title: "How do I report a problem with a listing?",
    slug: "report-listing-problem",
    readTime: "3 min read",
    date: "March 2025",
    description:
      "Inaccurate details, policy issues, or something that does not look right — here is how to flag a listing and what happens next.",
  },
  {
    id: "3",
    imageSrc: "/webp/3.webp",
    title: "Do I need a real estate agent to buy a home?",
    slug: "do-i-need-real-estate-agent",
    readTime: "3 min read",
    date: "March 2025",
    description:
      "When an agent is worth it, what they actually do, and how to decide if you should go it alone.",
  },
];

export default function HomeArticles() {
  return (
    <section className="pb-20 md:pb-28" aria-labelledby="articles-heading">
      <HomeContainer>
        <SectionHeader
          headingId="articles-heading"
          eyebrow="Guides"
          title="Clear answers before you tour"
          description="Short reads on listings, agents, and the buying process — written for people making a real decision."
          action={<TextLink href="/helpcenter">Browse the help center</TextLink>}
          align="between"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.slug}>
              <Link
                href={`/article/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,17,17,0.08)]"
              >
                <div className="relative h-56 overflow-hidden md:h-64">
                  <Image
                    src={article.imageSrc}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#8a8a8a]">
                    {article.date} · {article.readTime}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-[#111] group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                    {article.description}
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
