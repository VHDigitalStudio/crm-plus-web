import { atualizarCliente } from "./application/atualizarCliente";
import { criarCliente } from "./application/criarCliente";
import { listarClientes } from "./application/listarClientes";
import { obterCliente } from "./application/obterCliente";
import { LocalStorageClienteRepository } from "./infrastructure/LocalStorageClienteRepository";

const clienteRepository = new LocalStorageClienteRepository();

export const listarClientesUseCase = listarClientes(clienteRepository);
export const obterClienteUseCase = obterCliente(clienteRepository);
export const criarClienteUseCase = criarCliente(clienteRepository);
export const atualizarClienteUseCase = atualizarCliente(clienteRepository);
