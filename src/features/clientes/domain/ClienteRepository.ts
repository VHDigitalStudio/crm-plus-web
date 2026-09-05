import type { Cliente, NovoClienteInput } from "./Cliente";

export interface ClienteRepository {
  listar(): Promise<Cliente[]>;
  obterPorId(id: string): Promise<Cliente | null>;
  criar(data: NovoClienteInput): Promise<Cliente>;
  atualizar(id: string, data: NovoClienteInput): Promise<Cliente>;
}
