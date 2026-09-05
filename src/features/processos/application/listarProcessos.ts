import type { Processo } from "../domain/Processo";
import type { ProcessoRepository } from "../domain/ProcessoRepository";

export function listarProcessos(repository: ProcessoRepository) {
  return (): Promise<Processo[]> => repository.listar();
}
