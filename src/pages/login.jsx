import * as React from 'react';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../services/authService.js";
import Swal from "sweetalert2";
import {Avatar, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {green} from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined.js";
import PasswordInput from "../components/input/PasswordInput.jsx";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if (email !== '' && password !== '') {
            return setIsActive(true)
        }
        return setIsActive(false)
    }, [email, password])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login({
                email: email,
                password: password,
            })

            await Swal.fire({
                title: "Authentication Successful!",
                icon: "success",
                text: "Welcome to S-Mart"
            })

            navigate("/")
        } catch (e) {
            await Swal.fire({
                title: 'Error!',
                text: e.message || 'Login unsuccessful',
                icon: 'error',
            })
        }
    };

    return (
        <Box component='div' sx={{pt: {lg: '30px'}}}>
            <Avatar sx={{m: 'auto', bgcolor: green[900]}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5" sx={{textAlign: 'center', m: 1}}>
                Sign in
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate sx={{mt: 1, bgcolor: "white", p: '20px',}}
            >
                <TextField
                    margin="normal"
                    required
                    sx={{width: '100%'}}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <PasswordInput value={password} onChange={event => setPassword(event.target.value)}/>

                <Button type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 8, mb: 2}}
                        disabled={!isActive}>
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/auth/register" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}