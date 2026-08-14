"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function NavSearchForm({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    const query = params.toString();
    router.push(query ? `/search?${query}` : "/search");
  };

  if (compact) {
    return (
      <form
        onSubmit={handleSearch}
        className={`flex h-10 min-w-0 flex-1 items-center rounded-full border border-[#ececec] bg-[#ffffff] pl-3 pr-1 shadow-[0_4px_14px_rgba(20,20,30,0.04)] ${className}`.trim()}
        role="search"
      >
        <Search className="h-3.5 w-3.5 shrink-0 text-[#8a8a8a]" aria-hidden="true" />
        <input
          type="search"
          name="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Search homes"
          className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm text-[#2a2a33] outline-none placeholder:text-[#8a8a8a]"
          aria-label="Search homes"
        />
        <button
          type="submit"
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[#fff]"
          aria-label="Search"
        >
          <Search className="h-3 w-3" />
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`hidden items-center rounded-full border border-[#ececec] bg-[#ffffff] pl-4 pr-1.5 shadow-[0_4px_14px_rgba(20,20,30,0.04)] lg:flex lg:h-11 lg:w-[260px] ${className}`.trim()}
      role="search"
    >
      <Search className="h-4 w-4 shrink-0 text-[#8a8a8a]" aria-hidden="true" />
      <input
        type="search"
        name="location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Search city or address"
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#2a2a33] outline-none placeholder:text-[#8a8a8a]"
        aria-label="Search homes"
      />
      <button
        type="submit"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[#fff] transition-colors hover:bg-[#07757c]"
        aria-label="Search"
      >
        <Search className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
