import type { MilestoneImportDto, MilestoneUpdateDto } from "../models/assignedJob";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateMilestoneThunk } from "../store/thunks/assignedJobThunks";
import "../styles/MilestoneCard.css"
import { formatMilestoneStatus } from "../utils/assignedJob";
import { formatDate } from "../utils/date";

interface Props {
    milestone: MilestoneImportDto;
}

const MilestoneCard = ({ milestone }: Props) => {

    const role = useAppSelector(state => state.user.user?.role);
    const accessToken = useAppSelector(state => state.user.jwt);
    const dispatch = useAppDispatch();

    const updateMilestone = (accessToken: string | null, milestoneUpdate: MilestoneUpdateDto) => {
        dispatch(updateMilestoneThunk({
            accessToken,
            milestoneUpdate
        }));
    };

    return (
        <div className="milestone-card-container">

            <div className="milestone-info-section">

                <div className="milestone-heading">

                    <h2>{milestone.description}</h2>
                    <p className={`milestone-status ${milestone.status}`}>{formatMilestoneStatus(milestone.status)}</p>

                </div>

                <div className="milestone-details">

                    <div className="milestone-detail">
                        <p className="milestone-detail-heading">Description:</p>
                        <p>{milestone.description}</p>
                    </div>

                    <div className="milestone-detail">
                        <p className="milestone-detail-heading">Deadline:</p>
                        <p>{formatDate(milestone.deadline)}</p>
                    </div>

                    <div className="milestone-detail">
                        <p className="milestone-detail-heading">Payment:</p>
                        <p>${milestone.payment}</p>
                    </div>
                </div>

            </div>

            {/* <div>
                {milestone.lastUpdate && (<p>{milestone.lastUpdate.description}</p>)}
            </div> */}

            <div className="milestone-buttons-section">
                <button
                    className="submit-milestone-button milestone-button"
                    onClick={() => updateMilestone(accessToken, { action: "inReview", description: "MANY MISTAKES", milestoneId: milestone.id })}>
                        Submit Milestone
                </button>
                <button
                    className="complete-milestone-button milestone-button"
                    onClick={() => updateMilestone(accessToken, { action: "completed", description: "MANY MISTAKES", milestoneId: milestone.id })}>
                    Complete Milestone
                </button>
                <button
                className="reject-submited-milestone-button milestone-button"
                onClick={() => updateMilestone(accessToken, { action: "inProgress", description: "MANY MISTAKES", milestoneId: milestone.id })}>
                    Reject Milestone Review
                </button>

                {/* {role === "freelancer" && milestone.status === "inProgress" ?
                    <button className="submit-milestone-button milestone-button">Submit Milestone</button> :
                    <></>}

                {role === "employer" && milestone.status === "inReview" ?
                    <>
                        <button
                        className="complete-milestone-button milestone-button"
                        onClick={() => updateMilestone(accessToken, {action: "inProgress", description: "MANY MISTAKES", milestoneId: milestone.id})}>
                            Complete Milestone
                        </button>
                        <button className="reject-submited-milestone-button milestone-button">Reject Milestone Review</button>
                    </> :
                    <></>} */}

            </div>

        </div>
    )
}

export default MilestoneCard;