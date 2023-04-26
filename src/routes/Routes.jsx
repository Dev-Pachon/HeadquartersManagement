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
import HeadquarterCreate from "../pages/HeadquarterCreate";
import HeadquarterEdit from "../pages/HeadquarterEdit";
import HeadquarterDetails from "../pages/HeadquarterDetails";
import Users from "../pages/Users";
import UsersCreate from "../pages/UsersCreate";
import UsersEdit from "../pages/UsersEdit";
import RequireAuth from "../components/RequireAuth";

export default function Routes() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/home",
          element: (
            <RequireAuth>
              <Home />
            </RequireAuth>
          ),
        },
        {
          path: "/headquarters",
          element: (
            <RequireAuth>
              <Headquarters />
            </RequireAuth>
          ),
        },
        {
          path: "/headquarters/add",
          element: (
            <RequireAuth>
              <HeadquarterCreate />
            </RequireAuth>
          ),
        },
        {
          path: "/headquarters/edit",
          element: (
            <RequireAuth>
              <HeadquarterEdit />
            </RequireAuth>
          ),
        },
        {
          path: "/headquarters/:headquarterId",
          element: (
            <RequireAuth>
              <HeadquarterDetails />
            </RequireAuth>
          ),
        },
        {
          path: "/users",
          element: (
            <RequireAuth>
              <Users />
            </RequireAuth>
          ),
        },
        {
          path: "/users/add",
          element: (
            <RequireAuth>
              <UsersCreate />,
            </RequireAuth>
          ),
        },
        {
          path: "/users/edit",
          element: (
            <RequireAuth>
              <UsersEdit />,
            </RequireAuth>
          ),
        },
        {
          path: "/*",
          element: <Navigate to={"/signin"} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
