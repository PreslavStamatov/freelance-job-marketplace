import { Database } from "sqlite";
import { MilestoneEntity, PersistedMilestone } from "../models/JobPost";
import { MilestoneUpdateAction, MilestoneUpdateExportDto } from "../models/MilestoneUpdate";
import { MilestoneExportDto } from "../models/AssignedJob";

export const persistMilestone = async (db: Database, milestone: MilestoneEntity): Promise<void> => {
    const querry = `INSERT INTO milestones (jobPostId, description, deadline, payment) VALUES (?, ?, ?, ?)`
    await db.run(querry, [milestone.jobPostId, milestone.description, milestone.deadline, milestone.payment]);
}

export const fetchMilestonesFromJobPost = async (db: Database, jobPostId: number): Promise<PersistedMilestone[] | undefined> => {
    const querry = `SELECT * FROM milestones WHERE jobPostId = ?`
    return await db.all(querry, jobPostId);
}

export const appendMilestonesToAssignedJob = async (db: Database, milestones: PersistedMilestone[], assignedJobId: number) => {
    console.log(assignedJobId)
    const milesonesIds: number[] = milestones.map(milestone => milestone.id);
    let placeholders: string = milesonesIds.map(() => "?").join(", ");

    const querry = `UPDATE milestones
                    SET assignedJobId = ?
                    WHERE id IN (${placeholders})`;
    
    return await db.run(querry, [assignedJobId, ...milesonesIds]);
}

export const updateMilestoneStatus = async (db:Database, status: string, milesoneId: number) => {
    return await db.run(`
        UPDATE milestones
        SET status = ?
        WHERE id = ?`, [status, milesoneId]
    );
}


// milestoneId INTEGER NOT NULL,
//     userId INTEGER NOT NULL,
//     description TEXT NOT NULL,
//     action TEXT NOT NULL DEFAULT 'inProgress' CHECK (status IN ('inProgress', 'completed', 'inReview')),
//     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

export const persistMilestoneUpdate = async (db:Database, description: string, userId: number, action: MilestoneUpdateAction, milestoneId: number) => {
    const result = await db.run(`
        INSERT INTO milestone_updates
        (milestoneId, userId, description, action)
        VALUES
        (?, ?, ?, ?)`, [milestoneId, userId, description, action])

    return result.lastID;
}

export const fetchMilestoneById = async (db: Database, milestoneId: number): Promise<MilestoneExportDto | undefined> => {
    const milestone: MilestoneExportDto | undefined = await db.get(`
            SELECT 
                m.id,
                m.description,
                m.deadline,
                m.payment,
                m.status
            FROM milestones m 
            WHERE m.id = ?
        `, milestoneId)

    const lastUpdate: MilestoneUpdateExportDto | undefined = await db.get(`
            SELECT
                mu.id,
                u.firstName AS userFirstName,
                u.lastName AS userLastName,
                mu.description,
                mu.action,
                mu.createdAt
            FROM milestone_updates mu
            LEFT JOIN users u ON u.id = mu.userId
            WHERE mu.milestoneId = ?
            ORDER BY mu.createdAt DESC
            LIMIT 1
        `)

    if(milestone) {
        milestone.lastUpdate = lastUpdate;
    }

    return milestone;
}