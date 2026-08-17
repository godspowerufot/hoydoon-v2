"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail } from "lucide-react";
import HelpCenterSubHero from "../helpcenter/HelpCenterSubHero";
import { HomeContainer } from "../home/Section";
import type { LegalPageContent, LegalSection } from "./legalContent";

type LegalPageLayoutProps = {
  content: LegalPageContent;
  relatedHref: string;
  relatedLabel: string;
};

function LegalSectionBlock({ section }: { section: LegalSection }) {
  if (section.image && !section.title && !section.paragraphs.length) {
    return (
      <div
        id={section.id}
        className="scroll-mt-28 overflow-hidden rounded-2xl bg-[#e8e8e8]"
      >
        <div className="relative aspect-[16/10] md:aspect-[2/1]">
          <Image
            src={section.image.src}
            alt={section.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 720px"
          />
        </div>
      </div>
    );
  }

  return (
    <section
      id={section.id}
      className="scroll-mt-28 border-t border-[#ececec] pt-10 first:border-t-0 first:pt-0"
    >
      {section.title ? (
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
          {section.title}
        </h2>
      ) : null}

      {section.paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="mt-4 text-base leading-relaxed text-[#5c5c66] md:text-lg"
        >
          {paragraph}
        </p>
      ))}

      {section.bullets?.length ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#5c5c66] md:text-lg">
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {section.image ? (
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl bg-[#e8e8e8] md:aspect-[2/1]">
          <Image
            src={section.image.src}
            alt={section.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 720px"
          />
        </div>
      ) : null}
    </section>
  );
}

function LegalSidebar({
  sections,
  relatedHref,
  relatedLabel,
}: {
  sections: LegalSection[];
  relatedHref: string;
  relatedLabel: string;
}) {
  const tocItems = sections.filter((section) => section.title);

  return (
    <aside className="space-y-5 lg:sticky lg:top-28">
      <div className="rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          On this page
        </p>
        <nav aria-label="Table of contents" className="mt-4">
          <ul className="space-y-1">
            {tocItems.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block rounded-xl px-3 py-2.5 text-sm leading-snug text-[#2a2a33] transition-colors hover:bg-[#f7f7f8] hover:text-primary"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
        <div className="bg-[#f3fbfb] px-6 py-5">
          <p className="font-heading text-lg font-semibold text-[#111]">
            Related document
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#5c5c66]">
            Review the companion policy that applies alongside this page.
          </p>
        </div>
        <div className="space-y-3 px-6 py-5">
          <Link
            href={relatedHref}
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#ececec] text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
          >
            {relatedLabel}
          </Link>
          <Link
            href="/helpcenter/submit-request"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-[#07757c]"
          >
            Submit a request
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default function LegalPageLayout({
  content,
  relatedHref,
  relatedLabel,
}: LegalPageLayoutProps) {
  return (
    <div className="home-page">
      <HelpCenterSubHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        imageSrc={content.heroImage}
        imageAlt={content.heroImageAlt}
        imagePosition={content.heroImagePosition}
      />

      <main className="home-bleed bg-[#f7f7f8] py-12 md:py-16">
        <HomeContainer>
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#6f6f78]">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 rounded-full px-1 py-1 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <span aria-hidden="true">/</span>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#2a2a33]">{content.title}</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <article className="min-w-0 rounded-3xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)] md:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#8a8a8a]">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  Last updated {content.lastUpdated}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {content.intro.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-[#5c5c66] md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 space-y-10">
                {content.sections.map((section) => (
                  <LegalSectionBlock key={section.id} section={section} />
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#ececec] bg-[#f7f7f8] p-5 md:p-6">
                <p className="text-sm font-semibold text-[#111] md:text-base">
                  Questions about this document?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#5c5c66] md:text-base">
                  Email{" "}
                  <a
                    href="mailto:support@hoydoon.com"
                    className="font-medium text-primary hover:text-[#07757c]"
                  >
                    support@hoydoon.com
                  </a>{" "}
                  or visit the help center for support.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="mailto:support@hoydoon.com"
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-[#07757c]"
                  >
                    <Mail className="h-4 w-4" />
                    Email support
                  </a>
                  <Link
                    href="/helpcenter"
                    className="inline-flex h-10 items-center rounded-full border border-[#ececec] bg-white px-4 text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
                  >
                    Help center
                  </Link>
                </div>
              </div>
            </article>

            <LegalSidebar
              sections={content.sections}
              relatedHref={relatedHref}
              relatedLabel={relatedLabel}
            />
          </div>
        </HomeContainer>
      </main>
    </div>
  );
}
