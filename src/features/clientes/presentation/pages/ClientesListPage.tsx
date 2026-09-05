import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../../../shared/components/Badge";
import { Button } from "../../../../shared/components/Button";
import { ArrowUpDownIcon, PlusIcon, SearchIcon } from "../../../../shared/components/icons";
import { SelectField } from "../../../../shared/components/SelectField";
import { TextField } from "../../../../shared/components/TextField";
import { formatDate } from "../../../../shared/utils/formatDate";
import type { Cliente, ClienteStatus } from "../../domain/Cliente";
import { useClientes } from "../hooks/useClientes";
import { CLIENTE_STATUS_LABEL, CLIENTE_STATUS_TONE } from "../statusPresentation";

type SortKey = "nome" | "ultimaInteracao";

const SORT_LABEL: Record<SortKey, string> = {
  nome: "Cliente",
  ultimaInteracao: "Última interação",
};

function matchesSearch(cliente: Cliente, query: string): boolean {
  const haystack = `${cliente.nome} ${cliente.cpfCnpj} ${cliente.email} ${cliente.telefone}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export interface ProcessoCount {
  total: number;
  ativos: number;
}

interface ClientesListPageProps {
  processoCounts?: Record<string, ProcessoCount>;
}

const EMPTY_COUNT: ProcessoCount = { total: 0, ativos: 0 };

export function ClientesListPage({ processoCounts }: ClientesListPageProps) {
  const { clientes, loading } = useClientes();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClienteStatus | "todos">("todos");
  const [sortKey, setSortKey] = useState<SortKey>("ultimaInteracao");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const result = clientes
      .filter((cliente) => (statusFilter === "todos" ? true : cliente.status === statusFilter))
      .filter((cliente) => matchesSearch(cliente, search));

    return [...result].sort((a, b) => {
      const comparison = a[sortKey].localeCompare(b[sortKey]);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [clientes, search, statusFilter, sortKey, sortDirection]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text">Clientes</h1>
          <p className="mt-1.5 text-base text-text-muted">Gerencie os clientes do escritório.</p>
        </div>
        <Link to="/clientes/novo">
          <Button type="button" className="gap-2">
            <PlusIcon width={18} height={18} />
            Cadastrar cliente
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <TextField
            label="Pesquisar"
            placeholder="Nome, CPF/CNPJ, e-mail ou telefone"
            icon={<SearchIcon />}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="sm:w-56">
          <SelectField
            label="Situação"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as ClienteStatus | "todos")}
          >
            <option value="todos">Todos</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </SelectField>
        </div>
      </div>

      {loading ? (
        <p className="text-base text-text-muted">Carregando clientes...</p>
      ) : filtered.length === 0 ? (
        <div className="card-surface p-8 text-center">
          <p className="text-base text-text">Nenhum cliente encontrado.</p>
          <p className="mt-1 text-sm text-text-muted">Tente ajustar a pesquisa ou o filtro de situação.</p>
        </div>
      ) : (
        <div className="card-surface overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-base">
            <thead>
              <tr className="text-left text-sm text-text-muted">
                <th className="px-5 py-3.5 font-medium">
                  <button type="button" onClick={() => toggleSort("nome")} className="flex items-center gap-1.5 hover:text-text">
                    {SORT_LABEL.nome}
                    <ArrowUpDownIcon width={13} height={13} />
                  </button>
                </th>
                <th className="px-5 py-3.5 font-medium">Contato</th>
                <th className="px-5 py-3.5 font-medium">Processos</th>
                <th className="px-5 py-3.5 font-medium">Situação</th>
                <th className="px-5 py-3.5 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("ultimaInteracao")}
                    className="flex items-center gap-1.5 hover:text-text"
                  >
                    {SORT_LABEL.ultimaInteracao}
                    <ArrowUpDownIcon width={13} height={13} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((cliente) => {
                const processoCount = processoCounts?.[cliente.id] ?? EMPTY_COUNT;

                return (
                <tr key={cliente.id} className="transition-colors hover:bg-surface-elevated/40">
                  <td className="px-5 py-4">
                    <Link to={`/clientes/${cliente.id}`} className="font-medium text-text hover:text-accent">
                      {cliente.nome}
                    </Link>
                    <p className="text-sm text-text-muted">{cliente.cpfCnpj}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-text-muted">{cliente.telefone}</p>
                    <p className="text-sm text-text-muted">{cliente.email}</p>
                  </td>
                  <td className="px-5 py-4 tabular-nums text-text-muted">
                    {processoCount.ativos} de {processoCount.total} ativos
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={CLIENTE_STATUS_TONE[cliente.status]}>{CLIENTE_STATUS_LABEL[cliente.status]}</Badge>
                  </td>
                  <td className="px-5 py-4 tabular-nums text-text-muted">{formatDate(cliente.ultimaInteracao)}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
