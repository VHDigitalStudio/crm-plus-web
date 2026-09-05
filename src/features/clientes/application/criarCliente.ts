import type { Cliente, NovoClienteInput } from "../domain/Cliente";
import type { ClienteRepository } from "../domain/ClienteRepository";

export function criarCliente(repository: ClienteRepository) {
  return (data: NovoClienteInput): Promise<Cliente> => repository.criar(data);
}
