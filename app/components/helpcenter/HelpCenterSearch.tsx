"use client";

import { Search } from "lucide-react";

const SUGGESTIONS = ["listing", "rent", "agent", "report", "price"];

export default function HelpCenterSearch({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div className="pointer-events-auto w-full">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2 p-2 md:p-3"
          aria-label="Search help articles"
        >
          <label htmlFor="help-center-search" className="sr-only">
            Search articles
          </label>
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a8a8a]"
              aria-hidden="true"
            />
            <input
              id="help-center-search"
              type="search"
              enterKeyHint="search"
              placeholder="Search articles, topics, or keywords"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="h-12 w-full rounded-lg border-0 bg-transparent pl-11 pr-2 text-base text-[#2a2a33] placeholder:text-[#8a8a8a] md:h-14 md:text-lg"
            />
          </div>
        </form>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/70">
          Popular
        </span>
        {SUGGESTIONS.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onQueryChange(term)}
            className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm capitalize text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
