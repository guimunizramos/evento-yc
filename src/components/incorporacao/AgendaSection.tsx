import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const agendaItems = [
  { title: "O que é incorporação imobiliária", description: "Entenda, de forma simples, como um terreno pode dar origem a um empreendimento imobiliário." },
  { title: "Potencial construtivo do terreno", description: "Conheça os principais fatores que determinam o que pode ser construído e desenvolvido em uma área." },
  { title: "Estudo de viabilidade", description: "Entenda como arquitetura, legislação, custos, produto imobiliário e mercado são analisados antes de uma decisão." },
  { title: "Estruturação do empreendimento", description: "Veja como as diferentes etapas e profissionais precisam estar conectados para transformar o potencial do terreno em um projeto estruturado." },
  { title: "Modelos de parceria", description: "Conheça possibilidades de participação entre proprietários de terrenos, investidores, incorporadores e parceiros estratégicos." },
  { title: "Estratégia patrimonial", description: "Entenda como decisões imobiliárias bem estruturadas podem contribuir para a construção, consolidação e continuidade do patrimônio." },
];

const AgendaSection = () => {
  const scrollToForm = () => document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-10 md:py-20 lg:py-28 bg-section-alt">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
              O que vamos abordar nesta Consultoria Fechada:
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground">
              Um encontro direto e prático para quem possui um terreno, avalia oportunidades imobiliárias ou deseja entender os caminhos para desenvolver um empreendimento.
            </p>
          </div>
          <div className="space-y-4 md:space-y-5 mb-8 md:mb-12">
            {agendaItems.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 md:p-5 rounded-lg md:rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
                <div className="flex-shrink-0 w-5 h-5 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 md:w-5 md:h-5 text-primary" />
                </div>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  <span className="font-semibold">{item.title}:</span>{" "}
                  <span className="text-muted-foreground">{item.description}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="hero-outline" size="xl" onClick={scrollToForm} className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14">
              QUERO GARANTIR MEU LUGAR NA SALA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
