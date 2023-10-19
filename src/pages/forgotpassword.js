import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginHandler } from '../datasource/signin';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
    const [signedIn, SetSignedIn] = useState(false);

    // Check Empty
    const [useremailEmpty, SetUseremailEmpty] = useState(false);

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
                    //SetSignedIn(result)
                    SetUseremailError(!result)
                    SetUseremailInvalid(false)
                }
            }
            SetUseremailEmpty(data.get('useremail') === '')
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
                            Forgot password
                        </Typography>
                        <Box component="form" onSubmit={SignInAction} noValidate sx={{ mt: 1 }}>
                            {
                                useremailInputTextField(useremailError, useremailEmpty, useremailInvalid)
                            }
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset your password
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/signin" variant="body2">
                                        {"Back to Sign In"}
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