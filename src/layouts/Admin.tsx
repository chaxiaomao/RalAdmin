import Header from './Header.tsx';
import {Outlet, useNavigation} from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import {useState} from "react";
import {AppContext} from '../components/context/AppContent.tsx';
import Loading from "../components/widgets/Loading.tsx";

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
                            <div className="content-view">
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