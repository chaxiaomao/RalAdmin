import './index.scss'
import React from "react";

function XInput({ label, name, value, placeholder, type, onChange, icon, errors} : XInputProps) {
    return (
        <div className="field">
            {label ? <label className="label">{label}</label> : ''}
            <div className={icon ? "control has-icons-left" : "control"}>
                <input
                    type={type}
                    className="input"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    // onChange={(e) => handleFormChange(e.target.value)}
                />
                {icon ? <span className="icon is-small is-left"><i className={icon}></i></span> : ''}
            </div>
            {errors ? <p className="help is-danger"> {errors} </p> : ''}

        </div>
    );
}

export interface XInputProps {

    label?: String,
    name?: any,
    value?: any,
    errors?: any,
    placeholder?: any,
    type?: String,
    onChange?: Function,
    icon?: String,
}

export default XInput;