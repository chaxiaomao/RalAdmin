/// libs
import React, {createContext} from 'react';
import {
    Route,
    Routes,
    createBrowserRouter,
    RouterProvider,
    LoaderFunctionArgs,
    redirect,
    Outlet
} from "react-router-dom";

/// layout
import AdminLayout from "../components/layout/Admin.tsx";

/// pages
import Home from "../pages/Home.tsx";
import PageNotFound from "../pages/PageNotFound.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import LoginPage from "../pages/LoginPageCard.tsx";

/// components
import {fakeAuthProvider} from "./auth.tsx";

/// modules
import {EditAdmin, ListAdmin} from "../modules/admin/index.tsx";
import {EditRole, ListRole, AssigmentPermission} from "../modules/role/index.tsx";
import {EditPermission, ListPermission} from "../modules/permission/index.tsx";


export const getRoutes = () => {
    return createBrowserRouter([
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
            handle: {
                crumb: '首页'
            },
            Component: AdminLayout,
            children: [
                {
                    index: true,
                    Component: Home,
                },
                {
                    path: 'dashboard',
                    Component: Dashboard,
                    handle: {
                        crumb: '监控面板'
                    }
                },
                {
                    path: 'admin',
                    element: <Outlet />,
                    handle: {
                        // crumb: (data) => <span>{data.threadName}</span>
                        crumb: '管理员'
                    },
                    children: [
                        {
                            index: true,
                            Component: ListAdmin,
                        },
                        {
                            path: 'user',
                            Component: ListAdmin,
                            handle: {
                                crumb: '用户'
                            }
                        },
                        {
                            path: 'user/add',
                            Component: EditAdmin,
                            handle: {
                                crumb: '新增'
                            },
                        },
                        {
                            path: 'user/edit?',
                            Component: EditAdmin,
                            handle: {
                                crumb: '编辑'
                            },
                        },
                        {
                            path: 'role',
                            Component: ListRole,
                            handle: {
                                crumb: '角色'
                            }
                        },
                        {
                            path: 'role/add',
                            Component: EditRole,
                            handle: {
                                crumb: '新增'
                            },
                        },
                        {
                            path: 'role/edit?',
                            Component: EditRole,
                            handle: {
                                crumb: '编辑'
                            },
                        },
                        {
                            path: 'role/assigment?',
                            Component: AssigmentPermission,
                            handle: {
                                crumb: '分配'
                            },
                        },

                        {
                            path: 'permission',
                            Component: ListPermission,
                            handle: {
                                crumb: '权限'
                            }
                        },
                        {
                            path: 'permission/add',
                            Component: EditPermission,
                            handle: {
                                crumb: '新增'
                            },
                        },
                        {
                            path: 'permission/edit?',
                            Component: EditPermission,
                            handle: {
                                crumb: '编辑'
                            },
                        },

                    ]
                },
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
}
