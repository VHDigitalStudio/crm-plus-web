import type { NovoProcessoInput, Processo } from "../domain/Processo";
import type { ProcessoRepository } from "../domain/ProcessoRepository";

export function criarProcesso(repository: ProcessoRepository) {
  return (data: NovoProcessoInput): Promise<Processo> => repository.criar(data);
}
