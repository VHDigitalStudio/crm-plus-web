import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../shared/components/Button";
import { ArrowLeftIcon } from "../../../../shared/components/icons";
import { SelectField } from "../../../../shared/components/SelectField";
import { TextField } from "../../../../shared/components/TextField";
import { Textarea } from "../../../../shared/components/Textarea";
import type { StatusInterno, StatusJudicial } from "../../domain/Processo";
import { useProcesso } from "../hooks/useProcesso";
import { type ProcessoFormValues, useSaveProcesso } from "../hooks/useSaveProcesso";
import { STATUS_INTERNO_LABEL, STATUS_JUDICIAL_LABEL } from "../statusPresentation";

const EMPTY_VALUES: ProcessoFormValues = {
  numero: "",
  clienteNome: "",
  advogadoResponsavel: "",
  tribunal: "",
  estado: "",
  comarca: "",
  vara: "",
  classeProcessual: "",
  assunto: "",
  statusJudicial: "em-andamento",
  statusInterno: "novo",
  dataAbertura: "",
  observacoes: "",
};

function toDateInputValue(iso: string): string {
  return iso ? iso.slice(0, 10) : "";
}

export function ProcessoFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { processo, loading: loadingProcesso } = useProcesso(id);
  const { save, loading: saving, error } = useSaveProcesso(processo);
  const [values, setValues] = useState<ProcessoFormValues>(EMPTY_VALUES);

  useEffect(() => {
    if (processo) {
      setValues({
        numero: processo.numero,
        clienteNome: processo.clienteNome,
        advogadoResponsavel: processo.advogadoResponsavel,
        tribunal: processo.tribunal,
        estado: processo.estado,
        comarca: processo.comarca,
        vara: processo.vara,
        classeProcessual: processo.classeProcessual,
        assunto: processo.assunto,
        statusJudicial: processo.statusJudicial,
        statusInterno: processo.statusInterno,
        dataAbertura: toDateInputValue(processo.dataAbertura),
        observacoes: processo.observacoes,
      });
    }
  }, [processo]);

  function updateField<K extends keyof ProcessoFormValues>(key: K, value: ProcessoFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await save(values);
    if (result) navigate(`/processos/${result.id}`);
  }

  if (isEdit && loadingProcesso) {
    return <p className="text-base text-text-muted">Carregando processo...</p>;
  }

  if (isEdit && !loadingProcesso && !processo) {
    return <p className="text-base text-text">Processo não encontrado.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        to={isEdit ? `/processos/${id}` : "/processos"}
        className="flex w-fit items-center gap-1.5 text-sm text-text-muted hover:text-text"
      >
        <ArrowLeftIcon width={16} height={16} />
        Voltar
      </Link>

      <div>
        <h1 className="text-3xl font-semibold text-text">{isEdit ? "Editar processo" : "Cadastrar processo"}</h1>
        <p className="mt-1.5 text-base text-text-muted">
          {isEdit ? "Atualize as informações do processo." : "Preencha os dados principais do processo."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-5 p-6" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label="Número do processo"
            value={values.numero}
            onChange={(event) => updateField("numero", event.target.value)}
            placeholder="0000000-00.0000.0.00.0000"
            required
          />
          <TextField
            label="Cliente"
            value={values.clienteNome}
            onChange={(event) => updateField("clienteNome", event.target.value)}
            required
          />
          <TextField
            label="Advogado responsável"
            value={values.advogadoResponsavel}
            onChange={(event) => updateField("advogadoResponsavel", event.target.value)}
            required
          />
          <TextField
            label="Tribunal"
            value={values.tribunal}
            onChange={(event) => updateField("tribunal", event.target.value)}
            placeholder="TJSP"
            required
          />
          <TextField
            label="Estado"
            value={values.estado}
            onChange={(event) => updateField("estado", event.target.value)}
            placeholder="SP"
            required
          />
          <TextField
            label="Comarca"
            value={values.comarca}
            onChange={(event) => updateField("comarca", event.target.value)}
            required
          />
          <TextField
            label="Vara"
            value={values.vara}
            onChange={(event) => updateField("vara", event.target.value)}
            required
          />
          <TextField
            label="Classe processual"
            value={values.classeProcessual}
            onChange={(event) => updateField("classeProcessual", event.target.value)}
            required
          />
          <div className="sm:col-span-2">
            <TextField
              label="Assunto"
              value={values.assunto}
              onChange={(event) => updateField("assunto", event.target.value)}
              required
            />
          </div>
          <SelectField
            label="Status judicial"
            value={values.statusJudicial}
            onChange={(event) => updateField("statusJudicial", event.target.value as StatusJudicial)}
          >
            {(Object.keys(STATUS_JUDICIAL_LABEL) as StatusJudicial[]).map((status) => (
              <option key={status} value={status}>
                {STATUS_JUDICIAL_LABEL[status]}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Status interno"
            value={values.statusInterno}
            onChange={(event) => updateField("statusInterno", event.target.value as StatusInterno)}
          >
            {(Object.keys(STATUS_INTERNO_LABEL) as StatusInterno[]).map((status) => (
              <option key={status} value={status}>
                {STATUS_INTERNO_LABEL[status]}
              </option>
            ))}
          </SelectField>
          <TextField
            label="Data de abertura"
            type="date"
            value={values.dataAbertura}
            onChange={(event) => updateField("dataAbertura", event.target.value)}
            required
          />
        </div>

        <Textarea
          label="Observações"
          value={values.observacoes}
          onChange={(event) => updateField("observacoes", event.target.value)}
          placeholder="Observações internas sobre o processo (opcional)"
        />

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button type="submit" loading={saving}>
            {isEdit ? "Salvar alterações" : "Cadastrar processo"}
          </Button>
        </div>
      </form>
    </div>
  );
}
