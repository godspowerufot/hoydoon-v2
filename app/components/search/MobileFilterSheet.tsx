"use client";

import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useEffect } from "react";

type MobileFilterSheetProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  subtitle?: string;
  tall?: boolean;
};

export default function MobileFilterSheet({
  open,
  title,
  onClose,
  children,
  footer,
  subtitle,
  tall = false,
}: MobileFilterSheetProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[1110] bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed inset-x-0 bottom-0 z-[1111] flex flex-col rounded-t-[1.75rem] bg-white shadow-[0_-12px_40px_rgba(17,17,17,0.14)] ${
          tall ? "max-h-[92dvh]" : "max-h-[88dvh]"
        }`}
      >
        <div className="flex shrink-0 justify-center pt-3">
          <span className="h-1 w-10 rounded-full bg-[#e5e5e5]" aria-hidden="true" />
        </div>
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#ececec] px-5 py-3">
          <div className="min-w-0">
            <h3 className="font-heading text-lg font-semibold text-[#111]">{title}</h3>
            {subtitle ? (
              <p className="mt-0.5 text-sm text-[#5c5c66]">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7f7f8] text-[#111]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 py-4">
          {children}
        </div>
        {footer ? (
          <div className="shrink-0 border-t border-[#ececec] bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {footer}
          </div>
        ) : null}
      </div>
    </>,
    document.body
  );
}

function SheetOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] transition-colors ${
        selected
          ? "bg-[#ecfafa] font-semibold text-primary"
          : "text-[#2a2a33] hover:bg-[#f7f7f8]"
      }`}
    >
      {label}
      {selected ? (
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          Selected
        </span>
      ) : null}
    </button>
  );
}

export { SheetOption };
