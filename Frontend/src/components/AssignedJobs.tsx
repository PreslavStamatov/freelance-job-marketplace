import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchHomePageAssignedJobs } from "../store/thunks/assignedJobThunks";
import AssignedJob from "./AssignedJob";
import EmptyState from "./EmptyState";
import noAssignedJobs from "../images/noAssignedJobs.png"

const AssignedJobs = () => {

    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(state => state.user.jwt);
    const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
    const { assignedJobs, status } = useAppSelector(state => state.assignedJobs);
    console.log("status: ", status)

    useEffect(() => {
        if (isAuthenticated && status === "idle") {
            dispatch(fetchHomePageAssignedJobs(accessToken));
        }
    }, [isAuthenticated, status, dispatch]);

    if (assignedJobs.length === 0) {
        return (
            <EmptyState
            description="You have no jobs in progress."
            heading="No assigned jobs"
            img={noAssignedJobs}/>
        )
    }
    if (status === "loading") {
        return (<div>Loading...</div>)

    }

    return (
        <div className="assigned-jobs-container">
            <div className="assigned-jobs-inner-container">
                {assignedJobs.map(assignedJob => {
                    return (
                        <AssignedJob
                            key={assignedJob.id}
                            id={assignedJob.id}
                            heading={assignedJob.heading}
                            deadline={assignedJob.deadline}
                            firstName={assignedJob.firstName}
                            lastName={assignedJob.lastName}
                            status={assignedJob.status}>
                        </AssignedJob >
                    )
                })}
            </div>

        </div>
    )
}

export default AssignedJobs;