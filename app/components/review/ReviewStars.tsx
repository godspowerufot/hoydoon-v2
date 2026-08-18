import { Star } from "lucide-react";

export default function ReviewStars({
  rating = 0,
  size = "md",
}: {
  rating?: number;
  size?: "sm" | "md";
}) {
  const full = Math.floor(rating || 0);
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${iconClass} ${
            index < full
              ? "fill-primary text-primary"
              : "fill-[#e6e6e6] text-[#e6e6e6]"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
