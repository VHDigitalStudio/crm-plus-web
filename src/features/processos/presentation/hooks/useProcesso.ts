import { useEffect, useState } from "react";
import { obterProcessoUseCase } from "../../container";
import type { Processo } from "../../domain/Processo";

export function useProcesso(id: string | undefined) {
  const [processo, setProcesso] = useState<Processo | null>(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) return;

    let active = true;
    setLoading(true);

    obterProcessoUseCase(id).then((result) => {
      if (!active) return;
      setProcesso(result);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [id]);

  return { processo, loading };
}
