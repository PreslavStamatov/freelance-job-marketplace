// export type MilestoneAction = "inProgress" | "accepted" | "inReview";

import { MilestoneUpdateAction } from "./MilestoneUpdate";

export type MilestoneUpdateImportDto = {
    action: MilestoneUpdateAction;
    description: string;
    milestoneId: number;
}

export type MilestoneUpdateExportDto = {
    id: number;
    milesoneId: number;
    userId: number;
    description: string;
    action: MilestoneUpdateAction;
    createdAt: string;
}