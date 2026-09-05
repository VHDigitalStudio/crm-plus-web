import type { DashboardOverview } from "../domain/DashboardOverview";
import type { DashboardRepository } from "../domain/DashboardRepository";

export function getDashboardOverview(repository: DashboardRepository) {
  return (): Promise<DashboardOverview> => repository.getOverview();
}
