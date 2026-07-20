/**
 * Luzes de fundo difusas. As posições são fixas por preset — usar Math.random()
 * faria os brilhos saltarem a cada re-render do React.
 */
type Blob = { top?: string; bottom?: string; left?: string; right?: string; size: string; tone: string; opacity: string };

const presets: Record<string, Blob[]> = {
  a: [
    { top: "-10%", left: "-8%", size: "38rem", tone: "hsl(25 100% 50%)", opacity: "0.16" },
    { bottom: "-15%", right: "-5%", size: "30rem", tone: "hsl(145 75% 36%)", opacity: "0.12" },
  ],
  b: [
    { top: "12%", right: "-12%", size: "34rem", tone: "hsl(36 100% 57%)", opacity: "0.14" },
    { bottom: "-20%", left: "8%", size: "26rem", tone: "hsl(150 85% 26%)", opacity: "0.14" },
  ],
  c: [
    { top: "-18%", right: "18%", size: "32rem", tone: "hsl(145 75% 36%)", opacity: "0.13" },
    { bottom: "-10%", left: "-10%", size: "36rem", tone: "hsl(14 92% 45%)", opacity: "0.15" },
  ],
  d: [
    { top: "25%", left: "-14%", size: "28rem", tone: "hsl(25 100% 50%)", opacity: "0.13" },
    { top: "-12%", right: "-8%", size: "34rem", tone: "hsl(140 70% 45%)", opacity: "0.11" },
  ],
};

const AmbientGlow = ({ preset = "a" }: { preset?: keyof typeof presets }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {presets[preset].map((blob, index) => (
      <div
        key={index}
        className="absolute rounded-full blur-[110px]"
        style={{
          top: blob.top,
          bottom: blob.bottom,
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
