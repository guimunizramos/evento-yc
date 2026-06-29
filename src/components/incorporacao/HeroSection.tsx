import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/inc-hero-desktop.jpg";
import heroImageMobile from "@/assets/inc-hero-mobile.jpg";
import youconLogo from "@/assets/youcon-logo.png";

const HeroSection = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateParallax = () => {
      if (!bgRef.current || reducedMotionQuery.matches) return;
      bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0)`;
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => window.removeEventListener("scroll", updateParallax);
  }, []);

  const scrollToForm = () => document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col py-8 md:py-[95px] overflow-hidden">
      <header className="relative z-20 py-3 md:py-6">
        <div className="container mx-auto px-4 md:px-6 items-center justify-center flex flex-row">
          <img src={youconLogo} alt="YouCon Arquitetura" className="h-8 md:h-12" />
        </div>
      </header>

      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
          <img src={heroImage} alt="" className="hidden md:block w-full h-full object-cover" />
          <img src={heroImageMobile} alt="" className="block md:hidden w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="container mx-auto md:px-6 relative z-10 flex-1 py-0 flex-row px-6 flex items-start md:items-center justify-center pt-[60px] md:pt-0">
        <div className="max-w-4xl text-center flex-col flex items-center justify-center">
          <div className="inline-flex items-center px-2 py-1 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/30 -mt-1.5 mb-3 md:mt-0 md:mb-8">
            <span className="text-[0.6rem] md:text-sm font-semibold text-primary uppercase tracking-wider">CONVITE EXCLUSIVO YOUCON</span>
          </div>

          <h1 className="max-w-[20rem] sm:max-w-[38rem] md:max-w-[48rem] lg:max-w-[58rem] xl:max-w-[68rem] text-[28px] sm:text-[2.15rem] md:text-[2.75rem] lg:text-[3.4rem] xl:text-[4rem] font-bold text-foreground leading-[1.08] tracking-[-0.02em] mb-4 md:mb-6">
            Como transformar terrenos em <span className="text-primary">empreendimentos que constroem patrimônio</span>.
          </h1>

          <p className="text-[14px] md:text-[18px] text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-2xl">
            A <span className="text-foreground font-semibold">YouCon Arquitetura</span> convida você para uma consultoria exclusiva com{" "}
            <span className="text-foreground font-semibold">Thiago Cardim</span> e{" "}
            <span className="text-foreground font-semibold">Samuel Mosca</span> sobre incorporação imobiliária. Entenda como identificar o potencial de um terreno, estruturar um empreendimento e tomar decisões mais estratégicas para a construção de patrimônio.
          </p>

          <div className="flex flex-col items-center gap-4 w-full">
            <Button variant="hero" size="xl" onClick={scrollToForm} className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14">
              QUERO ENTENDER COMO FUNCIONA
            </Button>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
            Consultoria online e gratuita | Vagas limitadas
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
