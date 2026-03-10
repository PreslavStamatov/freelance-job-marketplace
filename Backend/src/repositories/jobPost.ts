import { Database } from "sqlite";
import { JobPostEntity, JobPostEntityInsert, JobPostExportDto, JobPostToAssignedJob, MilestoneEntity, MilestoneExportDto } from "../models/JobPost";
import { FreelancerExportDto } from "../models/Users";

export const persistJobPost = async (db: Database, jobPost: JobPostEntityInsert): Promise<number | undefined> => {
    const querry = `INSERT INTO job_posts (userId, heading, description, deadline, payment) VALUES (?, ?, ?, ?, ?)`
    const result = await db.run(querry, [jobPost.userId, jobPost.heading, jobPost.description, jobPost.deadline, jobPost.payment]);
    return result.lastID;
}

export const getJobPost = async (db: Database, jobPostId: number): Promise<JobPostExportDto | undefined> => {
  let jobPost: JobPostExportDto | undefined = await db.get(`
      SELECT
        *
      FROM job_posts
      WHERE id = ?
    `, jobPostId);

    if(jobPost) {
      jobPost.milestones = [];
      console.log(jobPost)
    }
    const milestones: MilestoneExportDto[] = await db.all(`
      SELECT
        id,
        jobPostId,
        assignedJobId,
        description AS milestoneDescription,
        deadline AS milestoneDeadline,
        payment AS milestonePayment,
        status AS milestoneStatus
      FROM milestones
      WHERE jobPostId = ?
    `, jobPostId);
  
      if (jobPost) {
        jobPost = {...jobPost, milestones: milestones}
      }
    
  
    return jobPost;
}

export const getAllJobPosts = async (db: Database): Promise<JobPostExportDto[]> => {

  const jobPosts: JobPostExportDto[] = (await db.all(`
    SELECT
      jp.id,
      jp.description AS jobPostDescription,
      jp.deadline AS jobPostDeadline,
      jp.payment AS jobPostPayment,
      jp.createdAt,
      jp.status
    FROM job_posts jp
  `)).map(jp => ({
    ...jp,
    milestones: []
  }));

  const milestones: MilestoneExportDto[] = await db.all(`
    SELECT
      m.id,
      m.jobPostId,
      m.description AS milestoneDescription,
      m.deadline AS milestoneDeadline,
      m.payment AS milestonePayment,
      m.status AS milestoneStatus
    FROM milestones m
  `);

  const jobPostMap = new Map<number, JobPostExportDto>();
  jobPosts.forEach(jp => jobPostMap.set(jp.id, jp));

  for (const milestone of milestones) {
    const jobPost = jobPostMap.get(milestone.jobPostId);
    if (jobPost) {
      jobPost.milestones.push(milestone);
    }
  }

  return jobPosts;
};

export const addFreelancerApplicationToJobPost = async (db:Database, freelancerId: number, jobPostId: number) => {
  const freelancers = await db.all(`SELECT * FROM job_applications WHERE freelancerId = ? AND jobPostId = ?`, [freelancerId, jobPostId]);
  
  if (freelancers.length === 0) {
    const query = `
        INSERT INTO job_applications (jobPostId, freelancerId)
        VALUES (?, ?)
      `;

      return await db.run(query, [jobPostId, freelancerId]);
  } else {
    throw new Error("Already applied")
  }
 
};

export const getJobPostApplicants = async (db: Database, jobPostId: number) => {
  const querry = `SELECT u.id, u.firstName, u.email FROM job_applications ja
                  LEFT JOIN users u ON u.id = ja.freelancerId
                  WHERE ja.jobPostId = ?`
  const result: FreelancerExportDto[] = await db.all(querry, jobPostId);
  return result;
}

export const acceptJobApplication = async(db: Database, jobPostId: number, freelancerId: number): Promise<JobPostToAssignedJob | undefined> => {
  
  const jobPost: JobPostEntity | undefined = await db.get(`SELECT * FROM job_posts jp WHERE jp.id = ?`, jobPostId);
  // console.log(jobPost)
  if(jobPost?.status && jobPost.status === "closed") {

    throw new Error("Job closed")
  }

  const closeJobPostQuerry = `UPDATE job_posts
                        SET status = 'closed'
                        WHERE id = ?`
  const setStatusToAcceptedQuerry = `UPDATE job_applications
                  SET status = 'accepted'
                  WHERE jobPostId = ?
                  AND freelancerId = ?`;

  const setStatusToDeclinedQuerry = `UPDATE job_applications
                  SET status = 'declined'
                  WHERE jobPostId = ?
                  AND freelancerId != ?`;

  const jobPostToAssignedJob: JobPostToAssignedJob | undefined = await db.get(
    `SELECT userId, heading, description, deadline, payment FROM job_posts WHERE id = ?`, jobPostId
  );

  await db.run(closeJobPostQuerry, jobPostId);

  await db.run(setStatusToAcceptedQuerry, [jobPostId, freelancerId]);

  await db.run(setStatusToDeclinedQuerry, [jobPostId, freelancerId]);

  return jobPostToAssignedJob;
}

export const fetchJobPostAndFreelancerIdFromJobApplication =
async (db: Database, jobApplicationId: number):
Promise<{jobPostId: number, freelancerId: number} | undefined> => {
  const result: {jobPostId: number, freelancerId: number} | undefined = await db.get(
    `SELECT
      jp.id AS jobPostId,
      u.id AS freelancerId
    FROM job_applications ja
    LEFT JOIN job_posts jp ON ja.jobPostId = jp.id
    LEFT JOIN users u ON ja.freelancerId = u.id
    WHERE ja.id = ?`
    , jobApplicationId);

  if(result) {
    return result;
  }
}