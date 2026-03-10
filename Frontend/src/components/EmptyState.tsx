import "../styles/EmptyState.css"

interface Props {
    img: string;
    heading: string;
    description: string;
}

const EmptyState = ({description, heading, img}: Props) => {

    return (
        <div className="empty-state-container">
            <div className="empty-state-img-container">
                <img src={img} alt="" />
            </div>
            <h2>{heading}</h2>
            <p>{description}</p>
        </div>
    )
}

export default EmptyState;