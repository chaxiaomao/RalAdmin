import React from "react";
import './index.scss';

function XCheckbox({ label, name, value, checked, onChange} : XCheckboxProps) {

    return (
        <div className="form-check">
            <label className="form-check-label">
                <input
                    type="checkbox"
                    className="form-check-input"
                    name={value}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                />
                <span className="form-check-sign">{label}</span>
            </label>
        </div>
    )
}

export interface XCheckboxProps {

    label?: String,
    name?: String,
    value?: any,
    checked?: boolean,
    onChange?: Function,
}

export default XCheckbox;