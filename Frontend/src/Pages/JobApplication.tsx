import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchJobApplicationById } from "../store/thunks/jobApplicationThunks";
import { setStatus } from "../store/slices/jobApplicationSlice";
import "../styles/JobApplicationPage.css"
import { formatDate } from "../utils/date";
import { acceptJobApplication } from "../services/employerService";
import Sidebar from "../components/Sidebar";


const JobApplication = () => {
    const { jobApplicationId } = useParams<{ jobApplicationId: string }>();
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(state => state.user.jwt);
    const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
    const email = useAppSelector(state => state.user.user?.email);

    const { status, jobApplication } = useAppSelector(state => state.jobApplication)
    useEffect(() => {
        dispatch(setStatus("idle"));
    }, [])

    useEffect(() => {
        if (isAuthenticated && status === "idle" && jobApplicationId && accessToken) {
            dispatch(fetchJobApplicationById({ jobApplicationId: parseInt(jobApplicationId), accessToken }))
        }
    }, [isAuthenticated, status, dispatch])

    return (
        <>
            <Sidebar />
            <div className="job-application-page">
                <div className="freelancer-application-container">

                    <div className="freelancer-application-heading">
                        <p className="freelancer-application-heading-text">{jobApplication.heading}</p>
                        <div className="freelancer-application-heading-details">
                            <p>{jobApplication.createdAt && formatDate(jobApplication.createdAt)}</p>
                        </div>
                    </div>

                    <div className="freelancer-application-profile">
                        <div className="freelancer-application-profile-main">
                            <div className="freelancer-image-container">
                                {jobApplication.freelancerImg ? <img src="" alt="" /> : <p>{jobApplication.freelancerFirstName?.slice(0, 1)}</p>}
                            </div>
                            <div className="main-freelancer-info-container">
                                <p className="freelancer-name">{jobApplication.freelancerFirstName} {jobApplication.freelancerLastName}</p>
                                <p className="freelancer-title">{jobApplication.freelancerTitle ? jobApplication.freelancerTitle : "No Title"}</p>
                            </div>
                        </div>

                        <div className="freelancer-application-profile-secondary">
                            <p>{email}</p>
                            <p>{email}</p>
                            <p>{email}</p>
                        </div>

                        <button className="view-profile-button">View Profile</button>

                    </div>

                    <div className="cover-letter-container">
                        <h3>Cover Letter</h3>
                        <p>{jobApplication.description}</p>
                    </div>

                    <div className="job-application-buttons">
                        <button
                            className="job-application-accept-button"
                            onClick={() => {
                                if (jobApplicationId) {
                                    acceptJobApplication(accessToken, parseInt(jobApplicationId), dispatch)
                                }
                            }}>Accept Application</button>
                        <button
                            className="job-application-reject-button"
                            onClick={() => {
                                if (jobApplicationId) {
                                    acceptJobApplication(accessToken, parseInt(jobApplicationId), dispatch)
                                }
                            }}>Reject Application</button>
                    </div>

                </div>

                <div className="job-overview-container">
                    <h2>Job Overview</h2>

                    <div className="job-overview-main-container">

                        <h2>{jobApplication.heading}</h2>

                        <div className="job-overview-details">

                            <div className="job-overview-detail-headings">
                                <p>Created:</p>
                                <p>Budget:</p>
                            </div>

                            <div className="job-overview-detail-values">
                                <p>{jobApplication.createdAt && formatDate(jobApplication.createdAt)}</p>
                                <p>$500</p>
                            </div>

                        </div>

                    </div>

                    <div className="job-overview-employer-container">

                        <div className="employer-intro">

                            <div className="employer-image-container">
                                {jobApplication.freelancerImg ? <img src="" alt="" /> : <p>{jobApplication.freelancerFirstName?.slice(0, 1)}</p>}
                            </div>
                            <div className="employer-name">
                                <p>Posted By</p>
                                <p>employer name</p>
                            </div>

                        </div>

                        <div className="employer-main-info-container">

                            <p className="employer-email">employer email</p>
                            <p className="employer-title">employer title</p>

                        </div>

                    </div>
                </div>

            </div>
        </>

    )
}

export default JobApplication;