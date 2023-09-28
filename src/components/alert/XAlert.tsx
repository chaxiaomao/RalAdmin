import './index.scss'
import React from "react"
import ReactDOM from "react-dom"

const show = function (props: IModalProps) {
    const node = document.createElement("div")
    document.body.appendChild(node)

    // 顺便说下，其实不必在这里写样式，没意义的
    // node.style.zIndex = "999";

    const handleClose = function () {
        /**     * 在 modal 关闭后会触发销毁     * 目前这里是 setState({visible: false}) 之后就立马触发销毁的     * 如果想 antd 那样还有消失过渡效果（transition）的话，还得加个延迟哦～     *     * p.s. 不销毁会导致性能等问题     */
        ReactDOM.unmountComponentAtNode(node) // 卸载 react 组件
        document.body.removeChild(node) // 删除 dom 节点
    }

    /**  ReactDOM.render<IModalProps, Modal>(    <Modal      {...props}      onClose={() => {        props.onClose && props.onClose()        handleClose()      }}    />,    node  ).show() // render 之后调用实例中的 show 方法  **/
    // 因为在未来的 react 中，组件的渲染又可能是异步的，所以不建议直接使用 render 返回的实例，应该用下面方式
    ReactDOM.render<IModalProps, XAlert>(
        <XAlert
            {...props} onClose={() => {
            props.onClose && props.onClose()
            handleClose()
        }}/>,
        node,
        function (this: XAlert) {
            this.show() // 在 callback 之后调用实例的方法
        }
    )
    // return ReactDOM.createPortal(
    //     <XAlert
    //         {...props} onClose={() => {
    //         props.onClose && props.onClose()
    //         handleClose()
    //     }}/>,
    //     node,
    // )
}

interface IModalProps {
    title: string
    onClose?: () => void
}

interface IModalState {
    visible: boolean
}

class XAlert extends React.Component<IModalProps, IModalState> {

    timoutID = null;

    constructor(props: IModalProps) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps: Readonly<IModalProps>, prevState: Readonly<IModalState>, snapshot?: any) {

    }

    // 暴露 show 方法
    public show = () => {
        this.setState({
            visible: true,
        })
        console.log(this.timoutID)
        this.timoutID = setInterval(() => {
            this.handleClose();
        }, 5000);
        console.log(this.timoutID)
    }

    private handleClose = () => {
        this.setState({
            visible: false,
        })
        clearTimeout(this.timoutID)
        this.timoutID = null;
        // this.props.onClose && this.props.onClose()
    }

    render() {
        let css = this.state.visible ? 'notification is-danger animate__animated animate__fadeInDown' : 'notification is-danger animate__animated animate__fadeOutUp';
        return (
            <div className="xalert-warp">
                <div className={css}>
                    <button className="delete"></button>
                    {this.props.title}
                </div>
            </div>
        )
    }
}

export default show;