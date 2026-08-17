export type GuideArticle = {
  slug: string;
  imageSrc: string;
  title: string;
  readTime: string;
  date: string;
  description: string;
};

/** Single source of truth — always exactly 3 articles, same on every page. */
export const sharedGuides: GuideArticle[] = [
  {
    slug: "do-i-need-real-estate-agent",
    imageSrc: "https://hoydoonstorage.blob.core.windows.net/web-images/3.webp",
    title: "Do I need a real estate agent to buy a home?",
    readTime: "3 min read",
    date: "March 2025",
    description:
      "When an agent is worth it, what they actually do, and how to decide if you should go it alone.",
  },
  {
    slug: "report-listing-problem",
    imageSrc: "https://hoydoonstorage.blob.core.windows.net/web-images/6.webp",
    title: "How do I report a problem with a listing?",
    readTime: "3 min read",
    date: "March 2025",
    description:
      "Flag inaccurate details or policy issues on a listing and learn what happens after you submit a report.",
  },
  {
    slug: "avoid-home-buying-mistakes",
    imageSrc: "https://hoydoonstorage.blob.core.windows.net/web-images/art18.webp",
    title: "Common home-buying mistakes to avoid",
    readTime: "3 min read",
    date: "March 2025",
    description:
      "Budget gaps, skipped inspections, and emotional offers can cost you. Learn the pitfalls first-time buyers miss most often.",
  },
];

export const buyGuides = sharedGuides;
export const rentGuides = sharedGuides;
export const sellGuides = sharedGuides;
export const agentGuides = sharedGuides;
export const homeGuides = sharedGuides;
