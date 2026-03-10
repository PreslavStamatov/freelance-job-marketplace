import { Database } from "sqlite";
import { JobPostToAssignedJob } from "../models/JobPost";
import { AssignedJobExportDto, AssignedJobHomePageDto, MilestoneExportDto } from "../models/AssignedJob";
import { Role } from "../models/Auth";
import { fetchLastMilestoneUpdate } from "./milestoneUpdate";

export const persistAssignedJob = async (db: Database, jobPost: JobPostToAssignedJob, freelancerId: number): Promise<AssignedJobExportDto | undefined> => {
  const createAssignedJobQuerry = `INSERT INTO assigned_jobs 
    (employerId, freelancerId, heading, description, deadline, payment) 
    VALUES (?, ?, ?, ?, ?, ?)`

  const assignedJob = await db.run(
    createAssignedJobQuerry,
    [jobPost?.userId, freelancerId, jobPost.heading, jobPost?.description, jobPost?.deadline, jobPost?.payment]
  );


  const result: AssignedJobExportDto | undefined = await db.get(`SELECT * FROM assigned_jobs WHERE id = ?`, assignedJob.lastID);

  return result;
}

export const getAssignedJob = async (db: Database, assignedJobId: number) => {
  let assignedJob: AssignedJobExportDto | undefined = await db.get(`
      SELECT
        *
      FROM assigned_jobs
      WHERE id = ?
    `, assignedJobId);

  if (assignedJob) {
    assignedJob.milestones = [];
    console.log(assignedJob)
  }

  let milestones: MilestoneExportDto[] = await db.all(`
      SELECT
        id,
        jobPostId,
        assignedJobId,
        description AS milestoneDescription,
        deadline AS milestoneDeadline,
        payment AS milestonePayment,
        status AS milestoneStatus
      FROM milestones
      WHERE assignedJobId = ?
    `, assignedJobId);

  const updatedMilestones: MilestoneExportDto[] = await Promise.all(
    milestones.map(async (milestone) => {
      const lastUpdate = await fetchLastMilestoneUpdate(db, milestone.id);

      return {
        ...milestone,
        lastUpdate: lastUpdate || null,
      };
    })
  );

  if (assignedJob) {
    assignedJob = { ...assignedJob, milestones: updatedMilestones }
  }


  return assignedJob;
}


export const getUserAssignedJobs = async (db: Database, userId: number | undefined, role: string | undefined): Promise<AssignedJobHomePageDto[]> => {
  const querry = role === "freelancer" ?
    `SELECT aj.id, aj.heading, aj.description, aj.deadline, u.firstName, u.lastName, u.image, aj.status FROM assigned_jobs aj LEFT JOIN users u ON u.id = aj.employerId WHERE freelancerId = ?` :
    `SELECT aj.id, aj.heading, aj.description, aj.deadline, u.firstName, u.lastName, u.image, aj.status FROM assigned_jobs aj LEFT JOIN users u ON u.id = aj.freelancerId WHERE employerId = ?`

  const result = await db.all(querry, userId);
  return result;
}

export const getAssignedJobById = async (db: Database, assignedJobId: number, role: Role): Promise<AssignedJobExportDto | undefined> => {
  const user = role === "freelancer" ? "employer" : "freelancer";
  return await db.get(`
      SELECT
        aj.id,
        aj.heading,
        aj.description,
        aj.createdAt,
        aj.deadline,
        aj.payment,
        aj.status,
        u.firstName AS ${user}FirstName,
        u.lastName AS ${user}LastName,
        u.title AS ${user}Title,
        u.image AS ${user}Img
      FROM assigned_jobs aj
      LEFT JOIN users u ON u.id = aj.${user}Id
      WHERE aj.id = ?`, assignedJobId);
}

export const getAssignedJobMilestones = async (db: Database, assignedJobId: number): Promise<MilestoneExportDto[] | undefined> => {
  const milestones = await db.all(`
      SELECT
        m.id,
        m.description,
        m.deadline,
        m.payment,
        m.status
      FROM milestones m
      LEFT JOIN assigned_jobs aj ON aj.id = m.assignedJobId
      WHERE aj.id = ?
    `, assignedJobId)

    const updatedMilestones: MilestoneExportDto[] = await Promise.all(
    milestones.map(async (milestone) => {
      const lastUpdate = await fetchLastMilestoneUpdate(db, milestone.id);

      return {
        ...milestone,
        lastUpdate: lastUpdate || null,
      };
    })
  );

  return updatedMilestones;
}