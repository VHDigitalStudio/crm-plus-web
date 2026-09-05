import { getDashboardOverview } from "./application/getDashboardOverview";
import { MockDashboardRepository } from "./infrastructure/MockDashboardRepository";

const dashboardRepository = new MockDashboardRepository();

export const getDashboardOverviewUseCase = getDashboardOverview(dashboardRepository);
