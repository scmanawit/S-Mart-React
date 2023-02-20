import * as React from 'react';
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
import Logo from "../components/Logo";
import { green } from "@mui/material/colors";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isActive, setIsActive] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate()

    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [email, password])

    function login({ email, password }) {

        axios.post('http://localhost:4000/login', {
            email,
            password
        }).then(response => {
            console.log('DEBUG response', response);

            Swal.fire({
                title: "Authentication Successful!",
                icon: "success",
                text: "Welcome to S-Mart"
            })

            localStorage.setItem('token', response.data.auth)

            navigate("/")


        }).catch(error => {
            console.log('DEBUG error', error);
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data || 'Login unsuccessful',
                icon: 'error',
            })
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        login({
            email: data.get('email'),
            password: data.get('password'),
        })



    };

    return (
        <Box component='div'>
            <Header />
            <Grid container spacing={2} columns={12} sx={{ p: '20px' }}>
                <Grid item xs={12} md={6} spacing={3} xsOffset={6}>
                    <Logo width='50vw' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component='div' sx={{ p: { md: '80px 20px' }, bgcolor: 'white' }}>
                        <Avatar sx={{ m: 'auto', bgcolor: green[900] }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', m: 1 }}>
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate sx={{ mt: 1, bgcolor: "white", p: '20px', }}
                        >
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            {/* <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                /> */}

                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                required
                                fullWidth
                                name="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            {
                                isActive ?
                                    <Button type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 8, mb: 2 }}>
                                        Sign In
                                    </Button>
                                    :
                                    <Button type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 8, mb: 2 }}
                                        disabled>
                                        Sign In
                                    </Button>
                            }
                            {/* <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 8, mb: 2 }}
                                >
                                    Sign In
                                </Button> */}
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="./register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </Box>
    );
}