import type { NovoProcessoInput, Processo } from "./Processo";

export interface ProcessoRepository {
  listar(): Promise<Processo[]>;
  obterPorId(id: string): Promise<Processo | null>;
  criar(data: NovoProcessoInput): Promise<Processo>;
  atualizar(id: string, data: NovoProcessoInput): Promise<Processo>;
}
