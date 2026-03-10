import { Router } from "express";
import { authenticate } from "../middleware/authenticationMiddleware";
import { authorize } from "../middleware/authorizationMiddleware";

export const ongoingJobRouter: Router = Router();

ongoingJobRouter.post("/updateMilestone", authenticate, authorize([]), );

export default ongoingJobRouter;