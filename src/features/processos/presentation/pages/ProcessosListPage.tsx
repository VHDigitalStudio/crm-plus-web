import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "../../../../shared/components/Badge";
import { Button } from "../../../../shared/components/Button";
import { ArrowUpDownIcon, PlusIcon, SearchIcon, XIcon } from "../../../../shared/components/icons";
import { SelectField } from "../../../../shared/components/SelectField";
import { TextField } from "../../../../shared/components/TextField";
import { formatDate } from "../../../../shared/utils/formatDate";
import type { Processo, StatusInterno } from "../../domain/Processo";
import { useProcessos } from "../hooks/useProcessos";
import { STATUS_INTERNO_LABEL, STATUS_INTERNO_TONE, STATUS_JUDICIAL_LABEL } from "../statusPresentation";

type SortKey = "numero" | "clienteNome" | "ultimaAtualizacaoData";

const SORT_LABEL: Record<SortKey, string> = {
  numero: "Processo",
  clienteNome: "Cliente",
  ultimaAtualizacaoData: "Última atualização",
};

function matchesSearch(processo: Processo, query: string): boolean {
  const haystack = `${processo.numero} ${processo.clienteNome} ${processo.assunto}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function ProcessosListPage() {
  const { processos, loading } = useProcessos();
  const [searchParams, setSearchParams] = useSearchParams();
  const clienteIdFilter = searchParams.get("clienteId");
  const clienteNomeFilter = searchParams.get("clienteNome");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusInterno | "todos">("todos");
  const [sortKey, setSortKey] = useState<SortKey>("ultimaAtualizacaoData");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  function clearClienteFilter() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("clienteId");
      next.delete("clienteNome");
      return next;
    });
  }

  const filtered = useMemo(() => {
    const result = processos
      .filter((processo) => (clienteIdFilter ? processo.clienteId === clienteIdFilter : true))
      .filter((processo) => (statusFilter === "todos" ? true : processo.statusInterno === statusFilter))
      .filter((processo) => matchesSearch(processo, search));

    const sorted = [...result].sort((a, b) => {
      const comparison = a[sortKey].localeCompare(b[sortKey]);
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [processos, search, statusFilter, sortKey, sortDirection, clienteIdFilter]);

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
          <h1 className="text-3xl font-semibold text-text">Processos</h1>
          <p className="mt-1.5 text-base text-text-muted">Acompanhe os processos do escritório.</p>
        </div>
        <Link to="/processos/novo">
          <Button type="button" className="gap-2">
            <PlusIcon width={18} height={18} />
            Cadastrar processo
          </Button>
        </Link>
      </div>

      {clienteIdFilter && (
        <div className="flex items-center gap-2">
          <Badge variant="accent">
            <span className="flex items-center gap-1.5">
              Filtrando por cliente: {clienteNomeFilter ?? clienteIdFilter}
              <button type="button" onClick={clearClienteFilter} aria-label="Remover filtro de cliente">
                <XIcon width={13} height={13} />
              </button>
            </span>
          </Badge>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <TextField
            label="Pesquisar"
            placeholder="Número, cliente ou assunto"
            icon={<SearchIcon />}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="sm:w-64">
          <SelectField
            label="Status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusInterno | "todos")}
          >
            <option value="todos">Todos</option>
            {(Object.keys(STATUS_INTERNO_LABEL) as StatusInterno[]).map((status) => (
              <option key={status} value={status}>
                {STATUS_INTERNO_LABEL[status]}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      {loading ? (
        <p className="text-base text-text-muted">Carregando processos...</p>
      ) : filtered.length === 0 ? (
        <div className="card-surface p-8 text-center">
          <p className="text-base text-text">Nenhum processo encontrado.</p>
          <p className="mt-1 text-sm text-text-muted">Tente ajustar a pesquisa ou o filtro de status.</p>
        </div>
      ) : (
        <div className="card-surface overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-base">
            <thead>
              <tr className="text-left text-sm text-text-muted">
                {(["numero", "clienteNome"] as SortKey[]).map((key) => (
                  <th key={key} className="px-5 py-3.5 font-medium">
                    <button
                      type="button"
                      onClick={() => toggleSort(key)}
                      className="flex items-center gap-1.5 hover:text-text"
                    >
                      {SORT_LABEL[key]}
                      <ArrowUpDownIcon width={13} height={13} />
                    </button>
                  </th>
                ))}
                <th className="px-5 py-3.5 font-medium">Tribunal / Comarca</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("ultimaAtualizacaoData")}
                    className="flex items-center gap-1.5 hover:text-text"
                  >
                    {SORT_LABEL.ultimaAtualizacaoData}
                    <ArrowUpDownIcon width={13} height={13} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((processo) => (
                <tr key={processo.id} className="transition-colors hover:bg-surface-elevated/40">
                  <td className="px-5 py-4">
                    <Link to={`/processos/${processo.id}`} className="font-medium text-text hover:text-accent">
                      {processo.numero}
                    </Link>
                    <p className="text-sm text-text-muted">{processo.assunto}</p>
                  </td>
                  <td className="px-5 py-4 text-text-muted">{processo.clienteNome}</td>
                  <td className="px-5 py-4">
                    <p className="text-text">{processo.tribunal}</p>
                    <p className="text-sm text-text-muted">{processo.comarca}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={STATUS_INTERNO_TONE[processo.statusInterno]}>
                      {STATUS_INTERNO_LABEL[processo.statusInterno]}
                    </Badge>
                    <p className="mt-1 text-sm text-text-muted">{STATUS_JUDICIAL_LABEL[processo.statusJudicial]}</p>
                  </td>
                  <td className="px-5 py-4 tabular-nums text-text-muted">{formatDate(processo.ultimaAtualizacaoData)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
