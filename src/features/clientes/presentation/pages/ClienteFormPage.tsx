import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../shared/components/Button";
import { ArrowLeftIcon } from "../../../../shared/components/icons";
import { SelectField } from "../../../../shared/components/SelectField";
import { TextField } from "../../../../shared/components/TextField";
import { Textarea } from "../../../../shared/components/Textarea";
import type { ClienteStatus } from "../../domain/Cliente";
import { useCliente } from "../hooks/useCliente";
import { type ClienteFormValues, useSaveCliente } from "../hooks/useSaveCliente";

const EMPTY_VALUES: ClienteFormValues = {
  nome: "",
  cpfCnpj: "",
  dataNascimento: "",
  email: "",
  telefone: "",
  whatsapp: "",
  endereco: "",
  cidade: "",
  estado: "",
  observacoes: "",
  status: "ativo",
};

export function ClienteFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { cliente, loading: loadingCliente } = useCliente(id);
  const { save, loading: saving, error } = useSaveCliente(cliente);
  const [values, setValues] = useState<ClienteFormValues>(EMPTY_VALUES);

  useEffect(() => {
    if (cliente) {
      setValues({
        nome: cliente.nome,
        cpfCnpj: cliente.cpfCnpj,
        dataNascimento: cliente.dataNascimento,
        email: cliente.email,
        telefone: cliente.telefone,
        whatsapp: cliente.whatsapp,
        endereco: cliente.endereco,
        cidade: cliente.cidade,
        estado: cliente.estado,
        observacoes: cliente.observacoes,
        status: cliente.status,
      });
    }
  }, [cliente]);

  function updateField<K extends keyof ClienteFormValues>(key: K, value: ClienteFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await save(values);
    if (result) navigate(`/clientes/${result.id}`);
  }

  if (isEdit && loadingCliente) {
    return <p className="text-base text-text-muted">Carregando cliente...</p>;
  }

  if (isEdit && !loadingCliente && !cliente) {
    return <p className="text-base text-text">Cliente não encontrado.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        to={isEdit ? `/clientes/${id}` : "/clientes"}
        className="flex w-fit items-center gap-1.5 text-sm text-text-muted hover:text-text"
      >
        <ArrowLeftIcon width={16} height={16} />
        Voltar
      </Link>

      <div>
        <h1 className="text-3xl font-semibold text-text">{isEdit ? "Editar cliente" : "Cadastrar cliente"}</h1>
        <p className="mt-1.5 text-base text-text-muted">
          {isEdit ? "Atualize as informações do cliente." : "Preencha os dados principais do cliente."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-5 p-6" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label="Nome completo"
            value={values.nome}
            onChange={(event) => updateField("nome", event.target.value)}
            placeholder="Nome completo do cliente"
            required
          />
          <TextField
            label="CPF/CNPJ"
            value={values.cpfCnpj}
            onChange={(event) => updateField("cpfCnpj", event.target.value)}
            placeholder="000.000.000-00"
            required
          />
          <TextField
            label="Data de nascimento"
            type="date"
            value={values.dataNascimento}
            onChange={(event) => updateField("dataNascimento", event.target.value)}
          />
          <SelectField
            label="Status"
            value={values.status}
            onChange={(event) => updateField("status", event.target.value as ClienteStatus)}
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </SelectField>
          <TextField
            label="E-mail"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="cliente@email.com"
            required
          />
          <TextField
            label="Telefone"
            value={values.telefone}
            onChange={(event) => updateField("telefone", event.target.value)}
            placeholder="(11) 99999-9999"
            required
          />
          <TextField
            label="WhatsApp"
            value={values.whatsapp}
            onChange={(event) => updateField("whatsapp", event.target.value)}
            placeholder="(11) 99999-9999"
          />
          <TextField
            label="Endereço"
            value={values.endereco}
            onChange={(event) => updateField("endereco", event.target.value)}
            placeholder="Rua, número, bairro"
          />
          <TextField
            label="Cidade"
            value={values.cidade}
            onChange={(event) => updateField("cidade", event.target.value)}
            placeholder="São Paulo"
            required
          />
          <TextField
            label="Estado"
            value={values.estado}
            onChange={(event) => updateField("estado", event.target.value)}
            placeholder="SP"
            required
          />
        </div>

        <Textarea
          label="Observações"
          value={values.observacoes}
          onChange={(event) => updateField("observacoes", event.target.value)}
          placeholder="Observações internas sobre o cliente (opcional)"
        />

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button type="submit" loading={saving}>
            {isEdit ? "Salvar alterações" : "Cadastrar cliente"}
          </Button>
        </div>
      </form>
    </div>
  );
}
