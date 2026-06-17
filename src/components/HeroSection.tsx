import { Button } from "@/components/ui/button";
import heroImage from "@/assets/bg-desktop.jpg";
import heroImageMobile from "@/assets/bg-mobile.jpg";
import youconLogo from "@/assets/youcon-logo.png";
const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById('cta-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex flex-col py-8 md:py-[95px]">
    {/* Header with Logo */}
    <header className="relative z-20 md:py-6 py-6">
      <div className="container mx-auto px-4 md:px-6 items-center justify-center flex flex-row">
        <img src={youconLogo} alt="YouCon Arquitetura" className="h-8 md:h-12" />
      </div>
    </header>

    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <img src={heroImage} alt="Casa de alto padrão com Estrutura Metálica" className="hidden md:block w-full h-full object-cover" />
      <img src={heroImageMobile} alt="Casa de alto padrão com Estrutura Metálica" className="block md:hidden w-full h-full object-cover" />
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-4 md:mb-6">
          Da compra do Terreno ao Acabamento Final:{" "}
          <span className="text-primary">Financie sua Obra de Alto Padrão</span>
        </h1>

        {/* H2 */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-2xl">
          Descubra como alavancar seu patrimônio e tirar o seu projeto do papel com fluxo de caixa inteligente, taxas exclusivas e as melhores linhas de crédito do mercado.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 w-full">
          <Button variant="hero" size="xl" onClick={scrollToForm} className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14">
            GARANTIR MEU ACESSO GRATUITO
          </Button>
        </div>

        {/* Sub-CTA text */}
        <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
          Evento Online e Gratuito | Vagas Limitadas
        </p>
      </div>
    </div>
  </section>;
};
export default HeroSection;
