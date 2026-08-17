export type HelpArticle = {
  id: string;
  imageSrc: string;
  altText: string;
  articleType: string;
  title: string;
  slug: string;
  readTime: string;
  date: string;
  description: string;
};

export const CATEGORY_MAPPING: Record<string, string[]> = {
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

export const HELP_CATEGORIES = [
  "All topics",
  "Landlord & Agents",
  "Buyers & Rentals",
  "Email Alerts",
  "Technical Assistance",
  "Account Assistance",
  "Mobile Apps",
] as const;

export function filterArticles(
  articles: HelpArticle[],
  query: string,
  category: string | null
): HelpArticle[] {
  let filtered = [...articles];

  if (category && category !== "All topics") {
    const categoryTypes = CATEGORY_MAPPING[category] || [];
    filtered = filtered.filter((article) =>
      categoryTypes.some((type) =>
        article.articleType?.toLowerCase().includes(type.toLowerCase())
      )
    );
  }

  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return filtered;

  const queryWords = trimmed.split(/\s+/);

  filtered = filtered.filter((article) => {
    const searchableText = [
      article.title,
      article.altText,
      article.articleType,
      article.description,
    ]
      .join(" ")
      .toLowerCase();

    if (searchableText.includes(trimmed)) return true;

    const allWordsPresent = queryWords.every((word) =>
      new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(
        searchableText
      )
    );
    if (allWordsPresent) return true;

    const matchingWords = queryWords.filter((word) =>
      searchableText.includes(word)
    );
    return matchingWords.length / queryWords.length >= 0.7;
  });

  filtered.sort((a, b) => {
    const aText = [a.title, a.altText].join(" ").toLowerCase();
    const bText = [b.title, b.altText].join(" ").toLowerCase();

    const aExact = aText.includes(trimmed) ? 1 : 0;
    const bExact = bText.includes(trimmed) ? 1 : 0;
    if (aExact !== bExact) return bExact - aExact;

    const aStarts = aText.startsWith(trimmed) ? 1 : 0;
    const bStarts = bText.startsWith(trimmed) ? 1 : 0;
    if (aStarts !== bStarts) return bStarts - aStarts;

    const aMatches = queryWords.filter((w) => aText.includes(w)).length;
    const bMatches = queryWords.filter((w) => bText.includes(w)).length;
    return bMatches - aMatches;
  });

  return filtered;
}
