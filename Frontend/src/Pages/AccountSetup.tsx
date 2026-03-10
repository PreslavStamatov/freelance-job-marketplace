import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router";
import type { AccountSetupState } from "../models/auth";
import NameSetupForm from "../components/NameSetupForm";
import "../styles/AccountSetup.css"
import RoleSetupForm from "../components/RoleSetupForm";
import authBackground from "../images/auth-background.png"
import "../styles/AuthForm.css"


const AccountSetup = () => {

    const { user } = useAppSelector((state => state));
    const navigate = useNavigate();
    const [setupState, setSetupState] = useState<AccountSetupState>({firstName: null, lastName: null, role: null});

    useEffect(() => {
        if(!user.isAuthenticated) {
            navigate("/login");
        }
    }, [user.isAuthenticated, navigate])

    useEffect(() => {
        if(user.user?.role) {
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/")
        }
    }, [user, navigate])

    useEffect(() => {
        if(!user.jwt) {
            navigate("/login");
        }
    }, [user.jwt])

    return (
        <div className="account-setup-page-container">

            <div className="account-setup-background-container">
                <img src={authBackground} alt="" />
            </div>

            {setupState?.firstName && setupState.lastName ? <RoleSetupForm updateAccountSetup = {setSetupState} state = {setupState}/> : <NameSetupForm updateAccountSetup = {setSetupState} />}

        </div>
    )
}

export default AccountSetup;