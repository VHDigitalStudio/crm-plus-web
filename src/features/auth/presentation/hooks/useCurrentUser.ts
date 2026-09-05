import { useEffect, useState } from "react";
import { getCurrentUserUseCase } from "../../container";
import type { User } from "../../domain/User";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getCurrentUserUseCase().then((current) => {
      if (!active) return;
      setUser(current);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return { user, loading };
}
