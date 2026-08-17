"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { Mail, MapPin, Phone } from "lucide-react";
import BrandLogo from "../common/BrandLogo";

const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/agent", label: "Find an agent" },
  { href: "/search", label: "Search homes" },
];

const COMPANY = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/helpcenter", label: "Articles" },
  { href: "/helpcenter/submit-request", label: "Help center" },
  { href: "/review", label: "Reviews" },
];

const LEGAL = [
  { href: "/terms", label: "Terms of use" },
  { href: "/policy", label: "Privacy policy" },
];

const SOCIAL = [
  {
    href: "https://www.instagram.com/hoydoon/",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://www.facebook.com/share/1YwJpJwiGT/?mibextid=wwXIfr",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    href: "https://www.linkedin.com/company/hoydoon/about/?viewAsMember=true",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: "https://x.com/hoydoon_?s=11&t=nIieHzDuZ8BAPHDnr6Ikcw",
    label: "X",
    icon: XIcon,
  },
];

function FooterLink({ href, children }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const className =
    "text-sm text-white/70 transition-colors duration-200 hover:text-white";

  if (isExternal) {
    return (
      <a href={href} className={className} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function LinkColumn({ title, links }) {
  return (
    <div>
      <p className="font-heading text-sm font-semibold tracking-tight text-white">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.href + item.label}>
            <FooterLink href={item.href}>{item.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Appfooter() {
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/auth");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        toast.success(data.message || "You're subscribed.");
        setEmail("");
      } else {
        setStatus("error");
        toast.error(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      toast.error("Subscription failed. Please try again.");
    }
  };

  if (hideFooter) return null;

  return (
    <footer className="relative left-0 ml-0 w-screen max-w-[100vw] bg-[#0e3d40] font-manrope text-white">
      <div className="home-container py-14 md:py-20">
        <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-8 md:flex-row md:items-end md:justify-between md:px-10 md:py-10">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Newsletter
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
              New listings, in your inbox
                  </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65 md:text-base">
              Get a weekly roundup of homes for sale and rent across Nigeria,
              Somalia, and Kenya.
            </p>
          </div>

                  <form
                    onSubmit={handleSubscribe}
            className="flex w-full max-w-md items-center rounded-full border border-white/20 bg-white/5 p-1.5"
                  >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
                    <input
              id="footer-email"
                      type="email"
              placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/45 md:text-base"
                      required
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
              className="h-11 shrink-0 rounded-full bg-white px-5 text-sm font-semibold text-[#0e3d40] transition-colors duration-200 hover:bg-[#f3f3f3] disabled:opacity-60"
                    >
              {status === "loading" ? "Sending" : "Subscribe"}
                    </button>
                  </form>
              </div>

        <div className="mt-14 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <BrandLogo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Homes for sale and rent in Nigeria, Somalia, and Kenya, verified
              listings, local agents, and a search that stays out of the way.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/45" />
                <span>5, Elshadai Street, Erunwen, Ogun State</span>
                    </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-white/45" />
                <a
                  href="tel:+2347043058500"
                  className="transition-colors duration-200 hover:text-white"
                >
                  +234 704 305 8500
                      </a>
                    </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-white/45" />
                      <a
                        href="mailto:support@hoydoon.com"
                  className="transition-colors duration-200 hover:text-white"
                >
                  support@hoydoon.com
                      </a>
                    </li>
                  </ul>
                </div>

          <div className="lg:col-span-2">
            <LinkColumn title="Explore" links={EXPLORE} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn title="Company" links={COMPANY} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn title="Legal" links={LEGAL} />
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <p className="font-heading text-sm font-semibold tracking-tight text-white">
              Get the app
            </p>
            <div className="mt-4 flex flex-col items-start gap-2.5">
                      <a
                        href="https://apps.apple.com/us/app/hoydoon/id6736393320"
                        target="_blank"
                        rel="noopener noreferrer"
                className="transition-opacity duration-200 hover:opacity-90"
                      >
                        <Image
                          src="/app1.svg"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                        />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.hoydoon.app"
                        target="_blank"
                        rel="noopener noreferrer"
                className="transition-opacity duration-200 hover:opacity-90"
                      >
                        <Image
                          src="/app2.svg"
                          alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                        />
                      </a>
            </div>
            <p className="mt-6 font-heading text-sm font-semibold tracking-tight text-white">
              Follow
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <item.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Hoydoon. All rights reserved.
          </p>
          <p className="text-sm text-white/50">Nigeria · Somalia · Kenya</p>
          <div className="flex flex-wrap gap-5">
            {LEGAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
            </div>
          </div>
        </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 9H3.7v11.3h2.8V9zM5.1 3.7C4 3.7 3.2 4.5 3.2 5.6c0 1 .8 1.9 1.9 1.9 1.1 0 1.9-.9 1.9-1.9 0-1.1-.8-1.9-1.9-1.9zM20.3 13.2c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3.1 1.7V9H10.4c0 1.6 0 11.3 0 11.3h2.8v-6.3c0-.3 0-.7.1-1 .3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.6v6.2h2.8V13.2z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.2 3H21l-6.5 7.4L22 21h-6.2l-4.9-6.4L5.4 21H2.6l7-8L2 3h6.3l4.4 5.8L18.2 3zm-1.1 16.2h1.7L7 4.7H5.2l11.9 14.5z" />
    </svg>
  );
}
