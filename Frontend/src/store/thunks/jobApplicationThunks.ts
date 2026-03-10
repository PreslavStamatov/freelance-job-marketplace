import { createAsyncThunk } from "@reduxjs/toolkit";
import { getJobApplicationById, getPendingApplications } from "../../services/employerService";
import { updateAccessToken } from "../slices/userSlice";
import type { JobApplicationFetchProps, JobApplicationImportDto } from "../../models/employer";
import type { AppDispatch, RootState } from "../store";

export const fetchPendingApplications = createAsyncThunk<
  JobApplicationImportDto[],       // returned payload type
  string | null,                  // argument type (accessToken)
  { dispatch: AppDispatch; state: RootState }  // thunkAPI types
>(
    "jobApplications/fetch",
    async (accessToken, { dispatch, getState }) => {
        if (!getState().user.isAuthenticated) {throw new Error("User logged out")}

        const { pendingApplications, newAccessToken } = await getPendingApplications(accessToken);

        if (newAccessToken) {
            dispatch(updateAccessToken(newAccessToken));
        }
        return pendingApplications;
    }
);

export const fetchJobApplicationById = createAsyncThunk<
    JobApplicationImportDto,
    JobApplicationFetchProps,
    { dispatch: AppDispatch; state: RootState }
> (
    "jobApplication/fetch",
    async ({accessToken, jobApplicationId}, { dispatch, getState }) => {
        if (!getState().user.isAuthenticated) {throw new Error("User logged out")}
        const { jobApplication, newAccessToken } = await getJobApplicationById(accessToken, jobApplicationId);
        if(newAccessToken) {
            dispatch(updateAccessToken(newAccessToken));
        }

        return jobApplication;
    }
)