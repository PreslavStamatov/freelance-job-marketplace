import { Request, Response } from "express"
import { AcceptJobApplicationDto, JobPostEntityInsert, JobPostExportDto, JobPostImportDto, JobPostToAssignedJob, MilestoneEntity, MilestoneImportDto, PersistedMilestone } from "../models/JobPost";
import { getAllJobPosts, persistJobPost, addFreelancerApplicationToJobPost, getJobPostApplicants, acceptJobApplication, getJobPost, fetchJobPostAndFreelancerIdFromJobApplication } from "../repositories/jobPost";
import { openDb } from "../db";
import { persistMilestone } from "../repositories/milestone";
import { FreelancerExportDto } from "../models/Users";
import { AssignedJobExportDto } from "../models/AssignedJob";
import { createAssignedJob } from "./assignedJob";
import { getMilestonesFromJobPost } from "./milestone";

export const createJobPost = async (req: Request, res: Response) => {

    const jobPostDto: JobPostImportDto = req.body;
    let milestonesDto: MilestoneImportDto[] = []
    if(jobPostDto.milestones) {
        milestonesDto = jobPostDto.milestones;
    }
    delete jobPostDto.milestones;
    const userId = req.user?.id;
    const db = await openDb();
    if (userId) {

        await db.exec("BEGIN");
        
        try {
            const jobPostToBePersisted: JobPostEntityInsert = {userId, ...jobPostDto, appliedFreelancers: []};
            const jobPostId: number | undefined = await persistJobPost(db, jobPostToBePersisted);
        

            let milestonesToBePersisted: MilestoneEntity[] = []
            if(jobPostId) {
                milestonesToBePersisted = milestonesDto.map(milestone => {
                    return {jobPostId, ...milestone};
            })
            }

            for (const milestone of milestonesToBePersisted) {
                await persistMilestone(db, milestone);
            }
            
            let jobPost: JobPostExportDto | undefined;
            if (jobPostId) {
                jobPost = await getJobPost(db, jobPostId)
            }
            await db.exec("COMMIT");
            return res.status(201).json(jobPost);
        } catch (err) {
            await db.exec("ROLLBACK");
            res.status(409).json({error: "Not created"});
        }
    }    

}

export const getAll = async (req: Request, res: Response) => {
    
    const db = await openDb();

    try {
        const jobPosts: JobPostExportDto[] = await getAllJobPosts(db);
        res.status(200).json(jobPosts);
    } catch (err) {
        res.status(400).json({error: err})
    }

}

export const applyToJobPost = async (req: Request, res: Response) => {
    const db = await openDb();
    const freelancerId: number | undefined = req.user?.id;
    const jobPostDto: {jobPostId: number} = req.body;
    if (freelancerId) {
        try {
            await addFreelancerApplicationToJobPost(db, freelancerId, jobPostDto.jobPostId);
            
            
            res.json(await db.all(`SELECT * FROM job_applications`));

        } catch (err) {
            return res.status(500).json({
                error: "Failed to apply to job post"
            })
        }
    }
}

export const fetchJobPostApplicants = async (req: Request, res: Response) => {
    const db = await openDb();
    const jobPostDto: {jobPostId: number} = req.body;
    if (jobPostDto) {
        try {
            const applicants: FreelancerExportDto[] = await getJobPostApplicants(db, jobPostDto.jobPostId);
            res.status(200).json(applicants)
        } catch (err) {
            res.status(401).json({error: err})
        }
    }
}



export const acceptFreelancerJobApplication = async (req: Request, res: Response) => {
    const db = await openDb();
    const acceptJobApplicationDto: AcceptJobApplicationDto = req.body;
    await db.exec("BEGIN")

    try {
        const result = await fetchJobPostAndFreelancerIdFromJobApplication(db, acceptJobApplicationDto.jobApplicationId);
        
        if(!result?.freelancerId || !result.jobPostId) {
            return
        }
        const {jobPostId, freelancerId} = result;

        const jobPostToAssignedJob: JobPostToAssignedJob | undefined = await acceptJobApplication(db, jobPostId, freelancerId);
        if (jobPostToAssignedJob) {

            const milestonesFromJobPost: PersistedMilestone[] | undefined = await getMilestonesFromJobPost(db, jobPostId);
            
            const assignedJobExportDto: AssignedJobExportDto | undefined = await createAssignedJob(db, jobPostToAssignedJob, freelancerId, milestonesFromJobPost);
            
            await db.exec("COMMIT");
            res.status(201).json({assignedJobExportDto})
        }

    } catch (err) {

        await db.exec("ROLLBACK");
        res.status(401).json({error: err});

    }

}