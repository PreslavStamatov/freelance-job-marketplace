import { Database } from "sqlite";
import { MilestoneUpdateExportDto } from "../models/MilestoneUpdate";

export const fetchLastMilestoneUpdate = async (db: Database, milestoneId: number): Promise<MilestoneUpdateExportDto | undefined> => {
    return await db.get(`
        SELECT
            mu.id,
            u.firstName AS userFirstName,
            u.lastName AS userLastName,
            mu.description,
            mu.action,
            mu.createdAt
        FROM milestone_updates mu
        LEFT JOIN users u ON u.id = mu.userId
        WHERE milestoneId = ? 
        ORDER BY mu.createdAt DESC
        LIMIT 1`, milestoneId)
}

// id: number;
//     userFirstName: string;
//     userLastName: string;
//     description: string;
//     action: MilestoneUpdateAction;
//     createdAt: string;