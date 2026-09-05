import { ClienteNaoEncontradoError } from "../domain/errors";
import type { Cliente, NovoClienteInput } from "../domain/Cliente";
import type { ClienteRepository } from "../domain/ClienteRepository";

const STORAGE_KEY = "crmjuridico:clientes";
const DAY_MS = 24 * 60 * 60 * 1000;

function offsetDate(days: number): string {
  return new Date(Date.now() + days * DAY_MS).toISOString();
}

function buildSeed(): Cliente[] {
  return [
    {
      id: "c1",
      nome: "Marcos Andrade",
      cpfCnpj: "123.456.789-00",
      dataNascimento: "1985-04-12",
      email: "marcos.andrade@email.com",
      telefone: "(11) 98888-1234",
      whatsapp: "(11) 98888-1234",
      endereco: "Rua das Flores, 120",
      cidade: "São Paulo",
      estado: "SP",
      observacoes: "",
      status: "ativo",
      ultimaInteracao: offsetDate(-1),
    },
    {
      id: "c2",
      nome: "Comércio Silva Ltda.",
      cpfCnpj: "12.345.678/0001-90",
      dataNascimento: "",
      email: "contato@comerciosilva.com.br",
      telefone: "(11) 3222-4455",
      whatsapp: "(11) 98888-5566",
      endereco: "Av. Paulista, 1000",
      cidade: "São Paulo",
      estado: "SP",
      observacoes: "Cliente desde 2022.",
      status: "ativo",
      ultimaInteracao: offsetDate(-2),
    },
    {
      id: "c3",
      nome: "Juliana Ferreira",
      cpfCnpj: "234.567.890-11",
      dataNascimento: "1990-07-22",
      email: "juliana.ferreira@email.com",
      telefone: "(19) 99777-2233",
      whatsapp: "(19) 99777-2233",
      endereco: "Rua Barão de Jaguara, 500",
      cidade: "Campinas",
      estado: "SP",
      observacoes: "",
      status: "ativo",
      ultimaInteracao: offsetDate(-3),
    },
    {
      id: "c4",
      nome: "Fernanda Costa",
      cpfCnpj: "345.678.901-22",
      dataNascimento: "1978-11-03",
      email: "fernanda.costa@email.com",
      telefone: "(11) 97777-8899",
      whatsapp: "(11) 97777-8899",
      endereco: "Rua Augusta, 250",
      cidade: "São Paulo",
      estado: "SP",
      observacoes: "Processo finalizado com sucesso.",
      status: "inativo",
      ultimaInteracao: offsetDate(-60),
    },
    {
      id: "c5",
      nome: "Roberto Mendes",
      cpfCnpj: "456.789.012-33",
      dataNascimento: "1965-02-14",
      email: "roberto.mendes@email.com",
      telefone: "(11) 96666-1122",
      whatsapp: "(11) 96666-1122",
      endereco: "Rua da Consolação, 800",
      cidade: "São Paulo",
      estado: "SP",
      observacoes: "",
      status: "ativo",
      ultimaInteracao: offsetDate(-45),
    },
    {
      id: "c6",
      nome: "Ana Beatriz Souza",
      cpfCnpj: "567.890.123-44",
      dataNascimento: "1982-09-30",
      email: "ana.souza@email.com",
      telefone: "(11) 95555-3344",
      whatsapp: "(11) 95555-3344",
      endereco: "Rua Santo André, 45",
      cidade: "Santo André",
      estado: "SP",
      observacoes: "",
      status: "inativo",
      ultimaInteracao: offsetDate(-400),
    },
    {
      id: "c7",
      nome: "Paulo Ribeiro",
      cpfCnpj: "678.901.234-55",
      dataNascimento: "1995-05-18",
      email: "paulo.ribeiro@email.com",
      telefone: "(11) 94444-1010",
      whatsapp: "(11) 94444-1010",
      endereco: "Rua Vergueiro, 300",
      cidade: "São Paulo",
      estado: "SP",
      observacoes: "Cliente novo, aguardando abertura do primeiro processo.",
      status: "ativo",
      ultimaInteracao: offsetDate(-5),
    },
    {
      id: "c8",
      nome: "Distribuidora Nordeste Ltda.",
      cpfCnpj: "23.456.789/0001-01",
      dataNascimento: "",
      email: "contato@distribuidoranordeste.com.br",
      telefone: "(81) 3333-2200",
      whatsapp: "(81) 98888-2200",
      endereco: "Av. Boa Viagem, 2000",
      cidade: "Recife",
      estado: "PE",
      observacoes: "",
      status: "ativo",
      ultimaInteracao: offsetDate(-12),
    },
    {
      id: "c9",
      nome: "Camila Torres",
      cpfCnpj: "789.012.345-66",
      dataNascimento: "1993-01-25",
      email: "camila.torres@email.com",
      telefone: "(11) 93333-4545",
      whatsapp: "(11) 93333-4545",
      endereco: "Rua Oscar Freire, 600",
      cidade: "São Paulo",
      estado: "SP",
      observacoes: "",
      status: "ativo",
      ultimaInteracao: offsetDate(-7),
    },
    {
      id: "c10",
      nome: "Eduardo Lima",
      cpfCnpj: "890.123.456-77",
      dataNascimento: "1970-06-08",
      email: "eduardo.lima@email.com",
      telefone: "(11) 92222-6767",
      whatsapp: "",
      endereco: "Rua XV de Novembro, 90",
      cidade: "São Paulo",
      estado: "SP",
      observacoes: "Sem contato recente.",
      status: "inativo",
      ultimaInteracao: offsetDate(-500),
    },
    {
      id: "c11",
      nome: "Grupo Almeida Participações S.A.",
      cpfCnpj: "34.567.890/0001-12",
      dataNascimento: "",
      email: "juridico@grupoalmeida.com.br",
      telefone: "(11) 3555-7788",
      whatsapp: "(11) 99999-7788",
      endereco: "Av. Faria Lima, 3500",
      cidade: "São Paulo",
      estado: "SP",
      observacoes: "",
      status: "ativo",
      ultimaInteracao: offsetDate(-3),
    },
    {
      id: "c12",
      nome: "Beatriz Nogueira",
      cpfCnpj: "901.234.567-88",
      dataNascimento: "1998-12-02",
      email: "beatriz.nogueira@email.com",
      telefone: "(11) 91111-9090",
      whatsapp: "(11) 91111-9090",
      endereco: "Rua Haddock Lobo, 700",
      cidade: "São Paulo",
      estado: "SP",
      observacoes: "",
      status: "ativo",
      ultimaInteracao: offsetDate(-1),
    },
  ];
}

function reseed(): Cliente[] {
  const seed = buildSeed();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function readAll(): Cliente[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return reseed();
  }
  try {
    const parsed = JSON.parse(raw) as Cliente[];
    return parsed.length === 0 ? reseed() : parsed;
  } catch {
    return reseed();
  }
}

function writeAll(clientes: Cliente[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
}

export class LocalStorageClienteRepository implements ClienteRepository {
  async listar(): Promise<Cliente[]> {
    return readAll();
  }

  async obterPorId(id: string): Promise<Cliente | null> {
    return readAll().find((cliente) => cliente.id === id) ?? null;
  }

  async criar(data: NovoClienteInput): Promise<Cliente> {
    const clientes = readAll();
    const novo: Cliente = {
      ...data,
      id: crypto.randomUUID(),
      ultimaInteracao: new Date().toISOString(),
    };
    writeAll([novo, ...clientes]);
    return novo;
  }

  async atualizar(id: string, data: NovoClienteInput): Promise<Cliente> {
    const clientes = readAll();
    const index = clientes.findIndex((cliente) => cliente.id === id);
    if (index === -1) {
      throw new ClienteNaoEncontradoError();
    }
    const atualizado: Cliente = {
      ...clientes[index],
      ...data,
      ultimaInteracao: new Date().toISOString(),
    };
    clientes[index] = atualizado;
    writeAll(clientes);
    return atualizado;
  }
}
