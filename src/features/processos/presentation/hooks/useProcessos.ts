import { useEffect, useState } from "react";
import { listarProcessosUseCase } from "../../container";
import type { Processo } from "../../domain/Processo";

export function useProcessos() {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    listarProcessosUseCase().then((result) => {
      if (!active) return;
      setProcessos(result);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return { processos, loading };
}
