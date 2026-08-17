"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HelpCenterPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible =
    totalPages <= 7
      ? pages
      : pages.filter(
          (p) =>
            p === 1 ||
            p === totalPages ||
            Math.abs(p - currentPage) <= 1
        );

  return (
    <nav
      className="mt-12 flex flex-col items-center gap-4"
      aria-label="Article pagination"
    >
      <p className="text-sm text-[#5c5c66]">
        Page <span className="font-semibold text-[#111]">{currentPage}</span> of{" "}
        {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ececec] text-[#5c5c66] transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {visible.map((page, index) => {
          const prev = visible[index - 1];
          const showEllipsis = prev != null && page - prev > 1;
          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis ? (
                <span className="px-1 text-[#8a8a8a]">…</span>
              ) : null}
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "text-[#5c5c66] hover:bg-[#f7f7f8] hover:text-[#111]"
                }`}
              >
                {page}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ececec] text-[#5c5c66] transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
