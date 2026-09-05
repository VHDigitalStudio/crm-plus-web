export type StatusJudicial = "em-andamento" | "suspenso" | "sentenciado" | "arquivado" | "extinto";
export type StatusInterno =
  | "novo"
  | "em-analise"
  | "em-andamento"
  | "aguardando-cliente"
  | "aguardando-decisao"
  | "finalizado";

/**
 * Campos opcionais alinhados ao array `partes` retornado pela API de
 * acompanhamento processual da JusBrasil Soluções (GET /api/tribproc):
 * `documento` = cpf/cnpj formatado da parte; `tipoPessoa` = is_pessoa_fisica.
 * Preenchidos manualmente por enquanto — viriam prontos da API no futuro.
 */
export interface ParteProcesso {
  papel: string;
  nome: string;
  documento?: string;
  tipoPessoa?: "fisica" | "juridica";
}

/**
 * Campos alinhados ao array `movs` da mesma API: `titulo`/`descricao`/`data`
 * batem direto; `juiz` é retornado pela API mas não temos hoje (opcional).
 * `origem` é nosso campo interno (de onde veio a movimentação: TJSP, advogado, etc.).
 */
export interface MovimentacaoProcesso {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
  origem: string;
  juiz?: string;
}

/**
 * Campos deste tipo que já correspondem 1:1 a uma futura integração com a API
 * de acompanhamento processual (JusBrasil Soluções / Digesto):
 *   numero → numero · tribunal → tribunal · comarca → comarca
 *   vara → vara_original · classeProcessual → classeNatureza · area → area
 *   dataAbertura → distribuicaoData · ultimaAtualizacaoData → alteradoEm
 *   partes → partes[] · movimentacoes → movs[]
 * `statusJudicial` é uma abstração nossa — a API não devolve esse enum
 * pronto, só as flags `extinto`/`arquivado`; um futuro adapter precisaria
 * derivar esse campo a partir delas. `statusInterno`, `clienteId`,
 * `advogadoResponsavel` e `observacoes` são inteiramente internos ao CRM.
 */
export interface Processo {
  id: string;
  numero: string;
  clienteId: string;
  clienteNome: string;
  advogadoResponsavel: string;
  tribunal: string;
  estado: string;
  comarca: string;
  vara: string;
  classeProcessual: string;
  area: string;
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
