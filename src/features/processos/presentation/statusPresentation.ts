import type { BadgeVariant } from "../../../shared/components/Badge";
import type { StatusInterno, StatusJudicial } from "../domain/Processo";

export const STATUS_INTERNO_LABEL: Record<StatusInterno, string> = {
  novo: "Novo",
  "em-analise": "Em análise",
  "em-andamento": "Em andamento",
  "aguardando-cliente": "Aguardando cliente",
  "aguardando-decisao": "Aguardando decisão",
  finalizado: "Finalizado",
};

export const STATUS_INTERNO_TONE: Record<StatusInterno, BadgeVariant> = {
  novo: "neutral",
  "em-analise": "accent",
  "em-andamento": "accent",
  "aguardando-cliente": "warning",
  "aguardando-decisao": "warning",
  finalizado: "success",
};

export const STATUS_JUDICIAL_LABEL: Record<StatusJudicial, string> = {
  "em-andamento": "Em andamento",
  suspenso: "Suspenso",
  sentenciado: "Sentenciado",
  arquivado: "Arquivado",
  extinto: "Extinto",
};
