import { useAppDispatch } from "../store/hooks"
import { logout } from "../store/slices/userSlice";

const useLogout = () => {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(logout());
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    }
}

export { useLogout };