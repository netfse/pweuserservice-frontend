import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { RegisterHandler } from '../datasource/signup';

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

export default function SignUp(props) {
    const [useremailError, SetUseremailError] = useState(false);
    const [useremailInvalid, SetUseremailInvalid] = useState(false);
    const [passwordError, SetPasswordError] = useState(false);
    const [confirmpasswordError, SetConfirmPasswordError] = useState(false);
    const [signedUp, SetSignedUp] = useState(false);

    // Check Empty
    const [useremailEmpty, SetUseremailEmpty] = useState(false);
    const [userpasswordEmpty, SetUserPasswordEmpty] = useState(false);
    const [userconfirmpasswordEmpty, SetUserConfirmPasswordEmpty] = useState(false);

    // Others
    const [showpassword, SetShowPassword] = useState(false);

    useEffect(() => {
        if (signedUp) {
            navigate(-1);
            navigate('/signIn');
        }
    })

    const navigate = useNavigate();

    const SignUpAction = async (event) => {

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

            if (data.get('useremail') && data.get('password') && data.get('confirmpassword')) {
                if (!validateEmail(data.get('useremail'))) {
                    SetUseremailInvalid(true)
                }
                else if (data.get('password') === data.get('confirmpassword')) {
                    const result = await RegisterHandler(data);
                    SetSignedUp(result)
                    SetUseremailError(!result)
                    SetUseremailInvalid(false)
                }
                else {
                    SetConfirmPasswordError(true)
                }
            }

            SetUseremailEmpty(data.get('useremail') === '')
            SetUserPasswordEmpty(data.get('password') === '')
            SetUserConfirmPasswordEmpty(data.get('confirmpassword') === '')
        }
        catch (error) {
            console.log(error)
        }
    }

    const useremailInputTextField = (useremailError, useremailEmpty, useremailInvalid) => {
        const useremailErrorText = "Email address is already registered."
        const useremailEmptyText = "Email address should not be empty."
        const useremailInvalidText = "Invlid email address."

        if (useremailError || useremailEmpty || useremailInvalid) {
            return (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="useremail"
                    label="Your Email"
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
                    label="Your Email Address"
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
                    label="Create Password"
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
                    label="Create Password"
                    type={showpassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                />
            )
        }
    }

    const confirmpasswordInputTextField = (confirmpasswordError, userconfirmpasswordEmpty) => {
        const confirmpasswordErrorText = "Confirm password is not same as password."
        const userconfirmpasswordEmptyText = "Confirm password should not be empty."

        if (confirmpasswordError || userconfirmpasswordEmpty) {
            return (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type={showpassword ? "text" : "password"}
                    id="confirmpassword"
                    autoComplete="current-confirmpassword"
                    error
                    helperText={userconfirmpasswordEmpty ? userconfirmpasswordEmptyText : confirmpasswordErrorText}
                />
            )
        }
        else {
            return (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type={showpassword ? "text" : "password"}
                    id="confirmpassword"
                    autoComplete="current-confirmpassword"
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
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={SignUpAction} noValidate sx={{ mt: 1 }}>
                            {
                                useremailInputTextField(useremailError, useremailEmpty, useremailInvalid)
                            }
                            {
                                passwordInputTextField(passwordError, userpasswordEmpty)
                            }
                            {
                                confirmpasswordInputTextField(confirmpasswordError, userconfirmpasswordEmpty)
                            }

                            <FormControlLabel
                                control={<Checkbox value="showpassword" color="primary" onClick={(event) => SetShowPassword(event.target.checked)} />}
                                label="Show password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up for P-Web
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        {"Already have an account? Sign In"}
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