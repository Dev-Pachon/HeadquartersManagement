import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Autocomplete } from "@mui/material";
import {useEffect, useState} from "react";
import UserService from "../services/user.service.js";
import HeadquarterService from "../services/headquarter.service.js";

const theme = createTheme();

export default function SignUp() {
  const user = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const [headquarters, setHeadquarters] = useState([]);
  const [headquartersOptions, setHeadquartersOptions] = useState([])
  useEffect(() => {
    HeadquarterService.getAll().then((res)=>{
      console.log(res)
      setHeadquartersOptions(res.data)
    })
  }, []);

  if (user !== null) {
    return <Navigate to={"/home"} />;
  }

  const mySwal = withReactContent(Swal);
  const handleHeadquartersSelection = (value) => {
    setHeadquarters(value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const body = {
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      headquarter: headquarters.map(h=>h._id),
    };

    console.log(body)

    UserService.create(body)
      .then(() => {
        mySwal.fire({
          icon: "success",
          title: "User created correctly",
          confirmButtonText: "OK",
        });
        navigate("/signin");
      })
      .catch((error) => {
        mySwal.fire({
          icon: "error",
          title: "Failed to register",
          html: error.response.data.map((err)=>(
            err.message
          )),
          confirmButtonText: "Try again",
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="headquarters"
                  name="headquarters"
                  options={headquartersOptions}
                  getOptionLabel={(option) => option.name}
                  value={headquarters}
                  onChange={(e, value)=>handleHeadquartersSelection(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      id="headquarters"
                      label="Headquarters"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
