import { useEffect } from "react";
import AmbientGlow from "@/components/incorporacao/AmbientGlow";
import CountdownBanner from "@/components/incorporacao/CountdownBanner";
import HeroSection from "@/components/incorporacao/HeroSection";
import BenefitsSection from "@/components/incorporacao/BenefitsSection";
import AudienceSection from "@/components/incorporacao/AudienceSection";
import AgendaSection from "@/components/incorporacao/AgendaSection";
import HostsSection from "@/components/incorporacao/HostsSection";
import CTASection from "@/components/incorporacao/CTASection";
import Footer from "@/components/Footer";

const Incorporacao = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Workshop Incorporação | YouCon + SMH";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
  <main className="relative min-h-screen overflow-hidden bg-background pt-[64px] md:pt-[56px]">
    <AmbientGlow />
    <CountdownBanner />
    <HeroSection />
    <BenefitsSection />
    <AudienceSection />
    <AgendaSection />
    <HostsSection />
    <CTASection />
    <Footer />
  </main>
  );
};

export default Incorporacao;
