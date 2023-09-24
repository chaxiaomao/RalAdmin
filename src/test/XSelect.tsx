import './index.scss'
import React, {useRef, useState} from "react";

export interface XSelectProps {
    name?: any,
    value?: any,
    optionData: {}|{any:any},
    onChange?: Function,
    optionLabel?: string,
}

function XSelect({name, value, optionData, onChange, optionLabel}: XSelectProps) {

    const inputRef = useRef(null);

    const [inpVal, setInpVal] = useState('');

    const [isFocusInput, setIsFocusInput] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);

    // const handleFocusClick = () => {
    //     // setIsDropdown(!isDropdown)
    //     if (inputRef.current) {
    //         inputRef.current.focus();
    //         setIsFocusInput(true)
    //         setIsDropdown(!isDropdown)
    //     }
    // };

    const handleInputClick = () => {
        setIsDropdown(!isDropdown)
        setIsFocusInput(true)
    };

    // 处理输入框失去焦点事件的函数
    const handleBlur = () => {
        setIsFocusInput(false)
        setIsDropdown(false)
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInpVal(value);
        if (onChange) {
            onChange(value)
        }
    };

    const handleOptionClick = (text) => {
        console.log(text)
        setInpVal(text);
        setIsDropdown(false)
        setIsFocusInput(true)
        // if (inputRef.current) {
        //     inputRef.current.focus();
        // }
    };

    return (
        <div className="react-select primary css-2b097c-container">
            {/*<span aria-live="polite" aria-atomic="false" aria-relevant="additions text" className="css-7pg0cj-a11yText"></span>*/}
            <div
                // onClick={handleInputClick}
                className={isFocusInput ? "react-select__control react-select__control--menu-is-open react-select__control--is-focused css-1pahdxg-control" : "react-select__control react-select__control--menu-is-open css-1pahdxg-control"}>
                <div className="react-select__value-container css-1hwfws3 react-select__value-container--has-value">
                    <div className="css-1g6gooi">
                        <input
                            // ref={inputRef}
                            onBlur={handleBlur}
                            onClick={handleInputClick}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            tabIndex="0"
                            type="text"
                            aria-autocomplete="list"
                            name="status"
                            value={inpVal}
                            className="react-select-input"
                            onChange={handleChange}
                            placeholder="选择状态"

                        />
                    </div>
                </div>
                <div className="react-select__indicators css-1wy0on6">
                    {/*<span className="react-select__indicator-separator css-1okebmr-indicatorSeparator"></span>*/}
                    <div
                        className="react-select__indicator react-select__dropdown-indicator css-tlfecz-indicatorContainer"
                        aria-hidden="true">
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                             className="css-8mmkcg">
                            <path
                                d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className={!isDropdown ? "react-select__menu css-26l3qy-menu" : "react-select__menu"}>
                <div className="react-select__menu-list react-select__menu-list--is-multi css-11unzgr">
                    {optionLabel ?
                        <div className="react-select__option react-select__option--is-disabled  css-19jh2ze-option"
                             tabIndex="-1">{optionLabel}</div> : ''}
                    {
                        Object.keys(optionData).map((text, idx) => {
                            // const value = optionData[key];
                            // react-select__option--is-focused
                            return (
                                <div key={idx} className="react-select__option css-19jh2ze-option" tabIndex="-1" onClick={() => handleOptionClick(text)}>{text}</div>
                            );
                        })
                    }
                </div>
            </div>
            {/*<input name={name} type="hidden" value={value} />*/}
        </div>
    );
}

export default XSelect;