import { useCallback, useState } from "react";
import { registerLawyerUseCase } from "../../container";
import type { User } from "../../domain/User";

interface RegisterLawyerInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function validate(data: RegisterLawyerInput): string | null {
  if (!data.name.trim()) return "Informe seu nome completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Informe um e-mail válido.";
  if (data.password.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
  if (data.password !== data.confirmPassword) return "As senhas não coincidem.";
  return null;
}

export function useRegisterLawyer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerLawyer = useCallback(async (data: RegisterLawyerInput): Promise<User | null> => {
    const validationError = validate(data);
    if (validationError) {
      setError(validationError);
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      return await registerLawyerUseCase({ name: data.name, email: data.email, password: data.password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível criar a conta.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { registerLawyer, loading, error };
}
