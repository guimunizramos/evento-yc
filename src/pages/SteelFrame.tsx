import CountdownBanner from "@/components/steel-frame/CountdownBanner";
import HeroSection from "@/components/steel-frame/HeroSection";
import BenefitsSection from "@/components/steel-frame/BenefitsSection";
import AgendaSection from "@/components/steel-frame/AgendaSection";
import HostsSection from "@/components/steel-frame/HostsSection";
import CTASection from "@/components/steel-frame/CTASection";
import Footer from "@/components/Footer";

const SteelFrame = () => (
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

export default SteelFrame;
