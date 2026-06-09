import type { ReactNode } from "react";

// Sparkline / area line chart
export function Sparkline({
  values,
  height = 80,
  stroke = "currentColor",
  fill = "currentColor",
  className = "",
}: {
  values: number[];
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}) {
  if (!values.length) return null;
  const w = 320;
  const h = height;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1 || 1);
  const pts = values.map((v, i) => [i * step, h - ((v - min) / range) * (h - 8) - 4] as const);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full ${className}`} preserveAspectRatio="none">
      <path d={area} fill={fill} fillOpacity={0.12} />
      <path d={path} stroke={stroke} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill={stroke} />
      ))}
    </svg>
  );
}

export function Bars({ values, labels, className = "" }: { values: number[]; labels?: string[]; className?: string }) {
  const max = Math.max(...values, 1);
  return (
    <div className={`flex h-32 items-end gap-2 ${className}`}>
      {values.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex w-full flex-1 items-end">
            <div className="w-full rounded-t bg-foreground/80 transition-all hover:bg-accent" style={{ height: `${(v / max) * 100}%` }} />
          </div>
          {labels && <span className="text-[10px] font-medium text-muted-foreground">{labels[i]}</span>}
        </div>
      ))}
    </div>
  );
}

export function Donut({ value, total, label, size = 120 }: { value: number; total: number; label?: string; size?: number }) {
  const pct = total === 0 ? 0 : Math.min(1, value / total);
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeOpacity={0.12} strokeWidth={8} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={8}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          strokeLinecap="round"
          className="text-accent"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-2xl leading-none">{Math.round(pct * 100)}%</span>
        {label && <span className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}

export function PillStat({ label, value, tone = "default", icon }: { label: string; value: ReactNode; tone?: "default" | "good" | "warn" | "bad"; icon?: ReactNode }) {
  const tones: Record<string, string> = {
    default: "bg-card border-border",
    good: "bg-emerald-50 border-emerald-200 text-emerald-900",
    warn: "bg-amber-50 border-amber-200 text-amber-900",
    bad: "bg-rose-50 border-rose-200 text-rose-900",
  };
  return (
    <div className={`flex items-center gap-3 rounded-full border px-4 py-2 ${tones[tone]}`}>
      {icon}
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
    </div>
  );
}

export function MapMock({ pins = 0 }: { pins?: number }) {
  // SVG abstract map of Kenya
  const dots = Array.from({ length: pins }, (_, i) => ({
    x: 60 + ((i * 47) % 220),
    y: 50 + ((i * 31) % 130),
  }));
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-emerald-50 to-sky-50">
      <svg viewBox="0 0 320 220" className="h-48 w-full">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="320" height="220" fill="url(#grid)" />
        <path
          d="M70,40 Q120,30 170,55 Q230,70 250,120 Q260,170 200,190 Q140,200 90,170 Q40,140 50,90 Z"
          fill="rgba(16,185,129,0.18)"
          stroke="rgba(16,185,129,0.5)"
          strokeWidth="1.5"
        />
        {dots.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r={8} fill="rgba(239,68,68,0.18)" />
            <circle cx={d.x} cy={d.y} r={3} fill="#ef4444" />
          </g>
        ))}
      </svg>
    </div>
  );
}
