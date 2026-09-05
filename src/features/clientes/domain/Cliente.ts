export type ClienteStatus = "ativo" | "inativo";

export interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  whatsapp: string;
  endereco: string;
  cidade: string;
  estado: string;
  observacoes: string;
  status: ClienteStatus;
  ultimaInteracao: string;
}

export type NovoClienteInput = Omit<Cliente, "id" | "ultimaInteracao">;
