import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import PasswordInput from "../input/PasswordInput.jsx";
import {Toolbar} from "@mui/material";
import {getLoggedInUser, updateProfile} from "../../services/userService.js";

export default function UpdateProfileForm() {
    const [user, setUser] = useState(getLoggedInUser())
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address || '');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (email !== "" && name !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [email, name])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateProfile({
                email: email ? email : undefined,
                name: name ? name : undefined,
                address: address ? address : undefined,
                password: password ? password : undefined,
            })
            await Swal.fire({
                title: "Authentication Successful!",
                icon: "success",
                text: "Welcome to S-Mart"
            })
        } catch (e) {
            await Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
            })
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate sx={{mt: 1, bgcolor: "white", p: '20px'}}
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
                value={email}
                onChange={event => setEmail(event.target.value)}

            />
            <TextField
                margin="normal"
                required
                sx={{width: '100%'}}
                id="address"
                label="Delivery Address"
                name="address"
                type="address"
                autoComplete="address"
                value={address}
                onChange={event => setAddress(event.target.value)}

            />

            <PasswordInput
                id='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
            />

            <Button type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 8, mb: 2}}
                    disabled={!isActive}>
                Update Profile
            </Button>
        </Box>
    )
}