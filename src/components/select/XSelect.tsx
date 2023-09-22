import './index.scss'
import {useRef} from "react";

function XSelect() {

    const inputRef = useRef(null);

    const handleFocusClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="react-select primary css-2b097c-container">
            {/*<span aria-live="polite" aria-atomic="false" aria-relevant="additions text" className="css-7pg0cj-a11yText"></span>*/}
            <div
                onClick={handleFocusClick}
                className="react-select__control react-select__control--is-focused react-select__control--menu-is-open css-1pahdxg-control">
                <div className="react-select__value-container css-1hwfws3">
                    <div className="react-select__placeholder css-1wa3eu0-placeholder">Single Select</div>
                    <div className="css-1g6gooi">
                        <div className="react-select__input" style={{display: "inline-block"}}>
                            <input
                                ref={inputRef}
                                autoCapitalize="none"
                                   autoComplete="off"
                                   autoCorrect="off"
                                   id="react-select-4-input"
                                   spellCheck="false"
                                   tabIndex="0"
                                   type="text"
                                   aria-autocomplete="list"
                                   value="xxx"
                                   className="react-select-input"
                            />
                            <div className="react-select-div"></div>
                        </div>
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
            <div className="react-select__menu css-26l3qy-menu">

                <div className="react-select__menu-list react-select__menu-list--is-multi css-11unzgr">
                    <div
                        className="react-select__option react-select__option--is-disabled react-select__option--is-focused css-19jh2ze-option"
                        id="react-select-5-option-0" tabIndex="-1"> Multiple Options
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-1"
                         tabIndex="-1">Paris
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-2"
                         tabIndex="-1">Bucharest
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-3"
                         tabIndex="-1">Rome
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-4"
                         tabIndex="-1">New York
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-5"
                         tabIndex="-1">Miami
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-6"
                         tabIndex="-1">Piatra Neamt
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-7"
                         tabIndex="-1">Paris
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-8"
                         tabIndex="-1">Bucharest
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-9"
                         tabIndex="-1">Rome
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-10"
                         tabIndex="-1">New York
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-11"
                         tabIndex="-1">Miami
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-12"
                         tabIndex="-1">Piatra Neamt
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-13"
                         tabIndex="-1">Paris
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-14"
                         tabIndex="-1">Bucharest
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-15"
                         tabIndex="-1">Rome
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-16"
                         tabIndex="-1">New York
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-17"
                         tabIndex="-1">Miami
                    </div>
                    <div className="react-select__option css-yt9ioa-option" id="react-select-5-option-18"
                         tabIndex="-1">Piatra Neamt
                    </div>
                </div>

                {/*<div className="react-select__menu-list css-11unzgr">*/}
                {/*    <div className="react-select__option react-select__option--is-disabled css-165luzk-option"*/}
                {/*         id="react-select-4-option-0" tabIndex="-1">Single Option*/}
                {/*    </div>*/}
                {/*    <div className="react-select__option react-select__option--is-focused css-1n7v3ny-option"*/}
                {/*         id="react-select-4-option-1" tabIndex="-1">Foobar*/}
                {/*    </div>*/}
                {/*    <div className="react-select__option css-yt9ioa-option" id="react-select-4-option-2"*/}
                {/*         tabIndex="-1">Is great*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <input name="singleSelect" type="hidden" value=""/>


        </div>


    );
}

export default XSelect;