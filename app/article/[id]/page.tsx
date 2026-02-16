import type { Metadata } from "next";
import GridLayout from "../../components/articles/layouts/GridLayout";
import HelpCenterLayout from "../../components/articles/layouts/HelpCenterLayout";

import articles from "../../data/articles.json"; // or fetch from API

// Define types for Article structure based on usage
interface Section {
  heading?: string;
  paragraphs?: string[];
}

interface Article {
  id: string;
  slug: string;
  title: string;
  layoutType: string;
  heroImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  sections?: Section[];
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = (articles as unknown as Article[]).find((a) => a.slug === id);

  if (!article) return <div>Article not found</div>;

  const { layoutType } = article;

  const renderLayout = () => {
    switch (layoutType) {
      case "general":
        return <GridLayout pageData={article} />;
      case "listing":
        return <HelpCenterLayout PageData={article} />;

      default:
        return <div>No layout defined</div>;
    }
  };

  return <>{renderLayout()}</>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = (articles as unknown as Article[]).find((a) => a.slug === id);

  if (!article) {
    return {
      title: "Article Not Found | Hoydoon",
      description: "The requested article could not be found.",
    };
  }

  // Safe access helper
  const firstParagraph =
    article.sections?.[0]?.paragraphs?.[0] || "Read this article on Hoydoon.";

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || firstParagraph,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || firstParagraph,
      images: [
        {
          url:
            article.heroImage ||
            "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle || article.title,
      description: article.metaDescription || firstParagraph,
      images: [
        article.heroImage ||
        "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
      ],
    },
  };
}
