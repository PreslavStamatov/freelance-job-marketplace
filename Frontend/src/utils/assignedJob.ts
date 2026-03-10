import type { MilestoneImportDto, MilestoneStatus } from "../models/assignedJob";

export const calculateMilestonesProgress = (milestones: MilestoneImportDto[]) => {
    const totalMilestones = milestones.length;
    const completedMilestones = milestones.reduce((acc, current) => {
        if (current.status === "completed") {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0);

    return Math.round((completedMilestones / totalMilestones) * 100);
}

export const formatMilestoneStatus = (milestoneStatus: MilestoneStatus) => {
    if (milestoneStatus === "inProgress") {
        return "In Progress";
    } else if (milestoneStatus === "inReview") {
        return "In Review";
    } else if (milestoneStatus === "completed") {
        return "Completed";
    };
};

