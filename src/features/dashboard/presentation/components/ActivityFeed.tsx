import type { ComponentType, SVGProps } from "react";
import { formatRelativeDate } from "../../../../shared/utils/formatRelativeDate";
import {
  CheckSquareIcon,
  FileIcon,
  FolderIcon,
  MessageCircleIcon,
  TrendingUpIcon,
  UsersIcon,
} from "../../../../shared/components/icons";
import type { ActivityType, RecentActivity } from "../../domain/DashboardOverview";

const ACTIVITY_ICON: Record<ActivityType, ComponentType<SVGProps<SVGSVGElement>>> = {
  "cliente-criado": UsersIcon,
  "processo-criado": FolderIcon,
  movimentacao: TrendingUpIcon,
  "documento-recebido": FileIcon,
  "documento-solicitado": FileIcon,
  "tarefa-criada": CheckSquareIcon,
  "tarefa-concluida": CheckSquareIcon,
  mensagem: MessageCircleIcon,
  "processo-atualizado": FolderIcon,
};

interface ActivityFeedProps {
  activities: RecentActivity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return <p className="text-sm text-text-muted">Nenhuma atividade recente.</p>;
  }

  return (
    <ul className="card-surface flex flex-1 flex-col p-5">
      {activities.map((activity, index) => {
        const Icon = ACTIVITY_ICON[activity.type];
        const isLast = index === activities.length - 1;

        return (
          <li key={activity.id} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-text-muted">
                <Icon width={17} height={17} />
              </span>
              {!isLast && <span className="w-px flex-1 bg-border/40" />}
            </div>
            <div className={isLast ? "" : "pb-6"}>
              <p className="text-base text-text">{activity.description}</p>
              <p className="mt-0.5 text-sm text-text-muted">{formatRelativeDate(activity.timestamp)}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
