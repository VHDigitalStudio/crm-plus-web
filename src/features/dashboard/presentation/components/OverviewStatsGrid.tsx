import type { ComponentType, SVGProps } from "react";

export interface OverviewStatItem {
  key: string;
  label: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface OverviewStatsGridProps {
  items: OverviewStatItem[];
}

export function OverviewStatsGrid({ items }: OverviewStatsGridProps) {
  return (
    <div className="card-surface grid grid-cols-2 gap-1 p-2 sm:grid-cols-3">
      {items.map(({ key, label, value, icon: Icon }) => (
        <div key={key} className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-surface-elevated/60">
          <Icon className="shrink-0 text-text-muted" width={16} height={16} />
          <div className="min-w-0">
            <p className="text-lg font-semibold tabular-nums text-text">{value}</p>
            <p className="truncate text-xs text-text-muted">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
