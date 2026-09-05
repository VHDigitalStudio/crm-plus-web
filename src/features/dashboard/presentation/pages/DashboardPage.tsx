import {
  CheckSquareIcon,
  ClockIcon,
  FileIcon,
  FolderIcon,
  MessageCircleIcon,
  TrendingUpIcon,
  UsersIcon,
} from "../../../../shared/components/icons";
import { useDashboardOverview } from "../hooks/useDashboardOverview";
import { ActivityFeed } from "../components/ActivityFeed";
import { DeadlinesSection } from "../components/DeadlinesSection";
import { MetricCard } from "../components/MetricCard";
import { OverviewStatsGrid, type OverviewStatItem } from "../components/OverviewStatsGrid";
import { UpdatesSection } from "../components/UpdatesSection";

export function DashboardPage() {
  const { overview, loading } = useDashboardOverview();

  if (loading || !overview) {
    return <p className="text-base text-text-muted">Carregando dashboard...</p>;
  }

  const { metrics } = overview;

  const overviewStats: OverviewStatItem[] = [
    { key: "totalClientes", label: "Total de clientes", value: metrics.totalClientes, icon: UsersIcon },
    { key: "clientesAtivos", label: "Clientes ativos", value: metrics.clientesAtivos, icon: UsersIcon },
    { key: "totalProcessos", label: "Total de processos", value: metrics.totalProcessos, icon: FolderIcon },
    { key: "processosAtivos", label: "Processos ativos", value: metrics.processosAtivos, icon: FolderIcon },
    { key: "processosFinalizados", label: "Processos finalizados", value: metrics.processosFinalizados, icon: FolderIcon },
    { key: "processosSemAtualizacao", label: "Sem atualização recente", value: metrics.processosSemAtualizacao, icon: FolderIcon },
    { key: "tarefasPendentes", label: "Tarefas pendentes", value: metrics.tarefasPendentes, icon: CheckSquareIcon },
    { key: "prazosProximos", label: "Prazos próximos", value: metrics.prazosProximos, icon: ClockIcon },
    { key: "novosAndamentos", label: "Novos andamentos", value: metrics.novosAndamentos, icon: TrendingUpIcon },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-semibold text-text">Dashboard</h1>
        <p className="mt-1.5 text-base text-text-muted">Visão geral do escritório.</p>
      </div>

      <section className="flex flex-col gap-3.5">
        <h2 className="text-base font-semibold text-text">Precisa da sua atenção</h2>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Prazos vencidos" value={metrics.prazosVencidos} icon={ClockIcon} tone="danger" />
          <MetricCard label="Tarefas atrasadas" value={metrics.tarefasAtrasadas} icon={CheckSquareIcon} tone="danger" />
          <MetricCard label="Documentos pendentes" value={metrics.documentosPendentes} icon={FileIcon} tone="warning" />
          <MetricCard label="Mensagens não lidas" value={metrics.mensagensNaoLidas} icon={MessageCircleIcon} tone="accent" />
        </div>
      </section>

      <section className="flex flex-col gap-3.5">
        <h2 className="text-base font-semibold text-text">Visão geral</h2>
        <OverviewStatsGrid items={overviewStats} />
      </section>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section className="flex flex-col gap-3.5">
          <h2 className="text-xl font-semibold text-text">Próximos prazos</h2>
          <DeadlinesSection deadlines={overview.upcomingDeadlines} />
        </section>

        <section className="flex flex-col gap-3.5">
          <h2 className="text-xl font-semibold text-text">Atividades recentes</h2>
          <ActivityFeed activities={overview.recentActivity} />
        </section>
      </div>

      <section className="flex flex-col gap-3.5">
        <h2 className="text-xl font-semibold text-text">Novos andamentos</h2>
        <UpdatesSection updates={overview.recentUpdates} />
      </section>
    </div>
  );
}
