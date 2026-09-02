import { midia } from "@/lib/midia";
import type { EventoConfig } from "./tipos";

/**
 * Consultoria de Estrutura Metálica. A copy vem da edição de 02/04/2026
 * (repo lp-metalica), na estrutura nova dos eventos.
 *
 * TODO: validar data do evento, vídeo e link do grupo antes de publicar.
 */
export const metalica: EventoConfig = {
  slug: "metalica",
  webhookEvento: "estrutura-metalica",
  tema: "verde",
  meta: {
    titulo: "Consultoria Estrutura Metálica | YouCon",
    descricao:
      "Participe da consultoria fechada com especialistas e entenda por que a Estrutura Metálica é a escolha certa para a sua casa. Inscreva-se gratuitamente.",
    ogImage: midia("img/metalica-hero-desktop.jpg"),
  },
  banner: {
    antes: "Consultoria gratuita e ao vivo em:",
    depois: "A consultoria já começou!",
    dataIso: "2026-09-30T20:00:00-03:00",
    rotuloData: "30/09/2026 às 20h",
  },
  hero: {
    tag: "Convite exclusivo YouCon",
    titulo: { antes: "Vãos livres, elegância e velocidade: o diferencial da ", destaque: "Estrutura Metálica", depois: " para a sua nova casa." },
    subtitulo: [
      { texto: "Chega de limitações no seu projeto. Descubra como a " },
      { texto: "Estrutura Metálica", destaque: true },
      { texto: " entrega residências de alto padrão mais rápido, com ambientes 100% integrados e um nível de sofisticação que o concreto comum não acompanha." },
    ],
    imagemDesktop: midia("img/metalica-hero-desktop.jpg"),
    imagemMobile: midia("img/metalica-hero-mobile.jpg"),
    cta: "Garantir meu acesso gratuito",
    rodape: "Evento online e gratuito | Vagas limitadas",
  },
  beneficios: {
    titulo: { antes: "Por que olhar além da ", destaque: "construção tradicional", depois: "?" },
    subtitulo: "A maioria das pessoas só conhece a construção com tijolo e cimento. Mas o mercado evoluiu, e hoje é possível construir com o padrão que a YouCon exige, eliminando desperdícios e trazendo mais previsibilidade para a obra.",
    itens: [
      { icone: "Maximize", titulo: "Amplitude e beleza sem barreiras", descricao: "Crie grandes fachadas de vidro e salas totalmente abertas, sem aqueles pilares indesejados no meio do caminho." },
      { icone: "Rocket", titulo: "As chaves na mão muito antes", descricao: "Sua casa montada com precisão de fábrica, antecipando o fim da obra e eliminando o \"atraso eterno\"." },
      { icone: "Scale", titulo: "Comparativo real: concreto x metálica", descricao: "Entenda em quais cenários essa solução se torna mais inteligente e rentável para o seu orçamento." },
    ],
  },
  video: {
    src: null,
    poster: null,
    legenda: "Assista ao vídeo e entenda o que você vai ver nesta consultoria.",
  },
  publico: {
    titulo: { antes: "Para quem é ", destaque: "esta consultoria" },
    subtitulo: "Um encontro para quem está planejando construir e quer decidir o sistema construtivo com informação, antes de fechar projeto e orçamento.",
    itens: [
      { icone: "Landmark", titulo: "Já tem o terreno", descricao: "Para quem já garantiu o lote e quer definir o sistema construtivo antes de iniciar o projeto." },
      { icone: "FileSearch", titulo: "Está com projeto em andamento", descricao: "Para quem já projeta e quer avaliar se a estrutura metálica destrava vãos, integração e prazo." },
      { icone: "Wallet", titulo: "Quer previsibilidade de custo", descricao: "Para quem busca um comparativo real entre concreto e metálica antes de comprometer o orçamento." },
      { icone: "Maximize", titulo: "Sonha com ambientes integrados", descricao: "Para quem quer fachadas de vidro, vãos livres e salas abertas sem pilares no caminho." },
    ],
  },
  agenda: {
    titulo: { antes: "O que vamos apresentar nesta ", destaque: "consultoria fechada", depois: ":" },
    subtitulo: "Nesta mesa redonda exclusiva, o CEO da YouCon, Thiago Cardim, e o engenheiro Rodrigo Vilela (Arka) vão abrir os bastidores de casas reais e tirar todas as suas dúvidas.",
    estilo: "timeline",
    itens: [
      { titulo: "A força da Estrutura Metálica na prática", descricao: "Como o sistema cria vãos livres e integração total entre os ambientes." },
      { titulo: "Linha de produção e montagem", descricao: "Como funciona a fabricação que elimina o improviso do canteiro de obras." },
      { titulo: "Abertura de números reais", descricao: "O comparativo financeiro entre o concreto e a estrutura metálica." },
      { titulo: "Mesa redonda", descricao: "O momento exato para você trazer as perguntas sobre o seu terreno ou as ideias que tem para a sua futura casa." },
    ],
    cta: "Garantir meu acesso gratuito",
  },
  hosts: {
    titulo: { antes: "A união da ", destaque: "estética com a engenharia" },
    itens: [
      {
        nome: "Thiago Cardim",
        cargo: "Anfitrião",
        titulo: "CEO YouCon",
        foto: midia("img/thiago-cardim.png"),
        descricao: "Arquiteto focado em entregar residências únicas. É especialista em traduzir os desejos das famílias em projetos atemporais, utilizando métodos construtivos que garantem conforto e previsibilidade.",
      },
      {
        nome: "Rodrigo Vilela",
        cargo: "Convidado especial",
        titulo: "Arka Engenharia",
        foto: midia("img/rodrigo-vilela.png"),
        descricao: "Engenheiro especialista em cálculo estrutural e soluções em BIM. É o responsável por transformar projetos arquitetônicos de alta complexidade em estruturas metálicas viáveis e extremamente seguras.",
      },
    ],
  },
  cta: {
    titulo: { antes: "O projeto da sua nova casa não precisa ter limites. ", destaque: "Inscreva-se." },
    descricao: "Essa é a oportunidade de tirar todas as suas dúvidas diretamente com quem projeta e com quem constrói, antes de tomar sua decisão.",
    data: "30/09",
    horario: "20:00",
    local: "Call fechada ao vivo (Meet)",
  },
  formulario: { titulo: "Garanta seu acesso gratuito", redirect: "https://chat.whatsapp.com/BxXxLl9oORFDK16nmeBaX7" },
};
