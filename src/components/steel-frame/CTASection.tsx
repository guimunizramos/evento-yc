import { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegistrationDialog from "@/components/RegistrationDialog";

const CTASection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <section id="cta-section" className="py-10 md:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 md:p-8 lg:p-12 rounded-xl md:rounded-3xl border-2 border-primary/40 bg-card/50 glow-box">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
                  Dê o primeiro passo para uma construção mais inteligente.
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed">
                  Participe desta consultoria fechada, tire suas dúvidas diretamente com Thiago Cardim e entenda se o Light Steel Frame é a solução certa para o seu projeto.
                </p>
                <div className="flex flex-col gap-4 md:flex-row md:justify-center md:gap-6 mb-8 md:mb-10">
                  <div className="flex items-center justify-center gap-2 text-foreground">
                    <Calendar className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    <span className="text-base md:text-lg font-medium">DATA: 09/07</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-foreground">
                    <Clock className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    <span className="text-base md:text-lg font-medium">HORÁRIO: 20:00</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    <span className="text-base md:text-lg font-medium">Sala fechada no Google Meet</span>
                  </div>
                </div>
                <Button variant="hero" size="xl" onClick={() => setDialogOpen(true)} className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14">
                  QUERO PARTICIPAR DA CONSULTORIA
                </Button>
                <p className="text-xs text-muted-foreground mt-3 md:mt-6">Link enviado após o cadastro</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RegistrationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

export default CTASection;
