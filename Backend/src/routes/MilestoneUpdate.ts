import { Router } from "express";
import { authenticate } from "../middleware/authenticationMiddleware";
import { authorize } from "../middleware/authorizationMiddleware";
import { getLastMilestoneUpdate } from "../controllers/milestoneUpdate";

export const milestoneUpdateRouter: Router = Router();

milestoneUpdateRouter.post("/getLastMilestoneUpdate", authenticate, authorize([]), getLastMilestoneUpdate);

export default milestoneUpdateRouter;