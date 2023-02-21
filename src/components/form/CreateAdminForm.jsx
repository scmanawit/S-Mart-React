import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import PasswordInput from '../input/PasswordInput';
import { createAdmin } from '../../services/authService';
import Swal from 'sweetalert2';
import Typography from "@mui/material/Typography";




export default function CreateAdminForm({ open, handleClose }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [email, password, confirmPassword])



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createAdmin({
                name, email, password
            })

            handleClose({ created: true })

            await Swal.fire({
                title: "Product Successfully Saved!",
                icon: "success"
            })


        } catch (e) {
            handleClose()
            await Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
            })
        }
    }

    return (
        <Box component='div' sx={{ p: '80px 20px', bgcolor: 'white' }}>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center', m: 1 }}>
                Create New Admin
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
                    sx={{ mt: 8, mb: 2 }}
                    disabled={!isActive}>
                    Register
                </Button>
                <Button type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleClose}
                    sx={{ mt: 1, mb: 2, background: theme => theme.palette.grey['600'] }}
                >
                    Close
                </Button>
            </Box>

        </Box>
    )
}
