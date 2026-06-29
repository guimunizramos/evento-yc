import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/sf-hero-desktop.jpg";
import heroImageMobile from "@/assets/sf-hero-mobile.jpg";
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

  const scrollToForm = () => {
    document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85svh] md:h-screen flex flex-col overflow-hidden py-8 md:py-[95px]">
      <header className="relative z-20 md:py-6 py-6">
        <div className="container mx-auto px-4 md:px-6 items-center justify-center flex flex-row">
          <img src={youconLogo} alt="YouCon Arquitetura" className="h-8 md:h-12" />
        </div>
      </header>

      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
          <img src={heroImage} alt="" className="hidden md:block w-full h-full object-cover" />
          <img src={heroImageMobile} alt="" className="block md:hidden w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      <div className="container mx-auto md:px-6 relative z-10 flex-1 py-0 flex-row px-6 flex items-center justify-center">
        <div className="max-w-4xl text-center flex-col flex items-center justify-center">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/30 mb-3 md:mb-8">
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider">CONVITE EXCLUSIVO YOUCON</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-4 md:mb-6">
            Existe um jeito mais inteligente, limpo e rápido de construir a sua casa.
          </h1>

          <p className="text-[18px] text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-2xl">
            A <span className="text-foreground font-semibold">YouCon Arquitetura</span> convida você para uma consultoria exclusiva com{" "}
            <span className="text-foreground font-semibold">Thiago Cardim</span> sobre uma tecnologia construtiva que vem revolucionando o alto padrão: o{" "}
            <span className="text-primary font-semibold">Light Steel Frame</span>.
            Entenda como esse sistema pode trazer mais velocidade, previsibilidade e qualidade para o seu projeto.
          </p>

          <div className="flex flex-col items-center gap-4 w-full">
            <Button variant="hero" size="xl" onClick={scrollToForm} className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14">
              QUERO CONHECER ESSA TECNOLOGIA
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
