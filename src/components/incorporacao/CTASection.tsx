import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegistrationFormInline from "./RegistrationFormInline";

const CTASection = () => {
  const focusForm = () => {
    const form = document.getElementById("inscricao-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => document.getElementById("inc-name")?.focus({ preventScroll: true }), 500);
  };

  return (
    <section id="cta-section" className="py-10 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 md:p-8 lg:p-12 rounded-xl md:rounded-3xl border-2 border-primary/40 bg-card/50 glow-box">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
                O seu terreno pode ser o início de um novo patrimônio.
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed">
                Participe deste Workshop, uma collab entre YouCon e SMH com Thiago Cardim e Samuel Mosca, e entenda como analisar o potencial de um terreno, estruturar um empreendimento e tomar decisões imobiliárias mais estratégicas.
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:justify-center md:gap-6 mb-8 md:mb-10">
                <div className="flex items-center justify-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  <span className="text-base md:text-lg font-medium"><b>DATA:</b> 23/07</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-foreground">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  <span className="text-base md:text-lg font-medium"><b>HORÁRIO:</b> 20:00</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-foreground">
                  <MapPin className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  <span className="text-base md:text-lg font-medium">Sala fechada no Google Meet</span>
                </div>
              </div>
              <Button variant="hero" size="xl" onClick={focusForm} className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14">
                RESERVAR MEU LUGAR NO WORKSHOP
              </Button>
              <p className="text-xs text-muted-foreground mt-3 md:mt-6">Link enviado após o cadastro</p>
            </div>
          </div>

          <div id="inscricao-form" className="mt-6 md:mt-10 scroll-mt-24">
            <RegistrationFormInline evento="incorporacao" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
