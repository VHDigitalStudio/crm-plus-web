import { useCallback, useState } from "react";
import { requestPasswordResetUseCase } from "../../container";

export function useRequestPasswordReset() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const requestReset = useCallback(async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await requestPasswordResetUseCase(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível enviar as instruções.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { requestReset, loading, error, sent };
}
