import React from "react";
import './index.css';

function XCheckbox({ label, value, checked, onChange} : XCheckboxProps) {

    return (
        <div className="form-check">
            <label className="form-check-label">
                <input
                    type="checkbox"
                    className="form-check-input"
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
    value?: any,
    checked?: boolean,
    onChange?: Function,
}

export default XCheckbox;