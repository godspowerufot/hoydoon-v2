import Link from "next/link";
import { Building2, Calendar, Home, Store, HelpCircle } from "lucide-react";
import { HomeContainer } from "../home/Section";

const CATEGORIES = [
  {
    label: "Get started",
    href: "/sell/sell-home",
    icon: Calendar,
  },
  {
    label: "Find an agent",
    href: "/agent",
    icon: Building2,
  },
  {
    label: "Agent marketplace",
    href: "/agent/all-agent",
    icon: Store,
  },
  {
    label: "Homes for sale",
    href: "/search?listingType=sale",
    icon: Home,
  },
  {
    label: "Help center",
    href: "/helpcenter",
    icon: HelpCircle,
  },
];

export default function SellCategoryChips() {
  return (
    <section
      className="border-b border-[#ececec] bg-white py-5 md:py-6"
      aria-label="Selling shortcuts"
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
