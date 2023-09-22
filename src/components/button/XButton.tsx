import './index.scss'
import React from "react";

function XButton({id, text, type, color, onClick, optionClass, isLoading, children}: XButtonProps) {
    let btnClass = 'btn btn-default';
    switch (color) {
        case 'primary':
            btnClass = 'btn btn-primary';
            break;
        case 'info':
            btnClass = 'btn btn-info';
            break;
        case 'success':
            btnClass = 'btn btn-success';
            break;
        case 'warning':
            btnClass = 'btn btn-warning';
            break;
        case 'danger':
            btnClass = 'btn btn-danger';
            break;
        case 'secondary':
            btnClass = 'btn btn-secondary';
            break;
    }
    if (optionClass) {
        // btnClass += ' btn-icon btn-sm';
        btnClass += ' ' + optionClass;
    }
    if (isLoading) {
        btnClass += ' is-loading';
    }
    return (
        <button id={id} type={type} className={btnClass} onClick={onClick}>
            {children}
            {text ? <span>{text}</span> : ''}
            {/*{icon ?  <i className={icon}></i> : ''}*/}
            {/*{icon ? <span className="icon is-small"><i className={icon}></i></span> : ''}*/}
        </button>
    );
}

// enum ButtonTypes {
//     "button",
//     "submit",
//     "reset",
//     undefined
// }

export interface XButtonProps {

    id?: String,
    color?: String,
    type?: "button"|"submit"|"reset"|undefined,
    text?: String,
    onClick?: Function,
    optionClass?: String,
    isLoading?: boolean,
    children?: React.ReactNode,
}

export default XButton;