import type { Metadata } from "next";
import HelpCenterSubHero from "@/app/components/helpcenter/HelpCenterSubHero";
import ReviewPageClient from "@/app/components/review/ReviewPageClient";

export const metadata: Metadata = {
  title: "Reviews | Hoydoon",
  description:
    "Read verified reviews from buyers, renters, and sellers who found homes and agents on Hoydoon across Nigeria, Kenya, and Somalia.",
  alternates: {
    canonical: "https://www.hoydoon.com/review",
  },
  openGraph: {
    title: "Reviews | Hoydoon",
    description:
      "Read verified reviews from buyers, renters, and sellers who found homes and agents on Hoydoon.",
    url: "https://www.hoydoon.com/review",
    siteName: "Hoydoon",
    type: "website",
  },
};

export default function ReviewPage() {
  return (
    <div className="home-page">
      <HelpCenterSubHero
        eyebrow="Community"
        title="Reviews"
        description="See what buyers, renters, and sellers are saying about finding homes and agents on Hoydoon."
        imageSrc="/new-image/reviews-hero.jpg"
        imageAlt="Happy couple reviewing their new home"
        imagePosition="object-[50%_40%] md:object-[50%_35%]"
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Reviews" }]}
        quality={72}
      />
      <ReviewPageClient />
    </div>
  );
}
