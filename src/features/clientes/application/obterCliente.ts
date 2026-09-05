import type { Cliente } from "../domain/Cliente";
import type { ClienteRepository } from "../domain/ClienteRepository";

export function obterCliente(repository: ClienteRepository) {
  return (id: string): Promise<Cliente | null> => repository.obterPorId(id);
}
