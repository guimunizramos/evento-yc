import { ShieldCheck, BadgePercent, MapPinHouse } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Preservação de Patrimônio",
    description: "Não tire dinheiro dos seus investimentos. Use o crédito bancário para construir enquanto seu capital segue rendendo.",
  },
  {
    icon: BadgePercent,
    title: "Taxas Diferenciadas",
    description: "Entenda as linhas específicas para construção (SBPE) que possuem as menores taxas para o segmento de luxo.",
  },
  {
    icon: MapPinHouse,
    title: "Terreno + Construção",
    description: "Saiba como financiar desde a compra do lote até o acabamento final em um único contrato simplificado.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-10 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
            Por que o financiamento é a escolha de{" "}
            <span className="text-primary">investidores inteligentes</span>?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <benefit.icon className="w-5 h-5 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-base md:text-xl lg:text-2xl font-bold text-foreground mb-2 md:mb-4">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;