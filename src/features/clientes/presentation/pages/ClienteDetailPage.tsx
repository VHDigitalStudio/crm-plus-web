import { Link, useParams } from "react-router-dom";
import { Badge } from "../../../../shared/components/Badge";
import { Button } from "../../../../shared/components/Button";
import { ArrowLeftIcon, FolderIcon, PencilIcon } from "../../../../shared/components/icons";
import { formatDate } from "../../../../shared/utils/formatDate";
import { useCliente } from "../hooks/useCliente";
import { CLIENTE_STATUS_LABEL, CLIENTE_STATUS_TONE } from "../statusPresentation";

interface InfoFieldProps {
  label: string;
  value: string;
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div>
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-0.5 text-base text-text">{value || "—"}</p>
    </div>
  );
}

interface ClienteDetailPageProps {
  processoCount?: { total: number; ativos: number };
}

export function ClienteDetailPage({ processoCount = { total: 0, ativos: 0 } }: ClienteDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const { cliente, loading } = useCliente(id);

  if (loading) {
    return <p className="text-base text-text-muted">Carregando cliente...</p>;
  }

  if (!cliente) {
    return (
      <div className="flex flex-col gap-4">
        <Link to="/clientes" className="flex w-fit items-center gap-1.5 text-sm text-text-muted hover:text-text">
          <ArrowLeftIcon width={16} height={16} />
          Voltar para clientes
        </Link>
        <p className="text-base text-text">Cliente não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link to="/clientes" className="flex w-fit items-center gap-1.5 text-sm text-text-muted hover:text-text">
        <ArrowLeftIcon width={16} height={16} />
        Voltar para clientes
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text">{cliente.nome}</h1>
          <p className="mt-1 text-base text-text-muted">{cliente.cpfCnpj}</p>
          <div className="mt-3">
            <Badge variant={CLIENTE_STATUS_TONE[cliente.status]}>{CLIENTE_STATUS_LABEL[cliente.status]}</Badge>
          </div>
        </div>
        <Link to={`/clientes/${cliente.id}/editar`}>
          <Button type="button" variant="ghost" className="gap-2">
            <PencilIcon width={16} height={16} />
            Editar cliente
          </Button>
        </Link>
      </div>

      <div className="card-surface grid grid-cols-1 gap-x-8 gap-y-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <InfoField label="E-mail" value={cliente.email} />
        <InfoField label="Telefone" value={cliente.telefone} />
        <InfoField label="WhatsApp" value={cliente.whatsapp} />
        <InfoField label="Data de nascimento" value={cliente.dataNascimento ? formatDate(cliente.dataNascimento) : ""} />
        <InfoField label="Endereço" value={cliente.endereco} />
        <InfoField label="Cidade / Estado" value={`${cliente.cidade} / ${cliente.estado}`} />
        <InfoField label="Última interação" value={formatDate(cliente.ultimaInteracao)} />
      </div>

      <div className="card-surface flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="text-sm text-text-muted">Processos</p>
          <p className="mt-1 text-2xl font-semibold text-text">
            {processoCount.ativos} <span className="text-base font-normal text-text-muted">ativos de {processoCount.total} no total</span>
          </p>
        </div>
        <Link to={`/processos?clienteId=${cliente.id}&clienteNome=${encodeURIComponent(cliente.nome)}`}>
          <Button type="button" variant="ghost" className="gap-2">
            <FolderIcon width={16} height={16} />
            Ver processos
          </Button>
        </Link>
      </div>

      {cliente.observacoes && (
        <div className="card-surface p-6">
          <p className="text-sm text-text-muted">Observações</p>
          <p className="mt-1 text-base text-text">{cliente.observacoes}</p>
        </div>
      )}
    </div>
  );
}
