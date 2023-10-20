import React from "react";
// import './index.scss'
import {createRoot} from "react-dom/client";
import XButton from "../../components/button/XButton.tsx";
import XMultipleSelect from "../../components/select/XMultipleSelect.tsx";
import XCard from "../../components/card/XCard.tsx";
import {httpGet, httpPost} from "../../request/http.tsx";
import {httpCode} from "../../config/common.tsx";

const show = function (props: Omit<IModalProps, "visible">) {
    const node = document.createElement("div")
    document.getElementById('main-panel').appendChild(node)

    const handleClose = function () {
        // ReactDOM.unmountComponentAtNode(node)
        document.getElementById('main-panel').removeChild(node)
        root.unmount();
    }

    /// xun
    const root = createRoot(node);

    return root.render(
        <Assigment
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
    data?: any
    onClose?: () => void
    onConfirm?: () => void
}


class Assigment extends React.Component<IModalProps, any> {
    /**   * 将 show 方法放到 class component 的静态方法中   */
    static show = show

    // private el: HTMLDivElement
    private readonly container = document.body

    constructor(props: IModalProps) {
        super(props)
        // this.el = document.createElement("div")
        this.state = {
            visible: true,
            isSubmitting: false,
            assignmentRoles: {},
            assignmentPermissions: {},
            optionsRoles: {},
            optionsPermissions: {},
            postItemRoles: {},
            postItemPermissions: {}
        }
    }

    componentDidMount() {

        let id = this.props.data;
        if (id) {
            httpGet({
                url: '/admin/assignment/user-options',
                queryParams: {id: id}
            }).then(res => {
                if (res.meta.code == httpCode.SUCCESS) {
                    this.setState({
                        optionsPermissions: res.data.permissions,
                        optionsRoles: res.data.roles,
                        assignmentRoles: res.data.assignmentRoles,
                        assignmentPermissions: res.data.assignmentPermissions,
                        postItemRoles: res.data.assignmentRoles,
                        postItemPermissions: res.data.assignmentPermissions,
                    })
                }
            }).catch(e => {})
        }

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

    private handlePermissionChange = (data) => {
        let fd = [];
        Object.keys(data).map((key, idx) => {
            fd.push(data[key]);
        })
        // setFormData([...formData, data.value]);
        this.setState({
            postItemPermissions: fd
        });
    };

    private handleRoleChange = (data) => {
        let fd = [];
        Object.keys(data).map((key, idx) => {
            fd.push(data[key]);
        })
        // setFormData([...formData, data.value]);
        this.setState({
            postItemRoles: fd
        });
    };

    private handleSubmit = () => {
        this.setState({
            isSubmitting: true
        });

        let items = [];
        Object.keys(this.state.postItemRoles).map((key, idx) => {
            items.push(this.state.postItemRoles[key]);
        })
        Object.keys(this.state.postItemPermissions).map((key, idx) => {
            items.push(this.state.postItemPermissions[key]);
        })
        // let items = [...this.state.postItemRoles, ...this.state.postItemPermissions];
        // let items = this.state.postItemRoles.concat(this.state.postItemPermissions);

        httpPost({
            url: '/admin/assignment/assign?id=' + this.props.data,
            alert: true,
            data: JSON.stringify({
                items: items,
                // roles: this.state.postItemRoles,
                // permission: this.state.postItemPermissions,
            })
        }).then(res => {
            if (res.meta.code == httpCode.SUCCESS) {
            }
            this.setState({
                isSubmitting: false
            });

        }).catch(err => {
            this.setState({
                isSubmitting: false
            });
        })
    }

    render() {
        return (

            <div className={this.state.visible ? 'modal is-active fade show' : 'modal is-active fade'}>
                <div className={this.state.visible ? 'modal-background fade show' : 'modal-background fade'}></div>
                <div style={{marginTop: '120px'}} className="modal-content column is-6">
                    <div className={this.state.visible ? "animate__animated animate__fadeIn" : "animate__animated animate__fadeOut"}>
                        <XCard xStyle={{ height: '100%'}}>

                            <div className="field">
                                <p>分配用户</p>
                            </div>

                            <div className="field">
                                <label>角色</label>
                                <XMultipleSelect
                                    initValue={this.state.assignmentRoles}
                                    // value={formData.status}
                                    onChange={this.handleRoleChange}
                                    optionData={this.state.optionsRoles}
                                />
                            </div>

                            {/*<div className="field">*/}
                            {/*    <label>权限</label>*/}
                            {/*    <XMultipleSelect*/}
                            {/*        initValue={this.state.assignmentPermissions}*/}
                            {/*        // value={formData.status}*/}
                            {/*        onChange={this.handlePermissionChange}*/}
                            {/*        optionData={this.state.optionsPermissions}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <div style={{paddingTop: '180px'}} className="column">
                                <div style={{position: 'absolute', right: '20px', bottom: '20px'}}>
                                    <button onClick={this.handleSubmit}
                                            className={this.state.isSubmitting ? 'button is-primary is-loading' : 'button is-primary'}>
                                        <span className="icon"><i className="fa fa-save"></i></span>
                                        <span>保存</span>
                                    </button>
                                    &nbsp;&nbsp;
                                    <button onClick={this.handleHide} className='button is-warning'>
                                        <span className="icon"><i className="fa fa-close"></i></span>
                                        <span>取消</span>
                                    </button>
                                </div>
                            </div>

                        </XCard>

                    </div>
                </div>

            </div>
        )
    }
}

export default Assigment;