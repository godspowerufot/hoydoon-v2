import Image from "next/image";
import { Star } from "lucide-react";

type Testimonial = {
  comment?: string;
  rating?: number;
  user?: { fullname?: string; pictureUrl?: string };
};

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial | null | undefined;
}) {
  if (!testimonial) return null;

  const { comment, rating, user } = testimonial;
  const fullStars = Math.floor(rating || 0);

  return (
    <article className="surface-card flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-card">
      <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
        &ldquo;{comment || "Great experience finding a home on Hoydoon."}&rdquo;
      </blockquote>

      <footer className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
        <Image
          src={user?.pictureUrl || "/Avatar.svg"}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {user?.fullname || "Anonymous User"}
          </p>
          <p className="text-xs text-muted-foreground">Verified renter</p>
        </div>
      </footer>
    </article>
  );
}
