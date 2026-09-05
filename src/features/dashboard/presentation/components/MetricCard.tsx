import type { ComponentType, SVGProps } from "react";

type MetricTone = "neutral" | "accent" | "success" | "warning" | "danger";

interface MetricCardProps {
  label: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone?: MetricTone;
}

const TONE_CLASSES: Record<MetricTone, string> = {
  neutral: "bg-surface-elevated text-text-muted",
  accent: "bg-accent/15 text-accent",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
};

export function MetricCard({ label, value, icon: Icon, tone = "neutral" }: MetricCardProps) {
  return (
    <div className="card-surface flex items-center gap-3 p-4">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[tone]}`}>
        <Icon width={18} height={18} />
      </span>
      <div className="min-w-0">
        <p className="text-xl font-semibold tabular-nums text-text">{value}</p>
        <p className="truncate text-xs text-text-muted">{label}</p>
      </div>
    </div>
  );
}
