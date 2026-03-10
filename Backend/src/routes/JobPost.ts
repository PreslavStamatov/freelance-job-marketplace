import { Router } from "express";
import { authenticate } from "../middleware/authenticationMiddleware";
import { authorize } from "../middleware/authorizationMiddleware";
import { acceptFreelancerJobApplication, applyToJobPost, createJobPost, fetchJobPostApplicants, getAll } from "../controllers/jobPost";

export const jobPostRouter: Router = Router();

jobPostRouter.post("/create", authenticate, authorize(["employer"]), createJobPost);
jobPostRouter.get("/getAll", getAll)
jobPostRouter.post("/applyToJob", authenticate, authorize(["freelancer"]), applyToJobPost);
jobPostRouter.get("/getJobPostApplicants", authenticate, authorize(["employer"]), fetchJobPostApplicants);
jobPostRouter.post("/acceptFreelancerJobApplication", authenticate, authorize(["employer"]), acceptFreelancerJobApplication)

export default jobPostRouter;