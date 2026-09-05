export class ProcessoNaoEncontradoError extends Error {
  constructor() {
    super("Processo não encontrado.");
    this.name = "ProcessoNaoEncontradoError";
  }
}
