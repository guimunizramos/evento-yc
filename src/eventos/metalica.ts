import { midia } from "@/lib/midia";
import type { EventoConfig } from "./tipos";

/**
 * Consultoria de Estrutura Metálica, 24/09/2026 às 20h, só com o Thiago.
 * A copy vem da edição de 02/04/2026 (repo lp-metalica), ajustada para um
 * apresentador. Vídeo (VSL 9:16, 55s) e pôster no MinIO em metalica/.
 */
export const metalica: EventoConfig = {
  slug: "metalica",
  webhookEvento: "metalica",
  tema: "verde",
  meta: {
    titulo: "Consultoria Estrutura Metálica | YouCon",
    descricao:
      "Participe da consultoria fechada com o arquiteto Thiago Cardim e entenda por que a Estrutura Metálica é a escolha certa para a sua casa. Inscreva-se gratuitamente.",
    ogTitulo: "Estrutura Metálica",
  },
  banner: {
    antes: "Consultoria gratuita e ao vivo em:",
    depois: "A consultoria já começou!",
    dataIso: "2026-09-24T20:00:00-03:00",
    rotuloData: "24/09/2026 às 20h",
  },
  hero: {
    tag: "Convite exclusivo YouCon",
    titulo: { antes: "Vãos livres, elegância e velocidade: o diferencial da ", destaque: "Estrutura Metálica", depois: " para a sua nova casa." },
    subtitulo: [
      { texto: "Chega de limitações no seu projeto. " },
      { texto: "Thiago Cardim", forte: true },
      { texto: " mostra como a " },
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
    src: midia("metalica/vsl-metalica.mp4"),
    poster: midia("metalica/vsl-metalica-poster.jpg"),
    legenda: "Assista ao vídeo e entenda o que você vai ver nesta consultoria.",
  },
  estrutura: {
    titulo: { antes: "Do projeto à ", destaque: "estrutura" },
    subtitulo: "Descubra como nasce uma casa de alto padrão sem pilares no meio da sala, com vãos abertos e fachadas de vidro. A estrutura metálica torna isso possível, e a consultoria mostra se ela faz sentido para o seu projeto.",
    fonte: "Projeto estrutural real de uma residência YouCon em Poços de Caldas",
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
    subtitulo: "Nesta consultoria exclusiva, o CEO da YouCon, Thiago Cardim, abre os bastidores de casas reais em estrutura metálica e responde às suas dúvidas ao vivo.",
    estilo: "timeline",
    itens: [
      { titulo: "A força da Estrutura Metálica na prática", descricao: "Como o sistema cria vãos livres e integração total entre os ambientes." },
      { titulo: "Linha de produção e montagem", descricao: "Como funciona a fabricação que elimina o improviso do canteiro de obras." },
      { titulo: "Abertura de números reais", descricao: "O comparativo financeiro entre o concreto e a estrutura metálica." },
      { titulo: "Perguntas ao vivo", descricao: "O momento exato para você trazer as dúvidas sobre o seu terreno ou as ideias que tem para a sua futura casa." },
    ],
    cta: "Garantir meu acesso gratuito",
  },
  hosts: {
    titulo: { antes: "Arquitetura, engenharia e uma ", destaque: "nova forma de construir" },
    itens: [
      {
        nome: "Thiago Cardim",
        cargo: "Arquiteto",
        titulo: "CEO YouCon",
        foto: midia("img/thiago-cardim.png"),
        descricao: "Arquiteto focado em entregar residências únicas. É especialista em traduzir os desejos das famílias em projetos atemporais, utilizando métodos construtivos que garantem conforto e previsibilidade. Nesta consultoria, ele explica como a Estrutura Metálica funciona, esclarece as principais dúvidas e mostra em quais situações ela é a escolha mais inteligente para uma casa de alto padrão.",
      },
    ],
  },
  cta: {
    titulo: { antes: "O projeto da sua nova casa não precisa ter limites. ", destaque: "Inscreva-se." },
    descricao: "Essa é a oportunidade de tirar todas as suas dúvidas diretamente com quem projeta, antes de tomar a sua decisão.",
    data: "24/09",
    horario: "20:00",
    local: "Call fechada ao vivo (Meet)",
  },
  formulario: { titulo: "Garanta seu acesso gratuito", redirect: "https://chat.whatsapp.com/BxXxLl9oORFDK16nmeBaX7" },
};
