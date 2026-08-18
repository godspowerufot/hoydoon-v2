"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import HelpCenterSubHero from "@/app/components/helpcenter/HelpCenterSubHero";
import { HomeContainer } from "@/app/components/home/Section";
import SellHomeForm from "./SellHomeForm";
import SellHomeAside from "./SellHomeAside";
import type { AgentListing } from "@/app/components/agent/AgentCard";

export default function SellHomePageClient() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: agents, isLoading, refetch } = useGetAgentsQuery({});
  const agentList = (Array.isArray(agents) ? agents : []) as AgentListing[];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("phone", phoneNumber);
      formData.append("requestType", "agent");
      formData.append(
        "message",
        description || `I want to sell my home. Address: ${address}`
      );

      const res = await fetch("/api/find-agent", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setFullName("");
        setEmail("");
        setAddress("");
        setPhoneNumber("");
        setDescription("");
        toast.success("Request sent — an agent will reach out soon.");
      } else {
        const data = await res.json();
        toast.error(data.message || "Submission failed");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Submission failed";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="home-page">
      <HelpCenterSubHero
        eyebrow="Sell with Hoydoon"
        title="Find an agent to sell your home"
        description="Tell us about your property and we'll connect you with trusted local agents — usually within one business day."
        imageSrc="/new-image/sell-wallpaper.jpg"
        imageAlt="Homeowner meeting with a real estate agent"
        imagePosition="object-[center_28%]"
        breadcrumbs={[
          { href: "/sell", label: "Sell" },
          { label: "Find an agent" },
        ]}
      />

      <main className="home-bleed bg-[#f7f7f8] py-12 md:py-16">
        <HomeContainer>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
            <SellHomeForm
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              address={address}
              setAddress={setAddress}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              description={description}
              setDescription={setDescription}
              submitting={submitting}
              onSubmit={handleSubmit}
            />
            <SellHomeAside agents={agentList} isLoading={isLoading} />
          </div>
        </HomeContainer>
      </main>
    </div>
  );
}
