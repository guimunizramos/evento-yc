import { useEffect } from "react";
import AmbientGlow from "@/components/incorporacao/AmbientGlow";
import CountdownBanner from "@/components/projetos/CountdownBanner";
import HeroSection from "@/components/projetos/HeroSection";
import BenefitsSection from "@/components/projetos/BenefitsSection";
import AudienceSection from "@/components/projetos/AudienceSection";
import AgendaSection from "@/components/projetos/AgendaSection";
import HostsSection from "@/components/projetos/HostsSection";
import CTASection from "@/components/projetos/CTASection";
import Footer from "@/components/Footer";

const Projetos = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Arquitetura na Prática | Consultoria Gratuita YouCon";
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

export default Projetos;
