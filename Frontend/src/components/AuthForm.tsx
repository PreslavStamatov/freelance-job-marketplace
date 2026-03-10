import { GoogleLogin } from "@react-oauth/google";
import "../styles/AuthForm.css"
import { login, loginWithGoogle, register } from "../services/authService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { UserState } from "../store/models/userTypes";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import authBackground from "../images/auth-background.png"

type Props = {
    type: "Login" | "Register";
}

const AuthForm = ({ type }: Props) => {

    const dispatch = useAppDispatch();
    const state: UserState = useAppSelector(state => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (state.isAuthenticated && state.user?.role) {
            navigate("/");
        } else if (state.isAuthenticated && !state.user?.role) {
            navigate("/accountSetup");
        }
    }, [state.isAuthenticated, state.user?.role, navigate])

    return (
        <div className="auth-page-container">

            <div className="auth-background-container">
                <img src={authBackground} alt="" />
            </div>

            <section className="auth-form-container">

                <div className="left-section">

                    <h1 className="auth-form-header">Begin Your Journey</h1>
                    <h4 className="auth-form-sub-header">Start building your future now!</h4>
                    <form action={`/${type.toLowerCase()}`} onSubmit={type === "Login" ? event => login(event, dispatch) : event => register(event, dispatch)}>

                        <div className="form-group">
                            <input type="email" id="email" name="email" required placeholder="Email" />
                        </div>

                        <div className="form-group">
                            <input type="password" id="password" name="password" required placeholder="Password" />
                        </div>

                        {type === "Register" &&
                            <div className="form-group">
                                <input type="password" name="confirm-password" id="confirm-password" required placeholder="Confirm you password" />
                            </div>
                        }

                        <button type="submit">{type}</button>

                    </form>
                </div>
                <div className="divider">
                    OR
                </div>
                <div className="right-section">
                    <div className="google-login">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                if (credentialResponse.credential) {
                                    await loginWithGoogle(credentialResponse.credential, dispatch)
                                }
                            }}
                            onError={() => console.log("Login failed")}
                            type="standard"
                            theme="outline"
                            text="continue_with"
                            shape="pill"
                        />
                    </div>
                    {type === "Register" ?
                        <p>Already have an account? <a href="/login">&nbsp;Login</a></p> :
                        <p>Don't have an account? <a href="/register">&nbsp;Register</a></p>
                    }
                </div>

            </section>

        </div>
    )
}

export default AuthForm;