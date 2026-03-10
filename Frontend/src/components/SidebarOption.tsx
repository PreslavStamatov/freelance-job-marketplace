import type { MouseEventHandler, PropsWithChildren } from "react";
import "../styles/SidebarOption.css"
import { useNavigate } from "react-router";

interface Props {
    optionText: string;
    onClick: MouseEventHandler<HTMLDivElement>;
    Img: React.ElementType;
}

const SidebarOption = ({onClick, optionText, children, Img}: PropsWithChildren<Props>) => {
    const navigate = useNavigate();

    return (
        <div 
        className="sidebar-option"
        onClick={onClick}>
            <div className="sidebar-option-icon-container">
                <Img className="sidebar-img"/>
            </div>
            <p className="sidebar-option-text">{optionText}</p>
        </div>
    )
}

export default SidebarOption;