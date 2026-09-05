import { DonutChart } from "../../../../shared/components/DonutChart";

type Tone = "accent" | "success" | "warning" | "danger" | "neutral";

interface CompositionItem {
  label: string;
  value: number;
  tone: Tone;
}

interface CompositionCardProps {
  label: string;
  total: number;
  items: CompositionItem[];
}

const TONE_TEXT: Record<Tone, string> = {
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  neutral: "text-text-muted",
};

const TONE_BG: Record<Tone, string> = {
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  neutral: "bg-text-muted",
};

export function CompositionCard({ label, total, items }: CompositionCardProps) {
  const safeTotal = total || 1;

  return (
    <div className="card-surface flex flex-1 flex-col justify-between gap-4 p-5">
      <div>
        <p className="text-sm text-text-muted">{label}</p>
        <p className="text-3xl font-semibold tabular-nums text-text">{total}</p>
      </div>
      <div className="flex items-center gap-4">
        <ul className="flex flex-1 flex-col gap-1.5">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-xs text-text-muted">
              <span className={`h-2 w-2 shrink-0 rounded-full ${TONE_BG[item.tone]}`} />
              <span className="tabular-nums">{Math.round((item.value / safeTotal) * 100)}%</span> {item.label}
            </li>
          ))}
        </ul>
        <DonutChart segments={items.map((item) => ({ value: item.value, toneClass: TONE_TEXT[item.tone] }))} />
      </div>
    </div>
  );
}
