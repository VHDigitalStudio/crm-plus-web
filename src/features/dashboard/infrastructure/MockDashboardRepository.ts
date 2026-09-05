import type {
  DashboardOverview,
  DeadlineSituation,
  RecentActivity,
  UpcomingDeadline,
} from "../domain/DashboardOverview";
import type { DashboardRepository } from "../domain/DashboardRepository";

const DAY_MS = 24 * 60 * 60 * 1000;

function offsetDate(days: number): string {
  return new Date(Date.now() + days * DAY_MS).toISOString();
}

function situationForOffset(days: number): DeadlineSituation {
  if (days < 0) return "vencido";
  if (days === 0) return "vencendo-hoje";
  if (days <= 5) return "proximo";
  return "normal";
}

function buildUpcomingDeadlines(): UpcomingDeadline[] {
  const specs: Array<Omit<UpcomingDeadline, "dueDate" | "situation"> & { offsetDays: number }> = [
    {
      id: "d1",
      taskName: "Protocolar contestação",
      processNumber: "0001234-56.2025.8.26.0100",
      clientName: "Marcos Andrade",
      responsible: "Dra. Beatriz Lima",
      priority: "urgente",
      offsetDays: -2,
    },
    {
      id: "d2",
      taskName: "Enviar réplica à petição",
      processNumber: "0004521-11.2024.8.26.0002",
      clientName: "Comércio Silva Ltda.",
      responsible: "Dr. Rafael Nunes",
      priority: "alta",
      offsetDays: 0,
    },
    {
      id: "d3",
      taskName: "Audiência de conciliação",
      processNumber: "0007788-90.2025.8.26.0053",
      clientName: "Juliana Ferreira",
      responsible: "Dra. Beatriz Lima",
      priority: "alta",
      offsetDays: 2,
    },
    {
      id: "d4",
      taskName: "Apresentar recurso",
      processNumber: "0002210-77.2023.8.26.0100",
      clientName: "Marcos Andrade",
      responsible: "Dr. Rafael Nunes",
      priority: "normal",
      offsetDays: 5,
    },
    {
      id: "d5",
      taskName: "Revisar minuta de acordo",
      processNumber: "0009012-34.2025.8.26.0224",
      clientName: "Comércio Silva Ltda.",
      responsible: "Dra. Beatriz Lima",
      priority: "baixa",
      offsetDays: 12,
    },
  ];

  return specs.map(({ offsetDays, ...deadline }) => ({
    ...deadline,
    dueDate: offsetDate(offsetDays),
    situation: situationForOffset(offsetDays),
  }));
}

function buildRecentActivity(): RecentActivity[] {
  const specs: Array<Omit<RecentActivity, "timestamp"> & { hoursAgo: number }> = [
    { id: "a1", type: "mensagem", description: "Juliana Ferreira enviou uma nova mensagem", hoursAgo: 1 },
    { id: "a2", type: "movimentacao", description: "Nova movimentação no processo de Marcos Andrade", hoursAgo: 4 },
    { id: "a3", type: "tarefa-concluida", description: "Tarefa \"Enviar procuração\" foi concluída", hoursAgo: 9 },
    { id: "a4", type: "documento-recebido", description: "Comércio Silva Ltda. enviou um comprovante", hoursAgo: 22 },
    { id: "a5", type: "cliente-criado", description: "Novo cliente cadastrado: Juliana Ferreira", hoursAgo: 30 },
    { id: "a6", type: "processo-criado", description: "Novo processo aberto para Comércio Silva Ltda.", hoursAgo: 48 },
  ];

  return specs.map(({ hoursAgo, ...activity }) => ({
    ...activity,
    timestamp: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
  }));
}

export class MockDashboardRepository implements DashboardRepository {
  async getOverview(): Promise<DashboardOverview> {
    return {
      metrics: {
        totalClientes: 18,
        clientesAtivos: 14,
        totalProcessos: 27,
        processosAtivos: 19,
        processosFinalizados: 8,
        processosSemAtualizacao: 3,
        tarefasPendentes: 11,
        tarefasAtrasadas: 2,
        prazosProximos: 4,
        prazosVencidos: 1,
        mensagensNaoLidas: 5,
        documentosPendentes: 3,
        novosAndamentos: 6,
      },
      upcomingDeadlines: buildUpcomingDeadlines(),
      recentUpdates: [
        {
          id: "u1",
          processNumber: "0001234-56.2025.8.26.0100",
          clientName: "Marcos Andrade",
          movementType: "Juntada de petição",
          summary: "Uma nova petição foi adicionada ao processo.",
          date: offsetDate(-1),
          origin: "TJSP",
        },
        {
          id: "u2",
          processNumber: "0004521-11.2024.8.26.0002",
          clientName: "Comércio Silva Ltda.",
          movementType: "Decisão interlocutória",
          summary: "Juiz decidiu sobre o pedido de tutela de urgência.",
          date: offsetDate(-2),
          origin: "TJSP",
        },
        {
          id: "u3",
          processNumber: "0007788-90.2025.8.26.0053",
          clientName: "Juliana Ferreira",
          movementType: "Audiência designada",
          summary: "Audiência de conciliação marcada.",
          date: offsetDate(-3),
          origin: "TJSP",
        },
      ],
      recentActivity: buildRecentActivity(),
    };
  }
}
