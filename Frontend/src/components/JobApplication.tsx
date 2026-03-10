import { useNavigate } from "react-router";
import "../styles/JobApplication.css"
import type { JobApplicationHomePageImportDto } from "../models/employer";
import { formatDate } from "../utils/date";

type Props = {
    jobApplication: JobApplicationHomePageImportDto;
}

const JobApplication = ({ jobApplication }: Props) => {

    const navigate = useNavigate();
    return (
        <div className="job-application-container">
            <div className="job-application-upper-section">
                <h2 className="job-application-heading">{jobApplication.heading}</h2>
                <div className="job-application-details">
                    <p>{formatDate(jobApplication.createdAt)}</p>
                </div>
            </div>
            <div className="job-application-middle-section">
                <p className="job-application-description">{jobApplication.description}</p>
            </div>
            <div className="job-application-lower-section">
                <div className="job-application-user-container">
                    <div className="job-application-user-img-container">
                        <img src="" alt="" />
                    </div>
                    <div className="job-application-user-info-container">
                        <p className="job-application-user-name">{`${jobApplication.freelancerFirstName} ${jobApplication.freelancerLastName}`}</p>
                        <p className="job-application-user-title">{jobApplication.freelancerTitle}</p>
                    </div>
                </div>
                <div className="view-job-application-button-container">
                    <button
                        className="view-job-application-button"
                        onClick={() => navigate(`/jobApplications/${jobApplication.id}`)}>
                        View Application
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JobApplication;