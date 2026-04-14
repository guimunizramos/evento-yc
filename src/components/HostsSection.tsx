import { Trophy } from "lucide-react";
import thiagoPhoto from "@/assets/thiago-cardim.png";
import juniorPhoto from "@/assets/junior-ganzerli.png";

const hosts = [
  {
    name: "THIAGO CARDIM",
    role: "Anfitrião",
    title: "CEO YouCon",
    description: "Arquiteto especialista em viabilizar residências de alto padrão com mais de 400 projetos entregues em 60 cidades pelo Brasil. À frente da YouCon, oferece uma solução completa que integra arquitetura, estratégia técnica e viabilidade financeira.",
    photo: thiagoPhoto,
  },
  {
    name: "JUNIOR GANZERLI",
    role: "Convidado Especial",
    title: "Diretor Corpsa Crédito Imobiliário",
    description: "Especialista em crédito imobiliário com quase 30 anos de mercado e diretor da Corpsa. É referência nacional em desburocratização e inteligência financeira para o segmento premium.",
    photo: juniorPhoto,
  },
];

const HostsSection = () => {
  return (
    <section className="py-10 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-6 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Estratégia, Arquitetura e Inteligência Financeira
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 max-w-5xl mx-auto">
          {hosts.map((host, index) => (
            <div
              key={index}
              className="text-center p-4 md:p-8 pt-12 md:pt-14 rounded-xl md:rounded-2xl bg-card border border-border relative overflow-hidden"
            >
              {/* Top Banner - Only for Junior */}
              {host.name === "JUNIOR GANZERLI" && (
                <div className="absolute top-0 left-0 right-0 bg-primary z-10">
                  <div className="flex items-center justify-center gap-1.5 py-1.5 md:py-2 px-4">
                    <Trophy className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
                    <span className="text-primary-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider">
                      Maior Correspondente Caixa do Brasil
                    </span>
                  </div>
                </div>
              )}
              {/* Avatar */}
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden border-2 border-primary/30">
                {host.photo ? (
                  <img
                    src={host.photo}
                    alt={host.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-2xl md:text-4xl font-bold text-muted-foreground">
                      {host.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-lg md:text-2xl font-bold text-primary mb-1">
                {host.name}
              </h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                ({host.role})
              </p>
              <p className="text-sm md:text-lg font-semibold text-foreground mb-2 md:mb-4">
                {host.title}
              </p>
              <p
                className="text-sm md:text-base text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: host.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostsSection;
