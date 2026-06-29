import CountdownBanner from "@/components/incorporacao/CountdownBanner";
import HeroSection from "@/components/incorporacao/HeroSection";
import BenefitsSection from "@/components/incorporacao/BenefitsSection";
import AgendaSection from "@/components/incorporacao/AgendaSection";
import HostsSection from "@/components/incorporacao/HostsSection";
import CTASection from "@/components/incorporacao/CTASection";
import Footer from "@/components/Footer";

const Incorporacao = () => (
  <main className="min-h-screen bg-background pt-[64px] md:pt-[56px]">
    <CountdownBanner />
    <HeroSection />
    <BenefitsSection />
    <AgendaSection />
    <HostsSection />
    <CTASection />
    <Footer />
  </main>
);

export default Incorporacao;
