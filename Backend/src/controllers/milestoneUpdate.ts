import { Request, Response } from "express";
import { openDb } from "../db";
import { fetchLastMilestoneUpdate } from "../repositories/milestoneUpdate";
import { MilestoneUpdateExportDto } from "../models/MilestoneUpdate";

export const getLastMilestoneUpdate = async (req: Request, res: Response) => {
    const db = await openDb();
    const body: {milestoneId: number} = req.body;

    const lastMilestoneUpdate: MilestoneUpdateExportDto | undefined = await fetchLastMilestoneUpdate(db, body.milestoneId);

    res.status(200).json(lastMilestoneUpdate);
}