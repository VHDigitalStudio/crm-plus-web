import { formatDate } from "../../../../shared/utils/formatDate";
import type { ProcessUpdate } from "../../domain/DashboardOverview";

interface UpdatesSectionProps {
  updates: ProcessUpdate[];
}

export function UpdatesSection({ updates }: UpdatesSectionProps) {
  if (updates.length === 0) {
    return <p className="text-sm text-text-muted">Nenhuma movimentação recente.</p>;
  }

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface-card">
      {updates.map((update) => (
        <div key={update.id} className="p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-sm font-medium text-text">{update.movementType}</span>
            <span className="text-xs tabular-nums text-text-muted">{formatDate(update.date)}</span>
          </div>
          <p className="mt-1 text-sm text-text-muted">{update.summary}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
            <span className="font-mono">{update.processNumber}</span>
            <span>{update.clientName}</span>
            <span>Origem: {update.origin}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
