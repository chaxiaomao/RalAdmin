import React from 'react'
import {Link} from "react-router-dom";
import menuData from "../router/routes.tsx";
class SideBar extends React.Component<any, any> {

    public _menuData = menuData;

    constructor(props) {
        super(props);

        this.state = {
            menuData: this.initSelectedItem(),
            isMenuViewExpanded: true,
        };
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
        this.setState(prevState => ({
            menuData: this.initSelectedItem(),
        }));
        // console.log('URL 变化:', window.location.pathname);
    };

    /// 初始化一次当前路由对应的菜单
    /// 可从后台获取
    initSelectedItem() {

        // 假设根路径在第四个斜杠后面
        // let currentURL = window.location.href;
        // pathname = currentURL.split('/')[3];
        // if (pathname == '' || pathname == '/' || pathname == '#') {
        //     return this._menuData;
        // }
        // if (ss[2] != undefined) {
        //     pathname += '/' + ss[2];
        // }

        /// 路径名称 不带http 域名
        let currentURL = window.location.pathname;
        console.log(currentURL)

        /// React 路由组件已经过滤不符合的路由规则 这里可以不用+$强制匹配结尾 直接匹配二级路由
        // let sss = currentURL.split('/');
        // let pathname = sss[1] + '/' + sss[2];
        // let pattern = new RegExp(`^/${pathname}/*`);

        this._menuData.map(item => {

            /// 一级菜单
            // item.is_selected = item.url == currentURL || (pattern.test(item.url) && (currentURL != '' && currentURL != '/' && currentURL != '#'));
            // item.is_selected = item.url == currentURL || pattern.test(item.url);
            if (item.url == currentURL || currentURL.startsWith(item.url)) {
                if (currentURL == '/' || currentURL == '' || currentURL == '#') {
                    item.is_selected = false;
                    return;
                }
                item.is_selected = true;
            }

            /// 二级菜单
            if (item.children.length > 0) {
                item.children.map(item1 => {
                    if (currentURL == '/' || currentURL == '' || currentURL == '#') {
                        item1.is_selected = false;
                        item.is_selected = false;
                        return;
                    }
                    if (item1.url == currentURL || currentURL.startsWith(item1.url)) {
                        item1.is_selected = true;
                        item.is_selected = true;
                    } else {
                        item1.is_selected = false;
                    }
                    // if (item1.url == currentURL || pattern.test(item1.url)) {
                    //     item1.is_selected = true;
                    //     item.is_selected = true;
                    // } else {
                    //     item1.is_selected = false;
                    // }
                })
            }
        });

        return this._menuData;
    }

    /// 点击菜单事件
    _setSelectedItem(v, type) {
        /// 点击一级菜单有二级
        if (type == 1) {
            this._menuData.map(item => {
                /// 当前被选中的菜单无子菜单 保持选中
                if (item.is_selected == true && item.children.length == 0) {
                    return;
                }
                item.id == v.id ? item.is_selected = !item.is_selected : item.is_selected = false;
            });
        }

        /// 点击二级菜单
        if (type == 2) {
            this._menuData.map(item => {
                item.is_selected = false;
                if (item.children.length > 0) {
                    item.children.map(item1 => {
                        if (item1.id == v.id) {
                            item.is_selected = true;
                            item1.is_selected = true;
                        } else {
                            item1.is_selected = false;
                        }
                    })
                }
            });
        }

        /// 点击一级菜单无二级
        if (type == 3) {
            this._menuData.map(item => {

                item.id == v.id ? item.is_selected = true : item.is_selected = false;

                if (item.children.length > 0) {
                    item.children.map(item1 => {
                        item1.is_selected = false;
                    })
                }
            });
        }


        this.setState(prevState => ({
            menuData: this._menuData,
        }));
    }

    /// 设置折叠形态
    _onMenuHamburgerClick = () => {
        this.setState(prevState => ({
            isMenuViewExpanded: !prevState.isMenuViewExpanded,
        }));
    }

    /// 二级菜单构造
    _renderChildren = (item, index) => {
        const isChildSelected = item.is_selected ? 'active' : '';
        return (
            <li key={index}>
                <Link className={isChildSelected} to={item.url} title={item.name}
                      onClick={this._setSelectedItem.bind(this, item, 2)}>
                    <span className={'menu-icon ' + item.icon}></span>
                    <span>{item.name}</span>
                </Link>
            </li>
        );
    };

    render() {

        ///
        let {isMenuViewExpanded, menuData} = this.state;
        let sidebarClass = isMenuViewExpanded ? 'sidebar-menu-expanded' : 'sidebar-menu-collapsed';
        let hideClass = isMenuViewExpanded ? '' : 'collapsed-element';

        return (
            // <nav className='sidebar sidebar-menu-collapsed'>
            <nav className={'sidebar ' + sidebarClass}>
                <div className='sidebar-head'>
                    <a href='#' onClick={this._onMenuHamburgerClick} id='justify-icon'>
                        <span className='glyphicon glyphicon-align-justify'></span>
                    </a>
                </div>
                <ul>
                    {
                        menuData.map((item, index) => {

                            /// 一级菜单箭头
                            let parentArrowClass = item.is_selected ? 'icon-down' : 'icon-right';

                            /// 展开二级菜单
                            let childrenExpandClass = item.is_selected ? '' : 'collapsed-element';

                            /// 没有二级菜的单选中效果
                            let parentActiveClass = item.is_selected ? 'active' : '';

                            /// 有二级菜单
                            if (item.children.length > 0) {
                                return (
                                    <li key={index}>
                                        <Link className='expandable' to={item.url}
                                              title={item.name} onClick={this._setSelectedItem.bind(this, item, 1)}>
                                            <i className={'menu-icon ' + item.icon}></i>
                                            <span className={hideClass}>
                                                    {item.name}
                                                <i className={'menu-arrow-icon ' + parentArrowClass}></i>
                                            </span>
                                        </Link>
                                        <nav className={'menu-sub ' + childrenExpandClass + ' ' + hideClass}>
                                            <ul>
                                                {item.children.map(this._renderChildren)}
                                            </ul>
                                        </nav>
                                    </li>
                                );
                            }

                            return (
                                <li key={index}>
                                    <Link className={'expandable ' + parentActiveClass} to={item.url}
                                          title={item.name} onClick={this._setSelectedItem.bind(this, item, 3)}>
                                        <i className={'menu-icon ' + item.icon}></i>
                                        <span className={hideClass}>{item.name}</span>
                                    </Link>
                                </li>
                            )

                        })
                    }

                </ul>
            </nav>

        )
    }
}

export default SideBar