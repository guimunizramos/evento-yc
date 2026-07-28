import { Compass, LayoutDashboard, Sofa } from "lucide-react";
import VideoTerrainSection from "./VideoTerrainSection";

const benefits = [
  {
    icon: Compass,
    title: "Implantação inteligente",
    description: "Onde a casa se posiciona no terreno define insolação, ventilação, privacidade e aproveitamento da área externa.",
  },
  {
    icon: LayoutDashboard,
    title: "Planta bem resolvida",
    description: "Circulação, integração e proporção dos ambientes: o que faz uma casa parecer maior do que ela é.",
  },
  {
    icon: Sofa,
    title: "Interiores desde o início",
    description: "Quando arquitetura e interiores são projetados juntos, a casa nasce pronta para ser vivida — sem retrabalho depois.",
  },
];

const BenefitsSection = () => (
  <section className="relative py-10 md:py-20 lg:py-28">
    <div className="relative container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
          O que um bom projeto consegue <span className="text-primary">extrair de um terreno</span>?
        </h2>
        <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Dois terrenos idênticos podem virar casas completamente diferentes. A diferença não está no tamanho, está nas decisões de projeto: como a casa se implanta, como a planta se organiza e como os interiores nascem junto com a arquitetura.
        </p>
      </div>
      <div className="mb-10 md:mb-16">
        <VideoTerrainSection />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="group p-6 md:p-8 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500" style={{ animationDelay: `${index * 150}ms` }}>
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <benefit.icon className="w-5 h-5 md:w-8 md:h-8 text-primary" strokeWidth={1.75} />
            </div>
            <h3 className="text-base md:text-xl lg:text-2xl font-bold text-foreground mb-2 md:mb-4">{benefit.title}</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
