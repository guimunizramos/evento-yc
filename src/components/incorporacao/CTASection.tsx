import { Calendar, Clock, MapPin } from "lucide-react";
import RegistrationFormInline from "./RegistrationFormInline";

const CTASection = () => (
  <section id="cta-section" className="relative py-10 md:py-20 lg:py-28">
    <div className="relative container mx-auto px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="p-6 md:p-8 lg:p-12 rounded-xl md:rounded-3xl border-2 border-primary/40 bg-card/50 glow-box">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
              Um empreendimento rentável começa com <span className="text-primary">decisões bem estruturadas</span>.
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed">
              Participe deste Workshop gratuito com Thiago Cardim e Samuel Mosca e entenda como integrar projeto, viabilidade e incorporação para desenvolver empreendimentos mais seguros e preparados para o mercado.
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:justify-center md:gap-6">
              <div className="flex items-center justify-center gap-2 text-foreground">
                <Calendar className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                <span className="text-base md:text-lg font-medium"><b>DATA:</b> 23/07</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-foreground">
                <Clock className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                <span className="text-base md:text-lg font-medium"><b>HORÁRIO:</b> 20h</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                <span className="text-base md:text-lg font-medium">Sala fechada no Google Meet</span>
              </div>
            </div>
          </div>

          <div id="inscricao-form" className="mt-8 md:mt-10 border-t border-border pt-8 md:pt-10 scroll-mt-24">
            <RegistrationFormInline evento="incorporacao" />
            <p className="text-xs text-muted-foreground mt-4 md:mt-6 text-center">Link enviado após o cadastro</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
