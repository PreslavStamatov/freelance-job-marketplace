import { useNavigate } from "react-router";
import "../styles/AssignedJob.css"

type Props = {
    id: number;
    heading: string;
    deadline: string;
    firstName: string;
    lastName: string;
    status: "active" | "finished"
}

const AssignedJob = ({ id, heading, deadline, firstName, lastName, status }: Props) => {
        const navigate = useNavigate();

        return (
            <div className="assigned-job-container">
                <div className="assigned-job-heading">
                    <h3>{heading}</h3>
                    <div className={`assigned-job-status-${status}`}>{status.toUpperCase()}</div>
                </div>
                <div className="assigned-job-user-info">
                    <p className="assigned-job-user-name"><strong>Client:</strong>&nbsp;{firstName} {lastName}</p>
                </div>
                <div className="assigned-job-deadline-info">
                    <p className="assigned-job-deadline"><strong>Deadline:</strong>&nbsp;{deadline}</p>
                </div>
                <button
                className="view-assigned-job-button" 
                onClick={() => navigate(`/assignedJobs/${id}`)}>
                    View Assigned Job
                </button>
            </div>
        )
    }

export default AssignedJob;