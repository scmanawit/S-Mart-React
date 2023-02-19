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
import {green} from "@mui/material/colors";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import axios from 'axios'
import Swal from 'sweetalert2'


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

function register({name, email, password}){

    axios.post('http://localhost:4000/register', {
        name,
        email,
        password
    }).then(response => {
        console.log('DEBUG response', response);

    }).catch(error => {
        console.log('DEBUG error', error);
        Swal.fire({
            title: 'Error!',
            text: 'Register unsuccessful',
            icon: 'error',
          })
    })
}

export default function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            
        });
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
        }else{
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
                <Grid container spacing={2} columns={12} sx={{p: '20px'}}>
                    <Grid item xs={12} md={6}>
                        <Logo height={30} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box component='div' sx={{p: '80px 20px', bgcolor: 'white'}}>
                            <Avatar sx={{m: 'auto', bgcolor: green[900]}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{textAlign: 'center', m: 1}}>
                                Register
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate sx={{mt: 1, bgcolor: "white", p: '20px', }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    sx={{width: '100%'}}
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    sx={{width: '100%'}}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
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
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmpassword"
                                    label="confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="confirm-password"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 8, mb: 2}}
                                >
                                    Register
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            By signing up, you agree to S-Mart's Terms of service & Privacy Policy
                                        </Link>
                                    </Grid>

                                    <Grid item sx={{textAlign: 'center'}}>
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
            <Footer/>
        </Box>
    );
}