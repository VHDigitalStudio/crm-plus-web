import type { ComponentType, SVGProps } from "react";

type MetricTone = "neutral" | "accent" | "success" | "warning" | "danger";

interface MetricCardProps {
  label: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone?: MetricTone;
}

const TONE_TEXT: Record<MetricTone, string> = {
  neutral: "text-text",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export function MetricCard({ label, value, icon: Icon, tone = "neutral" }: MetricCardProps) {
  return (
    <div className="card-surface flex items-center gap-4 p-5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-elevated">
        <Icon width={22} height={22} className={TONE_TEXT[tone]} />
      </span>
      <div className="min-w-0">
        <p className={`text-2xl font-semibold tabular-nums ${TONE_TEXT[tone]}`}>{value}</p>
        <p className="truncate text-sm text-text-muted">{label}</p>
      </div>
    </div>
  );
}
