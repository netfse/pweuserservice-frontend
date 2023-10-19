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
    const [useremailInvalid, SetUseremailInvalid] = useState(false);
    const [passwordError, SetPasswordError] = useState(false);
    const [signedIn, SetSignedIn] = useState(false);

    // Check Empty
    const [useremailEmpty, SetUseremailEmpty] = useState(false);
    const [userpasswordEmpty, SetUserPasswordEmpty] = useState(false);

    // Others
    const [showpassword, SetShowPassword] = useState(false);

    useEffect(() => {
        if (signedIn) {
            navigate(-1);
            navigate('/signIn');
        }
    })

    const navigate = useNavigate();

    const SignInAction = async (event) => {

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        event.preventDefault();

        try {
            const data = new FormData(event.currentTarget);

            if (data.get('useremail') && data.get('password')) {
                if (!validateEmail(data.get('useremail'))) {
                    SetUseremailInvalid(true)
                }
                else {
                    const result = await LoginHandler(data);
                    SetSignedIn(result)
                    SetUseremailError(!result)
                    SetUseremailInvalid(false)
                }
            }
            SetUseremailEmpty(data.get('useremail') === '')
            SetUserPasswordEmpty(data.get('password') === '')
        }
        catch (error) {
            console.log(error)
        }
    }

    const useremailInputTextField = (useremailError, useremailEmpty, useremailInvalid) => {
        const useremailErrorText = "Email address is not registered or wrong password."
        const useremailEmptyText = "Email address should not be empty."
        const useremailInvalidText = "Invlid email address."

        if (useremailError || useremailEmpty || useremailInvalid) {
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
                    helperText={
                        useremailEmpty
                            ? useremailEmptyText
                            : useremailInvalid
                                ? useremailInvalidText
                                : useremailErrorText
                    }
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

    const passwordInputTextField = (passwordError, userpasswordEmpty) => {
        const passwordErrorText = "Invlid password."
        const userpasswordEmptyText = "Password should not be empty."

        if (passwordError || userpasswordEmpty) {
            return (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showpassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    error
                    helperText={userpasswordEmpty ? userpasswordEmptyText : passwordErrorText}
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
                    type={showpassword ? "text" : "password"}
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
                                useremailInputTextField(useremailError, useremailEmpty, useremailInvalid)
                            }
                            {
                                passwordInputTextField(passwordError, userpasswordEmpty)
                            }
                            <Grid container>
                                <Grid item xs>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={<Checkbox value="showpassword" color="primary" onClick={(event) => SetShowPassword(event.target.checked)} />}
                                        label="Show password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In for P-Web
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/forgotpassword" variant="body2">
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