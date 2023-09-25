import './index.scss'
import '../input/XInput.tsx'

// Import the library
import Datetime from 'react-datetime';

function XCalendar({ label, name, value, placeholder, type, onChange, icon, } : XInputProps) {

    const renderInput = (props, openCalendar, closeCalendar) => {
        return (
            <div className="field">
                {label ? <label className="label">{label}</label> : ''}
                <div className={icon ? "control has-icons-left" : "control"}>
                    <input
                        // type={type}
                        className="input"
                        // name={name}
                        // value={value}
                        // placeholder={placeholder}
                        // onChange={onChange}
                        onClick={openCalendar}
                        {...props}
                        // onClick={handleInputClick}
                        // onChange={(e) => handleFormChange(e.target.value)}
                    />
                    {icon ? <span className="icon is-small is-left"><i className={icon}></i></span> : ''}
                </div>

            </div>
        )
    };



    return (

        <Datetime
            initialValue={value}
            renderInput={renderInput}
            inputProps={{className: "input", placeholder: placeholder}}
            dateFormat="YYYY-MM-DD"
            timeFormat="HH:mm"
            locale="zh-CN"
        />
    )
}
import React, {useRef, useState} from "react";
import {XInputProps} from "../input/XInput";
export default XCalendar;