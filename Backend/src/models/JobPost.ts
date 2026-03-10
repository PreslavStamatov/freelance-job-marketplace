import { FreelancerExportDto } from "./Users";

export type JobPostImportDto = {
    heading: string;
    description: string;
    deadline: string;
    payment: number;
    milestones?: MilestoneImportDto[];
}

export type JobPostEntity = {
    userId: number;
    description: string;
    deadline: string;
    payment: number;
    createdAt: string;
    status: "active" | "closed";
    appliedFreelancers: FreelancerExportDto[];
}

export type JobPostEntityInsert = {
    userId: number;
    heading: string;
    description: string;
    deadline: string;
    payment: number;
    appliedFreelancers: FreelancerExportDto[];
}

export type JobPostToAssignedJob = {
    userId: number;
    heading: string;
    description: string;
    deadline: string;
    payment: number;
}

export type AcceptJobApplicationDto = {
    jobApplicationId: number;
}

export type MilestoneEntity = {
    jobPostId: number;
    description: string;
    deadline: string;
    payment: number;
}

export type MilestoneImportDto = {
    description: string;
    deadline: string;
    payment: number;
}

export type PersistedMilestone = {
    id: number;
    jobPostId: number;
    description: string;
    deadline: string;
    payment: number;
    createdAt: string;
    status: 'inProgress' | 'completed' | 'inReview';
}

export type MilestoneExportDto = {
    id: number;
    jobPostId: number;
    assignedJobId: number;
    milestoneDescription: string;
    milestoneDeadline: string;
    milestonePayment: number;
    milestoneStatus: 'inProgress' | 'completed' | 'inReview';
}

export type JobPostExportDto = {
    id: number;
    jobPostHeading: string;
    jobPostDescription: string;
    jobPostDeadline: string;
    jobPostPayment: number;
    createdAt: string;
    status: "active" | "closed";
    milestones: MilestoneExportDto[];
}