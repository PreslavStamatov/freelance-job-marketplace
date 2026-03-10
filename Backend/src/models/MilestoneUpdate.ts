export type MilestoneUpdateAction = "inProgress" | "inReview" | "completed"

export type MilestoneUpdateExportDto = {
    id: number;
    userFirstName: string;
    userLastName: string;
    description: string;
    action: MilestoneUpdateAction;
    createdAt: string;
}