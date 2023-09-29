import React from "react";
import './index.scss'
import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client";

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
        <XNotification
            {...props}
            onClose={() => {
                props.onClose && props.onClose()
                handleClose()
            }}
        />
    );

    // return ReactDOM.render<IModalProps, XNotification>(
    //     <XNotification
    //         {...props}
    //         onClose={() => {
    //             props.onClose && props.onClose()
    //             handleClose()
    //         }}/>,
    //     node
    // ).show()
}

interface IModalProps {
    visible?: boolean
    title: string
    onClose?: () => void
}

interface IModalState {
    visible: boolean
}

class XNotification extends React.Component<IModalProps, IModalState> {
    /**   * 将 show 方法放到 class component 的静态方法中   */
    static show = show

    // private el: HTMLDivElement
    private readonly container = document.body

    timoutID = null;

    constructor(props: IModalProps) {
        super(props)
        // this.el = document.createElement("div")
        this.state = {
            visible: true,
        }
    }

    componentDidMount() {
        // this.container.appendChild(this.el)
        this.timoutID = setInterval(() => {
            this.handleHide();

            this.timeoutClose = setInterval(() => {
                this.props.onClose && this.props.onClose()
                clearTimeout(this.timeoutClose)
                this.timeoutClose = null;
            }, 600)

            console.log(this.timeoutClose)

        }, 5000);
        // this.props.onClose && this.props.onClose()
    }

    componentWillUnmount() {
        // this.container.removeChild(this.el)
        clearTimeout(this.timoutID)
        this.timoutID = null;
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

    private handleHide = async () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        let css = this.state.visible ? 'notification is-danger animate__animated animate__fadeInDown' : 'notification is-danger animate__animated animate__fadeOutUp';
        return (
            <div className="xalert-warp">
                <div className={css}>
                    <button className="delete" onClick={this.handleHide}></button>
                    {this.props.title}
                </div>
            </div>
        )
    }
}

export default XNotification;