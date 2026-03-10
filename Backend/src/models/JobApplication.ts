export type JobApplicationExportDto = {
    id: number;
    heading: string;
    description: string;
    freelancerFirstName?: string;
    freelancerLastName?: string;
    freelancerTitle?: string;
    freelancerImg?: string;
    employerFirstName?: string;
    employerLastName?: string;
    employerTitle?: string;
    employerImg?: string;
    createdAt: string;
}