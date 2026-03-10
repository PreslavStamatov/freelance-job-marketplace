import { Database } from "sqlite";
import { JobApplicationExportDto } from "../models/JobApplication";
import { Role } from "../models/Auth";

export const getPendingApplications = async (db: Database, userId: number) => {
  const querry = `SELECT
    ja.id          AS id,
    jp.heading     AS heading,
    jp.description AS description,
    f.firstName    AS freelancerFirstName,
    f.lastName     AS freelancerLastName,
    f.title        AS freelancerTitle,
    f.image        AS freelancerImg,
    ja.createdAt   AS createdAt
  FROM job_applications ja
    JOIN job_posts jp ON jp.id = ja.jobPostId
    JOIN users f     ON f.id = ja.freelancerId
    JOIN users e     ON e.id = jp.userId
  WHERE e.id = ?
  AND ja.status = 'pending';
`
  const result: JobApplicationExportDto[] = await db.all(querry, userId);
  return result;
}

export const getJobApplicationById = async (db: Database, jobApplicationId: number, role: Role | undefined) => {
  const querry = role === "employer"
  ?
  `SELECT
      ja.id AS id,
      jp.heading AS heading,
      jp.description AS description,
      u.firstName AS freelancerFirstName,
      u.lastName AS freelancerLastName,
      u.title AS freelancerTitle,
      u.image AS freelancerImg,
      ja.createdAt AS createdAt
    FROM job_applications ja
    LEFT JOIN users u ON u.id = ja.freelancerId
    LEFT JOIN job_posts jp ON jp.id = ja.jobPostId
    WHERE ja.id = ?`
    :
    `SELECT
      ja.id AS id,
      jp.heading AS heading,
      jp.description AS description,
      u.firstName AS freelancerFirstName,
      u.lastName AS freelancerLastName,
      u.title AS freelancerTitle,
      u.image AS freelancerImg,
      ja.createdAt AS createdAt
    FROM job_applications ja
    LEFT JOIN job_posts jp ON jp.id = ja.jobPostId
    LEFT JOIN users u ON u.id = jp.userId
    WHERE ja.id = ?`
    
  let jobApplication: JobApplicationExportDto | undefined = await db.get(querry, jobApplicationId);
        console.log(jobApplication, "jobApplication")
  
        if(role === "employer") {

        }
  return jobApplication;
}