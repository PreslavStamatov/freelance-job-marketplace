import type { JobApplicationHomePageImportDto, JobApplicationImportDto } from "../models/employer";
import { updateAccessToken } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/store";
import { fetchWithAuth } from "./authService";

const JOB_APPLICATION_BASE_URL = import.meta.env.VITE_JOB_APPLICATION_BASE_URL;
const JOB_POST_BASE_URL = import.meta.env.VITE_JOB_POST_BASE_URL;


export const getPendingApplications = async (
    accessToken: string | null
): Promise<{ pendingApplications:JobApplicationHomePageImportDto[], newAccessToken: string | undefined }> => {

    const { response, newAccessToken } = await fetchWithAuth(`${JOB_APPLICATION_BASE_URL}/getPendingApplications`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }, accessToken)

    const pendingApplications: JobApplicationHomePageImportDto[] = await response.json();

    return { pendingApplications, newAccessToken};
}

export const getJobApplicationById = async (
    accessToken: string | null, jobApplicationId: number
): Promise<{ jobApplication:JobApplicationImportDto, newAccessToken: string | undefined }> => {
    console.log("test")
    const { response, newAccessToken} = await fetchWithAuth(`${JOB_APPLICATION_BASE_URL}/getJobApplicationById`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({jobApplicationId})
    }, accessToken);
    const jobApplication = await response.json();
    console.log("test")

    return {jobApplication, newAccessToken}
}

export const acceptJobApplication = async(accessToken: string | null, jobApplicationId: number, dispatch: AppDispatch) => {
    const { response, newAccessToken} = await fetchWithAuth(`${JOB_POST_BASE_URL}/acceptFreelancerJobApplication`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({jobApplicationId})
    }, accessToken);
    const jobApplication = await response.json();
    if(newAccessToken) {
        dispatch(updateAccessToken(newAccessToken));
    }

    return {jobApplication, newAccessToken}
}