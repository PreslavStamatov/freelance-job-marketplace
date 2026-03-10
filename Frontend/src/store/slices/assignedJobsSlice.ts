import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AssignedJobHomePageDto } from "../../models/homePage";
import { fetchHomePageAssignedJobs } from "../thunks/assignedJobThunks";

interface InitialState {
    assignedJobs: AssignedJobHomePageDto[];
    status: "idle" | "loading" | "error" | "success";
    error?: string;
}

const initialState: InitialState = {
    assignedJobs: [],
    status: "idle"
}

const assignedJobsSlice = createSlice({
    name: "assignedJobs",
    initialState,
    reducers: {
        setOngoingJobs: (state, action: PayloadAction<AssignedJobHomePageDto[]>) => {
            state.assignedJobs = action.payload;
        },
        setStatus: (state, action: PayloadAction<"idle" | "loading" | "error" | "success">) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomePageAssignedJobs.pending, (state) => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(fetchHomePageAssignedJobs.rejected, (state, action) => {
                state.status = "error"
                state.error = action.error.message;
            })
            .addCase(fetchHomePageAssignedJobs.fulfilled, (state, action) => {
                state.status = "success";
                state.assignedJobs = action.payload;
            })
    }
})

export const { setOngoingJobs, setStatus } = assignedJobsSlice.actions;

export default assignedJobsSlice.reducer;