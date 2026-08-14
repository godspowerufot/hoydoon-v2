"use client";

import {
  SellHero,
  SellCategoryChips,
  SellPaths,
  SellReadyCta,
  SellGuides,
} from "../components/sell";

export default function SellPage() {
  return (
    <div className="home-page">
      <SellHero />
      <SellCategoryChips />

      <main>
        <SellPaths />
        <SellReadyCta />
        <SellGuides />
      </main>
    </div>
  );
}
