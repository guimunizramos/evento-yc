import { LandPlot, KeyRound, FileText, Hammer } from "lucide-react";

const profiles = [
  {
    icon: LandPlot,
    title: "Já tem o terreno",
    description: "Quer entender as possibilidades reais de projeto antes de tomar qualquer decisão de obra.",
  },
  {
    icon: KeyRound,
    title: "Está prestes a comprar",
    description: "Quer saber avaliar se um terreno comporta a casa que você imagina.",
  },
  {
    icon: FileText,
    title: "Tem um projeto em mãos",
    description: "Recebeu uma planta e quer entender se ela realmente aproveita bem o seu terreno.",
  },
  {
    icon: Hammer,
    title: "Vai construir em breve",
    description: "Está no momento de decidir e quer ver soluções reais antes de investir.",
  },
];

const AudienceSection = () => (
  <section className="relative overflow-hidden py-10 md:py-20 lg:py-28 bg-orange-gradient">
    <div className="relative container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
        {/* Sobre o laranja o destaque é feito em branco — laranja sobre laranja não teria contraste. */}
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 md:mb-6">
          Para quem é <span className="text-white">esta consultoria</span>
        </h2>
        <p className="text-sm md:text-lg lg:text-xl text-primary-foreground/80 leading-relaxed">
          Um encontro para quem já deu o primeiro passo e quer entender o que é possível fazer com o próprio terreno antes de começar a construir.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {profiles.map((profile) => (
          <div
            key={profile.title}
            className="group p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-card border border-white/10 shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[hsl(0_0%_11%)] hover:shadow-xl hover:shadow-black/30"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-5 transition-colors duration-300 group-hover:bg-primary/20">
              <profile.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" strokeWidth={1.75} />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground mb-2 md:mb-3">{profile.title}</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{profile.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AudienceSection;
