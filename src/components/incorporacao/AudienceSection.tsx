import { Building2, Compass, LandPlot, TrendingUp } from "lucide-react";

const profiles = [
  {
    icon: LandPlot,
    title: "Tem um terreno parado",
    description: "Possui uma área ociosa e quer entender, na prática, quais caminhos existem para desenvolvê-la.",
  },
  {
    icon: TrendingUp,
    title: "Pensa em investir em incorporação",
    description: "Já considera entrar nesse mercado, mas ainda não estruturou um projeto do início ao fim.",
  },
  {
    icon: Compass,
    title: "Atua no mercado imobiliário",
    description: "Corretores, arquitetos e engenheiros que querem compreender o processo de ponta a ponta.",
  },
  {
    icon: Building2,
    title: "Já construiu patrimônio",
    description: "Busca formas mais estratégicas e estruturadas de expandir e consolidar o que já conquistou.",
  },
];

const AudienceSection = () => (
  <section className="py-10 md:py-20 lg:py-28 bg-section-alt">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
          Para quem é esse workshop
        </h2>
        <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Um encontro para quem quer entender os caminhos entre um terreno e um empreendimento estruturado, independentemente do ponto de partida.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {profiles.map((profile) => (
          <div
            key={profile.title}
            className="group p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-5 group-hover:bg-primary/20 transition-colors duration-300">
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
