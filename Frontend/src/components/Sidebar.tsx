import "../styles/Sidebar.css"
import SidebarOption from "./SidebarOption";
import logo from "../images/logo.png"
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import SidebarDropdown from "./SidebarDropdown";

const Sidebar = () => {
    const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.user)
    const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
    return (
        isAuthenticated ?

            <div className="sidebar-container">
                <div className="logo-container">
                    <img src={logo} alt="" />
                </div>

                <div className="sidebar-options-container">
                    <SidebarOption
                    onClick={() => navigate("/")}
                    optionText="Home"
                    Img={HomeIcon}>
                        
                    </SidebarOption>
                    <SidebarOption
                    onClick={() => navigate("/createJobPost")}
                    optionText="Create Job Post"
                    Img={WorkIcon}>
                    </SidebarOption>
                </div>

                <div className="sidebar-profile-container">
                    <div className="sidebar-user-info-container">
                        <Avatar className="sidebar-avatar"style={{height:"100%", aspectRatio:"1/1"}}/>

                        <div className="sidebar-profile-info">
                            <p className="sidebar-profile-name">{`${user?.firstName} ${user?.lastName}`}</p>
                            <p className="sidebar-profile-email">{user?.email}</p>
                        </div>
                    </div>


                    <div className="sidebar-dropdown-trigger">
                        {isDropdownActive ?
                        <SidebarDropdown
                        isDropdownActive={isDropdownActive}
                        setIsDropdownActive={setIsDropdownActive}/> :
                        <></>}
                        <MoreVertIcon
                        style={{ color: "white", fontSize: "2rem" }}
                        onClick={() => setIsDropdownActive(!isDropdownActive)}/>
                    </div>
                </div>
            </div>
            :
            <div></div>

    )
}

export default Sidebar;