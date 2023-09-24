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

        <div className="field">
            <label></label>
            <Datetime
                initialValue={value}
                renderInput={renderInput}
                inputProps={{className: "input", placeholder: placeholder}}
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm"
                locale="zh-CN"
            />
            {/*{isDropdown ?  <Datetime renderInput={renderInput} /> : ""}*/}

            {/*<div className={isDropdown ? "rdtPicker" : "hide"}>*/}
            {/*    <div className="rdtDays">*/}
            {/*        <table>*/}
            {/*            <thead>*/}
            {/*            <tr>*/}
            {/*                <th className="rdtPrev"><span>‹</span></th>*/}
            {/*                <th className="rdtSwitch" colSpan="5" data-value="8">September 2023</th>*/}
            {/*                <th className="rdtNext"><span>›</span></th>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <th className="dow">Su</th>*/}
            {/*                <th className="dow">Mo</th>*/}
            {/*                <th className="dow">Tu</th>*/}
            {/*                <th className="dow">We</th>*/}
            {/*                <th className="dow">Th</th>*/}
            {/*                <th className="dow">Fr</th>*/}
            {/*                <th className="dow">Sa</th>*/}
            {/*            </tr>*/}
            {/*            </thead>*/}
            {/*            <tbody>*/}
            {/*            <tr>*/}
            {/*                <td data-value="27" data-month="7" data-year="2023" className="rdtDay rdtOld">27</td>*/}
            {/*                <td data-value="28" data-month="7" data-year="2023" className="rdtDay rdtOld">28</td>*/}
            {/*                <td data-value="29" data-month="7" data-year="2023" className="rdtDay rdtOld">29</td>*/}
            {/*                <td data-value="30" data-month="7" data-year="2023" className="rdtDay rdtOld">30</td>*/}
            {/*                <td data-value="31" data-month="7" data-year="2023" className="rdtDay rdtOld">31</td>*/}
            {/*                <td data-value="1" data-month="8" data-year="2023" className="rdtDay">1</td>*/}
            {/*                <td data-value="2" data-month="8" data-year="2023" className="rdtDay">2</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td data-value="3" data-month="8" data-year="2023" className="rdtDay">3</td>*/}
            {/*                <td data-value="4" data-month="8" data-year="2023" className="rdtDay">4</td>*/}
            {/*                <td data-value="5" data-month="8" data-year="2023" className="rdtDay">5</td>*/}
            {/*                <td data-value="6" data-month="8" data-year="2023" className="rdtDay">6</td>*/}
            {/*                <td data-value="7" data-month="8" data-year="2023" className="rdtDay">7</td>*/}
            {/*                <td data-value="8" data-month="8" data-year="2023" className="rdtDay">8</td>*/}
            {/*                <td data-value="9" data-month="8" data-year="2023" className="rdtDay">9</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td data-value="10" data-month="8" data-year="2023" className="rdtDay">10</td>*/}
            {/*                <td data-value="11" data-month="8" data-year="2023" className="rdtDay">11</td>*/}
            {/*                <td data-value="12" data-month="8" data-year="2023" className="rdtDay">12</td>*/}
            {/*                <td data-value="13" data-month="8" data-year="2023" className="rdtDay">13</td>*/}
            {/*                <td data-value="14" data-month="8" data-year="2023" className="rdtDay">14</td>*/}
            {/*                <td data-value="15" data-month="8" data-year="2023" className="rdtDay">15</td>*/}
            {/*                <td data-value="16" data-month="8" data-year="2023" className="rdtDay">16</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td data-value="17" data-month="8" data-year="2023" className="rdtDay">17</td>*/}
            {/*                <td data-value="18" data-month="8" data-year="2023" className="rdtDay">18</td>*/}
            {/*                <td data-value="19" data-month="8" data-year="2023" className="rdtDay">19</td>*/}
            {/*                <td data-value="20" data-month="8" data-year="2023" className="rdtDay">20</td>*/}
            {/*                <td data-value="21" data-month="8" data-year="2023" className="rdtDay">21</td>*/}
            {/*                <td data-value="22" data-month="8" data-year="2023" className="rdtDay">22</td>*/}
            {/*                <td data-value="23" data-month="8" data-year="2023" className="rdtDay">23</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td data-value="24" data-month="8" data-year="2023" className="rdtDay rdtToday">24</td>*/}
            {/*                <td data-value="25" data-month="8" data-year="2023" className="rdtDay">25</td>*/}
            {/*                <td data-value="26" data-month="8" data-year="2023" className="rdtDay">26</td>*/}
            {/*                <td data-value="27" data-month="8" data-year="2023" className="rdtDay">27</td>*/}
            {/*                <td data-value="28" data-month="8" data-year="2023" className="rdtDay">28</td>*/}
            {/*                <td data-value="29" data-month="8" data-year="2023" className="rdtDay">29</td>*/}
            {/*                <td data-value="30" data-month="8" data-year="2023" className="rdtDay">30</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td data-value="1" data-month="9" data-year="2023" className="rdtDay rdtNew">1</td>*/}
            {/*                <td data-value="2" data-month="9" data-year="2023" className="rdtDay rdtNew">2</td>*/}
            {/*                <td data-value="3" data-month="9" data-year="2023" className="rdtDay rdtNew">3</td>*/}
            {/*                <td data-value="4" data-month="9" data-year="2023" className="rdtDay rdtNew">4</td>*/}
            {/*                <td data-value="5" data-month="9" data-year="2023" className="rdtDay rdtNew">5</td>*/}
            {/*                <td data-value="6" data-month="9" data-year="2023" className="rdtDay rdtNew">6</td>*/}
            {/*                <td data-value="7" data-month="9" data-year="2023" className="rdtDay rdtNew">7</td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*            <tfoot>*/}
            {/*            <tr>*/}
            {/*                <td colSpan="7" className="rdtTimeToggle">12:00 AM</td>*/}
            {/*            </tr>*/}
            {/*            </tfoot>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
)
}
import React, {useRef, useState} from "react";
import {XInputProps} from "../input/XInput";
export default XCalendar;