import type { Cliente, NovoClienteInput } from "../domain/Cliente";
import type { ClienteRepository } from "../domain/ClienteRepository";

export function atualizarCliente(repository: ClienteRepository) {
  return (id: string, data: NovoClienteInput): Promise<Cliente> => repository.atualizar(id, data);
}
