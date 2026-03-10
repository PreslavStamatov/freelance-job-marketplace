import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobApplicationImportDto } from "../../models/employer";
import { fetchJobApplicationById } from "../thunks/jobApplicationThunks";

type JobApplication = {
    id: number | null;
    heading: string | null;
    description: string | null;
    freelancerFirstName: string | null;
    freelancerLastName: string | null;
    freelancerTitle: string | null;
    freelancerImg: string | null;
    createdAt: string | null;
}

type InitialState = {
    jobApplication: JobApplication,
    status: "idle" | "loading" | "error" | "success";
    error?: string;
}

const initialState: InitialState = {
    jobApplication: {
        id: null,
        heading: null,
        description: null,
        freelancerFirstName: null,
        freelancerLastName: null,
        freelancerTitle: null,
        freelancerImg: null,
        createdAt: null
    },
    status: "idle"
}

const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState,
  reducers: {
    setJobApplication(
      state,
      action: PayloadAction<JobApplicationImportDto>
    ) {
      state.jobApplication.id = action.payload.id;
      state.jobApplication.heading = action.payload.heading;
      state.jobApplication.description = action.payload.description;
      state.jobApplication.freelancerFirstName = action.payload.freelancerFirstName;
      state.jobApplication.freelancerLastName = action.payload.freelancerLastName;
      state.jobApplication.freelancerTitle = action.payload.freelancerTitle;
      state.jobApplication.freelancerImg = action.payload.freelancerImg;
      state.jobApplication.createdAt = action.payload.createdAt;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error" | "success">) => {
            state.status = action.payload;
        }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchJobApplicationById.fulfilled, (state, action) => {
            state.status = "success";
            state.jobApplication = action.payload;
        })
        .addCase(fetchJobApplicationById.pending, (state) => {
            state.status = "loading";
            state.error = undefined;
        })
        .addCase(fetchJobApplicationById.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        })
  }
});

export const { setJobApplication, setStatus } = jobApplicationSlice.actions;

export default jobApplicationSlice.reducer;