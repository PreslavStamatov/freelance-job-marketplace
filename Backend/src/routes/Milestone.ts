import { Router } from "express";
import { authenticate } from "../middleware/authenticationMiddleware";
import { authorize } from "../middleware/authorizationMiddleware";
import { updateMilestone } from "../controllers/milestone";

export const milestoneRouter: Router = Router();

milestoneRouter.post("/updateMilestone", authenticate, authorize([]), updateMilestone);

export default milestoneRouter;