/**
 * Camada única de luzes de fundo para a página inteira.
 *
 * Fica atrás de todas as seções de propósito: quando cada seção tinha o próprio
 * brilho com overflow-hidden, o corte na borda criava uma linha horizontal
 * visível entre seções de mesma cor. Numa camada só, os brilhos atravessam as
 * divisões e não há emenda.
 *
 * As posições são fixas — usar Math.random() faria os brilhos saltarem a cada
 * re-render do React.
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

const AmbientGlow = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {blobs.map((blob, index) => (
      <div
        key={index}
        className="absolute rounded-full blur-[120px]"
        style={{
          top: blob.top,
          left: blob.left,
          right: blob.right,
          width: blob.size,
          height: blob.size,
          backgroundColor: blob.tone,
          opacity: blob.opacity,
        }}
      />
    ))}
  </div>
);

export default AmbientGlow;
