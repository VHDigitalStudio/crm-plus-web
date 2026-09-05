import {
  CheckSquareIcon,
  ClockIcon,
  FileIcon,
  MessageCircleIcon,
  TrendingUpIcon,
} from "../../../../shared/components/icons";
import { useDashboardOverview } from "../hooks/useDashboardOverview";
import { ActivityFeed } from "../components/ActivityFeed";
import { CompositionCard } from "../components/CompositionCard";
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
    { key: "processosSemAtualizacao", label: "Sem atualização recente", value: metrics.processosSemAtualizacao, icon: ClockIcon },
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
          <div className="flex flex-col gap-3.5">
            <MetricCard label="Prazos vencidos" value={metrics.prazosVencidos} icon={ClockIcon} tone="danger" />
            <MetricCard label="Tarefas atrasadas" value={metrics.tarefasAtrasadas} icon={CheckSquareIcon} tone="danger" />
          </div>
          <div className="flex flex-col gap-3.5">
            <MetricCard label="Documentos pendentes" value={metrics.documentosPendentes} icon={FileIcon} tone="warning" />
            <MetricCard label="Mensagens não lidas" value={metrics.mensagensNaoLidas} icon={MessageCircleIcon} tone="accent" />
          </div>
          <CompositionCard
            label="Processos"
            total={metrics.totalProcessos}
            items={[
              { label: "Ativos", value: metrics.processosAtivos, tone: "accent" },
              { label: "Finalizados", value: metrics.processosFinalizados, tone: "success" },
            ]}
          />
          <CompositionCard
            label="Clientes"
            total={metrics.totalClientes}
            items={[
              { label: "Ativos", value: metrics.clientesAtivos, tone: "accent" },
              { label: "Inativos", value: metrics.totalClientes - metrics.clientesAtivos, tone: "neutral" },
            ]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3.5">
        <h2 className="text-base font-semibold text-text">Visão geral</h2>
        <OverviewStatsGrid items={overviewStats} />
      </section>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-3.5">
            <h2 className="text-xl font-semibold text-text">Próximos prazos</h2>
            <DeadlinesSection deadlines={overview.upcomingDeadlines} />
          </section>

          <section className="flex flex-col gap-3.5">
            <h2 className="text-xl font-semibold text-text">Novos andamentos</h2>
            <UpdatesSection updates={overview.recentUpdates} />
          </section>
        </div>

        <section className="flex flex-col gap-3.5">
          <h2 className="text-xl font-semibold text-text">Atividades recentes</h2>
          <ActivityFeed activities={overview.recentActivity} />
        </section>
      </div>
    </div>
  );
}
