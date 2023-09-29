import './index.scss'
import {CSSProperties} from "react";
export interface FormProps {
    children?: React.ReactNode,
    xClass?: String,
    xStyle?: CSSProperties,
}

function XCard({children, xClass, xStyle}: FormProps) {

    return (

        <div className={'x-card ' + (xClass ? xClass : '')} style={xStyle}>
            {children}
        </div>
    )
}

export default XCard;