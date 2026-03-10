import { useEffect, type JSX } from "react";
import { useAppDispatch } from "../store/hooks";
import { refreshAccessToken } from "../services/authService";
import { updateAccessToken } from "../store/slices/userSlice";
import { useLogout } from "../hooks/useLogout";

type Props = {
    children: JSX.Element;
}

const ProtectedRoute = ({children}: Props)  => {
    //TRY TO GET NEW JWT AND IF REFRESH TOKEN IS EXPIRED LOGOUT
    // const { isAuthenticated } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchNewToken = async () => {
            const newAccessToken = await refreshAccessToken();
            dispatch(updateAccessToken(newAccessToken));
            return newAccessToken;
        }
        
        try {
            fetchNewToken();
        } catch {
            useLogout();
        }
 
    }, []);

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        children
    )
}

export default ProtectedRoute;