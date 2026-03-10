import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AssignedJobHomePageDto } from "../../models/homePage";
import type { AppDispatch, RootState } from "../store";
import { updateAccessToken } from "../slices/userSlice";
import { getHomePageAssignedJobs } from "../../services/homePage";
import type { AssignedJobImportDto, MilestoneImportDto, MilestoneUpdateDto } from "../../models/assignedJob";
import { getAssignedJobById, updateMilestone } from "../../services/assignedJob";

export const fetchHomePageAssignedJobs = createAsyncThunk<
  AssignedJobHomePageDto[],
  string | null,
  { dispatch: AppDispatch; state: RootState }
>(

    "homePageAssignedJob/fetch",
    async (accessToken, { dispatch }) => {

        const { assignedJobs, newAccessToken } = await getHomePageAssignedJobs(accessToken);
    
        if (newAccessToken) {
            dispatch(updateAccessToken(newAccessToken));
        }

        return assignedJobs;

    }

)

export const fetchAssignedJobById = createAsyncThunk<
    AssignedJobImportDto,
    {assignedJobId: number, accessToken: string},
    { dispatch: AppDispatch; state: RootState }
> (
    "assignedJob/fetch",
    async (parameters, { dispatch }) => {
        const {assignedJob, newAccessToken} = await getAssignedJobById(parameters.assignedJobId, parameters.accessToken);

        if (newAccessToken) {
            dispatch(updateAccessToken(newAccessToken));
        }

        return assignedJob;
    }
)

export const updateMilestoneThunk = createAsyncThunk<
    MilestoneImportDto,
    {milestoneUpdate: MilestoneUpdateDto, accessToken: string | null},
    { dispatch: AppDispatch; state: RootState }
> (
    "assignedJob/updateMilestone",
    async (parameters, { dispatch }) => {
        const {milestone, newAccessToken} = await updateMilestone(parameters.milestoneUpdate, parameters.accessToken);

        if (newAccessToken) {
            dispatch(updateAccessToken(newAccessToken));
        }

        return milestone;
    }
)