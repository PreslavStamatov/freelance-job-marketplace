import { Request, Response } from "express"
import { getAssignedJob, getAssignedJobById, getAssignedJobMilestones, getUserAssignedJobs, persistAssignedJob } from "../repositories/assignedJob"
import { Database } from "sqlite"
import { JobPostToAssignedJob, PersistedMilestone } from "../models/JobPost"
import { AssignedJobExportDto, AssignedJobHomePageDto, MilestoneExportDto,  } from "../models/AssignedJob"
import { appendMilestonesToAssignedJob } from "../repositories/milestone"
import { openDb } from "../db"

export const createAssignedJob = async (db: Database, jobPost: JobPostToAssignedJob, freelancerId: number, milestonesFromJobPost: PersistedMilestone[] | undefined): Promise<AssignedJobExportDto | undefined> => {
    const assignedJob: AssignedJobExportDto | undefined = await persistAssignedJob(db, jobPost, freelancerId);
    
    if(milestonesFromJobPost && assignedJob) {

        appendMilestonesToAssignedJob(db, milestonesFromJobPost, assignedJob?.id);
        
        return await findAssignedJob(db, assignedJob?.id);
    }

}

const findAssignedJob = async (db: Database, assignedJobId: number) => {
    return await getAssignedJob(db, assignedJobId);
}

export const fetchAssignedJob = async (req: Request, res: Response) => {
    const db = await openDb();
    const body: {assignedJobId: number} = req.body;
    const assignedJob: AssignedJobExportDto | undefined = await getAssignedJob(db, body.assignedJobId);
    if(!assignedJob) {
        res.status(404).json({message: "no job found"})
    }
    res.status(200).json(assignedJob);
}

export const fetchUserAssignedJobs = async (req: Request, res: Response) => {
    
    const db = await openDb();

    const role = req.user?.role;
    const userId = req.user?.id;

    try {
        const assignedJobs: AssignedJobHomePageDto[] = await getUserAssignedJobs(db, userId, role);
        res.status(200).json(assignedJobs);
    } catch (err) {
        console.error(err);
    }

}

export const fetchAssignedJobById = async (req: Request, res: Response) => {
    const db = await openDb();
    const body: {assignedJobId: number} = req.body;
    const assignedJobId: number = body.assignedJobId;
    const role = req.user?.role;
    if(!role) {return}
    
    try {

        const assignedJob: AssignedJobExportDto | undefined = await getAssignedJobById(db, assignedJobId, role);
        const assignedJobMilestones: MilestoneExportDto[] | undefined = await getAssignedJobMilestones(db, assignedJobId);

        if (assignedJob && assignedJobMilestones) {
            assignedJob.milestones = assignedJobMilestones;
        }

        res.status(200).json(assignedJob);
    } catch (err) {

        console.error(err);
        
    }
}