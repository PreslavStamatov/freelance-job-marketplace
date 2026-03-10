import type { AccountSetupState } from "../models/auth";
import { useAppSelector } from "../store/hooks";
import "../styles/NameSetupForm.css"
import { handleNameStateUpdate } from "../utils/accountSetup";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type Props = {
    updateAccountSetup: React.Dispatch<React.SetStateAction<AccountSetupState>>;
}

const NameSetupForm = ({ updateAccountSetup }: Props) => {
    const email = useAppSelector(state => state.user.user?.email);

    return (
        <div className="name-setup-form">

            <div className="name-setup-heading">
                <h2 className="account-setup-header">Make a name for yourself</h2>
                <p>Finish creating your account using</p>
                <p className="email">{email}</p>
            </div>

            <form onSubmit={(event) => { handleNameStateUpdate(event, updateAccountSetup) }}>

                <div className="form-main-content">
                    <div className="account-setup-input">
                        <label htmlFor="">First Name</label>
                        <input type="text" id="first-name" name="first-name" placeholder="John" />
                    </div>
                    <div className="account-setup-input">
                        <label htmlFor="">Last Name</label>
                        <input type="text" id="last-name" name="last-name" placeholder="Doe" />
                    </div>
                </div>


                <div className="form-buttons-container">
                    <button className="back-button"><ArrowBackIosNewIcon /></button>
                    <button className="submit-button" type="submit">Next</button>
                </div>

            </form>

        </div>
    )

}

export default NameSetupForm;