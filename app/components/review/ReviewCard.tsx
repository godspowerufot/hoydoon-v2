import Image from "next/image";
import ReviewStars from "./ReviewStars";

export type ReviewItem = {
  _id?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
  user?: {
    fullname?: string;
    pictureUrl?: string;
  };
};

export function ReviewCardSkeleton() {
  return (
    <article
      className="rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)]"
      aria-hidden="true"
    >
      <div className="shimmer h-4 w-24 rounded" />
      <div className="shimmer mt-4 h-20 w-full rounded" />
      <div className="mt-6 flex items-center gap-3 border-t border-[#f0f0f0] pt-4">
        <div className="shimmer h-11 w-11 rounded-full" />
        <div className="shimmer h-4 w-28 rounded" />
      </div>
    </article>
  );
}

export default function ReviewCard({ review }: { review: ReviewItem }) {
  const name = review.user?.fullname || "Hoydoon user";
  const comment =
    review.comment?.trim() || "Great experience finding a home on Hoydoon.";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)] transition-shadow hover:shadow-[0_12px_32px_rgba(17,17,17,0.08)]">
      <ReviewStars rating={review.rating || 0} />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#3f3f3f] md:text-[15px]">
        &ldquo;{comment}&rdquo;
      </blockquote>
      <footer className="mt-5 flex items-center gap-3 border-t border-[#f0f0f0] pt-4">
        <Image
          src={review.user?.pictureUrl || "/Avatar.svg"}
          alt=""
          width={44}
          height={44}
          loading="lazy"
          sizes="44px"
          className="h-11 w-11 rounded-full object-cover bg-[#e8e8e8]"
        />
        <div>
          <p className="text-sm font-semibold text-[#111]">{name}</p>
          <p className="text-xs text-[#8a8a8a]">Verified review</p>
        </div>
      </footer>
    </article>
  );
}
