import { useEffect, useState } from "react";
import { getDashboardOverviewUseCase } from "../../container";
import type { DashboardOverview } from "../../domain/DashboardOverview";

export function useDashboardOverview() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getDashboardOverviewUseCase().then((result) => {
      if (!active) return;
      setOverview(result);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return { overview, loading };
}
