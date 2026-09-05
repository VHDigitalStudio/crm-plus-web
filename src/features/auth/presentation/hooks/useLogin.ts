import { useCallback, useState } from "react";
import { loginUseCase } from "../../container";
import type { User } from "../../domain/User";

interface LoginInput {
  email: string;
  password: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async ({ email, password }: LoginInput): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      return await loginUseCase(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error };
}
