

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Logo from "../components/Logo";
import { green } from "@mui/material/colors";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';




function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function RegisterAdmin() {
    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);



    useEffect(() => {
        if (email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [email, password, confirmPassword])


    function register({ name, email, password }) {

        axios.post('http://localhost:4000/register', {
            name,
            email,
            password
        }).then(response => {

            navigate("/")


        }).catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data || 'Register unsuccessful',
                icon: 'error',
            })
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if (data.get('password') === data.get('confirmpassword')) {
            register({
                name: data.get('name'),
                email: data.get('email'),
                password: data.get('password'),
            })

            Swal.fire({
                title: "Authentication Successful!",
                icon: "success",
                text: "Welcome to S-Mart"
            })


        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Register unsuccessful',
                icon: 'error',
            })
        }

    };

    return (

        <Box component='div'>
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // background: theme => theme.palette.primary.main,
                }}
            >
                <Grid container spacing={2} columns={12} sx={{ p: '20px' }}>
                    <Grid item xs={12} md={6}>
                        <Logo width='30em' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box component='div' sx={{ p: '80px 20px', bgcolor: 'white' }}>
                            <Avatar sx={{ m: 'auto', bgcolor: green[900] }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ textAlign: 'center', m: 1 }}>
                                Register
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
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={name}
                                    onChange={event => setName(event.target.value)}

                                />
                                <TextField
                                    margin="normal"
                                    required
                                    sx={{ width: '100%' }}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
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
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                     endadornment={
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

                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="confirmpassword"
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
                                    label="Confirm Password"
                                    required
                                    fullWidth
                                    name="confirmpassword"
                                    value={confirmPassword}
                                    onChange={event => setConfirmPassword(event.target.value)}
                                />

                                {/* <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmpassword"
                                    label="confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="confirm-password"
                                    value={confirmPassword}
                                    onChange={event => setConfirmPassword(event.target.value)}

                                /> */}
                                {
                                    isActive ?
                                        <Button type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 8, mb: 2 }}>
                                            Register
                                        </Button>
                                        :
                                        <Button type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 8, mb: 2 }}
                                            disabled>
                                            Register
                                        </Button>
                                }
                                {/* <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 8, mb: 2 }}
                                >
                                    Register
                                </Button> */}
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            By signing up, you agree to S-Mart's Terms of service & Privacy Policy
                                        </Link>
                                    </Grid>

                                    <Grid item sx={{ textAlign: 'center' }}>
                                        <Link href="./login" variant="body2">
                                            {"Have an account? Log In"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    );
}