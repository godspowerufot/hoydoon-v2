"use client";
import Image from "next/image";
import { articles } from "@/constants";
import ArticleCard from "../components/common/articleLayout";
import { useState, useMemo } from "react";
import Pagination from "../components/common/pagination";

// Skeleton component for loading states
// Time Complexity: O(1) - renders fixed number of skeleton cards
const ArticleSkeleton = () => {
  return (
    <div className="space-y-4 w-full max-w-sm rounded-xl border border-gray-200 p-4 shadow-sm bg-white animate-pulse">
      <div className="h-48 rounded-md bg-gray-200" />
      <div className="h-4 rounded bg-gray-200 w-3/4" />
      <div className="h-4 rounded bg-gray-200 w-1/2" />
      <div className="h-3 rounded bg-gray-200 w-5/6" />
      <div className="flex space-x-2 mt-2">
        <div className="h-3 w-1/4 rounded bg-gray-200" />
        <div className="h-3 w-1/4 rounded bg-gray-200" />
        <div className="h-3 w-1/4 rounded bg-gray-200" />
      </div>
    </div>
  );
};

/**
 * Category mapping for article filtering
 * This object maps category names to article types for efficient filtering
 * Time Complexity: O(1) for lookups due to hash table implementation
 */
const CATEGORY_MAPPING: Record<string, string[]> = {
  "Landlord & Agents": [
    "Listing inquiries",
    "Listing Inquiries",
    "listing inquiries",
  ],
  "Buyers & Rentals": ["General", "general"],
  "Email Alerts": ["General", "general"],
  "Technical Assistance": [
    "Listing features",
    "Listing Features",
    "listing features",
  ],
  "Account Assistance": ["General", "general"],
  "Mobile Apps": ["General", "general"],
};

function SupportCategories({
  selectedCategory,
  onCategorySelect,
  isSearching,
}: {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  isSearching: boolean;
}) {
  const categories = [
    "Landlord & Agents",
    "Buyers & Rentals",
    "Email Alerts",
    "Technical Assistance",
    "Account Assistance",
    "Mobile Apps",
  ];

  return (
    <div className="hidden lg:grid w-[1230px] 2xl:w-[1580px] grid-cols-3 gap-4 p-4">
      {/* All Articles button - resets category filter */}
      <button
        onClick={() => onCategorySelect(null)}
        disabled={isSearching}
        className={`border text-xl font-[500] px-6 py-3 rounded-md transition-all duration-200 ${
          selectedCategory === null
            ? "bg-primary text-white border-primary"
            : "border-primary text-primary hover:bg-primary hover:text-white"
        } ${isSearching ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        All Articles
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          disabled={isSearching}
          className={`border text-xl font-[500] px-6 py-3 rounded-md transition-all duration-200 ${
            selectedCategory === category
              ? "bg-primary text-white border-primary"
              : "border-primary text-primary hover:bg-primary hover:text-white"
          } ${isSearching ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({
    location: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const articlesPerPage = 13;

  interface FormData {
    location: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  /**
   * Advanced Search Algorithm with Multiple Criteria
   * Time Complexity: O(n) where n is the number of articles
   * Space Complexity: O(k) where k is the number of matching articles
   *
   * This algorithm uses multiple search strategies:
   * 1. Exact title matching (highest priority)
   * 2. Partial title matching with word boundaries
   * 3. Article type matching
   * 4. Fuzzy matching for typos and partial words
   */
  const searchAndFilterArticles = useMemo(() => {
    let filteredArticles = [...articles];

    // Step 1: Category Filtering (if selected)
    // Time Complexity: O(n) - single pass through articles
    if (selectedCategory) {
      const categoryTypes = CATEGORY_MAPPING[selectedCategory] || [];
      filteredArticles = filteredArticles.filter((article) =>
        categoryTypes.some((type: string) =>
          article.articleType?.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // Step 2: Search Query Filtering
    // Time Complexity: O(n * m) where n = articles, m = average length of searchable text
    if (formData.location.trim()) {
      const query = formData.location.toLowerCase().trim();
      const queryWords = query.split(/\s+/); // Split by whitespace

      filteredArticles = filteredArticles.filter((article) => {
        const searchableText = [
          article.title || "",
          article.altText || "",
          article.articleType || "",
        ]
          .join(" ")
          .toLowerCase();

        // Strategy 1: Exact phrase matching (highest priority)
        if (searchableText.includes(query)) {
          return true;
        }

        // Strategy 2: All words must be present (word boundary matching)
        const allWordsPresent = queryWords.every((word) =>
          new RegExp(
            `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
            "i"
          ).test(searchableText)
        );

        if (allWordsPresent) {
          return true;
        }

        // Strategy 3: Fuzzy matching - at least 70% of words must match
        const matchingWords = queryWords.filter((word) =>
          searchableText.includes(word)
        );

        return matchingWords.length / queryWords.length >= 0.7;
      });

      // Step 3: Relevance Scoring and Sorting
      // Time Complexity: O(n log n) for sorting
      filteredArticles.sort((a, b) => {
        const aText = [a.title || "", a.altText || ""].join(" ").toLowerCase();
        const bText = [b.title || "", b.altText || ""].join(" ").toLowerCase();

        // Priority 1: Exact title match
        const aExactTitle = aText.includes(query) ? 1 : 0;
        const bExactTitle = bText.includes(query) ? 1 : 0;

        if (aExactTitle !== bExactTitle) {
          return bExactTitle - aExactTitle;
        }

        // Priority 2: Title starts with query
        const aStartsWith = aText.startsWith(query) ? 1 : 0;
        const bStartsWith = bText.startsWith(query) ? 1 : 0;

        if (aStartsWith !== bStartsWith) {
          return bStartsWith - aStartsWith;
        }

        // Priority 3: Word count in title (more matches = higher relevance)
        const aMatches = queryWords.filter((word) =>
          aText.includes(word)
        ).length;
        const bMatches = queryWords.filter((word) =>
          bText.includes(word)
        ).length;

        return bMatches - aMatches;
      });
    }

    return filteredArticles;
  }, [formData.location, selectedCategory]);

  // Calculate pagination for filtered results
  // Time Complexity: O(1) - simple arithmetic operations
  const totalPages = Math.ceil(
    searchAndFilterArticles.length / articlesPerPage
  );
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = searchAndFilterArticles.slice(startIndex, endIndex);

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    // Reset to first page when search query changes
    setCurrentPage(1);
  };

  /**
   * Search Handler with Loading State Management
   * Simulates API call delay for better UX
   */
  const handleSearch = async () => {
    setIsSearching(true);
    setCurrentPage(1); // Reset pagination

    // Simulate search delay (remove in production if not needed)
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSearching(false);
  };

  /**
   * Category Selection Handler
   * Resets search and pagination when category changes
   */
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setFormData({ location: "" }); // Clear search when changing category
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Search result statistics
  const searchStats = {
    total: articles.length,
    filtered: searchAndFilterArticles.length,
    hasQuery: formData.location.trim().length > 0,
    hasCategory: selectedCategory !== null,
  };

  return (
    <>
      <header className=" relative h-[40vh] lg:h-[60vh] items-center justify-center w-screen">
        {/* Background Image Div */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/article.webp')" }}
        >
          {/* Overlay Div */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z[-1]"></div>
        </div>

        {/* Content Section */}
        <div className="flex z-[1]  mt-[7rem] lg:mt-[12rem]  p-3 relative gap-6 justify-center items-center flex-col">
          {/* Main Heading */}

          {/* Large Screen Search Bar */}
          {/* Large Screen Search Bar */}
          <div className="hidden lg:flex justify-center items-center w-full">
            <div className="flex h-[3.5em] py-4 font-bricolage items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[35em]">
              {/* Transparent Full-Width Input */}
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="flex-1 bg-transparent placeholder:text-[1.2rem] text-black placeholder-gray-500 border-none outline-none pl-4 w-[36.3rem]"
                placeholder="Search articles..."
                disabled={isSearching}
              />

              {/* Search Button */}
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="relative mr-2 p-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-white before:via-white/30 before:to-white/10 before:p-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative bg-primary ml-[1em] p-2 3 w-[40px] h-[40px] rounded-full flex items-center justify-center">
                  {isSearching ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Image
                      alt="Search"
                      width={40}
                      loading="lazy"
                      height={40}
                      quality={100}
                      src={"/search.png"}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Small Screen Search Bar */}
          <div className="flex  lg:hidden justify-center items-center w-full px-1 py-1">
            <div className="flex  items-center w-full bg-white rounded-full h-[2.4em] px-2 py-1">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Search articles..."
                disabled={isSearching}
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="ml-2 bg-primary p-2 rounded-full flex items-center justify-center hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Image
                    alt="Search"
                    width={15}
                    height={15}
                    src="/search.png"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="2xl:-mb-[8rem] flex-col mt-[2rem] lg:mt-[3em] w-full font-bricolage lg:flex justify-center gap-4 2xl:gap-[1.5rem] flex-1 items-center">
        {/* Search Results Summary */}

        {/* Articles Grid or Loading State */}
        {isSearching ? (
          /* Loading Skeleton Grid */
          <div className="p-2 grid grid-row grid-cols-1 md:grid-cols-3 gap-7 place-items-center gap-y-6">
            {[...Array(6)].map((_, index) => (
              <ArticleSkeleton key={index} />
            ))}
          </div>
        ) : searchStats.filtered === 0 ? (
          /* No Results Found */
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <svg
                  className="mx-auto h-24 w-24 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 0a4 4 0 118 0M9 12H7a7 7 0 1114 0"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchStats.hasQuery
                  ? `We couldn't find any articles matching "${formData.location}". Try different keywords or browse categories below.`
                  : selectedCategory
                  ? `No articles found in "${selectedCategory}" category.`
                  : "No articles available at the moment."}
              </p>

              {/* Suggestions */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600">
                  Try these suggestions:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["property", "listing", "home", "rent", "buy"].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setFormData({ location: suggestion });
                          handleSearch();
                        }}
                        className="px-3 py-1 text-sm bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Articles Grid */
          <div className="p-2 grid grid-row grid-cols-1 md:grid-cols-3 gap-7 place-items-center gap-y-[3rem]">
            {currentArticles.map((article) => (
              <ArticleCard
                key={article.id}
                imageSrc={article.imageSrc}
                altText={article.altText}
                title={article.title}
                articleType={article.articleType}
                description={article?.description}
                readTime={article.readTime}
                date={article.date}
                id={article.id}
              />
            ))}
          </div>
        )}

        {/* Pagination - only show if there are results and not searching */}
        {!isSearching && searchStats.filtered > 0 && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            display={currentArticles.map((article) => article.id)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}

        <div className="w-full hidden lg:block mt-[3rem] mb-[2rem] h-[2px] bg-[#D9D9D9]" />

        {/* Support Categories */}
        <SupportCategories
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          isSearching={isSearching}
        />
      </section>
    </>
  );
}
