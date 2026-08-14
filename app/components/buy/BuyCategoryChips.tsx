import Link from "next/link";
import { Building2, Crown, DoorOpen, Home, Sparkles, Tag } from "lucide-react";
import { HomeContainer } from "../home/Section";

const CATEGORIES = [
  {
    label: "All homes",
    href: "/search?listingType=sale",
    icon: Home,
  },
  {
    label: "Affordable",
    href: "/search?category=affordable&listingType=sale",
    icon: Tag,
  },
  {
    label: "Luxury",
    href: "/search?category=luxury&listingType=sale",
    icon: Crown,
  },
  {
    label: "Open houses",
    href: "/search?category=open-house&listingType=sale",
    icon: DoorOpen,
  },
  {
    label: "New listings",
    href: "/search?category=upcoming&listingType=sale",
    icon: Sparkles,
  },
  {
    label: "Find an agent",
    href: "/agent",
    icon: Building2,
  },
];

export default function BuyCategoryChips() {
  return (
    <section
      className="border-b border-[#ececec] bg-white py-5 md:py-6"
      aria-label="Browse homes by category"
    >
      <HomeContainer>
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar md:flex-wrap md:justify-center">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.label}
                href={category.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#e5e7eb] bg-[#fafafa] px-4 py-2.5 text-sm font-medium text-[#2a2a33] transition-all duration-200 hover:border-primary/30 hover:bg-[#f3fbfb] hover:text-primary"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {category.label}
              </Link>
            );
          })}
        </div>
      </HomeContainer>
    </section>
  );
}
