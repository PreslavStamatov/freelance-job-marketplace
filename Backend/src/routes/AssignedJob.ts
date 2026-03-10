import { Router } from "express";
import { authenticate } from "../middleware/authenticationMiddleware";
import { authorize } from "../middleware/authorizationMiddleware";
import { fetchAssignedJob, fetchAssignedJobById, fetchUserAssignedJobs } from "../controllers/assignedJob";

export const assignedJobRouter: Router = Router();

assignedJobRouter.get("/fetchAssignedJob", authenticate, authorize(["employer", "freelancer"]), fetchAssignedJob);
assignedJobRouter.get("/fetchUserAssignedJobs", authenticate, authorize(["employer", "freelancer"]), fetchUserAssignedJobs);
assignedJobRouter.post("/fetchAssignedJobById", authenticate, authorize(["employer", "freelancer"]), fetchAssignedJobById);

// assignedJobRouter.post("/completeMilestone", authenticate, authorize(["employer"]), completeMilestone);

export default assignedJobRouter;