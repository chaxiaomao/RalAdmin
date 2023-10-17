/// libs
import React from 'react';
import {RouterProvider} from "react-router-dom";
import {getRoutes} from "./router/routes.tsx";


function App() {
    // return (
    //   <Routes>
    //
    //       <Route path="/" element={<AdminLayout />}>
    //           <Route index element={<Home />} handle={{crumb: () => 'Messages'}} />
    //           <Route path="/admin/user" element={<ListAdmin />} />
    //           <Route path="/admin/user/edit" element={<EditAdmin />} />
    //           <Route path="*" element={<PageNotFound />} />
    //       </Route>
    //   </Routes>
    // );

    return <RouterProvider router={getRoutes()} fallbackElement={"Loading..."} />

}

export default App;
