import { render, screen } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AgendaSection from "@/components/incorporacao/AgendaSection";

type ObserverCallback = (entries: Array<{ isIntersecting: boolean; target: Element }>) => void;

let capturedCallback: ObserverCallback | null = null;
let observedElements: Element[] = [];
const disconnect = vi.fn();

const markersLit = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("li[data-index] > span")).filter((span) =>
    span.className.includes("bg-primary"),
  ).length;

const connectors = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>("li[data-index] > span.bg-border > span"));

const connectorsFilled = (container: HTMLElement) =>
  connectors(container).filter((el) => el.style.height === "100%").length;

beforeEach(() => {
  capturedCallback = null;
  observedElements = [];
  disconnect.mockClear();

  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: ObserverCallback) {
        capturedCallback = callback;
      }
      observe(el: Element) {
        observedElements.push(el);
      }
      disconnect = disconnect;
      unobserve = vi.fn();
      takeRecords = vi.fn();
    },
  );

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

const intersect = (index: number) => {
  act(() => {
    capturedCallback?.([{ isIntersecting: true, target: observedElements[index] }]);
  });
};

describe("AgendaSection — timeline de scroll", () => {
  it("observa os 7 marcos e começa com a linha apagada", () => {
    const { container } = render(<AgendaSection />);

    expect(observedElements).toHaveLength(7);
    expect(markersLit(container)).toBe(0);
    expect(connectorsFilled(container)).toBe(0);
  });

  it("a timeline termina no último marco, sem linha sobrando", () => {
    const { container } = render(<AgendaSection />);

    // 7 marcos ligados por 6 conectores: o sétimo item não desenha linha abaixo dele.
    expect(connectors(container)).toHaveLength(6);
    const items = container.querySelectorAll("li[data-index]");
    const lastItem = items[items.length - 1];
    expect(lastItem.querySelector("span.bg-border")).toBeNull();
  });

  it("acende progressivamente conforme cada marco entra na viewport", () => {
    const { container } = render(<AgendaSection />);

    intersect(0);
    expect(markersLit(container)).toBe(1);

    intersect(3);
    expect(markersLit(container)).toBe(4);
    expect(connectorsFilled(container)).toBe(3);

    intersect(6);
    expect(markersLit(container)).toBe(7);
    expect(connectorsFilled(container)).toBe(6);
  });

  it("não retrocede quando um marco anterior volta à viewport", () => {
    const { container } = render(<AgendaSection />);

    intersect(5);
    expect(markersLit(container)).toBe(6);

    intersect(1);
    expect(markersLit(container)).toBe(6);
  });

  it("mantém os 7 tópicos e o CTA da seção", () => {
    render(<AgendaSection />);

    expect(screen.getByText("Como funciona uma incorporação imobiliária")).toBeInTheDocument();
    expect(screen.getByText("Erros que comprometem o empreendimento")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(7);
    expect(screen.getByRole("button", { name: /QUERO PARTICIPAR DESSA AULA/i })).toBeInTheDocument();
  });
});
