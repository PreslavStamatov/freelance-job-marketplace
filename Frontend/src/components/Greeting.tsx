import type { JSX } from "react"
import "../styles/Greeting.css"

type Props = {
    children: JSX.Element
}

const Greeting = ({children}: Props) => {

    return (
        <div className="greeting-container">
            {children}
        </div>
    )
}

export default Greeting;