import { atualizarProcesso } from "./application/atualizarProcesso";
import { criarProcesso } from "./application/criarProcesso";
import { listarProcessos } from "./application/listarProcessos";
import { obterProcesso } from "./application/obterProcesso";
import { LocalStorageProcessoRepository } from "./infrastructure/LocalStorageProcessoRepository";

const processoRepository = new LocalStorageProcessoRepository();

export const listarProcessosUseCase = listarProcessos(processoRepository);
export const obterProcessoUseCase = obterProcesso(processoRepository);
export const criarProcessoUseCase = criarProcesso(processoRepository);
export const atualizarProcessoUseCase = atualizarProcesso(processoRepository);
