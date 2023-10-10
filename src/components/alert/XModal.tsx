import React from "react";
import './index.scss'
import {createRoot} from "react-dom/client";
import XButton from "../button/XButton.tsx";

const show = function (props: Omit<IModalProps, "visible">) {
    const node = document.createElement("div")
    document.body.appendChild(node)

    const handleClose = function () {
        // ReactDOM.unmountComponentAtNode(node)
        document.body.removeChild(node)
        root.unmount();
    }

    /// xun
    const root = createRoot(node);

    return root.render(
        <XModal
            {...props}
            onConfirm={() => {
                props.onConfirm && props.onConfirm()
                handleClose()
            }}
            onClose={() => {
                props.onClose && props.onClose()
                handleClose()
            }}
        />
    );
}

interface IModalProps {
    visible?: boolean
    title?: string
    content?: string
    onClose?: () => void
    onConfirm?: () => void
}

interface IModalState {
    visible: boolean
}

class XModal extends React.Component<IModalProps, IModalState> {
    /**   * 将 show 方法放到 class component 的静态方法中   */
    static show = show

    // private el: HTMLDivElement
    private readonly container = document.body

    constructor(props: IModalProps) {
        super(props)
        // this.el = document.createElement("div")
        this.state = {
            visible: true,
        }
    }

    componentDidMount() {
        // this.container.appendChild(this.el)

        // this.props.onClose && this.props.onClose()
    }

    componentWillUnmount() {
        // this.container.removeChild(this.el)
    }

    get visible() {
        /**     * props 优先级比 state 高     * 保证如果外部在控制弹窗状态，则根据外部的来     */
        if (typeof this.props.visible !== "undefined") {
            return this.props.visible
        }
        return this.state.visible
    }


    public show = () => {
        this.setState({
            visible: true,
        })
        /**     * return 当前实例，提供链式调用的操作方式     * 譬如： Modal.show().hide()     */
        return this
    }

    public hide = () => {
        return this
    }

    public handleConfirm = () => {

        this.setState({
            visible: false,
        })

        this.timeoutClose = setInterval(() => {
            this.props.onConfirm && this.props.onConfirm()
            clearTimeout(this.timeoutClose)
            this.timeoutClose = null;
        }, 300)
    }

    private handleHide = () => {
        this.setState({
            visible: false,
        })

        this.timeoutClose = setInterval(() => {
            this.props.onClose && this.props.onClose()
            clearTimeout(this.timeoutClose)
            this.timeoutClose = null;
        }, 300)

    }

    render() {
        return (
            <div className={this.state.visible ? 'modal is-active fade show' : 'modal is-active fade'}>
                <div onClick={this.handleHide} className={this.state.visible ? 'modal-background fade show' : 'modal-background fade'}></div>
                <div className={this.state.visible ? "modal-card animate__animated animate__fadeInDown" : "modal-card animate__animated animate__fadeOutUp"}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.props.title ? this.props.title : '提示'}</p>
                        <button className="delete" onClick={this.handleHide}></button>
                    </header>
                    <section className="modal-card-body">
                        {this.props.content ? this.props.content : '确认执行改操作?'}
                    </section>
                    <footer className="modal-card-foot">
                        <XButton
                            text="是"
                            color="success"
                            onClick={this.handleConfirm}
                            />
                        <XButton
                            text="否"
                            color="danger"
                            onClick={this.handleHide}
                            />
                        {/*<a className="button is-success" onClick={this.handleConfirm}>Save changes</a>*/}
                        {/*<a className="button" onClick={this.handleHide}>Cancel</a>*/}
                    </footer>
                </div>
            </div>
        )
    }
}

export default XModal;