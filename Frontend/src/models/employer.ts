export type JobApplicationHomePageImportDto = {
    id: number;
    heading: string;
    description: string;
    freelancerFirstName: string;
    freelancerLastName: string;
    freelancerTitle: string | null;
    freelancerImg: string | null;
    createdAt: string;
}

export type JobApplicationImportDto = {
    id: number;
    heading: string;
    description: string;
    freelancerFirstName: string;
    freelancerLastName: string;
    freelancerTitle: string | null;
    freelancerImg: string | null;
    createdAt: string;
}

export type JobApplicationFetchProps = {
    accessToken: string;
    jobApplicationId: number;
}