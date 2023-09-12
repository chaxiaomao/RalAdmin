import React, {createContext} from 'react';
import {Route, Routes, createBrowserRouter, RouterProvider, LoaderFunctionArgs, redirect} from "react-router-dom";
import AdminLayout from "./layouts/Admin.tsx";
import Home from "./pages/Home.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import AdminUser from "./modules/admin/User.tsx";
import EditAdminUser from "./modules/admin/Edit.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import {fakeAuthProvider} from "./router/auth.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Loading from "./components/widgets/Loading.tsx";



function App() {
    return (
        <RouterProvider router={router} fallbackElement={<Loading />} />
    );
    // return (
    //   <Routes>
    //
    //       <Route path="/" element={<Layout />}>
    //           <Route index element={<Home />} />
    //           <Route path="/admin/user" element={<User />} />
    //           <Route path="/admin/user/edit" element={<Edit />} />
    //           <Route path="*" element={<PageNotFound />} />
    //       </Route>
    //   </Routes>
    // );
}


const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        loader({ request }: LoaderFunctionArgs) {
            // If the user is not logged in and tries to access `/protected`, we redirect
            // them to `/login` with a `from` parameter that allows login to redirect back
            // to this page upon successful authentication
            if (!fakeAuthProvider.islogin()) {
                let params = new URLSearchParams();
                params.set("from", new URL(request.url).pathname);
                return redirect("/user/login?" + params.toString());
            }
            return null;
        },
        Component: AdminLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/dashboard',
                Component: Dashboard,
            },
            {
                path: '/admin/user',
                Component: AdminUser,
            },
            {
                path: '/admin/user/edit',
                Component: EditAdminUser,
            }
        ],
    },
    {
        path: "/user/login",
        loader: async function loginLoader() {
            if (fakeAuthProvider.islogin()) {
                return redirect("/");
            }
            return null;
        },
        Component: LoginPage,
    },
    {
        path: "/user/logout",
        loader: async function logoutLoader() {
            await fakeAuthProvider.signout();
            return redirect("/");
        },
    },
    {
        path: "*",
        Component: PageNotFound,
    },
]);


export default App;
