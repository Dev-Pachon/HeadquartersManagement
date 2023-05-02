import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";

// eslint-disable-next-line react/prop-types
export default function RequireAuth({ children }) {

    const location = useLocation();
    const user = useSelector(state => state.auth.value)
    if (user === null) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }