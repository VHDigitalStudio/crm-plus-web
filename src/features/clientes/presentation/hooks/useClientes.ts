import { useEffect, useState } from "react";
import { listarClientesUseCase } from "../../container";
import type { Cliente } from "../../domain/Cliente";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    listarClientesUseCase().then((result) => {
      if (!active) return;
      setClientes(result);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return { clientes, loading };
}
