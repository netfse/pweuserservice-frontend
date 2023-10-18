import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import OidcCallback from '../components/oidcallback';
import { LoginHandler } from '../datasource/signin';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brown } from '@mui/material/colors';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: brown[400],
        },
    },
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Reactive Personal Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn(props) {

    const [useremailError, SetUseremailError] = useState(false);
    const [passwordError, SetPasswordError] = useState(false);
    const [showError, SetShowError] = useState(false);
    const [loggedIn, SetLoggedIn] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            navigate(-1);
            navigate('/signIn');
        }
    })

    useEffect(() => {
        if (showError) {
            SetUseremailError(!loggedIn)
            SetPasswordError(!loggedIn)
        }
    })
    const navigate = useNavigate();

    const SignInAction = async (event) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const result = await LoginHandler(data);
            //const boolean = await OidcCallback(result)
            //SetLoggedIn(boolean)
            SetShowError(!loggedIn)
        }
        catch (error) {
            console.log(error)
        }
    }

    const useremailInputTextField = (useremailError) => {
        if (useremailError) {
            return (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="useremail"
                    label="Email"
                    name="useremail"
                    autoComplete="useremail"
                    autoFocus
                    error
                    helperText="Incorrect email."
                />
            )
        }
        else {
            return (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="useremail"
                    label="Email"
                    name="useremail"
                    autoComplete="useremail"
                    autoFocus
                />
            )
        }
    }

    const passwordInputTextField = (passwordError) => {
        if (passwordError) {
            return (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error
                    helperText="Incorrect password."
                />
            )
        }
        else {
            return (
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
            )
        }
    }

    return (
        <div
            className=' bg-signInBackground h-screen'
            style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <ThemeProvider theme={defaultTheme} >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            sx={{ width: 56, height: 56, m: 1, backgroundColor: 'primary.main' }}
                            src={require("../images/sign-avatar.jpg")}
                        />

                        <Typography component="h1" variant="h4">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={SignInAction} noValidate sx={{ mt: 1 }}>
                            {
                                useremailInputTextField(useremailError)
                            }
                            {
                                passwordInputTextField(passwordError)
                            }
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </div>

    );
}