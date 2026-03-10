import { Request, Response } from "express";
import { openDb } from "../db";
import { getJobApplicationById, getPendingApplications } from "../repositories/jobApplication";
import { JobApplicationExportDto } from "../models/JobApplication"

export const fetchPendingApplications = async (req: Request, res: Response) => {
    const db = await openDb();
    const userId = req.user?.id;

    try {
        if(!userId) {
            return
        }

        const result: JobApplicationExportDto[] = await getPendingApplications(db, userId);
        res.status(200).json(result);
    } catch (err) {
        console.error(err)
    }
}

export const fetchJobApplication = async (req: Request, res: Response) => {
    const db = await openDb();
    const body: {jobApplicationId: number} = req.body;
    const jobApplicationId = body.jobApplicationId;
    const role = req.user?.role;
    
    try {
        const result: JobApplicationExportDto | undefined = await getJobApplicationById(db, jobApplicationId, role);
        res.status(200).json(result);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Message:', err.message);
            console.error('Stack:', err.stack);
        } else {
            console.error('Unknown error:', err);
        }
    }
}