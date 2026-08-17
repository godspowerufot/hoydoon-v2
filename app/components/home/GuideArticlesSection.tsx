import Image from "next/image";
import Link from "next/link";
import { HomeContainer, SectionHeader, TextLink } from "./Section";
import { sharedGuides } from "./guideArticles";

type GuideArticlesSectionProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export default function GuideArticlesSection({
  headingId,
  eyebrow,
  title,
  description,
  className = "",
}: GuideArticlesSectionProps) {
  return (
    <section
      className={`home-bleed w-full bg-[#f7f7f8] py-14 md:py-20 ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <HomeContainer>
        <SectionHeader
          headingId={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={<TextLink href="/helpcenter">Browse help center</TextLink>}
          align="between"
        />

        <ul className="guide-articles-grid list-none p-0 m-0">
          {sharedGuides.map((guide) => (
            <li key={guide.slug} className="guide-article-card">
              <Link
                href={`/article/${guide.slug}`}
                prefetch={false}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,17,17,0.08)]"
              >
                <div className="relative h-56 overflow-hidden md:h-64">
                  <Image
                    src={guide.imageSrc}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#8a8a8a]">
                    {guide.date} · {guide.readTime}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-[#111] group-hover:text-primary">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
                    {guide.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </HomeContainer>
    </section>
  );
}
