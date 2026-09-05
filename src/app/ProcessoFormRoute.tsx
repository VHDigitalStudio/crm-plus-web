import { useCurrentUser } from "../features/auth/presentation/hooks/useCurrentUser";
import { useClientes } from "../features/clientes/presentation/hooks/useClientes";
import { ProcessoFormPage } from "../features/processos/presentation/pages/ProcessoFormPage";

export function ProcessoFormRoute() {
  const { clientes, loading } = useClientes();
  const { user } = useCurrentUser();

  const clienteOptions = clientes.map((cliente) => ({ id: cliente.id, nome: cliente.nome }));

  return (
    <ProcessoFormPage
      clienteOptions={clienteOptions}
      clienteOptionsLoading={loading}
      advogadoResponsavel={user?.name ?? ""}
    />
  );
}
