import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobApplicationHomePageImportDto } from "../../models/employer";
import { fetchPendingApplications } from "../thunks/jobApplicationThunks";

interface InitialState {
    jobApplications: JobApplicationHomePageImportDto[];
    status: "idle" | "loading" | "error" | "success";
    error?: string;
}

const initialState: InitialState = {
    jobApplications: [],
    status: "idle"
}

const jobApplcationsSlice = createSlice({
    name: "jobApplications",
    initialState,
    reducers: {
        setJobApplications: (state, action: PayloadAction<JobApplicationHomePageImportDto[]>) => {
            state.jobApplications = action.payload;
        },
        setStatus: (state, action: PayloadAction<"idle" | "loading" | "error" | "success">) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPendingApplications.pending, (state) => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(fetchPendingApplications.rejected, (state, action) => {
                state.status = "error"
                state.error = action.error.message;
            })
            .addCase(fetchPendingApplications.fulfilled, (state, action) => {
                state.status = "success";
                state.jobApplications = action.payload;
            })
    }
})

export const { setJobApplications, setStatus } = jobApplcationsSlice.actions;

export default jobApplcationsSlice.reducer;