import type { MouseEventHandler } from "react";

interface Props {
    name: string;
    Img: React.ElementType;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const SidebarDropownOption = ({onClick, name, Img}: Props) => {

    return (
        <div
        className="sidebar-dropdown-option"
        onClick={onClick}>
            <p>{name}</p>
            {Img && <Img style={{color:"white"}}/>}
        </div>
    )
}

export default SidebarDropownOption;