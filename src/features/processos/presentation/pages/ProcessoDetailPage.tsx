import { Link, useParams } from "react-router-dom";
import { Badge } from "../../../../shared/components/Badge";
import { Button } from "../../../../shared/components/Button";
import { ArrowLeftIcon, PencilIcon } from "../../../../shared/components/icons";
import { formatDate } from "../../../../shared/utils/formatDate";
import { MovimentacoesTimeline } from "../components/MovimentacoesTimeline";
import { useProcesso } from "../hooks/useProcesso";
import { STATUS_INTERNO_LABEL, STATUS_INTERNO_TONE, STATUS_JUDICIAL_LABEL } from "../statusPresentation";

interface InfoFieldProps {
  label: string;
  value: string;
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div>
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-0.5 text-base text-text">{value}</p>
    </div>
  );
}

export function ProcessoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { processo, loading } = useProcesso(id);

  if (loading) {
    return <p className="text-base text-text-muted">Carregando processo...</p>;
  }

  if (!processo) {
    return (
      <div className="flex flex-col gap-4">
        <Link to="/processos" className="flex w-fit items-center gap-1.5 text-sm text-text-muted hover:text-text">
          <ArrowLeftIcon width={16} height={16} />
          Voltar para processos
        </Link>
        <p className="text-base text-text">Processo não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link to="/processos" className="flex w-fit items-center gap-1.5 text-sm text-text-muted hover:text-text">
        <ArrowLeftIcon width={16} height={16} />
        Voltar para processos
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-semibold text-text">{processo.numero}</h1>
          <p className="mt-1 text-base text-text-muted">{processo.assunto}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant={STATUS_INTERNO_TONE[processo.statusInterno]}>
              {STATUS_INTERNO_LABEL[processo.statusInterno]}
            </Badge>
            <Badge variant="neutral">{STATUS_JUDICIAL_LABEL[processo.statusJudicial]}</Badge>
          </div>
        </div>
        <Link to={`/processos/${processo.id}/editar`}>
          <Button type="button" variant="ghost" className="gap-2">
            <PencilIcon width={16} height={16} />
            Editar processo
          </Button>
        </Link>
      </div>

      <div className="card-surface grid grid-cols-1 gap-x-8 gap-y-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <InfoField label="Cliente" value={processo.clienteNome} />
        <InfoField label="Tribunal" value={processo.tribunal} />
        <InfoField label="Estado" value={processo.estado} />
        <InfoField label="Comarca" value={processo.comarca} />
        <InfoField label="Vara" value={processo.vara} />
        <InfoField label="Classe processual" value={processo.classeProcessual} />
        <InfoField label="Área" value={processo.area || "—"} />
        <InfoField label="Data de abertura" value={formatDate(processo.dataAbertura)} />
        <InfoField label="Última atualização" value={formatDate(processo.ultimaAtualizacaoData)} />
      </div>

      <div className="card-surface p-6">
        <p className="text-sm text-text-muted">Partes envolvidas</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {processo.partes.map((parte) => (
            <li key={`${parte.papel}-${parte.nome}`} className="text-base text-text">
              <span className="text-text-muted">{parte.papel}:</span> {parte.nome}
              {parte.documento && <span className="text-sm text-text-muted"> ({parte.documento})</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="card-surface p-6">
        <p className="mb-4 text-sm text-text-muted">Movimentações</p>
        <MovimentacoesTimeline movimentacoes={processo.movimentacoes} />
      </div>

      {processo.observacoes && (
        <div className="card-surface p-6">
          <p className="text-sm text-text-muted">Observações</p>
          <p className="mt-1 text-base text-text">{processo.observacoes}</p>
        </div>
      )}
    </div>
  );
}
