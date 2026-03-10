import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAssignedJobById } from "../store/thunks/assignedJobThunks";
import { setStatus } from "../store/slices/assignedJobSlice";
import { formatDate } from "../utils/date";
import { calculateMilestonesProgress } from "../utils/assignedJob";
import MilestoneCard from "../components/MilestoneCard";
import Sidebar from "../components/Sidebar";

function AssignedJob() {
    const { assignedJobId } = useParams<{ assignedJobId: string }>();
    const { assignedJob, status } = useAppSelector(state => state.assignedJob);
    const { isAuthenticated, jwt } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setStatus("idle"));
    }, [])

    useEffect(() => {
        if (isAuthenticated && status === "idle" && assignedJobId && jwt) {
            dispatch(fetchAssignedJobById({ assignedJobId: parseInt(assignedJobId), accessToken: jwt }))
        }
    }, [isAuthenticated, status, dispatch])

    const milestoneProgressValue = useMemo(() => {
        if (!assignedJob?.milestones) return 0;
        return calculateMilestonesProgress(assignedJob.milestones);
    }, [assignedJob?.milestones]);

    return (
        <>
            <Sidebar />

            <div className="assigned-job-page">

                <div className="assigned-job-page-container">

                    <div className="assigned-jod-heading">
                        <p className="assigned-job-heading-text">{assignedJob?.heading}</p>
                        <div className="assigned-job-heading-details">
                            <div><p className={`assigned-job-status-${assignedJob?.status}`}>{assignedJob?.status.toUpperCase()}</p></div>
                            <p>Budget: ${assignedJob?.payment}</p>
                            <p>Due: {assignedJob?.deadline && formatDate(assignedJob.deadline)}</p>
                        </div>
                    </div>

                    <div className="assigned-job-overview">

                        <h3>Contract Overview</h3>

                        <div className="assigned-job-overview-details">
                            <div className="assigned-job-overview-detail">
                                <p className="assigned-job-overview-detail-heading">Created: </p>
                                <p>{assignedJob && formatDate(assignedJob.createdAt)}</p>
                            </div>
                            <div className="assigned-job-overview-detail">
                                <p className="assigned-job-overview-detail-heading">Due:</p>
                                <p>{assignedJob?.deadline && formatDate(assignedJob.deadline)}</p>
                            </div>
                            <div className="assigned-job-overview-detail">
                                <p className="assigned-job-overview-detail-heading">Total Payment:</p>
                                <p>${assignedJob?.payment}</p>
                            </div>
                        </div>

                        <div className="milestone-progress-container">
                            <p>Milestones Progress:</p>
                            <div className="milestones-progress-bar-container">
                                <div className="milestones-progress-bar"
                                    style={{ width: `${milestoneProgressValue}%` }}>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="assigned-job-page-milestones-container">
                        <h3>Milestones</h3>
                        <div className="assigned-job-page-milestones">
                            {
                                assignedJob?.milestones.map(
                                    milestone =>
                                        <MilestoneCard key={milestone.id} milestone={milestone} />
                                )
                            }
                        </div>
                    </div>

                </div>

            </div>
        </>

    )
}

{/* <div>{assignedJob?.id}</div>
            <div>{assignedJob?.heading}</div>
            <div>{assignedJob?.description}</div>
            <div>{assignedJob?.deadline}</div>
            <div>{assignedJob?.milestones[0].description}</div>
            <div>{assignedJob?.milestones[0].status}</div> */}

export default AssignedJob;