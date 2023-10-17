import './index.scss'
import React, {useRef, useState} from "react";
import XSelectProps from './XSelect.tsx';

function XSelect({label, name, initValue, optionData, onChange, optionLabel}: XSelectProps) {

    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const [inpVal, setInpVal] = useState({});
    const [searchInp, setSearchInp] = useState('');
    const [searchData, setSearchData] = useState(optionData);
    const [isFocusInput, setIsFocusInput] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);

    // 在组件挂载时添加点击事件监听器
    React.useEffect(() => {

        if (initValue) {
            setInpVal(initValue);
        }

        document.addEventListener('click', handleFocusClick);

        // 在组件卸载时移除事件监听器
        return () => {
            document.removeEventListener('click', handleFocusClick);
        };
    }, [initValue]);

    const handleFocusClick = (event) => {
        // 检查点击的目标元素是否是容器区域内的子元素
        let act = event.target.getAttribute('data-act');
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            // 点击了容器区域之外的地方
            if (act != 'del') {
                setIsFocusInput(false)
            }
            setIsDropdown(false)
            setSearchData(optionData);
            setSearchInp('');
        }
    };

    const handleInputClick = () => {
        setIsDropdown(!isDropdown)
        setIsFocusInput(true)
        setSearchData(optionData);
        setSearchInp('')
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // 处理输入框失去焦点事件的函数
    const handleBlur = () => {
        setIsFocusInput(false)
        setIsDropdown(false)
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSearchInp(value);

        if (value != '') {

            // let filteredData = Object.keys(optionData).reduce((result, key) => {
            //     if (optionData[key].includes(value)) {
            //         result[key] = optionData[key];
            //     }
            //     return result;
            // }, {});

            let filteredData = Object.keys(optionData)
                .filter((key) => key.includes(value))
                .reduce((filteredObj, key) => {
                    filteredObj[key] = optionData[key];
                    return filteredObj;
                }, {});
            setSearchData(filteredData);
        } else {
            setSearchData(optionData);
        }

        setIsDropdown(true);
    };

    const handleRemove = (key) => {
        let newObj= { ...inpVal };

        if (key === '*') {
            newObj = {};
        } else {
            if (newObj.hasOwnProperty(key)) {
                delete newObj[key];
            }
        }
        setInpVal(newObj);

        if (onChange) {
            onChange(newObj)
        }
    }

    const handleOptionClick = (key) => {
        // todo return key or value
        if (onChange) {
            inpVal[key] = optionData[key]
            onChange(inpVal)
        }
        setIsDropdown(false)
        setSearchInp('');
        // setInpVal(...inpVal, {[key]: optionData[key]});
        setInpVal((prevData) => ({
            ...prevData,
            [key]: optionData[key],
        }));
    };

    return (
        <div className="field">
            {label ? <label>{label}</label> : ''}
            <div onClick={handleInputClick} ref={containerRef} className="react-select primary css-2b097c-container">
                {/*<span aria-live="polite" aria-atomic="false" aria-relevant="additions text" className="css-7pg0cj-a11yText"></span>*/}
                <div className={isFocusInput ? "react-select__control react-select__control--menu-is-open react-select__control--is-focused css-1pahdxg-control" : "react-select__control react-select__control--menu-is-open css-1pahdxg-control"}>
                    <div className={Object.keys(inpVal).length == 0 ? "react-select__value-container react-select__placeholder css-1hwfws3" : "react-select__value-container react-select__value-container--is-multi react-select__value-container--has-value css-1hwfws3"}>
                        {/*<div className="react-select__single-value css-1uccc91-singleValue">{Object.keys(inpVal).length == 0 && searchInp == '' ? '请选择' : ''}</div>*/}

                        {
                            Object.keys(inpVal).length == 0 && searchInp == '' ? <div className="react-select__single-value css-1uccc91-singleValue">请选择</div> :
                                Object.keys(inpVal).map((key, idx) => {
                                    // const value = optionData[key];
                                    // react-select__option--is-focused
                                    return (
                                        <div key={idx} className="css-1rhbuit-multiValue react-select__multi-value">
                                            <div className="css-12jo7m5 react-select__multi-value__label">{key}</div>
                                            <div data-act="del" className="css-xb97g8 react-select__multi-value__remove" onClick={() => handleRemove(key)}>
                                                <svg data-act="del" height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                                                     className="css-8mmkcg">
                                                    <path
                                                        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    );
                                })
                        }

                        <div className="css-1g6gooi">

                            <input
                                ref={inputRef}
                                // onBlur={handleBlur}
                                // onClick={handleInputClick}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                                tabIndex="0"
                                type="text"
                                aria-autocomplete="list"
                                name="status"
                                value={searchInp}
                                className="react-select-input"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="react-select__indicators css-1wy0on6">
                        {/*<span className="react-select__indicator-separator css-1okebmr-indicatorSeparator"></span>*/}
                        {
                            Object.keys(inpVal).length == 0 ? '' :
                                <div data-act="del" onClick={() => handleRemove('*')} className="react-select__indicator react-select__clear-indicator css-tlfecz-indicatorContainer" aria-hidden="true">
                                    <svg data-act="del" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-8mmkcg">
                                        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                                    </svg>
                                </div>
                        }
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

                <div className={isDropdown ? "react-select__menu" : "react-select__menu css-26l3qy-menu"}>
                    <div className="react-select__menu-list react-select__menu-list--is-multi css-11unzgr">
                        {optionLabel ?
                            <div className="react-select__option react-select__option--is-disabled  css-19jh2ze-option" tabIndex="-1">{optionLabel}</div> : ''}
                        {
                            searchInp != '' && Object.keys(searchData).length == 0 ?
                                <div className="react-select__menu-notice react-select__menu-notice--no-options css-1gl4k7y">无选项</div>
                                :
                                Object.keys(searchData).map((key, idx) => {
                                    // const value = optionData[key];
                                    // react-select__option--is-focused
                                    return (
                                        <div key={idx} className="react-select__option css-19jh2ze-option" tabIndex="-1" onClick={() => handleOptionClick(key)}>{key}</div>
                                    );
                                })
                        }
                    </div>
                </div>

                <input name="singleSelect" type="hidden" value=""/>


            </div>

        </div>


    );
}


export default XSelect;