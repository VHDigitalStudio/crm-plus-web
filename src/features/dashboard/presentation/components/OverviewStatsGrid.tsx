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
    <div className="overflow-hidden rounded-xl border border-border bg-surface-card">
      <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-3">
        {items.map(({ key, label, value, icon: Icon }) => (
          <div key={key} className="flex items-center gap-3 p-4">
            <Icon className="shrink-0 text-text-muted" width={16} height={16} />
            <div className="min-w-0">
              <p className="text-lg font-semibold tabular-nums text-text">{value}</p>
              <p className="truncate text-xs text-text-muted">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
