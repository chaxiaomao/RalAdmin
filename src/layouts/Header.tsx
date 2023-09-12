import React, {useContext} from 'react'


import {AppContext} from '../components/context/AppContent.tsx';
import {fakeAuthProvider} from "../router/auth.tsx";


const Header = () => {

    const { minibar, setMinibar, openMenu, setOpenMenu } = useContext(AppContext);

    const _setMinibar = () => {

        // let adminLayout = document.getElementById('admin-layout');
        // let menuPs = document.getElementById('menu-ps');
        // let menuClass = 'sidebar-mini';
        // let ps = 'ps';

        let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (windowWidth < 991) {
            // menuClass = 'nav-open';
            setOpenMenu(!openMenu);
        } else {
            setMinibar(!minibar);
            setOpenMenu(false);
            // if (menuPs.classList.contains(ps)) {
            //     menuPs.classList.remove(ps);
            // } else {
            //     menuPs.classList.add(ps);
            // }
        }

        // if (adminLayout.classList.contains(menuClass)) {
        //     adminLayout.classList.remove(menuClass);
        // } else {
        //     adminLayout.classList.add(menuClass);
        // }

    }

    return (
        <nav className="navbar" style={{border:'1px solid #dbdbdb'}}>
            <div className="navbar-brand">
                <a className="navbar-item" href='#' onClick={_setMinibar} id='justify-icon'>
                    <span className='glyphicon glyphicon-align-justify'></span>
                </a>
                {/*<a className="navbar-item" href="#" onClick={_setMinibar}>*/}
                {/*    <img src="https://versions.bulma.io/0.4.4/images/bulma-logo.png"*/}
                {/*         alt="Bulma v0.4.4: a modern CSS framework based on Flexbox" width="112" height="28"/>*/}
                {/*</a>*/}

                <a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
      <span className="icon" style={{color: '#333'}}>
        <i className="fa fa-github"></i>
      </span>
                </a>

                <a className="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
      <span className="icon" style={{color: '#55acee'}}>
        <i className="fa fa-twitter"></i>
      </span>
                </a>

                <div className="navbar-burger burger" data-target="navMenuExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navMenuExample" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item " href="https://versions.bulma.io/0.4.4/">
                        Home
                    </a>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link  is-active" href="/versions/0.4.4/documentation/overview/start/">
                            Docs
                        </a>
                        <div className="navbar-dropdown ">
                            <a className="navbar-item " href="/versions/0.4.4/documentation/overview/start/">
                                Overview
                            </a>
                            <a className="navbar-item "
                               href="https://versions.bulma.io/0.4.4/documentation/modifiers/syntax/">
                                Modifiers
                            </a>
                            <a className="navbar-item "
                               href="https://versions.bulma.io/0.4.4/documentation/grid/columns/">
                                Grid
                            </a>
                            <a className="navbar-item "
                               href="https://versions.bulma.io/0.4.4/documentation/form/general/">
                                Form
                            </a>
                            <a className="navbar-item "
                               href="https://versions.bulma.io/0.4.4/documentation/elements/box/">
                                Elements
                            </a>

                            <a className="navbar-item is-active"
                               href="https://versions.bulma.io/0.4.4/documentation/components/breadcrumb/">
                                Components
                            </a>

                            <a className="navbar-item "
                               href="https://versions.bulma.io/0.4.4/documentation/layout/container/">
                                Layout
                            </a>
                            <hr className="navbar-divider"/>
                            <div className="navbar-item">
                                <div>
                                    <p className="has-text-info is-size-6-desktop"><strong>0.4.4</strong></p>

                                    <small>
                                        <a className="view-all-versions" href="/versions">View all versions</a>
                                    </small>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link " href="https://versions.bulma.io/0.4.4/blog/">
                            Blog
                        </a>
                        <div id="blogDropdown" className="navbar-dropdown " data-style="width: 18rem;">

                            <a className="navbar-item" href="/2017/03/10/new-field-element/">
                                <div className="navbar-content">
                                    <p>
                                        <small className="has-text-info">10 Mar 2017</small>
                                    </p>
                                    <p>New field element (for better controls)</p>
                                </div>
                            </a>

                            <a className="navbar-item" href="/2016/04/11/metro-ui-css-grid-with-bulma-tiles/">
                                <div className="navbar-content">
                                    <p>
                                        <small className="has-text-info">11 Apr 2016</small>
                                    </p>
                                    <p>Metro UI CSS grid with Bulma tiles</p>
                                </div>
                            </a>

                            <a className="navbar-item"
                               href="/2016/02/09/blog-launched-new-responsive-columns-new-helpers/">
                                <div className="navbar-content">
                                    <p>
                                        <small className="has-text-info">09 Feb 2016</small>
                                    </p>
                                    <p>Blog launched, new responsive columns, new helpers</p>
                                </div>
                            </a>

                            <a className="navbar-item" href="https://versions.bulma.io/0.4.4/blog/">
                                More posts
                            </a>
                            <hr className="navbar-divider"/>
                            <div className="navbar-item">
                                <div className="navbar-content">
                                    <div className="level is-mobile">
                                        <div className="level-left">
                                            <div className="level-item">
                                                <strong>Stay up to date!</strong>
                                            </div>
                                        </div>
                                        <div className="level-right">
                                            <div className="level-item">
                                                <a className="button is-rss is-small"
                                                   href="https://versions.bulma.io/0.4.4/atom.xml">
                      <span className="icon is-small">
                        <i className="fa fa-rss"></i>
                      </span>
                                                    <span>Subscribe</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link">
                            More
                        </div>
                        <div id="moreDropdown" className="navbar-dropdown ">
                            <a className="navbar-item " href="https://versions.bulma.io/0.4.4/extensions/">
                                <div className="level is-mobile">
                                    <div className="level-left">
                                        <div className="level-item">
                                            <p>
                                                <strong>Extensions</strong>
                                                <br/>
                                                <small>Side projects to enhance Bulma</small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="level-right">
                                        <div className="level-item">
                  <span className="icon has-text-info">
                    <i className="fa fa-plug"></i>
                  </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link  is-active" href="/versions/0.4.4/documentation/overview/start/">
                            管理员
                        </a>
                        <div className="navbar-dropdown ">
                            <a className="navbar-item " href="/versions/0.4.4/documentation/overview/start/">
                                个人简介
                            </a>
                            <hr className="navbar-divider"/>
                            <div className="navbar-item">
                                <div>
                                    <p className="has-text-info is-size-6-desktop"><strong>{fakeAuthProvider.user.username}</strong></p>

                                    <small>
                                        <a className="view-all-versions" href="/user/logout">登出</a>
                                    </small>

                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="navbar-item" href="https://github.com/jgthms/bulma" target="_blank">
                        Github
                    </a>
                    <a className="navbar-item" href="https://twitter.com/jgthms" target="_blank">
                        Twitter
                    </a>
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <a id="twitter"
                                   className="button"
                                   data-social-network="Twitter"
                                   data-social-action="tweet"
                                   data-social-target="https://versions.bulma.io/0.4.4"
                                   target="_blank"
                                   href="https://twitter.com/intent/tweet?text=Bulma v0.4.4: a modern CSS framework based on Flexbox&url=https://versions.bulma.io/0.4.4&via=jgthms">
              <span className="icon">
                <i className="fa fa-twitter"></i>
              </span>
                                    <span>Tweet</span>
                                </a>
                            </p>
                            <p className="control">
                                <a className="button is-primary"
                                   href="https://github.com/jgthms/bulma/archive/0.4.4.zip">
              <span className="icon">
                <i className="fa fa-download"></i>
              </span>
                                    <span>Download</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header