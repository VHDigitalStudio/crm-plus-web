import type { NovoProcessoInput, Processo } from "../domain/Processo";
import type { ProcessoRepository } from "../domain/ProcessoRepository";

export function atualizarProcesso(repository: ProcessoRepository) {
  return (id: string, data: NovoProcessoInput): Promise<Processo> => repository.atualizar(id, data);
}
