type Props = {
    img: string;
    role: string;
    roleDescription: string;
    selected: boolean;
    onSelect: () => void;
}

const RoleSelector = ({ img, role, roleDescription, selected, onSelect }: Props) => {

    return (
        <div className={`role-selector-container ${selected && "selected-role-container"}`} onClick={onSelect}>
            <div className="role-image-container">
                <img src={img} alt="" />
            </div>
            <p className="role-header">{role.charAt(0).toUpperCase()+ role.slice(1)}</p>
            <p className="role-description">{roleDescription}</p>
        </div>
    )
}

export default RoleSelector;