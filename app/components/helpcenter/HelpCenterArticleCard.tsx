import Image from "next/image";
import Link from "next/link";
import type { HelpArticle } from "./helpCenterUtils";

export default function HelpCenterArticleCard({
  article,
}: {
  article: HelpArticle;
}) {
  return (
    <article className="guide-article-card h-full">
      <Link
        href={`/article/${article.slug}`}
        prefetch={false}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,17,17,0.08)]"
      >
        <div className="relative h-52 overflow-hidden md:h-56">
          <Image
            src={article.imageSrc}
            alt={article.altText || article.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 767px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {article.articleType}
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-[#8a8a8a]">
            {article.date} · {article.readTime}
          </p>
          <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-[#111] group-hover:text-primary md:text-xl">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5f5f5f] md:text-base">
            {article.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function HelpCenterArticleSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ececec] bg-white">
      <div className="shimmer h-52 md:h-56" />
      <div className="space-y-3 p-5">
        <div className="shimmer h-3 w-24 rounded" />
        <div className="shimmer h-3 w-32 rounded" />
        <div className="shimmer h-6 w-full rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-4/5 rounded" />
      </div>
    </div>
  );
}
