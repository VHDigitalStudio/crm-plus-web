import { useCallback, useState } from "react";
import type { Customer } from "../../domain/Customer";
import { createCustomerUseCase } from "../../container";

export function useCreateCustomer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCustomer = useCallback(async (data: Omit<Customer, "id">) => {
    setLoading(true);
    setError(null);
    try {
      return await createCustomerUseCase(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar cliente");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createCustomer, loading, error };
}
