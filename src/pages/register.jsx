import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {green} from "@mui/material/colors";
import Swal from 'sweetalert2'
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PasswordInput from "../components/input/PasswordInput";
import { register } from '../services/authService';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate()


    useEffect(() => {
        if (email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [email, password, confirmPassword])


    const handleSubmit = async (event) => {
        event.preventDefault();
        await register({name, email, password,})

        navigate('/')

        await Swal.fire({
            title: "Authentication Successful!",
            icon: "success",
            text: "Welcome to S-Mart"
        })
    };

    return (
        <Box component='div' sx={{pt: {lg: '30px'}}}>
            <Avatar sx={{m: 'auto', bgcolor: green[900]}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5" sx={{textAlign: 'center', m: 1}}>
                Register
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
                    sx={{width: '100%'}}
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={event => setEmail(event.target.value)}

                />

                <PasswordInput
                    id='password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <PasswordInput
                    id='confirm-password'
                    label='Confirm Password'
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                />

                <Button type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 8, mb: 2}}
                        disabled={!isActive}>
                    Register
                </Button>

                <Link href="/auth/login" variant="body2">
                    Have an account? Log In
                </Link>
            </Box>
        </Box>
    );
}