"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Headphones,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/share/1YwJpJwiGT/?mibextid=wwXIfr",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/hoydoon/",
    label: "Instagram",
  },
  {
    href: "https://x.com/hoydoon_?s=11&t=nIieHzDuZ8BAPHDnr6Ikcw",
    label: "X",
  },
  {
    href: "https://www.linkedin.com/company/hoydoon/about/?viewAsMember=true",
    label: "LinkedIn",
  },
];

const METHODS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+234 704 305 8500",
    description:
      "Chat with our customer service team about listings, the app, or finding an agent.",
    href: "https://wa.me/2347043058500",
    external: true,
    action: "Start chat",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@hoydoon.com",
    description:
      "Send us questions about your account, a listing, or general platform support.",
    href: "mailto:support@hoydoon.com",
    external: false,
    action: "Send email",
  },
  {
    icon: Headphones,
    title: "Help center",
    value: "Guides & FAQs",
    description:
      "Browse step-by-step articles for buyers, renters, sellers, and agents.",
    href: "/helpcenter",
    external: false,
    action: "Browse articles",
  },
];

export default function ContactMethods() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {METHODS.map((method) => {
        const Icon = method.icon;
        return (
          <article
            key={method.title}
            className="flex h-full flex-col rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3fbfb]">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {method.title}
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-[#111]">
              {method.value}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c5c66] md:text-base">
              {method.description}
            </p>
            <Link
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-[#07757c]"
            >
              {method.action}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </article>
        );
      })}

      <article className="flex h-full flex-col rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)] md:col-span-2 lg:col-span-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3fbfb]">
          <Share2 className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Social
        </p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-[#111]">
          Connect with us
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c5c66] md:text-base">
          Follow Hoydoon for product updates, market insights, and community
          stories across Nigeria and beyond.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-full border border-[#ececec] px-4 text-sm font-medium text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
