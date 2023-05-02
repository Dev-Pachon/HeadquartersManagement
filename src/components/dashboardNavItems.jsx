import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import {Business, Home, Logout} from "@mui/icons-material";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {logout} from "../reducers/auth.slice.js";
import {useDispatch} from "react-redux";

const dashboardNavItems = (
    <>
        <ListItemButton component={Link} to="/home">
            <ListItemIcon>
                <Home/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
        </ListItemButton>
        <ListItemButton component={Link} to="/headquarters">
            <ListItemIcon>
                <Business/>
            </ListItemIcon>
            <ListItemText primary="Headquarters"/>
        </ListItemButton>
        <ListItemButton component={Link} to="/users">
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Users"/>
        </ListItemButton>
    </>
);

export default dashboardNavItems;
