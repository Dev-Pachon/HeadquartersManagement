import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

export default function Layout() {


  if (false) {
    return (
      <>
        <Outlet />
        <Footer sx={{ mt: 8, mb: 4 }} />
      </>
    );
  }

  return (
    <>
      <Dashboard>
        <Outlet />
      </Dashboard>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
