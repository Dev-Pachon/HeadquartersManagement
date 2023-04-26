import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import { Build, Business, CellTower, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

const dashboardNavItems = (
  <>
      <ListItemButton component={Link} to="/home">
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton component={Link} to="/headquarters">
        <ListItemIcon>
          <Business />
        </ListItemIcon>
        <ListItemText primary="Headquarters" />
      </ListItemButton>
      <ListItemButton component={Link} to="/users">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
  </>
);

export default dashboardNavItems;
