import { ProcessoNaoEncontradoError } from "../domain/errors";
import type { MovimentacaoProcesso, NovoProcessoInput, Processo } from "../domain/Processo";
import type { ProcessoRepository } from "../domain/ProcessoRepository";

const STORAGE_KEY = "crmjuridico:processos";
const DAY_MS = 24 * 60 * 60 * 1000;

function offsetDate(days: number): string {
  return new Date(Date.now() + days * DAY_MS).toISOString();
}

let movimentacaoSeq = 0;

function mov(diasAtras: number, titulo: string, descricao: string, origem = "TJSP", juiz?: string): MovimentacaoProcesso {
  movimentacaoSeq += 1;
  return {
    id: `seed-mov-${movimentacaoSeq}`,
    data: offsetDate(-diasAtras),
    titulo,
    descricao,
    origem,
    juiz,
  };
}

function buildSeed(): Processo[] {
  return [
    {
      id: "p1",
      numero: "0001234-56.2025.8.26.0100",
      clienteId: "c1",
      clienteNome: "Marcos Andrade",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "São Paulo",
      vara: "3ª Vara Cível",
      classeProcessual: "Procedimento Comum Cível",
      area: "Cível",
      assunto: "Indenização por Danos Morais",
      partes: [
        { papel: "Autor", nome: "Marcos Andrade", documento: "123.456.789-00", tipoPessoa: "fisica" },
        { papel: "Réu", nome: "Comércio ABC Ltda.", documento: "12.345.678/0001-00", tipoPessoa: "juridica" },
      ],
      statusJudicial: "em-andamento",
      statusInterno: "aguardando-decisao",
      dataAbertura: offsetDate(-400),
      ultimaAtualizacaoData: offsetDate(-1),
      movimentacoes: [
        mov(1, "Juntada de petição", "Uma nova petição foi juntada ao processo."),
        mov(30, "Decisão interlocutória", "Juiz indeferiu o pedido de liminar."),
        mov(200, "Contestação apresentada", "Réu apresentou contestação ao pedido inicial."),
        mov(400, "Processo distribuído", "Processo distribuído para a 3ª Vara Cível."),
      ],
      observacoes: "Cliente aguarda decisão sobre pedido de tutela de urgência.",
    },
    {
      id: "p2",
      numero: "0004521-11.2024.8.26.0002",
      clienteId: "c2",
      clienteNome: "Comércio Silva Ltda.",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "São Paulo",
      vara: "2ª Vara Empresarial",
      classeProcessual: "Ação de Cobrança",
      area: "Cível",
      assunto: "Cobrança de Duplicata",
      partes: [
        { papel: "Autor", nome: "Comércio Silva Ltda." },
        { papel: "Réu", nome: "Distribuidora XYZ S.A." },
      ],
      statusJudicial: "em-andamento",
      statusInterno: "em-andamento",
      dataAbertura: offsetDate(-300),
      ultimaAtualizacaoData: offsetDate(-2),
      movimentacoes: [
        mov(2, "Decisão interlocutória", "Juiz decidiu sobre o pedido de tutela de urgência."),
        mov(80, "Réplica apresentada", "Autor apresentou réplica à contestação."),
        mov(300, "Processo distribuído", "Processo distribuído para a 2ª Vara Empresarial."),
      ],
      observacoes: "",
    },
    {
      id: "p3",
      numero: "0007788-90.2025.8.26.0053",
      clienteId: "c3",
      clienteNome: "Juliana Ferreira",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "Campinas",
      vara: "1ª Vara de Família",
      classeProcessual: "Divórcio Litigioso",
      area: "Família",
      assunto: "Divórcio e Partilha de Bens",
      partes: [
        { papel: "Requerente", nome: "Juliana Ferreira" },
        { papel: "Requerido", nome: "Paulo Ferreira" },
      ],
      statusJudicial: "em-andamento",
      statusInterno: "em-andamento",
      dataAbertura: offsetDate(-180),
      ultimaAtualizacaoData: offsetDate(-3),
      movimentacoes: [
        mov(3, "Audiência designada", "Audiência de conciliação marcada."),
        mov(90, "Contestação apresentada", "Requerido apresentou contestação."),
        mov(180, "Processo distribuído", "Processo distribuído para a 1ª Vara de Família."),
      ],
      observacoes: "Audiência de conciliação marcada.",
    },
    {
      id: "p4",
      numero: "0002210-77.2023.8.26.0100",
      clienteId: "c1",
      clienteNome: "Marcos Andrade",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "São Paulo",
      vara: "5ª Câmara de Direito Privado",
      classeProcessual: "Apelação Cível",
      area: "Cível",
      assunto: "Recurso de Apelação",
      partes: [
        { papel: "Apelante", nome: "Marcos Andrade" },
        { papel: "Apelado", nome: "Banco Nacional S.A." },
      ],
      statusJudicial: "em-andamento",
      statusInterno: "aguardando-decisao",
      dataAbertura: offsetDate(-900),
      ultimaAtualizacaoData: offsetDate(-6),
      movimentacoes: [
        mov(6, "Recurso distribuído", "Recurso de apelação distribuído para a 5ª Câmara de Direito Privado."),
        mov(40, "Sentença publicada", "Juiz julgou parcialmente procedente o pedido em 1ª instância."),
        mov(900, "Processo distribuído", "Processo distribuído para a Vara Cível de origem."),
      ],
      observacoes: "",
    },
    {
      id: "p5",
      numero: "0009012-34.2025.8.26.0224",
      clienteId: "c2",
      clienteNome: "Comércio Silva Ltda.",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "Guarulhos",
      vara: "4ª Vara Cível",
      classeProcessual: "Ação de Rescisão Contratual",
      area: "Cível",
      assunto: "Rescisão de Contrato de Fornecimento",
      partes: [
        { papel: "Autor", nome: "Comércio Silva Ltda." },
        { papel: "Réu", nome: "Fornecedora Nacional Ltda." },
      ],
      statusJudicial: "em-andamento",
      statusInterno: "novo",
      dataAbertura: offsetDate(-20),
      ultimaAtualizacaoData: offsetDate(-10),
      movimentacoes: [mov(10, "Processo distribuído", "Processo distribuído para a 4ª Vara Cível.")],
      observacoes: "Aguardando revisão da minuta de acordo.",
    },
    {
      id: "p6",
      numero: "0003345-22.2022.8.26.0100",
      clienteId: "c4",
      clienteNome: "Fernanda Costa",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "São Paulo",
      vara: "7ª Vara Cível",
      classeProcessual: "Ação de Reparação de Danos",
      area: "Cível",
      assunto: "Acidente de Trânsito",
      partes: [
        { papel: "Autor", nome: "Fernanda Costa", documento: "345.678.901-22", tipoPessoa: "fisica" },
        { papel: "Réu", nome: "Transportadora Rápida Ltda.", documento: "45.678.901/0001-23", tipoPessoa: "juridica" },
      ],
      statusJudicial: "sentenciado",
      statusInterno: "finalizado",
      dataAbertura: offsetDate(-1200),
      ultimaAtualizacaoData: offsetDate(-60),
      movimentacoes: [
        mov(60, "Sentença publicada", "Sentença julgou procedente o pedido de indenização.", "TJSP", "Dr. Marcelo Andrade Vidal"),
        mov(300, "Instrução encerrada", "Encerrada a fase de instrução processual."),
        mov(1200, "Processo distribuído", "Processo distribuído para a 7ª Vara Cível."),
      ],
      observacoes: "Processo finalizado com sentença favorável.",
    },
    {
      id: "p7",
      numero: "0005567-88.2021.8.26.0100",
      clienteId: "c5",
      clienteNome: "Roberto Mendes",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "São Paulo",
      vara: "9ª Vara Cível",
      classeProcessual: "Execução de Título Extrajudicial",
      area: "Cível",
      assunto: "Execução de Cheque",
      partes: [
        { papel: "Exequente", nome: "Roberto Mendes" },
        { papel: "Executado", nome: "Comércio Popular Ltda." },
      ],
      statusJudicial: "suspenso",
      statusInterno: "aguardando-cliente",
      dataAbertura: offsetDate(-700),
      ultimaAtualizacaoData: offsetDate(-45),
      movimentacoes: [
        mov(45, "Suspensão por acordo em negociação", "Partes solicitaram suspensão para tentativa de acordo."),
        mov(200, "Penhora realizada", "Realizada penhora de bens do executado."),
        mov(700, "Processo distribuído", "Processo de execução distribuído para a 9ª Vara Cível."),
      ],
      observacoes: "Aguardando documentos do cliente para prosseguir.",
    },
    {
      id: "p8",
      numero: "0006678-10.2020.8.26.0100",
      clienteId: "c6",
      clienteNome: "Ana Beatriz Souza",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "Santo André",
      vara: "2ª Vara Cível",
      classeProcessual: "Ação de Usucapião",
      area: "Cível",
      assunto: "Usucapião Extraordinária",
      partes: [
        { papel: "Autor", nome: "Ana Beatriz Souza", documento: "567.890.123-44", tipoPessoa: "fisica" },
        { papel: "Réu", nome: "Espólio de José Almeida" },
      ],
      statusJudicial: "arquivado",
      statusInterno: "finalizado",
      dataAbertura: offsetDate(-2000),
      ultimaAtualizacaoData: offsetDate(-400),
      movimentacoes: [
        mov(400, "Processo arquivado definitivamente", "Processo arquivado após trânsito em julgado."),
        mov(600, "Sentença publicada", "Juiz reconheceu a usucapião em favor da autora.", "TJSP", "Dra. Camila Rezende Torres"),
        mov(2000, "Processo distribuído", "Processo distribuído para a 2ª Vara Cível."),
      ],
      observacoes: "",
    },
    {
      id: "p9",
      numero: "0008899-45.2025.8.26.0100",
      clienteId: "c3",
      clienteNome: "Juliana Ferreira",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "Campinas",
      vara: "3ª Vara de Família",
      classeProcessual: "Ação de Alimentos",
      area: "Família",
      assunto: "Fixação de Pensão Alimentícia",
      partes: [
        { papel: "Requerente", nome: "Juliana Ferreira" },
        { papel: "Requerido", nome: "Paulo Ferreira" },
      ],
      statusJudicial: "em-andamento",
      statusInterno: "em-analise",
      dataAbertura: offsetDate(-15),
      ultimaAtualizacaoData: offsetDate(-15),
      movimentacoes: [mov(15, "Processo distribuído", "Processo distribuído para a 3ª Vara de Família.")],
      observacoes: "",
    },
    {
      id: "p10",
      numero: "0001122-33.2019.8.26.0100",
      clienteId: "c1",
      clienteNome: "Marcos Andrade",
      advogadoResponsavel: "Dra. Beatriz Lima",
      tribunal: "TJSP",
      estado: "SP",
      comarca: "São Paulo",
      vara: "1ª Vara Cível",
      classeProcessual: "Ação Declaratória",
      area: "Cível",
      assunto: "Declaração de Inexistência de Débito",
      partes: [
        { papel: "Autor", nome: "Marcos Andrade" },
        { papel: "Réu", nome: "Banco Nacional S.A." },
      ],
      statusJudicial: "extinto",
      statusInterno: "finalizado",
      dataAbertura: offsetDate(-1800),
      ultimaAtualizacaoData: offsetDate(-900),
      movimentacoes: [
        mov(900, "Processo extinto sem resolução de mérito", "Juiz extinguiu o processo por ilegitimidade de parte."),
        mov(1200, "Contestação apresentada", "Réu apresentou contestação alegando ilegitimidade de parte."),
        mov(1800, "Processo distribuído", "Processo distribuído para a 1ª Vara Cível."),
      ],
      observacoes: "",
    },
  ];
}

function reseed(): Processo[] {
  const seed = buildSeed();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function readAll(): Processo[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return reseed();
  }
  try {
    const parsed = JSON.parse(raw) as Processo[];
    const isOutdatedShape =
      parsed.length === 0 ||
      parsed.some(
        (processo) =>
          !Array.isArray(processo.movimentacoes) ||
          typeof processo.clienteId !== "string" ||
          typeof processo.area !== "string",
      );
    return isOutdatedShape ? reseed() : parsed;
  } catch {
    return reseed();
  }
}

function writeAll(processos: Processo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(processos));
}

export class LocalStorageProcessoRepository implements ProcessoRepository {
  async listar(): Promise<Processo[]> {
    return readAll();
  }

  async obterPorId(id: string): Promise<Processo | null> {
    return readAll().find((processo) => processo.id === id) ?? null;
  }

  async criar(data: NovoProcessoInput): Promise<Processo> {
    const processos = readAll();
    const novo: Processo = {
      ...data,
      id: crypto.randomUUID(),
      ultimaAtualizacaoData: new Date().toISOString(),
      movimentacoes:
        data.movimentacoes && data.movimentacoes.length > 0
          ? data.movimentacoes
          : [
              {
                id: crypto.randomUUID(),
                data: new Date().toISOString(),
                titulo: "Processo cadastrado",
                descricao: "Processo cadastrado no sistema.",
                origem: "Sistema",
              },
            ],
    };
    writeAll([novo, ...processos]);
    return novo;
  }

  async atualizar(id: string, data: NovoProcessoInput): Promise<Processo> {
    const processos = readAll();
    const index = processos.findIndex((processo) => processo.id === id);
    if (index === -1) {
      throw new ProcessoNaoEncontradoError();
    }
    const atualizado: Processo = {
      ...processos[index],
      ...data,
      ultimaAtualizacaoData: new Date().toISOString(),
    };
    processos[index] = atualizado;
    writeAll(processos);
    return atualizado;
  }
}
