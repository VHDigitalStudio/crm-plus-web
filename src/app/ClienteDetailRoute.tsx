import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProcessos } from "../features/processos/presentation/hooks/useProcessos";
import { ClienteDetailPage } from "../features/clientes/presentation/pages/ClienteDetailPage";

export function ClienteDetailRoute() {
  const { id } = useParams<{ id: string }>();
  const { processos } = useProcessos();

  const processoCount = useMemo(() => {
    const doCliente = processos.filter((processo) => processo.clienteId === id);
    const ativos = doCliente.filter((processo) => processo.statusInterno !== "finalizado").length;
    return { total: doCliente.length, ativos };
  }, [processos, id]);

  return <ClienteDetailPage processoCount={processoCount} />;
}
