import { Router } from "express";
import { authenticate } from "../middleware/authenticationMiddleware";
import { authorize } from "../middleware/authorizationMiddleware";
import { fetchJobApplication, fetchPendingApplications } from "../controllers/jobApplications";

export const jobApplicationRouter: Router = Router();

jobApplicationRouter.get("/getPendingApplications", authenticate, fetchPendingApplications);
jobApplicationRouter.post("/getJobApplicationById", authenticate, fetchJobApplication);