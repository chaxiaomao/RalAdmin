import Header from '../layouts/Header.tsx';
import SideBar from './SideBar.tsx';
import { Outlet } from "react-router-dom";

function Layout() {
  return (

      /// style 1
      // <div className="layout">
      //     <Header />
      //
      //     <div className="columns is-gapless is-multiline">
      //
      //         <div className="column is-narrow">
      //             <SideBar />
      //         </div>
      //         <div className="column" style={{background:"#dbdbdb"}}>
      //             <Component {...props} />
      //         </div>
      //     </div>
      // </div>

      /// style 2
      <div className="layout">


          <div className="columns is-gapless">

              <div className="column is-narrow">
                  <SideBar />

              </div>
              <div className="column">
                  <Header />
                  <div className="content-view">
                      <Outlet />
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Layout;