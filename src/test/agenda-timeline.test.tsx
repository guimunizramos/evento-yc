import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AgendaSection from "@/components/incorporacao/AgendaSection";

const VIEWPORT_HEIGHT = 800;
// A seção usa 65% da altura da viewport como linha de referência.
const REFERENCE_LINE = VIEWPORT_HEIGHT * 0.65;

const markersLit = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("li[data-index] > span")).filter((span) =>
    span.className.includes("bg-primary"),
  ).length;

const connectors = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>("li[data-index] > span.bg-border > span"));

const connectorsFilled = (container: HTMLElement) =>
  connectors(container).filter((el) => el.style.height === "100%").length;

/** Posiciona cada marco na tela e dispara o scroll, como se o usuário tivesse rolado. */
const scrollTo = (container: HTMLElement, tops: number[]) => {
  container.querySelectorAll<HTMLElement>("li[data-index]").forEach((li, index) => {
    li.getBoundingClientRect = () => ({ top: tops[index], bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: tops[index], toJSON: () => ({}) });
  });
  act(() => {
    fireEvent.scroll(window);
  });
};

/** Todos os marcos abaixo da linha de referência: nada aceso ainda. */
const allBelow = Array.from({ length: 7 }, (_, i) => REFERENCE_LINE + 100 + i * 90);

beforeEach(() => {
  Object.defineProperty(window, "innerHeight", { value: VIEWPORT_HEIGHT, configurable: true });

  // rAF síncrono para o efeito de scroll ser observável no teste.
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    cb(0);
    return 1;
  });

  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  }));
});

describe("AgendaSection — timeline ligada ao scroll", () => {
  it("a timeline termina no último marco, sem linha sobrando", () => {
    const { container } = render(<AgendaSection />);

    // 7 marcos ligados por 6 conectores: o sétimo item não desenha linha abaixo dele.
    expect(connectors(container)).toHaveLength(6);
    const items = container.querySelectorAll("li[data-index]");
    expect(items[items.length - 1].querySelector("span.bg-border")).toBeNull();
  });

  it("não acende nada enquanto os marcos estão abaixo da linha de referência", () => {
    const { container } = render(<AgendaSection />);

    scrollTo(container, allBelow);

    expect(markersLit(container)).toBe(0);
    expect(connectorsFilled(container)).toBe(0);
  });

  it("acende progressivamente conforme o scroll avança", () => {
    const { container } = render(<AgendaSection />);

    // Só o primeiro marco passou da linha.
    scrollTo(container, [REFERENCE_LINE - 10, ...allBelow.slice(1)]);
    expect(markersLit(container)).toBe(1);
    expect(connectorsFilled(container)).toBe(0);

    // Quatro marcos passaram.
    scrollTo(container, [-300, -200, -100, REFERENCE_LINE - 10, ...allBelow.slice(4)]);
    expect(markersLit(container)).toBe(4);
    expect(connectorsFilled(container)).toBe(3);

    // Todos passaram.
    scrollTo(container, Array.from({ length: 7 }, (_, i) => -600 + i * 90));
    expect(markersLit(container)).toBe(7);
    expect(connectorsFilled(container)).toBe(6);
  });

  it("regride ao rolar de volta para cima, acompanhando o scroll", () => {
    const { container } = render(<AgendaSection />);

    scrollTo(container, Array.from({ length: 7 }, (_, i) => -600 + i * 90));
    expect(markersLit(container)).toBe(7);

    scrollTo(container, [REFERENCE_LINE - 10, ...allBelow.slice(1)]);
    expect(markersLit(container)).toBe(1);
  });

  it("mantém os 7 tópicos e o CTA da seção", () => {
    render(<AgendaSection />);

    expect(screen.getByText("Como funciona uma incorporação imobiliária")).toBeInTheDocument();
    expect(screen.getByText("Erros que comprometem o empreendimento")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(7);
    expect(screen.getByRole("button", { name: /QUERO PARTICIPAR DESSA AULA/i })).toBeInTheDocument();
  });
});
