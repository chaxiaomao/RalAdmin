import './index.scss'
import React from "react";

function XTextarea({ label, name, value, placeholder, type, onChange, icon, errors, css} : XInputProps) {
    return (
        <div className="field">
            {label ? <label className="label">{label}</label> : ''}
            <div className={icon ? "control has-icons-left" : "control"}>
                <textarea
                    type={type}
                    className={css ? "textarea " + css : "textarea"}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    // onChange={(e) => handleFormChange(e.target.value)}
                />
                {icon ? <span className="icon is-small is-left"><i className={icon}></i></span> : ''}
            </div>
            {errors ? <p className="help is-danger"> {getMsg(errors)} </p> : ''}

        </div>
    );
}

function getMsg(err) {
    // 判断是否是数组
    if (Array.isArray(err)) {
        return err[0]
    } else {
        return err
    }
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
    css?: String,
}

export default XTextarea;