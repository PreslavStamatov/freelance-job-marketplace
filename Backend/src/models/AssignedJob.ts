import { MilestoneUpdateExportDto } from "./MilestoneUpdate";

export type AssignedJobExportDto = {
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
    milestones: MilestoneExportDto[];
}

type MilestoneStatus = 'inProgress' | 'completed' | 'inReview';

export type MilestoneExportDto = {
    id: number;
    description: string;
    deadline: string;
    payment: number;
    status: MilestoneStatus;
    lastUpdate: MilestoneUpdateExportDto | null;
}

// export type MilestoneUpdate = {
//     action: MilestoneStatus;
//     description: string;
//     createdAt: string;
//     userFirstName: string;
//     userLastName: string;
// }

export type AssignedJobHomePageDto = {
    id: number;
    heading: string;
    description: string;
    deadline: string;
    firstName: string;
    lastName: string;
    image: string;
    status: "active" | "finished";
}