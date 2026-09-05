import { Badge } from "../../../../shared/components/Badge";
import { formatDate } from "../../../../shared/utils/formatDate";
import type { DeadlineSituation, TaskPriority, UpcomingDeadline } from "../../domain/DashboardOverview";

const SITUATION_ORDER: Record<DeadlineSituation, number> = {
  vencido: 0,
  "vencendo-hoje": 1,
  proximo: 2,
  normal: 3,
};

const SITUATION_BADGE: Record<DeadlineSituation, { label: string; variant: "neutral" | "accent" | "warning" | "danger" }> = {
  vencido: { label: "Vencido", variant: "danger" },
  "vencendo-hoje": { label: "Vencendo hoje", variant: "warning" },
  proximo: { label: "Próximo", variant: "accent" },
  normal: { label: "Normal", variant: "neutral" },
};

const SITUATION_STRIPE: Record<DeadlineSituation, string> = {
  vencido: "border-l-danger",
  "vencendo-hoje": "border-l-warning",
  proximo: "border-l-accent",
  normal: "border-l-transparent",
};

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  baixa: "Baixa",
  normal: "Normal",
  alta: "Alta",
  urgente: "Urgente",
};

interface DeadlinesSectionProps {
  deadlines: UpcomingDeadline[];
}

export function DeadlinesSection({ deadlines }: DeadlinesSectionProps) {
  if (deadlines.length === 0) {
    return <p className="text-sm text-text-muted">Nenhum prazo cadastrado.</p>;
  }

  const sorted = [...deadlines].sort((a, b) => SITUATION_ORDER[a.situation] - SITUATION_ORDER[b.situation]);

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface-card">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr className="text-left text-xs text-text-muted">
            <th className="px-4 py-3 font-medium">Tarefa</th>
            <th className="px-4 py-3 font-medium">Cliente</th>
            <th className="px-4 py-3 font-medium">Responsável</th>
            <th className="px-4 py-3 font-medium">Data limite</th>
            <th className="px-4 py-3 font-medium">Prioridade</th>
            <th className="px-4 py-3 font-medium">Situação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sorted.map((deadline) => (
            <tr key={deadline.id} className={`border-l-2 ${SITUATION_STRIPE[deadline.situation]}`}>
              <td className="px-4 py-3">
                <p className="font-medium text-text">{deadline.taskName}</p>
                <p className="font-mono text-xs text-text-muted">{deadline.processNumber}</p>
              </td>
              <td className="px-4 py-3 text-text-muted">{deadline.clientName}</td>
              <td className="px-4 py-3 text-text-muted">{deadline.responsible}</td>
              <td className="px-4 py-3 tabular-nums text-text-muted">{formatDate(deadline.dueDate)}</td>
              <td className="px-4 py-3 text-text-muted">{PRIORITY_LABEL[deadline.priority]}</td>
              <td className="px-4 py-3">
                <Badge variant={SITUATION_BADGE[deadline.situation].variant}>
                  {SITUATION_BADGE[deadline.situation].label}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
