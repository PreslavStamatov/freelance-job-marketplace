import { useState } from "react";
import type { AccountSetupState } from "../models/auth";
import RoleSelector from "./RoleSelector";
import { useCompleteAccountSetup } from "../hooks/useCompleteAccountSetup";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "../styles/RoleSetupForm.css"
import freelancerImg from "../images/freelancer.png"
import employerImg from "../images/employer.png"


type Props = {
    state: AccountSetupState;
    updateAccountSetup: React.Dispatch<React.SetStateAction<AccountSetupState>>;
}

const RoleSetupForm = ({ updateAccountSetup, state }: Props) => {
    const { completeAccountSetup } = useCompleteAccountSetup();
    const [role, setRole] = useState<"freelancer" | "employer" | null>(null);

    return (
        <div className="role-setup-form">

            <div className="role-setup-heading">
                <h2>What are you trying to become</h2>
                <p>Select the role that fits your needs</p>
            </div>

            <div className="role-setup-main-content">
                <div className="role-selectors-container">
                    <RoleSelector img={freelancerImg} role="freelancer" roleDescription="I am looking for a job" selected={role === "freelancer"} onSelect={() => setRole("freelancer")} />
                    <RoleSelector img={employerImg} role="employer" roleDescription="I am an employer" selected={role === "employer"} onSelect={() => setRole("employer")} />
                </div>

                <div className="form-buttons-container">
                    <button
                        className="back-button"
                        onClick={() => updateAccountSetup(() => ({
                            firstName: null,
                            lastName: null,
                            role: null
                        }))}>
                        <ArrowBackIosNewIcon />
                    </button>

                    <button
                        className="submit-button"
                        type="submit"
                        onClick={async () => await completeAccountSetup(role, state, updateAccountSetup)}>
                        Finish Account Setup
                    </button>
                </div>
            </div>

        </div>
    )
}

export default RoleSetupForm;