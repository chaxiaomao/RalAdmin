import './index.scss'
import React, {useRef, useState} from "react";

export interface XSelectProps {
    label?: any,
    name?: any,
    initValue?: any,
    optionData: {} | { any: any },
    onChange?: Function,
    optionLabel?: string,
}

function XSelect({label, name, initValue, optionData, onChange, optionLabel}: XSelectProps) {

    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const [inpVal, setInpVal] = useState('');
    const [searchInp, setSearchInp] = useState('');
    const [searchData, setSearchData] = useState(optionData);
    const [isFocusInput, setIsFocusInput] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);

    // 在组件挂载时添加点击事件监听器
    React.useEffect(() => {

        Object.keys(optionData).map((k, i) => {
            if (initValue == optionData[k]) {
                setInpVal(k);
                // setSearchInp(k);
            }
        })

        document.addEventListener('click', handleFocusClick);

        // 在组件卸载时移除事件监听器
        return () => {
            document.removeEventListener('click', handleFocusClick);
        };
    }, []);

    const handleFocusClick = (event) => {
        // 检查点击的目标元素是否是容器区域内的子元素
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            // 点击了容器区域之外的地方
            setIsFocusInput(false)
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
        setInpVal('');

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

    const handleOptionClick = (key) => {
        setIsDropdown(false)
        setSearchInp('');
        setInpVal(key);
        // todo return key or value
        if (onChange) {
            onChange({[name ? name : key] : optionData[key]})
        }
    };

    return (
        // react-select__value-container--has-value

        <div className="field">
            {label ? <label>{label}</label> : ''}
            <div onClick={handleInputClick} ref={containerRef} className="react-select primary css-2b097c-container">
                {/*<span aria-live="polite" aria-atomic="false" aria-relevant="additions text" className="css-7pg0cj-a11yText"></span>*/}
                <div className={isFocusInput ? "react-select__control react-select__control--menu-is-open react-select__control--is-focused css-1pahdxg-control" : "react-select__control react-select__control--menu-is-open css-1pahdxg-control"}>
                    <div className={inpVal == '' ? "react-select__value-container react-select__placeholder css-1hwfws3" : "react-select__value-container react-select__value-container--has-value css-1hwfws3"}>
                        <div className="react-select__single-value css-1uccc91-singleValue">{inpVal == '' && searchInp == '' ? '请选择' : inpVal}</div>

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
                                className="react-select-input single-select"
                                onChange={handleChange}
                                style={{width: '100%'}}
                                // placeholder="选择状态"
                            />
                        </div>
                    </div>
                    <div className="react-select__indicators css-1wy0on6">
                        {/*<span className="react-select__indicator-separator css-1okebmr-indicatorSeparator"></span>*/}
                        <div className="react-select__indicator react-select__dropdown-indicator css-tlfecz-indicatorContainer" aria-hidden="true">
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
                                    if (key == inpVal) {

                                    }
                                    return (
                                        <div key={idx} className="react-select__option css-19jh2ze-option" tabIndex="-1" onClick={() => handleOptionClick(key)}>{key}</div>
                                    );
                                })
                        }
                    </div>
                </div>
                {/*<input name={name} type="hidden" value={value} />*/}
            </div>
        </div>
    );
}


export default XSelect;