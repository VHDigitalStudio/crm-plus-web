import { useCallback, useState } from "react";
import { atualizarClienteUseCase, criarClienteUseCase } from "../../container";
import type { Cliente, ClienteStatus } from "../../domain/Cliente";

export interface ClienteFormValues {
  nome: string;
  cpfCnpj: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  whatsapp: string;
  endereco: string;
  cidade: string;
  estado: string;
  observacoes: string;
  status: ClienteStatus;
}

function validate(values: ClienteFormValues): string | null {
  if (!values.nome.trim()) return "Informe o nome do cliente.";
  if (!values.cpfCnpj.trim()) return "Informe o CPF ou CNPJ.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return "Informe um e-mail válido.";
  if (!values.telefone.trim()) return "Informe um telefone.";
  if (!values.cidade.trim()) return "Informe a cidade.";
  if (!values.estado.trim()) return "Informe o estado.";
  return null;
}

export function useSaveCliente(existingCliente: Cliente | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = useCallback(
    async (values: ClienteFormValues): Promise<Cliente | null> => {
      const validationError = validate(values);
      if (validationError) {
        setError(validationError);
        return null;
      }

      setLoading(true);
      setError(null);
      try {
        if (existingCliente) {
          return await atualizarClienteUseCase(existingCliente.id, values);
        }
        return await criarClienteUseCase(values);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Não foi possível salvar o cliente.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [existingCliente],
  );

  return { save, loading, error };
}
