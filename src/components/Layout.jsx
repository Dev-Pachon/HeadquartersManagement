import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import { useSelector } from "react-redux";

export default function Layout() {
  const user = useSelector((state) => state.auth.value);
  if (user === null) {
    return (
      <>
        <Outlet />
        <Footer sx={{ mt: 8, mb: 4 }} />
      </>
    );
  }

  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
}
