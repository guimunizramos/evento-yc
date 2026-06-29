const TimerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 text-primary">
    <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5" /><path d="M9.5 2.5h5" /><path d="M12 2.5V5" /><path d="M18.9 5.1l-1.4 1.4" />
  </svg>
);
const BudgetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 text-primary">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 3v18" /><path d="M13 13h4" /><path d="M13 17h4" />
  </svg>
);
const ComfortIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 text-primary">
    <path d="M3 12l2-2 4 4 4-4 4 4 2-2" /><path d="M10 20H5a2 2 0 0 1-2-2V8" /><path d="M19 20h-5" /><path d="M22 8v10a2 2 0 0 1-2 2" /><path d="M9 3h6l3 5H6L9 3z" />
  </svg>
);

const benefits = [
  { icon: TimerIcon, title: "Velocidade Real", description: "Sua casa pronta em menos tempo, sem abrir mão da qualidade. Um cronograma mais organizado do início ao fim." },
  { icon: BudgetIcon, title: "Orçamento Inteligente", description: "Mais previsibilidade e menos surpresas durante a obra. O que é planejado no projeto fica mais próximo da realidade." },
  { icon: ComfortIcon, title: "Conforto Superior", description: "Uma tecnologia que oferece ótimo desempenho térmico e acústico para a sua casa." },
];

const BenefitsSection = () => (
  <section className="py-10 md:py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
          Por que olhar além da construção tradicional?
        </h2>
        <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          A maioria das pessoas só conhece a construção com tijolo e cimento. Mas o mercado evoluiu.
          Hoje, é possível construir com a qualidade de alto padrão que a YouCon exige, eliminando
          desperdícios, reduzindo imprevistos e trazendo mais previsibilidade para a obra.
        </p>
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
