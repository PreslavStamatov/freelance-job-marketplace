import { Database } from "sqlite";
import { PersistedMilestone } from "../models/JobPost";
import { appendMilestonesToAssignedJob, fetchMilestoneById, fetchMilestonesFromJobPost, persistMilestoneUpdate, updateMilestoneStatus } from "../repositories/milestone";
import { Request, Response } from "express"
import { openDb } from "../db";
import { MilestoneUpdateAction, MilestoneUpdateExportDto } from "../models/MilestoneUpdate";
import { MilestoneUpdateImportDto } from "../models/Milestone";
import { MilestoneExportDto } from "../models/AssignedJob";

export const getMilestonesFromJobPost = async (db: Database, jobPostId: number) => {
    
    const persistedMilestones: PersistedMilestone[] | undefined = await fetchMilestonesFromJobPost(db, jobPostId);
    return persistedMilestones;

}

export const addMilestonesToAssignedJob = async (db: Database, milestones: PersistedMilestone[], assignedJobId: number) => {
    return await appendMilestonesToAssignedJob(db, milestones, assignedJobId);
}

const setMilestoneStatus = async (db:Database, status: string, milesoneId: number) => {
    return await updateMilestoneStatus(db, status, milesoneId);
}

const createMilestoneUpdate = async (db:Database, description: string, userId: number, action: MilestoneUpdateAction, milestoneId: number) => {
    console.log(milestoneId, userId, description, action)

    return await persistMilestoneUpdate(db, description, userId, action, milestoneId);
}

export const updateMilestone = async (req: Request, res: Response) => {
    const db = await openDb();
    const body: MilestoneUpdateImportDto = req.body;
    const userId = req.user?.id;
    console.log(req.body)
    // if (action === "inReview") {
    //     setMilestoneInReview();
    // } else if (action === "inReview") {
    //     setMilestoneInProgress();
    // } else if () {
    //     setMilestoneAsAccepted();
    // }
    
    await db.exec("BEGIN")
    try {

        let milestoneUpdateIndex: number | undefined;
        await setMilestoneStatus(db, body.action, body.milestoneId);
        if (userId) {
            console.log(body.description, userId, body.action, body.milestoneId)
            milestoneUpdateIndex = await createMilestoneUpdate(db, body.description, userId, body.action, body.milestoneId);

        }

        if (milestoneUpdateIndex) {
            const updatedMilestone: MilestoneExportDto | undefined = await fetchMilestoneById(db, body.milestoneId);
            await db.exec("COMMIT")
            res.status(201).json(updatedMilestone);
        }
    } catch (err) {
        await db.exec("ROLLBACK")
        res.status(401).json(err);
    }
    
}

