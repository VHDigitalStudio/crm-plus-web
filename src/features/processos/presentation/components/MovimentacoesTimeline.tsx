import { TrendingUpIcon } from "../../../../shared/components/icons";
import { formatDate } from "../../../../shared/utils/formatDate";
import type { MovimentacaoProcesso } from "../../domain/Processo";

interface MovimentacoesTimelineProps {
  movimentacoes: MovimentacaoProcesso[];
}

export function MovimentacoesTimeline({ movimentacoes }: MovimentacoesTimelineProps) {
  if (movimentacoes.length === 0) {
    return <p className="text-base text-text-muted">Nenhuma movimentação registrada.</p>;
  }

  const ordenadas = [...movimentacoes].sort((a, b) => b.data.localeCompare(a.data));

  return (
    <ul className="flex flex-col">
      {ordenadas.map((movimentacao, index) => {
        const isLast = index === ordenadas.length - 1;

        return (
          <li key={movimentacao.id} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-text-muted">
                <TrendingUpIcon width={17} height={17} />
              </span>
              {!isLast && <span className="w-px flex-1 bg-border/40" />}
            </div>
            <div className={isLast ? "pb-1" : "pb-6"}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <p className="text-base font-medium text-text">{movimentacao.titulo}</p>
                <p className="text-sm tabular-nums text-text-muted">{formatDate(movimentacao.data)}</p>
              </div>
              <p className="mt-1 text-sm text-text-muted">{movimentacao.descricao}</p>
              <p className="mt-1 text-xs text-text-muted">Origem: {movimentacao.origem}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
