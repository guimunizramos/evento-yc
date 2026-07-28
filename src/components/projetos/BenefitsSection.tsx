import { Eye, Receipt, Target } from "lucide-react";
import VideoShowcaseSection from "./VideoShowcaseSection";

const benefits = [
  {
    icon: Eye,
    title: "Projetos abertos por dentro",
    description: "Obras reais da YouCon apresentadas do desafio inicial até a solução executada.",
  },
  {
    icon: Receipt,
    title: "Custos e acabamentos na mesa",
    description: "Uma conversa transparente sobre o que cada escolha representa no orçamento final.",
  },
  {
    icon: Target,
    title: "Diretrizes para 2026",
    description: "O que priorizar para construir com segurança, funcionalidade e valor construtivo — longe dos modismos.",
  },
];

const BenefitsSection = () => (
  <section className="relative py-10 md:py-20 lg:py-28">
    <div className="relative container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
          O que ninguém mostra entre o <span className="text-primary">projeto e a obra pronta</span>
        </h2>
        <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          A maioria das pessoas só vê o resultado final: a foto pronta, o render bonito. Mas entre a planta e a casa entregue existem centenas de decisões técnicas, escolhas de acabamento e ajustes de custo que definem se a expectativa vai bater com a realidade. É isso que vamos abrir nesta consultoria.
        </p>
      </div>
      <div className="mb-10 md:mb-16">
        <VideoShowcaseSection />
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
