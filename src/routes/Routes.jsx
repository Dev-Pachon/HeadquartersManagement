import React from "react";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Headquarters from "../pages/Headquarters";
import HeadquarterCreate from "../components/HeadquarterCreate.jsx";
import HeadquarterEdit from "../components/HeadquarterEdit.jsx";
import HeadquarterDetails from "../pages/HeadquarterDetails";
import Users from "../pages/Users";
import RequireAuth from "../components/RequireAuth";
import HeadquarterService from "../services/headquarter.service.js";
import {useSelector} from "react-redux";

export default function Routes() {

    const user = useSelector((state) => state.auth.value);

    const router = createBrowserRouter([
        {
            element: <Layout/>,
            children: [
                {
                    path: "/signup",
                    element: <SignUp/>,
                },
                {
                    path: "/signin",
                    element: <SignIn/>,
                },
                {
                    path: "/home",
                    element: (
                        <RequireAuth>
                            <Home/>
                        </RequireAuth>
                    ),
                },
                {
                    path: "/headquarters",
                    element: (
                        <RequireAuth>
                            <Headquarters/>
                        </RequireAuth>
                    ),
                },
                {
                    path: "/headquarters/:headquarterId",
                    element: (
                        <RequireAuth>
                            <HeadquarterDetails/>
                        </RequireAuth>
                    ),
                    loader: ({params}) => {
                        return HeadquarterService.get(params.headquarterId, user.token);
                    },
                },
                {
                    path: "/users",
                    element: (
                        <RequireAuth>
                            <Users/>
                        </RequireAuth>
                    ),
                },
                {
                    path: "/*",
                    element: <Navigate to={"/signin"}/>,
                },
            ],
        },
    ]);

    return <RouterProvider router={router}/>;
}
