import thiagoPhoto from "@/assets/thiago-cardim.png";
import samuelPhoto from "@/assets/samuel-mosca.jpg";

const hosts = [
  {
    name: "THIAGO CARDIM",
    role: "Arquiteto e CEO da YouCon Arquitetura",
    photo: thiagoPhoto as string | null,
    description: "À frente da YouCon Arquitetura, Thiago Cardim atua no desenvolvimento de projetos completos e estudos de viabilidade para empreendimentos imobiliários. Durante o Workshop, vai mostrar como decisões arquitetônicas influenciam o aproveitamento, os custos, a funcionalidade e o potencial comercial do empreendimento.",
  },
  {
    name: "SAMUEL MOSCA",
    role: "Especialista em Incorporação Imobiliária e sócio-fundador da SMH Patrimonial",
    photo: samuelPhoto as string | null,
    description: "Formado em Direito e sócio-fundador da SMH Patrimonial, Samuel Mosca atua na estruturação estratégica de negócios e empreendimentos imobiliários. Durante o Workshop, vai abordar a modelagem da incorporação, os principais riscos, as possibilidades de parceria e as decisões necessárias para viabilizar o negócio.",
  },
];

const HostsSection = () => (
  <section className="relative py-10 md:py-20 lg:py-28">
    <div className="relative container mx-auto px-4 md:px-6">
      <div className="text-center mb-4 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
          Duas visões estratégicas sobre <span className="text-primary">projeto e incorporação</span>
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground mt-3 md:mt-6 max-w-2xl mx-auto">
          Arquitetura e incorporação reunidas para mostrar como decisões técnicas e estratégicas precisam caminhar juntas na estruturação de um empreendimento.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
        {hosts.map((host, index) => (
          <div key={index} className="text-center p-4 md:p-8 pt-10 md:pt-12 rounded-xl md:rounded-2xl bg-card border border-border">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden border-2 border-primary/30">
              {host.photo ? (
                <img src={host.photo} alt={host.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl md:text-4xl font-bold text-primary">{host.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-primary mb-2">{host.name}</h3>
            <p className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 md:mb-5">{host.role}</p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{host.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HostsSection;
