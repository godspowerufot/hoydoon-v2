import type { Metadata } from "next";
import Link from "next/link";
import ArticleDetailsClient from "@/app/components/articles/ArticleDetailsClient";
import articles from "../../data/articles.json";

interface Section {
  heading?: string;
  paragraphs?: string[];
  paragraph2?: string;
  image?: string;
  listItems?: {
    title?: string;
    description?: string | string[];
  }[];
}

interface Article {
  id: string;
  slug: string;
  title: string;
  layoutType: string;
  heroImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  introSection?: {
    heading?: string;
    paragraph?: string | string[];
  }[];
  sections?: Section[];
  faqSection?: {
    heading?: string;
    paragraph?: string;
    faqs?: { question: string; answer: string | string[] }[];
  };
}

function getArticle(slug: string) {
  return (articles as unknown as Article[]).find((a) => a.slug === slug);
}

function getExcerpt(article: Article) {
  const intro = article.introSection?.[0]?.paragraph;
  if (Array.isArray(intro)) return intro[0];
  if (typeof intro === "string") return intro.replace(/<[^>]+>/g, "");
  return article.sections?.[0]?.paragraphs?.[0] || "Read this article on Hoydoon.";
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticle(id);

  if (!article) {
    return (
      <div className="listing-page pt-[5.25rem] lg:pt-24">
        <div className="home-container py-24 text-center">
          <h1 className="font-heading text-3xl font-semibold text-[#111]">
            Article not found
          </h1>
          <p className="mt-3 text-base text-[#5c5c66]">
            This guide may have moved or is no longer available.
          </p>
          <Link
            href="/helpcenter"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white"
          >
            Back to help center
          </Link>
        </div>
      </div>
    );
  }

  return <ArticleDetailsClient article={article} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);

  if (!article) {
    return {
      title: "Article Not Found | Hoydoon",
      description: "The requested article could not be found.",
    };
  }

  const excerpt = getExcerpt(article);

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || excerpt,
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
      description: article.metaDescription || excerpt,
      images: [
        article.heroImage ||
          "https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp",
      ],
    },
  };
}
