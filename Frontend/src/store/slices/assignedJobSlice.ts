import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AssignedJobImportDto } from "../../models/assignedJob";
import { fetchAssignedJobById, updateMilestoneThunk } from "../thunks/assignedJobThunks";

interface InitialState {
    assignedJob: AssignedJobImportDto | undefined;
    status: "idle" | "loading" | "error" | "success";
    error?: string;
}

const initialState: InitialState = {
    assignedJob: undefined,
    status: "idle"
}

const assignedJobSlice = createSlice({
    name: "assignedJob",
    initialState,
    reducers: {
        setAssignedJob: (state, action: PayloadAction<AssignedJobImportDto>) => {
            state.assignedJob = action.payload;
        },
        setStatus: (state, action: PayloadAction<"idle" | "loading" | "error" | "success">) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssignedJobById.pending, (state) => {
                state.status = "loading",
                state.error = undefined;
            })
            .addCase(fetchAssignedJobById.rejected, (state, action) => {
                state.status = "error"
                state.error = action.error.message;
            })
            .addCase(fetchAssignedJobById.fulfilled, (state, action) => {
                state.status = "success";
                state.assignedJob = action.payload;
            })
            .addCase(updateMilestoneThunk.pending, (state) => {
                state.status = "loading",
                state.error = undefined;
            }).addCase(updateMilestoneThunk.rejected, (state, action) => {
                state.status = "error"
                state.error = action.error.message;
            }).addCase(updateMilestoneThunk.fulfilled, (state, action) => {
                state.status = "success";
                if (state.assignedJob) {
                    const milestoneToBeUpdatedIndex = state.assignedJob.milestones.findIndex(milestone => 
                        milestone.id === action.payload.id
                    );
                    if (milestoneToBeUpdatedIndex !== -1) {
                        state.assignedJob.milestones[milestoneToBeUpdatedIndex] = action.payload;
                    }
                }
            })
    }
})

export const { setAssignedJob, setStatus } = assignedJobSlice.actions;

export default assignedJobSlice.reducer;