import type { BadgeVariant } from "../../../shared/components/Badge";
import type { ClienteStatus } from "../domain/Cliente";

export const CLIENTE_STATUS_LABEL: Record<ClienteStatus, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
};

export const CLIENTE_STATUS_TONE: Record<ClienteStatus, BadgeVariant> = {
  ativo: "success",
  inativo: "neutral",
};
