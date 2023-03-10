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
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';

export default function CreateShop() {

    const [shopName, setShopName] = useState('')
    const [shopDescription, setShopDescription] = useState('')

    const [isActive, setIsActive] = useState(false);


    const navigate = useNavigate()

    useEffect(() => {
        if (shopName !== '' && shopDescription !== '') {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [shopName, shopDescription])

    function createShop({shopName, description}) {

        axios.post('http://localhost:4000/shop/register', {
            shopName,
            description
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {

                Swal.fire({
                    title: "Shop Successfully Created!",
                    icon: "success",
                    text: "Kindly wait for admin to verify your shop"
                })

                localStorage.setItem('token', response.data.auth)

                navigate("/")


            }).catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data || ' unsuccessful',
                icon: 'error',
            })
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createShop({
            shopName: shopName,
            description: shopDescription,
        })
    };

    return (
        <Box component='div'>
            <Header/>
            <Grid container columns={12} sx={{p: '20px'}}>
                <Grid item xs={12} md={6} xsoffset={6}>
                    <Logo width='50vw'/>
                </Grid>
                <Grid item xs={12} md={6}>

                </Grid>
            </Grid>
            <Footer/>
        </Box>
    );
}