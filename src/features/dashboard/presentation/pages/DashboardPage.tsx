import type { ComponentType, SVGProps } from "react";
import {
  CheckSquareIcon,
  ClockIcon,
  FileIcon,
  FolderIcon,
  MessageCircleIcon,
  TrendingUpIcon,
  UsersIcon,
} from "../../../../shared/components/icons";
import type { DashboardMetrics } from "../../domain/DashboardOverview";
import { useDashboardOverview } from "../hooks/useDashboardOverview";
import { ActivityFeed } from "../components/ActivityFeed";
import { DeadlinesSection } from "../components/DeadlinesSection";
import { MetricCard } from "../components/MetricCard";
import { UpdatesSection } from "../components/UpdatesSection";

type MetricTone = "neutral" | "accent" | "success" | "warning" | "danger";

interface MetricDefinition {
  key: keyof DashboardMetrics;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: MetricTone;
}

interface MetricGroup {
  title: string;
  metrics: MetricDefinition[];
}

const METRIC_GROUPS: MetricGroup[] = [
  {
    title: "Clientes",
    metrics: [
      { key: "totalClientes", label: "Total de clientes", icon: UsersIcon, tone: "neutral" },
      { key: "clientesAtivos", label: "Clientes ativos", icon: UsersIcon, tone: "success" },
    ],
  },
  {
    title: "Processos",
    metrics: [
      { key: "totalProcessos", label: "Total de processos", icon: FolderIcon, tone: "neutral" },
      { key: "processosAtivos", label: "Processos ativos", icon: FolderIcon, tone: "accent" },
      { key: "processosFinalizados", label: "Processos finalizados", icon: FolderIcon, tone: "success" },
      { key: "processosSemAtualizacao", label: "Sem atualização recente", icon: FolderIcon, tone: "warning" },
    ],
  },
  {
    title: "Tarefas & prazos",
    metrics: [
      { key: "tarefasPendentes", label: "Tarefas pendentes", icon: CheckSquareIcon, tone: "neutral" },
      { key: "tarefasAtrasadas", label: "Tarefas atrasadas", icon: CheckSquareIcon, tone: "danger" },
      { key: "prazosProximos", label: "Prazos próximos", icon: ClockIcon, tone: "warning" },
      { key: "prazosVencidos", label: "Prazos vencidos", icon: ClockIcon, tone: "danger" },
    ],
  },
  {
    title: "Comunicação & documentos",
    metrics: [
      { key: "mensagensNaoLidas", label: "Mensagens não lidas", icon: MessageCircleIcon, tone: "accent" },
      { key: "documentosPendentes", label: "Documentos pendentes", icon: FileIcon, tone: "warning" },
      { key: "novosAndamentos", label: "Novos andamentos", icon: TrendingUpIcon, tone: "accent" },
    ],
  },
];

export function DashboardPage() {
  const { overview, loading } = useDashboardOverview();

  if (loading || !overview) {
    return <p className="text-sm text-text-muted">Carregando dashboard...</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
        <p className="mt-1 text-sm text-text-muted">Visão geral do escritório.</p>
      </div>

      <div className="flex flex-col gap-6">
        {METRIC_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">{group.title}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {group.metrics.map((metric) => (
                <MetricCard
                  key={metric.key}
                  label={metric.label}
                  value={overview.metrics[metric.key]}
                  icon={metric.icon}
                  tone={metric.tone}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-text">Próximos prazos</h2>
          <DeadlinesSection deadlines={overview.upcomingDeadlines} />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-text">Atividades recentes</h2>
          <ActivityFeed activities={overview.recentActivity} />
        </section>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-text">Novos andamentos</h2>
        <UpdatesSection updates={overview.recentUpdates} />
      </section>
    </div>
  );
}
