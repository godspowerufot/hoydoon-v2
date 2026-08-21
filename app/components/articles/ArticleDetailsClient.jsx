"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import PropertyCard from "@/app/components/home/PropertyCard";
import { HomeContainer } from "@/app/components/home/Section";
import { articles as allArticles } from "@/constants";
import { flattenListings, handleShareClick, truncateDescription } from "@/utils";

function HtmlBlock({ html, className = "" }) {
  if (!html) return null;
  return (
    <div
      className={`article-prose ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function TextBlock({ content, className = "" }) {
  if (!content) return null;
  if (Array.isArray(content)) {
    return content.map((item, index) => (
      <HtmlBlock key={index} html={item} className={className} />
    ));
  }
  return <HtmlBlock html={content} className={className} />;
}

function ListItems({ items }) {
  if (!items?.length) return null;

  return (
    <ul className="mt-4 space-y-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="rounded-2xl border border-[#ececec] bg-[#f7f7f8] px-4 py-4 md:px-5"
        >
          {item.title ? (
            <p className="text-sm font-semibold text-[#111]">{item.title}</p>
          ) : null}
          {Array.isArray(item.description) ? (
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5c5c66] md:text-base">
              {item.description.map((desc, descIndex) => (
                <li key={descIndex}>
                  <HtmlBlock html={desc} />
                </li>
              ))}
            </ul>
          ) : (
            <TextBlock
              content={item.description}
              className="mt-2 text-sm leading-relaxed text-[#5c5c66] md:text-base"
            />
          )}
        </li>
      ))}
    </ul>
  );
}

function ArticleSection({ section, showImages = true }) {
  return (
    <section className="scroll-mt-28 border-t border-[#ececec] pt-10 first:border-t-0 first:pt-0">
      {section.heading ? (
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
          {section.heading}
        </h2>
      ) : null}

      <TextBlock
        content={section.paragraphs}
        className="mt-4 text-base leading-relaxed text-[#5c5c66] md:text-lg [&_b]:font-semibold [&_b]:text-[#2a2a33]"
      />

      <ListItems items={section.listItems} />

      <TextBlock
        content={section.paragraph2}
        className="mt-4 text-base leading-relaxed text-[#5c5c66] md:text-lg"
      />

      {section.image && showImages ? (
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl bg-[#e8e8e8] md:aspect-[2/1]">
          <Image
            src={section.image}
            alt={section.heading || "Article illustration"}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 720px"
          />
        </div>
      ) : null}
    </section>
  );
}

function ArticleSidebar({ currentSlug }) {
  const related = useMemo(
    () =>
      allArticles
        .filter((item) => item.slug !== currentSlug)
        .slice(0, 4),
    [currentSlug]
  );

  return (
    <aside className="space-y-5 lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
        <div className="bg-[#f3fbfb] px-6 py-5">
          <p className="font-heading text-lg font-semibold text-[#111]">
            Need more help?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#5c5c66]">
            Our support team can help with listings, accounts, and technical
            issues.
          </p>
        </div>
        <div className="space-y-3 px-6 py-5">
          <Link
            href="/helpcenter/submit-request"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-[#07757c]"
          >
            Submit a request
          </Link>
          <Link
            href="/helpcenter"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#ececec] text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
          >
            Browse help center
          </Link>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Keep reading
          </p>
          <h3 className="mt-2 font-heading text-lg font-semibold text-[#111]">
            Related articles
          </h3>
          <ul className="mt-4 space-y-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/article/${item.slug}`}
                  className="block rounded-xl px-3 py-3 text-sm leading-snug text-[#2a2a33] transition-colors hover:bg-[#f7f7f8] hover:text-primary"
                >
                  {truncateDescription(item.title, 12)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}

export default function ArticleDetailsClient({ article }) {
  const { data: allListings } = useGetAllListingsQuery({});
  const listings = useMemo(
    () => flattenListings(allListings?.listings || []).slice(0, 6),
    [allListings]
  );

  const intro = article?.introSection?.[0];
  const introLead = Array.isArray(intro?.paragraph)
    ? intro.paragraph.join(" ")
    : intro?.paragraph;

  return (
    <div className="listing-page pt-[5.25rem] lg:pt-24">
      <HomeContainer className="pb-16 md:pb-24">
        <nav className="flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#6f6f78]">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 rounded-full px-1 py-1 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <span aria-hidden="true">/</span>
            <Link href="/helpcenter" className="hover:text-primary">
              Help center
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2a2a33]">
              {truncateDescription(article.title, 8)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleShareClick}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#ececec] bg-white px-4 text-sm font-medium text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <article className="min-w-0">
            {article.heroImage ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#e8e8e8] md:aspect-[2/1]">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  style={
                    article.heroImagePosition
                      ? { objectPosition: article.heroImagePosition }
                      : undefined
                  }
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
            ) : null}

            <header className={article.heroImage ? "mt-8" : ""}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Hoydoon guide
              </p>
              <h1 className="mt-2 font-heading text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#111] md:text-4xl lg:text-[2.75rem]">
                {intro?.heading || article.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#8a8a8a]">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  3 min read
                </span>
              </div>
              {introLead ? (
                <TextBlock
                  content={intro?.paragraph}
                  className="mt-5 text-base leading-relaxed text-[#5c5c66] md:text-lg [&_b]:font-semibold [&_b]:text-[#2a2a33]"
                />
              ) : null}
            </header>

            <div className="mt-10 space-y-10">
              {article.sections?.map((section, index) => (
                <ArticleSection key={index} section={section} />
              ))}
            </div>

            {article.faqSection ? (
              <section className="mt-12 border-t border-[#ececec] pt-10">
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
                  {article.faqSection.heading}
                </h2>
                {article.faqSection.paragraph ? (
                  <p className="mt-3 text-base leading-relaxed text-[#5c5c66]">
                    {article.faqSection.paragraph}
                  </p>
                ) : null}
                <div className="mt-6 space-y-3">
                  {article.faqSection.faqs?.map((faq, index) => (
                    <details
                      key={index}
                      className="group overflow-hidden rounded-2xl border border-[#ececec] bg-white open:shadow-[0_8px_24px_rgba(17,17,17,0.04)]"
                    >
                      <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-[#111] md:text-base [&::-webkit-details-marker]:hidden">
                        {faq.question}
                      </summary>
                      <div className="border-t border-[#ececec] px-5 py-4 text-sm leading-relaxed text-[#5c5c66] md:text-base">
                        {Array.isArray(faq.answer) ? (
                          <ul className="list-disc space-y-2 pl-5">
                            {faq.answer.map((ans, ansIndex) => (
                              <li key={ansIndex}>{ans}</li>
                            ))}
                          </ul>
                        ) : (
                          faq.answer
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {listings.length > 0 ? (
              <section className="mt-14 border-t border-[#ececec] pt-12">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
                      Homes on Hoydoon
                    </h2>
                    <p className="mt-2 text-sm text-[#5c5c66] md:text-base">
                      Explore listings while you plan your next move.
                    </p>
                  </div>
                  <Link
                    href="/search"
                    className="hidden shrink-0 text-sm font-semibold text-primary hover:text-[#07757c] md:inline-flex"
                  >
                    See all
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                  {listings.map((listing, index) => (
                    <PropertyCard
                      key={listing._id || listing.slug || index}
                      listing={listing}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <ArticleSidebar currentSlug={article.slug} />
        </div>
      </HomeContainer>
    </div>
  );
}
