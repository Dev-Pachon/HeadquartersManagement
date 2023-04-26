import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="">
          DevPachon
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }