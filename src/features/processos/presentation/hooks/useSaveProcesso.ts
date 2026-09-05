import { useCallback, useState } from "react";
import { atualizarProcessoUseCase, criarProcessoUseCase } from "../../container";
import type { NovoProcessoInput, Processo, StatusInterno, StatusJudicial } from "../../domain/Processo";

export interface ProcessoFormValues {
  numero: string;
  clienteNome: string;
  advogadoResponsavel: string;
  tribunal: string;
  estado: string;
  comarca: string;
  vara: string;
  classeProcessual: string;
  assunto: string;
  statusJudicial: StatusJudicial;
  statusInterno: StatusInterno;
  dataAbertura: string;
  observacoes: string;
}

function validate(values: ProcessoFormValues): string | null {
  if (!values.numero.trim()) return "Informe o número do processo.";
  if (!values.clienteNome.trim()) return "Informe o cliente.";
  if (!values.advogadoResponsavel.trim()) return "Informe o advogado responsável.";
  if (!values.tribunal.trim()) return "Informe o tribunal.";
  if (!values.estado.trim()) return "Informe o estado.";
  if (!values.comarca.trim()) return "Informe a comarca.";
  if (!values.vara.trim()) return "Informe a vara.";
  if (!values.classeProcessual.trim()) return "Informe a classe processual.";
  if (!values.assunto.trim()) return "Informe o assunto.";
  if (!values.dataAbertura) return "Informe a data de abertura.";
  return null;
}

function toInput(values: ProcessoFormValues, partesExistentes: NovoProcessoInput["partes"] | undefined): NovoProcessoInput {
  return {
    ...values,
    dataAbertura: new Date(values.dataAbertura).toISOString(),
    partes: partesExistentes && partesExistentes.length > 0 ? partesExistentes : [{ papel: "Autor", nome: values.clienteNome }],
  };
}

export function useSaveProcesso(existingProcesso: Processo | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = useCallback(
    async (values: ProcessoFormValues): Promise<Processo | null> => {
      const validationError = validate(values);
      if (validationError) {
        setError(validationError);
        return null;
      }

      setLoading(true);
      setError(null);
      try {
        const input = toInput(values, existingProcesso?.partes);
        if (existingProcesso) {
          return await atualizarProcessoUseCase(existingProcesso.id, input);
        }
        return await criarProcessoUseCase(input);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Não foi possível salvar o processo.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [existingProcesso],
  );

  return { save, loading, error };
}
