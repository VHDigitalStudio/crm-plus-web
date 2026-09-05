import type { Cliente } from "../domain/Cliente";
import type { ClienteRepository } from "../domain/ClienteRepository";

export function listarClientes(repository: ClienteRepository) {
  return (): Promise<Cliente[]> => repository.listar();
}
