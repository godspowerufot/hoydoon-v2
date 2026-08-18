"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { HomeContainer } from "./Section";

const faqs = [
  {
    question: "What can I do on Hoydoon?",
    answer:
      "Search homes for sale and rent, compare listings, save properties, and connect with local agents across Nigeria and Somalia.",
  },
  {
    question: "Are there hidden fees?",
    answer:
      "No. Listing details and any fees are shown up front. If something is unclear, contact support before you commit.",
  },
  {
    question: "How does buying a property work?",
    answer:
      "Start with a search, shortlist homes, speak with an agent, complete due diligence, then close with the legal steps for your region.",
  },
  {
    question: "Do you list commercial properties?",
    answer:
      "Yes. Use the type filter on search to browse land and other non-residential listings where they are available.",
  },
  {
    question: "How do I reach support?",
    answer:
      "Email support@hoydoon.com or use the help center. We typically respond during business hours, Monday to Friday.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mt-12 pb-16 md:mt-16 md:pb-24" aria-labelledby="faq-heading">
      <HomeContainer>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="mt-3 text-3xl font-semibold leading-tight text-[#111] md:text-4xl"
            >
              Questions, answered clearly
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#5f5f5f] md:text-lg">
              Straight answers about listings, fees, and how to get help, without
              the runaround.
            </p>
          </div>

          <div className="divide-y divide-[#ececec] overflow-hidden rounded-2xl border border-[#ececec] bg-white">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div key={faq.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-[#111] transition-colors duration-200 hover:bg-[#fafafa] md:px-6 md:py-5 md:text-lg"
                    >
                      {faq.question}
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4] text-[#111]">
                        {isOpen ? (
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="px-5 pb-5 text-sm leading-relaxed text-[#5f5f5f] md:px-6 md:text-base"
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </HomeContainer>
    </section>
  );
}
