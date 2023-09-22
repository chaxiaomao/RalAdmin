import Header from '../header/Header.tsx';
import {Outlet, useNavigation} from "react-router-dom";
import Sidebar from "../sidebar/Sidebar.tsx";
import {useState} from "react";
import {AppContext} from '../context/AppContent.tsx';
import Loading from "../loading/Loading.tsx";
import './index.scss'

function Layout() {

    const [minibar, setMinibar] = useState(true);
    const [openMenu, setOpenMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let menuClass = !minibar ? 'sidebar-mini' : '';
    if (openMenu) {
        menuClass = 'nav-open';
    }

    // let navigation = useNavigation();

    return (
        // <div id="admin-layout" className="">
        //     <div className="columns is-gapless wrapper">
        //         <div className="column is-narrow">
        //             <Sidebar />
        //         </div>
        //         <div className="column">
        //             <div className="main-panel">
        //                 <Header />
        //                 <div className="content-view">
        //                     <Outlet />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <AppContext.Provider value={{
            minibar, setMinibar,
            openMenu, setOpenMenu,
            isLoading, setIsLoading,
        }}>
            <div id="admin-layout" className={menuClass}>
                <div className="columns is-gapless wrapper">
                    <div className="column is-narrow">
                        <Sidebar />
                    </div>
                    <div className="column">
                        <div className="main-panel">
                            {isLoading ? <Loading /> : ''}

                            <Header />
                            <div className="card-view">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AppContext.Provider>


    );
}

export default Layout;