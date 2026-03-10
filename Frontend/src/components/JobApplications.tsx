import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import JobApplication from "./JobApplication";
import { fetchPendingApplications } from "../store/thunks/jobApplicationThunks";
import "../styles/JobApplications.css"
import EmptyState from "./EmptyState";
import noPendingJobApplications from "../images/noPendingJobApplications.png"

const JobApplications = () => {

    const { jobApplications, status } = useAppSelector(state => state.jobApplications);
    const accessToken = useAppSelector(state => state.user.jwt);
    const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
    const dispatch = useAppDispatch();
    const role = useAppSelector(state => state.user.user?.role);

    useEffect(() => {
        if (isAuthenticated && status === "idle") {
            dispatch(fetchPendingApplications(accessToken));
        }
    }, [isAuthenticated, status, dispatch]);
    
    return (
        <div className="applications-container">
            <h2>Pending Applications</h2>

            {jobApplications.length === 0 &&
            <EmptyState
            description={`Once ${role === "employer" ? "freelancers apply" : "you apply to jobs"} ,you will see them here.`}
            heading="No applications yet"
            img={noPendingJobApplications}
            />}
            
            {status === "loading" && <div className="applications-container">Loading Applications</div>}

            {jobApplications.map((jobApplication) => {
                return (
                    <JobApplication
                    key={jobApplication.id}
                    jobApplication={jobApplication}/>    
                )
            })}
        </div>
    )
}

export default JobApplications;