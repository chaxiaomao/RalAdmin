import {Component} from "react";
import menuData from "../router/menu.tsx";
import {Link} from "react-router-dom";

import {AppContext} from '../components/context/AppContent.tsx';

class Sidebar extends Component<any, any> {

    static contextType = AppContext;

    expandedId = 0;
    selectedMenuLv1 = 0;
    selectedMenuLv2 = 0;

    constructor(props) {
        super(props);
        this._initMenu()
    }

    componentDidMount() {
        // 添加事件监听器，在 URL 变化时执行回调函数
        window.addEventListener('popstate', this.handleURLChange);
    }

    componentWillUnmount() {
        // 在组件卸载时移除事件监听器，以防止内存泄漏
        window.removeEventListener('popstate', this.handleURLChange);
    }

    handleURLChange = event => {
        // 在这里可以根据 event.state 或者 window.location 等信息执行你的操作
        // console.log('URL 变化:', window.location.pathname);
        this._initMenu();
        this.setState({});
    };

    _initMenu() {
        let currentURL = window.location.pathname;
        if (currentURL == '/' || currentURL == '' || currentURL == '#') {
            this.expandedId = 0;
            this.selectedMenuLv1 = 0;
            this.selectedMenuLv2 = 0;
            return;
        }
        menuData.map(item => {

            /// 一级菜单
            if (item.url == currentURL || currentURL.startsWith(item.url)) {
                this.selectedMenuLv1 = item.id;
            }

            /// 二级菜单
            if (item.children.length > 0) {
                item.children.map(item2 => {
                    if (item2.url == currentURL || currentURL.startsWith(item2.url)) {
                        this.expandedId = item.id;
                        this.selectedMenuLv1 = item.id;
                        this.selectedMenuLv2 = item2.id;
                    }
                })
            }
        });
    }

    _renderChildren = (item, index) => {
        return (
            <li key={index} className={this.selectedMenuLv2 == item.id ? 'active' : ''}>
                <Link to={item.url} onClick={this._handleClick(item.id, 2)}>
                    <span className="sidebar-mini-icon">{item.id}</span>
                    <span className="sidebar-normal">{item.name}</span>
                </Link>
            </li>
        )
    }

    _handleClick = (id, type) => (event) => {
        // 点击事件处理函数，接收两个参数
        if (type == 1) {
            this.expandedId = id == this.expandedId ? 0 : id;
        }
        if (type == 2) {
            this.selectedMenuLv1 = this.expandedId;
            this.selectedMenuLv2 = id;
        }
        if (type == 3) {
            this.selectedMenuLv1 = id;
            this.selectedMenuLv2 = 0;
            this.expandedId = 0;
        }
        this.setState({});
    };

    render() {

        return (
            <div className="sidebar" data-color="black" data-active-color="info">

                <div className="logo">
                    <a href="https://www.creative-tim.com" className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src="/logo.png" alt="react-logo"/>
                        </div>
                    </a>
                    <a href="/" className="simple-text logo-normal">Creative Tim</a>
                </div>

                <div className="user">
                    <div className="photo">
                        <img
                            src="https://demos.creative-tim.com/paper-dashboard-pro-react/static/media/ayo-ogunseinde-2.f4af8f2c.jpg"
                            alt="Avatar"/>
                    </div>
                    <div className="info">
                        <a href="#pablo" data-toggle="collapse" aria-expanded="false">
                            <span>Chet Faker<b className="caret"></b></span>
                        </a>
                        <div className="collapse">
                            <ul className="nav-tim">
                                <li><a aria-current="page" className="" href="#/admin/user-profile"><span
                                    className="sidebar-mini-icon">MP</span><span
                                    className="sidebar-normal">My Profile</span></a>
                                </li>
                                <li><a aria-current="page" className="" href="#/admin/user-profile"><span
                                    className="sidebar-mini-icon">EP</span><span
                                    className="sidebar-normal">Edit Profile</span></a>
                                </li>
                                <li><a aria-current="page" className="" href="#/admin/user-profile"><span
                                    className="sidebar-mini-icon">S</span><span
                                    className="sidebar-normal">Settings</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="menu-ps" className={!this.context.minibar ? 'sidebar-wrapper ps' : 'sidebar-wrapper'}>
                {/*<div id="menu-ps" className="sidebar-wrapper">*/}


                    <ul className="nav-tim">
                        {

                            menuData.map((item, index) => {
                                let child = item.children.length;

                                if (child > 0) {

                                    // let isExpand = item.id == this.state.menu.expandId;
                                    let isExpand = this.expandedId == item.id;

                                    return (
                                        <li key={index} className={this.selectedMenuLv1 == item.id ? 'active' : ''}>
                                            <Link
                                                to={item.url} data-toggle="collapse"
                                                aria-expanded={isExpand ? 'true' : 'false'}
                                                onClick={this._handleClick(item.id, 1)}>
                                                <i className={item.icon}></i>
                                                <p>{item.name}<b className="caret"></b></p>
                                            </Link>
                                            <div
                                                style={{height: isExpand ? child * 30 + 27 + 'px' : '0px'}}
                                                className={isExpand ? 'collapse show' : 'collapsing'}>
                                                <ul className="nav-tim">
                                                    {item.children.map(this._renderChildren)}
                                                </ul>
                                            </div>
                                        </li>
                                    )
                                }

                                return (
                                    <li key={index}
                                        className={this.selectedMenuLv1 == item.id ? 'active' : ''}>
                                        <Link to={item.url} onClick={this._handleClick(item.id, 3)}>
                                            <i className={item.icon}></i>
                                            <p>{item.name}</p>
                                        </Link>
                                    </li>
                                )
                            })

                        }

                    </ul>
                </div>
            </div>

        );
    }

}

export default Sidebar;