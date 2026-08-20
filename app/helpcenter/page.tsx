"use client";

import { useMemo, useState } from "react";
import { articles } from "@/constants";
import { HomeContainer, SectionHeader } from "../components/home/Section";
import {
  filterArticles,
  HelpCenterArticleCard,
  HelpCenterHero,
  HelpCenterPagination,
  HelpCenterSupportCta,
  HELP_CATEGORIES,
  type HelpArticle,
} from "../components/helpcenter";

const ARTICLES = articles as HelpArticle[];
const ARTICLES_PER_PAGE = 9;

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All topics");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () => filterArticles(ARTICLES, query, category),
    [query, category]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * ARTICLES_PER_PAGE;
  const pageArticles = filtered.slice(start, start + ARTICLES_PER_PAGE);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
    setQuery("");
  };

  return (
    <div className="home-page">
      <HelpCenterHero query={query} onQueryChange={handleQueryChange} />

      <main className="home-bleed bg-[#f7f7f8] py-14 md:py-20">
        <HomeContainer>
          <SectionHeader
            headingId="help-articles-heading"
            eyebrow="Browse topics"
            title="Help articles"
            description="Search by keyword or filter by topic to find step-by-step guides for buyers, renters, agents, and sellers."
          />

          <div
            className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1"
            role="tablist"
            aria-label="Article categories"
          >
            {HELP_CATEGORIES.map((item) => {
              const selected = category === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => handleCategoryChange(item)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "bg-primary text-white"
                      : "border border-[#ececec] bg-white text-[#5c5c66] hover:border-primary hover:text-primary"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <p className="mb-6 text-sm text-[#5c5c66] md:text-base">
            Showing{" "}
            <span className="font-semibold text-[#111]">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "article" : "articles"}
            {query ? (
              <>
                {" "}
                for &ldquo;<span className="font-medium text-[#111]">{query}</span>
                &rdquo;
              </>
            ) : null}
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#e4e4e4] bg-white px-6 py-16 text-center">
              <h3 className="font-heading text-xl font-semibold text-[#111]">
                No articles found
              </h3>
              <p className="mt-2 text-base text-[#5c5c66]">
                Try a different keyword or browse all topics.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["listing", "rent", "buy", "agent"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleQueryChange(term)}
                    className="rounded-full border border-[#ececec] bg-[#f7f7f8] px-4 py-2 text-sm capitalize text-[#5c5c66] hover:border-primary hover:text-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <ul className="guide-articles-grid list-none p-0 m-0">
                {pageArticles.map((article) => (
                  <li key={article.id}>
                    <HelpCenterArticleCard article={article} />
                  </li>
                ))}
              </ul>

              <HelpCenterPagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </>
          )}
        </HomeContainer>
      </main>

      <HelpCenterSupportCta />
    </div>
  );
}
