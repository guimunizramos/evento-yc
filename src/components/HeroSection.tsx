import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/bg-desktop.jpg";
import heroImageMobile from "@/assets/bg-mobile.jpg";
import youconLogo from "@/assets/youcon-logo.png";
const HeroSection = () => {
  const mobileBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateParallax = () => {
      const mobileBg = mobileBgRef.current;

      if (!mobileBg || !mobileQuery.matches || reducedMotionQuery.matches) {
        if (mobileBg) {
          mobileBg.style.transform = "translate3d(0, 0, 0)";
        }
        return;
      }

      const offset = window.scrollY * 0.22;
      mobileBg.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);
  const scrollToForm = () => {
    document.getElementById('cta-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex flex-col py-8 md:py-[95px] overflow-hidden">
    {/* Header with Logo */}
    <header className="relative z-20 md:py-6 py-6">
      <div className="container mx-auto px-4 md:px-6 items-center justify-center flex flex-row">
        <img src={youconLogo} alt="YouCon Arquitetura" className="h-8 md:h-12" />
      </div>
    </header>

    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-fixed will-change-transform"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-label="Casa de alto padrão com Estrutura Metálica"
      />
      <div
        ref={mobileBgRef}
        className="block md:hidden absolute -inset-y-16 inset-x-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${heroImageMobile})` }}
        aria-label="Casa de alto padrão com Estrutura Metálica"
      />
      <div className="absolute inset-0 bg-background/75" />
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-transparent to-background" />
    </div>

    {/* Content */}
    <div className="container mx-auto md:px-6 relative z-10 flex-1 py-0 flex-row px-6 flex items-center justify-center">
      <div className="max-w-4xl text-center flex-col flex items-center justify-center">
        {/* Tag */}
        <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/30 mb-3 md:mb-8">
          <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider">CONSULTORIA EXCLUSIVA YOUCON</span>
        </div>

        {/* H1 */}
        <h1 className="max-w-[20rem] sm:max-w-[38rem] md:max-w-[48rem] lg:max-w-[56.25rem] text-[1.75rem] sm:text-[2.15rem] md:text-[2.75rem] lg:text-[3.35rem] xl:text-[3.75rem] font-bold text-foreground leading-[1.1] md:leading-[1.08] tracking-[-0.02em] mb-4 md:mb-6">
          <span className="block text-primary">Antes de Construir:</span>
          <span className="block mx-auto max-w-[20rem] sm:max-w-[36rem] md:max-w-[48rem] lg:max-w-[56.25rem] text-balance">
            Descubra os Erros que Podem Encarecer <span className="whitespace-nowrap">Sua Obra</span>
          </span>
        </h1>

        {/* H2 */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-2xl">
          Participe de uma consultoria gratuita com o arquiteto Thiago Cardim e entenda como evitar decisões que geram desperdícios, retrabalhos e custos inesperados na construção da sua casa.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 w-full">
          <Button variant="hero" size="xl" onClick={scrollToForm} className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14">
            GARANTIR MEU ACESSO GRATUITO
          </Button>
        </div>

        {/* Sub-CTA text */}
        <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
          Consultoria ao Vivo
        </p>
      </div>
    </div>
  </section>;
};
export default HeroSection;
