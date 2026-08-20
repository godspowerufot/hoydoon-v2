"use client";

import Link from "next/link";
import HelpCenterSubHero from "../components/helpcenter/HelpCenterSubHero";
import { ContactAgentCta, ContactMethods } from "../components/contact";
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

      <ContactAgentCta />
    </div>
  );
}
