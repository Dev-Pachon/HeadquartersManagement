import {useLocation, useNavigate, Link, Navigate} from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../reducers/auth.slice.js";
import axios from "../utils/axios.js"

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const from = location.state?.from?.pathname || "/";
    const user = useSelector(state => state.auth.value)

    if (user !== null) {
        return (
            <Navigate to={"/home"}/>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "email": data.get('email'),
                "password": data.get('password')
            }),
            method: "post",
            url: "/auth"
        }

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                dispatch(login({name: response.data.name, email: response.data.email, token: response.data.token}))
            })
            .catch((error) => {
                console.log(error);
            });

        navigate(from, {replace: true});
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1}}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {false && (
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            {false && (
                                <Grid item xs>
                                    <Link to="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            )}
                            <Grid item>
                                <Link to="/signup">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
