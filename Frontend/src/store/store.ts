import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer, { logout } from "./slices/userSlice";
import jobApplicationsReducer from "./slices/jobApplicationsSlice";
import jobApplicationReducer from "./slices/jobApplicationSlice";
import assignedJobsReducer from "./slices/assignedJobsSlice";
import assignedJobReducer from "./slices/assignedJobSlice";


const appReducer = combineReducers({
  user: userReducer,
  jobApplications: jobApplicationsReducer,
  jobApplication: jobApplicationReducer,
  assignedJobs: assignedJobsReducer,
  assignedJob: assignedJobReducer
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === logout.type) {
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;