import AboutHero from "@/app/components/about/AboutHero";
import AboutStats from "@/app/components/about/AboutStats";
import AboutMission from "@/app/components/about/AboutMission";
import AboutAgentsShowcase from "@/app/components/about/AboutAgentsShowcase";
import AboutMarkets from "@/app/components/about/AboutMarkets";
import AboutJoinCta from "@/app/components/about/AboutJoinCta";
import ValueProp from "@/app/components/home/ValueProp";
import IntentCards from "@/app/components/home/IntentCards";
import AppDownload from "@/app/components/home/AppDownload";

export default function AboutPage() {
  return (
    <div className="home-page">
      <AboutHero />
      <AboutStats />
      <main>
        <AboutMission />
        <ValueProp />
        <IntentCards />
        <AboutAgentsShowcase />
        <AboutMarkets />
        <AppDownload />
        <AboutJoinCta />
      </main>
    </div>
  );
}
