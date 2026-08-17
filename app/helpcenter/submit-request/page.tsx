"use client";

import HelpCenterSubHero from "../../components/helpcenter/HelpCenterSubHero";
import SubmitRequestForm from "../../components/helpcenter/SubmitRequestForm";
import { HomeContainer } from "../../components/home/Section";

export default function SubmitRequestPage() {
  return (
    <div className="home-page">
      <HelpCenterSubHero
        title="Submit a request"
        description="Tell us what's going on and our support team will follow up, usually within one business day."
        imageSrc="/new-image/submit-request.jpg"
        imageAlt="Support team member ready to help"
        imagePosition="object-[50%_28%] md:object-[50%_22%]"
      />

      <main className="home-bleed bg-[#f7f7f8] py-12 md:py-16">
        <HomeContainer>
          <SubmitRequestForm />
        </HomeContainer>
      </main>
    </div>
  );
}
