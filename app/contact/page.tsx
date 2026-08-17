"use client";

import Image from "next/image";
import Link from "next/link";
import HelpCenterSubHero from "../components/helpcenter/HelpCenterSubHero";
import { ContactMethods } from "../components/contact";
import { HomeContainer, SectionHeader } from "../components/home/Section";

export default function ContactPage() {
  return (
    <div className="home-page">
      <HelpCenterSubHero
        eyebrow="Get in touch"
        title="Contact us"
        description="Our customer service team is here to help with listings, the app, and finding a trusted Hoydoon agent — available 8am to 5pm, seven days a week."
        imageSrc="/contact-us.png"
        imageAlt="Hoydoon customer service representative"
        imagePosition="object-[50%_35%] md:object-[50%_30%]"
      />

      <main className="home-bleed bg-[#f7f7f8] py-12 md:py-16">
        <HomeContainer>
          <SectionHeader
            headingId="contact-methods-heading"
            eyebrow="Reach us"
            title="How can we help?"
            description="Choose the channel that works best for you. For account or listing issues, submitting a request usually gets the fastest resolution."
          />

          <ContactMethods />

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/helpcenter/submit-request"
              className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-[#07757c]"
            >
              Submit a support request
            </Link>
            <Link
              href="/helpcenter"
              className="inline-flex h-11 items-center rounded-full border border-[#ececec] bg-white px-5 text-sm font-semibold text-[#2a2a33] transition-colors hover:border-primary hover:text-primary"
            >
              Visit help center
            </Link>
          </div>
        </HomeContainer>
      </main>

      <section className="home-bleed border-t border-[#ececec] bg-white py-14 md:py-16">
        <HomeContainer>
          <div className="grid overflow-hidden rounded-3xl bg-[#0f3d40] md:grid-cols-2">
            <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Looking for an agent?
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Connect with a local expert
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-white/80">
                Whether you&apos;re buying, renting, or selling, we&apos;ll match
                you with trusted professionals in your area.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/agent"
                  className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0f3d40] transition-colors hover:bg-white/90"
                >
                  Find an agent
                </Link>
                <Link
                  href="/sell"
                  className="inline-flex h-11 items-center rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Sell your home
                </Link>
              </div>
            </div>
            <div className="relative min-h-[240px] md:min-h-full">
              <Image
                src="/new-image/agent-wallpaper.jpg"
                alt="Real estate agent meeting with clients"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
          </div>
        </HomeContainer>
      </section>
    </div>
  );
}
