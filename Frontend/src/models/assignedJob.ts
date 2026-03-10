export type AssignedJobImportDto = {
    id: number;
    heading: string;
    description: string;
    createdAt: string;
    deadline: string
    payment: number;
    status: "active" | "finished";
    freelancerFirstName?: string;
    freelancerLastName?: string;
    freelancerTitle?: string;
    freelancerImg?: string;
    employerFirstName?: string;
    employerLastName?: string;
    employerTitle?: string;
    employerImg?: string; 
    milestones: MilestoneImportDto[];
}

export type MilestoneUpdate = {
    action: MilestoneStatus;
    description: string;
    createdAt: string;
    userFirstName: string;
    userLastName: string;
}

export type MilestoneStatus = 'inProgress' | 'completed' | 'inReview';

export type MilestoneImportDto = {
    id: number;
    description: string;
    deadline: string;
    payment: number;
    status: MilestoneStatus;
    lastUpdate: MilestoneUpdate;
}

export type MilestoneUpdateDto = {
    action: MilestoneStatus;
    description: string;
    milestoneId: number;
}