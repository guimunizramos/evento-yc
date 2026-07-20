import VideoChartSection from "./VideoChartSection";

const LandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 text-primary">
    <path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /><circle cx="12" cy="10" r="1" /><path d="M3 10h2M19 10h2" />
  </svg>
);
const BlueprintIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 text-primary">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 9v6" />
  </svg>
);
const PatrimonyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 text-primary">
    <path d="M3 21h18" /><path d="M5 21V11l7-7 7 7v10" /><path d="M12 21v-5" /><path d="M9 14h6" /><path d="M17 8l2-2" /><path d="M19 3v3h-3" /><path d="M19 6l-4 4" />
  </svg>
);

const benefits = [
  { icon: LandIcon, title: "Produto imobiliário", description: "Definir público, posicionamento, tipologias e diferenciais é fundamental para criar um produto alinhado à demanda do mercado." },
  { icon: BlueprintIcon, title: "Projeto e viabilidade", description: "O projeto precisa equilibrar legislação, aproveitamento, custos, funcionalidade e potencial comercial." },
  { icon: PatrimonyIcon, title: "Estratégia de incorporação", description: "A modelagem do negócio deve conectar parceiros, investimentos, etapas e decisões para reduzir riscos e preservar a rentabilidade." },
];

const BenefitsSection = () => (
  <section className="py-10 md:py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
          O que transforma um projeto em um <span className="text-primary">empreendimento viável</span>?
        </h2>
        <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Um empreendimento rentável não depende apenas de uma boa ideia. Ele exige decisões técnicas e estratégicas que conectem produto, projeto, mercado e incorporação desde o início.
        </p>
      </div>
      <div className="mb-10 md:mb-16">
        <VideoChartSection />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="group p-6 md:p-8 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500" style={{ animationDelay: `${index * 150}ms` }}>
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <benefit.icon />
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
