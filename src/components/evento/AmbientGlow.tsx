/**
 * Camada única de luzes de fundo para a página inteira. Fica atrás de todas
 * as seções de propósito: brilhos por seção, com overflow-hidden, criavam
 * uma linha visível na emenda entre seções. Posições fixas, sem aleatório.
 */
const blobs = [
  { top: "4%", left: "-12%", size: "42rem", tone: "hsl(25 100% 50%)", opacity: 0.15 },
  { top: "17%", right: "-10%", size: "34rem", tone: "hsl(36 100% 57%)", opacity: 0.12 },
  { top: "31%", left: "-6%", size: "36rem", tone: "hsl(14 92% 45%)", opacity: 0.13 },
  { top: "46%", right: "-4%", size: "38rem", tone: "hsl(25 100% 50%)", opacity: 0.12 },
  { top: "61%", left: "-10%", size: "34rem", tone: "hsl(36 100% 57%)", opacity: 0.12 },
  { top: "74%", right: "-8%", size: "36rem", tone: "hsl(25 100% 50%)", opacity: 0.13 },
  { top: "88%", left: "-4%", size: "32rem", tone: "hsl(14 92% 45%)", opacity: 0.12 },
];

export function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{ top: b.top, left: b.left, right: b.right, width: b.size, height: b.size, backgroundColor: b.tone, opacity: b.opacity }}
        />
      ))}
    </div>
  );
}
