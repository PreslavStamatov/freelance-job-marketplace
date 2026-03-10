import type { AssignedJobHomePageDto } from "../models/homePage";
import { fetchWithAuth } from "./authService";

const ASSIGNED_JOB_BASE_URL = import.meta.env.VITE_ASSIGNED_JOB_BASE_URL;

export const getHomePageAssignedJobs = async (
    accessToken: string | null
): Promise<{ assignedJobs: AssignedJobHomePageDto[], newAccessToken: string | undefined }> => {

    const { response, newAccessToken } = await fetchWithAuth(`${ASSIGNED_JOB_BASE_URL}/fetchUserAssignedJobs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }, accessToken)

    const assignedJobs: AssignedJobHomePageDto[] = await response.json();

    return { assignedJobs, newAccessToken};
}