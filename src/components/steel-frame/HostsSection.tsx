import thiagoPhoto from "@/assets/thiago-cardim.png";

const HostsSection = () => (
  <section className="py-10 md:py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center mb-6 md:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
          Arquitetura, Engenharia e uma nova forma de construir
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="text-center p-4 md:p-8 rounded-xl md:rounded-2xl bg-card border border-border max-w-md w-full">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden border-2 border-primary/30">
            <img src={thiagoPhoto} alt="Thiago Cardim" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-lg md:text-2xl font-bold text-primary mb-1">THIAGO CARDIM</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Arquiteto</p>
          <p className="text-sm md:text-lg font-semibold text-foreground mb-2 md:mb-4">CEO da YouCon Arquitetura</p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            À frente da YouCon Arquitetura, Thiago une arquitetura, engenharia e planejamento para desenvolver projetos completos, funcionais e preparados para uma execução mais segura. Nesta consultoria, ele vai explicar como o Light Steel Frame funciona, esclarecer as principais dúvidas sobre o sistema e mostrar em quais situações essa tecnologia pode fazer sentido para a construção de uma casa de alto padrão.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HostsSection;
