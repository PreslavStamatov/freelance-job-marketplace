import type { AssignedJobImportDto, MilestoneImportDto, MilestoneUpdateDto } from "../models/assignedJob";
import { fetchWithAuth } from "./authService";

const ASSIGNED_JOB_BASE_URL = import.meta.env.VITE_ASSIGNED_JOB_BASE_URL;
const MILESTONE_BASE_URL = import.meta.env.VITE_MILESTONE_BASE_URL;


export const getAssignedJobById = async (assignedJobId: number, accessToken: string | null):
    Promise<{ assignedJob: AssignedJobImportDto, newAccessToken: string | undefined }> => {

    const { response, newAccessToken } = await fetchWithAuth(`${ASSIGNED_JOB_BASE_URL}/fetchAssignedJobById`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ assignedJobId })
    }, accessToken)

    const assignedJob: AssignedJobImportDto = await response.json();

    return { assignedJob, newAccessToken };
}

export const updateMilestone = async (milestoneUpdateDto: MilestoneUpdateDto, accessToken: string | null):
    Promise<{ milestone: MilestoneImportDto, newAccessToken: string | undefined }> => {
    const { response, newAccessToken } = await fetchWithAuth(`${MILESTONE_BASE_URL}/updateMilestone`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(milestoneUpdateDto)
    }, accessToken)
    const milestone: MilestoneImportDto = await response.json();

    return { milestone, newAccessToken };
}