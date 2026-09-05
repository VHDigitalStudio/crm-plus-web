import { useMemo } from "react";
import { useProcessos } from "../features/processos/presentation/hooks/useProcessos";
import { ClientesListPage, type ProcessoCount } from "../features/clientes/presentation/pages/ClientesListPage";

export function ClientesListRoute() {
  const { processos } = useProcessos();

  const processoCounts = useMemo(() => {
    const counts: Record<string, ProcessoCount> = {};

    for (const processo of processos) {
      const current = counts[processo.clienteId] ?? { total: 0, ativos: 0 };
      current.total += 1;
      if (processo.statusInterno !== "finalizado") {
        current.ativos += 1;
      }
      counts[processo.clienteId] = current;
    }

    return counts;
  }, [processos]);

  return <ClientesListPage processoCounts={processoCounts} />;
}
