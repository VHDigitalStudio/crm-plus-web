import type { DashboardOverview } from "./DashboardOverview";

export interface DashboardRepository {
  getOverview(): Promise<DashboardOverview>;
}
