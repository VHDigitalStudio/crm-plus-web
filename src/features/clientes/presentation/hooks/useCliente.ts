import { useEffect, useState } from "react";
import { obterClienteUseCase } from "../../container";
import type { Cliente } from "../../domain/Cliente";

export function useCliente(id: string | undefined) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) return;

    let active = true;
    setLoading(true);

    obterClienteUseCase(id).then((result) => {
      if (!active) return;
      setCliente(result);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [id]);

  return { cliente, loading };
}
