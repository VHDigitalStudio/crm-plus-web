import { Badge } from "../../../../shared/components/Badge";
import { formatDate } from "../../../../shared/utils/formatDate";
import type { DeadlineSituation, TaskPriority, UpcomingDeadline } from "../../domain/DashboardOverview";

const SITUATION_ORDER: DeadlineSituation[] = ["vencido", "vencendo-hoje", "proximo", "normal"];

const SITUATION_LABELS: Record<DeadlineSituation, string> = {
  vencido: "Vencidos",
  "vencendo-hoje": "Vencendo hoje",
  proximo: "Próximos",
  normal: "Prazo normal",
};

const SITUATION_STRIPE: Record<DeadlineSituation, string> = {
  vencido: "border-l-danger",
  "vencendo-hoje": "border-l-warning",
  proximo: "border-l-accent",
  normal: "border-l-border",
};

const PRIORITY_BADGE: Record<TaskPriority, { label: string; variant: "neutral" | "accent" | "success" | "warning" | "danger" }> = {
  baixa: { label: "Baixa", variant: "neutral" },
  normal: { label: "Normal", variant: "neutral" },
  alta: { label: "Alta", variant: "warning" },
  urgente: { label: "Urgente", variant: "danger" },
};

interface DeadlinesSectionProps {
  deadlines: UpcomingDeadline[];
}

export function DeadlinesSection({ deadlines }: DeadlinesSectionProps) {
  const groups = SITUATION_ORDER.map((situation) => ({
    situation,
    items: deadlines.filter((deadline) => deadline.situation === situation),
  })).filter((group) => group.items.length > 0);

  if (groups.length === 0) {
    return <p className="text-sm text-text-muted">Nenhum prazo cadastrado.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map(({ situation, items }) => (
        <div key={situation} className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            {SITUATION_LABELS[situation]}
          </h3>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-elevated text-left text-xs text-text-muted">
                  <th className="px-4 py-2.5 font-medium">Tarefa</th>
                  <th className="px-4 py-2.5 font-medium">Processo</th>
                  <th className="px-4 py-2.5 font-medium">Cliente</th>
                  <th className="px-4 py-2.5 font-medium">Responsável</th>
                  <th className="px-4 py-2.5 font-medium">Data limite</th>
                  <th className="px-4 py-2.5 font-medium">Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {items.map((deadline) => (
                  <tr
                    key={deadline.id}
                    className={`border-b border-border bg-surface-card last:border-b-0 border-l-2 ${SITUATION_STRIPE[situation]}`}
                  >
                    <td className="px-4 py-2.5 font-medium text-text">{deadline.taskName}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-text-muted">{deadline.processNumber}</td>
                    <td className="px-4 py-2.5 text-text-muted">{deadline.clientName}</td>
                    <td className="px-4 py-2.5 text-text-muted">{deadline.responsible}</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-muted">{formatDate(deadline.dueDate)}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={PRIORITY_BADGE[deadline.priority].variant}>
                        {PRIORITY_BADGE[deadline.priority].label}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
