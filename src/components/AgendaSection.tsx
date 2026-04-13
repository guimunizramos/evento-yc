import { Check } from "lucide-react";
import { Button } from "./ui/button";

const agendaItems = [
  "Como funciona a análise de crédito para obras residenciais de alto padrão.",
  "Cronograma físico-financeiro: Como garantir as liberações do banco sem atrasos.",
  "Modalidade Terreno + Construção: O passo a passo para quem ainda não tem o lote.",
  "Mesa Redonda: Tire suas dúvidas sobre o seu perfil de crédito e viabilidade bancária.",
];

const AgendaSection = () => {
  const scrollToForm = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-10 md:py-20 lg:py-28 bg-section-alt">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
              O que vamos apresentar nesta{" "}
              <span className="text-primary">Consultoria Fechada</span>:
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground">
              O CEO da YouCon, Thiago Cardim, recebe Junior Ganzerli, diretor da Corpsa, para abrir a 'caixa preta' do financiamento de alto padrão.
            </p>
          </div>

          <div className="space-y-4 md:space-y-5 mb-8 md:mb-12">
            {agendaItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 md:p-5 rounded-lg md:rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-5 h-5 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 md:w-5 md:h-5 text-primary" />
                </div>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="hero-outline"
              size="xl"
              onClick={scrollToForm}
              className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14"
            >
              GARANTIR MEU ACESSO GRATUITO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;