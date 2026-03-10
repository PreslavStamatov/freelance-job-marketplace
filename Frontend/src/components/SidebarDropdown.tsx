import { useAppDispatch } from "../store/hooks";
import "../styles/SidebarDropdown.css"
import SidebarDropownOption from "./SidebarDropdownOption";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../store/slices/userSlice";
import { useNavigate } from "react-router";

interface Props {
    isDropdownActive: boolean;
    setIsDropdownActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarDropdown = ({ isDropdownActive, setIsDropdownActive }: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div
            className="sidebar-dropdown-container"
            onClick={() => setIsDropdownActive(!isDropdownActive)}>
            <div
                className="sidebar-dropdown"
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                    e.stopPropagation()
                }>
                <SidebarDropownOption Img={LogoutIcon} name="Logout" onClick={() => {
                    dispatch(logout());
                    navigate("/");
                }} />
            </div>
        </div>
    )
}

export default SidebarDropdown;