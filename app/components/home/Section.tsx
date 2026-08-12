import type { ReactNode } from "react";

export function HomeContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`home-container ${className}`.trim()}>{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "start",
  headingId,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "start" | "between";
  headingId?: string;
}) {
  return (
    <div
      className={`mb-8 flex flex-col gap-4 md:mb-10 ${
        align === "between"
          ? "md:flex-row md:items-end md:justify-between"
          : ""
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="text-3xl font-heading font-semibold leading-tight tracking-tight text-[#111] md:text-4xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[#5f5f5f] md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-200 hover:text-[#076b72] md:text-base"
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}
