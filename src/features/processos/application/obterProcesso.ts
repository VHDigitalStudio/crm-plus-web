import type { Processo } from "../domain/Processo";
import type { ProcessoRepository } from "../domain/ProcessoRepository";

export function obterProcesso(repository: ProcessoRepository) {
  return (id: string): Promise<Processo | null> => repository.obterPorId(id);
}
