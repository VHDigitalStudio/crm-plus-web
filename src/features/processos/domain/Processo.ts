export type StatusJudicial = "em-andamento" | "suspenso" | "sentenciado" | "arquivado" | "extinto";
export type StatusInterno =
  | "novo"
  | "em-analise"
  | "em-andamento"
  | "aguardando-cliente"
  | "aguardando-decisao"
  | "finalizado";

export interface ParteProcesso {
  papel: string;
  nome: string;
}

export interface MovimentacaoProcesso {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
  origem: string;
}

export interface Processo {
  id: string;
  numero: string;
  clienteNome: string;
  advogadoResponsavel: string;
  tribunal: string;
  estado: string;
  comarca: string;
  vara: string;
  classeProcessual: string;
  assunto: string;
  partes: ParteProcesso[];
  statusJudicial: StatusJudicial;
  statusInterno: StatusInterno;
  dataAbertura: string;
  ultimaAtualizacaoData: string;
  movimentacoes: MovimentacaoProcesso[];
  observacoes: string;
}

export type NovoProcessoInput = Omit<Processo, "id" | "ultimaAtualizacaoData" | "movimentacoes"> & {
  movimentacoes?: MovimentacaoProcesso[];
};
