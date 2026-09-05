export interface DashboardMetrics {
  totalClientes: number;
  clientesAtivos: number;
  totalProcessos: number;
  processosAtivos: number;
  processosFinalizados: number;
  processosSemAtualizacao: number;
  tarefasPendentes: number;
  tarefasAtrasadas: number;
  prazosProximos: number;
  prazosVencidos: number;
  mensagensNaoLidas: number;
  documentosPendentes: number;
  novosAndamentos: number;
}

export type DeadlineSituation = "vencido" | "vencendo-hoje" | "proximo" | "normal";
export type TaskPriority = "baixa" | "normal" | "alta" | "urgente";

export interface UpcomingDeadline {
  id: string;
  taskName: string;
  processNumber: string;
  clientName: string;
  responsible: string;
  dueDate: string;
  priority: TaskPriority;
  situation: DeadlineSituation;
}

export interface ProcessUpdate {
  id: string;
  processNumber: string;
  clientName: string;
  movementType: string;
  summary: string;
  date: string;
  origin: string;
}

export type ActivityType =
  | "cliente-criado"
  | "processo-criado"
  | "movimentacao"
  | "documento-recebido"
  | "documento-solicitado"
  | "tarefa-criada"
  | "tarefa-concluida"
  | "mensagem"
  | "processo-atualizado";

export interface RecentActivity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
}

export interface DashboardOverview {
  metrics: DashboardMetrics;
  upcomingDeadlines: UpcomingDeadline[];
  recentUpdates: ProcessUpdate[];
  recentActivity: RecentActivity[];
}
